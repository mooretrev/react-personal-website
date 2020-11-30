import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PowerliftingMeetEntryCard from '../../components/Powerlifting/PowerliftingMeetEntryCard.jsx';

function PowerliftingMeetInput() {
  const [lifters, setLifters] = useState(['Trevor', 'Hunter']);

  const createPowerliftingEntryCards = () => {
    const items = [];
    for (let i = 0; i < lifters.length; i += 1) {
      items.push(
        <Grid item>
          <PowerliftingMeetEntryCard lifter={lifters[i]} />
        </Grid>,
      );
    }
    return items;
  };

  return (
    <Grid container spacing={2}>
      {createPowerliftingEntryCards()}
    </Grid>

  );
}

export default PowerliftingMeetInput;
