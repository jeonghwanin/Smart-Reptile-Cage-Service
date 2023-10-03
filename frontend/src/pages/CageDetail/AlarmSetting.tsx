// 훅 import 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
import { myCagesStore } from 'store/myCageStore';
import { alarmSetting, alarmSettingStore } from 'store/mySettingStore';
// 컴포넌트 import
import AlarmSettingItem from 'components/CageDatail/AlarmSetting/AlarmSettingItem';
import AddBtn from 'components/Shared/AddBtn';
import AlarmSettingModal from 'components/CageDatail/AlarmSetting/AlarmSettingModal';
// 스타일 import

export default function AlarmSetting():JSX.Element {
  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("알람 설정");
  }, [])

  // 상태 정보 + Props 받기
  const cageId = Number(useParams().cageId);
  const myCage = myCagesStore(state => (state.cages)).find((cage) => (cage.cageId === cageId));
  const alarmSettings = alarmSettingStore(state => state.settings)

  // 모달창 컨트롤
  const [modalShow, setModalShow] = useState(false);

  // 수정내용(세팅 추가일시 null)
  const [settingInfo, setSettingInfo] = useState<null|alarmSetting>(null)

  // 세팅 추가창 열기
  const handleAddModal = () => {
    setSettingInfo(null);
    setModalShow(true)
  }

  // 세팅 수정창 열기
  const handleUpdateModal = (settingInfo:alarmSetting) => {
    setSettingInfo(settingInfo);
    setModalShow(true);
  }

  // 모달창 닫기
  const handleClose = ():void => {
    setModalShow(false); 
  };

  return (
    <>
      {alarmSettings.map((alarm) => (
        <AlarmSettingItem setting={alarm} key={alarm.arm_id} showUpdateModal={() => handleUpdateModal(alarm)}/>
      ))}
      <AddBtn feature={handleAddModal}/>
      <AlarmSettingModal modalShow={modalShow} settingInfo={settingInfo} handleClose={() => handleClose()} />
    </>
  )
}