import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SearchBar from './SearchBar';

const onClickMockFn = jest.fn().mockImplementation(inputValue => inputValue);

afterEach(() => {
  cleanup();
  onClickMockFn.mockClear();
});

const renderComponent = placeholderText => ({
  ...render(<SearchBar placeholder={placeholderText} onClick={onClickMockFn} />)
});

describe('SearchBar component', () => {
  test('should render SearchBar', () => {
    const placeholderText = 'search your recipes';
    const { getByPlaceholderText } = renderComponent(placeholderText);
    const searchInputComponent = getByPlaceholderText(placeholderText);

    expect(searchInputComponent.value).toBe('');
    expect(searchInputComponent.placeholder).toBe(placeholderText);
  });

  test('should return search value when user selects search button', () => {
    const searchQuery = 'Smoked salmon';
    const placeholderText = 'Search your recipes';

    const { getByTestId, getByPlaceholderText } = renderComponent(
      placeholderText
    );

    const searchInput = getByPlaceholderText(placeholderText);
    const searchButton = getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: searchQuery } });
    fireEvent.click(searchButton);

    expect(onClickMockFn).toHaveBeenCalledTimes(1);
    expect(onClickMockFn).toBeCalledWith(searchQuery);
  });
});
