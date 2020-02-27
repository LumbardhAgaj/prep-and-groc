import React from 'react';
import { Table, Button } from 'react-bootstrap';
import EmptyItemsTableBody from 'components/TableBody/EmptyItemsTableBody';
import TableHead from 'components/TableHead/TableHead';

export const RECIPE_INGREDIENT_COLUMNS = [
  { width: '60%', label: 'Ingredient' },
  { width: '30%', label: 'Amount' },
  { width: '10%', label: 'Delete' }
];

const RecipeIngredientsTable = ({ ingredients, setRecipeValues }) => {
  const deleteIngredient = id => {
    setRecipeValues(state => ({
      ...state,
      ingredients: ingredients.filter(ingredient => ingredient._id !== id)
    }));
  };

  const hasIngredients = ingredients && ingredients.length > 0;

  let ingredientsTableBody;

  if (hasIngredients) {
    ingredientsTableBody = (
      <tbody>
        {ingredients.map(ingredient => {
          return (
            <tr key={ingredient._id}>
              <td>{ingredient.name}</td>
              <td>
                {ingredient.amount} {ingredient.unit}
                {ingredient.meta && ingredient.meta.length > 0
                  ? `, ${ingredient.meta}`
                  : ''}
              </td>
              <td style={{ textAlign: 'center' }}>
                <Button
                  variant="danger"
                  size="sm"
                  data-testid="delete-button"
                  onClick={() => {
                    deleteIngredient(ingredient._id);
                  }}
                >
                  Delete
                </Button>{' '}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  } else {
    ingredientsTableBody = (
      <EmptyItemsTableBody colSpan={RECIPE_INGREDIENT_COLUMNS.length} />
    );
  }

  return (
    <Table responsive striped bordered hover>
      <TableHead columns={RECIPE_INGREDIENT_COLUMNS} />
      {ingredientsTableBody}
    </Table>
  );
};

export default RecipeIngredientsTable;
