# node verion : 18.16.1
FROM node:18.16.1-alpine as builder
# 작업 위치 지정
WORKDIR /app

# 환경 변수 지정
# 개발 환경에서는 development, 운영(배포) 환경에서는 production
ENV NODE_ENV development
ENV PATH /app/node_modules/.bin:$PATH

# 현재 파일을 이미지의 /app 위치에 복사
COPY  package.json .
COPY . .

# package.json에 명시된 의존성 설치
RUN npm install	--force

# 빌드 시작
RUN npm run build

# nginx 
FROM nginx:latest
RUN mkdir /app
WORKDIR /app

# 기존 환경 설정 제거
RUN rm /etc/nginx/conf.d/default.conf
# 디렉토리의 conf 파일을 복사
COPY ./nginx.conf /etc/nginx/conf.d
# builder로 부터 /app/build를 복사해옵니다.
COPY --from=builder /app/build /app/build

#RUN rm -rf /etc/nginx/conf.d	#기존 환경설정 제거
#COPY conf /etc/nginx	
#현재위치/conf/conf.d/default.conf 가 존재해야합니다.
#COPY --from=builder /app/build /usr/share/nginx/html	#builder로 부터 /app/build를 복사해옵니다.

# 3000번 포트를 노출한다고 써놨지만, 이는 명시하기 위한 것으로 반드시 docker run의 옵션으로 포트 매핑을 해야함.
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]