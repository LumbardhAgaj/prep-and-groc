import React from 'react';
import { useParams } from 'react-router-dom';
import RecipePageTitle from './RecipePageTitle';
import RecipePageBody from './RecipePageBody';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import LoadingSpinnerPageLine from 'components/PageLine/LoadingSpinnerPageLine';
import ErrorMessagePageLine from 'components/PageLine/ErrorMessagePageLine';
import NotFoundPage from 'components/Pages/NotFound/NotFoundPage';
import useGetPageItems from 'hooks/useGetPageItems';
import { RECIPES_ROUTE } from 'constants/applicationRoutes';
import useGetPageState from 'hooks/useGetPageState';
import { OBJECT_NOT_FOUND_ERROR } from 'constants/errorNames';

const Recipe = () => {
  const { id } = useParams();

  useGetPageItems(`${RECIPES_ROUTE}/${id}`);

  const { hasError, isLoading, items } = useGetPageState();

  const isRecipeNotFound = hasError && hasError.name === OBJECT_NOT_FOUND_ERROR;

  if (isLoading) {
    return <LoadingSpinnerPageLine />;
  }

  if (isRecipeNotFound) {
    return <NotFoundPage msg={`Recipe with id:${id} was not found.`} />;
  }

  if (hasError) {
    return <ErrorMessagePageLine />;
  }

  return (
    <ErrorBoundary>
      <RecipePageTitle />
      <RecipePageBody recipe={items} />
    </ErrorBoundary>
  );
};

export default Recipe;
