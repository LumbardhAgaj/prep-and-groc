import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import GroceryItemsTableBody from './GroceryItemsTableBody';
import EmptyItemsTableBody from 'components/TableBody/EmptyItemsTableBody';
import LoadingSpinnerTableBody from 'components/TableBody/LoadingSpinnerTableBody';
import ErrorMessageTableBody from 'components/TableBody/ErrorMessageTableBody';
import TableHead from 'components/TableHead/TableHead';
import Body from 'components/PageLayout/Body';
import Paginator from 'components/Paginator/Paginator';
import useGetPageState from 'hooks/useGetPageState';

const GROCERIES_INGREDIENT_COLUMNS = [
  { width: '50%', label: 'Ingredient' },
  { width: '30%', label: 'Amount' },
  { width: '10%', label: 'Completed' },
  { width: '10%', label: 'Delete' }
];

const GroceriesPageBody = () => {
  const { hasError, isLoading, items, hasItems } = useGetPageState();

  let pageBody;
  if (hasError) {
    pageBody = (
      <ErrorMessageTableBody colSpan={GROCERIES_INGREDIENT_COLUMNS.length} />
    );
  } else if (isLoading) {
    pageBody = (
      <LoadingSpinnerTableBody colSpan={GROCERIES_INGREDIENT_COLUMNS.length} />
    );
  } else if (hasItems) {
    pageBody = <GroceryItemsTableBody groceryItems={items} />;
  } else {
    pageBody = (
      <EmptyItemsTableBody colSpan={GROCERIES_INGREDIENT_COLUMNS.length} />
    );
  }

  return (
    <Body>
      <Container>
        <Row>
          <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
            <Table responsive striped bordered hover>
              <TableHead columns={GROCERIES_INGREDIENT_COLUMNS} />
              {pageBody}
            </Table>
          </Col>
        </Row>
      </Container>
      <Paginator />
    </Body>
  );
};

export default GroceriesPageBody;
