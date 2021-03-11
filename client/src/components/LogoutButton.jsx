import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

const LogoutButton = (props) => {
  const history = useHistory();
  const { setAuthenicated } = props;

  const handleClick = async () => {
    await axios.delete('/api/auth/logout');
    history.push('/');
    setAuthenicated(false);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;

LogoutButton.propTypes = {
  setAuthenicated: PropTypes.func.isRequired,
};
