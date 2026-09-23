import os
from pathlib import Path
from typing import Any

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import Client, create_client


load_dotenv(Path(__file__).resolve().parents[2] / ".env")

supabase_url = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")
if not supabase_url or not supabase_key:
    raise RuntimeError("SUPABASE_URL and SUPABASE_ANON_KEY must be configured")

supabase: Client = create_client(supabase_url, supabase_key)
app = FastAPI(title="Farmora API")

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def handle_supabase_error(error: Any) -> None:
    if error:
        raise HTTPException(status_code=500, detail=str(error))


@app.post("/api/auth/signup")
def signup(payload: dict[str, str]) -> Any:
    response = supabase.auth.sign_up(
        {"email": payload.get("email"), "password": payload.get("password")}
    )
    return response.model_dump() if hasattr(response, "model_dump") else response


@app.post("/api/auth/login")
def login(payload: dict[str, str]) -> Any:
    response = supabase.auth.sign_in_with_password(
        {"email": payload.get("email"), "password": payload.get("password")}
    )
    return response.model_dump() if hasattr(response, "model_dump") else response


@app.post("/api/auth/logout")
def logout() -> dict[str, str]:
    response = supabase.auth.sign_out()
    handle_supabase_error(response)
    return {"message": "Logged out successfully"}


def register_table_routes(table: str, path: str | None = None) -> None:
    route = path or table

    @app.get(f"/api/{route}")
    def list_records() -> Any:
        response = supabase.table(table).select("*").execute()
        return response.data

    @app.post(f"/api/{route}")
    def create_record(payload: dict[str, Any]) -> Any:
        response = supabase.table(table).insert(payload).select().execute()
        return response.data[0] if response.data else {}


register_table_routes("farms")
register_table_routes("irrigation_schedule", "irrigation")
register_table_routes("farm_reports", "farm-reports")
register_table_routes("notifications")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "3000")))