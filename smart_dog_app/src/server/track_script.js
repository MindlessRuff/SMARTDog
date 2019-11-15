/* 
This script is meant to be run by the npm startup script in package.json. It's purpose is to monitor a LoRa gateway
connected to The Things Network for packets received. Those packets will then be posted to a json-server API 
utilizing express. In the future, there should be the capability to get the user name from the packet in order 
to seperate the data accordingly, but for now, a single use case will suffice for prototyping purposes.
*/

// Import The Things Network API package
const ttn = require("ttn");
const axios = require("axios");
// Get TTN_APPID and TTN_ACCESSKEY from .env file located in project root for extra security.
// Found under https://console.thethingsnetwork.org/applications/<your-application>
// Can hardcode these values here for testing if no env file is used.
const appID = process.env.REACT_APP_TTN_APPID;
const accessKey = process.env.REACT_APP_TTN_ACCESSKEY;
// Received coordinates.
let receivedLat = 0;
let receivedLng = 0;

console.log("LoRa Packet Tracking Script Initiated...");
// Pass appID and accessKey to the ttn API.
ttn
  .data(appID, accessKey)
  .then(function(client) {
    // When an uplink packet is received by the gateway, get the deviceId and the payload.
    client.on("uplink", function(deviceId, payload) {
      // Print out the Device ID and the contents of the payload
      console.log("Received uplink from ", deviceId);
      // Read the payload fields decoded on the TTN console.
      receivedLat = payload.payload_fields.lat;
      receivedLng = payload.payload_fields.lng;
      // Get the current userId based on the deviceId of the received payload.
      axios
        .get(`http://localhost:3000/users/?device=${deviceId}`)
        .then(response => {
          axios
            // Update the user database with the newly received coordinates.
            .patch(`http://localhost:3000/users/${user.id}`, {
              coords: {
                lat: receivedLat,
                lng: receivedLng
              }
            })
            .catch(error => {
              console.log("Error updating user database", error);
            });
        })
        .catch(error => {
          console.log("Error getting user id", error);
        });
    });
  })
  .catch(function(error) {
    console.error("Error in LoRa uplink function", error);
    process.exit(1);
  });
