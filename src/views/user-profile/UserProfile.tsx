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
  Autocomplete,
} from '@mui/material';
import styles from './UserProfile.module.css';
import { customInputTheme } from '../../utils/custom-input-theme';
import BadgeIcon from '@mui/icons-material/Badge';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PasswordVisibility from '../authorization/log-in/PasswordVisibility';

export default function UserProfile() {
  const userState = JSON.parse(localStorage.getItem('customer') || '');
  const [tabValue, setTabValue] = useState('1');
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [changeEmail, setChangeEmail] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<boolean>(false);
  const [changeLastName, setChangeLastName] = useState<boolean>(false);
  const [changeBd, setChangeBd] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<string | null>(null);
  const [selectedPostalCode, setSelectedPostalCode] = useState<string | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>(
    userState.customer.firstName
  );
  const [lastName, setLastName] = useState<string>(userState.customer.lastName);
  const [email, setEmail] = useState<string>(userState.customer.email);
  const [dateOfBirth, setdateOfBirth] = useState<string>(
    userState.customer.dateOfBirth
  );
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const addresses = userState.customer.addresses;
  const billingAddressesId = userState.customer.billingAddressIds;
  const shippingAddressesId = userState.customer.shippingAddressIds;
  const defaultBillingAddressId = userState.customer.defaultBillingAddressId;
  const defaultShippingAddressId = userState.customer.defaultShippingAddressId;
  const billingAddresses: IAddress[] = [];
  const shippingAddresses: IAddress[] = [];

  interface IAddress {
    city: string;
    country: string;
    id: string;
    postalCode: string;
    streetName: string;
  }

  addresses.forEach((address: IAddress) => {
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

  function handleTabChange(event: React.SyntheticEvent, newTabValue: string) {
    setTabValue(newTabValue);
  }

  function handleCountryChange(
    event: React.ChangeEvent<object>,
    value: string | null
  ) {
    setSelectedCountry(value);
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
                      value={firstName}
                      disabled={!changeName}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setFirstName(value);
                      }}
                    />
                  </Grid>
                  {!changeName && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeName(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeName && (
                    <Grid item xs={1.5} textAlign="end">
                      <IconButton>
                        <CheckOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setChangeName(false);
                          setFirstName(userState.customer.firstName);
                        }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      value={lastName}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setLastName(value);
                      }}
                      disabled={!changeLastName}
                    />
                  </Grid>
                  {!changeLastName && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeLastName(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeLastName && (
                    <Grid item xs={1.5} textAlign="end">
                      <IconButton>
                        <CheckOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setChangeLastName(false);
                          setLastName(userState.customer.lastName);
                        }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  <Grid item sm={6} xs={10}>
                    <TextField
                      label="Date of Birth"
                      name="bd"
                      type="date"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      value={dateOfBirth}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setdateOfBirth(value);
                      }}
                      disabled={!changeBd}
                    />
                  </Grid>
                  {!changeBd && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeBd(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeBd && (
                    <Grid item xs={1.5} textAlign="end">
                      <IconButton>
                        <CheckOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setChangeBd(false);
                          setdateOfBirth(userState.customer.dateOfBirth);
                        }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
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
                      <Grid item xs={9} sm={5}>
                        {address.id === defaultBillingAddressId && (
                          <Typography
                            variant="caption"
                            align="left"
                            sx={{
                              backgroundColor: 'lightgray',
                              color: 'white',
                              padding: 0.3,
                              borderRadius: 30,
                            }}
                          >
                            default
                          </Typography>
                        )}
                        <Typography variant="body1" align="left">
                          {address.streetName}, {address.postalCode}{' '}
                          {address.city}, {address.country}
                        </Typography>
                        {/* вызывать фун-ю по клику, открывать полэ для измененый з заполнеными полями данного адреса делать запрос по айдышныку */}
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setIsEditAddress(true);
                            setSelectedCity(address.city);
                            setSelectedCountry(address.country);
                            setSelectedPostalCode(address.postalCode);
                            setSelectedStreet(address.streetName);
                          }}
                        >
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid
                  container
                  alignItems="flex-end"
                  justifyContent="center"
                  mt={4}
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
                      <Grid item xs={9} sm={5}>
                        {address.id === defaultShippingAddressId && (
                          <Typography
                            variant="caption"
                            align="left"
                            sx={{
                              backgroundColor: 'lightgray',
                              color: 'white',
                              padding: 0.3,
                              borderRadius: 30,
                            }}
                          >
                            default
                          </Typography>
                        )}
                        <Typography variant="body1" align="left">
                          {address.streetName}, {address.postalCode}{' '}
                          {address.city}, {address.country}
                        </Typography>
                        {/* вызывать фун-ю по клику, открывать полэ для измененый з заполнеными полями данного адреса делать запрос по айдышныку */}
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton
                          onClick={() => {
                            setIsEditAddress(true);
                            setSelectedCity(address.city);
                            setSelectedCountry(address.country);
                            setSelectedPostalCode(address.postalCode);
                            setSelectedStreet(address.streetName);
                          }}
                        >
                          <DriveFileRenameOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1} textAlign="end">
                        <IconButton>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
                {isEditAddress && (
                  <Grid
                    container
                    alignItems="flex-end"
                    justifyContent="center"
                    sx={{ tran: 100 }}
                  >
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
                        name="street"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={selectedStreet}
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <TextField
                        label="City"
                        name="city"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={selectedCity}
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <TextField
                        label="Postal Code"
                        name="postalCode"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        value={selectedPostalCode}
                      />
                    </Grid>
                    <Grid item xs={11} sm={7} sx={gridItemStyle}>
                      <Autocomplete
                        id="country"
                        options={[
                          'Germany (DE)',
                          'France (FR)',
                          'United Kingdom (GB)',
                          'Italy (IT)',
                          'Spain (ES)',
                          'Ukraine (UA)',
                          'Poland (PL)',
                          'Sweden (SE)',
                          'Norway (NO)',
                          'Finland (FI)',
                          'Denmark (DK)',
                          'Switzerland (CH)',
                          'Austria (AT)',
                          'Greece (GR)',
                          'Portugal (PT)',
                        ]}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            name="country"
                            variant="standard"
                            fullWidth
                            margin="normal"
                          />
                        )}
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
                        onClick={() => {
                          setIsEditAddress(false);
                          setSelectedCity(null);
                          setSelectedCountry(null);
                          setSelectedPostalCode(null);
                          setSelectedStreet(null);
                        }}
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
                      value={email}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setEmail(value);
                      }}
                      disabled={!changeEmail}
                    />
                  </Grid>
                  {!changeEmail && (
                    <Grid item xs={1} textAlign="end">
                      <IconButton onClick={() => setChangeEmail(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changeEmail && (
                    <Grid item xs={1.5} textAlign="end">
                      <IconButton>
                        <CheckOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setChangeEmail(false);
                          setEmail(userState.customer.email);
                        }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  <Grid item xs={11} sm={7} mt={4}>
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant="h6"
                      align="left"
                      gutterBottom
                    >
                      Reset password:
                    </Typography>
                  </Grid>
                  <Grid item sm={7} xs={11}>
                    <TextField
                      label="Current password"
                      name="password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      variant="standard"
                      fullWidth
                      margin="normal"
                      disabled={!changePassword}
                      value={currentPassword}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setCurrentPassword(value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <PasswordVisibility
                            showPassword={showCurrentPassword}
                            handleClickShowPassword={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item sm={7} xs={11}>
                    <TextField
                      label="New password"
                      name="password"
                      type={showNewPassword ? 'text' : 'password'}
                      variant="standard"
                      fullWidth
                      margin="normal"
                      disabled={!changePassword}
                      value={newPassword}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const { value } = event.target;
                        setNewPassword(value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <PasswordVisibility
                            showPassword={showNewPassword}
                            handleClickShowPassword={() =>
                              setShowNewPassword(!showNewPassword)
                            }
                          />
                        ),
                      }}
                    />
                  </Grid>
                  {!changePassword && (
                    <Grid item sm={7} xs={11} textAlign="start">
                      <IconButton onClick={() => setChangePassword(true)}>
                        <DriveFileRenameOutlineOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {changePassword && (
                    <Grid item sm={7} xs={11} textAlign="start">
                      <IconButton>
                        <CheckOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setChangePassword(false);
                          setCurrentPassword('');
                          setNewPassword('');
                        }}
                      >
                        <CancelOutlinedIcon />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
        </ThemeProvider>
      </div>
    </Container>
  );
}
