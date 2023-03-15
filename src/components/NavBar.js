import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css'
import logo from "../assets/logo.png";
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/UseClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const SetCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      SetCurrentUser(null);
      removeTokenTimestamp()
    } catch (err) {
      // console.log(err); //
    }
  };

  const addPostIcon = (
    <NavLink 
    className={styles.NavLink}
    activeClassName={styles.Active}
    to="/posts/create">
  <i className="far fa-plus-square"></i>Add Hobby!
</NavLink>
  )
  const loggedInIcons = (
  <>
    <NavLink 
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed">
      <i class="fa-solid fa-user-check"></i>Followed
    </NavLink>
    <NavLink 
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/liked">
      <i className="fas fa-heart"></i>Liked
    </NavLink>
    <Nav expanded={expanded}
                      className={styles.ProfileDrop}
                      expand="md"
                      fixed="top"
                      >
                      <Avatar src={currentUser?.profile_image}
                      text="Profile"
                      height={50} /> 
                  <NavDropdown id="navbarScrollingDropdown" ref={ref} onClick={() => setExpanded(!expanded)}>
                    <NavDropdown.Item>

                    </NavDropdown.Item>
                    <NavDropdown.Item>
                     <NavLink 
                        className={styles.NavLink}
                        to={`/profiles/${currentUser?.profile_id}`}>
                        <i className="fas fa-stream"></i>My Profile
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
    
    
  </>
  );
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
              <Navbar.Brand>
                <img src={logo} alt="logo" height="50" href="#" />
              </Navbar.Brand>
              </NavLink>
              {currentUser && addPostIcon}
              <Navbar.Toggle 
                ref={ref}
                onClick={() => setExpanded(!expanded)}
                aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="ml-auto text-left">
                
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search for Hobbyz!"
                      className="me-2"
                      aria-label="Search"
                    />
                  <Button variant="outline-success">Search</Button>
                  </Form>
                  {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>

              </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar;