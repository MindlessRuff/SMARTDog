import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "90%",
  height: "90%"
};

class GoogleMapsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 32.7157, lng: -117.1611 }}
      >
        <Marker position={{ lat: 32.7757, lng: -117.0719 }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk"
})(GoogleMapsPage);
