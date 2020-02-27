import React from 'react';
import TableBody from './TableBody';

const ErrorMessageTableBody = ({ colSpan }) => {
  return (
    <TableBody colSpan={colSpan}>
      {' '}
      An error occured. We could not get the items at this time.{' '}
    </TableBody>
  );
};

export default ErrorMessageTableBody;
