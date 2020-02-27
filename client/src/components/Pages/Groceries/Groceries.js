import React from 'react';
import { useLocation } from 'react-router-dom';
import useGetPageItems from 'hooks/useGetPageItems';
import GroceriesPageBody from './GroceriesPageBody';
import GroceriesPageHeader from './GroceriesPageHeader';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { GROCERY_ITEMS_ROUTE } from 'constants/applicationRoutes';

const Groceries = () => {
  const { search } = useLocation();

  useGetPageItems(GROCERY_ITEMS_ROUTE, search);

  return (
    <>
      <GroceriesPageHeader />
      <ErrorBoundary>
        <GroceriesPageBody />
      </ErrorBoundary>
    </>
  );
};

export default Groceries;
