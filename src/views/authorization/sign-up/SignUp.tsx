import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import styles from './SignUp.module.css'
import { blueGrey } from '@mui/material/colors';
import { ISignUpData } from '../../../interfaces/signup.interface';

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bd: '',
  });

  const [errors, setErrors] = useState<Partial<ISignUpData>>({});
  const grey = blueGrey['A700'];

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function validateForm() {
    const newErrors: Partial<ISignUpData> = {};
  
    if (!signUpData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(signUpData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!signUpData.password || signUpData.password.length < 8) {
      newErrors.password = 'Password should have at least 8 characters';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(signUpData.password)) {
      newErrors.password = 'Password should have at least one uppercase letter, one lowercase letter, and one number';
    }
    if (!signUpData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[A-Za-z]+$/.test(signUpData.firstName)) {
      newErrors.firstName = 'First name should only contain letters';
    }
    if (!signUpData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[A-Za-z]+$/.test(signUpData.lastName)) {
      newErrors.lastName = 'Last name should only contain letters';
    }
    if (!signUpData.bd) {
      newErrors.bd = 'Date of Birth is required';
    } else {
      const bdDate = new Date(signUpData.bd);
      const currentDate = new Date();
      const minAgeDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
  
      if (bdDate > minAgeDate) {
        newErrors.bd = 'You must be at least 13 years old';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    validateForm();
  };

  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            value={signUpData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            margin='normal'
          />
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            value={signUpData.firstName}
            onChange={handleInputChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
            margin='normal'
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={signUpData.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
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
            error={!!errors.bd}
            helperText={errors.bd}
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