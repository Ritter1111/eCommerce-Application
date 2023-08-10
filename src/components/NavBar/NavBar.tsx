import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={MAIN_ROUTE} title="Go to Home" className={classes.link}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <ShoppingBagIcon sx={{ mr: 1 }} />
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
            <Grid container item spacing={1.5}  direction="row"  justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Link to={MAIN_ROUTE} className={classes.link} title="Go to Home">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link to={LOGIN_ROUTE} className={classes.link} title="Log In">
                  Log In
                </Link>
              </Grid>
              <Grid item>
                <Link to={REGISTRATION_ROUTE} className={classes.link} title="Sign Up">
                  Sign Up
                </Link>
              </Grid>
            </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}