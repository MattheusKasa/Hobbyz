import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/lightmode.logo.png';
import darkLogo from '../assets/darkmode.logo.png';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from "../hooks/UseClickOutsideToggle";
import { removeTokenTimestamp } from '../utils/utils';
import { useTheme } from '../contexts/ThemeContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const SetCurrentUser = useSetCurrentUser();
  const { theme, toggleTheme } = useTheme();
  const navbarRef = useRef(null);
  const { expanded, setExpanded } = useClickOutsideToggle(navbarRef);







  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      SetCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {

    }
  };

  const [icon, setIcon] = useState("moon");
  const [navBackground, setNavBackground] = useState(
    theme === "moon" ? "#1a1a1a" : "#ffffff"
  );


  const handleThemeToggle = () => {
    toggleTheme();
    setIcon(prevIcon => prevIcon === "moon" ? "sun" : "moon");
  };

  useEffect(() => {
    setNavBackground(theme === "moon" ? "#1a1a1a" : "#ffffff");
  }, [theme]);

  
  

  const addPostIcon = (
    <NavLink
    className={`${styles.NavLink} ${theme === 'moon' ? styles.DarkModeText : styles.LightModeNavLink}`}
    activeClassName={`${theme === 'moon' ? styles.DarkModeActive : styles.Active}`}
    to="/posts/create"
  >
    <i className="far fa-plus-square"></i>Add a Hobby
  </NavLink>
  );

  const loggedInIcons = (
    <>
<NavLink
  className={`${styles.NavLink} ${theme === 'moon' ? styles.DarkModeText : styles.LightModeNavLink}`}
  activeClassName={`${theme === 'moon' ? styles.DarkModeActive : styles.Active}`}
  to="/feed"
>
  <i className="fa-solid fa-user-check"></i>Followed
</NavLink>

  <NavLink
    className={`${styles.NavLink} ${theme === 'moon' ? styles.DarkModeText : styles.LightModeNavLink}`}

    activeClassName={`${theme === 'moon' ? styles.DarkModeActive : styles.Active}`}
    to="/liked"
  >
    <i className="fas fa-heart"></i>Liked
  </NavLink>
      <NavDropdown
        
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
<NavLink
    className={`${styles.NavLink} ${theme === 'moon' ? styles.DarkModeText : styles.LightModeNavLink}`}

    activeClassName={`${theme === 'moon' ? styles.DarkModeActive : styles.Active}`}
    to="/signin"
  >
    <i className="fas fa-sign-in-alt"></i>Sign in
  </NavLink>
  <NavLink
    className={`${styles.NavLink} ${theme === 'moon' ? styles.DarkModeText : styles.LightModeNavLink}`}

    activeClassName={`${theme === 'moon' ? styles.DarkModeActive : styles.Active}`}
    to="/signup"
  >
    <i className="fas fa-user-plus"></i>Sign Up
  </NavLink>
    </>
  );
  
  return (
    <div>
            <Navbar
      ref={navbarRef}
      className={`${styles.NavBar}`}
      style={{ backgroundColor: navBackground }}
      expand="md"
      fixed="top"
    >







        <Container fluid>
        <NavLink to="/">
  <Navbar.Brand>
    <img src={theme === "moon" ? darkLogo : logo} alt="logo" height="50" href="/" />
  </Navbar.Brand>
</NavLink>
          <span className={styles.welcomeText}>Welcome to Hobbyz!</span>
          {currentUser && addPostIcon}
          <Navbar.Toggle
  onClick={() => setExpanded(!expanded)}
  aria-controls="basic-navbar-nav"
  style={{
    border: "1px solid white",
    backgroundColor: "white",
  }}
>
  <span
    className="navbar-toggler-icon"
    style={{
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 30 30\'%3E%3Cpath stroke=\'rgba(0, 0, 0)\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' stroke-width=\'2\' d=\'M4 7h22M4 15h22M4 23h22\'/%3E%3C/svg%3E")',
    }}
  ></span>
</Navbar.Toggle>





<Navbar.Collapse
  className={`${theme === "moon" ? styles.DarkModeDropdown : ""} ml-auto text-left`}
  expanded={expanded}
  onSelect={() => setExpanded(false)}
>



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
