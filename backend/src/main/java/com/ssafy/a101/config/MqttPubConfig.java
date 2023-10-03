package com.ssafy.a101.config;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttPersistenceException;
// MQTT 통신을 통해서 메시지를 broker로 전송하기 위한 객체
// 1. broker에 접속
// 2. broker로 메시지를 전송

public class MqttPubConfig {
    // MQTT 통신에서 Publisher와 Subscriber의 역할을 하기 위한 기능을 가지고 있는 객체
    private MqttClient client;

    // 생성자
    public MqttPubConfig() throws MqttException {
        try {
            // broker와 MQTT 통신을 하며 메시지를 전송할 클라이언트 객체를 만들고 접속
//            client = new MqttClient("tcp://54.166.67.73:1883", "ssafy");
            client = new MqttClient("tcp://43.202.68.60:1883", "ssafy");
            //172.20.10.14
            // broker 접속
            client.connect();
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    // 메시지 전송을 위한 메소드
    public boolean send(String topic, String msg) {
        try {
            // broker로 전송할 메시지를 생성 - MqttMessage
            MqttMessage message = new MqttMessage();
            // payload가 실제로 데이터. 바이트 배열.
            // 실제 broker로 전송할 메시지
            message.setPayload(msg.getBytes());
            client.publish(topic, message);
        } catch (MqttPersistenceException e) {
            System.out.println("error");
            e.printStackTrace();
        } catch (MqttException e) {
            e.printStackTrace();
        }
        return true;
    }

    // 접속 종료
    public void close() {
        try {
            if(client != null) {
                client.disconnect();
                client.close();
            }
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
