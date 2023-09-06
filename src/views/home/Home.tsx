import React from 'react';
import { Container, Box } from '@mui/material';
import classes from './Home.module.css';
import routes from '../../utils/routes';
import { Link } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_PROFILE,
} from '../../utils/consts';
const Home = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          gap: '30px',
          mt: 4,
        }}
      >
        {routes.map((route, index) => (
          <Link
            key={index}
            to={route.path}
            title={route.title}
            className={classes.link}
          >
            {route.name.toUpperCase()}
          </Link>
        ))}
        <Link to={USER_PROFILE} className={classes.link} title="User profile">
          USER PROFILE
        </Link>
        <Link to={LOGIN_ROUTE} className={classes.link} title="Log In">
          LOG IN
        </Link>
        <Link to={REGISTRATION_ROUTE} className={classes.link} title="Sign Up">
          SIGN UP
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
