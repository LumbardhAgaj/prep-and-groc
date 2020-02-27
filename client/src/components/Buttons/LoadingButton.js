import React from 'react';
import { Spinner, Button } from 'react-bootstrap';

export default ({ isDisabled, children, ...rest }) => (
  <Button disabled={isDisabled} {...rest}>
    {isDisabled ? <Spinner animation="border" size="sm" /> : children}
  </Button>
);
