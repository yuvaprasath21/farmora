const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const tokenKey = 'farmora_access_token';
const userKey = 'farmora_user';
const listeners = new Set();

const storedUser = () => JSON.parse(localStorage.getItem(userKey) || 'null');
const session = () => {
  const access_token = localStorage.getItem(tokenKey);
  const user = storedUser();
  return access_token && user ? { access_token, user } : null;
};

async function request(path, options = {}) {
  const activeSession = session();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(activeSession?.access_token ? { Authorization: `Bearer ${activeSession.access_token}` } : {}), ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.detail || 'Request failed');
  return body;
}

function saveSession(next) {
  if (next) {
    localStorage.setItem(tokenKey, next.access_token);
    localStorage.setItem(userKey, JSON.stringify(next.user));
  } else {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  }
  listeners.forEach((listener) => listener(next ? 'SIGNED_IN' : 'SIGNED_OUT', next));
}

export const supabase = {
  auth: {
    async getSession() { return { data: { session: session() }, error: null }; },
    onAuthStateChange(listener) { listeners.add(listener); return { data: { subscription: { unsubscribe: () => listeners.delete(listener) } } }; },
    async signUp({ email, password, options }) { const data = await request('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, options }) }); saveSession(data); return { data, error: null }; },
    async signInWithPassword({ email, password }) { const data = await request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); saveSession(data); return { data, error: null }; },
    async signOut() { await request('/api/auth/logout', { method: 'POST' }); saveSession(null); return { error: null }; },
    async refreshSession() { return { data: { session: session() }, error: null }; },
    async updateUser({ data }) { const result = await request('/api/profile', { method: 'PATCH', body: JSON.stringify(data) }); localStorage.setItem(userKey, JSON.stringify(result.user)); return { data: result, error: null }; },
  },
  from(table) {
    const path = `/api/${table.replace('_', '-')}`;
    const builder = { select: () => builder, eq: () => builder, order: () => builder, limit: () => builder, then: (resolve, reject) => request(path).then((data) => resolve({ data, error: null })).catch(reject) };
    return builder;
  },
};

export const updateUserMetadata = async (metadata) => (await supabase.auth.updateUser({ data: metadata })).data;
export const getCurrentSession = async () => (await supabase.auth.getSession()).data.session;
