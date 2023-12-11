import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import toast from "react-hot-toast";
import axios from "axios";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
const defaultTheme = createTheme();

export default function Login() {

  const [isButtonDisabled ,setIsButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cnfPassword:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    updateButtonDisabled();
  };



  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    if (formData?.password !== formData?.cnfPassword) {
      toast.error("Passwords do not match. Please make sure the entered passwords match.");
      return;
    }
    
  
    try {
      const response = await axios.post(`https://loginsystem-bs85.onrender.com/api/users/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.status === 201) {
        toast.success(response.data.message);
        return <Navigate to={"/home"} /> ;

      } else {
        console.error('Signup failed:', response.data.message);
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error("An error occurred during signup. Please try again later.");
    }
  };
  
  
  const updateButtonDisabled = () => {
    setIsButtonDisabled(!(formData.name && formData.email && formData.password && formData.cnfPassword));
  };

  return (
    <div className="registration-container">
    <div className="registration-form">

    <ThemeProvider theme={defaultTheme}>
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
          <Typography fontWeight='bold' fontSize={30} color={'#056b6b'} component="h1" variant="h5">
            Register Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username or Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoFocus         
               />
             <TextField
              margin="normal"
              required
              fullWidth
              name="cnfPassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
              value={formData.cnfPassword}
              onChange={handleChange}
              autoFocus         
               />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isButtonDisabled}
              sx={{ mt: 3, mb: 2, backgroundColor: '#107373', 
              '&:hover': {
                backgroundColor: '#056b6d', 
              }, }} >
              Sign Up
            </Button>
              <Grid item>
                <Link href="/login"  color={'#056b6b'} variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
    </div>
  );
}