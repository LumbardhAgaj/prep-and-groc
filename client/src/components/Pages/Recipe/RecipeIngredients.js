import React from 'react';
import { Table } from 'react-bootstrap';
import TableHead from 'components/TableHead/TableHead';
import EmptyItemsTableBody from 'components/TableBody/EmptyItemsTableBody';

const RECIPE_INGREDIENTS_TABLE_COLUMNS = [
  { width: '5%', label: '#' },
  { width: '60%', label: 'Ingredient' },
  { width: '35%', label: 'Amount' }
];

const RecipeIngredients = ({ ingredients, hasIngredients }) => {
  let recipeIngredientsTableBody;

  if (hasIngredients) {
    recipeIngredientsTableBody = (
      <tbody>
        {ingredients.map((ingredient, index) => {
          return (
            <tr key={ingredient._id}>
              <td>{index + 1}</td>
              <td>{ingredient.name}</td>
              <td>
                {ingredient.amount} {ingredient.unit}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  } else {
    recipeIngredientsTableBody = (
      <EmptyItemsTableBody colSpan={RECIPE_INGREDIENTS_TABLE_COLUMNS.length} />
    );
  }

  return (
    <Table responsive hover>
      <TableHead columns={RECIPE_INGREDIENTS_TABLE_COLUMNS} />
      {recipeIngredientsTableBody}
    </Table>
  );
};

export default RecipeIngredients;
