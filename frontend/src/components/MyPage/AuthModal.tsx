// 훅|함수 import
import { useEffect, useState, useRef  } from "react";
import { axiosAuth } from "constants/AxiosFunc";
import { checkPassword } from "constants/AuthFunc";
// 상태정보 import
import { userInfoStore } from "store/userInfoStore";
// 컴포넌트 import
// 스타일 import
import style from "styles/MyPage.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface Props {
  show:boolean;
  authAction:number;
  close:Function
}

export default function AuthModal({show, authAction, close}:Props):JSX.Element {
  // 상태정보 들고오기
  const userInfo = userInfoStore(state => state.user);
  const setUserInfo = userInfoStore(state => state.setUserInfo);
  const deleteUserInfo = userInfoStore(state => state.deleteUserInfo)

  // 변수 선언
  const actionList = ["닉네임 수정", "비밀번호 수정", "회원 탈퇴"];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pw1 = useRef<HTMLInputElement>(null);
  const pw2 = useRef<HTMLInputElement>(null);
  const pw3 = useRef<HTMLInputElement>(null);
  const nick = useRef<HTMLInputElement>(null);

  // 경고메시지
  const [pw1Warning, setPw1Warning] = useState("");
  const [pw2Warning, setPw2Warning] = useState("");
  const [pw3Warning, setPw3Warning] = useState("");
  const [nickWarning, setNickWarning] = useState("");
  
  // 모달창 오픈시 변수들 초기화
  useEffect(() => {
    setIsAuthenticated(false);
    if (pw1.current) {
      pw1.current.value = "";
    }
    if (pw2.current) {
      pw2.current.value = "";
    }
    if (pw3.current) {
      pw3.current.value = "";
    }
    if (nick.current) {
      nick.current.value = "";
    }
  }, [show])
  
  // 현재 비밀번호 검증 함수
  const AuthPassword = async() => {
    try {
      // 경고메시지 초기화
      setPw1Warning("");
      setPw2Warning("");
      setPw3Warning("");
      setNickWarning("");
      // 로그인 기능를 통해 비밀번호 검증
      const loginInfo = {userId: userInfo.userId, password: pw1.current?.value}
      const isValid = await axiosAuth("user/login", "POST", loginInfo)
      return true
    }
    catch {
      return false
    }
  }

  // 닉네임 수정 함수
  const updateNick = async() => {
    try {
      const isValid = await AuthPassword();
      if (!isValid) {
        pw1.current?.focus();
        setPw1Warning("비밀번호가 틀립니다!")
      } else if (!nick.current?.value) {
        setNickWarning("닉네임을 입력해주세요.")
        nick.current?.focus();
      } else {
        userInfo.nickname = nick.current?.value;
        userInfo.password = pw1.current?.value;
        const updatedInfo =  await axiosAuth(`user/${userInfo.id}`, "PUT", userInfo);
        setUserInfo(updatedInfo);
        close();
      }
    }
    catch{
    }
  }
  
  // 비밀번호 수정 함수
  const updatePw = async() => {
    try {
      const isValid = await AuthPassword();
      if (!isValid) {
        pw1.current?.focus();
        setPw1Warning("비밀번호가 틀립니다!")
      } else if (!checkPassword(pw2.current?.value)) {
        setPw2Warning("8~16글자의 영어, 숫자 조합을 입력해주세요.")
        pw2.current?.focus();
      } else if (pw2.current?.value !== pw3.current?.value) {
        setPw3Warning("변경할 비밀번호를 확인해주세요")
        pw2.current?.focus();
      } else {
        userInfo.password = pw2.current?.value;
        const updatedInfo =  await axiosAuth(`user/${userInfo.id}`, "PUT", userInfo);
        setUserInfo(updatedInfo);
        close();
      }
    }
    catch{
    }
  }

    // 회원 탈퇴 함수
  const deleteUser = async() => {
    try {
      const isValid = await AuthPassword();
      if (!isValid) {
        pw1.current?.focus();
        setPw1Warning("비밀번호가 틀립니다!")
      } else {
        const updatedInfo =  await axiosAuth(`user/${userInfo.id}`, "DELETE");
        deleteUserInfo();
      }
    }
    catch{
    }
  }

  return (
    <Modal
      show={show}
      onHide={() => close()}
      backdrop="static"
      keyboard={false}
    >
      {/* 제목 영역 */}
      <Modal.Header closeButton>
        <Modal.Title className={`${style.actionName}`}>{actionList[authAction]}</Modal.Title>
      </Modal.Header>
      {/* 입력 영역 */}
      <Modal.Body>
        <input type="password" className={`${style.modalInput}`} placeholder="현재 비밀번호 입력" ref={pw1}/>
        <p className={`${style.warning}`}>{pw1Warning}</p>
        { authAction === 0 &&
          <>
            <input type="text" className={`${style.modalInput}`} placeholder="변경할 닉네임 입력" ref={nick}/>
            <p className={`${style.warning}`}>{nickWarning}</p>
          </> 
        }
        { authAction === 1 && 
          <>
            <input type="password" className={`${style.modalInput}`} placeholder="변경할 비밀번호 입력" ref={pw2}/>
            <p className={`${style.warning}`}>{pw2Warning}</p>
            <input type="password" className={`${style.modalInput}`} placeholder="변경할 비밀번호 확인" ref={pw3}/>
            <p className={`${style.warning}`}>{pw3Warning}</p>
          </>
        }
      </Modal.Body>
      {/* 버튼 영역 */}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => close()}>
          닫기
        </Button>
        {authAction === 0 && <Button variant="primary" onClick={updateNick}>수정</Button>}
        {authAction === 1 && <Button variant="primary" onClick={updatePw}>변경</Button>}
        {authAction === 2 && <Button variant="danger" onClick={deleteUser}>삭제</Button>}
      </Modal.Footer>
    </Modal>
  )
}