import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import FridgeIngredientsTableBody from './FridgeIngredientsTableBody';
import EmptyItemsTableBody from 'components/TableBody/EmptyItemsTableBody';
import LoadingSpinnerTableBody from 'components/TableBody/LoadingSpinnerTableBody';
import ErrorMessageTableBody from 'components/TableBody/ErrorMessageTableBody';
import TableHead from 'components/TableHead/TableHead';
import Body from 'components/PageLayout/Body';
import Paginator from 'components/Paginator/Paginator';
import useGetPageState from 'hooks/useGetPageState';

export const FRIDGE_INGREDIENT_COLUMNS = [
  { width: '50%', label: 'Ingredient' },
  { width: '20%', label: 'Amount' },
  { width: '20%', label: 'Remaining amount' },
  { width: '10%', label: 'Delete' }
];

const FridgePageBody = () => {
  const { hasError, isLoading, items, hasItems } = useGetPageState();

  let ingredientsTableBody;
  if (hasError)
    ingredientsTableBody = (
      <ErrorMessageTableBody colSpan={FRIDGE_INGREDIENT_COLUMNS.length} />
    );
  else if (isLoading)
    ingredientsTableBody = (
      <LoadingSpinnerTableBody colSpan={FRIDGE_INGREDIENT_COLUMNS.length} />
    );
  else if (hasItems)
    ingredientsTableBody = <FridgeIngredientsTableBody ingredients={items} />;
  else
    ingredientsTableBody = (
      <EmptyItemsTableBody colSpan={FRIDGE_INGREDIENT_COLUMNS.length} />
    );

  return (
    <Body>
      <Container>
        <Row>
          <Col md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
            <Table responsive striped bordered hover>
              <TableHead columns={FRIDGE_INGREDIENT_COLUMNS} />
              {ingredientsTableBody}
            </Table>
          </Col>
        </Row>
      </Container>
      <Paginator />
    </Body>
  );
};

export default FridgePageBody;
