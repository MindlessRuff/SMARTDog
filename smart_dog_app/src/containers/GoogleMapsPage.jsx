import React, { Component } from "react";
import { InfoWindow, Circle, Map, Marker, GoogleApiWrapper} from "google-maps-react";
import axios from "axios";
import geocode from "react-geocode";
import {Switch, Redirect, Route} from 'react-router-dom';


// For the circle coordinates
let addressLat = 0.0;
let addressLng = 0.0;

// TODO: Get rid of this for database dog name
const dogName = 'Kevin'
let port = process.env.PORT || 3000

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
			currentDogAddress: '',
			showInfoWindow: false,
			infoMarker: {},
			addressError: false,
			redirect: false
		}
		
		// TODO: Change this to only get address.
		let userInfo = {
			first: '',
			last: '',
			address: '',
			city: '',
			state: '',
			zipCode: '',
		}
		
		let email = this.props.email;
	
		axios.get(`http://localhost:${port}/users?email=${email}`).then(response => {
			userInfo = response.data[0].userInfo;
			// Using .then to synchronize response, this is only called once
			// when component is constructed to get the lat and lng from address for the circle.
			geocode.fromAddress([userInfo.address] + [userInfo.zipCode]).then(response => {
				console.log([userInfo.address] + ' ' + [userInfo.zipCode]);
				const {lat, lng} = response.results[0].geometry.location;
				addressLat = lat;
				addressLng = lng;
				// TODO: Change this setState to lat and lng from the database file
				// once server is set up. addressLat and lng are only for the circle.
				this.setState({lat: addressLat, lng: addressLng});
			})	
			.catch(error => {
				/**
				 * This will let the program know that the address is not properly configured and
				 * so can not render the map with location properly. I will then use this boolean
				 * in the render function to redirect the user back to the profile page
				 */
				this.setState({addressError: true});
			});
		})
		this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
		this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
	}

	componentDidMount() {
		// Call getData explicitly to render the map correctly
		// on its first mount. Otherwise center will be wrong.
		this.interval = setInterval(this.getData, 8000);
		/**
		 * This will allow the current page to be displayed so that I 
		 * can tell the user what needs to be done before they are 
		 * redirected to the page. 
		 */
		this.id = setTimeout(() => this.setState({ redirect: true }), 2500)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		clearTimeout(this.id);
	}

	// TODO: Set this to make a get request from database.
	getData = () => {
		// 	this.setState({lat: coords.lat, lng: coords.lng});
		// })
		// .catch(error => {
		// 	console.log('getData error', error);
		// });
	}

	// Render an info window for the circle
	onMouseoverMarker (props, marker, event) {
		if (this.state.showInfoWindow === false) {
			if (this.state.lat && this.state.lng) {
				geocode.fromLatLng(this.state.lat, this.state.lng).then(response => {
					let currentDogAddress = response.results[0].formatted_address;
					this.setState({showInfoWindow: true, infoMarker: marker, currentDogAddress: currentDogAddress});
				})
				.catch(error => {
					console.log('Geocode fromLatLng error', error);
				});
			}
		}
	}

	onMouseoutMarker () {
		if (this.state.showInfoWindow === true) {
			this.setState({showInfoWindow: false});
		}
	}
	

	// TODO: Un-hardcode dog marker name and geocode coords into address.
	render() {
		/**
		 * This do the redirecting and display a message to let the user
		 * know what they need to do before it gets redirected
		 */
		if(this.state.addressError === true)
		{
			return(
				this.state.redirect ? <Redirect to="/profile" /> : <div>PLEASE UPDATE ADDRESS</div>
			);
		}

		console.log('Map Render');
		const { lat, lng, showInfoWindow, infoMarker, currentDogAddress } = this.state;

		return (
			<Map
				google={this.props.google}
				zoom={16}
				style={mapStyles}
				center={{ lat: lat, lng: lng }}>
				<Marker 
					position={{ lat: lat, lng: lng }}
					name={'Dog1'}
					onMouseover={this.onMouseoverMarker}
					onMouseout={this.onMouseoutMarker}>
				</Marker>
				<Circle
					center={{lat: addressLat, lng: addressLng}}
					radius={50}
					fillColor='red'>
				</Circle>
				<InfoWindow
					marker={infoMarker}
					visible={showInfoWindow}>
						<h5>{dogName}<br/>{currentDogAddress}</h5>
				</InfoWindow>
			</Map>
		);
	}
}

geocode.setApiKey("AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk");
export default GoogleApiWrapper({
	apiKey: "AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk"
})(GoogleMapsPage);
