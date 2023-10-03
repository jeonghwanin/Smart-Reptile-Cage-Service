// 훅|함수 import 
import { useState,  useEffect } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { axiosAnimal, axiosAuto, axiosAlarm } from 'constants/AxiosFunc';
import { Client, Message } from 'paho-mqtt';
// 상태 정보 import
import { nowLoadingStore } from 'store/myExtraStore';
import { myCagesStore } from 'store/myCageStore';
import { myAnimalStore } from 'store/myAnimalStore';
import { alarmSettingStore, autoSettingStore } from 'store/mySettingStore';
// 컴포넌트 import
import CageInfo from './CageInfo';
import AnimalList from './Animal/AnimalList';
import AddAnimal from './Animal/AddAnimal';
import AnimalDetail from './Animal/AnimalDetail';
import LiveVideo from './LiveVideo';
import AlarmSetting from './AlarmSetting';
import AutoSetting from './AutoSetting';
import CageUpdateModal from 'components/CageDatail/CageUpdateModal';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'
import style from 'styles/CageDetail/CageDetail.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'


export default function CageDeatil():JSX.Element {
  // 상태정보 변수에 할당
  const cageId = Number(useParams().cageId);
  const myCage = myCagesStore(state => (state.cages)).find((cage) => (cage.cageId === cageId));
  const setIsLoading = nowLoadingStore(state => state.setIsLoading);

  // 케이지 정보 수정 모달
  const [modalShow, setModalShow] = useState(false); 

  // 케이지 연동 정보 로드 함수
  // + broker에 커넥트
  const setAnimals = myAnimalStore(state => state.setAnimals)
  const setAutoSetting = autoSettingStore(state => state.setSetting)
  const setAlarmSetting = alarmSettingStore(state => state.setSetting)
  const loadInfos = async() => {
    setIsLoading(true)
    try {
      // 동물 정보 db에서 가져오기
      const animalInfos = await axiosAnimal(`${cageId}/animals`, "GET")
      setAnimals(animalInfos)
      // 자동화 세팅 db에서 가져오기
      const settingInfos = await axiosAuto(`${cageId}/setting`, "GET")
      setAutoSetting(settingInfos)
      // 알람세팅 db에서 가져오기
      const alarmInfos = await axiosAlarm(`alarm/cage/${cageId}`, "GET")
      setAlarmSetting(alarmInfos)
    }
    catch {
      // 오류 처리
    }
    finally {
      setIsLoading(false)
    }
  }

  // db 로드 함수 모두 실행
  useEffect(() => {
    loadInfos();
  },[])

  // 페이지 렌더링
  return (
    <>
    {/* 케이지 이름 밑 수정 버튼 */}
    <div className={style.cageName}>
      <span>{myCage?.cage_name}</span>
      <div className={style.edit}>
        <FontAwesomeIcon icon={faPencil} onClick={() => setModalShow(!modalShow)}/>
      </div>
    </div>
    {/* 주요 페이지 내용 */}
    <CageUpdateModal modalShow={modalShow} setModalShow={setModalShow} cageInfo={myCage}/>
    <Routes>
      <Route path='/' element={<CageInfo/>}></Route>
      <Route path='/LiveVideo' element={<LiveVideo/>}></Route>
      <Route path='/AutoSetting' element={<AutoSetting/>}></Route>
      <Route path='/AlarmSetting' element={<AlarmSetting/>}></Route>
      <Route path='/AnimalList' element={<AnimalList/>}></Route>
      <Route path='/AddAnimal' element={<AddAnimal/>}></Route>
      <Route path='/AnimalDetail/:animalId' element={<AnimalDetail/>}></Route>
    </Routes>
    </>
  )
}

