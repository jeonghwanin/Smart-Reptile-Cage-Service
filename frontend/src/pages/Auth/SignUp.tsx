// 훅 import
import {useRef, useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosAuth } from "constants/AxiosFunc";
import { checkPassword, checkNumber, loginRequest } from "constants/AuthFunc";
// 상태정보 import
import { User, userInfoStore } from "store/userInfoStore";
import { nowLoadingStore } from 'store/myExtraStore';
// 컴포넌트 import
import { SignUpText, SignUpPassword } from "components/Auth/SignUpInput";
// 스타일 import
import style from "styles/Auth/Login.module.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

// 회원가입 페이지
export default function SignUp():JSX.Element {
  // 상태정보
  const setUserInfo = userInfoStore(state => state.setUserInfo);
  const setIsLoading = nowLoadingStore(state => state.setIsLoading);
  const navigate = useNavigate();

  // 입력 변수
  const id = useRef<HTMLInputElement>(null);
  const pw1 = useRef<HTMLInputElement>(null);
  const pw2 = useRef<HTMLInputElement>(null);
  const nick = useRef<HTMLInputElement>(null);
  const number = useRef<HTMLInputElement>(null);
  const numberVal = useRef<HTMLInputElement>(null);
  const [numberCode, setNumberCode] = useState(null);
  const [joinInfo, setJoinInfo] = useState<Partial<User>>({userId:"", password:""});

  // 경고 메시지
  const [idWarning, setIdWarning] = useState("");
  const [pw1Warning, setpw1Warning] = useState("");
  const [pw2Warning, setpw2Warning] = useState("");
  const [nickWarning, setnickWarning] = useState("");
  const [numberWarning, setNumberWarning] = useState("");
  const [numberValWarning, setnumberValWarning] = useState("");

  // 경고 메시지 초기화 함수
  const resetWarning = ():void => {
    setIdWarning("");
    setpw1Warning("");
    setpw2Warning("");
    setnickWarning("");
    setNumberWarning("");
    setNumberCode(null);
  }

  // 입력값 검증 함수
  const handleValidation = async() => {
    // 오류메시지 초기화
    resetWarning();
    // 아이디 검증
    if(!id.current?.value || id.current?.value.length < 4){
      setIdWarning("4글자 이상으로 입력해주세요");
      id.current?.focus();
    } else if (!checkPassword(pw1.current?.value)) {
      setpw1Warning("8~16글자의 영어, 숫자 조합을 입력해주세요.");
      pw1.current?.focus();
    } else if (pw1.current?.value !== pw2.current?.value) {
      setpw2Warning("패스워드가 다릅니다!");
      pw2.current?.focus();
    } else if (!nick.current?.value) {
      setnickWarning("닉네임를 입력해주세요.");
      nick.current?.focus();
    } else if (!checkNumber(number.current!.value)) {
      setNumberWarning("-를 빼고 번호만 입력해주세요");
      number.current?.focus();
    } else {
      try {
        // 아이디 중복 검증
        const userIdExist = await axiosAuth(`user/join/${id.current?.value}`, "GET");
        if (userIdExist === 1) {
          setIdWarning("이미 존재하는 아이디입니다.");
          id.current?.focus();
          return
        }
        // 이메일 인증 번호 받기
        setIsLoading(true);  // 로딩창 전환
        const numberInfo = number.current!.value;
        const validCode = await axiosAuth("user/join/sms", "POST", {to : numberInfo})
        const signupData = { 
          userId: id.current?.value,
          password: pw1.current?.value,
          nickname: nick.current?.value,
          number: number.current?.value,
        };
        setNumberCode(validCode);
        setJoinInfo(signupData);
      } catch {
        // 에러 발생
      } finally {
        setIsLoading(false);  // 로딩창 해제
      }
    }
  }

  // 회원등록 및 로그인 함수
  const handleJoin = async() => {
    // 인증 코드가 유효하지 않을 시
    if (Number(numberVal.current?.value) !== numberCode) {
      setnumberValWarning("인증 코드를 다릅니다!")
      numberVal.current?.focus();
      return
    }
    try {
      // 맞으면 회원가입 진행
      const joinedInfo = await axiosAuth("user/join", "POST", joinInfo);
      // 이후 로그인까지 진행
      if(!joinInfo.userId || !joinInfo.password) return;
      const userInfo = await loginRequest(joinInfo.userId, joinInfo.password);
      setUserInfo(userInfo);
    }
    catch {
      // 에러 처리
      alert("이미 등록된 전화번호입니다.")
      navigate('/Login')
    }
  }
  
  // 페이지 렌더링
  return (
    <div className={style.authForm}>
      {!numberCode &&
        <Form className="w-75 h-100 mx-auto d-flex flex-column justify-content-center">
          <SignUpText name="아이디" placeholder="아이디 입력" warning={idWarning} ref={id}/>
          <SignUpPassword name="비밀번호" placeholder="비밀번호 입력" warning={pw1Warning} ref={pw1}/>
          <SignUpPassword name="비밀번호 확인" placeholder="비밀번호 확인" warning={pw2Warning} ref={pw2}/>
          <SignUpText name="닉네임" placeholder="닉네임 입력" warning={nickWarning} ref={nick}/>
          <SignUpText name="전화번호" placeholder="전화번호를 입력" warning={numberWarning} ref={number}/>
          <Link to="/Login" className={style.additionalLink}>이미 계정이 있으신가요?</Link>
          <Button size="lg" className={style.loginBtn} variant='success' onClick={handleValidation}>회원가입</Button>
        </Form>
      }
      {numberCode &&
        <Form className="w-75 h-100 mx-auto d-flex flex-column justify-content-center">
          <SignUpText name="전화번호 인증" placeholder="전화번호인증" warning={numberValWarning} ref={numberVal}/>
          <Link to="/Login" className={style.additionalLink}>이미 계정이 있으신가요?</Link>
          <Button size="lg" className={style.loginBtn} variant='success' onClick={handleJoin}>회원가입</Button>
        </Form>
      }
    </div>
  )
}