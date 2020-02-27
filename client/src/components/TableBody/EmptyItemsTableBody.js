import React from 'react';
import TableBody from './TableBody';

const DEFAULT_EMPTY_ITEMS_MSG = 'There are no items at the moment.';
const EmptyItemsTableBody = ({ colSpan, msg = DEFAULT_EMPTY_ITEMS_MSG }) => {
  return <TableBody colSpan={colSpan}> {msg}</TableBody>;
};

export default EmptyItemsTableBody;
