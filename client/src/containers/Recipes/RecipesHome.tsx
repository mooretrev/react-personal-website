import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button, Grid, makeStyles, Theme, createStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import useUniversialStyles from '../../styles/Index.jsx';
import GetRecipes from '../../api/Recipes/GetRecipes.js';
import GetRecipeNames from '../../api/Recipes/GetRecipeNames.js';
import { RecipeInterface } from '../../../../api/src/model/recipe';

const useStyles = makeStyles((theme: Theme) => createStyles({
  datagrid: {
    height: '60vh',
    margin: theme.spacing(1),
  },
}));

export default function RecipesHome(): React.ReactElement {
  const history = useHistory();
  const classes = useStyles();
  const universalClasses = useUniversialStyles();
  const [recipes, setRecipes] = useState<RecipeInterface[]>([]);
  const [recipeNames, setRecipeNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const _recipes = await GetRecipes();
      const recipeNamesCopy = await GetRecipeNames();
      setRecipes(_recipes);
      setRecipeNames(recipeNamesCopy);
    };

    fetchData();
  }, []);

  const handleRecipeSearch = (
    event: React.ChangeEvent<Record<string, unknown>>, newRecipe: string,
  ) => {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].recipe_name === newRecipe) {
        history.push(`/recipes/${recipes[i]._id}`);
      }
    }
  };

  const searchBar = (
    <Grid item xs={12}>
      <Card>
        <Autocomplete
          className={universalClasses.searchBar}
          options={recipeNames}
          onInputChange={handleRecipeSearch}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          renderInput={(params) => <TextField {...params} label="Search Recipes" variant="outlined" />}
        />
      </Card>
    </Grid>
  );

  const createButtons = (
    <Grid item xs={12}>
      <Grid container>
        <Link style={{ marginRight: '3px' }} to="/recipes/new" className={universalClasses.link}>
          <Button variant="contained" color="primary">Create New Recipe</Button>
        </Link>
        <Link style={{ marginLeft: '3px' }} to="/mealplan/new" className={universalClasses.link}>
          <Button variant="contained" color="primary">Create Meal Plan</Button>
        </Link>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Grid container spacing={2}>
        {searchBar}
        {createButtons}
        <DataGrid
          getRowId={(row) => row._id}
          className={classes.datagrid}
          onCellClick={(value) => history.push(`/recipes/${value.id}`)}
          columns={[{ field: 'recipe_name', headerName: 'Recipe', flex: 1 }]}
          rows={recipes}
        />
      </Grid>
    </div>
  );
}
