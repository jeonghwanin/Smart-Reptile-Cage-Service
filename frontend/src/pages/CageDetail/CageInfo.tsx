// 훅 import 
import {useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react'
import { Message, Client } from 'paho-mqtt';
import { axiosCage } from 'constants/AxiosFunc';
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
import { myCagesStore } from 'store/myCageStore';
import { nowCageValueStore } from 'store/myCageStore';
import { nowLoadingStore, warningAlarmStore } from 'store/myExtraStore';
// 컴포넌트 import
import AnimalBox from 'components/CageDatail/CageInfo/AnimalBox';
import InnerCageInfo from 'components/CageDatail/CageInfo/InnerCageInfo';
import SettingBtnBox from 'components/CageDatail/CageInfo/SettingBtnBox';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CageInfo():JSX.Element {
  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("케이지 정보");
  }, [])

  // 상태정보, props 받기
  const cageId = Number(useParams().cageId);
  const myCage = myCagesStore(state => (state.cages)).find((cage) => (cage.cageId === cageId));
  const nowCage = nowCageValueStore();
  const setIsLoading = nowLoadingStore(state => state.setIsLoading);
  const addWarnings = warningAlarmStore(state => state.addWarnings);

  // 케이지 내부 센서값 받기
  const clientRef = useRef<Client|null>(null);
  useEffect(() => {
    setIsLoading(true)
    // 케이지 아이디 판단
    if (nowCage.cageId !== cageId) {
      nowCage.setCageId(cageId);
      nowCage.setTemp(null);
      nowCage.setHum(null);
      nowCage.setUv(null);
    }
    // Mqtt 연결
    const client = new Client("i9a101.p.ssafy.io", 9001, "client");
    clientRef.current = client;
    if (!client.isConnected()) {
      client.connect({
        userName: "FRONT",
        password: "1234",
        useSSL:true,
        timeout:1,
        onSuccess: () => { 
          // 커넥트에 성공(구독)
          client.subscribe(`${myCage?.snum}/sensorval`);
          setIsLoading(false);
        },
        onFailure: () => { 
          // 커넥트 실패
          setIsLoading(false);
          addWarnings(`케이지와의 연결에 실패하였습니다.`)
        }
      });
    };
    // 토픽을 통해 센서값 받기
    client.onMessageArrived = (message: Message) => {
      const payload = message.payloadString;
      const sensorInfo = JSON.parse(payload);
      // 토픽에 따라 상태 정보 업데이트
      nowCage.setTemp(Number(sensorInfo.Temp));
      nowCage.setHum(Number(sensorInfo.Humid));
      nowCage.setUv(Number(sensorInfo.uv));
    };
    // 컴포넌트가 언마운트되면 연결 해제
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);
  
  // 환경 세팅 조절 후 Mqtt로 세팅값 보내기
  const updateCage = myCagesStore(state => state.updateCage);
  const handleSetting = (setting:[number, number, number]) => {
    const client = clientRef.current;
    // mycage와 client가 유효할 때만 함수 실행
    if (nowCage.uv !== null && client?.isConnected() && myCage) {
      // 세팅값 조절하기
      myCage.set_temp += setting[0];
      myCage.set_hum += setting[1];
      myCage.set_uv = Math.abs(myCage.set_uv - setting[2]);
      // 세팅값 예외 처리
      if (myCage.set_temp < 0 || myCage.set_temp > 50) {
        alert("허용 범위 밖의 온도입니다.")
        myCage.set_temp -= setting[0]
        return
      }
      if (myCage.set_hum < 0 || myCage.set_hum > 100) {
        alert("허용 범위 밖의 습도입니다.")
        myCage.set_hum -= setting[1]
        return
      }
      // 조절한 세팅값 저장
      try {
        // 데이터베이스 수정
        const updatedCageInfo = axiosCage(`cage/${cageId}`, "PUT", myCage);
        // 로컬 스토리지 수정
        updateCage(myCage);
        // 세팅값 Mqtt로 보내기
        const payload = {Temp: myCage?.set_temp, Humid: myCage?.set_hum, uv: myCage?.set_uv,};
        const message = new Message(JSON.stringify(payload));
        message.destinationName = `${myCage?.snum}/setval`;
        client.send(message);
      }
      catch {
        // 오류 처리
      }
    } else {
      addWarnings(`${myCage?.cage_name} 케이지와의 연결이 불안정합니다.`)
    }
  }

  // 페이지 렌더링
  return (
    <>
    {/* 동물 컨테이너 */}
    <AnimalBox cageId={cageId}/>
    {/* 실시간 환경 정보 컨테이너 */}
    <InnerCageInfo handleSetting={handleSetting}/>
    {/* 추가 세팅 컨테이너 */}
    <SettingBtnBox/>
    </>
  )
}
