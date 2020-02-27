import React from 'react';

const DataList = ({ id, options, valueParameterName }) => {
  return (
    <datalist id={id} data-testid="datalist">
      {options &&
        options.map(option => {
          return (
            <option
              key={option.id}
              data-testid="datalist-item"
              value={option[valueParameterName]}
            />
          );
        })}
    </datalist>
  );
};

export default DataList;
