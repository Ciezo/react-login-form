import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Copyright from './Copyright';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DangerousIcon from '@mui/icons-material/Dangerous';

export default function SignUpForm() {

  // Form values
  const [formData, setFormData] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  // Successful user registration prompt
  const [isSuccess, setSuccess] = React.useState(false);
  // Error prompt
  const [isError, setError] = React.useState(false);

  // Trigger onChange when form submits
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }



  const handleSubmit = async (event) => {
    // Stop page reload
    event.preventDefault();
    /** Spread operator - iterates over an iterable object such as an array
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax  */
    const user = { ...formData } 
    console.log(user);

    try {
      const response = await fetch('http://localhost:8001/users', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(user) 
      })
      
      if (response.ok) {
        setSuccess(true);
        console.log("User registered successfully!")
      } else {
        setError(true);
        console.log("User registered failed!")
        console.error("Status code: " + response.status);
      }

    } catch (error) {
      setError(true);
      console.log("Something wrong may have happened with sending a request to the backend!");
      console.error(error);
    }
  };

  return (
    <>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            {/* Successful prompt when user is registered */}
            {isSuccess && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              You have successfully created a user account!
            </Alert>}

            {/* Fail prompt when user cannot register */}
            {isError && <Alert icon={<DangerousIcon fontSize="inherit" />} severity="error">
              Unfortunately, something went wrong in creating your user account. Please, try again!
            </Alert>
            } 

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* First Name */}
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* Last Name */}
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Email Address */}
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* Password */}
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
    </>
  );
}