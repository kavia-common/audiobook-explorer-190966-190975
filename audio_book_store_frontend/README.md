# Audiobook Store Frontend (React)

A modern React single-page app to browse audiobooks, view details, listen to previews, manage a cart, checkout, and see purchases.

## Env configuration
The app auto-enables mock mode if no backend is provided.

- REACT_APP_API_BASE: Base URL for backend (e.g., https://api.example.com)
- REACT_APP_BACKEND_URL: Fallback base URL if API_BASE is not set

If neither env var is present, mock mode is used and the app works fully with static data and sample audio.

## Routes
- / (browse)
- /book/:id (details)
- /cart
- /checkout
- /purchases

## Development
- npm start
- npm run build
- npm test
