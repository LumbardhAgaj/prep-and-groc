import React from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { markGroceryItemComplete } from 'actions/groceryItem';
import useDispatchActionFromButton from 'hooks/useDispatchActionFromButton';

const MarkCompletedGroceryIngredientCheckbox = ({ id, isCompleted }) => {
  const {
    dispatch,
    notify,
    isDisabled,
    setIsDisabled
  } = useDispatchActionFromButton();

  return (
    <>
      {' '}
      {isDisabled ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <Form.Check type="checkbox">
          <Form.Check.Input
            data-testid="mark-completed-checkbox"
            isStatic={false}
            defaultChecked={isCompleted}
            disabled={isCompleted}
            onClick={() =>
              markGroceryItemComplete(id, setIsDisabled)(dispatch, notify)
            }
          />
        </Form.Check>
      )}
    </>
  );
};

export default MarkCompletedGroceryIngredientCheckbox;
