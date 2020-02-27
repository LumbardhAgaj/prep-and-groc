import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const ProgressBar = styled.ul`
  counter-reset: step;
  margin-top: 2.5%;
  padding-left: 0px;

  & :first-child::after {
    left: 50%;
  }
`;
const Step = styled.li`
  list-style-type: none;
  width: 50%;
  float: left;
  font-size: 12px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: ${props => (props.isActive ? 'green' : '#7d7d7d')};

  ::before {
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    border: 2px solid #7d7d7d;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
    border-color: ${props => props.isActive && '#55b776'};
  }

  ::after {
    width: 50%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: ${props => (props.isActive ? '#55b776' : '#7d7d7d')};
    top: 15px;
    left: 0;
    z-index: -1;
  }
`;

const SaveRecipePageNavRow = ({ activeForm }) => {
  return (
    <Row>
      <Col md={12}>
        <ProgressBar>
          <Step isActive>
            <p> Recipe</p> <br />
          </Step>
          <Step isActive={activeForm === 'ingredients'}>
            <p>Ingredients</p>
          </Step>
        </ProgressBar>
      </Col>
    </Row>
  );
};

export default SaveRecipePageNavRow;
