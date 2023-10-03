// 훅 import 
import { useNavigate } from 'react-router-dom';
// 상태 정보 import
// 컴포넌트 import
// 스타일 import
import style from 'styles/CageDetail/CageDetail.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faTv, faClock, faBellConcierge } from '@fortawesome/free-solid-svg-icons'


// 세팅 버튼 박스 컴포넌트
export default function SettingBtnBox():JSX.Element {
  return (
    <div className={`${style.btnContainer}`}>
      <SettingBtn link={"./LiveVideo"} feature={"실시간 영상"} icon={faTv} />
      <SettingBtn link={"./AutoSetting"} feature={"자동화 설정"} icon={faClock}/>
      <SettingBtn link={"./AlarmSetting"} feature={"알람 설정"} icon={faBellConcierge}/>
    </div>
  )
}

// 개별 추가 세팅 버튼 컴포넌트
function SettingBtn(props: {link:string, feature:string, icon: IconDefinition}): JSX.Element {
  // 페이지 이동 함수
  const navigate = useNavigate();
  const handleLink = ():void => {
    navigate(props.link)
  }
  // 컴포넌트 렌더링
  return (
    <div className={`${style.settingBtn}`} onClick={handleLink}>
      <FontAwesomeIcon icon={props.icon} style={{fontSize:"5vh"}}/>
      <div style={{fontSize:"1.5vh"}}>{props.feature}</div>
    </div>
  )
}