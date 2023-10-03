#pragma once

// Header files
#include "EspMQTTClient.h"
#include <Adafruit_Sensor.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <DHT_U.h>
#include <iostream>
#include <HardwareSerial.h>
#include <WiFi.h>

// Macros
#define DHTPIN 13     // Digital pin connected to the DHT sensor 
#define DHTTYPE DHT11     // DHT 11
#define BROCKERIP "" // MQTT Broker server IP
#define WIFINAME "" // WiFi name
#define WIFIPW "" // WiFi password
#define USRNAME "" // MQTT User name
#define USRPW "" // MQTT User password
#define PORT 1883 // The MQTT port
#define TXD_PIN 17 // Serial transmit pin
#define RXD_PIN 16 // Serial receive pin

// Setting static IP
IPAddress STATICIP(); // ESP32가 사용할 IP address
IPAddress GATEWAY();    // Gateway IP address (공유기 IP주소)

IPAddress SUBNET();   // subnet mask
IPAddress PRIMARYDNS();     // primary DNS server IP address
IPAddress SECONDARYDNS();   // secondary DNS server IP address

const int MINTEMP = 20; // Minimum temperature
const int MAXTEMP = 50; // Maximum temperature
const int MINHUMID = 20; // Minimum humidity
const int MAXHUMID = 80; // Maximum humidity
// Struct
struct Info {
  float temp, humid;
  bool light;

  Info() {
    temp = 0.0f;
    humid = 0.0f;
    light = false;
  }
};

// Actuator status
struct Status {
  bool cooling;
  bool waterfall;
  bool heat;
  bool humidifier;
  int led;
  bool islock;
};

// Timer
unsigned long prev_time = 0;
const unsigned long interval_time = 2000; // Wait time in milliseconds

// Water pump motor
extern const int AA = 27;
extern const int AB = 26;

// Humidifier module
extern const int hud_pin = 25;

// Cooling fan
extern const int cool_pin = 12;

// Heat pad
extern const int heat_pin = 14;

// LED
const int freq = 5000;
const int ch = 0;
const int resolution = 8;
const int LED = 2;
