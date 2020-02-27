import React, { useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import PrepareRecipeModalHeader from './PrepareRecipeModalHeader';
import PrepareRecipeModalBody from './PrepareRecipeModalBody';
import PrepareRecipeModalFooter from './PrepareRecipeModalFooter';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { hideModal } from 'actions/modal';
import { prepareRecipe, removePreparedRecipe } from 'actions/prepare';
import { useStoreUpdateContext, useStoreContext } from 'contexts/store';
import useIsModalShown from 'hooks/useIsModalShown';
import { PREPARE_RECIPE_MODAL } from 'constants/modalNames';

const PrepareRecipeModal = () => {
  const dispatch = useStoreUpdateContext();
  const recipeId = useStoreContext().prepare;
  const isModalShown = useIsModalShown(PREPARE_RECIPE_MODAL);

  const onHide = useCallback(() => {
    dispatch(hideModal(PREPARE_RECIPE_MODAL));
  }, [dispatch]);

  useEffect(() => {
    prepareRecipe(recipeId)(dispatch);
    return () => {
      removePreparedRecipe();
    };
  }, [recipeId, dispatch]);

  return (
    <Modal
      show={isModalShown}
      onHide={onHide}
      centered
      data-testid="prepare-recipe-modal"
    >
      <PrepareRecipeModalHeader />
      <ErrorBoundary>
        <PrepareRecipeModalBody />
      </ErrorBoundary>
      <PrepareRecipeModalFooter onClose={onHide} />
    </Modal>
  );
};

export default PrepareRecipeModal;
