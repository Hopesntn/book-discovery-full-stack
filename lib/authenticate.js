import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/user';

export function setToken(token) {
  if (typeof window === 'undefined') return;

  localStorage.setItem('access_token', token);
  window.dispatchEvent(new Event('authChange'));
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
}

export function removeToken() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('access_token');
  window.dispatchEvent(new Event('authChange'));
}

export function readToken() {
  const token = getToken();

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const payload = readToken();
  return Boolean(payload?.exp && payload.exp * 1000 > Date.now());
}

async function postCredentials(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to complete the request');
  }

  return data;
}

export async function authenticateUser(user, password) {
  const data = await postCredentials('/login', {
    userName: user,
    password,
  });

  setToken(data.token);
  return true;
}

export async function registerUser(user, password, password2) {
  await postCredentials('/register', {
    userName: user,
    password,
    password2,
  });
  return true;
}
