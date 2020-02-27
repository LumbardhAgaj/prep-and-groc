import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { updateUrlQueryParameter } from 'actions/page';
import getUrlParameter from 'hooks/useGetUrlParameter';

const GroceriesPageFilters = () => {
  const selectedFilter = getUrlParameter('isCompleted');
  const updateIsCompletedFilter = value =>
    updateUrlQueryParameter('isCompleted', value);
  const removeIsCompletedFilter = () => updateUrlQueryParameter('isCompleted');

  return (
    <Form.Group as={Row} style={{ marginLeft: '0', marginRight: '0' }}>
      <Col md={{ span: 4 }} sm={{ span: 6 }} xs={12}>
        <Form.Check
          defaultChecked={!selectedFilter}
          custom
          type="radio"
          name="filterRadio"
          id="filterRadio1"
          label="All groceries"
          onClick={removeIsCompletedFilter}
        />
      </Col>
      <Col md={4} sm={{ span: 6 }} xs={12}>
        <Form.Check
          defaultChecked={selectedFilter && selectedFilter === 'true'}
          custom
          type="radio"
          name="filterRadio"
          id="filterRadio2"
          label="Completed groceries"
          onClick={() => updateIsCompletedFilter('true')}
        />
      </Col>
      <Col md={4} sm={{ span: 6 }} xs={12}>
        <Form.Check
          defaultChecked={selectedFilter && selectedFilter === 'false'}
          custom
          type="radio"
          name="filterRadio"
          id="filterRadio3"
          label="Incomplete groceries"
          onClick={() => updateIsCompletedFilter('false')}
        />
      </Col>
    </Form.Group>
  );
};

export default GroceriesPageFilters;
