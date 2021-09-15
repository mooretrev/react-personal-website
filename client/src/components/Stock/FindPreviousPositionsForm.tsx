import React, { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Popover from '@material-ui/core/Popover';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2),
    width: '300px',
  },
  sumbitButton: {
    marginTop: theme.spacing(2),
  },
  dateInputs: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  popoverButton: {
    marginBottom: theme.spacing(1)
  }
}));

export default function FindPreviousPositionsForm(): ReactElement {
  const classes = useStyles();

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [startDateError, setStartDateError] = React.useState('')
  const [endDateError, setEndDateError] = React.useState('')

  const handleStartDateInput = (date: Date | null) => {
    if (startDateError !== '') {
      setStartDateError('')
    }
    setStartDate(date)
  }

  const handleEndDateInput = (date: Date | null): void => {
    if (endDateError !== '') {
      setEndDateError('')
    }
    setEndDate(date)
  }

  const handleFormSubmit = () => {
    if (startDate === null) {
      setStartDateError('The field is required.')
      return
    }
    if (endDate === null) {
      setEndDateError('The field is required.')
      return
    }
  };

  const open = Boolean(anchorEl);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Button className={classes.popoverButton} variant="outlined" onClick={(event) => setAnchorEl(event.currentTarget)}>
        Find Previous Positions
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <FormLabel
                component="legend"
              >
                Select a time frame to add previous positions to the table.
              </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                className={classes.dateInputs}
                label="Start Date"
                value={startDate}
                onChange={handleStartDateInput}
                error={true}
                required

              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                className={classes.dateInputs}
                label="End Date"
                value={endDate}
                onChange={handleEndDateInput}
                invalidLabel={endDateError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button className={classes.sumbitButton} variant="outlined" onClick={handleFormSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Popover>
    </MuiPickersUtilsProvider>
  );
}
