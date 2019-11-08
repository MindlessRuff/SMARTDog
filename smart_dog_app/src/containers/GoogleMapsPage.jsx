import React, { Component } from "react";
import { InfoWindow, Circle, Map, Marker, GoogleApiWrapper} from "google-maps-react";
import axios from "axios";
import geocode from "react-geocode";

// For the circle coordinates
let addressLat = 0.0;
let addressLng = 0.0;
// TODO: Get rid of this for database dog name
const dogName = 'Kevin'

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
			showInfoWindow: false,
			infoMarker: {}
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
	
		axios.get(`http://localhost:3006/users?email=${email}`).then(response => {
			userInfo = response.data[0].userInfo;
			// Using .then to synchronize response, this is only called once
			// when component is constructed to get the lat and lng from address for the circle.
			geocode.fromAddress([userInfo.address]).then(response => {
				const {lat, lng} = response.results[0].geometry.location;
				addressLat = lat;
				addressLng = lng;
				// TODO: Change this setState to lat and lng from the database file
				// once server is set up. addressLat and lng are only for the circle.
				this.setState({lat: addressLat, lng: addressLng})
			})	
		})
		this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
		this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
	}

	componentDidMount() {
		this.interval = setInterval(this.getData, 8000);
		// Call getData explicitly to render the map correctly
		// on its first mount. Otherwise center will be wrong.
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
	}

	// Render an info window for the circle
	onMouseoverMarker (props, marker, event) {
		if (this.state.showInfoWindow === false) {
			this.setState({showInfoWindow: true, infoMarker: marker});
		}
	}

	onMouseoutMarker () {
		if (this.state.showInfoWindow === true) {
			this.setState({showInfoWindow: false});
		}
	}
	

	// TODO: Un-hardcode dog marker name and geocode coords into address.
	render() {
		console.log('Map Render');
		const {lat, lng, showInfoWindow, infoMarker} = this.state;
		return (
			<Map
				google={this.props.google}
				zoom={16}
				style={mapStyles}
				center={{ lat: lat, lng: lng }}>
				<Marker 
					position={{ lat: this.state.lat, lng: this.state.lng  }}
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
					<h4>{dogName}</h4>
				</InfoWindow>
			</Map>
		);
	}
}


geocode.setApiKey("AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk");
export default GoogleApiWrapper({
	apiKey: "AIzaSyCq5ETSwUuhklrRh3hbvXo5auyCt3C4WKk"
})(GoogleMapsPage);
