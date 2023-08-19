import React from 'react';
import { Container, Box } from '@mui/material';
import classes from './Home.module.css';
import routes from '../../utils/routes';
import { Link} from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
const Home = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 4,
        rowGap: '10px',
        }}>
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
      <Link
        to={LOGIN_ROUTE}
        className={classes.link}
        title="Log In"
      >
        LOG IN
      </Link>
      <Link
        to={REGISTRATION_ROUTE}
        className={classes.link}
        title="Sign Up"
      >
        SIGN UP
      </Link>
      </Box>
    </Container>
  );
};

export default Home;
