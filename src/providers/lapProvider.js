import runReducer from "../reducers/runReducers";
import {createContext, useReducer} from "react";

export const runContext = createContext();

export function runProvider({ children, userSettings }) {
  const [state, dispatch] = useReducer(
    runReducer,
    _.merge(defaultSettings, JSON.parse(userSettings)),
  );

  return (
    <LapContext.Provider value={{ state, dispatch }}>{children}</LapContext.Provider>
  );
}