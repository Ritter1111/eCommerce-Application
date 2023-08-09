import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import styles from './SignUp.module.css'
import { blueGrey } from '@mui/material/colors';
import { ISignUpData } from '../../../interfaces/signup.interface';

export default function SignUP() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bd: '',
  });

  const grey = blueGrey['A700'];

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography variant="h5">Sign Up</Typography>
        <form>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            value={signUpData.email}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={signUpData.password}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            value={signUpData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={signUpData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label="Date of Birth"
            name="bd"
            type="date"
            variant="outlined"
            value={signUpData.bd}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" style={{ backgroundColor: grey }} type="submit" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};