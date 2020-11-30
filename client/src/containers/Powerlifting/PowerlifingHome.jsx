import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Powerlifting() {
  return (
    <div>
      <Typography variant="h2">
        Powerlifting
      </Typography>
      <Link to="/powerlifting/meet/input">
        Input
      </Link>
    </div>
  );
}

export default Powerlifting;
