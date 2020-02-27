import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardRecipe = styled(Card)`
  background-color: #e5c3d1;
`;

const CardRecipeHeader = styled(Card.Header)``;

const CardRecipeImage = styled(Card.Img)`
  border-radius: 0;
`;

const CardRecipeBody = styled(Card.Body)`
  position: relative;
  padding: 2%;
  @media (max-width: 767px) {
    padding: 2%;
  }
`;

const CardRecipeTemplate = ({
  recipe,
  recipeButton,
  prepareRecipeButton,
  notificationToast
}) => {
  return (
    <CardRecipe>
      {recipeButton}
      {prepareRecipeButton && prepareRecipeButton}
      <CardRecipeHeader>{recipe.title}</CardRecipeHeader>
      <Link to={`/recipe/${recipe._id}`}>
        <CardRecipeImage src={recipe.imageUrl} />
      </Link>
      <CardRecipeBody>
        {notificationToast}
        <Card.Text className="text-center">
          <small>
            {' '}
            Category:{recipe.category} | Origin:{recipe.area}{' '}
          </small>
        </Card.Text>
      </CardRecipeBody>
    </CardRecipe>
  );
};

export default CardRecipeTemplate;
