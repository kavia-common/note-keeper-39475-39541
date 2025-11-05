# Notes Frontend – Ocean Professional

A lightweight React notes application featuring a two‑pane layout with a sidebar list and an editor/detail view. It supports create, view, edit, and delete flows. When a backend URL is not configured, the app uses an in‑memory store with seed data.

## Quick Start

- Install dependencies: `npm install`
- Start the dev server: `npm start`
- App will be available at http://localhost:3000

## Environment Configuration

The app reads environment variables provided via `.env`:

- `REACT_APP_API_BASE`: If set, the app will call `${REACT_APP_API_BASE}/notes` REST endpoints for CRUD:
  - GET `${REACT_APP_API_BASE}/notes`
  - GET `${REACT_APP_API_BASE}/notes/:id`
  - POST `${REACT_APP_API_BASE}/notes`
  - PUT `${REACT_APP_API_BASE}/notes/:id`
  - DELETE `${REACT_APP_API_BASE}/notes/:id`
- If `REACT_APP_API_BASE` is not set or empty, the app falls back to an in‑memory store with seed notes.

Other available variables (from container): `REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV, REACT_APP_NEXT_TELEMETRY_DISABLED, REACT_APP_ENABLE_SOURCE_MAPS, REACT_APP_PORT, REACT_APP_TRUST_PROXY, REACT_APP_LOG_LEVEL, REACT_APP_HEALTHCHECK_PATH, REACT_APP_FEATURE_FLAGS, REACT_APP_EXPERIMENTS_ENABLED`

Example `.env`:

```
REACT_APP_API_BASE=http://localhost:8080
REACT_APP_PORT=3000
```

Note: Port is managed by the container; the app runs on port 3000 in this environment.

## Features

- Two‑pane layout: left sidebar list, right editor pane
- Create new note, edit title/body, delete with confirmation
- Selected note highlighting in list
- Loading and empty states
- Ocean Professional theme with blue/amber accents, subtle shadows, and rounded corners
- Modular architecture:
  - `src/components/*` UI components
  - `src/hooks/useNotes.js` state and CRUD flows
  - `src/services/api.js` API abstraction with in‑memory fallback
  - `src/styles/theme.js` theme tokens and variable injection

## Styling

Theme tokens are defined in `src/styles/theme.js` and applied as CSS variables. Global base variables are in `src/App.css`.

## Testing

A basic smoke test ensures the header renders:
`npm test`

## Notes

- If using a backend, ensure CORS is configured to allow the frontend origin.
- The in‑memory fallback is intended for development only; data resets on reload.
