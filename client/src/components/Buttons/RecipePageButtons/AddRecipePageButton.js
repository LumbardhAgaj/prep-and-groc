import React from 'react';
import LoadingButton from 'components/Buttons/LoadingButton';
import { addRecipeToCollectionFromRecipePage } from 'actions/recipe';
import useDispatchActionFromButton from 'hooks/useDispatchActionFromButton';

const AddRecipePageButton = ({ id }) => {
  const {
    dispatch,
    notify,
    isDisabled,
    setIsDisabled
  } = useDispatchActionFromButton();

  return (
    <LoadingButton
      isDisabled={isDisabled}
      block
      style={{ marginBottom: '1%' }}
      onClick={() =>
        addRecipeToCollectionFromRecipePage(id, setIsDisabled)(dispatch, notify)
      }
      variant="primary"
    >
      <i data-testid="add-icon" className="fas fa-heart" />
      Add
    </LoadingButton>
  );
};

export default AddRecipePageButton;
