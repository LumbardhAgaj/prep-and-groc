import React from 'react';
import { useLocation } from 'react-router-dom';
import MyRecipesPageHeader from './MyRecipesPageHeader';
import MyRecipesPageBody from './MyRecipesPageBody';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import useGetPageItems from 'hooks/useGetPageItems';
import { USER_RECIPES_ROUTE } from 'constants/applicationRoutes';

const MyRecipesPage = () => {
  const { search } = useLocation();

  useGetPageItems(USER_RECIPES_ROUTE, search);

  return (
    <>
      <MyRecipesPageHeader />
      <ErrorBoundary>
        <MyRecipesPageBody />
      </ErrorBoundary>
    </>
  );
};
export default MyRecipesPage;
