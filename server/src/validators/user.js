const Yup = require('yup');

const email = Yup.string()
  .email('email must be a valid format e.g. username@gmail.com')
  .required('email is required');
const password = Yup.string()
  .required('password is required')
  .min(6)
  .max(20);

const UserSignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]*$/, 'name must contain letters only')
    .required('name is required')
    .max(30),
  lastName: Yup.string()
    .matches(/^[A-Za-z]*$/, 'last name must contain letters only')
    .required('last name is required')
    .max(30),
  email,
  password
});

const UserLoginSchema = Yup.object().shape({
  email,
  password
});

module.exports = { UserSignUpSchema, UserLoginSchema };
