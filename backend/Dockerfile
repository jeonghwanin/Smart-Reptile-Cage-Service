# JDK를 설정
FROM azul/zulu-openjdk:11.0.19

# 환경변수 설정
# ENV APP_HOME=/usr/app/

# 환경변수를 경로로 지정
# WORKDIR $APP_HOME

COPY /build/libs/*.jar app.jar

# 빌드된 jar 파일을 application.jar의 파일명으로 복사
# COPY build/libs/*.jar application.jar
RUN ls
RUN pwd
#ENTRYPOINT java -jar /deploy/A101-0.0.1-SNAPSHOT.jar
ENTRYPOINT java -jar app.jar

# 실행될 포트 설정
EXPOSE 8000

# 명령어 옵션 설정
# CMD ["java", "-jar", "application.jar"]
