

import React, {  useReducer } from 'react';
import { DataContext } from '../DataContext.js';
import { reducer, initialState } from '../../Utility/reducer.js';


export const DataProvider = ({ children }) => {
    const[state, dispatch] = useReducer(reducer, initialState);
    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};
