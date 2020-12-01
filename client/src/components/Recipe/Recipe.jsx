import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useStyles from '../../styles/Index.jsx';

function Recipe(props) {
  const classes = useStyles();
  const { recipeData } = props;
  return (
    <Card>
      <Link to={`/recipes/${recipeData._id}`} className={classes.link}>
        <CardActionArea>
          <Typography variant="h2">{recipeData.recipe_name}</Typography>
        </CardActionArea>
      </Link>
    </Card>
  );
}

Recipe.propTypes = {
  recipeData: PropTypes.shape({
    _id: PropTypes.string,
    recipe_items: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        ingredient: PropTypes.string,
        size: PropTypes.string,
        unit: PropTypes.string,
      })),
      recipe_item: PropTypes.string,
    })),
    recipe_name: PropTypes.string,
  }).isRequired,
};

export default Recipe;
