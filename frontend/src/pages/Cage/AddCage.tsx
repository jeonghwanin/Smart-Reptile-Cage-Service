// 훅 import 
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { axiosCage } from "constants/AxiosFunc";
// 상태 정보 import
import { nowPageStore } from "store/myExtraStore";
import { userInfoStore } from "store/userInfoStore";
import { myCage, myCagesStore } from "store/myCageStore";
// 컴포넌트 import
import AddBtn from "components/Shared/AddBtn";
// 스타일 import
import "bootstrap/dist/css/bootstrap.min.css"
import style from "styles/Cage/AddCage.module.css"
import Dropdown from "react-bootstrap/Dropdown"

export default function AddCage():JSX.Element {
  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("케이지 추가하기");
  }, [changePage])

  // 변수명 기록
  const userID = userInfoStore(state => state.user).id
  const [animalToBreed, setAnimalToBreed] = useState("기타");
  const [animalImg, setanimalImg] = useState(process.env.PUBLIC_URL+"/images/Not_Choosed.jpg")
  const [snumWarning, setSnumWarning] = useState("")
  const cageName = useRef<HTMLInputElement>(null);
  const cageSerial = useRef<HTMLInputElement>(null);

  // 동물 이미지 선택
  type AnimalTypes = {
    [key: string]: string;
  };
  const animal_types:AnimalTypes = {"뱀": "snake", "도마뱀": "lizard", "거북이": "turtle", "기타": "Not_Choosed"}
  const chooseAnimal = (animal:string, url:string):void => {
    setAnimalToBreed(animal);
    setanimalImg(process.env.PUBLIC_URL+`/images/${url}.jpg`)
  }

  // 케이지 추가하기 함수
  const addCage = myCagesStore(state => state.addCage)
  const navigate = useNavigate();
  const handleAddCage = async() => {
    if (! cageName.current?.value) {
      cageName.current?.focus();
      return
    }
    if (! cageSerial.current?.value) {
      cageSerial.current?.focus();
      return
    }
    try {
      const cageInput = {
        id: userID,
        cage_name : cageName.current?.value ? cageName.current?.value : `${animalToBreed} 케이지`,
        snum: cageSerial.current?.value,
        set_temp : 25,
        set_hum : 60,
        set_uv : 0,
        created_at : new Date(),
        category: animal_types[animalToBreed]
      }
      const CageInfo = await axiosCage("cage", "POST", cageInput)
      const newCage:myCage = {...cageInput, cageId:CageInfo.cageId}
      addCage(newCage)
      navigate("/Cages")
    }
    catch {
      setSnumWarning("이미 등록된 케이지입니다!")
    }
  }
  
  // 페이지 렌더링
  return(
    <div>
      {/* 케이지에 넣을 동물 이미지 */}
      <div className={`${style.cageImgContainer} ${style.boxShadow}`}>
        <img src={animalImg} alt="" className={style.cageImg}/>
      </div>
      {/* 케이지에 넣을 동물 리스트 드롭다운 */}
      <Dropdown>
        <Dropdown.Toggle variant="light" className={`${style.inputCageInfo} ${style.boxShadow}`}>
          {animalToBreed}
        </Dropdown.Toggle>
        <Dropdown.Menu className={`${style.dropdownItems}`}>
          {
            Object.entries(animal_types).map((animal, index) => (
              <Dropdown.Item key={index} onClick={() => chooseAnimal(animal[0], animal[1])}>
                {animal[0]}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      {/* 케이지 이름 입력 */}
      <input type="text" placeholder="케이지 이름을 입력해주세요." 
      className={`${style.inputCageInfo} ${style.boxShadow}`} ref={cageName}/>
      {/* 케이지 시리얼넘버 입력 */}
      <input type="text" placeholder="시리얼 넘버를 입력해주세요." 
      className={`${style.inputCageInfo} ${style.boxShadow}`} ref={cageSerial}/>
      <p className="text-danger fw-bold">{snumWarning}</p>
      {/* 케이지 추가하기 버튼 */}
      <AddBtn feature={handleAddCage}/>
    </div>
  )
}