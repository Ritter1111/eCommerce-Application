import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Container, Typography, Box, Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import './pageLinks.css';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { ShoppingBag, LockOpen, Person, Menu, Close, Logout } from '@mui/icons-material';
import { AuthContext } from '../../context';
import routes from '../../utils/routes';

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  document.body.style.overflowY = `${isMenuOpen ? 'hidden' : 'auto'}`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const logout = () => {
    setIsAuth(false);
    localStorage.clear();
  }

  // close burger menu if it was open and screen width >= 900
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);


  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }} elevation={0}>
      <Container maxWidth="xl" sx={{ height: 63, display: 'flex', alignItems: 'center'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1, alignItems: 'center' }}>
          <Link onClick={() => { if (isMenuOpen) closeMenu() }} to={MAIN_ROUTE} title="Go to Home" className={classes.link}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <ShoppingBag sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                }}
              >
                STORE
              </Typography>
            </Box>
          </Link>
          <Box onClick={() => toggleMenu()} sx={{ display: { xs: 'block', md: 'none' } }}>
            {isMenuOpen ? <Close/> : <Menu/>}
          </Box>
          <Box className={`${isMenuOpen ? classes.active : ''} ${classes.menu}`}>
            {routes.map((route, index) => (
              <NavLink key={index} onClick={() => closeMenu()} to={route.path} className="pages__link" title={route.title}>
                {route.name}
              </NavLink>
            ))}
            {isAuth ?
              (<Button onClick={() => {logout(); closeMenu();}} className={classes.btn} sx={{color: 'black', textTransform: 'none'}}><Logout sx={{ mr: 0.5 }}/>Logout</Button>) :
              (<>
                <NavLink onClick={() => closeMenu()} to={LOGIN_ROUTE} className={classes.btn} title="Log In">
                  <LockOpen sx={{ mr: 0.5 }}/>
                  Log In
                </NavLink>
                <NavLink onClick={() => closeMenu()} to={REGISTRATION_ROUTE} className={classes.btn} title="Sign Up">
                  <Person sx={{ mr: 0.5 }}/>
                  Sign Up
                </NavLink>
              </>
              )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}