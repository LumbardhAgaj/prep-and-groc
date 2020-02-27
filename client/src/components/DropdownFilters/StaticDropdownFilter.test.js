import React, { useReducer } from 'react';
import { render } from '@testing-library/react';
import StaticDropdownFilter from './StaticDropdownFilter';
import pageReducer, { PAGE_INIT_STATE } from 'reducers/page';
import COUNTRIES from 'data/recipeCountryOptionValues.json';

const StaticFilterMockComponentWrapper = () => {
  const [, pageDispatcher] = useReducer(pageReducer, PAGE_INIT_STATE);
  return (
    <StaticDropdownFilter
      items={COUNTRIES}
      name="Country"
      dispatch={pageDispatcher}
    />
  );
};

describe('StaticDropdownFilter component', () => {
  test('should render StaticDropdownFilter', () => {
    const filterName = 'Country';
    const { getAllByText } = render(<StaticFilterMockComponentWrapper />);

    const filterNameElements = getAllByText(filterName);
    expect(filterNameElements.length).toBe(2);
  });
});
