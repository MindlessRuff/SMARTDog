/* 
This script is meant to be run by the npm startup script in package.json. It's purpose is to monitor a LoRa gateway
connected to The Things Network for packets received. Those packets will then be posted to a json-server API 
utilizing express. In the future, there should be the capability to get the user name from the packet in order 
to seperate the data accordingly, but for now, a single use case will suffice for prototyping purposes.
*/

// Import ttn package
const ttn = require("ttn");
const axios = require("axios");
// Get TTN_APPID and TTN_ACCESSKEY from .env file located in project root for extra security.
// Found under https://console.thethingsnetwork.org/applications/<your-application>
// Can hardcode these values here for testing if no env file is used.
const appID = process.env.REACT_APP_TTN_APPID;
const accessKey = process.env.REACT_APP_TTN_ACCESSKEY;
let lat = 0;
let lng = 0;
let myData = [];
let user;
let email;
let userId;
let deviceId;

// Set up server variables

console.log("LoRa Packet Tracking Script Initiated...");
// Pass appID and accessKey to the ttn API
ttn
  .data(appID, accessKey)
  .then(function(client) {
    // When an uplink packet is received by the gateway
    client.on("uplink", function(deviceId, payload) {
      // Print out the Device ID and the contents of the payload
      console.log("Received uplink from ", deviceId);
      axios
        .get(`http://localhost:3000/users/?device=${deviceId}`)
        .then(response => {
          user = response.data[0];
          email = user.email;
          userId = user.id;
          console.log(user);
          myData = payload.payload_fields;
          console.log(myData);

          // axios
          //   .patch(`http://localhost:3000/users/${userId}`, {
          //     coords: { lat: lat, lng: lng }
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        })
        .catch(error => {
          console.log(error);
        });
    });
  })
  .catch(function(error) {
    console.error("Error", error);
    process.exit(1);
  });
