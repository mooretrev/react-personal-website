import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function PositionSizeCalculator(props) {
  const [accountSize, setAccountSize] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [entry, setEntry] = useState('');

  const handleAccountSizeInput = (event) => {
    setAccountSize(event.target.value);
  };
  const handleStopLossInput = (event) => {
    setStopLoss(event.target.value);
  };
  const handleEntryInput = (event) => {
    setEntry(event.target.value);
  };

  const displayPositionSize = () => {
    if (accountSize !== '' && stopLoss !== '' && entry !== '') {
      const accountSizeInt = parseInt(accountSize, 10);
      const stopLossInt = parseInt(stopLoss, 10);
      const entryInt = parseInt(entry, 10);

      const amountRisk = (accountSizeInt * props.risk);
      const numShares = amountRisk / (entryInt - stopLossInt);
      const size = entryInt * numShares;
      return (
        <Typography id="output" variant="h4">
          Position Size is
          {' '}
          {size}
          .
          {' '}
          <br />
          Number of Shares is
          {' '}
          {numShares}
          .
          {' '}
          <br />
          Amount at risk
          {' '}
          {amountRisk}
          .
        </Typography>
      );
    }
    return <div />;
  };

  return (
    <div>
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h2">
              Position Size Calculator
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField value={accountSize} id="acct_size_input" label="Account Size" variant="outlined" onChange={handleAccountSizeInput} />
          </Grid>
          <Grid item xs={4}>
            <TextField value={stopLoss} id="stop_loss_input" label="Stop Loss" variant="outlined" onChange={handleStopLossInput} />
          </Grid>
          <Grid item xs={4}>
            <TextField value={entry} id="entry_input" label="Entry" variant="outlined" onChange={handleEntryInput} />
          </Grid>
          <Grid item xs={12}>
            {displayPositionSize()}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

PositionSizeCalculator.propTypes = {
  risk: PropTypes.number.isRequired,
};

export default PositionSizeCalculator;
