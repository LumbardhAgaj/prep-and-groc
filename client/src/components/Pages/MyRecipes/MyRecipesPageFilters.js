import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { updateUrlQueryParameter } from '../../../actions/page';
import getUrlParameter from '../../../hooks/useGetUrlParameter';

const MyRecipesPageFilters = () => {
  const selectedFilter = getUrlParameter('isOwner');
  const updateIsOwnerFilter = value =>
    updateUrlQueryParameter('isOwner', value);
  const removeIsOwnerFilter = () => updateUrlQueryParameter('isOwner');

  return (
    <Form.Group as={Row} style={{ marginRight: '0', marginLeft: '0' }}>
      <Col md={{ span: 4 }} sm={{ span: 6 }} xs={12}>
        <Form.Check
          defaultChecked={!selectedFilter}
          custom
          type="radio"
          name="filterRadio"
          id="filterRadio1"
          label="All recipes"
          onClick={removeIsOwnerFilter}
        />
      </Col>
      <Col md={4} sm={{ span: 6 }} xs={12}>
        <Form.Check
          defaultChecked={selectedFilter && selectedFilter === 'true'}
          custom
          type="radio"
          name="filterRadio"
          id="filterRadio2"
          label="Owned recipes "
          onClick={() => {
            updateIsOwnerFilter('true');
          }}
        />
      </Col>
      <Col md={4} sm={{ span: 6 }} xs={12}>
        <Form.Check
          defaultChecked={selectedFilter && selectedFilter === 'false'}
          custom
          type="radio"
          name="filterRadio"
          id="filterRadio3"
          label="Collected recipes"
          onClick={() => {
            updateIsOwnerFilter('false');
          }}
        />
      </Col>
    </Form.Group>
  );
};

export default MyRecipesPageFilters;
