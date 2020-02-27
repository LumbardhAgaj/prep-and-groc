import React from 'react';
import { Redirect } from 'react-router-dom';
import { useStoreContext } from 'contexts/store';
import LoginPageHeader from './LoginPageHeader';
import LoginPageBody from './LoginPageBody';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { user } = useStoreContext();

  if (user.isAuthenticated) {
    return (
      <Redirect
        to={location.state ? location.state.from : history.goBack() || '/'}
      />
    );
  }

  return (
    <>
      <LoginPageHeader />
      <LoginPageBody />
    </>
  );
};

export default Login;
