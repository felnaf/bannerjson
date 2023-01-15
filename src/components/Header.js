import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://st.depositphotos.com/1327423/2571/i/600/depositphotos_25719209-stock-photo-four-leaf-clover-logo-design.jpg"
            height="50px"
            width="70px"
          />
          Nature
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/tour">
              Tour Package
            </Nav.Link>
            <Nav.Link as={Link} to="/view-package">
              Package View
            </Nav.Link>
            <Nav.Link as={Link} to="/review">
              Review
            </Nav.Link>
            <Nav.Link as={Link} to="/review-list">
              ReviewList
            </Nav.Link>
          {/* </Nav> */}
          {/* <Nav> */}
          <Nav.Link as={Link} to="/syllabus">
             Syllabus
            </Nav.Link>
            <Nav.Link as={Link} to="/syllabus-view">
             Syllabus View
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/review-list">
              ReviewList
            </Nav.Link> */}
            <Nav.Link as={Link} to="/form">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/view">
              View
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
