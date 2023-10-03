// 훅|함수 import
import { useNavigate } from 'react-router-dom';
// 상태정보 import
import { userInfoStore } from 'store/userInfoStore';
// 스타일 import
import style from 'styles/MyPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faSpellCheck, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function UserInfoBox():JSX.Element {
  // 상태정보 받아오기
  const user = userInfoStore(state => state.user);
  const deleteUserInfo = userInfoStore(state => state.deleteUserInfo);

  // 로그아웃 함수
  const navigate = useNavigate();
  const handleLogout = ():void => {
    deleteUserInfo();
    navigate('/Login')
  }

  // 페이지 렌더링
  return(
    <div className={style.myInfo}>
      <div className={style.farContainer}>
        <h2 className={style.myName}>{user.userId}</h2>
        <a onClick={handleLogout} className={style.logOut}>
          <FontAwesomeIcon icon={faArrowRightToBracket} rotation={180}/>로그아웃
        </a>
      </div>
      <div className={style.infoContainer}>
        <FontAwesomeIcon icon={faSpellCheck} className={style.infoIcon}/>
          <span className={style.infoText}>{user.nickname}</span>
      </div>
      <div className={style.infoContainer}>
        <FontAwesomeIcon icon={faPhone} className={style.infoIcon}/>
        <span className={style.infoText}>{user.number}</span>
      </div>
    </div>
  )
}