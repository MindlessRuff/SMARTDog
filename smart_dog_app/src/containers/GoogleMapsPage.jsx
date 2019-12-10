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
import { Dialog, DialogTitle, DialogActions } from "react-mdl";
import Button from "../components/Button";
import Select from "../components/Select";

const mapStyles = {
  width: "100%",
  height: "100%"
};

const radiusOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export class GoogleMapsPage extends Component {
  constructor(props) {
    super(props);
    // Create a reference that can be used by DOM elements,
    // used here to set focus when user clicks the home circle on the map
    // This allows clicking anywhere on the screen to close the dropdown when it opens
    // after clicking the circle.
    this.dropdownRef = React.createRef();

    this.id = 0; // For axios, filled in by componentDidMount
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
      radius: 0,
      dropdownSize: 1
    };

    // TODO: Change this to only get address.
    this.userInfo = {
      first: "",
      last: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: ""
    };

    this.dogName = "";

    this.addressError = false;
    this.redirect = false;
    this.email = this.props.email;

    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
    this.onMouseoverCircle = this.onMouseoverCircle.bind(this);
    this.onMouseoutCircle = this.onMouseoutCircle.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.onCircleClick = this.onCircleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/users?email=${this.email}`).then(response => {
      this.id = response.data[0].id; // Save user id for future axios requests.
      this.userInfo = response.data[0].userInfo;
      this.dogName = response.data[0].dogInfo.dogName;
      this.setState({
        lat: response.data[0].coords.lat,
        lng: response.data[0].coords.lng,
        radius: response.data[0].mapRadius
      });
      // Using .then to synchronize response, this is only called once
      // when component is constructed to get the lat and lng from address for the circle.
      geocode
        .fromAddress(this.userInfo.address + " " + this.userInfo.zipCode)
        .then(response => {
          // Get the lat and long of the user profile's address.
          // Store it in the DB as well for the tracking script to detect the dog escaping.
          const { lat, lng } = response.results[0].geometry.location;
          this.setState({ addressLat: lat, addressLng: lng });
          axios
            .patch(`/api/users/${this.id}`, {
              addressCoords: {
                addressLat: lat,
                addressLng: lng
              }
            })
            .catch(error => {
              console.log("Error updating DB with address coords", error);
            });
        })
        .catch(error => {
          /**
           * This will let the program know that the address is not properly configured and
           * so can not render the map with location properly. I will then use this boolean
           * in the render function to redirect the user back to the profile page
           */
          console.log("Invalid Address", error);
          this.addressError = true;
          // Force re-render
          this.setState({ lat: 0 });
        });
    });

    this.interval = setInterval(this.getData, 8000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Updates marker's coordinates from database on an 8 second interval.
  getData = () => {
    axios
      .get(`/api/users/${this.id}`)
      .then(response => {
        this.setState({
          lat: response.data.coords.lat,
          lng: response.data.coords.lng
        });
      })
      .catch(error => {
        console.log("Error updating coords from DB", error);
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
      } else {
        this.setState({
          showMarkerInfo: true,
          infoMarker: marker,
          dogAddress: "Africa"
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
        this.setState({ showCircleInfo: true, infoCircle: marker });
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
    this.redirect = true;
    this.setState({ lat: 0 });
  };

  // When user changes radius, save to DB and re-render.
  handleRadiusChange(event) {
    // If check in case user selects the placeholder string.
    if (event.target.value) {
      let radius = Number(event.target.value);
      this.setState({ radius: radius, dropdownSize: 1 });
      axios.patch(`/api/users/${this.id}`, {
        mapRadius: radius
      });
    } else {
      this.setState({ dropdownSize: 1 });
    }
  }

  // Blur is when a DOM element is un-focused. Used for the dropdown
  // to close it when the user clicks off after opening with a circle click.
  handleBlur() {
    this.setState({ dropdownSize: 1 });
  }

  // Open the dropdown if user clicks on the circle to change radius.
  onCircleClick() {
    this.setState({ dropdownSize: radiusOptions.length + 1 });
    this.dropdownRef.current.focus();
  }

  // When user changes radius, save to DB and re-render.
  handleRadiusChange(event) {
    // If check in case user selects the placeholder string.
    if (event.target.value) {
      let radius = Number(event.target.value);
      this.setState({ radius: radius, dropdownSize: 1 });
      axios.patch(`/api/users/${this.id}`, {
        mapRadius: radius
      });
    } else {
      this.setState({ dropdownSize: 1 });
    }
  }

  // Blur is when a DOM element is un-focused. Used for the dropdown
  // to close it when the user clicks off after opening with a circle click.
  handleBlur() {
    this.setState({ dropdownSize: 1 });
  }

  // Open the dropdown if user clicks on the circle to change radius.
  onCircleClick() {
    this.setState({ dropdownSize: radiusOptions.length + 1 });
    this.dropdownRef.current.focus();
  }

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
      radius
    } = this.state;

    if (this.addressError) {
      console.log("AddressError");
      return this.redirect ? (
        <Redirect to="/profile" />
      ) : (
        <Dialog>
          <DialogTitle>Please Update Address</DialogTitle>
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

    if (lat === 0) return <div>Loading...</div>;
    console.log(radius);
    // Pass Checks -> Render map.
    return (
      <div className="row">
        <div>
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
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              }}
              position={{ lat: addressLat, lng: addressLng }}
              name={"Home"}
              onMouseover={this.onMouseoverCircle}
              onMouseout={this.onMouseoutCircle}
            ></Marker>
            <Circle
              onClick={this.onCircleClick}
              center={{ lat: addressLat, lng: addressLng }}
              radius={radius}
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
                {"Home Address"}
                <br />
                <br />
                {`${this.userInfo.address}, ${this.userInfo.zipCode}`}
              </h5>
            </InfoWindow>
          </Map>
        </div>
        <div className="col-md-3" style={{ margin: "50px 0 0 0" }}>
          <Select
            ref={this.dropdownRef}
            style={{ backgroundColor: "grey", color: "ghostwhite" }}
            name={"radius"}
            options={radiusOptions}
            value={this.state.radius}
            placeholder={"Select Geo-Fence Radius (Meters)"}
            handleChange={this.handleRadiusChange}
            size={this.state.dropdownSize}
            handleBlur={this.handleBlur}
          ></Select>
        </div>
      </div>
    );
  }
}

geocode.setApiKey("AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk");
export default GoogleApiWrapper({
  apiKey: "AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk"
})(GoogleMapsPage);
