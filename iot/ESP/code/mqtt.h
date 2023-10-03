#pragma once
#include "header.h"

// Set topics to communicate
char* topic = "1/sensorval";
char* get_topic = "1/setval";
char* error_topic = "error";
char* ip_topic = "1/ip";

// Define client
EspMQTTClient client(
  WIFINAME,
  WIFIPW,
  BROCKERIP,
  USRNAME,
  USRPW,
  "ESP32",
  PORT
);

// Class for MQTT
struct MQTT {
  Info val;
  Info set_val;
  String data;

  MQTT() {
    data = "";
  }

  // Initialize the MQTT client
  void init() {
    // static IP for SSAFY WiFi
    // if (!WiFi.config(STATICIP, GATEWAY, SUBNET, PRIMARYDNS, SECONDARYDNS)) {
    //   Serial.println("STA failed to configure");
    // }
    // WiFi.begin(WIFINAME, WIFIPW);
    client.enableDebuggingMessages();
    client.enableHTTPWebUpdater();
    client.enableOTA();
  }

  // Convert data to JSON format for sensor values
  void makeJson() {
    data = "";
    DynamicJsonDocument doc(200);

    char res[20] = { 0, };
    sprintf(res, "%.1f", val.temp);
    doc["Temp"] = res;
    sprintf(res, "%.1f", val.humid);
    doc["Humid"] = res;
    doc["uv"] = String(val.light);

    // Serialize JSON data
    serializeJson(doc, data);
  }

  // Convert data to JSON format for RPI4 status
  String makeStatusJson(Status status) {
    DynamicJsonDocument doc(200);

    char res[20] = { 0, };
    sprintf(res, "%d", status.led);
    doc["LED"] = res;

    doc["heat_pad"] = status.heat;
    doc["cooling_fan"] = status.cooling;
    doc["humidifier"] = status.humidifier;
    doc["waterfall"] = status.waterfall;

    sprintf(res, "%.1f", val.temp);
    doc["Temp"] = res;
    sprintf(res, "%.1f", val.humid);
    doc["Humid"] = res;

    // Serialize JSON data and return as String
    serializeJson(doc, data);
    data += "\n";
    return data;
  }

  // Update sensor data
  void updateData(Info info) {
    val.temp = info.temp;
    val.humid = info.humid;
    val.light = info.light;
  }

  // Transmit function if error occurs
  void errorTx(char* err_topic, char* err_type) {
    client.publish(err_topic, err_type);
  }

  // Transmit sensor data
  void tx() {
    client.publish(topic, data);
    data = "";
  }

  // Transmit sensor data
  void ipTx() {
    client.publish(ip_topic, "192.168.204.97");
  }

  // Error check for required keys in JSON data
  bool errorCheck(StaticJsonDocument<200>& doc) {
    // Check if the "Temp", "Humid", and "uv" keys exist in the JSON data
    bool has_temp = doc.containsKey("Temp");
    bool has_humid = doc.containsKey("Humid");
    bool has_uv = doc.containsKey("uv");

    // Return true if any of the required keys are missing
    if(has_temp && !(has_humid && has_uv)) return true;
    if(has_humid && !(has_temp && has_uv)) return true;
    if(has_uv && !(has_temp && has_uv)) return true;
    return false;
  }
};
