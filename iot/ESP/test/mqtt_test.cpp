/*
  SimpleMQTTClient.ino
  The purpose of this exemple is to illustrate a simple handling of MQTT and Wifi connection.
  Once it connects successfully to a Wifi network and a MQTT broker, it subscribe to a topic and send a message to it.
  It will also send a message delayed 5 seconds later.
*/

#include "EspMQTTClient.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

unsigned long previousTime = 0;
const unsigned long interval = 2000;  // 대기할 시간 (밀리초)

#define DHTPIN 13     // Digital pin connected to the DHT sensor 
#define DHTTYPE    DHT11     // DHT 11

DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;
const int btn1 = 19;
const int btn2 = 18;

const int LEDB = 5;
const int LEDG = 17;
const int LEDR = 16;

const int freq = 5000;
const int ch = 0;
const int resolution = 8;

bool stateB = 0, stateR = 0;

EspMQTTClient client(
  "+",
  "",
  "",  // MQTT Broker server ip
  "MQTTUsername",   // Can be omitted if not needed
  "MQTTPassword",   // Can be omitted if not needed
  "TestClient",     // Client name that uniquely identify your device
  1883              // The MQTT port, default to 1883. this line can be omitted
);

char* topic = "";
String st = "";
void tx() {
  client.publish(topic, st);
}

void setup()
{
  dht.begin();
  sensor_t sensor;

  delayMS = sensor.min_delay / 1000;
  pinMode(btn1, INPUT_PULLUP);
  pinMode(btn2, INPUT_PULLUP);
  
  pinMode(LEDR, OUTPUT);
  pinMode(LEDG, OUTPUT);
  //pinMode(LEDB, OUTPUT);

  ledcSetup(ch, freq, resolution);
  ledcAttachPin(LEDB, ch);

  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);

  Serial.begin(115200);
  // Optional functionalities of EspMQTTClient
  client.enableDebuggingMessages(); // Enable debugging messages sent to serial output
  client.enableHTTPWebUpdater(); // Enable the web updater. User and password default to values of MQTTUsername and MQTTPassword. These can be overridded with enableHTTPWebUpdater("user", "password").
  client.enableOTA(); // Enable OTA (Over The Air) updates. Password defaults to MQTTPassword. Port is the default OTA port. Can be overridden with enableOTA("password", port).
  client.enableLastWillMessage("TestClient/lastwill", "I am going offline");  // You can activate the retain flag by setting the third parameter to true
}

// This function is called once everything is connected (Wifi and MQTT)
// WARNING : YOU MUST IMPLEMENT IT IF YOU USE EspMQTTClient
void onConnectionEstablished()
{
  client.subscribe("test/j", [](const String & payload) {
    Serial.println(payload);
    if(payload.equals("ON")) {
      ledcWrite(ch, 255);
      Serial.println("LED ON!");
    }
    if(payload.equals("OFF")) {
      ledcWrite(ch, 0);
      Serial.println("LED OFF!");
    }
  });  
}

float calculateDiscomfortIndex(float temperature, float humidity) {
  float discomfortIndex = 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3;
  return discomfortIndex;
}

void loop()
{
  unsigned long currentTime = millis();
  if (currentTime - previousTime >= interval) {
    previousTime = currentTime;
    int val1 = digitalRead(btn1);
    int val2 = digitalRead(btn2);

    sensors_event_t event;
    dht.temperature().getEvent(&event);
    float tep = event.temperature;
    String tmp = String(event.temperature);
    dht.humidity().getEvent(&event);
    float hud = event.relative_humidity;
    String humid = String(event.relative_humidity);

    topic = "test/temp";
    st = tmp;
    tx();

    topic = "test/humid";
    st = humid;
    tx();

    topic = "test/state";
    float temp = calculateDiscomfortIndex(tep, hud);
    int val = int(temp);
    st = String(val);
    tx();
  }
  client.loop();
}