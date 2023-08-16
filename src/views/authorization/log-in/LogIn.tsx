import React, { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './LogIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'react-toastify/dist/ReactToastify.css';
import { formFieldsDefault } from '../../../utils/consts';
import { getCustometWithToken } from '../../../utils/getCustomer';
import { AuthContext } from '../../../context';
import { customInputTheme } from '../../../components/custom-input-theme';

export default function LogIn() {
  const [data, setData] = useState(formFieldsDefault);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(formFieldsDefault);
  const [emailError, setEmailError] = useState('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const outerTheme = useTheme();

  function handleLogIn() {
    getCustometWithToken(data, navigate, setIsAuth, setError, setErrorMessage);
  }

  function validateEmailFormat(email: string): boolean {
    const emailFormatRegex = /^\S+@\S+\.\S+$/;
    return emailFormatRegex.test(email);
  }

  function validateNoSpaces(email: string): boolean {
    return !/\s/.test(email);
  }

  function validateHasDomain(email: string): boolean {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return domainRegex.test(email.split('@')[1]);
  }

  function validateContainsAtSymbol(email: string): boolean {
    return email.includes('@');
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    if (newEmail === '') {
      setErrorEmail(false);
      setEmailError('');
    } else if (!validateNoSpaces(newEmail)) {
      setErrorEmail(true);
      setEmailError('Email should not contain spaces');
    } else if (!validateContainsAtSymbol(newEmail)) {
      setErrorEmail(true);
      setEmailError('Email should contain @ symbol');
    } else if (!validateHasDomain(newEmail)) {
      setErrorEmail(true);
      setEmailError('Email should have a valid domain');
    } else if (!validateEmailFormat(newEmail)) {
      setErrorEmail(true);
      setEmailError('Incorrect email format');
    } else {
      setErrorEmail(false);
      setEmailError('');
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'text.disabled' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography variant="h5">Log in</Typography>
        <ThemeProvider theme={customInputTheme(outerTheme)}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            error={error || errorEmail}
            helperText={errorMessage.email || emailError}
            value={data.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData((prev) => ({ ...prev, email: e.target.value }));
              setError(false);
              setErrorMessage(formFieldsDefault);
              handleEmail(e);
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
        </ThemeProvider>
        <Button
          variant="contained"
          style={{ backgroundColor: 'black' }}
          fullWidth
          onClick={handleLogIn}
          sx={{ mt: 2 }}
          size="large"
        >
          Log in
        </Button>
        <ToastContainer />
        <Grid container>
          <Grid item sx={{ mt: 2 }}>
            <Link to="/registration" className={styles.link}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
