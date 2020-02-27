import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';

const PageLineWrapper = styled.div`
  position: relative;
  width: auto;
  height: 2rem;
  margin: 10% auto 0 auto;
`;

const PageLineElement = styled.div`
  text-align: center;
`;

const PageLine = ({ children }) => (
  <Container>
    <Row>
      <PageLineWrapper>
        <PageLineElement>{children}</PageLineElement>
      </PageLineWrapper>
    </Row>
  </Container>
);

export default PageLine;
