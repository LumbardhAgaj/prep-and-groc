import React from 'react';
import { Spinner } from 'react-bootstrap';
import PageLine from './PageLine';

const LoadingSpinnerPageLine = () => (
  <PageLine>
    <Spinner animation="border" variant="dark" />
  </PageLine>
);

export default LoadingSpinnerPageLine;
