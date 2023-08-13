import React, { useState } from 'react';
import {
  AppBar,
  Container,
  Typography,
  Box
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import './pageLinks.css';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { ShoppingBag, LockOpen, Person, Menu, Close } from '@mui/icons-material';

export default function NavBar() {
  const [isMenuBtnCliked, setMenuBtnClicked] = useState(false);


  document.body.style.overflowY = `${isMenuBtnCliked ? 'hidden' : 'auto'}`;

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }} elevation={0}>
    <Container maxWidth="xl" sx={{ height: 63, display: 'flex', alignItems: 'center'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1, alignItems: 'center' }}>
        <Link onClick={() => {
          if (isMenuBtnCliked) setMenuBtnClicked(!isMenuBtnCliked)
        }} to={MAIN_ROUTE} title="Go to Home" className={classes.link}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        <Box onClick={() => setMenuBtnClicked(!isMenuBtnCliked)} sx={{ display: { xs: 'block', md: 'none' } }}>
          {isMenuBtnCliked ? <Close/> : <Menu/>}
        </Box>
        <Box className={`${isMenuBtnCliked ? classes.active : ''} ${classes.menu}`}>
          <NavLink onClick={() => setMenuBtnClicked(!isMenuBtnCliked)} to={MAIN_ROUTE} className="pages__link" title="Go to Home">
            Home
          </NavLink>
          <NavLink onClick={() => setMenuBtnClicked(!isMenuBtnCliked)} to={LOGIN_ROUTE} className={classes.btn} title="Log In">
            <LockOpen sx={{ mr: 0.5 }}/>
            Log In
          </NavLink>
          <NavLink onClick={() => setMenuBtnClicked(!isMenuBtnCliked)} to={REGISTRATION_ROUTE} className={classes.btn} title="Sign Up">
            <Person sx={{ mr: 0.5 }}/>
            Sign Up
          </NavLink>
        </Box>
      </Box>
    </Container>
  </AppBar>
  );
}