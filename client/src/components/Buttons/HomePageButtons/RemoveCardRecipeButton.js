import React from 'react';
import styled from 'styled-components';
import LoadingButton from 'components/Buttons/LoadingButton';
import { removeCollectedRecipeFromHomePage } from 'actions/recipe';
import useDispatchActionFromButton from 'hooks/useDispatchActionFromButton';

const StyledRemoveCardRecipeButton = styled(LoadingButton)`
  position: absolute;
  top: 10px;
  padding: 0;
  color: black
  right: 5px;
  :hover {
    color:white
  }
`;

const RemoveCardRecipeButton = ({ id }) => {
  const {
    dispatch,
    notify,
    isDisabled,
    setIsDisabled
  } = useDispatchActionFromButton();
  return (
    <StyledRemoveCardRecipeButton
      onClick={() =>
        removeCollectedRecipeFromHomePage(id, setIsDisabled)(dispatch, notify)
      }
      variant="link"
      isDisabled={isDisabled}
    >
      <i data-testid="remove-icon" className="fas fa-heart" />
    </StyledRemoveCardRecipeButton>
  );
};

export default RemoveCardRecipeButton;
