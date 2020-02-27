import React, { useState } from 'react';
import { Row, Col, Nav, Card, Container } from 'react-bootstrap';
import LoginForm from 'components/LoginForm/LoginForm';
import SignupForm from 'components/SignupForm/SignupForm';
import Body from 'components/PageLayout/Body';

const LoginPageBody = () => {
  const [isLoginFormDisplayed, setIsLoginFormDisplayed] = useState(true);

  const onLoginClick = () => {
    setIsLoginFormDisplayed(true);
  };

  const onSignupClick = () => {
    setIsLoginFormDisplayed(false);
  };

  return (
    <Body>
      <Container>
        <Row>
          <Col
            md={{ span: 4, offset: 4 }}
            sm={{ span: 8, offset: 2 }}
            xs={{ span: 12, offset: 0 }}
          >
            <Card>
              <Card.Header>
                <Nav justify variant="tabs" defaultActiveKey="#login">
                  <Nav.Item>
                    <Nav.Link href="#login" onClick={onLoginClick}>
                      Login
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#signup" onClick={onSignupClick}>
                      Signup
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                {isLoginFormDisplayed ? <LoginForm /> : <SignupForm />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Body>
  );
};

export default LoginPageBody;
