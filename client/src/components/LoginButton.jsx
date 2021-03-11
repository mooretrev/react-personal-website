// src/components/login-button.js

import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const LoginButton = () => {
  const history = useHistory();

  const onClick = () => {
    let next = history.location.pathname;
    if (next === '/login') {
      next = '/';
    }
    history.push(`/login?next=${next}`);
  };
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="secondary"
    >
      Log In
    </Button>
  );
};

export default LoginButton;
