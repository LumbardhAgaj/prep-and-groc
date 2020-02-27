import React, { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

const StoreUpdateContext = createContext();

const StoreProvider = ({ state, children }) => (
  <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
);

const StoreUpdateProvider = ({ dispatch, children }) => (
  <StoreUpdateContext.Provider value={dispatch}>
    {children}
  </StoreUpdateContext.Provider>
);

const StoreContextProvider = ({ reducer, initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreProvider state={state}>
      <StoreUpdateProvider dispatch={dispatch}>{children}</StoreUpdateProvider>
    </StoreProvider>
  );
};

export const useStoreContext = () => useContext(StoreContext);

export const useStoreUpdateContext = () => useContext(StoreUpdateContext);

export default StoreContextProvider;
