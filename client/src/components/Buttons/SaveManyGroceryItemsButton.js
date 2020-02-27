import React from 'react';
import { Button } from 'react-bootstrap';
import useDispatchActionFromButton from 'hooks/useDispatchActionFromButton';
import { saveGroceryItems } from 'actions/groceryItem';

const SaveManyGroceryItemsButton = () => {
  const {
    state,
    dispatch,
    notify,
    isDisabled,
    setIsDisabled
  } = useDispatchActionFromButton();

  const { hasError, items } = state.modal;

  const hasIngredients = items && items.length > 0;

  const onClick = () =>
    saveGroceryItems(items, setIsDisabled)(dispatch, notify);

  return (
    <Button
      variant="primary"
      block
      disabled={!hasIngredients || hasError || isDisabled}
      onClick={onClick}
    >
      Save to groceries
    </Button>
  );
};

export default SaveManyGroceryItemsButton;
