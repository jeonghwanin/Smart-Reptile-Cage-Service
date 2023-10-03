#include "header.h"
#include "mqtt.h"
#include "sensing.h"
#include "actuator.h"
#include "uartSerial.h"

// Instances of classes
MQTT mqtt;
UartSerial userial;
Sensor sensor;
WaterMotor water_motor;
CoolingFan cool_fan;
HeatPad heat_pad;
Humidifier humidifier;
LEDControl led_ctrl;

// Sensor data and setpoint
Info now_val, set_val;

// Flags for controlling actuator
bool temp_flag, humid_flag, led_flag;

// Actuator status
Status status_flag;

// Error flag
bool err_flag, flag;

// Timer 
uint32_t delay_ms;

// MQTT subscribe callback
void onConnectionEstablished()
{
  client.subscribe(get_topic, [](const String& payload) {
    Serial.println(payload);
    StaticJsonDocument<200> doc;
    deserializeJson(doc, payload);
    serializeJson(doc, Serial);
    
    // Error check
    err_flag = mqtt.errorCheck(doc);
    if(err_flag) {
      mqtt.errorTx(error_topic, "There is no key");
      err_flag = false;
      return;
    }
    led_flag = doc["uv"];

    // Extract temperature, humidity, and LED values from payload
    String tmp = doc["Temp"];
    if(tmp.toFloat() > MINTEMP) {
      set_val.temp = tmp.toFloat();
      String hud = doc["Humid"];
      set_val.humid = hud.toFloat();
      String uv = doc["uv"];
      set_val.light = uv.toInt();
    }
    // Set flags based on received values
    if(set_val.temp) temp_flag = true;
    if(set_val.humid) humid_flag = true;
  });
}

// Function to operate modules based on web settings
void autoSet(Status set_flag) {
  if(set_val.light) { led_ctrl.on(); }
  if(!set_val.light) { led_ctrl.off(); }
  if(temp_flag && set_flag.islock) {
    autoTemp(set_val, now_val, heat_pad, cool_fan, temp_flag);
  }
  if(humid_flag && set_flag.islock) {
    autoHumid(set_val, now_val, humidifier, cool_fan, humid_flag);
  }
}

void setup() {
  Serial.begin(115200);

  // Initialize sensor delay
  sensor_t sensor_tmp;
  delay_ms = sensor_tmp.min_delay / 1000;

  // Initialize classes and modules
  mqtt.init();
  sensor.init(sensor_tmp);
  actuatorInit();
  userial.init();
  status_flag.islock = true;
}

void loop() {
  unsigned long cur_time = millis();
  String data = "";

  // Read RPI4 data
  Status set_flag;
  set_flag = userial.rx();

  status_flag.islock = set_flag.islock;
  //Operate actuators based on RPI4 data
  if(set_flag.led != -1 && !set_flag.islock) {
    actuate(set_flag, water_motor, humidifier, heat_pad, cool_fan, led_ctrl);
    status_flag = getStatus(water_motor, humidifier, heat_pad, cool_fan, led_ctrl);
    // Transmit status data to RPI4
    data = mqtt.makeStatusJson(status_flag);
    userial.tx(data.c_str());
  }

  // Operate actuators based on web settings
  if(status_flag.islock) {
    autoSet(set_flag);
  }
  if (cur_time - prev_time >= interval_time) {
    prev_time = cur_time;

    // Update actuator status
    status_flag = getStatus(water_motor, humidifier, heat_pad, cool_fan, led_ctrl);

    // Get temperature and humidity data from sensors
    now_val = sensor.sensing();
    now_val.light = status_flag.led;
    // Update data for MQTT and web
    mqtt.updateData(now_val);

    // Transmit status data to RPI4 

    data = mqtt.makeStatusJson(status_flag);
    userial.tx(data.c_str());
    // Transmit temperature and humidity data to web
    mqtt.makeJson();
    mqtt.tx();
    mqtt.ipTx();
  }

  client.loop();
}