import express from "express";
import cors from "cors";
import { applyAction, COUNTER_ACTIONS, INITIAL_STATE, type CounterAction, type CounterState } from "@qawolf-monorepo/shared";

const app = express();

// Allow all origins by default; restrict via CORS_ORIGIN (comma-separated)
// for deployed environments where the web origin is known.
const corsOrigin = process.env.CORS_ORIGIN?.split(",").map((s) => s.trim());
app.use(cors(corsOrigin ? { origin: corsOrigin } : undefined));
app.use(express.json());

// In-memory state, intentionally simple so tests can assert exact values.
let state: CounterState = { ...INITIAL_STATE };

app.get("/api/state", (_req, res) => {
  res.json(state);
});

app.post("/api/:action", (req, res) => {
  const action = req.params.action as CounterAction;
  if (!COUNTER_ACTIONS.includes(action)) {
    res.status(404).json({ error: `Unknown action: ${req.params.action}` });
    return;
  }
  state = applyAction(state, action);
  res.json(state);
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
