import React, { Component } from "react";
import GoogleMapsPage from "./GoogleMapsPage";
import axios from "axios";

/* Leave as a state-less class for now. If multiple components will be on this page, state should
   be with the lowest common parent of all children that use the state. If this ends up not being the lowest
   common parent, change this to a functional component (const Track = () => ) */
class Track extends Component {

state = {
    data: null,
    };
    interval = null;

  componentDidMount() {
    // Call the fetch function after the component has mounted

        axios.get(`http://localhost:3007/users/1`).then(function(response) {
            console.log(response);
        //this.callBackendAPI()
        //    .then(res => this.setState({ data: res.express }))
        //    .catch(err => console.log(err));
        })
    }


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
