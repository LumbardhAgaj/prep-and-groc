import { render, cleanup } from '@testing-library/react';
import React from 'react';
import DropdownListItems from './DropdownListItems';
import UNITS from 'data/ingredientUnitOptionValues.json';

afterEach(cleanup);

describe('DropdownListItems component', () => {
  test('should render DropdownListItems', () => {
    const valueParameterName = 'value';
    const labelParameterName = 'label';

    const { getAllByTestId } = render(
      <DropdownListItems
        valueParameterName={valueParameterName}
        labelParameterName={labelParameterName}
        options={UNITS}
      />
    );
    const dropdownListItems = getAllByTestId('dropdown-list-item');
    dropdownListItems.forEach((item, index) => {
      expect(item).toHaveValue(UNITS[index].value);
    });
    expect(dropdownListItems).toHaveLength(UNITS.length);
  });

  test('should render DropdownListItems when options are empty', () => {
    const { queryAllByTestId } = render(<DropdownListItems options={[]} />);
    expect(queryAllByTestId('dropdown-list-item')).toHaveLength(0);
  });
});
