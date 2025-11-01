import React, { useReducer } from "react";
import { reducer, initialState } from "../../Utility/reducer";
import { StateContext } from "./StateContext";

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// Re-export for backward compatibility with imports
// eslint-disable-next-line react-refresh/only-export-components
export { StateContext, useStateValue } from "./StateContext";
