import React from 'react';
import Welcome from '../../components/Welcome/Welcome.jsx';
import useStyles from '../../styles/Index.jsx';

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <Welcome />
    </div>
  );
}

export default Home;
