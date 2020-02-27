import React from 'react';
import PageLine from 'components/PageLine/PageLine';
import Body from 'components/PageLayout/Body';

const NotFoundPageBody = ({ msg }) => {
  return (
    <Body>
      <PageLine> {msg} </PageLine>
    </Body>
  );
};

export default NotFoundPageBody;
