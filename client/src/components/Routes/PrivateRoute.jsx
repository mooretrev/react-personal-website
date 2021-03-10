import React from 'react';
import { useHistory, Route } from 'react-router-dom';

/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

const PrivateRoute = ({ component, authenicated, ...args }) => {
  const history = useHistory();
  if (!authenicated) {
    history.push(`/login?next=${history.location.pathname}`);
  }
  return (
    <Route
      component={component}
      {...args}
    />
  );
};

export default PrivateRoute;
