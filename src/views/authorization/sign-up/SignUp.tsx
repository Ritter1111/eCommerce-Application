import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Autocomplete, Grid, ThemeProvider, useTheme } from '@mui/material';
import { ISignUpData } from '../../../interfaces/signup.interface';
import { customInputTheme } from '../../../components/custom-input-theme';
import styles from './SignUp.module.css'

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bd: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [errors, setErrors] = useState<Partial<ISignUpData>>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const outerTheme = useTheme();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCountryChange(event: React.ChangeEvent<object>, value: string | null) {
    setSelectedCountry(value);
    if (value) {
      signUpData.country = value;
    }
  }

  function validatePostalCode(postalCode: string, country: string): boolean {
    const postalCodeRegexMap: { [country: string]: RegExp } = {
      Germany: /^\d{5}$/,
      France: /^\d{5}$/,
      UnitedKingdom: /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}$/,
      Italy: /^\d{5}$/,
      Spain: /^\d{5}$/,
      Ukraine: /^\d{5}$/,
      Poland: /^\d{2}-\d{3}$/,
      Sweden: /^\d{5}$/,
      Norway: /^\d{4}$/,
      Finland: /^\d{5}$/,
      Denmark: /^\d{4}$/,
      Switzerland: /^\d{4}$/,
      Austria: /^\d{4}$/,
      Greece: /^\d{5}$/,
      Portugal: /^\d{4}-\d{3}$/,
    };

    const regex = postalCodeRegexMap[country];
  
    if (!regex) {
      return false;
    }
  
    return regex.test(postalCode);
  }

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
    if (!signUpData.street) {
      newErrors.street = 'Street is required';
    }
    if (!signUpData.city) {
      newErrors.city = 'City is required';
    } else if (!/^[A-Za-z\s]+$/.test(signUpData.city)) {
      newErrors.city = 'City should only contain letters and spaces';
    }
    if (!validatePostalCode(signUpData.postalCode, selectedCountry || '')) {
      newErrors.postalCode = 'Invalid postal code format for the selected country';
    }
    if (!selectedCountry) {
      newErrors.country = 'Country is required';
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
          <ThemeProvider theme={customInputTheme(outerTheme)}>
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
            <TextField
              label="Street"
              name="street"
              variant="outlined"
              value={signUpData.street}
              onChange={handleInputChange}
              error={!!errors.street}
              helperText={errors.street}
              fullWidth
              margin='normal'
            />
            <TextField
              label="City"
              name="city"
              variant="outlined"
              value={signUpData.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
              fullWidth
              margin='normal'
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              variant="outlined"
              value={signUpData.postalCode}
              onChange={handleInputChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              fullWidth
              margin='normal'
            />
            <Autocomplete
              id="country"
              options={['Germany', 'France', 'UnitedKingdom', 'Italy', 'Spain', 'Ukraine', 'Poland', 'Sweden', 'Norway', 'Finland', 'Denmark', 'Switzerland', 'Austria', 'Greece', 'Portugal']}
              value={selectedCountry}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  name="country"
                  variant="outlined"
                  error={!!errors.country}
                  helperText={errors.country}
                  fullWidth
                  margin='normal'
                />
              )}
            />
          </ThemeProvider>
          <Button variant="contained" style={{ backgroundColor: 'black' }} type="submit" fullWidth sx={{ mt: 2 }} size='large'>
            Sign Up
          </Button>
        </form>
        <Grid container>
          <Grid item sx={{ mt: 2 }}>
            <Link to="/login" className={styles.link}>
              {"Have an account? Log In"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
