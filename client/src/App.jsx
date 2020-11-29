import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './containers/Home/Home.jsx';
import RecipesHome from './containers/Recipes/RecipesHome.jsx';
import PowerlifingHome from './containers/Powerlifting/PowerlifingHome.jsx';
import RisheilHome from './containers/Risheil/RisheilHome.jsx';
import RecipesNew from './containers/Recipes/RecipesNew.jsx';
import RecipesId from './containers/Recipes/RecipesId.jsx';
import RecipesEdit from './containers/Recipes/RecipesEdit.jsx';
import useStyles from './styles/Index.jsx';
import Theme from './styles/Theme.jsx';
import Loading from './components/Loading.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

/* eslint no-unused-vars: ['error', { varsIgnorePattern: '[props]' }] */

function App() {
  const classes = useStyles();

  const { isLoading, error } = useAuth0();

  if (error) {
    return (
      <div>
        Oops...
        {error.message}
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <NavBar />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch component>
              <PrivateRoute path="/recipes/new" component={RecipesNew} />
              <PrivateRoute path="/recipes/:id/edit" component={RecipesEdit} />
              <PrivateRoute path="/recipes/:id" component={RecipesId} />
              <PrivateRoute path="/recipes" component={RecipesHome} />
              <Route path="/powerlifting" component={PowerlifingHome} />
              <Route path="/risheil" component={RisheilHome} />
              <Route path="/" component={Home} />
            </Switch>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
