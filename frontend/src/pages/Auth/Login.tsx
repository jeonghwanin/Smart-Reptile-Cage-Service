// 훅 import
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosAuth } from 'constants/AxiosFunc';
import { loginRequest } from 'constants/AuthFunc';
// 상태정보 import
import { userInfoStore } from 'store/userInfoStore';
// 컴포넌트 import
import { SignUpText, SignUpPassword } from "components/Auth/SignUpInput";
// 스태틱 데이터 import
import reptile01 from 'assets/retile01.png'
// 스타일 import
import style from 'styles/Auth/Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// 로그인 페이지
export default function Login():JSX.Element {
  // 유저 정보값들
  const id = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);

  // 경고메세지
  const [idWarning, setIdWarning] = useState("");
  const [pwWarning, setpwWarning] = useState("");

  // 로그인
  const setUserInfo = userInfoStore(state => state.setUserInfo)
  const handleLogin = async() => {
    // 경고메시지 초기화
    setIdWarning("");
    setpwWarning("");
    // 아이디 입력 확인 
    if (!id.current?.value) {
      setIdWarning("아이디를 입력해주세요");
      id.current?.focus();
      return
    }
    // 비밀번호 입력 확인
    if (!pw.current?.value) {
      setpwWarning("비밀번호를 입력해주세요");
      pw.current?.focus();
      return
    }
    // 존재하는 아이디인지 검증
    const userIdExist = await axiosAuth(`user/join/${id.current?.value}`, "GET");
    if (userIdExist === 0) {
      setIdWarning("존재하지 않는 아이디입니다");
      id.current?.focus();
      return
    }
    const userInfo = await loginRequest(id.current.value, pw.current.value)
    if (!userInfo) {
      setpwWarning("비밀번호를 확인해주세요");
      pw.current?.focus();
      return
    }
    setUserInfo(userInfo)
  }

  // 페이지 렌더링
  return (
    <div className={style.authForm}>
      <Form className='w-75 h-100 mx-auto d-flex flex-column justify-content-center align-items-center'>
        <img src={reptile01} alt="" className={style.imgSize}/>
        <SignUpText name="아이디" placeholder="아이디 입력" warning={idWarning} ref={id}/>
        <SignUpPassword name="비밀번호" placeholder="비밀번호 입력" warning={pwWarning} ref={pw}/>
        <div className={`${style.textBox}`}>
          <a href="#" className={style.additionalLink}>비밀번호 찾기</a>
          <Link to="/SignUp" className={style.additionalLink}>회원가입</Link>
        </div>
        <Button size="lg" className={style.loginBtn} variant='success' onClick={handleLogin}>로그인</Button>
      </Form>
    </div>
  )
}