import React, { useCallback } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Header from 'components/PageLayout/Header';
import SaveIngredientForm from 'components/SaveIngredientForm/SaveIngredientForm';
import { saveFridgeIngredient } from 'actions/fridgeIngredient';
import useDispatchActionFromComponent from 'hooks/useDispatchActionFromComponent';

const FridgePageHeader = () => {
  const { state, dispatch, notify } = useDispatchActionFromComponent();

  const onSaveIngredient = useCallback(
    (values, { setErrors, resetForm, setSubmitting }) => {
      saveFridgeIngredient(
        values,
        setErrors,
        resetForm,
        setSubmitting
      )(dispatch, notify, state);
    },
    [dispatch, notify, state]
  );

  return (
    <Header>
      <Container fluid>
        <Container>
          <Row>
            <Col
              md={{ span: 10, offset: 1 }}
              style={{ marginTop: '50px', marginBottom: '25px' }}
            >
              <SaveIngredientForm onSaveIngredient={onSaveIngredient} />
            </Col>
          </Row>
        </Container>
      </Container>
    </Header>
  );
};

export default FridgePageHeader;
