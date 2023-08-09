import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import styles from './LogIn.module.css';
import { getCustomer, getToken } from './Api-Login';
import { statusCodes } from '../../../enums/auth.enum';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const grey = blueGrey['A700'];
const formFieldsDefault = {
  email: '',
  password: '',
};

export default function LogIn() {
  const [data, setData] = useState(formFieldsDefault);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(formFieldsDefault);
  const navigate = useNavigate();

  function handleError(statusCode: statusCodes) {
    if (
      statusCode === statusCodes.BAD_REQUEST ||
      statusCode === statusCodes.UNAUTHORIZED
    ) {
      setError(true);
      setErrorMessage({
        email: 'Incorrect password or email',
        password: 'Incorect password or email',
      });
    }
  }

  async function getCustometWithToken() {
    try {
      const token = await getToken({
        email: data.email,
        password: data.password,
      });
      const customer = await getCustomer({ accessToken: token.access_token });

      handleError(customer.statusCode);
      checkSuccessfulLogin(customer.id);
      getCurrentToken();

      return customer;
    } catch (error) {
      console.error(error);
    }
  }

  function checkSuccessfulLogin(id: string) {
    if (id) {
      navigate('/');
      saveToken();
    }
  }

  async function getCurrentToken() {
    const token = await getToken({
      email: data.email,
      password: data.password,
    });

    return token.access_token;
  }

  async function saveToken() {
    localStorage.setItem('authToken', await getCurrentToken());
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography variant="h5">Log in</Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          error={error}
          helperText={errorMessage.email}
          value={data.email}
          onChange={(e) => {
            setData((prev) => ({ ...prev, email: e.target.value }));
            setError(false);
            setErrorMessage(formFieldsDefault);
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          error={error}
          helperText={errorMessage.password}
          margin="normal"
          value={data.password}
          onChange={(e) => {
            setData((prev) => ({ ...prev, password: e.target.value }));
            setError(false);
            setErrorMessage(formFieldsDefault);
          }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: grey }}
          fullWidth
          onClick={getCustometWithToken}
          sx={{ mt: 2 }}
        >
          Log in
        </Button>
        <Grid container>
          <Grid item sx={{ mt: 2 }}>
            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
