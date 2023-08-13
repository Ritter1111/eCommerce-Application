import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Autocomplete, Grid, ThemeProvider, useTheme, FormControlLabel, Checkbox } from '@mui/material';
import { IAddAddress, ISignUpData } from '../../../interfaces/signup.interface';
import { customInputTheme } from '../../../components/custom-input-theme';
import styles from './SignUp.module.css'

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

  // const customerShippingAddress = {
  //   streetName: signUpData.shippingStreet,
  //   city: signUpData.shippingCity,
  //   postalCode: signUpData.shippingPostalCode,
  //   country: signUpData.shippingCountry.slice(signUpData.shippingCountry.indexOf('(') + 1, -1),
  //   type: 'Shipping',
  // }

  const [errors, setErrors] = useState<Partial<ISignUpData>>({});
  const [selectedBillingCountry, setSelectedBillingCountry] = useState<string | null>(null);
  const [selectedShippingCountry, setSelectedShippingCountry] = useState<string | null>(null);
  const [defaultBillingAddress, setdefaultBillingAddress] = useState(false);
  const [defaultShippingAddress, setdefaultShippingAddress] = useState(false);

  const outerTheme = useTheme();

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
    if (!signUpData.billingStreet) {
      newErrors.billingStreet = 'Street is required';
    }
    if (!signUpData.shippingStreet && !signUpData.sameAddress) {
      newErrors.shippingStreet = 'Street is required'
    }
    if (!signUpData.billingCity && !signUpData.sameAddress) {
      newErrors.billingCity = 'City is required';
    } else if (!/^[A-Za-z\s]+$/.test(signUpData.billingCity)) {
      newErrors.billingCity = 'City should only contain letters and spaces';
    }
    if (!signUpData.shippingCity && !signUpData.sameAddress) {
      newErrors.shippingCity = 'City is required'
    } else if (!/^[A-Za-z\s]+$/.test(signUpData.shippingCity) && !signUpData.sameAddress) {
      newErrors.shippingCity = 'City should only contain letters and spaces';
    }
    if (!validatePostalCode(signUpData.billingPostalCode, selectedBillingCountry || '') && !signUpData.sameAddress) {
      newErrors.billingPostalCode = 'Invalid postal code format for the selected country';
    }
    if (!validatePostalCode(signUpData.shippingPostalCode, selectedShippingCountry || '') && !signUpData.sameAddress) {
      newErrors.shippingPostalCode = 'Invalid postal code format for the selected country';
    }
    if (!selectedBillingCountry && !signUpData.sameAddress) {
      newErrors.billingCountry = 'Country is required';
    }
    if (!selectedShippingCountry && !signUpData.sameAddress) {
      newErrors.shippingCountry = 'Country is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function getCustomerToken(email: string, password: string) {
    const credentials = `${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`;
    const encodedCredentials = btoa(credentials);
    try {
      const response = await fetch(
        `${process.env.CTP_AUTH_URL}/oauth/chat_gpt_team/customers/token`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'password',
            username: `${email}`,
            password: `${password}`,
          }),
        }
      );
      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  };

  async function getOauthToken(email: string, password: string) {
    const credentials = `${process.env.CTP_CLIENT_ID}:${process.env.CTP_CLIENT_SECRET}`;
    const encodedCredentials = btoa(credentials);

    try {
      const response = await fetch(`${process.env.CTP_AUTH_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          username: `${email}`,
          password: `${password}`,
        }),
      });

      const data = await response.json();
      const accessToken = data.access_token;
      return accessToken;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error;
    }
  };

  async function addAddresses({ streetName, postalCode, city, country, type, }: IAddAddress, version: number) {
    const token = await getCustomerToken(signUpData.email, signUpData.password);

    try {
      const response = await fetch(`${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          version : version,
          actions : [ {
            action : "addAddress",
            address : {
              streetName : `${streetName}`,
              postalCode : `${postalCode}`,
              city : `${city}`,
              country : `${country}`,
            }
          } ]
        })
      });

      if (response.ok) {
        console.log('Addresses added successfully');
      } else {
        console.error(`Failed to add addresses ${type}`);
      }
    } catch (error) {
      console.error(`Error adding addresses ${type}:`, error);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  
    if (validateForm()) {
      try {
        const customerSinUpInfo = {
          email: signUpData.email,
          password: signUpData.password,
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          dateOfBirth: signUpData.bd,
        };
            
        const token = await getOauthToken(customerSinUpInfo.email, customerSinUpInfo.password);

        const response = await fetch(`${process.env.CTP_API_URL}/${process.env.CTP_PROJECT_KEY}/me/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(customerSinUpInfo),
        });
        
        if (response.ok) {
          const data = await response.json();
          addAddresses(customerBillingAddress, data.customer.version);
          console.log('Customer created successfully');
        } else {
          console.error('Failed to create customer');
        }
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    }
  }
  
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
