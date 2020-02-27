import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styled from 'styled-components';
import Header from 'components/PageLayout/Header';

const TitleHeader = styled.h1`
  text-align: center;
  margin: 7.5% 0 2.5% 0;
`;

const TitleParagraph = styled.p`
  text-align: center;
`;

const SaveRecipePageHeader = () => {
  return (
    <Header>
      <Container>
        <Row>
          <Col md={12}>
            <TitleHeader>
              Create new recipes and save them to your collection.
            </TitleHeader>
            <TitleParagraph>
              Please fill out all the steps of the form below to create new
              recipes in your collection.
            </TitleParagraph>
          </Col>
        </Row>
      </Container>
    </Header>
  );
};

export default SaveRecipePageHeader;
