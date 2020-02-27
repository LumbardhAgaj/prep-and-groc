import React from 'react';
import styled from 'styled-components';
import PrepareRecipeButton from 'components/Buttons/PrepareRecipeButton';

const StyledPrepareCardRecipeButton = styled(PrepareRecipeButton)`
  position: absolute;
  top: 9px;
  padding: 0;
  right: 30px;
  color: black;
`;

const PrepareCardRecipeButton = ({ id }) => {
  return (
    <StyledPrepareCardRecipeButton id={id} variant="link">
      <i data-testid="prepare-recipe-icon" className="fas fa-mortar-pestle" />
    </StyledPrepareCardRecipeButton>
  );
};

export default PrepareCardRecipeButton;
