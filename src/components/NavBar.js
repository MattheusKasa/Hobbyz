import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const SetCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      SetCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink 
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/posts/create">
  <i className="far fa-plus-square"></i>Add Post
</NavLink>
  )
  const loggedInIcons = <>
    <NavLink 
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed">
      <i className="fas fa-stream"></i>Feed
    </NavLink>
    <NavLink 
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/liked">
      <i className="fas fa-heart"></i>liked
    </NavLink>
    
  </>
  const loggedOutIcons = <> 
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
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
                  
                  
                  
                  <NavDropdown title={currentUser ? loggedInIcons : loggedOutIcons} id="navbarScrollingDropdown">
                    <NavDropdown.Item>
                    <NavLink 
                      className={styles.NavLink}
                      to={`/profiles/${currentUser?.profile_id}`}
                      >
                      <Avatar src={currentUser?.profile_image}
                      text="Profile"
                      height={40}  />
                    </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                     <NavLink 
                        className={styles.NavLink}
                        to="/myhobbyz">
                        <i className="fas fa-stream"></i>My Hobbyz
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                    <NavLink 
                      className={styles.NavLink}
                      to="/"
                      onClick={handleSignOut}
                      >
                      <i className="fas fa-sign-out-alt"></i>Sign Out
                    </NavLink>
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