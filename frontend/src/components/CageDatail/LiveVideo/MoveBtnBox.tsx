// 훅|함수 import 
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { Client, Message } from 'paho-mqtt';
// 상태 정보 import
// 컴포넌트 import
// 스타일 import
import style from 'styles/CageDetail/LiveViedo.module.css'
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretLeft, faCaretRight, faCaretUp, faRoute } from '@fortawesome/free-solid-svg-icons'

export default function MoveBtnBox({moveCamera, handleFollow}:{moveCamera:Function, handleFollow:Function}):JSX.Element {

  // 팔로우버튼 활성화 여부
  const [activated, setActivated] = useState(false);

  return (
    // 카메라 무빙 버튼
    <div className={`${style.btnContainer}`}>
      <div className={`${style.btnRow}`}>   
        <FontAwesomeIcon icon={faCaretUp} onClick={() => {moveCamera("up")}} color="#198754"/>
      </div>
      <div className={`${style.btnRow}`}>
        <FontAwesomeIcon icon={faCaretLeft}  onClick={() => {moveCamera("left")}} color="#198754"/>
        <ToggleButton
          className={`${style.toggleBtn}`}
          id="toggle-check"
          type="checkbox"
          variant="outline-success"
          checked={activated}
          value="1"
          onChange={(e) => setActivated(e.currentTarget.checked)}
        >
          <FontAwesomeIcon icon={faRoute} onClick={() => handleFollow()}/>
        </ToggleButton>
        <FontAwesomeIcon icon={faCaretRight}  onClick={() => {moveCamera("right")}} color="#198754"/>
      </div>
      <div className={`${style.btnRow}`}>
        <FontAwesomeIcon icon={faCaretDown}  onClick={() => {moveCamera("down")}} color="#198754"/>
      </div>
    </div>
  )
}