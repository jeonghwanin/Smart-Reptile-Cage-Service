#include "EspMQTTClient.h"
#include <Adafruit_Sensor.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <DHT_U.h>

unsigned long previousTime = 0;
const unsigned long interval = 2000;  // 대기할 시간 (밀리초)

// water pump moter
const int AA = 27;  // AA를 연결한 디지털 핀
const int AB = 26;   // AB를 연결한 디지털 핀
// 가습기 모듈
const int hud_pin = 25;
// 쿨링팬
const int cool_pin = 12;
// 온열 패드
const int hit_pin = 14;

uint32_t delayMS;

// json 처리
StaticJsonDocument<200> doc;
// 희망 온도, 습도, 조명
float set_temp, set_humid, set_light;
// 현재 온도, 습도, 조명
float temp, hum;
int light;

void setup()
{
  // 워터 펌프
  pinMode(AA, OUTPUT);  // AA를 출력 핀으로 설정
  pinMode(AB, OUTPUT);  // AB를 출력 핀으로 설정
  // 가습기 
  pinMode(hud_pin, OUTPUT);
  // 쿨링팬
  pinMode(cool_pin, OUTPUT);
  // 온열 패드
  pinMode(hit_pin, OUTPUT);
}

void waterfall(int AA, int AB) {
  // 워터펌프
  unsigned long currentTime = millis();
  if (currentTime - previousTime >= interval) {
    previousTime = currentTime;
    digitalWrite(AA, HIGH);  // 정방향으로 모터 회전
    digitalWrite(AB, LOW);
  }
  if (currentTime - previousTime >= interval) {
    previousTime = currentTime;
    digitalWrite(AA, LOW);  // 모터 정지
    digitalWrite(AB, LOW);
  }
}

void temp_control() {
  // 열선 패드, 쿨링팬
  // 열선 패드
  digitalWrite(hit_pin, 0);
  // 쿨링팬 
  digitalWrite(cool_pin, 1);
}

void humid_control() {
  // 쿨링팬, 가습기
  digitalWrite(cool_pin, 1);
  // 가습기
  digitalWrite(hud_pin, 1);
  // 쿨링팬 
}
 
void loop()
{
  // 폭포 동작 함수
  waterfall(AA, AB); 
  // 온도조절
  temp_control();
  // 습도 조절
  humid_control();
  
  // light_control();
}
