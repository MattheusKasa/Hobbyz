import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/UseClickOutsideToggle';
import { removeTokenTimestamp } from '../utils/utils';
import { useTheme } from '../contexts/ThemeContext';


const NavBar = () => {
  const currentUser = useCurrentUser();
  const SetCurrentUser = useSetCurrentUser();
  const { theme, toggleTheme } = useTheme();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      SetCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // console.log(err); //
    }
  };

  const handleThemeToggle = () => {
    console.log('Toggling theme:', theme);
    toggleTheme();
    setIcon(prevIcon => prevIcon === "moon" ? "sun" : "moon");
  };
  
  const [icon, setIcon] = useState("moon");

  
  

  const addPostIcon = (
    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
      <i className="far fa-plus-square"></i>Add a Hobby
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/feed">
        <i className="fa-solid fa-user-check"></i>Followed
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/liked">
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavDropdown
        ref={ref}
        onClick={() => setExpanded(!expanded)}
        title={
          <>
            <Avatar src={currentUser?.profile_image} height={50} />
            <span className={styles.Username}>{currentUser?.username}</span>
          </>
        }
      >
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to={`/profiles/${currentUser?.profile_id}`}>
            <i className="fa-solid fa-user"></i>My Profile
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i>Sign Out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin">
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup">
        <i className="fas fa-user-plus"></i>Sign Up
      </NavLink>
    </>
  );
  
  return (
    <div>
      <Navbar className={`${styles.NavBar} ${theme === 'dark' ? styles.NavBarDark : ''}`} expand="md" fixed="top">


        <Container fluid>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="50" href="/" />
            </Navbar.Brand>
          </NavLink>
          <span className={styles.welcomeText}>Welcome to Hobbyz!</span>
          {currentUser && addPostIcon}
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse className="ml-auto text-left">
          <div className={styles.navContent}>
            {currentUser ? loggedInIcons : loggedOutIcons}
            <Nav className={`${styles.NavLink} ${styles.MoonNav}`}>
              <button onClick={handleThemeToggle}>
                <i className={`fas fa-2x fa-${icon}`}></i>
              </button>
            </Nav>
            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
    );

  };
  
  export default NavBar;
