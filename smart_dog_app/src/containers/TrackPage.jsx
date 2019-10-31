import React, { Component } from "react";
import GoogleMapsPage from "./GoogleMapsPage";
import axios from "axios";
import { useAuth0 } from "../auth0-wrapper";

/* Leave as a state-less class for now. If multiple components will be on this page, state should
   be with the lowest common parent of all children that use the state. If this ends up not being the lowest
   common parent, change this to a functional component (const Track = () => ) */
const Track = () => {
  const { loading, user } = useAuth0();

  // Wait until auth0 fetches the user data before continuing. I think
  // this acts as a kind of busy while loop until user data is ready.
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tracking Page</h1>
      <GoogleMapsPage email={user.email} />
    </div>
  );
};

export default Track;
