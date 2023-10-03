// 훅|함수 import 
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { Client, Message } from 'paho-mqtt';
// 상태 정보 import
import { myCagesStore } from 'store/myCageStore';
import { nowPageStore } from 'store/myExtraStore';
import { nowLoadingStore, warningAlarmStore } from 'store/myExtraStore';
// 컴포넌트 import
import VideoBox from 'components/CageDatail/LiveVideo/VideoBox';
import MoveBtnBox from 'components/CageDatail/LiveVideo/MoveBtnBox';
// 스타일 import

export default function LiveVideo():JSX.Element {
  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("실시간 영상");
  }, [changePage])

  // props 받아오기
  const cageId = Number(useParams().cageId);
  const myCage = myCagesStore(state => (state.cages)).find((cage) => (cage.cageId === cageId));
  const setIsLoading = nowLoadingStore(state => state.setIsLoading);
  const addWarnings = warningAlarmStore(state => state.addWarnings);

  // 변수 선언
  const clientRef = useRef<Client|null>(null);
  const [url, setUrl] = useState('');

  // Mqtt 커넥트
  useEffect(() => {
    setIsLoading(true)
    const client = new Client("i9a101.p.ssafy.io", 9001, "client");
    clientRef.current = client;
    // Mqtt 연결
    if (!client.isConnected()) {
      client.connect({
        // 계정 정보
        userName: "FRONT",
        password: '1234',
        // https 보안을 위해 사용
        useSSL: true,
        timeout:1,
        // 커넥트에 성공
        onSuccess: () => {
          client.subscribe(`${myCage?.snum}/ip`);
          setIsLoading(false)
        },
        // 커넥트 실패
        onFailure: (err) => { 
          setIsLoading(false)
          addWarnings(`${myCage?.cage_name} 케이지와의 연결에 실패하였습니다.`)
        }
      });
    };
    // 케이지 내부 영상 주소 토픽을 통해 받기
    client.onMessageArrived = (message: Message) => {
      const videoUrl = message.payloadString;
      // 토픽에 따라 상태 정보 업데이트
      if (url !== videoUrl) {
        setUrl(videoUrl)
      }
    };
    // 컴포넌트가 언마운트되면 연결 해제
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  // 카메라 이동 함수
  const moveCamera = (direction:string):void => {
    const client = clientRef.current
    // client가 null값이 아니고 연결되었을 때만 함수 실행
    if (client && client.isConnected()) {
      const message = new Message(direction);
      message.destinationName = `${myCage?.snum}/angle`;
      client.send(message);
    }
  }

  // 팔로우 기능 활성화 함수
  const handleFollow = () => {
  };


  return (
    <>
      {/* 동영상 컨테이너 */}
      <VideoBox url={url}/>
      {/* 카메라 무빙 버튼 */}
      <MoveBtnBox moveCamera={moveCamera} handleFollow={handleFollow}/>
    </>
  )
}