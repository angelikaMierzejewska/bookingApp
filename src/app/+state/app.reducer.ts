export interface AppState {
  apiVersion: string | null;
  requestInProgress: boolean;
}

export const initialState: AppState = {
  apiVersion: null,
  requestInProgress: false
};

export function appReducer(state: AppState = initialState, action): AppState {
  return state;
}
