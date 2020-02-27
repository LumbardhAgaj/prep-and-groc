import React, { useState } from 'react';
import { Nav, Button, Spinner, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { logoutUser } from 'actions/user';
import useDispatchActionFromButton from 'hooks/useDispatchActionFromButton';

const SidebarHead = styled.div`
  background-color:#613F75;
  display: flex;
  justify-content: flex-end;
  height:100px;

  & .container div h4 {
    margin-top: 25px;
    margin-left: 75px;
    visibility:${props => (props.isHidden ? 'hidden' : 'visible')}
    transition-delay:${props => !props.isHidden && '0.35s'}
  }
`;

const SidebarToggleButton = styled(Button)`
  margin-top: 20px;
  position: absolute;
  right: 20px;
`;

const SidebarBody = styled.div``;

const SidebarContainer = styled.div`
  min-width: ${props => (props.isHidden ? '100px' : '300px')};
  max-width: ${props => (props.isHidden ? '100px' : '300px')};
  min-height: 100vh;
  background-color: #613f75;
  color: #fff;
  transition: all 0.25s;
  font-size: 1.1em;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  text-align: ${props => props.isHidden && 'center'};
  transition: min-width 0.5s, max-width 0.5s;

  & a,
  a:hover,
  a:focus {
    color: white;
  }

  & a {
    padding: ${props => props.isHidden && '20px 10px'};
    text-align: ${props => props.isHidden && 'center'};
    font-size: ${props => props.isHidden && '0.85em'};
    padding: ${props => props.isHidden && '10px !important'};
    width: ${props => props.isHidden && '100%'};
  }

  & a i {
    margin-right: ${props => props.isHidden && '0'};
    display: ${props => props.isHidden && 'block'};
    font-size: ${props => props.isHidden && '1.8em'};
    margin-bottom: ${props => props.isHidden && '5px'};
  }

  @media (max-width: 767px) {
    margin-left: 0;
    min-width: ${props => props.isHidden && '80px'};
    max-width: ${props => props.isHidden && '80px'};
    text-align: ${props => props.isHidden && 'center'};
  }
`;

const Sidebar = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const {
    state,
    dispatch,
    notify,
    isDisabled,
    setIsDisabled
  } = useDispatchActionFromButton();
  const { isAuthenticated } = state.user;

  const onSidebarToggleButton = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const hideSidebar = () => {
    setIsSidebarHidden(true);
  };

  const onUserlogout = event => {
    if (isDisabled) {
      event.preventDefault();
    } else {
      logoutUser(setIsDisabled)(dispatch, notify);
      hideSidebar();
    }
  };

  const activeStyle = {
    backgroundColor: '#3a4664'
  };

  return (
    <SidebarContainer isHidden={isSidebarHidden}>
      <SidebarHead isHidden={isSidebarHidden}>
        <Container>
          <div>
            <SidebarToggleButton variant="info" onClick={onSidebarToggleButton}>
              <i className="fas fa-bars" />
            </SidebarToggleButton>
          </div>
          <div>
            <h4>Prep&Groc</h4>
          </div>
        </Container>
      </SidebarHead>
      <SidebarBody>
        <Nav className="flex-column">
          <NavLink
            to="/"
            activeStyle={activeStyle}
            onClick={hideSidebar}
            className="nav-link"
            exact
          >
            <i className="fas fa-home" /> Home
          </NavLink>
          <NavLink
            to="/myrecipes"
            activeStyle={activeStyle}
            onClick={hideSidebar}
            className="nav-link"
          >
            <i className="fas fa-folder-open" /> My Recipes
          </NavLink>
          <NavLink
            to="/fridge"
            activeStyle={activeStyle}
            onClick={hideSidebar}
            className="nav-link"
          >
            <i className="fas fa-archive" /> Fridge
          </NavLink>
          <NavLink
            to="/groceries"
            activeStyle={activeStyle}
            onClick={hideSidebar}
            className="nav-link"
          >
            <i className="fas fa-shopping-basket" /> Groceries
          </NavLink>
          <NavLink
            to="/save-recipe"
            activeStyle={activeStyle}
            onClick={hideSidebar}
            className="nav-link"
          >
            <i className="fas fa-file-signature" /> Write recipe
          </NavLink>
          {isAuthenticated ? (
            <Nav.Link onClick={onUserlogout}>
              <i className="fas fa-sign-out-alt" />
              {isDisabled ? (
                <Spinner animation="border" size="sm" />
              ) : (
                ' Logout'
              )}
            </Nav.Link>
          ) : (
            <NavLink
              to="/login"
              activeStyle={activeStyle}
              onClick={hideSidebar}
              className="nav-link"
            >
              <i className="fas fa-sign-in-alt" />
              {isDisabled ? <Spinner animation="border" size="sm" /> : ' Login'}
            </NavLink>
          )}
        </Nav>
      </SidebarBody>
    </SidebarContainer>
  );
};

export default Sidebar;
