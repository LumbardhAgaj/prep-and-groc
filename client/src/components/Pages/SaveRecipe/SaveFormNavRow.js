import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'react-bootstrap';

const PreviousButton = styled(Button)`
  margin-top: 5%;
  margin-bottom: 2.5%;
  margin-left: 0;
`;

const SubmitButton = styled(Button)`
  margin-top: 5%;
  margin-bottom: 2.5%;
  margin-right: 0;
  float: right;
`;

export default ({
  hasIngredients,
  isSavingRecipe,
  onSubmitRecipe,
  setActiveForm
}) => {
  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <PreviousButton
          onClick={() => {
            setActiveForm('recipe');
          }}
          disabled={isSavingRecipe}
        >
          Previous
        </PreviousButton>
        <SubmitButton
          disabled={!hasIngredients || isSavingRecipe}
          onClick={onSubmitRecipe}
        >
          Submit
        </SubmitButton>
      </Col>
    </Row>
  );
};
