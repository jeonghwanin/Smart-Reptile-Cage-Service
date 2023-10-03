// 혹|함수 import
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
// 컴포넌트 import
import TodayAlarmModal from 'components/TodayAlarmModal';
// 스타일 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import style from 'styles/Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Header():JSX.Element {
  // 현재 페이지명을 받아와서 표시
  const [pageName, setPageName] = useState(''); // 페이지명 상태
  useEffect(() => {
    const unsubscribe = nowPageStore.subscribe((state) => {
      setPageName(state.pageName);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // 뒤로 가기 함수
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // -1을 전달하여 뒤로 이동
  };

  // 경고 알람 모달창 조작 
  const [show, setShow] = useState(false);
  const handleClose = ():void => {
    setShow(false)
  }

  // 컴포넌트 렌더링
  return (
    <div className={`${style.Header} z-3`}>
      <TodayAlarmModal show={show} handleClose={handleClose}/>
      <FontAwesomeIcon icon={faArrowLeft} className={style.headerIcon} onClick={handleGoBack}/>
      <h1 className={style.pageName}>{pageName}</h1> 
      <FontAwesomeIcon icon={faBell} className={style.headerIcon} onClick={() => setShow(true)}/>
    </div>
  )
}