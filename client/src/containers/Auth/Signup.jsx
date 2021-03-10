import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  welcomeMessage: {
    marginTop: '30px',
    marginBottom: '20px',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '400px',
    paddingRight: '5%',
    paddingLeft: '5%',
    textAlign: 'center',
  },
  inputSpacing: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  link: {
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
    marginBottom: '10px',
  },
});

export default function Signup() {
  const loginClasses = useStyles();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return 0;
    }
    const response = await axios.post('/api/auth/signup', { username, email, password });
    if (response.status === 200) {
      setSuccess(true);
    }
    return 0;
  };

  const renderSignupError = () => {
    if (passwordError) {
      return (
        <Typography varaint="body1" style={{ color: 'red' }}>Password must be the same.</Typography>
      );
    }
    return <div />;
  };

  const renderSuccess = () => {
    if (success) {
      return (
        <Typography variant="body1" style={{ color: 'white' }}>
          Account successfully created! Admin will contact you when your account is approved.
        </Typography>
      );
    }
    return <div />;
  };

  return (
    <div className={loginClasses.flexContainer}>
      <Card className={loginClasses.card}>
        <Grid
          container
          justify="center"
        >
          <Grid className={loginClasses.welcomeMessage} item xs={12}>
            <Typography variant="body1">
              Welcome to trevor.info. Please signup to continue.
            </Typography>
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              variant="outlined"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignup}
            >
              Submit
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            className={loginClasses.errorMessage}
          >
            {renderSignupError()}
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            className={loginClasses.errorMessage}
          >
            {renderSuccess()}
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <Link className={loginClasses.link} href="/login">
              Click here to login
            </Link>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
