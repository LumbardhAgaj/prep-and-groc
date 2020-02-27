import React from 'react';
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import Root from 'components/Root/Root';
import LoginForm from './LoginForm';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import { failFetchResponse } from '__fakes__/fetchResponses';
import {
  unregisterdEmailFetchResponse,
  incorrectPasswordFetchResponse
} from '__fakes__/users';
import { userLoginCredentials } from '__fakes__/users';
import { UNKNOWN_ERROR_MESSAGE } from 'constants/userMessages';

const fetchMock = jest.spyOn(global, 'fetch');

const renderComponent = () => ({
  ...render(
    <Root>
      <NotificationToast />
      <LoginForm />
    </Root>
  )
});

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

describe('LoginForm component', () => {
  test('should render LoginForm', () => {
    const { getByLabelText } = renderComponent();
    expect(getByLabelText('E-mail')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
  });

  describe('LoginForm with invalid login credentials', () => {
    test('should render validation error when user submits empty form', async () => {
      const { getByText } = renderComponent();
      const loginButton = getByText('Login');
      fireEvent.click(loginButton);
      await wait(() => {
        expect(getByText('email is required')).toBeInTheDocument();
        expect(getByText('password is required')).toBeInTheDocument();
      });
    });

    test('should render validation error when user submits form with invalid e-mail', async () => {
      const invalidEmailAddress = 'agaj.lum@km';
      const { getByLabelText, getByText } = renderComponent();
      const emailTextInput = getByLabelText('E-mail');
      fireEvent.change(emailTextInput, {
        target: { value: invalidEmailAddress }
      });

      const loginButton = getByText('Login');
      fireEvent.click(loginButton);

      await wait(() => {
        expect(
          getByText('email must be a valid format e.g. username@gmail.com')
        ).toBeInTheDocument();
        expect(getByText('password is required')).toBeInTheDocument();
      });
    });

    test('should render validation error when user submits form with password length shorter than 6 characters', async () => {
      const invalidPasswordShortLength = '1234';
      const { getByLabelText, getByText } = renderComponent();
      const passwordTextInput = getByLabelText('Password');
      fireEvent.change(passwordTextInput, {
        target: { value: invalidPasswordShortLength }
      });

      const loginButton = getByText('Login');
      fireEvent.click(loginButton);

      await wait(() => {
        expect(getByText('email is required')).toBeInTheDocument();
        expect(
          getByText('password must be at least 6 characters')
        ).toBeInTheDocument();
      });
    });

    test('should render validation error when user submits form with password length longer than 30 characters', async () => {
      const { getByLabelText, getByText } = renderComponent();
      const passwordTextInput = getByLabelText('Password');
      const invalidPasswordLongLength =
        'kmdfkmaf123ksdfmk!!23kmdfk#@@mdfmdfnudfdsf';
      fireEvent.change(passwordTextInput, {
        target: { value: invalidPasswordLongLength }
      });
      const loginButton = getByText('Login');
      fireEvent.click(loginButton);

      await wait(() => {
        expect(getByText('email is required')).toBeInTheDocument();
        expect(
          getByText('password must be at most 20 characters')
        ).toBeInTheDocument();
      });
    });
  });

  describe('LoginForm with valid login credentials', () => {
    let component;
    beforeEach(() => {
      component = renderComponent();
      const { getByLabelText } = component;
      const emailTextInput = getByLabelText('E-mail');
      fireEvent.change(emailTextInput, {
        target: { value: userLoginCredentials.email }
      });

      const passwordTextInput = getByLabelText('Password');
      fireEvent.change(passwordTextInput, {
        target: { value: userLoginCredentials.password }
      });
    });

    test('should render validation error when user submits form with unregistered e-mail', async () => {
      fetchMock.mockImplementationOnce(unregisterdEmailFetchResponse);
      const { getByText } = component;
      const loginButton = getByText('Login');
      fireEvent.click(loginButton);

      await wait(() => {
        expect(getByText('email is not registered')).toBeInTheDocument();
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    });

    test('should render validation error when user submits form with incorrect password', async () => {
      fetchMock.mockImplementationOnce(incorrectPasswordFetchResponse);
      const { getByText } = component;
      const loginButton = getByText('Login');
      fireEvent.click(loginButton);

      await wait(() => {
        expect(getByText('password is incorrect')).toBeInTheDocument();
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    });

    test('should render NotificationToast error message when login action fails', async () => {
      fetchMock.mockImplementationOnce(failFetchResponse);
      const { getByText } = component;
      const loginButton = getByText('Login');
      fireEvent.click(loginButton);

      await wait(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument();
      });
    });
  });
});
