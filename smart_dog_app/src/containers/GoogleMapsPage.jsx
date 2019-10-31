import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";

const mapStyles = {
	width: "90%",
	height: "90%"
};

class GoogleMapsPage extends Component {
	state = {
		lat: 32.77697,
	 	lng: -117.072198
	}


	// id and userInfo are only updated once, for the put requests
	// on the interval to avoid wiping user data when updating coords.
	id;
	userInfo = {
		first: '',
		last: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
	}

	testCoordIndex = 0;
	testCoords = [
		{
			lat: 32.776973,
			lng: -117.072589
		},
		{
			lat: 32.776742,
			lng: -117.072631
		},
		{
			lat: 32.776742,
			lng: -117.072237
		},
		{
			lat: 32.776891,
			lng: -117.072122
		},
		{
			lat: 32.77697,
			lng: -117.072198
		},
	];
	interval = 0;

	componentDidMount() {
		let email = this.props.email;
		axios.get(`http://localhost:3006/users?email=${email}`).then(response => {
			this.id = response.data[0].id;
			this.userInfo = response.data[0].userInfo;
		})	
		this.setState({  lat: 32.77697, lng: -117.072198 });
		this.interval = setInterval(this.getData, 8000);
		this.getData();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getData = () => {
		let coords = this.testCoords[this.testCoordIndex];
		axios.put(`http://localhost:3006/users/${this.id}`, {email: this.props.email, userInfo: this.userInfo, coords: coords}).then(response => {
			this.setState({lat: coords.lat, lng: coords.lng});
		})
		.catch(error => {
			console.log(error);
		});
		this.testCoordIndex++;
		if (this.testCoordIndex === 5) this.testCoordIndex = 0;
	}

	render() {
		const {lat, lng} = this.state;
		console.log('Current latitude, longitude', lat, lng);
		return (
			<Map
				google={this.props.google}
				zoom={15}
				style={mapStyles}
				initialCenter={{ lat: 32.77697, lng: -117.072198 }}
			>
			<Marker position={{ lat: lat, lng: lng  }} />
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk"
})(GoogleMapsPage);
