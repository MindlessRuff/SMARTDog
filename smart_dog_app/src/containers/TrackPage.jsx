import React, { Component } from "react";
import GoogleMapsPage from "./GoogleMapsPage";

/* Leave as a state-less class for now. If multiple components will be on this page, state should
   be with the lowest common parent of all children that use the state. If this ends up not being the lowest
   common parent, change this to a functional component (const Track = () => ) */
class Track extends Component {
  render() {
    return (
      <div>
        <h1>Tracking Page</h1>
        <GoogleMapsPage />
      </div>
    );
  }
}

export default Track;
