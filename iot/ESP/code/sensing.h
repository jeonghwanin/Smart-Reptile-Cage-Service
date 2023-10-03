#pragma once
#include "header.h"

DHT_Unified dht(DHTPIN, DHTTYPE);

// Sensor class
struct Sensor {
  Info data;

  // Initialize the sensor
  void init(sensor_t sensor) {
    dht.begin();
    dht.temperature().getSensor(&sensor);
    dht.humidity().getSensor(&sensor);
  }

  // Get current temperature and humidity
  Info sensing() {
    sensors_event_t event;
    
    // Get temperature
    dht.temperature().getEvent(&event);
    data.temp = event.temperature;
    
    // Get humidity
    dht.humidity().getEvent(&event);
    data.humid = event.relative_humidity;
    
    return data;
  }
};
