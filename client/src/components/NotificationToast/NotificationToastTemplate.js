import React from 'react';
import { Toast } from 'react-bootstrap';
import styled from 'styled-components';

const TOAST_HEIGHT_IN_PX = 95;

const NotificationToast = styled(Toast)`
  position: fixed;
  top: ${props => `${props.index * TOAST_HEIGHT_IN_PX}px`};
  z-index: 1100;
  right: 0;
  width: 100%;
  font-size: 0.85em;
  color: white;
  background-color: ${props =>
    props.type === 'success'
      ? 'rgba(40, 167, 69, 0.85)'
      : 'rgba(220, 53, 69, 0.85)'};
`;

const NotificationToastTemplate = ({ toast, index, onClose }) => {
  return (
    <NotificationToast
      type={toast.type}
      index={index}
      onClose={() => {
        onClose(toast.id);
      }}
      delay={1500}
      autohide={toast.type === 'success'}
    >
      <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
        <strong className="mr-auto">Prep&Groc</strong>
        {/* <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>{toast.message}</Toast.Body>
    </NotificationToast>
  );
};

export default NotificationToastTemplate;
