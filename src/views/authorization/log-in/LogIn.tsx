import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  ThemeProvider,
  useTheme,
  Grid
} from '@mui/material';
import styles from './LogIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'react-toastify/dist/ReactToastify.css';
import { formFieldsDefault } from '../../../utils/consts';
import { getCustometWithToken } from '../../../utils/getCustomer';
import { AuthContext } from '../../../context';
import { customInputTheme } from '../../../utils/custom-input-theme'
import {
  validateCapitalChar,
  validateContainsAtSymbol,
  validateDigit,
  validateEmailFormat,
  validateHasDomain,
  validateLengthPassword,
  validateLowerChar,
  validateNoSpaces,
  validatePasswordSpaces,
  validateSpecialChar,
} from './Validate-Login';
import { errorNotify } from '../../../utils/ErrorPupUp';
import PasswordVisibility from './PasswordVisibility';

export default function LogIn() {
  const [data, setData] = useState(formFieldsDefault);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(formFieldsDefault);
  const [emailError, setMessageEmail] = useState('');
  const [passwordError, setMessagePassword] = useState('');
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const outerTheme = useTheme();

  useEffect(() => {
    setFormValid(
      validatePasswordSpaces(data.password) &&
        validateCapitalChar(data.password) &&
        validateLowerChar(data.password) &&
        validateLengthPassword(data.password) &&
        validateSpecialChar(data.password) &&
        validateDigit(data.password) &&
        validateEmailFormat(data.email) &&
        validateNoSpaces(data.email) &&
        validateHasDomain(data.email) &&
        validatePasswordSpaces(data.email) &&
        validateContainsAtSymbol(data.email) &&
        validateEmailFormat(data.email)
    );
  }, [data.password, data.email]);

  function handleLogIn() {
    if (!data.email || !data.password) {
      setErrorMessage({
        email: !data.email ? 'Email is required' : '',
        password: !data.password ? 'Password is required' : '',
      });
      setError(true);
      return;
    }
    if (formValid) {
      getCustometWithToken(
        data,
        navigate,
        setIsAuth,
        setError,
        setErrorMessage
      );
    } else {
      errorNotify('Please enter correct password and email');
    }
  }

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    if (newEmail === '') {
      setErrorEmail(false);
      setMessageEmail('');
    } else if (!validateNoSpaces(newEmail)) {
      setErrorEmail(true);
      setMessageEmail('Email should not contain spaces');
    } else if (!validateContainsAtSymbol(newEmail)) {
      setErrorEmail(true);
      setMessageEmail('Email should contain @ symbol');
    } else if (!validateHasDomain(newEmail)) {
      setErrorEmail(true);
      setMessageEmail('Email should have a valid domain');
    } else if (!validateEmailFormat(newEmail)) {
      setErrorEmail(true);
      setMessageEmail('Incorrect email format');
    } else {
      setErrorEmail(false);
      setMessageEmail('');
    }
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const newPassword = event.target.value;
    setErrorPassword(false);
    setMessagePassword('');

    if (newPassword === '') {
      setErrorPassword(false);
      setMessagePassword('');
    } else if (!validateCapitalChar(newPassword)) {
      setErrorPassword(true);
      setMessagePassword(
        'Password should contain at least one uppercase letter'
      );
    } else if (!validateLowerChar(newPassword)) {
      setErrorPassword(true);
      setMessagePassword(
        'Password should contain at least one lowercase letter'
      );
    } else if (!validateSpecialChar(newPassword)) {
      setErrorPassword(true);
      setMessagePassword(
        'Password must contain at least one special character (e.g., !@#$%^&*)'
      );
    } else if (!validateDigit(newPassword)) {
      setErrorPassword(true);
      setMessagePassword('Password must contain at least one digit (0-9).');
    } else if (!validatePasswordSpaces(newPassword)) {
      setErrorPassword(true);
      setMessagePassword(
        'Password must not contain leading or trailing whitespace.'
      );
    } else if (!validateLengthPassword(newPassword)) {
      setErrorPassword(true);
      setMessagePassword('Password must be at least 8 characters long.');
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'white' }}>
          <LockOpenIcon sx={{ color: 'black' }} />
        </Avatar>
        <Typography variant="h5">Log in</Typography>
        <ThemeProvider theme={customInputTheme(outerTheme)}>
          <TextField
            label="Email"
            name="email"
            variant="standard"
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
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            fullWidth
            error={error || errorPassword}
            helperText={errorMessage.password || passwordError}
            margin="normal"
            value={data.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setData((prev) => ({ ...prev, password: e.target.value }));
              setError(false);
              setErrorMessage(formFieldsDefault);
              handlePassword(e);
            }}
            InputProps={{
              endAdornment: (
                <PasswordVisibility
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                />
              ),
            }}
          />
        </ThemeProvider>
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogIn}
          sx={{ mt: 2 }}
          size="large"
          style={{
            backgroundColor: 'black',
            color: 'white',
          }}
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
