package com.ssafy.a101.config;

import org.eclipse.paho.client.mqttv3.*;

// MQTT 클라이언트 작성 - broker에 메시지를 전달받기 위해 구독 신청을 하고 대기하는 객체
// 1. MqttCallback 인터페이스를 상속
// 2. MqttCallboac 인터페이스의 abstract 메소드를 오버라이딩
public class MqttSubConfig implements MqttCallback {
    // broker와 통신하는 역할을  담당 - subscriber, publisher의 역할
    private MqttClient mqttclient;
    // MQTT 프로토콜을 이용해서 broker에 연결하면서 연결 정보를 설정할 수 있는 객체
    private MqttConnectOptions mqttOption;

    // clientId는 broker가 클라이언트를 식별하기 위한 문자열 - 고유
    public MqttSubConfig init(String server, String clientID) {

        try {
            mqttOption = new MqttConnectOptions();
            mqttOption.setCleanSession(true);
            mqttOption.setKeepAliveInterval(30);
            // broker에  subscribe하기 위한 클라이언트 객체 생성
            mqttclient = new MqttClient(server, clientID);
            // 클라이언트 객체에 MqttCallback을 등록 - 구독 신청 후 적절한 시점에 처리하고 싶은 기능을 구현하고
            // 메소드가 자동으로 그 시점에 호출되도록 할 수 있다.
            mqttclient.setCallback(this);
            mqttclient.connect(mqttOption);
        } catch (MqttException e) {
            e.printStackTrace();
        }
        return this;
    }

    // 커넥션이 종료되면 호출 - 통신 오류로 연결이 끊어지는 경우 호출
    @Override
    public void connectionLost(Throwable cause) {

    }

    // 메시지의 전송이 완료되면 호출
    @Override
    public void deliveryComplete(IMqttDeliveryToken token) {

    }

    // 메시지가 도착하면 호출되는 메소드
    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
//        System.out.println("======메세지 도착=======");
//        System.out.println(message);
//        System.out.println("topic : "+topic+", id : "+message.getId()+", payload : "+new String(message.getPayload()));
    }

    // 구독 신청
    public boolean subscribe(String topic) {
        boolean result = true;
        try {
            if (topic!=null) {
                // topic과 Qos를 전달
                // Qos는 메시지가 도착하기 위한 품질의 값을 설정 - 서비스 품질
                // 0, 1, 2를 설정
                mqttclient.subscribe(topic, 0);
            }
        } catch (MqttException e) {
            e.printStackTrace();
            result = false;
        }
        return result;
    }
}
