import React from 'react';
import Content from 'components/PageLayout/Content';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import LoginModal from 'components/LoginModal/LoginModal';
import PrepareRecipeModal from 'components/PrepareRecipeModal/PrepareRecipeModal';
import useIsModalShown from 'hooks/useIsModalShown';
import { LOGIN_MODAL, PREPARE_RECIPE_MODAL } from 'constants/modalNames';

const App = () => {
  const isLoginModalShown = useIsModalShown(LOGIN_MODAL);
  const isPrepareRecipeModalShown = useIsModalShown(PREPARE_RECIPE_MODAL);

  return (
    <>
      <Content />
      <NotificationToast />
      {isLoginModalShown ? <LoginModal /> : null}
      {isPrepareRecipeModalShown ? <PrepareRecipeModal /> : null}
    </>
  );
};

export default App;
