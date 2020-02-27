import React from 'react';
import { Pagination, Container, Row, Col } from 'react-bootstrap';
import { updateUrlQueryParameter } from 'actions/page';
import { useStoreContext } from 'contexts/store';
import buildPaginator from 'utils/buildPaginator';

const Paginator = () => {
  const { isLoading, hasError, paginator } = useStoreContext().page;

  const { totalPages, currentPage } = paginator;

  if (isLoading || hasError) {
    return null;
  }

  const pages = buildPaginator(totalPages, currentPage);

  const xsSpan = totalPages > 3 ? 10 : 6;

  const xsOffset = totalPages > 3 ? 1 : 3;

  const changePage = page => {
    if (!page.isDisabled) {
      updateUrlQueryParameter('page', page.number);
    }
  };

  return (
    <Container>
      <Row>
        <Col
          md={{ span: 3, offset: 5 }}
          sm={{ span: 6, offset: 3 }}
          xs={{ span: xsSpan, offset: xsOffset }}
        >
          <Pagination>
            {pages.map(page => {
              return (
                <Pagination.Item
                  key={page.id}
                  className={page.isDisabled ? 'disabled' : ''}
                  active={page.isActive ? 'active' : ''}
                  data-testid="pagination-item"
                  onClick={() => changePage(page)}
                >
                  {page.display}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Paginator;
