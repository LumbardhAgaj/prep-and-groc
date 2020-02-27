import React from 'react';
import ObjectID from 'bson-objectid';

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(col => {
          return (
            <th style={{ width: col.width }} key={ObjectID()}>
              {col.label}{' '}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
