import { useStoreContext, useStoreUpdateContext } from 'contexts/store';
import { useNotificationUpdateContext } from 'contexts/notification';

export default () => {
  const state = useStoreContext();
  const dispatch = useStoreUpdateContext();
  const notify = useNotificationUpdateContext();

  return { state, dispatch, notify };
};
