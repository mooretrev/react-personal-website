import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import HomeIcon from '@material-ui/icons/Home';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import useStyles from '../../styles/Index.jsx';
import LoginButton from '../LoginButton.jsx';
import LogoutButton from '../LogoutButton.jsx';

function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = useState('Home');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderSwitch = (index) => {
    switch (index) {
      case 0:
        return <HomeIcon />;
      case 1:
        return <FastfoodIcon />;
      case 2:
        return <FitnessCenterIcon />;
      default:
    }
    return <div />;
  };

  const createLocation = (text) => {
    const location = text.toLowerCase();
    if (location === 'home') {
      return '/';
    }
    return (`/${text.toLowerCase()}`);
  };

  const handleNavClick = (text) => {
    setTitle(text);
  };

  const authenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  };

  const drawer = (
    <div>
      <div className={classes.drawerTitle}>
        <Typography variant="h5">Trevor Moore</Typography>
      </div>
      <div>
        <Divider />
        <List>
          {['Home', 'Recipes', 'Powerlifting'].map((text, index) => (
            <Link className={classes.link} to={createLocation(text)} key={text}>
              <ListItem button onClick={() => handleNavClick(text)}>
                <ListItemIcon>{renderSwitch(index)}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <Link className={classes.link} to="/risheil" key="rishiel">
            <ListItem button>
              <ListItemIcon><FavoriteIcon /></ListItemIcon>
              <ListItemText primary="Risheil" />
            </ListItem>
          </Link>
        </List>

      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6" noWrap>
                {title}
              </Typography>
            </Grid>
            <Grid item container xs={4} justify="flex-end">
              {authenticationButton()}
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default NavBar;
