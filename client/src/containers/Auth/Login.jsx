import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import getQueryParams from '../../url/getQueryParams.js';

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
  '@media only screen and (max-width: 450px)': {
    card: {
      width: '95%',
    },
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

export default function Login(props) {
  const { setAuthenicated } = props;

  const loginClasses = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('/api/auth/login', { username, password });
      setAuthenicated(true);
      await axios.get('/api/auth/authenicated');
      const queries = await getQueryParams(history);
      history.push(`${queries.next}`);
    } catch (err) {
      setLoginError(err.response.data.error);
    }
  };

  const renderLoginError = () => {
    if (loginError !== '') {
      return (
        <Typography variant="p">
          {loginError}
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
              Welcome to trevor.info. Please login to continue.
            </Typography>
          </Grid>
          <Grid item xs={12} container justify="center">
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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogin}
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
            {renderLoginError()}
          </Grid>
          <Grid item xs={12} container justify="center" className={loginClasses.inputSpacing}>
            <Link className={loginClasses.link} href="/signup">
              Click here to sign up
            </Link>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

Login.propTypes = {
  setAuthenicated: PropTypes.func.isRequired,
};
