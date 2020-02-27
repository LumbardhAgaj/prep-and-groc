import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ObjectID from 'bson-objectid';
import SaveIngredientForm from 'components/SaveIngredientForm/SaveIngredientForm';
import RecipeIngredientsTable from './RecipeIngredientsTable';

const SaveRecipeIngredientsPage = ({ recipeValues, setRecipeValues }) => {
  const { ingredients } = recipeValues;

  const isIngredientSaved = name =>
    ingredients &&
    ingredients.find(
      ingredient => ingredient.name.toLowerCase() === name.toLowerCase()
    );

  const saveIngredient = (values, { setErrors, resetForm, setSubmitting }) => {
    if (isIngredientSaved(values.name)) {
      setErrors({ name: 'Fridge ingredient already exists' });
    } else {
      const ingredient = { ...values, _id: ObjectID().toHexString() };
      setRecipeValues(state => ({
        ...state,
        ingredients: ingredients.concat(ingredient)
      }));
      resetForm();
    }
    setSubmitting(false);
  };

  return (
    <>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <SaveIngredientForm onSaveIngredient={saveIngredient} />
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <RecipeIngredientsTable
            ingredients={ingredients}
            setRecipeValues={setRecipeValues}
          />
        </Col>
      </Row>
    </>
  );
};

export default SaveRecipeIngredientsPage;
