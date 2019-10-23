import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../auth0-wrapper";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    /*Using async will cause the login screen to continuously 
      show up when hitting the backspace in the browser until
      the user logs in. */
    /*const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();*/
    else
      loginWithRedirect();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props => isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;