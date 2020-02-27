import React from 'react';
import useGetPageItems from 'hooks/useGetPageItems';
import FridgePageHeader from './FridgePageHeader';
import FridgePageBody from './FridgePageBody';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { FRIDGE_INGREDIENTS_ROUTE } from 'constants/applicationRoutes';

const Fridge = () => {
  useGetPageItems(FRIDGE_INGREDIENTS_ROUTE);

  return (
    <>
      <FridgePageHeader />
      <ErrorBoundary>
        <FridgePageBody />
      </ErrorBoundary>
    </>
  );
};

export default React.memo(Fridge);
