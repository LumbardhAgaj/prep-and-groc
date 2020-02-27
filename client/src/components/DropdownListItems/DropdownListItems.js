import React from 'react';

const DropdownListItems = ({
  options,
  valueParameterName,
  labelParameterName
}) => {
  return (
    <>
      {options.map(option => {
        return (
          <option
            key={option.id}
            data-testid="dropdown-list-item"
            value={option[valueParameterName]}
          >
            {option[labelParameterName]}
          </option>
        );
      })}
    </>
  );
};

export default DropdownListItems;
