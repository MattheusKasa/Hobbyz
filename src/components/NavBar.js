import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const addPostIcon = (
    <NavLink 
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/posts/create">
  <i className="far fa-plus-square"></i>Add Post
</NavLink>
  )
  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = <> <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
  <i className="fas fa-sign-in-alt"></i>Sign in
</NavLink>
<NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
  <i className="fas fa-user-plus"></i>Sign Up
</NavLink>
</>

  return (
    <div>
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container fluid>
              <NavLink to="/">
              <Navbar.Brand href="#">Hobbyz</Navbar.Brand>
              </NavLink>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav>
                {currentUser && addPostIcon}
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
                  <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/"><i className="fas fa-home"></i>Home
                  </NavLink>
                  
                  
                  
                  <NavDropdown title={currentUser ? loggedInIcons : loggedOutIcons} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Hobbyz
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Sign Out
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