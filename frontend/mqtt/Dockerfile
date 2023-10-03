# Mosquitto MQTT 브로커 이미지 빌드를 위한 Dockerfile

# 기반 이미지 선택
FROM eclipse-mosquitto

# 데이터와 로그 디렉토리 생성 (volumes로 사용됨)
RUN mkdir -p /mosquitto/data
RUN mkdir -p /mosquitto/log
RUN mkdir -p /mosquitto/config

# 설정 파일 복사
COPY ./config/mosquitto.conf /mosquitto/config/mosquitto.conf

# Mosquitto 포트
EXPOSE 1883
EXPOSE 9001

# 컨테이너 실행 시 실행할 명령어 (필요하다면 수정)
CMD ["mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]
