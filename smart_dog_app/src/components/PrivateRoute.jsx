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

  //   /*Using async will cause the login screen to continuously 
  //     show up when hitting the backspace in the browser until
  //     the user logs in. */
  //   /*const fn = async () => {
  //     await loginWithRedirect({
  //       appState: { targetUrl: path }
  //     });
  //   };
  //   fn();*/


  /*
   * Checks the database to see if user exists. If they do not then it creates an entry
   * with the users email. This can only be done if there is a user that is already logged
   * in. If the user is not logged in there is no user that exists and so this can 
   * not be checked. Put it in privateroute because both profile and track need to get
   * data from the data base.
  */
  if(isAuthenticated){
      axios.get(`http://localhost:${process.env.REACT_APP_PORT}/users?email=${user.email}`)
    .catch(error => {
      axios.post(`http://localhost:${process.env.REACT_APP_PORT}/users`,{email: user.email, userInfo: userInfo});
    });
  }

  const render = (props) => 
    isAuthenticated === true ? <Component {...props} email={user.email}/>
    : loginWithRedirect();

  return <Route path={path} render={render}/>;
};

export default PrivateRoute;