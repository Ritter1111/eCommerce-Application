import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Autocomplete, Grid, ThemeProvider, useTheme, FormControlLabel, Checkbox } from '@mui/material';
import { ISignUpData } from '../../../interfaces/signup.interface';
import { customInputTheme } from '../../../components/custom-input-theme';
import styles from './SignUp.module.css'
import { handleSubmit } from './Api-Signup';

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    bd: '',
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
    sameAddress: false,
  });

  const customerBillingAddress = {
    streetName: signUpData.billingStreet,
    city: signUpData.billingCity,
    postalCode: signUpData.billingPostalCode,
    country: signUpData.billingCountry.slice(signUpData.billingCountry.indexOf('(') + 1, -1),
    type: 'Billing',
  };

  const customerShippingAddress = {
    streetName: signUpData.shippingStreet,
    city: signUpData.shippingCity,
    postalCode: signUpData.shippingPostalCode,
    country: signUpData.shippingCountry.slice(signUpData.shippingCountry.indexOf('(') + 1, -1),
    type: 'Shipping',
  }

  const [errors, setErrors] = useState<Partial<ISignUpData>>({});
  const [selectedBillingCountry, setSelectedBillingCountry] = useState<string | null>(null);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState<string | null>(null);
  const [defaultBillingAddress, setdefaultBillingAddress] = useState(false);
  const [defaultShippingAddress, setdefaultShippingAddress] = useState(false);

  const outerTheme = useTheme();

  const signUpState = {signUpData, customerBillingAddress, customerShippingAddress, selectedBillingCountry, selectedShippingCountry, defaultBillingAddress, defaultShippingAddress};

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleBillingCountryChange(event: React.ChangeEvent<object>, value: string | null) {
    setSelectedBillingCountry(value);
    if (value) {
      signUpData.billingCountry = value;
    }
  }

  function handleShippingCountryChange(event: React.ChangeEvent<object>, value: string | null) {
    setSelectedShippingCountry(value);
    if (value) {
      signUpData.shippingCountry = value;
    }
  }
  
  return (
    <Container maxWidth="xs">
      <div className={styles.container}>
        <Typography variant="h5">Sign Up</Typography>
        <form onSubmit={(event) => handleSubmit(event, signUpState, setErrors)}>
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
            <FormControlLabel
              control={
                <Checkbox
                  name="sameAddress"
                  checked={signUpData.sameAddress}
                  onChange={() => setSignUpData({...signUpData, sameAddress: !signUpData.sameAddress})}
                  sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: 'black',
                    },
                  }}
                />
              }
              label="Use same address for billing and shipping"
            />
            <TextField
              label="Billing Street"
              name="billingStreet"
              value={signUpData.billingStreet}
              onChange={handleInputChange}
              error={!!errors.billingStreet}
              helperText={errors.billingStreet}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Billing City"
              name="billingCity"
              value={signUpData.billingCity}
              onChange={handleInputChange}
              error={!!errors.billingCity}
              helperText={errors.billingCity}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Billing Postal Code"
              name="billingPostalCode"
              value={signUpData.billingPostalCode}
              onChange={handleInputChange}
              error={!!errors.billingPostalCode}
              helperText={errors.billingPostalCode}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Autocomplete
              id="billing-country"
              options={['Germany (DE)', 'France (FR)', 'United Kingdom (GB)', 'Italy (IT)', 'Spain (ES)', 'Ukraine (UA)', 'Poland (PL)', 'Sweden (SE)', 'Norway (NO)', 'Finland (FI)', 'Denmark (DK)', 'Switzerland (CH)', 'Austria (AT)', 'Greece (GR)', 'Portugal (PT)']}
              value={selectedBillingCountry}
              onChange={handleBillingCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Billing Country"
                  name="billing-country"
                  variant="outlined"
                  error={!!errors.billingCountry}
                  helperText={errors.billingCountry}
                  fullWidth
                  margin='normal'
                />
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="default billing address"
                  checked={defaultBillingAddress}
                  onChange={() => setdefaultBillingAddress(!defaultBillingAddress)}
                  sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: 'black',
                    },
                  }}
                />
              }
              label="It is default billing address?"
            />
            <TextField
              label="Shipping Street"
              name="shippingStreet"
              value={signUpData.shippingStreet}
              onChange={handleInputChange}
              fullWidth
              error={signUpData.sameAddress ? false : !!errors.shippingStreet}
              helperText={signUpData.sameAddress ? '' : errors.shippingStreet}
              margin="normal"
              variant="outlined"
              disabled={signUpData.sameAddress}
            />
            <TextField
              label="Shipping City"
              name="shippingCity"
              value={signUpData.shippingCity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={signUpData.sameAddress}
              error={signUpData.sameAddress ? false : !!errors.shippingCity}
              helperText={signUpData.sameAddress ? '' : errors.shippingCity}
            />
            <TextField
              label="Shipping Postal Code"
              name="shippingPostalCode"
              value={signUpData.shippingPostalCode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={signUpData.sameAddress}
              error={signUpData.sameAddress ? false : !!errors.shippingPostalCode}
              helperText={signUpData.sameAddress ? '' : errors.shippingPostalCode}
            />
            <Autocomplete
              id="shipping-country"
              options={['Germany (DE)', 'France (FR)', 'United Kingdom (GB)', 'Italy (IT)', 'Spain (ES)', 'Ukraine (UA)', 'Poland (PL)', 'Sweden (SE)', 'Norway (NO)', 'Finland (FI)', 'Denmark (DK)', 'Switzerland (CH)', 'Austria (AT)', 'Greece (GR)', 'Portugal (PT)']}
              value={selectedShippingCountry}
              disabled={signUpData.sameAddress}
              onChange={handleShippingCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Shipping Country"
                  name="shipping-country"
                  variant="outlined"
                  error={signUpData.sameAddress ? false : !!errors.shippingCity}
                  helperText={signUpData.sameAddress ? '' : errors.shippingCity}
                  fullWidth
                  margin='normal'
                />
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="default shipping address"
                  checked={defaultShippingAddress}
                  onChange={() => setdefaultShippingAddress(!defaultShippingAddress)}
                  sx={{
                    color: 'gray',
                    '&.Mui-checked': {
                      color: 'black',
                    },
                  }}
                />
              }
              label="It is default Shipping address?"
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
