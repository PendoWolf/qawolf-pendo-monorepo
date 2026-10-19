// Types and helpers shared by the web app and the API.

/** Every action the counter supports. */
export const COUNTER_ACTIONS = ["increment", "decrement", "reset"] as const;

export type CounterAction = (typeof COUNTER_ACTIONS)[number];

/** What the API returns for every request. */
export interface CounterState {
  counter: number;
  lastAction: CounterAction | "none";
}

export const INITIAL_STATE: CounterState = { counter: 0, lastAction: "none" };

/** Applies one action to a state and returns the new state. */
export function applyAction(state: CounterState, action: CounterAction): CounterState {
  switch (action) {
    case "increment":
      return { counter: state.counter + 1, lastAction: action };
    case "decrement":
      return { counter: state.counter - 1, lastAction: action };
    case "reset":
      return { counter: 0, lastAction: action };
  }
}

/** Formats the last action for display, such as "Last action: increment". */
export function formatLastAction(state: CounterState): string {
  return `Last action: ${state.lastAction}`;
}
