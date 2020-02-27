import React from 'react';
import PageLine from './PageLine';

const DEFAULT_EMPTY_ITEMS_MSG = 'There are no items.';

const EmptyItemsPageLine = ({ msg = DEFAULT_EMPTY_ITEMS_MSG }) => (
  <PageLine>{msg}</PageLine>
);

export default EmptyItemsPageLine;
