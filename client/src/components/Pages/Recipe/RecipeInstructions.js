import React from 'react';
import styled from 'styled-components';

const InstructionsParagraph = styled.p`
  white-space: pre-line;
  margin-top: 10px;
  padding: 1%;
`;

const RecipeInstructions = ({ instructions }) => (
  <InstructionsParagraph>{instructions}</InstructionsParagraph>
);

export default RecipeInstructions;
