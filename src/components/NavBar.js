import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container fluid>
              <Navbar.Brand href="#">Hobbyz</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  
                >
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search for Hobbyz!"
                      className="me-2"
                      aria-label="Search"
                    />
                  <Button variant="outline-success">Search</Button>
                  </Form>
                </Nav>
                <Nav>
                  <Nav.Link href="#"><i className="fas fa-home"></i>Home</Nav.Link>
                  <Nav.Link href="#">
                    <i className="fas fa-sign-in-alt"></i>Sign In
                  </Nav.Link>
                  <Nav.Link href="#">
                    <i className="fas fa-user-plus"></i>Sign Up
                  </Nav.Link>
                  
                  <NavDropdown title="Username" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Sign Out
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here??
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar;