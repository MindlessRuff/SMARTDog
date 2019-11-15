import React, { Component } from "react";
import {
  InfoWindow,
  Circle,
  Map,
  Marker,
  GoogleApiWrapper
} from "google-maps-react";
import axios from "axios";
import geocode from "react-geocode";
import { Redirect } from "react-router-dom";
import Button from "../components/Button";
import {Dialog, DialogTitle, DialogActions} from "react-mdl";

// For the circle coordinates
let addressLat = 0.0;
let addressLng = 0.0;

// TODO: Get rid of this for database dog name
const dogName = "Kevin";

const mapStyles = {
  width: "90%",
  height: "90%"
};

export class GoogleMapsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      currentDogAddress: "",
      showInfoWindow: false,
      infoMarker: {},
    };

    // TODO: Change this to only get address.
    this.userInfo = {
      first: "",
      last: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    };

    this.addressError = false;
    this.redirect = false;
    this.email = this.props.email;
    
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
  }

  componentDidMount() {
    // Call getData explicitly to render the map correctly
    // on its first mount. Otherwise center will be wrong.
    this.interval = setInterval(this.getData, 8000);
    axios.get(`/users?email=${this.email}`).then(response => {
      this.userInfo = response.data[0].userInfo;
      // Using .then to synchronize response, this is only called once
      // when component is constructed to get the lat and lng from address for the circle.
      console.log("userInfo: ", this.userInfo);
      geocode
        .fromAddress(this.userInfo.address + " " + this.userInfo.zipCode)
        .then(response => {
          console.log(
            "address and zip",
            this.userInfo.address + " " + this.userInfo.zipCode
          );
          // TODO: Change assignment of lat, lon to read from database coordinatess
          const { lat, lng } = response.results[0].geometry.location;
          addressLat = lat;
          addressLng = lng;
          // TODO: Change this setState to lat and lng from the database file
          // once server is set up. addressLat and lng are only for the circle.
          this.setState({ lat: addressLat, lng: addressLng });
        })
        .catch(error => {
          /**
           * This will let the program know that the address is not properly configured and
           * so can not render the map with location properly. I will then use this boolean
           * in the render function to redirect the user back to the profile page
           */
          this.addressError = true;
          console.log("first catch", this.addressError);
          this.setState({lat: 0});  
        });
    });

    
  }

  handleClick = event => {
    event.preventDefault();
    this.redirect= true;
    this.setState({lat: 0});
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // TODO: Set this to make a get request from database.
  getData = () => {
    // 	this.setState({lat: coords.lat, lng: coords.lng});
    // })
    // .catch(error => {
    // 	console.log('getData error', error);
    // });
  };

  // Render an info window for the circle
  onMouseoverMarker(props, marker, event) {
    if (this.state.showInfoWindow === false) {
      if (this.state.lat && this.state.lng) {
        geocode
          .fromLatLng(this.state.lat, this.state.lng)
          .then(response => {
            let currentDogAddress = response.results[0].formatted_address;
            this.setState({
              showInfoWindow: true,
              infoMarker: marker,
              currentDogAddress: currentDogAddress
            });
          })
          .catch(error => {
            console.log("Geocode fromLatLng error", error);
          });
      }
    }
  }

  onMouseoutMarker() {
    if (this.state.showInfoWindow === true) {
      this.setState({ showInfoWindow: false });
    }
  }

  // TODO: Un-hardcode dog marker name and geocode coords into address.
  render() {
    /**
     * This does the redirecting and display a message to let the user
     * know what they need to do before it gets redirected
     * User will get redirected when hey hit the ok button
     */
    const {
      lat,
      lng,
      showInfoWindow,
      infoMarker,
      currentDogAddress,
    } = this.state;
    console.log('addressError', this.addressError);
    if(this.addressError){
      return this.redirect ? (
        <Redirect to="/profile" />
      ) : (
          <div>
            <Dialog>
              <DialogTitle>Please Update Address ASSHOLE</DialogTitle>
              <DialogActions>
              <Button
              action={this.handleClick}
              type={"btn btn-primary"}
              title={"OK"}
              />
              </DialogActions>
            </Dialog>
          </div>
      );
    }
    

    console.log("Map Render");


    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        center={{ lat: lat, lng: lng }}
      >
        <Marker
          position={{ lat: lat, lng: lng }}
          name={"Dog1"}
          onMouseover={this.onMouseoverMarker}
          onMouseout={this.onMouseoutMarker}
        ></Marker>
        <Circle
          center={{ lat: addressLat, lng: addressLng }}
          radius={50}
          fillColor="red"
        ></Circle>
        <InfoWindow marker={infoMarker} visible={showInfoWindow}>
          <h5>
            {dogName}
            <br />
            {currentDogAddress}
          </h5>
        </InfoWindow>
      </Map>
    );
  }
}

geocode.setApiKey("AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk");
export default GoogleApiWrapper({
  apiKey: "AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk"
})(GoogleMapsPage);
