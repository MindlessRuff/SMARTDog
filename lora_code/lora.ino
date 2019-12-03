#include <lmic.h>
#include <hal/hal.h>

#include <Wire.h> //Needed for I2C to GPS

#include "SparkFun_Ublox_Arduino_Library.h" //http://librarymanager/All#SparkFun_Ublox_GPS

SFE_UBLOX_GPS myGPS;

long lastTime = 0; //Simple local timer. Limits amount if I2C traffic to Ublox module.
long latitude = 0;
long longitude = 0;
static uint8_t myData[8];

static osjob_t sendjob;

// LoRaWAN NwkSKey, network session key
static const PROGMEM u1_t NWKSKEY[16] = {0x98, 0xCF, 0xFC, 0xFD, 0xC3, 0xD4, 0x60, 0x1F, 0x70, 0x31, 0x9C, 0x2E, 0x0E, 0xA4, 0x6A, 0xF8};

// LoRaWAN AppSKey, application session key
static const u1_t PROGMEM APPSKEY[16] = {0xB1, 0x22, 0x4D, 0xE5, 0x64, 0x94, 0xB6, 0x9C, 0x9E, 0x1E, 0xF5, 0x20, 0x6D, 0x60, 0x77, 0xC2};

// LoRaWAN end-device address (DevAddr)
static const u4_t DEVADDR = 0x26021981; // <-- Change this address for every node! For example, our device address is 26022DEN. We will need to replace "DEVICE_ADDRESS_HERE" as 0x26022DEB.

// These callbacks are only used in over-the-air activation, so they are
// left empty here (we cannot leave them out completely unless
// DISABLE_JOIN is set in config.h, otherwise the linker will complain).
// Well alright......
void os_getArtEui(u1_t *buf) {}
void os_getDevEui(u1_t *buf) {}
void os_getDevKey(u1_t *buf) {}

// Schedule TX every this many seconds (might become longer due to duty
// cycle limitations).
const unsigned TX_INTERVAL = 5;

// Pin mapping
const lmic_pinmap lmic_pins = {
    .nss = 12, //RFM Chip Select
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 7,           //RFM Reset
    .dio = {6, 10, 11}, //RFM Interrupt, RFM LoRa pin, RFM LoRa pin
};

void onEvent(ev_t ev)
{
    SerialUSB.print(os_getTime());
    SerialUSB.print(": ");
    switch (ev)
    {
    case EV_SCAN_TIMEOUT:
        SerialUSB.println(F("EV_SCAN_TIMEOUT"));
        break;
    case EV_BEACON_FOUND:
        SerialUSB.println(F("EV_BEACON_FOUND"));
        break;
    case EV_BEACON_MISSED:
        SerialUSB.println(F("EV_BEACON_MISSED"));
        break;
    case EV_BEACON_TRACKED:
        SerialUSB.println(F("EV_BEACON_TRACKED"));
        break;
    case EV_JOINING:
        SerialUSB.println(F("EV_JOINING"));
        break;
    case EV_JOINED:
        SerialUSB.println(F("EV_JOINED"));
        break;
    case EV_RFU1:
        SerialUSB.println(F("EV_RFU1"));
        break;
    case EV_JOIN_FAILED:
        SerialUSB.println(F("EV_JOIN_FAILED"));
        break;
    case EV_REJOIN_FAILED:
        SerialUSB.println(F("EV_REJOIN_FAILED"));
        break;
    case EV_TXCOMPLETE:
        SerialUSB.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
        if (LMIC.txrxFlags & TXRX_ACK)
            SerialUSB.println(F("Received ack"));
        if (LMIC.dataLen)
        {
            SerialUSB.println(F("Received "));
            SerialUSB.println(LMIC.dataLen);
            SerialUSB.println(F(" bytes of payload"));
        }
        // Schedule next transmission
        os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(TX_INTERVAL), do_send);
        break;
    case EV_LOST_TSYNC:
        SerialUSB.println(F("EV_LOST_TSYNC"));
        break;
    case EV_RESET:
        SerialUSB.println(F("EV_RESET"));
        break;
    case EV_RXCOMPLETE:
        // data received in ping slot
        SerialUSB.println(F("EV_RXCOMPLETE"));
        break;
    case EV_LINK_DEAD:
        SerialUSB.println(F("EV_LINK_DEAD"));
        break;
    case EV_LINK_ALIVE:
        SerialUSB.println(F("EV_LINK_ALIVE"));
        break;
    default:
        SerialUSB.println(F("Unknown event"));
        break;
    }
}

void do_send(osjob_t *j)
{
    // Check if there is not a current TX/RX job running
    if (LMIC.opmode & OP_TXRXPEND)
    {
        SerialUSB.println(F("OP_TXRXPEND, not sending"));
    }
    else
    {
        // Prepare upstream data transmission at the next possible time.
        myData[0] = latitude >> 24;
        myData[1] = latitude >> 16;
        myData[2] = latitude >> 8;
        myData[3] = latitude;
        myData[4] = longitude >> 24;
        myData[5] = longitude >> 16;
        myData[6] = longitude >> 8;
        myData[7] = longitude;

        SerialUSB.println();
        for (int i = 0; i < 8; i = i + 1)
        {
            SerialUSB.println(myData[i]);
        }
        LMIC_setTxData2(1, myData, sizeof(myData), 0);
        SerialUSB.println(F("Packet queued"));
        // Next TX is scheduled after TX_COMPLETE event.
    }
}

void setup()
{
    SerialUSB.begin(115200);
    // Serial communication on startup is not consistent on the SAMD21. The
    // following line waits for the serial monitor to be opened before
    // continuing. Uncomment if not needed.
    while (!SerialUSB)
        ;
    SerialUSB.println("Starting");

    Wire.begin();
    // LMIC init
    os_init();
    // Reset the MAC state. Session and pending data transfers will be discarded.
    LMIC_reset();

// Set static session parameters. Instead of dynamically establishing a session
// by joining the network, precomputed session parameters are be provided.
#ifdef PROGMEM
    // On AVR, these values are stored in flash and only copied to RAM
    // once. Copy them to a temporary buffer here, LMIC_setSession will
    // copy them into a buffer of its own again.
    uint8_t appskey[sizeof(APPSKEY)];
    uint8_t nwkskey[sizeof(NWKSKEY)];
    memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
    memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
    LMIC_setSession(0x1, DEVADDR, nwkskey, appskey);
#else
    // If not running an AVR with PROGMEM, just use the arrays directly
    LMIC_setSession(0x1, DEVADDR, NWKSKEY, APPSKEY);
#endif

#if defined(CFG_us915)
    // NA-US channels 0-71 are configured automatically
    // but only one group of 8 should (a subband) should be active
    // TTN recommends the second sub band, 1 in a zero based count.
    // https://github.com/TheThingsNetwork/gateway-conf/blob/master/US-global_conf.json
    LMIC_selectSubBand(1);
#endif

    // Disable link check validation
    LMIC_setLinkCheckMode(0);

    // TTN uses SF9 for its RX2 window.
    LMIC.dn2Dr = DR_SF9;

    if (myGPS.begin() == false) //Connect to the Ublox module using Wire port
    {
        SerialUSB.println(F("Ublox GPS not detected at default I2C address. Please check wiring. Freezing."));
        while (1)
            ;
    }

    myGPS.setI2COutput(COM_TYPE_UBX); //Set the I2C port to output UBX only (turn off NMEA noise)

    myGPS.saveConfiguration(); //Save the current settings to flash and BBR

    // Set data rate and transmit power for uplink (note: txpow seems to be ignored by the library)
    LMIC_setDrTxpow(DR_SF9, 14);
}

void loop()
{

    //Query module only every second. Doing it more often will just cause I2C traffic.
    //The module only responds when a new position is available

    if (millis() - lastTime > 5000)
    {
        lastTime = millis(); //Update the timer

        latitude = myGPS.getLatitude();
        SerialUSB.println();
        SerialUSB.print(F("Lat: "));
        SerialUSB.print(latitude);

        SerialUSB.println();
        longitude = myGPS.getLongitude();
        SerialUSB.print(F(" Long: "));
        SerialUSB.print(longitude);
        SerialUSB.print(F(" (degrees * 10^-7)"));
        // Start job
        do_send(&sendjob);
    }
    os_runloop_once();
}
