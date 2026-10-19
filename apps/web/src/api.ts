import type { CounterAction, CounterState } from "@qawolf-monorepo/shared";

// API base URL. Defaults to the local API; override via VITE_API_URL for
// deployed or preview environments.
const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function call(path: string, method: "GET" | "POST"): Promise<CounterState> {
  const res = await fetch(`${BASE}${path}`, { method });
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`);
  return res.json() as Promise<CounterState>;
}

export const api = {
  getState: () => call("/api/state", "GET"),
  run: (action: CounterAction) => call(`/api/${action}`, "POST"),
};
