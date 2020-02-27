import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import styled from 'styled-components';
import AuthRoute from 'components/AuthRoute/AuthRoute';
import Home from 'components/Pages/Home/Home';
import MyRecipes from 'components/Pages/MyRecipes/MyRecipes';
import Fridge from 'components/Pages/Fridge/Fridge';
import Groceries from 'components/Pages/Groceries/Groceries';
import SaveRecipe from 'components/Pages/SaveRecipe/SaveRecipe';
import Recipe from 'components/Pages/Recipe/Recipe';
import Login from 'components/Pages/Login/Login';
import NotFoundPage from 'components/Pages/NotFound/NotFoundPage';
import Sidebar from './Sidebar';
import { useStoreUpdateContext } from 'contexts/store';
import { findIsUserAuthenticated } from 'actions/user';
import browserHistory from 'utils/browserHistory';

const Container = styled.div`
  margin-left: 100px;
  position: relative;
  @media (max-width: 767px) {
    margin-left: 80px;
  }
`;

const Content = () => {
  const dispatch = useStoreUpdateContext();

  useEffect(() => {
    findIsUserAuthenticated()(dispatch);
  }, [dispatch]);

  return (
    <Router history={browserHistory}>
      <Container>
        <Sidebar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/recipe/:id" component={Recipe} />
          <Route path="/login" component={Login} />
          <AuthRoute path="/myrecipes" component={MyRecipes} />
          <AuthRoute path="/fridge" component={Fridge} />
          <AuthRoute path="/groceries" component={Groceries} />
          <AuthRoute path="/save-recipe" component={SaveRecipe} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Content;
