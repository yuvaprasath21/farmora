import hashlib
import json
import os
import secrets
from datetime import datetime, timedelta, timezone
from typing import Any

import jwt
import mysql.connector
import uvicorn
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
app = FastAPI(title="Farmora REST API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database_config = {
    "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
    "port": int(os.getenv("MYSQL_PORT", "3306")),
    "user": os.getenv("MYSQL_USER", "root"),
    "password": os.getenv("MYSQL_PASSWORD", ""),
    "database": os.getenv("MYSQL_DATABASE", "farmora"),
}
secret_key = os.getenv("JWT_SECRET", secrets.token_hex(32))


def connection():
    return mysql.connector.connect(**database_config)


def initialize_database() -> None:
    db = connection()
    cursor = db.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(128) NOT NULL, metadata JSON NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")
    cursor.execute("""CREATE TABLE IF NOT EXISTS farms (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, name VARCHAR(255), location VARCHAR(255), farm_size VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)""")
    cursor.execute("""CREATE TABLE IF NOT EXISTS crops (id INT AUTO_INCREMENT PRIMARY KEY, farm_id INT NOT NULL, name VARCHAR(255), status VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE)""")
    cursor.execute("""CREATE TABLE IF NOT EXISTS market_prices (id INT AUTO_INCREMENT PRIMARY KEY, crop_name VARCHAR(255), price_per_unit DECIMAL(10,2), unit VARCHAR(50), trend VARCHAR(20), market_location VARCHAR(255), recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")
    db.commit()
    cursor.close()
    db.close()


def token_for(user_id: int) -> str:
    return jwt.encode({"sub": str(user_id), "exp": datetime.now(timezone.utc) + timedelta(days=7)}, secret_key, algorithm="HS256")


def current_user(authorization: str | None = Header(default=None)) -> dict[str, Any]:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authentication required")
    try:
        user_id = int(jwt.decode(authorization[7:], secret_key, algorithms=["HS256"])["sub"])
    except (jwt.InvalidTokenError, ValueError, KeyError) as error:
        raise HTTPException(status_code=401, detail="Invalid authentication token") from error
    db = connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id, email, metadata FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def user_response(user: dict[str, Any], token: str) -> dict[str, Any]:
    return {"access_token": token, "user": {"id": user["id"], "email": user["email"], "user_metadata": user["metadata"]}}


@app.on_event("startup")
def startup() -> None:
    if os.getenv("MYSQL_AUTO_INIT", "true").lower() == "true":
        initialize_database()


@app.post("/api/auth/signup")
def signup(payload: dict[str, Any]) -> dict[str, Any]:
    db = connection()
    cursor = db.cursor(dictionary=True)
    metadata = payload.get("options", {}).get("data", payload.get("metadata", {}))
    password_hash = hashlib.sha256(payload["password"].encode()).hexdigest()
    try:
        cursor.execute("INSERT INTO users (email, password_hash, metadata) VALUES (%s, %s, %s)", (payload["email"], password_hash, json.dumps(metadata)))
        db.commit()
        user_id = cursor.lastrowid
    except mysql.connector.Error as error:
        raise HTTPException(status_code=400, detail="Email is already registered") from error
    cursor.execute("SELECT id, email, metadata FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    return user_response(user, token_for(user_id))


@app.post("/api/auth/login")
def login(payload: dict[str, str]) -> dict[str, Any]:
    db = connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id, email, password_hash, metadata FROM users WHERE email = %s", (payload["email"],))
    user = cursor.fetchone()
    cursor.close()
    db.close()
    if not user or hashlib.sha256(payload["password"].encode()).hexdigest() != user["password_hash"]:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return user_response(user, token_for(user["id"]))


@app.post("/api/auth/logout")
def logout(_: dict[str, Any] = Depends(current_user)) -> dict[str, str]:
    return {"message": "Logged out successfully"}


@app.patch("/api/profile")
def update_profile(payload: dict[str, Any], user: dict[str, Any] = Depends(current_user)) -> dict[str, Any]:
    metadata = {**(user["metadata"] or {}), **payload}
    db = connection()
    cursor = db.cursor()
    cursor.execute("UPDATE users SET metadata = %s WHERE id = %s", (json.dumps(metadata), user["id"]))
    db.commit()
    cursor.close()
    db.close()
    return {"user": {"id": user["id"], "email": user["email"], "user_metadata": metadata}}


def records(table: str, user: dict[str, Any]) -> list[dict[str, Any]]:
    db = connection()
    cursor = db.cursor(dictionary=True)
    if table == "farms":
        cursor.execute("SELECT * FROM farms WHERE user_id = %s", (user["id"],))
    elif table == "crops":
        cursor.execute("SELECT crops.* FROM crops JOIN farms ON farms.id = crops.farm_id WHERE farms.user_id = %s", (user["id"],))
    else:
        cursor.execute(f"SELECT * FROM {table} ORDER BY recorded_at DESC LIMIT 10")
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return result


@app.get("/api/{resource}")
def list_resource(resource: str, user: dict[str, Any] = Depends(current_user)) -> list[dict[str, Any]]:
    table = {"market-prices": "market_prices", "farm-reports": "farm_reports", "irrigation": "irrigation_schedule"}.get(resource, resource)
    if table not in {"farms", "crops", "market_prices", "farm_reports", "irrigation_schedule", "notifications"}:
        raise HTTPException(status_code=404, detail="Resource not found")
    return records(table, user)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "database": "mysql"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "3000")))
