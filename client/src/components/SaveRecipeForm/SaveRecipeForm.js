import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { SaveRecipeSchema } from '@bit/agajlumbardh.prep-and-groc-validators.recipe';
import DropdownListItems from 'components/DropdownListItems/DropdownListItems';

import COUNTRIES from 'data/recipeCountryOptionValues.json';
import CATEGORIES from 'data/recipeCategoryOptionValues.json';

const SaveRecipeForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      validationSchema={SaveRecipeSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched
      }) => (
        <Form
          noValidate
          className="add-recipe-form"
          data-testid="save-recipe-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Form.Row>
            <Form.Group
              as={Col}
              md={10}
              sm={12}
              xs={12}
              controlId="formGridRecipeTitle"
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter recipe title"
                isInvalid={!!errors.title && touched.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              md={5}
              sm={7}
              xs={12}
              controlId="formGridCategory"
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Select category"
                isInvalid={!!errors.category && touched.category}
              >
                <DropdownListItems
                  options={CATEGORIES}
                  valueParameterName="value"
                  labelParameterName="label"
                />
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} md={5} sm={7} xs={12} controlId="formGridArea">
              <Form.Label>Country origin</Form.Label>
              <Form.Control
                as="select"
                name="area"
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Select country origin"
                isInvalid={!!errors.area && touched.area}
              >
                <DropdownListItems
                  options={COUNTRIES}
                  valueParameterName="value"
                  labelParameterName="label"
                />
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.area}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              md={10}
              sm={12}
              xs={12}
              controlId="formGridIntructions"
            >
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                name="instructions"
                value={values.instructions}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Season the beef cubes with salt and pepper..."
                isInvalid={!!errors.instructions && touched.instructions}
              />
              <Form.Control.Feedback type="invalid">
                {errors.instructions}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group
              as={Col}
              md={10}
              sm={12}
              xs={12}
              controlId="formGridRecipeImage"
            >
              <Form.Label>Recipe Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={values.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.imageUrl && touched.imageUrl}
              />
              <Form.Control.Feedback type="invalid">
                {errors.imageUrl}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              as={Col}
              md={{ span: 4, offset: 3 }}
              sm={7}
              xs={12}
              id="add-recipe-btn"
            >
              <Button variant="primary" type="submit" block>
                Save and Continue
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default SaveRecipeForm;
