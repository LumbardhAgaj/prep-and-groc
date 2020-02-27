import { useStoreContext } from 'contexts/store';

export default () => {
  const { isLoading, hasError, items } = useStoreContext().page;

  const hasItems = items && items.length > 0;

  return { isLoading, hasError, items, hasItems };
};
