import { AUTHENTICATION_ERROR } from 'constants/errorNames';

const userLoginCredentials = {
  email: 'agaj.lumbardh@gmail.com',
  password: '1234kmdf444'
};

const user = {
  firstName: 'Lumbardh',
  lastName: 'Agaj',
  email: 'agaj.lumbardh@gmail.com',
  password: '1234kmdf444'
};

const registeredEmailFetchResponse = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        error: true,
        name: 'ValidationError',
        errors: { email: 'E-mail address is already registered' }
      }),
    status: 400
  });

const unregisterdEmailFetchResponse = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        error: true,
        name: 'ValidationError',
        errors: { email: 'email is not registered' }
      }),
    status: 400
  });

const incorrectPasswordFetchResponse = () =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        error: true,
        name: 'ValidationError',
        errors: { password: 'password is incorrect' }
      }),
    status: 400
  });

const unauthorizedFetchResponse = () =>
  Promise.resolve({
    json: () => Promise.resolve({ error: true, name: AUTHENTICATION_ERROR }),
    status: 401
  });

export {
  userLoginCredentials,
  user,
  registeredEmailFetchResponse,
  unregisterdEmailFetchResponse,
  incorrectPasswordFetchResponse,
  unauthorizedFetchResponse
};
