import React, { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import styles from './LogIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'react-toastify/dist/ReactToastify.css';
import { formFieldsDefault, grey } from '../../../utils/consts';
import { getCustometWithToken } from './Api-Login';
import { AuthContext } from '../../../context';

export default function LogIn() {
  const [data, setData] = useState(formFieldsDefault);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState(formFieldsDefault);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogIn() {
    getCustometWithToken(data, navigate, setIsAuth, setError, setErrorMessage)
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
          onClick={handleLogIn}
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
