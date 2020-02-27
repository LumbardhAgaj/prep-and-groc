import React from 'react';
import { Button, Form, Col, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import { UserSignUpSchema } from '@bit/agajlumbardh.prep-and-groc-validators.user';
import { signupUser } from 'actions/user';
import useDispatchActionFromComponent from 'hooks/useDispatchActionFromComponent';

const INITIAL_SIGNUP_FORM_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const SignupForm = () => {
  const { dispatch, notify } = useDispatchActionFromComponent();

  const onSubmit = (values, { setErrors, resetForm, setSubmitting }) =>
    signupUser(values, setErrors, resetForm, setSubmitting)(dispatch, notify);

  return (
    <Formik
      validationSchema={UserSignUpSchema}
      initialValues={INITIAL_SIGNUP_FORM_VALUES}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        isSubmitting
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group
              as={Col}
              md={{ offset: 1, span: 10 }}
              sm={12}
              xs={12}
              controlId="formGridFirstName"
            >
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter name"
                isInvalid={!!errors.firstName && touched.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md={{ offset: 1, span: 10 }}
              sm={12}
              xs={12}
              controlId="formGridLastName"
            >
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter last name"
                isInvalid={!!errors.lastName && touched.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md={{ offset: 1, span: 10 }}
              sm={12}
              xs={12}
              controlId="formGridEmail"
            >
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter e-mail"
                isInvalid={!!errors.email && touched.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md={{ offset: 1, span: 10 }}
              sm={12}
              xs={12}
              controlId="formGridPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter password"
                isInvalid={!!errors.password && touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={{ offset: 4, span: 4 }} sm={12} xs={12}>
              <Button
                variant="primary"
                type="submit"
                block
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner animation="border" variant="secondary" size="sm" />
                ) : (
                  'Signup'
                )}
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
