import React, { useState } from 'react';
import { InputGroup, FormControl, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

const SearchBarColumn = styled(Col)`
  margin-top: 75px;
  margin-bottom: 15px;
  @media (max-width: 767px) {
    margin-top: 50px;
    margin-bottom: 5% !important;
  }
  & input {
    font-size: 0.9em;
  }
`;

const SearchInput = styled(FormControl)`
  height: auto;
  padding-right: 35px;
  &::-webkit-input-placeholder {
    font-style: italic;
  }
  :focus {
    box-shadow: none;
  }
`;

const SearchButton = styled(Button)`
  :focus {
    box-shadow: none;
  }
`;
const ClearSearchBarButton = styled(Button)`
  position: absolute;
  right: 42px;
  top: 2px;
  z-index: 500;
`;

const SearchBar = ({ onClick, placeholder, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const onChangeHandle = event => {
    setInputValue(event.target.value);
  };

  const onKeyUpHandle = ({ key, keyCode, target }) => {
    const backspaceKeyCode = 8;

    if (key === 'Enter' && target.value) {
      onClick(target.value);
    }
    if (keyCode === backspaceKeyCode && !target.value) {
      onClearHandle();
    }
  };

  const onClearHandle = () => {
    setInputValue('');
    onClick();
  };

  return (
    <SearchBarColumn
      md={{ span: 6, offset: 3 }}
      sm={{ span: 12, offset: 0 }}
      xs={{ span: 12, offset: 0 }}
    >
      <InputGroup>
        <SearchInput
          placeholder={placeholder}
          value={inputValue}
          aria-label={placeholder}
          data-testid="search-input-control"
          onChange={onChangeHandle}
          onKeyUp={onKeyUpHandle}
          aria-describedby="basic-addon2"
        />
        {inputValue && (
          <ClearSearchBarButton
            variant="link"
            data-testid="clear-searchbar-btn"
            onClick={onClearHandle}
          >
            <i className="fas fa-times" />
          </ClearSearchBarButton>
        )}
        <InputGroup.Append>
          <SearchButton
            id="inputGroupAppend"
            data-testid="search-button"
            onClick={() => onClick(inputValue)}
          >
            <i className="fas fa-search" />
          </SearchButton>
        </InputGroup.Append>
      </InputGroup>
    </SearchBarColumn>
  );
};

export default SearchBar;
