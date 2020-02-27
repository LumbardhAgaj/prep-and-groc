import React from 'react';
import { Spinner } from 'react-bootstrap';
import TableBody from './TableBody';

const LoadingSpinnerTableBody = ({ colSpan }) => {
  return (
    <TableBody colSpan={colSpan}>
      {' '}
      <Spinner animation="border" variant="dark" />{' '}
    </TableBody>
  );
};

export default LoadingSpinnerTableBody;
