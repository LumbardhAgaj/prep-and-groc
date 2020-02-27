import React from 'react';

const TableBody = ({ colSpan, children }) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan} style={{ textAlign: 'center' }}>
          {children}
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody;
