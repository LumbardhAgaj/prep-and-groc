import React, { createContext, useContext, useReducer } from 'react';

const NotificationStateContext = createContext();

const NotificationUpdateContext = createContext();

const NotificationStateProvider = ({ state, children }) => (
  <NotificationStateContext.Provider value={state}>
    {children}
  </NotificationStateContext.Provider>
);

const NotificationUpdateProvider = ({ notify, children }) => (
  <NotificationUpdateContext.Provider value={notify}>
    {children}
  </NotificationUpdateContext.Provider>
);

const NotificationContextProvider = ({ reducer, initialState, children }) => {
  const [state, notify] = useReducer(reducer, initialState);
  return (
    <NotificationStateProvider state={state}>
      <NotificationUpdateProvider notify={notify}>
        {children}
      </NotificationUpdateProvider>
    </NotificationStateProvider>
  );
};

export const useNotificationUpdateContext = () =>
  useContext(NotificationUpdateContext);

export const useNotificationStateContext = () =>
  useContext(NotificationStateContext);

export default NotificationContextProvider;
