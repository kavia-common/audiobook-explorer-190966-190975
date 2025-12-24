/**
 * Lightweight API client with timeout, JSON handling, and mock fallback.
 */
import config from './config';
import { mockApi } from './mock';

// Helper to add a timeout to fetch
function fetchWithTimeout(resource, options = {}, timeout = config.timeoutMs) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    fetch(resource, { ...options, signal: controller.signal })
      .then((response) => {
        clearTimeout(id);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(id);
        reject(err);
      });
  });
}

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** GET wrapper that uses mock when API is not configured. */
  if (config.mock) {
    return mockApi.get(path);
  }
  const url = `${config.apiBase}${path}`;
  const res = await fetchWithTimeout(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return res.json();
  }
  // return raw text as a fallback
  return res.text();
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  /** POST wrapper that uses mock when API is not configured. */
  if (config.mock) {
    return mockApi.post(path, body);
  }
  const url = `${config.apiBase}${path}`;
  const res = await fetchWithTimeout(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`POST ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

export default { apiGet, apiPost };
