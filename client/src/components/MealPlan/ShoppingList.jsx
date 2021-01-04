import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import useStyles from '../../styles/Index.jsx';

export default function ShoppingList(props) {
  const classes = useStyles();
  const { ingredients } = props;

  const renderRecipes = () => {
    const items = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      items.push(
        <Grid item xs={12} key={i}>
          <FormControlLabel
            control={<Checkbox />}
            label={ingredients[i]}
          />
        </Grid>,
      );
    }
    return items;
  };

  const render = () => {
    if (ingredients !== undefined && ingredients.length > 0) {
      return (
        <Grid item xs={12}>
          <Card className={classes.cardPadding}>
            <Typography variant="h2">
              Shopping List
            </Typography>
            <FormControl component="fieldset">

              {renderRecipes()}
            </FormControl>

          </Card>
        </Grid>
      );
    }
    return <div />;
  };

  return render();
}

ShoppingList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
