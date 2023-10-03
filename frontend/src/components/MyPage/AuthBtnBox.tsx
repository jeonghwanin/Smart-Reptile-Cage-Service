// 훅 import
// 상태정보 import
// 컴포넌트 import
// 스타일 import
import style from 'styles/MyPage.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function AuthBtnBox({handleShowModal}:{handleShowModal:Function}):JSX.Element {
  // 페이지 렌더링
  return(
    <div className={`${style.farContainer} ${style.btnContainer} row`}>
      <button className={`${style.btn}`} onClick={() => handleShowModal(0)}>
        닉네임 수정
      </button>
      <button className={`${style.btn} col-7`} onClick={() => handleShowModal(1)}>
        비밀번호 변경
      </button>
      <button className={`${style.btn} col-4 bg-danger`} onClick={() => handleShowModal(2)}>
        회원 탈퇴
      </button>
    </div>
  )
}