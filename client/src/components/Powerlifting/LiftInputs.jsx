import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function LiftInputs(props) {
  const { lift } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">
          {lift}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField label="Lift 1" variant="outlined" />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Lift 2" variant="outlined" />
      </Grid>
      <Grid item xs={4}>
        <TextField label="Lift 3" variant="outlined" />
      </Grid>
    </Grid>
  );
}

export default LiftInputs;
