import React from 'react';
import DeleteCardRecipeButton from 'components/Buttons/MyRecipesPageButtons/DeleteCardRecipeButton';
import RemoveCardRecipeButton from 'components/Buttons/MyRecipesPageButtons/RemoveCardRecipeButton';
import PrepareCardRecipeButton from 'components/Buttons/MyRecipesPageButtons/PrepareCardRecipeButton';
import CardRecipeTemplate from './CardRecipeTemplate';

const CardRecipeWithDeleteOrRemoveBtn = ({ cardRecipe }) => {
  let recipeButton;
  if (cardRecipe.isOwner) {
    recipeButton = <DeleteCardRecipeButton id={cardRecipe._id} />;
  } else {
    recipeButton = <RemoveCardRecipeButton id={cardRecipe._id} />;
  }
  const prepareRecipeButton = <PrepareCardRecipeButton id={cardRecipe._id} />;
  return (
    <CardRecipeTemplate
      recipeButton={recipeButton}
      prepareRecipeButton={prepareRecipeButton}
      recipe={cardRecipe}
    />
  );
};

export default CardRecipeWithDeleteOrRemoveBtn;
