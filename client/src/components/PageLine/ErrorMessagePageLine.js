import React from 'react';
import PageLine from './PageLine';

const ErrorMessagePageLine = ({
  msg = 'An error occured. We could not get the items at this time.'
}) => <PageLine>{msg}</PageLine>;

export default ErrorMessagePageLine;
