# QAWolf Counter Monorepo

A small npm-workspaces monorepo: a React front end, an Express API, and a package of
types and helpers they share.

## Packages

| Path | Package | What it is |
| --- | --- | --- |
| `apps/web/` | `@qawolf-monorepo/web` | Vite + React + TS counter UI, port **5173** |
| `apps/api/` | `@qawolf-monorepo/api` | Express JSON API with an in-memory counter, port **3001** |
| `packages/shared/` | `@qawolf-monorepo/shared` | The `CounterState` type and helpers both apps import |

The API exposes `GET /api/state` and `POST /api/{increment,decrement,reset}`.

## Run

```bash
npm install     # installs every workspace from the root
npm run dev     # runs the API and the web app together
```

Then open http://localhost:5173.

## Configuration

| Var | Where | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | `apps/web` build | API base URL (defaults to `http://localhost:3001`) |
| `PORT` | `apps/api` | API port (default 3001) |
| `CORS_ORIGIN` | `apps/api` | Comma-separated allowed origins (default: all) |
