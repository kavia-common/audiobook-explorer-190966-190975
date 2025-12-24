/**
 * API configuration loader that reads environment variables and determines mock mode.
 *
 * Prioritizes:
 * - REACT_APP_API_BASE
 * - REACT_APP_BACKEND_URL
 * If neither is set, mock mode is enabled.
 */
const apiBase =
  process.env.REACT_APP_API_BASE?.trim() ||
  process.env.REACT_APP_BACKEND_URL?.trim() ||
  '';

export const config = {
  // PUBLIC_INTERFACE
  apiBase,
  /** True when no backend URL is configured. */
  mock: !apiBase,
  /** Default timeout for fetch-like requests */
  timeoutMs: 10000,
};

export default config;
