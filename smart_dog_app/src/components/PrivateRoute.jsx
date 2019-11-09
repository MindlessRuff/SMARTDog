import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../auth0-wrapper";
import axios from "axios";


const PrivateRoute = ({ component: Component, path }) => {
  const { loading, user, isAuthenticated, loginWithRedirect } = useAuth0();

  let userInfo = {
    first: '',
    last: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  axios.get(`http://localhost:${process.env.REACT_APP_PORT}/users?email=${user.email}`)
  .catch(error => {
      axios.post(`http://localhost:${process.env.REACT_APP_PORT}/users`,{email: user.email, userInfo: userInfo});
      axios.get(`http://localhost:${process.env.REACT_APP_PORT}/users?email=${user.email}`)
      .catch(error => {
          console.log(error);
      });
  });

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