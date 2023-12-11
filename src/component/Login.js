import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";
const defaultTheme = createTheme();

export default function Login() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    updateButtonDisabled();
  };
  const updateButtonDisabled = () => {
    setIsButtonDisabled(!(formData.email && formData.password));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://loginsystem-bs85.onrender.com/api/users/login`, formData,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        toast.success(response.data.message);
        return <Navigate to={"/home"} /> ;
        
      } else {
        console.error('Login failed:', response.data.message);
        toast.error("Login failed. Please try again.");
      }  
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                fontWeight="bold"
                fontSize={30}
                color={"#056b6b"}
                component="h1"
                variant="h5"
              >
                Login Form
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >

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
                <Button
                  className='registration-button"'
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isButtonDisabled}
                  sx={{ mt: 3, mb: 2, backgroundColor: '#107373', 
                  '&:hover': {
                    backgroundColor: '#056b6d', 
                  }, }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link color={"#056b6b"} href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" color={"#056b6b"} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
