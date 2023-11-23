import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { getAuthToken } from './AuthService';
import Cookies from "js-cookie";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({auth, component: Component, ...rest }) => {
  // Check if the user is authenticated
  // const isAuthenticated = !!getAuthToken();

  return (
    <Route
      {...rest}
      render={() =>
        auth ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
