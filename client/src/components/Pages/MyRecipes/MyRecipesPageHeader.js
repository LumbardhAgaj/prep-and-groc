import React from 'react';
import { Row, Container } from 'react-bootstrap';
import SearchBar from 'components/SearchBar/SearchBar';
import { updateUrlQueryParameter } from 'actions/page';
import MyRecipesFilters from './MyRecipesPageFilters';
import Header from 'components/PageLayout/Header';
import SubHeader from 'components/PageLayout/SubHeader';
import useGetUrlParameter from 'hooks/useGetUrlParameter';

const MyRecipesPageHeader = () => {
  const initialValue = useGetUrlParameter('title');

  return (
    <>
      <Header>
        <Container fluid>
          <Container>
            <Row>
              <SearchBar
                onClick={query => updateUrlQueryParameter('title', query)}
                initialValue={initialValue}
                placeholder="Search for recipes in your collection"
              />
            </Row>
          </Container>
        </Container>
      </Header>
      <SubHeader>
        <MyRecipesFilters />
      </SubHeader>
    </>
  );
};

export default MyRecipesPageHeader;
