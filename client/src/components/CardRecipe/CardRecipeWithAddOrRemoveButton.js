import React, { useState } from 'react';
import CardRecipeNotificationToast from 'components/NotificationToast/CardRecipeNotificationToast';
import CardRecipeTemplate from './CardRecipeTemplate';
import AddCardRecipeButton from 'components/Buttons/HomePageButtons/AddCardRecipeButton';
import RemoveCardRecipeButton from 'components/Buttons/HomePageButtons/RemoveCardRecipeButton';

const CardRecipeWithAddOrRemoveBtn = ({ cardRecipe }) => {
  const [
    isCardRecipeNotificationToastDisplayed,
    setIsCardRecipeNotificationToastDisplayed
  ] = useState(false);

  const closeCardRecipeNotificationToast = () => {
    setIsCardRecipeNotificationToastDisplayed(false);
  };

  const addCardRecipeNotificationToast = () => {
    setIsCardRecipeNotificationToastDisplayed(true);
  };
  let recipeButton;
  if (cardRecipe.isSaved) {
    recipeButton = <RemoveCardRecipeButton id={cardRecipe._id} />;
  } else {
    recipeButton = (
      <AddCardRecipeButton
        id={cardRecipe._id}
        addCardRecipeSuccessToast={addCardRecipeNotificationToast}
      />
    );
  }

  const savedRecipeNotificationToast = isCardRecipeNotificationToastDisplayed ? (
    <CardRecipeNotificationToast
      id={cardRecipe._id}
      onClose={closeCardRecipeNotificationToast}
    />
  ) : null;

  return (
    <CardRecipeTemplate
      recipeButton={recipeButton}
      recipe={cardRecipe}
      notificationToast={savedRecipeNotificationToast}
    />
  );
};

export default CardRecipeWithAddOrRemoveBtn;
