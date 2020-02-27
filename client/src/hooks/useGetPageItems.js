import { useEffect } from 'react';
import { useStoreContext, useStoreUpdateContext } from 'contexts/store';
import { fetchPageItems } from 'actions/page';

const useGetPageItems = (baseUrl, urlParameters) => {
  const dispatch = useStoreUpdateContext();
  const { isAuthenticated } = useStoreContext().user;

  useEffect(() => {
    fetchPageItems(baseUrl, urlParameters)(dispatch);
  }, [isAuthenticated, baseUrl, urlParameters, dispatch]);
};

export default useGetPageItems;
