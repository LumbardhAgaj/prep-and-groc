import React from 'react';
import NotFoundPageHeader from './NotFoundPageHeader';
import NotFoundPageBody from './NotFoundPageBody';

const DEFAULT_PAGE_MESSAGE = 'Requested page could not be found.';

const NotFound = ({ msg = DEFAULT_PAGE_MESSAGE }) => {
  return (
    <>
      <NotFoundPageHeader />
      <NotFoundPageBody msg={msg} />
    </>
  );
};

export default NotFound;
