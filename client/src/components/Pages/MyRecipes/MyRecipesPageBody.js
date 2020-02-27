import React from 'react';
import { Container, CardColumns } from 'react-bootstrap';
import styled from 'styled-components';
import CardRecipeWithDeleteOrRemoveButton from 'components/CardRecipe/CardRecipeWithDeleteOrRemoveButton';
import EmptyItemsPageLine from 'components/PageLine/EmptyItemsPageLine';
import ErrorMessagePageLine from 'components/PageLine/ErrorMessagePageLine';
import LoadingSpinnerPageLine from 'components/PageLine/LoadingSpinnerPageLine';
import Body from 'components/PageLayout/Body';
import Paginator from 'components/Paginator/Paginator';
import useGetPageState from 'hooks/useGetPageState';

const ResponsiveCardColumns = styled(CardColumns)`
  @media (min-width: 1024px) {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
  }
`;

const MyRecipesPageBody = () => {
  const { hasError, isLoading, items, hasItems } = useGetPageState();

  let pageBodyContent;
  if (hasError) {
    pageBodyContent = <ErrorMessagePageLine />;
  } else if (isLoading) {
    pageBodyContent = <LoadingSpinnerPageLine />;
  } else if (hasItems) {
    pageBodyContent = (
      <ResponsiveCardColumns>
        {items.map(item => (
          <CardRecipeWithDeleteOrRemoveButton
            key={item._id}
            cardRecipe={item}
          />
        ))}
      </ResponsiveCardColumns>
    );
  } else {
    pageBodyContent = <EmptyItemsPageLine />;
  }
  return (
    <Body>
      <Container>{pageBodyContent}</Container>
      <Paginator />
    </Body>
  );
};

export default MyRecipesPageBody;
