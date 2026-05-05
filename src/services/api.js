import { fetchAuthSession } from 'aws-amplify/auth';
import outputs from '../../amplify_outputs.json';

const BASE_URL = outputs.custom?.apiUrl ?? '';

/**
 * Shared fetch helper. Automatically attaches the Cognito JWT when the user
 * is signed in. Falls back to an unauthenticated request for public routes.
 */
export async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  } catch {
    // Not signed in — public route, proceed without auth header
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw Object.assign(new Error(err.error ?? 'Request failed'), { status: res.status });
  }

  return res.json();
}
