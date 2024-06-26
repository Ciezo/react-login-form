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
import { Link, useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
import Alert from '@mui/material/Alert';
import DangerousIcon from '@mui/icons-material/Dangerous';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

export default function SignInForm() {

  // Form values
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const signIn = useSignIn();

  // Fail prompt when user failed to log-in
  const [isError, setError] = React.useState(false);

  // Trigger onChange when form submits
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Redirect
  const navigate = useNavigate();



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userSigningIn = { ...formData } 
    
    try {
      const response = await fetch('http://localhost:18080/api/user-service/v1/auth/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userSigningIn) 
      })

      /** Extract the token */
      const sessionToken = await response.json();

      /** Authenticate using react-auth-kit */
      if(signIn({
        auth: {
          token: sessionToken.token,
          type: 'Bearer'
        },
        userState: {
          user: userSigningIn.email,
          role: "USER"
        }
      })) {
        // Upon successful signin, redirect the user to home
        navigate("/home");
      }

    } catch (error) {
      setError(true);
      console.log("Something wrong may have happened with sending a request to the backend!");
      console.log("Cannot login user...");
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
              Sign in
            </Typography>
            <Typography component="h1" variant="h6">
              Welcome, back!
            </Typography>
            <small>Submit your registered email and password to login</small>

            {/* Error prompt when user cannot log-in due to invalid credentials */}
            {isError && <Alert icon={<DangerousIcon fontSize="inherit" />} severity="error">
              Sorry, you may have entered the wrong username or password. Please, try again!
            </Alert>
            } 

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </>
  );
}