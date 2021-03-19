import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './containers/Home/Home.jsx';
import RecipesHome from './containers/Recipes/RecipesHome.jsx';
import PowerlifingHome from './containers/Powerlifting/PowerlifingHome.jsx';
import PowerliftingMeetInput from './containers/Powerlifting/PowerliftingMeetInput.jsx';
import RisheilHome from './containers/Risheil/RisheilHome.jsx';
import RecipesNew from './containers/Recipes/RecipesNew.jsx';
import RecipesId from './containers/Recipes/RecipesId.jsx';
import RecipesEdit from './containers/Recipes/RecipesEdit.jsx';
import StockHome from './containers/Stock/StockHome.jsx';
import useStyles from './styles/Index.jsx';
import Theme from './styles/Theme.jsx';
import MealPlanHome from './containers/MealPlan/MealPlanHome.jsx';
import MealPlanNew from './containers/MealPlan/MealPlanNew.jsx';
import MealPlanId from './containers/MealPlan/MealPlanId.jsx';
import MealPlanEdit from './containers/MealPlan/MealPlanEdit.jsx';
import Login from './containers/Auth/Login.jsx';
import Signup from './containers/Auth/Signup.jsx';
import isAuthenicated from './api/auth/isAuthenticated.js';
import PrivateRoute from './components/Routes/PrivateRoute.jsx';

const useAppStyles = () => ({
  login: {
    marginTop: '400px',
  },
});

function App() {
  const appClasses = useAppStyles();
  const [authenicated, setAuthenicated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setAuthenicated(await isAuthenicated());
    };
    checkAuth();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <NavBar authenicated={authenicated} setAuthenicated={setAuthenicated} />
          <CssBaseline />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch component>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Route className={appClasses.login} path="/login" render={(props) => (<Login {...props} setAuthenicated={setAuthenicated} />)} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/stock" authenicated={authenicated} component={StockHome} />
              <PrivateRoute authenicated={authenicated} path="/recipes/new" component={RecipesNew} />
              <PrivateRoute authenicated={authenicated} path="/recipes/:id/edit" component={RecipesEdit} />
              <PrivateRoute authenicated={authenicated} path="/recipes/:id" component={RecipesId} />
              <PrivateRoute authenicated={authenicated} path="/recipes" component={RecipesHome} />
              <Route path="/powerlifting/meet/input" component={PowerliftingMeetInput} />
              <Route path="/powerlifting" component={PowerlifingHome} />
              <PrivateRoute authenicated={authenicated} path="/mealplan/new" component={MealPlanNew} />
              <PrivateRoute authenicated={authenicated} path="/mealplan/:id/edit" component={MealPlanEdit} />
              <PrivateRoute authenicated={authenicated} path="/mealplan/:id" component={MealPlanId} />
              <PrivateRoute authenicated={authenicated} path="/mealplan" component={MealPlanHome} />
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
