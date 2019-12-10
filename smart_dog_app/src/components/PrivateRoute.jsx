import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../auth0-wrapper";
import axios from "axios";

const PrivateRoute = ({ component: Component, path }) => {
  const { loading, user, isAuthenticated, loginWithRedirect } = useAuth0();

  let userInfo = {
    first: "",
    last: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  };
  let dogInfo = {
    dogName: "",
    dogBreed: "",
    dogEscaped: false
  };
  let device = "transmitter";
  let coords = {
    lat: 32.7757877,
    lng: -117.0719025
  };
  let addressCoords = {
    addressLat: 0,
    addressLng: 0
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  /*
   * Checks the database to see if user exists. If they do not then it creates an entry
   * with the users email. This can only be done if there is a user that is already logged
   * in. If the user is not logged in there is no user that exists and so this can
   * not be checked. Put it in privateroute because both profile and track need to get
   * data from the data base.
   */

  //Creates a new data entry into the database if it doesn't exist
  if (user) {
    axios
      .get(`/api/users?email=${user.email}`)
      .then(response => {
        if (!(Array.isArray(response.data) && response.data.length)) {
          axios
            .post(`/api/users`, {
              email: user.email,
              device: device,
              userInfo: userInfo,
              dogInfo: dogInfo,
              coords: coords,
              addressCoords: addressCoords,
              mapRadius: 0
            })
            .then(response => {
              console.log("post", response);
            });
        }
      })
      .catch(error => {
        console.log("error on get", error);
        axios
          .post(`/api/users`, {
            email: user.email,
            device: device,
            userInfo: userInfo,
            dogInfo: dogInfo,
            coords: coords,
            addressCoords: addressCoords,
            mapRadius: 0
          })
          .then(response => {
            console.log("post", response);
          });
      });
  }

  const render = props =>
    isAuthenticated === true ? (
      <Component {...props} email={user.email} />
    ) : (
      loginWithRedirect()
    );

  return <Route path={path} render={render} />;
};

export default PrivateRoute;
