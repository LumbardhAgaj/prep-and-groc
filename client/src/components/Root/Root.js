import React from 'react';
import appReducer, { APP_INIT_STATE } from 'reducers/app';
import notificationReducer, {
  NOTIFICATIONS_INIT_STATE
} from 'reducers/notification';
import StoreContextProvider from 'contexts/store';
import NotificationContextProvider from 'contexts/notification';

export default ({ children }) => (
  <StoreContextProvider reducer={appReducer} initialState={APP_INIT_STATE}>
    <NotificationContextProvider
      reducer={notificationReducer}
      initialState={NOTIFICATIONS_INIT_STATE}
    >
      {children}
    </NotificationContextProvider>
  </StoreContextProvider>
);
