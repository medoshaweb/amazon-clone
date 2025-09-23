

import React, { createContext, useReducer } from 'react';
// import { DataContext } from '../DataContext.js';
import  {reducer, initialState } from '../../Utility/reducer.js';

// const initialState = {
//   basket: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         basket: [...state.basket, action.item],
//       };
//     default:
//       return state;
//   }
// };
export const StateContext = createContext();

export const DataProvider = ({ children }) => {
    const[state, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={{ state, dispatch }}>
        {children}
      </StateContext.Provider>
    );
};
