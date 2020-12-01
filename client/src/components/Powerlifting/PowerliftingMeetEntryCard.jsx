import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import LiftInputs from './LiftInputs.jsx';

function PowerliftingMeetEntryCard(props) {
  const { lifter } = props;
  return (
    <div>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              {lifter}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LiftInputs lift="Bench" />
          </Grid>
          <Grid item xs={12}>
            <LiftInputs lift="Squat" />
          </Grid>
          <Grid item xs={12}>
            <LiftInputs lift="Deadlift" />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

PowerliftingMeetEntryCard.propTypes = {
  lifter: PropTypes.string.isRequired,
};

export default PowerliftingMeetEntryCard;
