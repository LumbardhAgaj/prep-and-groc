import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SaveRecipeForm from 'components/SaveRecipeForm/SaveRecipeForm';

const SaveRecipePageForm = ({
  recipeValues,
  setRecipeValues,
  setActiveForm
}) => {
  const saveRecipe = (values, { setSubmitting }) => {
    setRecipeValues(values);
    setSubmitting(false);
    setActiveForm('ingredients');
  };

  return (
    <Row>
      <Col md={{ span: 8, offset: 3 }}>
        <SaveRecipeForm onSubmit={saveRecipe} initialValues={recipeValues} />
      </Col>
    </Row>
  );
};

export default SaveRecipePageForm;
