import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Header from 'components/PageLayout/Header';

const LoginPageHeader = () => {
  const pageHeaderStyle = { textAlign: 'center', margin: '7.5% 0 2.5% 0' };

  return (
    <Header>
      <Container>
        <Row>
          <Col
            md={{ span: 6, offset: 3 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 12, offset: 0 }}
          >
            <h1 style={pageHeaderStyle}> Prep&Groc members login page </h1>
            <p style={{ textAlign: 'center' }}>
              Don&rsquo;t have an account yet? Please register to gain acces.{' '}
            </p>
          </Col>
        </Row>
      </Container>
    </Header>
  );
};

export default LoginPageHeader;
