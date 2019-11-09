import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../auth0-wrapper";

const PrivateRoute = ({ component: Component, path }) => {
  const { loading, user, isAuthenticated, loginWithRedirect } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  //   /*Using async will cause the login screen to continuously 
  //     show up when hitting the backspace in the browser until
  //     the user logs in. */
  //   /*const fn = async () => {
  //     await loginWithRedirect({
  //       appState: { targetUrl: path }
  //     });
  //   };
  //   fn();*/

  const render = (props) =>
    isAuthenticated === true ? <Component {...props} email={user.email}/>
    : loginWithRedirect();
  return <Route path={path} render={render}/>;
};

export default PrivateRoute;