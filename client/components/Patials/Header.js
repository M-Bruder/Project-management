import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container } from 'reactstrap';
  import 'bootstrap';
  import '../../styles/Header.css';

import { Link } from 'react-router-dom'
import { isNull } from 'util';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    window.location.reload();
  }

  render() {
    if (localStorage.getItem('jwtToken') !== null){
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <Container>
            <NavbarBrand href="/">System zarządzania projektami</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink tag={Link}  to="/project">Projekty</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}  to="/profile">Ustawienia konta</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.logout} tag={Link}  to="/">Wyloguj się</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
      );
    }
    else
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <Container>
            <NavbarBrand href="/">System zarządzania projektami</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link}  to="/">Zaloguj się</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link}  to="/register">Rejestracja</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
      );
    }
  }


export default Header;