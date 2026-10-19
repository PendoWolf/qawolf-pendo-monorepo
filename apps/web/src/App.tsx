import { useEffect, useState } from "react";
import { formatLastAction, INITIAL_STATE, type CounterAction, type CounterState } from "@qawolf-monorepo/shared";
import { api } from "./api";

const BUTTONS: { action: CounterAction; label: string }[] = [
  { action: "increment", label: "Increment" },
  { action: "decrement", label: "Decrement" },
  { action: "reset", label: "Reset" },
];

export default function App() {
  const [state, setState] = useState<CounterState>(INITIAL_STATE);
  const [error, setError] = useState<string | null>(null);

  const load = async (request: () => Promise<CounterState>) => {
    try {
      setError(null);
      setState(await request());
    } catch (e) {
      setError((e as Error).message);
    }
  };

  useEffect(() => {
    load(api.getState);
  }, []);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 480, margin: "4rem auto", textAlign: "center" }}>
      <h1>QAWolf Counter</h1>

      <p data-testid="counter-value" style={{ fontSize: "3rem", margin: "1rem 0" }}>
        {state.counter}
      </p>
      <p data-testid="last-action" style={{ color: "#666" }}>
        {formatLastAction(state)}
      </p>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {BUTTONS.map(({ action, label }) => (
          <button key={action} data-testid={`btn-${action}`} onClick={() => load(() => api.run(action))}>
            {label}
          </button>
        ))}
        <button data-testid="btn-refresh" onClick={() => load(api.getState)}>
          Refresh
        </button>
      </div>

      {error && (
        <p data-testid="error" style={{ color: "crimson", marginTop: 16 }}>
          {error}
        </p>
      )}
    </main>
  );
}
