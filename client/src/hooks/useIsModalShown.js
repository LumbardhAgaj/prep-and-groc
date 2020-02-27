import { useStoreContext } from 'contexts/store';

export default modalName => {
  const { name, isShown } = useStoreContext().modal;

  return name === modalName && isShown;
};
