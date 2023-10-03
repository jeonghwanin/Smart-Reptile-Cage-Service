// 훅 import 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
import { autoSetting, autoSettingStore } from 'store/mySettingStore';
// 컴포넌트 import
import AddBtn from 'components/Shared/AddBtn';
import AutoSettingItem from 'components/CageDatail/AutoSetting/AutoSettingItem';
import AutoSettingModal from 'components/CageDatail/AutoSetting/AutoSettingModal';
// 스타일 import

export default function AutoSetting():JSX.Element {
  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("자동화 설정");
  }, [])

  // 상태 정보 + Props 받기
  const cageId = Number(useParams().cageId);
  const autoSettings = autoSettingStore(state => state.settings)

  // 모달창 컨트롤
  const [modalShow, setModalShow] = useState(false);

  // 수정내용(세팅 추가일시 null)
  const [settingInfo, setSettingInfo] = useState<null|autoSetting>(null)

  // 세팅 추가창 열기
  const handleAddModal = () => {
    setSettingInfo(null);
    setModalShow(true)
  }

  // 세팅 수정창 열기
  const handleUpdateModal = (settingInfo:autoSetting) => {
    setSettingInfo(settingInfo);
    setModalShow(true);
  }

  // 모달창 닫기
  const handleClose = ():void => {
    setModalShow(false); 
  };

  return (
    <>
      {autoSettings.map((setting) => (
        <AutoSettingItem key={setting.set_id} setting={setting} showUpdateModal={() => handleUpdateModal(setting)}/>
      ))}
      <AddBtn feature={handleAddModal}/>
      <AutoSettingModal modalShow={modalShow} settingInfo={settingInfo} handleClose={() => handleClose()}/>
    </>
  )
}
