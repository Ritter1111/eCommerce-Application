import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './LogIn.module.css';
import { getCustomer, getToken } from './Api-Login';
import { statusCodes } from '../../../enums/auth.enum';
import { useNavigate, Link } from 'react-router-dom';
import { ITokenData } from '../../../interfaces/auth.interface';
import { notify } from './ErrorPupUp';
import { ToastContainer } from 'react-toastify';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'react-toastify/dist/ReactToastify.css';
import { formFieldsDefault, grey } from '../../../utils/consts';

export default function LogIn() {
  const [data, setData] = useState(formFieldsDefault);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(formFieldsDefault);
  const navigate = useNavigate();

  function handleError(statusCode: statusCodes, message: string) {
    if (statusCode === statusCodes.BAD_REQUEST) {
      setError(true);
      notify(message);
      setErrorMessage({
        email: '',
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
      const myCustomer = await getCustomer({
        accessToken: token.access_token,
        email: data.email,
        password: data.password,
      });

      handleError(token.statusCode, token.message);
      checkSuccessfulLogin(myCustomer.customer.id, token);

      return myCustomer;
    } catch (error) {
      console.error(error);
    }
  }

  function checkSuccessfulLogin(id: string, token: ITokenData) {
    if (id) {
      navigate('/');
      saveToken(token);
    }
  }

  async function saveToken(token: ITokenData) {
    localStorage.setItem('authToken', token.access_token);
    localStorage.setItem('refreshToken', token.refresh_token);
    localStorage.setItem('expiredIn', `${Date.now() + 172800}`);
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'text.disabled' }}>
          <LockOpenIcon fontSize="large" />
        </Avatar>
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
        <ToastContainer />
        <Grid container>
          <Grid item sx={{ mt: 2 }}>
            <Link to="/registration">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
