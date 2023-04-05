import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, TextField, Button, Grid, Container, Box, CssBaseline, Paper, ButtonBase } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgb(250, 214, 55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: 'white'
  },
  textField: {
    borderColor: 'yellow',
  }
}));

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if(username === '' || password === '') {
      if(username === ''){
        setUsernameError(true);
        setUsernameHelperText("This field can't be empty");
      }
      if(password === ''){
        setPasswordError(true);
        setPasswordHelperText("This field can't be empty");
      }
      
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
      setUsernameError(false);
      setUsernameHelperText("");
      
      axios.post('http://localhost:8080/api/login', {
          username: username,
          password: password
        })
        .then((response) => {
          var result = response.data;
          if(result.authenticated === true) {
            navigate("/list")
          } else {
            if(result.usernameError){
              setUsernameError(true);
              setUsernameHelperText("The username is incorrect");
            }
            if(result.passwordError){
              setPasswordError(true);
              setPasswordHelperText("The password is incorrect");
            }
          }
        }, (error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        {/* <Paper> */}
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Belépés
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                className={classes.textField}
                value={username}
                onChange={handleUsernameChange}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={usernameError}
                helperText={usernameHelperText}
              />
              <TextField
                className={classes.textField}
                value={password}
                onChange={handlePasswordChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordHelperText}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                color='warning'
                onClick={handleLogin}
              >
                Belépés
              </Button>
            </Box>
          </Box>
          {/* </Paper> */}
        </div>
    </div>
  );
};

export default LoginPage;
