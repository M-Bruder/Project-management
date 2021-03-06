import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  logout = () => {
    localStorage.removeItem('user');
  };

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { isOpen } = this.state;
    if (localStorage.getItem('user') !== null) {
      return (
        <div>
          <Navbar color="primary" dark expand="md">
            <Container>
              <NavbarBrand href="/">System zarządzania projektami</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/project">
                      Projekty
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/profile">
                      Ustawienia konta
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.logout} tag={Link} to="/">
                      Wyloguj się
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </div>
      );
    }
    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <Container>
            <NavbarBrand href="/">System zarządzania projektami</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/">
                    Zaloguj się
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/register">
                    Rejestracja
                  </NavLink>
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
