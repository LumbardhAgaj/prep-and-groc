import React from 'react';
import DeleteFridgeIngredientButton from 'components/Buttons/FridgePageButtons/DeleteFridgeIngredientButton';

const FridgeIngredientsTableBody = ({ ingredients }) => {
  return (
    <tbody>
      {ingredients.map(ingredient => {
        return (
          <tr key={ingredient._id}>
            <td>{ingredient.name}</td>
            <td>
              {ingredient.amount} {ingredient.unit}
              {ingredient.meta}
            </td>
            <td>
              {ingredient.remainingAmount} {ingredient.unit}
            </td>
            <td style={{ textAlign: 'center' }}>
              <DeleteFridgeIngredientButton id={ingredient._id} />{' '}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default FridgeIngredientsTableBody;
