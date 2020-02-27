import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { Form, Col, Button, Spinner } from 'react-bootstrap';
import SaveFridgeIngredientSchema from '@bit/agajlumbardh.prep-and-groc-validators.fridge';
import DropdownListItems from 'components/DropdownListItems/DropdownListItems';
import DataList from 'components/DataList/DataList';
import handleFetch from 'utils/handleFetch';
import UNITS from 'data/ingredientUnitOptionValues.json';
import { INGREDIENTS_ROUTE } from 'constants/applicationRoutes';

const INITIAL_FORM_VALUES = { name: '', amount: '', unit: 'gr', meta: '' };

const SaveIngredientForm = ({ onSaveIngredient }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    handleFetch(INGREDIENTS_ROUTE).then(response =>
      setIngredients(response.items)
    );
  }, []);

  return (
    <Formik
      validationSchema={SaveFridgeIngredientSchema}
      initialValues={INITIAL_FORM_VALUES}
      onSubmit={onSaveIngredient}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting
      }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ borderBottom: '1px solid lightgrey' }}
        >
          <Form.Row>
            <Form.Group
              as={Col}
              md={4}
              sm={12}
              xs={12}
              controlId="formGridName"
            >
              <Form.Label>Ingredient name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                list="ingredients"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter ingredient name"
                isInvalid={!!errors.name && touched.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md={2}
              sm={7}
              xs={12}
              controlId="formGridamount"
            >
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter amount"
                isInvalid={!!errors.amount && touched.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={2} sm={7} xs={12} controlId="formGridUnit">
              <Form.Label>Unit</Form.Label>
              <Field
                component="select"
                name="unit"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Select unit"
              >
                <DropdownListItems
                  options={UNITS}
                  valueParameterName="value"
                  labelParameterName="label"
                />
              </Field>
              <Form.Control.Feedback type="invalid">
                {errors.unit}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={2} sm={7} xs={12} controlId="formGridMeta">
              <Form.Label>Meta</Form.Label>
              <Form.Control
                type="text"
                name="meta"
                value={values.meta}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. sliced"
                isInvalid={!!errors.meta && touched.meta}
              />
              <Form.Control.Feedback type="invalid">
                {errors.meta}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={2} sm={7} xs={12}>
              <Form.Label style={{ visibility: 'hidden' }}>Label</Form.Label>
              <Button
                variant="primary"
                type="submit"
                block
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner animation="border" variant="secondary" size="sm" />
                ) : (
                  'Save'
                )}
              </Button>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <DataList
              id="ingredients"
              options={ingredients}
              valueParameterName="value"
            />
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default SaveIngredientForm;
