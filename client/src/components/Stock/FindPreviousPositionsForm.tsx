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
import axios, { AxiosError } from 'axios';
import { CircularProgress, FormHelperText } from '@material-ui/core';
import { StockPositionPostBody } from '../../../../api/src/routes/stockPosition';
import useApi from '../../hooks/useApi';

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
    width: '100%',
  },
  popoverButton: {
    marginBottom: theme.spacing(1),
  },
  errorMessage: {
    color: theme.palette.error.main,
  },
  loading: {
    marginTop: theme.spacing(1),
  },
  successMessage: {
    color: theme.palette.success.main,
  },
}));

export default function FindPreviousPositionsForm(): ReactElement {
  const classes = useStyles();

  const {
    error, loading, success, setError, setLoading, setSuccess,
  } = useApi();

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [startDateError, setStartDateError] = React.useState('');
  const [endDateError, setEndDateError] = React.useState('');

  const [apiError, setApiError] = React.useState('');

  const onPopoverClose = () => {
    setAnchorEl(null);

    setLoading(false);
    setSuccess(false);
    setError(false);

    setStartDate(null);
    setEndDate(null);

    setStartDateError('');
    setEndDateError('');

    setApiError('');
  };

  const clearErrors = () => {
    setEndDateError('');
    setStartDateError('');
  };

  const handleStartDateInput = (date: Date | null) => {
    if (startDateError !== '') {
      clearErrors();
    }
    setStartDate(date);
  };

  const handleEndDateInput = (date: Date | null): void => {
    if (endDateError !== '') {
      clearErrors();
    }
    setEndDate(date);
  };

  const handleFormSubmit = async () => {
    if (startDate === null) {
      setStartDateError('This field is required.');
      return;
    }
    if (endDate === null) {
      setEndDateError('This field is required.');
      return;
    }

    if (startDate > endDate) {
      setStartDateError('The date must be before the end date');
      setEndDateError('The date must be after the start date');
      return;
    }

    try {
      setSuccess(false);
      setError(false);
      setLoading(true);
      const body: StockPositionPostBody = {
        startDate,
        endDate,
      };
      await axios.post('/api/stockpositions', body);
      setLoading(false);
      setSuccess(true);
      setError(false);
    } catch (err) {
      const errorAxios = err as AxiosError;
      const statusCode = errorAxios?.response?.status;
      const errorMessage = errorAxios?.response?.data?.errorMessage;
      setLoading(false);
      setError(true);
      setApiError(errorMessage
        ? `${errorMessage} (${statusCode})`
        : statusCode ? `Server side failure (${statusCode})` : 'Server side failure');
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
        onClose={onPopoverClose}
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
                id="previous-position-form-start-date"
                className={classes.dateInputs}
                format="MM/dd/yyyy"
                label="Start Date"
                value={startDate}
                onChange={handleStartDateInput}
                required
                helperText={startDateError}
                error={startDateError !== ''}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                id="previous-position-form-end-date"
                required
                format="MM/dd/yyyy"
                className={classes.dateInputs}
                label="End Date"
                value={endDate}
                onChange={handleEndDateInput}
                invalidLabel={endDateError}
                helperText={endDateError}
                error={endDateError !== ''}
              />
            </Grid>
            <Grid className={classes.loading} item container justifyContent="center" xs={12}>
              {loading && <CircularProgress />}
            </Grid>
            <Grid item xs={12}>
              {error && (
              <FormHelperText
                className={classes.errorMessage}
              >
                {apiError}
              </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              {success && (
              <FormHelperText
                className={classes.successMessage}
              >
                Success
              </FormHelperText>
              )}
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
