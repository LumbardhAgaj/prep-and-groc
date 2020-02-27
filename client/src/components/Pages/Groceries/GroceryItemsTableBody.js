import React from 'react';
import styled from 'styled-components';
import DeleteGroceryIngredientButton from 'components/Buttons/GroceriesPageButtons/DeleteGroceryIngredientButton';
import MarkCompletedGroceryIngredientCheckbox from 'components/Buttons/GroceriesPageButtons/MarkCompletedGroceryIngredientCheckbox';

const TableDataSpan = styled.span`
  text-decoration: ${props => props.isCompleted && 'line-through'};
`;

const GroceryItemsTableBody = ({ groceryItems }) => {
  return (
    <tbody>
      {groceryItems.map(item => {
        return (
          <tr key={item._id}>
            <td>
              <TableDataSpan isCompleted={item.isCompleted}>
                {item.name}
              </TableDataSpan>
            </td>
            <td>
              <TableDataSpan isCompleted={item.isCompleted}>
                {item.amount} {item.unit}
              </TableDataSpan>
            </td>
            <td style={{ textAlign: 'center' }}>
              <MarkCompletedGroceryIngredientCheckbox
                id={item._id}
                isCompleted={item.isCompleted}
              />{' '}
            </td>
            <td style={{ textAlign: 'center' }}>
              <DeleteGroceryIngredientButton
                id={item._id}
                isCompleted={item.isCompleted}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default GroceryItemsTableBody;
