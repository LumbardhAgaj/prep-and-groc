import React from 'react';
import styled from 'styled-components';
import ErrorMessageTableBody from 'components/TableBody/ErrorMessageTableBody';
import { VALUE_ERROR } from 'constants/errorNames';

const ValueErrorTableData = styled.td`
  color: red;
  font-size: 0.85em;
`;

export default ({ name, errors, colSpan }) => {
  if (name === VALUE_ERROR) {
    return (
      <>
        <tbody>
          {errors.map(error => (
            <tr key={error._id}>
              <ValueErrorTableData>{error.ingredient}</ValueErrorTableData>
              <ValueErrorTableData colSpan={colSpan - 1}>
                {error.message}
              </ValueErrorTableData>
            </tr>
          ))}
        </tbody>
      </>
    );
  } else {
    return <ErrorMessageTableBody colSpan={colSpan} />;
  }
};
