#pragma once
#include "header.h"

// Water pump motor
struct WaterMotor {
  bool status;

  void on() {
    digitalWrite(AA, HIGH);
    digitalWrite(AB, LOW);
    status = true;
  }

  void off() {
    digitalWrite(AA, LOW);
    digitalWrite(AB, LOW);
    status = false;
  }

  bool statusCheck() {
    return status;
  }
};

// Cooling fan
struct CoolingFan {
  bool status;

  void on() {
    digitalWrite(cool_pin, HIGH);
    status = true;
  }

  void off() {
    digitalWrite(cool_pin, LOW);
    status = false;
  }

  bool statusCheck() {
    return status;
  }
};

// Heat pad
struct HeatPad {
  bool status;

  void on() {
    digitalWrite(heat_pin, HIGH);
    status = true;
  }

  void off() {
    digitalWrite(heat_pin, LOW);
    status = false;
  }

  bool statusCheck() {
    return status;
  }
};

// Humidifier
struct Humidifier {
  bool status;

  void on() {
    digitalWrite(hud_pin, HIGH);
    status = true;
  }

  void off() {
    digitalWrite(hud_pin, LOW);
    status = false;
  }

  bool statusCheck() {
    return status;
  }
};

// LED on/off/set value
struct LEDControl {
  int status;

  LEDControl() {
    status = 0;
  }

  void setLight(int val) {
    if (val > 255) val = 255;
    if (val < 0) val = 0;
    ledcWrite(ch, val);
    status = val;
  }

  bool on() {
    for (int i = 0; i < 255; i += 50) {
      if (i > 255) break;
      ledcWrite(ch, i);
      status = 255;
    }
    return true;
  }

  bool off() {
    for (int i = status; i >= 0; i -= 50) {
      if (i < 0) break;
      ledcWrite(ch, i);
      status = 0;
    }
    return false;
  }

  bool statusCheck() {
    return status;
  }
};

// Initialize actuators
void actuatorInit() {
  // Water pump
  pinMode(AA, OUTPUT);
  pinMode(AB, OUTPUT);

  // Cooling fan
  pinMode(cool_pin, OUTPUT);

  // Heating pad
  pinMode(heat_pin, OUTPUT);

  // Humidifier
  pinMode(hud_pin, OUTPUT);

  // LED setup
  ledcSetup(ch, freq, resolution);
  ledcAttachPin(LED, ch);
}

// Humidity auto operation
void autoHumid(const Info set_val, Info now_val, Humidifier humidifier, CoolingFan cool_fan, bool& humid_flag) {
  // #1. Desired humidity is lower than the current humidity
  if (set_val.humid < now_val.humid - 3) {
    humidifier.on();
    cool_fan.off();
  }
  // #2. Desired humidity is higher than the current humidity
  else if (set_val.humid > now_val.humid + 3) {
    humidifier.off();
    cool_fan.on();
  }
  // #3. In the acceptable range
  else if (set_val.humid < now_val.humid + 3 && set_val.humid > now_val.humid - 3) {
    humidifier.off();
    cool_fan.off();
    humid_flag = false;
  }
  // #4. Out of range
  else if (set_val.humid > MAXHUMID || set_val.humid < MINHUMID) {
    humidifier.off();
    cool_fan.off();
  }
}

// Temperature auto operation
void autoTemp(const Info set_val, Info now_val, HeatPad heat_pad, CoolingFan cool_fan, bool& temp_flag) {
  // #1. Desired temperature is lower than the current temperature
  if (set_val.temp < now_val.temp - 3) {
    heat_pad.off();
    cool_fan.on();
  }
  // #2. Desired temperature is higher than the current temperature
  else if (set_val.temp > now_val.temp + 3) {
    heat_pad.on();
    cool_fan.off();
  }
  // #3. In the acceptable range
  else if (set_val.temp < now_val.temp + 3 && set_val.temp > now_val.temp - 3) {
    heat_pad.off();
    cool_fan.off();
    temp_flag = false;
  }
  // #4. Out of range
  else if (set_val.temp > MAXTEMP || set_val.temp < MINTEMP) {
    heat_pad.off();
    cool_fan.off();
  }
}

// Get status of actuators
Status getStatus(WaterMotor water_motor, Humidifier humidifier, HeatPad heat_pad, CoolingFan cool_fan, LEDControl led_ctrl) {
  Status status_flag;
  status_flag.waterfall = water_motor.statusCheck();
  status_flag.heat = heat_pad.statusCheck();
  status_flag.humidifier = humidifier.statusCheck();
  status_flag.cooling = cool_fan.statusCheck();
  status_flag.led = led_ctrl.statusCheck();
  return status_flag;
}

// Operate modules based on the value of RPI4
void actuate(Status set_flag, WaterMotor water_motor, Humidifier humidifier, HeatPad heat_pad, CoolingFan cool_fan, LEDControl led_ctrl) {
  if (set_flag.waterfall) water_motor.on();
  else water_motor.off();

  if (set_flag.humidifier) humidifier.on();
  else humidifier.off();
  
  if (set_flag.heat) heat_pad.on();
  else heat_pad.off();
  
  if (set_flag.cooling) cool_fan.on();
  else cool_fan.off();

  if (set_flag.led) led_ctrl.setLight(set_flag.led);
  else led_ctrl.off();
}
