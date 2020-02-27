import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Body from 'components/PageLayout/Body';
import SaveRecipePageHeader from './SaveRecipePageHeader';
import SaveRecipePageNavRow from './SaveRecipePageNavRow';
import SaveRecipePageForm from './SaveRecipePageForm';
import SaveFormNavRow from './SaveFormNavRow';
import SaveRecipeIngredientsPage from './SaveRecipeIngredientsPage';
import { saveRecipe } from 'actions/recipe';
import useDispatchActionFromComponent from 'hooks/useDispatchActionFromComponent';

const RECIPE_FORM_INITIAL_VALUES = {
  title: '',
  category: 'Beef',
  area: 'British',
  instructions: '',
  imageUrl: '',
  ingredients: []
};

const SaveRecipe = () => {
  const { dispatch, notify } = useDispatchActionFromComponent();
  const [recipeValues, setRecipeValues] = useState(RECIPE_FORM_INITIAL_VALUES);
  const [isSavingRecipe, setIsSavingRecipe] = useState(false);
  const [activeForm, setActiveForm] = useState('recipe');

  const hasIngredients =
    recipeValues.ingredients && recipeValues.ingredients.length > 0;

  const onSubmitRecipe = () => {
    saveRecipe(recipeValues, setIsSavingRecipe)(dispatch, notify);
  };

  return (
    <>
      <SaveRecipePageHeader />
      <Body>
        <Container>
          <SaveRecipePageNavRow activeForm={activeForm} />
          {activeForm === 'recipe' ? (
            <SaveRecipePageForm
              setActiveForm={setActiveForm}
              setRecipeValues={setRecipeValues}
              recipeValues={recipeValues}
            />
          ) : (
            <>
              <SaveRecipeIngredientsPage
                recipeValues={recipeValues}
                setRecipeValues={setRecipeValues}
              />
              <SaveFormNavRow
                isSavingRecipe={isSavingRecipe}
                onSubmitRecipe={onSubmitRecipe}
                hasIngredients={hasIngredients}
                setActiveForm={setActiveForm}
              />
            </>
          )}
        </Container>
      </Body>
    </>
  );
};

export default SaveRecipe;
