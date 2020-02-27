import { useState } from 'react';
import useDispatchActionFromComponent from './useDispatchActionFromComponent';

export default () => {
  const { state, dispatch, notify } = useDispatchActionFromComponent();
  const [isDisabled, setIsDisabled] = useState(false);
  return { state, dispatch, notify, isDisabled, setIsDisabled };
};
