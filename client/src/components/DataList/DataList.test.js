import { render, cleanup } from '@testing-library/react';
import React from 'react';
import DataList from './DataList';

afterEach(cleanup);

describe('DataList component', () => {
  test('should render DataList', () => {
    const valueParameterName = 'ingredient';

    const options = [
      { ingredient: 'Salmon', id: 'salmon' },
      { ingredient: 'Garlic', id: 'garlic' },
      { ingredient: 'Pepper', id: 'pepper' }
    ];

    const { getByTestId, getAllByTestId } = render(
      <DataList valueParameterName={valueParameterName} options={options} />
    );
    const dataList = getByTestId('datalist');

    const dataListItems = getAllByTestId('datalist-item');
    dataListItems.forEach((item, index) => {
      expect(item).toHaveValue(options[index].ingredient);
    });
    expect(dataListItems).toHaveLength(options.length);
    expect(dataList).toBeInTheDocument();
  });

  test('should render DataList when options are empty', () => {
    const { getByTestId } = render(<DataList options={[]} />);
    const dataList = getByTestId('datalist');
    expect(dataList).toBeEmpty();
  });
});
