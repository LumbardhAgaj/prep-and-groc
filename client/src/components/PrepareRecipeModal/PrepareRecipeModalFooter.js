import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import SaveManyGroceryItemsButton from 'components/Buttons/SaveManyGroceryItemsButton';

export default ({ onClose }) => {
  return (
    <Modal.Footer>
      <Container>
        <Row>
          <Col md={5} xs={4} sm={4}>
            <Button variant="secondary" block onClick={onClose}>
              Close
            </Button>
          </Col>
          <Col md={7} xs={8} sm={8}>
            <SaveManyGroceryItemsButton />
          </Col>
        </Row>
      </Container>
    </Modal.Footer>
  );
};
