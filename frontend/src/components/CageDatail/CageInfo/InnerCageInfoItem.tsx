// 훅 import 
// 상태 정보 import
// 컴포넌트 import
// 스타일 import
import style from 'styles/CageDetail/CageDetail.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

// props 정의
interface Props {
  live: string | undefined; 
  setting: string | undefined; 
  icon: IconDefinition;
  up:Function; // 세팅 조절 함수(조절값 상승)
  down:Function // 세팅 조절 함수(조절값 하락)
}

// 케이지 환경 개별 컴포넌트
export default function InnerCageInfoItem(props: Props):JSX.Element {
  return (
    <div className={`${style.eachInfoContainer}`}>
      {/* 아이콘 */}
      <FontAwesomeIcon icon={props.icon} style={{ color: "#000000", fontSize:"5vh" }}/>
      {/* 현재값과 세팅값 */}
      <div>
        <div className={`${style.eachInfoText}`}>현재 : {props.live}</div>
        <div className={`${style.eachInfoText}`}>설정 : {props.setting}</div>
      </div>
      {/* 온도 조절 버튼 */}
      <FontAwesomeIcon icon={faCaretUp} style={{ color: "green" , fontSize:"7vh" }} onClick={()=>props.up()}/>
      <FontAwesomeIcon icon={faCaretDown} style={{ color: "red" , fontSize:"7vh" }} onClick={()=>props.down()}/>
    </div>
  )
}