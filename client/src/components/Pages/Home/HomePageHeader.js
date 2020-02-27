import React from 'react';
import { Row, Container } from 'react-bootstrap';
import SearchBar from 'components/SearchBar/SearchBar';
import HomePageFilters from './HomePageFilters';
import Header from 'components/PageLayout/Header';
import SubHeader from 'components/PageLayout/SubHeader';
import { updateUrlQueryParameter } from 'actions/page';
import useGetUrlParameter from 'hooks/useGetUrlParameter';

const HomePageHeader = () => {
  const initialValue = useGetUrlParameter('title');

  return (
    <>
      <Header>
        <Container fluid>
          <Container>
            <Row>
              <SearchBar
                onClick={query => updateUrlQueryParameter('title', query)}
                placeholder="Search for recipes"
                initialValue={initialValue}
              />
            </Row>
          </Container>
        </Container>
      </Header>
      <SubHeader>
        <HomePageFilters />
      </SubHeader>
    </>
  );
};

export default HomePageHeader;
