#pragma once
#include "header.h"

HardwareSerial mySerial(2);

// UartSerial class
struct UartSerial {
  String data;
  StaticJsonDocument<200> doc;

  UartSerial() {
    data = "";
  }

  // Initialize UART communication
  void init() {
    mySerial.begin(115200, SERIAL_8N1, 16, 17);
  }

  // Transmit status data over UART
  void tx(const char* send_data) {
    mySerial.write(send_data);
    Serial.println(send_data);
  }

  // Receive status data from UART
  Status rx() {
    Status flag;
    if (mySerial.available() > 0) {
      data = mySerial.readString();
      Serial.println(data);

      // Parse JSON data
      deserializeJson(doc, data);

      flag.led = doc["LED"];
      flag.waterfall = doc["waterfall"];
      flag.cooling = doc["cooling_fan"];
      flag.heat = doc["heat_pad"];
      flag.humidifier = doc["humidifier"];
      flag.islock = doc["lock"];

      Serial.println();
      return flag;
    }

    // Return default values if no data available
    return {0, 0, 0, 0, -1, 1};
  }

  // Error check for required keys in JSON data
  bool errorCheck() {
    // Check if the "LED", "waterfall", 'cooling_fan', 'heat_pad', 'humidifier' and "lock" keys exist in the JSON data
    bool has_LED = doc.containsKey("LED");
    bool has_waterfall = doc.containsKey("waterfall");
    bool has_cooling = doc.containsKey("cooling_fan");
    bool has_heat = doc.containsKey("heat_pad");
    bool has_humidifier = doc.containsKey("humidifier");
    bool has_lock = doc.containsKey("lock");
    
    // Return true if any of the required keys are missing
    return !(has_LED && has_waterfall && has_cooling && has_heat && has_humidifier && has_lock);
  }
};
