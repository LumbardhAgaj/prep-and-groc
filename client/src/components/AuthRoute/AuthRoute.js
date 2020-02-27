import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStoreContext } from 'contexts/store';
import { useLocation } from 'react-router-dom';

const AuthRoute = props => {
  const { user } = useStoreContext();
  const location = useLocation();
  return (
    <>
      {user.isAuthenticated ? (
        <Route {...props} />
      ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )}
    </>
  );
};

export default AuthRoute;
