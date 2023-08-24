import React, { useState } from 'react';
import {
  Container,
  TextField,
  Grid,
  ThemeProvider,
  useTheme,
  Typography,
  Avatar,
  Tab,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import styles from './UserProfile.module.css';
import { customInputTheme } from '../../utils/custom-input-theme';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PasswordVisibility from '../authorization/log-in/PasswordVisibility';

export default function UserProfile() {
  const userState = JSON.parse(localStorage.getItem('customer') || '');
  const [tabValue, setTabValue] = useState('1');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const addresses = userState.customer.addresses;
  const billingAddressesId = userState.customer.billingAddressIds;
  const shippingAddressesId = userState.customer.shippingAddressIds;
  const billingAddresses: Iaddress[] = [];
  const shippingAddresses: Iaddress[] = [];

  interface Iaddress {
    city: string;
    country: string;
    id: string;
    postalCode: string;
    streetName: string;
  }

  addresses.forEach((address: Iaddress) => {
    if (address.id.includes(billingAddressesId)) {
      billingAddresses.push(address);
    }
    if (address.id.includes(shippingAddressesId)) {
      shippingAddresses.push(address);
    }
  });

  const outerTheme = useTheme();

  const gridItemStyle = {
    marginTop: '-0.5rem',
    marginBottom: '-0.5rem',
  };

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function handleTabChange(event: React.SyntheticEvent, newTabValue: string) {
    setTabValue(newTabValue);
  }

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <div className={styles.container}>
        <Avatar sx={{ m: 1, width: 46, height: 46, bgcolor: 'white' }}>
          <BadgeIcon sx={{ color: 'black' }} />
        </Avatar>
        <Typography variant="h5">User profile</Typography>
        <ThemeProvider theme={customInputTheme(outerTheme)}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
              <Box>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                  centered
                  textColor="inherit"
                  indicatorColor="primary"
                  TabIndicatorProps={{
                    sx: { backgroundColor: 'black' },
                  }}
                  sx={{
                    '& button': {
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    },
                  }}
                >
                  <Tab label="Personal info" value="1" />
                  <Tab label="Addresses" value="2" />
                  <Tab label="Secure" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      defaultValue={userState.customer.firstName}
                    />
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton>
                      <DriveFileRenameOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      defaultValue={userState.customer.lastName}
                    />
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton>
                      <DriveFileRenameOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Date of Birth"
                      name="bd"
                      type="date"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      defaultValue={userState.customer.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton>
                      <DriveFileRenameOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item xs={11} sm={7}>
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant="h6"
                      align="left"
                      gutterBottom
                    >
                      Billing Addresses:
                    </Typography>
                  </Grid>
                </Grid>
                {billingAddresses.map((address, i) => {
                  return (
                    <Grid
                      container
                      alignItems="flex-end"
                      justifyContent="center"
                      key={i}
                    >
                      <Grid item xs={10} sm={6}>
                        <Typography variant="body1" align="left">
                          {address.streetName}, {address.postalCode}{' '}
                          {address.city}, {address.country}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton onClick={() => setIsEditAddress(true)}>
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid
                  container
                  alignItems="flex-end"
                  justifyContent="center"
                  mt={3}
                >
                  <Grid item xs={11} sm={7}>
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant="h6"
                      align="left"
                      gutterBottom
                    >
                      Shipping Addresses:
                    </Typography>
                  </Grid>
                </Grid>
                {shippingAddresses.map((address, i) => {
                  return (
                    <Grid
                      container
                      alignItems="flex-end"
                      justifyContent="center"
                      key={i}
                    >
                      <Grid item xs={10} sm={6}>
                        <Typography variant="body1" align="left">
                          {address.streetName}, {address.postalCode}{' '}
                          {address.city}, {address.country}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton onClick={() => setIsEditAddress(true)}>
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
                {isEditAddress && (
                  <Grid container alignItems="flex-end" justifyContent="center" sx={{ tran: 100 }}>
                    <Grid item xs={11} sm={7} mt={3}>
                      <Typography
                        sx={{ fontWeight: 'bold' }}
                        variant="h6"
                        align="left"
                        gutterBottom
                      >
                        Set changes:
                      </Typography>
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <TextField
                        label="Street"
                        name="shippingStreet"
                        fullWidth
                        margin="normal"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <TextField
                        label="City"
                        name="shippingCity"
                        fullWidth
                        margin="normal"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <TextField
                        label="Postal Code"
                        name="shippingPostalCode"
                        fullWidth
                        margin="normal"
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <TextField
                        label="Country"
                        name="shipping-country"
                        variant="standard"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <Button
                        variant="outlined"
                        style={{ borderColor: 'black', color: 'black' }}
                        sx={{ mt: 3 }}
                        size="small"
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        style={{ borderColor: 'black', color: 'black' }}
                        sx={{ mt: 3, ml: 2 }}
                        size="small"
                        onClick={() => setIsEditAddress(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
              <TabPanel value="3">
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Email"
                      name="email"
                      variant="standard"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton>
                      <DriveFileRenameOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      variant="standard"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <PasswordVisibility
                            showPassword={showPassword}
                            handleClickShowPassword={handleClickShowPassword}
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={1} textAlign="end">
                    <IconButton>
                      <DriveFileRenameOutlineOutlinedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </ThemeProvider>
      </div>
    </Container>
  );
}
