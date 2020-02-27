import React from 'react';
import {
  useNotificationUpdateContext,
  useNotificationStateContext
} from 'contexts/notification';
import { removeToast } from 'actions/notification';
import NotificationToastTemplate from './NotificationToastTemplate';

const NotificationToast = () => {
  const notify = useNotificationUpdateContext();
  const { toasts } = useNotificationStateContext();

  const handleClose = id => {
    notify(removeToast(id));
  };

  return (
    <>
      {toasts.map((toast, index) => {
        return (
          <NotificationToastTemplate
            key={toast.id}
            index={index}
            onClose={handleClose}
            toast={toast}
          />
        );
      })}
    </>
  );
};

export default NotificationToast;
