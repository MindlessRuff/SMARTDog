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


  /*
   * Checks the database to see if user exists. If they do not then it creates an entry
   * with the users email. This can only be done if there is a user that is already logged
   * in. If the user is not logged in there is no user that exists and so this can 
   * not be checked. Put it in privateroute because both profile and track need to get
   * data from the data base.
  */
 //Creates a new data entry into the database if it doesn't exist
 axios.get(`http://localhost:${process.env.REACT_APP_PORT}/users?email=${user.email}`).then(response => {
    console.log('get', response);
    if (!(Array.isArray(response.data) && response.data.length)) {
      axios.post(`http://localhost:${process.env.REACT_APP_PORT}/users`,{email: user.email, userInfo: userInfo}).then(response => {
        console.log('post', response);
      })
    }
 })
 .catch(error => {
   console.log('error on get', error)
 
});

  const render = (props) => 
    isAuthenticated === true ? <Component {...props} email={user.email}/>
    : loginWithRedirect();

  return <Route path={path} render={render}/>;
};

export default PrivateRoute;