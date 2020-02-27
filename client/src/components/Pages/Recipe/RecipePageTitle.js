import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Header from 'components/PageLayout/Header';
import { useStoreContext } from 'contexts/store';

const RecipeTitle = styled.h1`
  text-align: center;
  margin: 7.5% 0 2.5% 0;
`;

const RecipePageTitle = () => {
  const { items: recipe } = useStoreContext().page;

  return (
    <Header>
      <Container>
        <Row>
          <Col md={12}>
            <RecipeTitle>{recipe.title}</RecipeTitle>
          </Col>
        </Row>
      </Container>
    </Header>
  );
};

export default RecipePageTitle;
