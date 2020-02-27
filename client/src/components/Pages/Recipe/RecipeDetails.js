import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const DetailsRow = styled(Row)`
  margin-bottom: 2.5%;
  margin-top: 5%;
`;

const RecipeDetails = ({ recipe }) => (
  <DetailsRow>
    <Col md={12}>
      <Row>
        <Col md={6}>
          <span>Category: </span>
          {recipe.category}
        </Col>
        <Col md={6}>
          <span>Origin: </span>
          {recipe.area}
        </Col>
      </Row>
    </Col>
    <Col md={12}>
      <span>Author: </span>{' '}
      {recipe.owner && `${recipe.owner.firstName} ${recipe.owner.lastName}`}
    </Col>
  </DetailsRow>
);

export default RecipeDetails;
