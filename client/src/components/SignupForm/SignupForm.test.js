import React from 'react';
import { render, fireEvent, cleanup, wait } from '@testing-library/react';
import Root from 'components/Root/Root';
import SignUpForm from './SignupForm';
import NotificationToast from 'components/NotificationToast/NotificationToast';
import {
  failFetchResponse,
  successFetchResponse
} from '__fakes__/fetchResponses';
import { registeredEmailFetchResponse, user } from '__fakes__/users';
import { UNKNOWN_ERROR_MESSAGE } from 'constants/userMessages';

const renderComponent = () => ({
  ...render(
    <Root>
      <NotificationToast />
      <SignUpForm />
    </Root>
  )
});

const fetchMock = jest.spyOn(global, 'fetch');

afterEach(() => {
  cleanup();
  fetchMock.mockReset();
});

describe('SignUpForm component', () => {
  describe('SignUpForm with invalid user input', () => {
    test('should render SignUpForm', () => {
      const { getByLabelText } = renderComponent();
      expect(getByLabelText('First name')).toBeInTheDocument();
      expect(getByLabelText('Last name')).toBeInTheDocument();
      expect(getByLabelText('E-mail')).toBeInTheDocument();
      expect(getByLabelText('Password')).toBeInTheDocument();
    });

    test('should render validation error when user submits empty form', async () => {
      const { getByText } = renderComponent();
      const signupButton = getByText('Signup');
      fireEvent.click(signupButton);
      await wait(() => {
        expect(fetchMock).not.toHaveBeenCalled();
        expect(getByText('name is required')).toBeInTheDocument();
        expect(getByText('last name is required')).toBeInTheDocument();
        expect(getByText('email is required')).toBeInTheDocument();
        expect(getByText('password is required')).toBeInTheDocument();
      });
    });

    test('should render validation error when user submits form with non-alphabetical first name or last name', async () => {
      const invalidUserFirstName = '123kmd';
      const invalidUserLastName = 'sd1234';
      const { getByLabelText, getByText } = renderComponent();

      const firstNameTextInput = getByLabelText('First name');
      fireEvent.change(firstNameTextInput, {
        target: { value: invalidUserFirstName }
      });

      const lastNameTextInput = getByLabelText('Last name');
      fireEvent.change(lastNameTextInput, {
        target: { value: invalidUserLastName }
      });

      const signupButton = getByText('Signup');
      fireEvent.click(signupButton);

      await wait(() => {
        expect(fetchMock).not.toHaveBeenCalled();
        expect(getByText('name must contain letters only')).toBeInTheDocument();
        expect(
          getByText('last name must contain letters only')
        ).toBeInTheDocument();
      });
    });

    test('should render validation error when user submits form with first name and last name characters longer than 30', async () => {
      const invalidUserFirstName =
        'kmdfkmafskmdfksmfksfujsndfshgdhfngjdfgjndfjgndjng';
      const invalidUserLastName = 'ksmhdnfgjdfgnjjnjngdfjgnnndfjgdfgkmiwierw';

      const { getByLabelText, getByText } = renderComponent();

      const firstNameTextInput = getByLabelText('First name');
      fireEvent.change(firstNameTextInput, {
        target: { value: invalidUserFirstName }
      });

      const lastNameTextInput = getByLabelText('Last name');
      fireEvent.change(lastNameTextInput, {
        target: { value: invalidUserLastName }
      });

      const signupButton = getByText('Signup');
      fireEvent.click(signupButton);

      await wait(() => {
        expect(fetchMock).not.toHaveBeenCalled();
        expect(
          getByText('firstName must be at most 30 characters')
        ).toBeInTheDocument();
        expect(
          getByText('lastName must be at most 30 characters')
        ).toBeInTheDocument();
        expect(getByText('email is required')).toBeInTheDocument();
        expect(getByText('password is required')).toBeInTheDocument();
      });
    });
  });

  describe('SignUpForm with valid user input', () => {
    let component;

    beforeEach(() => {
      component = renderComponent();
      const { getByLabelText } = component;
      const firstNameTextInput = getByLabelText('First name');
      fireEvent.change(firstNameTextInput, {
        target: { value: user.firstName }
      });

      const lastNameTextInput = getByLabelText('Last name');
      fireEvent.change(lastNameTextInput, {
        target: { value: user.lastName }
      });

      const emailTextInput = getByLabelText('E-mail');
      fireEvent.change(emailTextInput, {
        target: { value: user.email }
      });

      const passwordTextInput = getByLabelText('Password');
      fireEvent.change(passwordTextInput, {
        target: { value: user.password }
      });
    });

    test('should render validation error when user submits registered e-mail address', async () => {
      fetchMock.mockImplementationOnce(registeredEmailFetchResponse);
      const { getByText } = component;
      const signupButton = getByText('Signup');
      fireEvent.click(signupButton);

      await wait(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(
          getByText('E-mail address is already registered')
        ).toBeInTheDocument();
      });
    });

    test('should render NotificationToast error message when signup action fails', async () => {
      fetchMock.mockImplementationOnce(failFetchResponse);
      const { getByText } = component;
      const signupButton = getByText('Signup');
      fireEvent.click(signupButton);

      await wait(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(getByText(UNKNOWN_ERROR_MESSAGE)).toBeInTheDocument();
      });
    });

    test('should sign up the user', async () => {
      fetchMock.mockImplementationOnce(successFetchResponse);
      const { getByText } = component;
      const signupButton = getByText('Signup');
      fireEvent.click(signupButton);
      await wait(() => {
        expect(fetchMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
