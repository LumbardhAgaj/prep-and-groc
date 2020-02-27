import React from 'react';
import { render } from '@testing-library/react';
import ObjectId from 'bson-objectid';
import Root from 'components/Root/Root';
import PrepareRecipeButton from './PrepareRecipeButton';

describe('PrepareRecipeButton component', () => {
  test('should render PrepareRecipeButton', () => {
    const { getByText } = render(
      <Root>
        <PrepareRecipeButton id={ObjectId()}>Prepare </PrepareRecipeButton>
      </Root>
    );
    expect(getByText('Prepare')).toBeInTheDocument();
  });
});
