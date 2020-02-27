import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Label = styled.label`
  font-size: 0.85em;
  font-weight: 100;
  margin-bottom: 0px;
  margin-left: 5px;
  @media (max-width: 767px) {
    text-align: left;
    margin-left: 10px;
  }
`;

const StaticDropdownFilter = ({
  name,
  isSearchable = false,
  items,
  initialValue = {},
  onChange
}) => {
  return (
    <>
      <Label>{name}</Label>
      <Select
        placeholder={name}
        isClearable
        defaultValue={initialValue.value && initialValue}
        isSearchable={isSearchable}
        options={items}
        onChange={onChange}
      />
    </>
  );
};

export default StaticDropdownFilter;
