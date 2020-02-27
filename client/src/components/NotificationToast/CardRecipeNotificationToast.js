import React from 'react';
import { Toast } from 'react-bootstrap';
import styled from 'styled-components';
import { ADD_RECIPE_MESSAGE } from 'constants/userMessages';

const NotificationToast = styled(Toast)`
  position: absolute;
  top: -46px;
  z-index: 1100;
  right: 0;
  width: 100%;
  font-size: 0.85em;
  color: white;
  background-color: rgba(40, 167, 69, 0.85);
`;

const CardRecipeNotificationToast = ({ id, onClose }) => {
  return (
    <NotificationToast
      onClose={() => {
        onClose(id);
      }}
      delay={2500}
      autohide
    >
      <Toast.Body>{ADD_RECIPE_MESSAGE}</Toast.Body>
    </NotificationToast>
  );
};

export default CardRecipeNotificationToast;
