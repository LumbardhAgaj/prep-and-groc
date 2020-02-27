import React from 'react';
import { Button } from 'react-bootstrap';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import { useStoreContext, useStoreUpdateContext } from 'contexts/store';
import { useNotificationUpdateContext } from 'contexts/notification';
import Root from 'components/Root/Root';
import LoginModal from './LoginModal';
import { showModal } from 'actions/modal';
import { logoutUser } from 'actions/user';

const Panel = () => {
  const dispatch = useStoreUpdateContext();
  const notify = useNotificationUpdateContext();
  const { user } = useStoreContext();
  if (user.isAuthenticated) {
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
      {' '}
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

const renderComponent = () => ({
  ...render(
    <Root>
      <Panel />
      <LoginModal />
    </Root>
  )
});

afterEach(() => {
  cleanup();
});

describe('LoginModal component', () => {
  test('should not render LoginModal by default', () => {
    const { queryByTestId } = renderComponent();
    expect(queryByTestId('login-modal')).toBeNull();
  });

  test('should render login form by default when user selects Login button', async () => {
    const {
      getByText,
      getByTestId,
      getByLabelText,
      queryByLabelText
    } = renderComponent();

    const loginButton = getByText('Login/Signup');
    fireEvent.click(loginButton);

    await wait(() => {
      expect(getByTestId('login-modal')).toBeInTheDocument();
      expect(getByLabelText('E-mail')).toBeInTheDocument();
      expect(getByLabelText('Password')).toBeInTheDocument();

      expect(queryByLabelText('First name')).toBeNull();
      expect(queryByLabelText('Last name')).toBeNull();

      expect(getByText('Signup')).toBeInTheDocument();
    });
  });

  test('should render  sign up form when user selects Signup button', async () => {
    const { getByText, getByTestId, getByLabelText } = renderComponent();

    const loginButton = getByText('Login/Signup');
    fireEvent.click(loginButton);

    const signUpButton = getByText('Signup');
    fireEvent.click(signUpButton);

    await wait(() => {
      expect(getByTestId('login-modal')).toBeInTheDocument();

      expect(getByLabelText('First name')).toBeInTheDocument();
      expect(getByLabelText('Last name')).toBeInTheDocument();
      expect(getByLabelText('E-mail')).toBeInTheDocument();
      expect(getByLabelText('Password')).toBeInTheDocument();

      expect(getByText('Login')).toBeInTheDocument();
    });
  });
});
