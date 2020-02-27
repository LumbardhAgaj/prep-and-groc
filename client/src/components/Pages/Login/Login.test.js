import React from 'react';
import { Button } from 'react-bootstrap';
import {
  render,
  fireEvent,
  wait,
  cleanup,
  waitForElement
} from '@testing-library/react';
import { Switch, Route, Router } from 'react-router-dom';
import Root from 'components/Root/Root';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import AuthRoute from 'components/AuthRoute/AuthRoute';
import Login from './Login';
import Home from 'components/Pages/Home/Home';
import Groceries from 'components/Pages/Groceries/Groceries';
import { useStoreUpdateContext, useStoreContext } from 'contexts/store';
import { useNotificationUpdateContext } from 'contexts/notification';
import { showModal } from 'actions/modal';
import { logoutUser } from 'actions/user';
import { SIGNUP_MESSAGE } from 'constants/userMessages';
import browserHistory from 'utils/browserHistory';
import { user } from '__fakes__/users';
import { ingredientsFetchResponse } from '__fakes__/ingredients';
import { userRecipesFetchResponse } from '__fakes__/recipes';
import { successFetchResponse } from '__fakes__/fetchResponses';
import {
  groceryItems,
  groceryItemsFetchResponse
} from '__fakes__/groceryItems';

const Panel = () => {
  const dispatch = useStoreUpdateContext();
  const notify = useNotificationUpdateContext();
  const { isAuthenticated } = useStoreContext().user;
  if (isAuthenticated) {
    return (
      <div id="top-panel">
        <Button
          variant="link"
          onClick={() => {
            logoutUser(() => {})(dispatch, notify);
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
  return (
    <div id="top-panel">
      <Button
        variant="link"
        onClick={() => {
          dispatch(showModal('login-modal'));
        }}
      >
        Login/Signup
      </Button>
    </div>
  );
};

const renderPage = (initialRoute = '/login') => {
  browserHistory.push(initialRoute);
  return {
    ...render(
      <Root>
        <NotificationToast />
        <Router history={browserHistory}>
          <Panel />
          <Switch>
            <Route path="/" component={Home} exact />
            <AuthRoute path="/groceries" component={Groceries} exact />
            <Route path="/login" component={Login} exact />
          </Switch>
        </Router>
      </Root>
    )
  };
};

const fetchMock = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: 'auth="sdkfmskmdfmdksf"'
});

describe('Login page', () => {
  test('should render Login page', () => {
    const { getByText, getAllByText, getByLabelText } = renderPage();
    expect(getByText('Prep&Groc members login page')).toBeInTheDocument();
    expect(getAllByText('Login')).toHaveLength(2);
    expect(getByLabelText('E-mail')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  test('should render Signup form when user selects SignUp button', async () => {
    const { getByText, getAllByText, getByLabelText } = renderPage();
    const signupButton = getByText('Signup');
    fireEvent.click(signupButton);

    await wait(() => {
      expect(getByLabelText('First name')).toBeInTheDocument();
      expect(getByLabelText('Last name')).toBeInTheDocument();
      expect(getAllByText('Signup')).toHaveLength(2);
    });
  });

  test('should login the user and redirect to Groceries page', async () => {
    fetchMock
      .mockImplementationOnce(successFetchResponse)
      .mockImplementationOnce(groceryItemsFetchResponse);

    const { getByText, getByLabelText, getAllByText } = renderPage(
      '/groceries'
    );

    const emailTextInput = getByLabelText('E-mail');
    fireEvent.change(emailTextInput, { target: { value: user.email } });

    const passwordTextInput = getByLabelText('Password');
    fireEvent.change(passwordTextInput, { target: { value: user.password } });

    const loginButton = getAllByText('Login');
    fireEvent.click(loginButton[loginButton.length - 1]);

    await wait(() => {
      groceryItems.forEach(item => {
        expect(getByText(item.name)).toBeInTheDocument();
      });
    });
  });

  test('should sign up the user and redirect to Home page', async () => {
    fetchMock
      .mockImplementationOnce(successFetchResponse)
      .mockImplementationOnce(ingredientsFetchResponse)
      .mockImplementationOnce(userRecipesFetchResponse);

    const { getByText, getByLabelText, getAllByText } = renderPage('/login');

    const signUpTabButton = getByText('Signup');
    fireEvent.click(signUpTabButton);

    const firstNameTextInput = await waitForElement(() =>
      getByLabelText('First name')
    );
    fireEvent.change(firstNameTextInput, { target: { value: user.firstName } });

    const lastNameTextInput = getByLabelText('Last name');
    fireEvent.change(lastNameTextInput, { target: { value: user.lastName } });

    const emailTextInput = getByLabelText('E-mail');
    fireEvent.change(emailTextInput, { target: { value: user.email } });

    const passwordTextInput = getByLabelText('Password');
    fireEvent.change(passwordTextInput, { target: { value: user.password } });

    const signupButton = getAllByText('Signup');
    fireEvent.click(signupButton[signupButton.length - 1]);

    await wait(() => expect(getByText(SIGNUP_MESSAGE)));
  });
});
