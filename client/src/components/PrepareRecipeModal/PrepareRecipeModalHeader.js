import React from 'react';
import { Modal } from 'react-bootstrap';

export default () => (
  <Modal.Header closeButton>
    <Modal.Title style={{ fontSize: '1em' }}>
      Recipe ingredients and their fridge availability
    </Modal.Title>
  </Modal.Header>
);
