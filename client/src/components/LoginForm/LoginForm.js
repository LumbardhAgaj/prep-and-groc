import React from 'react';
import { Button, Form, Col, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import { UserLoginSchema } from '@bit/agajlumbardh.prep-and-groc-validators.user';
import { loginUser } from 'actions/user';
import useDispatchActionFromComponent from 'hooks/useDispatchActionFromComponent';

const INITIAL_LOGIN_FORM_VALUES = { email: '', password: '' };

const LoginForm = () => {
  const { dispatch, notify } = useDispatchActionFromComponent();

  const onSubmit = (values, { setErrors, resetForm, setSubmitting }) =>
    loginUser(values, setErrors, resetForm, setSubmitting)(dispatch, notify);

  return (
    <Formik
      validationSchema={UserLoginSchema}
      initialValues={INITIAL_LOGIN_FORM_VALUES}
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
                  'Login'
                )}
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
