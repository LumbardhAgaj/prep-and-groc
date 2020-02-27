import React from 'react';
import { Row, Container } from 'react-bootstrap';
import SearchBar from 'components/SearchBar/SearchBar';
import SubHeader from 'components/PageLayout/SubHeader';
import { updateUrlQueryParameter } from 'actions/page';
import GroceriesPageFilters from './GroceriesPageFilters';
import Header from 'components/PageLayout/Header';
import useGetUrlParameter from 'hooks/useGetUrlParameter';

const GroceriesPageHeader = () => {
  const initialValue = useGetUrlParameter('name');

  return (
    <>
      <Header>
        <Container fluid>
          <Container>
            <Row>
              <SearchBar
                onClick={query => updateUrlQueryParameter('name', query)}
                initialValue={initialValue}
                placeholder="Search for items in your grocery list"
              />
            </Row>
          </Container>
        </Container>
      </Header>
      <SubHeader>
        <GroceriesPageFilters />
      </SubHeader>
    </>
  );
};

export default GroceriesPageHeader;
