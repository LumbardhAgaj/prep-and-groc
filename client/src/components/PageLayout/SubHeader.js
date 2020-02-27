import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const SubHeaderContainer = styled(Container)`
  padding: 2.5%;
  margin-bottom: 0;
  text-align: center;
  @media (max-width: 767px) {
    text-align: left;
  }
`;

export default ({ children }) => (
  <SubHeaderContainer fluid>{children}</SubHeaderContainer>
);
