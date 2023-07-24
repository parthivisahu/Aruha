import React, { createContext, useContext, useReducer } from "react";

// Create a new context
export const DataLayerContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

// Create a custom hook to use the data layer values
export const useDataLayerValue = () => useContext(DataLayerContext);
