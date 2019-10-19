// This script is meant to be run by the npm startup script in package.json
// Import ttn npm package
let ttn = require("ttn")
// Get TTN_APPID and TTN_ACCESSKEY from .env file located in project root for extra security.
// Found under https://console.thethingsnetwork.org/applications/<your-application>
// Can hardcode these values here for testing if no env file is used.
let appID = process.env.REACT_APP_TTN_APPID
let accessKey = process.env.REACT_APP_TTN_ACCESSKEY

console.log("LoRa Packet Tracking Script Initiated...")
// Pass appID and accessKey to the ttn API
ttn.data(appID, accessKey)
  .then(function (client) {
    // When an uplink packet is received by the gateway
    client.on("uplink", function (devID, payload) {
        // Print out the Device ID and the contents of the payload
      console.log("Received uplink from ", devID)
      console.log(payload)
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })