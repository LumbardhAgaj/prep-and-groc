import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import PrepareRecipeButton from 'components/Buttons/PrepareRecipeButton';
import DeleteRecipePageButton from 'components/Buttons/RecipePageButtons/DeleteRecipePageButton';
import AddRecipePageButton from 'components/Buttons/RecipePageButtons/AddRecipePageButton';
import RemoveRecipePageButton from 'components/Buttons/RecipePageButtons/RemoveRecipePageButton';

const RecipeImage = styled(Image)`
  margin-bottom: 2%;
`;

const RecipePageActions = ({ recipe }) => {
  let recipePageActionButtons;
  if (recipe.isOwner) {
    recipePageActionButtons = (
      <>
        <Col md={{ span: 6 }}>
          <DeleteRecipePageButton id={recipe._id} />
        </Col>
        <Col md={{ span: 6 }}>
          <PrepareRecipeButton id={recipe._id} block>
            <i
              data-testid="prepare-recipe-icon"
              className="fas fa-mortar-pestle"
            />
            Prepare
          </PrepareRecipeButton>
        </Col>
      </>
    );
  } else
    recipePageActionButtons = (
      <>
        <Col md={{ span: 6 }}>
          {recipe.isSaved ? (
            <RemoveRecipePageButton id={recipe._id} />
          ) : (
            <AddRecipePageButton id={recipe._id} />
          )}
        </Col>
        {recipe.isSaved ? (
          <Col md={{ span: 6 }}>
            <PrepareRecipeButton id={recipe._id} block>
              <i
                data-testid="prepare-recipe-icon"
                className="fas fa-mortar-pestle"
              />
              Prepare
            </PrepareRecipeButton>
          </Col>
        ) : null}
      </>
    );

  return (
    <>
      <Row>
        <Col md={{ span: 12 }}>
          <RecipeImage src={recipe.imageUrl} rounded thumbnail fluid />
        </Col>
      </Row>
      <Row>{recipePageActionButtons}</Row>
    </>
  );
};

export default RecipePageActions;
