import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import {
  BrowserRouter,
} from 'react-router-dom';
import loading from '../static/images/loading.svg';
import NavBar from './NavBar/NavBar.jsx';
import useStyles from '../styles/Index.jsx';
import Theme from '../styles/Theme.jsx';

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <NavBar />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className="spinner">
              <img src={loading} alt="Loading" />
            </div>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </div>

  );
};

export default Loading;
