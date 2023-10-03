// 훅 import
import { useEffect, useState  } from 'react';
// 상태정보 import
import { nowPageStore } from 'store/myExtraStore';
// 컴포넌트 import
import AuthModal from 'components/MyPage/AuthModal';
import UserInfoBox from 'components/MyPage/UserInfoBox';
import AuthBtnBox from 'components/MyPage/AuthBtnBox';
// 스타일 import
import style from 'styles/MyPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import backgroundImg from 'assets/background.jpg'


export default function MyPage():JSX.Element {
  // 페이지 명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("마이페이지");
  }, [])

  // 변수 선언
  const [show, setShow] = useState(false);
  const [authAction, setAuthAction] = useState(0)

  // 모달창 끄기 함수
  const handleCloseModal = () => {
    setShow(false)}
  ;
  // 모달창 켜기 함수
  const handleShowModal = (action:number) => {
    setAuthAction(action)
    setShow(true)
  };
    
  // 페이지 렌더링
  return(
    <div className={`${style.totalBox}`}>
      {/* 이미지 영역 */}
      <div className={style.imgContainer}>
        <img src={backgroundImg} alt="" className={style.profileImg}/>
      </div>
      <div className={style.cardContainer}>
        {/* 사용자 정보 영역 */}
        <UserInfoBox/>
        {/* 회원 정보 수정, 탈퇴 영역 */}
        <AuthBtnBox handleShowModal={handleShowModal}/>
      </div>
      {/* 회원 정보 수정 or 삭제 모달 */}
      <AuthModal show={show} authAction={authAction} close={handleCloseModal}/>
    </div>
  )
}