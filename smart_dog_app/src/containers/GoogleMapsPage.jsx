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


const mapStyles = {
  width: "90%",
  height: "90%"
};

export class GoogleMapsPage extends Component {
  constructor(props) {
    super(props);

    this.id = 0;    // For axios, filled in by componentDidMount

    this.state = {
      lat: 0.0,
      lng: 0.0,
      addressLat: 0.0,
      addressLng: 0.0,
      dogAddress: "",
      showMarkerInfo: false,
      showCircleInfo: false, 
      infoMarker: {},
      infoCircle: {},
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

    this.dogName = '';

    this.addressError = false;
    this.redirect = false;
    this.email = this.props.email;

    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
    this.onMouseoverCircle = this.onMouseoverCircle.bind(this);
    this.onMouseoutCircle = this.onMouseoutCircle.bind(this);
  }

  componentDidMount() {
    axios.get(`/users?email=${this.email}`).then(response => {
      this.id = response.data[0].id;              // Save user id for future axios requests.
      this.userInfo = response.data[0].userInfo;
      this.dogName = response.data[0].dogInfo.dogName;  
      this.setState({lat: response.data[0].coords.lat, lng: response.data[0].coords.lng });
      // Using .then to synchronize response, this is only called once
      // when component is constructed to get the lat and lng from address for the circle.
      geocode
        .fromAddress(this.userInfo.address + " " + this.userInfo.zipCode)
        .then(response => {
          // Get the lat and long of the user profile's address.
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({addressLat: lat, addressLng: lng});

        })
        .catch(error => {
          /**
           * This will let the program know that the address is not properly configured and
           * so can not render the map with location properly. I will then use this boolean
           * in the render function to redirect the user back to the profile page
           */
          console.log('Invalid Address', error);
          this.addressError = true;
          this.setState({lat: 0});  
        });
    });

    this.interval = setInterval(this.getData, 8000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Updates marker's coordinates from database on an 8 second interval.
  getData = () => {
    axios.get(`/users/${this.id}`).then(response => {
      this.setState({lat: response.data.coords.lat, lng: response.data.coords.lng});
    })
    .catch(error => {
      console.log('Error updating coords from DB', error);
    });
  };

  // Render an info window for the dog marker
  onMouseoverMarker(props, marker, event) {
    if (this.state.showMarkerInfo === false) {
      if (this.state.lat && this.state.lng) {
        geocode
          .fromLatLng(this.state.lat, this.state.lng)
          .then(response => {
            let dogAddress = response.results[0].formatted_address;
            this.setState({
              showMarkerInfo: true,
              infoMarker: marker,
              dogAddress: dogAddress
            });
          })
          .catch(error => {
            console.log("Geocode from - Lat, Lng error", error);
          });
      }
    }
  }

  onMouseoutMarker() {
    if (this.state.showMarkerInfo === true) {
      this.setState({ showMarkerInfo: false });
    }
  }

  // Render an info window for the dog marker
  onMouseoverCircle(props, marker, event) {
    if (this.state.showCircleInfo === false) {
      if (this.state.addressLat && this.state.addressLng) {
        this.setState({showCircleInfo: true, infoCircle: marker});
      }
    }
  }

  onMouseoutCircle() {
    if (this.state.showCircleInfo === true) {
      this.setState({ showCircleInfo: false });
    }
  }

  handleErrorClick = event => {
    event.preventDefault();
    this.redirect= true;
    this.setState({lat: 0});
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
      addressLat,
      addressLng,
      showMarkerInfo,
      showCircleInfo,
      infoMarker,
      infoCircle,
      dogAddress,
    } = this.state;

    if (lat == 0) return <div>Loading...</div>; 
 
    if (this.addressError) {
      console.log('AddressError');
      return this.redirect ? (
        <Redirect to="/profile" />
      ) : ( 
          <Dialog>
            <DialogTitle>Please Update Address ASSHOLE</DialogTitle>
            <DialogActions>
            <Button
            action={this.handleErrorClick}
            type={"btn btn-primary"}
            title={"OK"}
            />
            </DialogActions>
          </Dialog>
      );
    }

    // Pass Checks -> Render map.
    console.log('Map Render', infoCircle);
    console.log('marker', infoMarker)
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: lng }}
      >
        {/* Dog Marker */}
        <Marker
          position={{ lat: lat, lng: lng }}
          name={"Dog1"}
          onMouseover={this.onMouseoverMarker}
          onMouseout={this.onMouseoutMarker}
        ></Marker>

        {/* Home Marker */}
        <Marker
        icon = {{url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"  }}
          position={{lat: addressLat, lng: addressLng}}
          name={'Home'}
          onMouseover={this.onMouseoverCircle}
          onMouseout={this.onMouseoutCircle}
        ></Marker>
        <Circle
          center={{ lat: addressLat, lng: addressLng }}
          radius={50}
          fillColor="green"
        ></Circle>
        <InfoWindow marker={infoMarker} visible={showMarkerInfo}>
          <h5>
            {this.dogName}
            <br />
            <br />
            {dogAddress}
          </h5>
        </InfoWindow>
        <InfoWindow marker={infoCircle} visible={showCircleInfo}>
          <h5>
            {'Home Address'}
            <br />
            <br />
            {this.userInfo.address}
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
