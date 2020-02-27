import React from 'react';
import { Modal, Table, Col, Row, Container } from 'react-bootstrap';
import PrepareRecipeTableBody from './PrepareRecipeTableBody';
import TableHead from 'components/TableHead/TableHead';

const PREPARE_RECIPE_TABLE_COLS = [
  { width: '45%', label: 'Ingredient' },
  { width: '25%', label: 'Recipe amount' },
  { width: '25%', label: 'Remaining amount' },
  { width: '5%', label: 'Availability' }
];

const PrepareRecipeModalBody = () => {
  return (
    <Modal.Body>
      <Container>
        <Row>
          <Col md={{ span: 12 }} xs={{ span: 12 }}>
            <Table responsive striped bordered hover>
              <TableHead columns={PREPARE_RECIPE_TABLE_COLS} />
              <PrepareRecipeTableBody />
            </Table>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  );
};

export default PrepareRecipeModalBody;
