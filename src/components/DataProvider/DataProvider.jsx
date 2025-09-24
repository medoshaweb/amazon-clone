

import React, { createContext, useReducer } from 'react';
import  {reducer, initialState } from '../../Utility/reducer.js';


export const StateContext = createContext();

export const DataProvider = ({ children }) => {
    const[state, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={{ state, dispatch }}>
        {children}
      </StateContext.Provider>
    );
};
