import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../../styles/Index.jsx';

export default function MealPlanCard(props) {
  const classes = useStyles();
  const { mealPlanObj } = props;
  const date = new Date(mealPlanObj.date);
  const strDate = date.toISOString().substring(0, 10);

  return (
    <Card>
      <Link to={`/mealplan/${mealPlanObj._id}`} className={classes.link}>
        <CardActionArea>
          <Typography variant="h2">{strDate}</Typography>
          <Typography variant="h5">
            Start Day:
            {mealPlanObj.startDay}
          </Typography>
          <Typography variant="h5">
            Number of Days:
            {mealPlanObj.numDaysPlanned}
          </Typography>

        </CardActionArea>
      </Link>
    </Card>
  );
}

MealPlanCard.propTypes = {
  mealPlanObj: PropTypes.shape({
    _id: PropTypes.string,
    date: PropTypes.string,
    startDay: PropTypes.string,
    numDaysPlanned: PropTypes.number,
  }).isRequired,
};
