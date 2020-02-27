import React from 'react';
import { Tabs, Tab, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import RecipeIngredients from './RecipeIngredients';
import RecipeInstructions from './RecipeInstructions';
import RecipePageActions from './RecipePageActions';
import RecipeDetails from './RecipeDetails';
import Body from 'components/PageLayout/Body';

const PageTabs = styled(Tabs)`
  & a {
    color: black;
    border-color: rgb(207, 197, 213) !important;
  }
  .active {
    background-color: rgb(207, 197, 213) !important;
  }
`;

const RecipePageBody = ({ recipe }) => {
  const { instructions, ingredients } = recipe;

  const hasIngredients = ingredients && ingredients.length > 0;

  return (
    <Body>
      <Container>
        <Row>
          <Col md={{ span: 4 }}>
            <RecipePageActions recipe={recipe} />
            <RecipeDetails recipe={recipe} />
          </Col>

          <Col md={{ span: 8 }}>
            <PageTabs defaultActiveKey="instructions" fill>
              <Tab eventKey="instructions" title="Instructions">
                <RecipeInstructions instructions={instructions} />
              </Tab>
              <Tab eventKey="ingredients" title="Ingredients">
                <RecipeIngredients
                  ingredients={ingredients}
                  hasIngredients={hasIngredients}
                />
              </Tab>
            </PageTabs>
          </Col>
        </Row>
      </Container>
    </Body>
  );
};

export default RecipePageBody;
