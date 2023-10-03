#include "EspMQTTClient.h"
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <stdio.h>

unsigned long previousTime = 0;
const unsigned long interval = 2000;  // 대기할 시간 (밀리초)

#define DHTPIN 13     // Digital pin connected to the DHT sensor 
#define DHTTYPE DHT11     // DHT 11

DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;

// mqtt 통신 토픽
char* topic = "";
// json 처리
StaticJsonDocument<200> doc;
String data = "";
// 희망 온도, 습도, 조명
float set_temp, set_humid;
// 현재 온도, 습도, 조명
float temp, hum;
int light, set_light;

EspMQTTClient client(
  "wifiname",
  "pw",
  "broker",  // MQTT Broker server ip
  "MQTTUsername",   // Can be omitted if not needed
  "MQTTPassword",   // Can be omitted if not needed
  "ESP32",     // Client name that uniquely identify your device
  1883              // The MQTT port, default to 1883. this line can be omitted
);

void makeJson() { //데이터값을 Json으로 변환 시킵니다.
  DynamicJsonDocument doc(200);
  
  char res[20] = {0,};
  sprintf(res, "%.1f", temp);
  doc["Temp"] = res;
  sprintf(res, "%.1f", hum);
  doc["Humid"] = res;
  doc["uv"] = String(light);

  Serial.print("Json data : ");
  serializeJson(doc, Serial);
  Serial.println();
  serializeJson(doc, data); 
}

void tx() {
  Serial.println(temp);
  Serial.println(hum);
  client.publish(topic, data);
  data = "";
}

void setup()
{
  dht.begin();
  sensor_t sensor;

  delayMS = sensor.min_delay / 1000;  

  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);

  Serial.begin(115200);

  client.enableDebuggingMessages(); 
  client.enableHTTPWebUpdater(); 
  client.enableOTA();
  client.enableLastWillMessage("TestClient/lastwill", "I am going offline");
}

void onConnectionEstablished()
{
  client.subscribe("test/set", [](const String & payload) {
    Serial.println(payload);
    StaticJsonDocument<200> doc;
    deserializeJson(doc, payload);
    serializeJson(doc, Serial);
    // 온도, 습도, 조명
    set_temp = doc["temp"];
    set_humid = doc["humid"];
    set_light = doc["uv"];
    String res = String(set_temp) + ", " + String(set_humid) + ", " + String(set_light);
    Serial.println();
    Serial.println(res);
  });  
}

void sensing(sensors_event_t& event) {
  dht.temperature().getEvent(&event);
  temp = event.temperature;
  
  dht.humidity().getEvent(&event);
  hum = event.relative_humidity;
}

void loop()
{
  unsigned long currentTime = millis();
  if (currentTime - previousTime >= interval) {
    previousTime = currentTime;

    sensors_event_t event;
    sensing(event);
    topic = "test/sensor";
    makeJson();
    tx();
  }
  client.loop();
}