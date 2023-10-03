// 훅 import 
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react"
import { axiosAnimal } from "constants/AxiosFunc";
// 상태 정보 import
import { nowPageStore } from "store/myExtraStore";
import { animalDicStore } from "store/animalDicStore"
import { myAnimalStore } from "store/myAnimalStore";
// 컴포넌트 import
import AddBtn from "components/Shared/AddBtn";
// 스타일 import
import "bootstrap/dist/css/bootstrap.min.css"
import style from "styles/CageDetail/AddAnimal.module.css"
import Dropdown from "react-bootstrap/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export default function AddAnimal():JSX.Element {
  // 전달된 데이터 받기
  const location = useLocation();
  const data = location.state;

  // 페이지명 변경 + 생일 날짜 형식 맞추기
  const changePage = nowPageStore(state => state.setPage);
  const [birthDefault, setBirthDefault] = useState<string | undefined>(undefined);
  useEffect(() => {
    changePage(!data? "동물 추가하기" : "동물 수정하기");
    if (data) {
      const birthProps = new Date(data.birth);
      const year = birthProps.getFullYear();
      const month = ("0" + (birthProps.getMonth()+1)).slice(-2);
      const day = ( "0" + birthProps.getDate()).slice(-2);
      setBirthDefault(`${year}-${month}-${day}`);
    }
  }, [])

  // 상태 정보 Props 로드
  const cageId = Number(useParams().cageId);
  const animalDic = animalDicStore(state => state.dictionary);
  const unknown = animalDicStore(state => state.unknown)
  const dic = !data || data.spices === "기타" ? 
    "기타" : 
    animalDic.find(dic => dic.id === data.dict_id)?.spices

  // 변수명 기록
  const [ dictId, setDictId ] = useState(!data? unknown!.id : data.dict_id);
  const [ species, setspecies ] = useState(dic);
  const [ photo, setanimalImg ] = useState(!data? "Not_Choosed.jpg" : data.photo)
  const [ gender, setGender ] = useState(!data? "Male" : data.gender);
  const name = useRef<HTMLInputElement>(null);
  const birth = useRef<HTMLInputElement>(null);
  const issue = useRef<HTMLInputElement>(null);

  // 도감 선택 함수
  const handleDic = (dic:string, url:string, id:number):void => {
    setspecies(dic);
    setanimalImg(url);
    setDictId(id);
  }

  // 성별 선택
  const MaleIcon = ():JSX.Element => <FontAwesomeIcon icon={faMars} color="blue" />;
  const FemaleIcon = ():JSX.Element => <FontAwesomeIcon icon={faVenus} color="red" />;

  // 동물 추가하기 or 수정하기 함수
  const addAnimal = myAnimalStore(state => state.addAnimal);
  const updateAnimal = myAnimalStore(state => state.updateAnimal);
  const navigate = useNavigate();
  const now = new Date();
  const handleAdd = async() => {
    // 이름이나 연도가 비어있을시 포커스 이동
    if (!name.current?.value) {
      name.current?.focus();
      return;
    } else if (!birth.current?.value ) {
      birth.current?.focus();
      return;
    }
    try {
      // 동물 db에 추가
      const animalnfo = {
        cage_id : cageId,
        dict_id : dictId,
        name : name.current?.value,
        gender : gender,
        birth : new Date(birth.current?.value),
        issue : issue.current? issue.current?.value : null,
        created_at : new Date(),
        photo: photo,
      };
      // 동물 추가하기
      if (!data) {
        const addedAnimal = await axiosAnimal("animal", "POST", animalnfo);
        // 상태정보에 저장하고 동물리스트로 이동
        addAnimal({...addedAnimal, dict_id : dictId})
        navigate("../AnimalList")
      }
      // 동물 수정하기
      else if (data) {
        const updatedAnimal = await axiosAnimal(`animal/${data.id}`, "PUT", animalnfo);
        // 상태정보에 저장하고 동물 상세정보로 이동
        updateAnimal({...updatedAnimal, dict_id : dictId});
        navigate(`../AnimalDetail/${data.id}`)
      }
    }
    catch {

    }
  }

  return (
    <>
      {/* 도감 이미지 표시 */}
      <div className={`${style.cageImgContainer} ${style.boxShadow}`}>
        <img src={process.env.PUBLIC_URL+`/images/${photo}`} alt="" className={style.cageImg}/>
      </div>
      {/* 도감 리스트 드롭다운 */}
      <Dropdown>
        <Dropdown.Toggle variant="light" className={`${style.inputInContainer} ${style.boxShadow} ${style.alignCenter}`} style={{width:"90vw"}}>
          {species}
        </Dropdown.Toggle>
        <Dropdown.Menu className={`${style.dropdownItems}`}>
          {/* 도감에 없는 동물일 경우 */}
          <Dropdown.Item onClick={() => handleDic("기타", "Not_Choosed.jpg", unknown!.id)}>
            기타
          </Dropdown.Item>
          {/* 도감에 있으면 드롭다운에서 선택 */}
          { animalDic.map((dic, index) => (
            <Dropdown.Item key={index} onClick={() => handleDic(dic.spices, dic.img, dic.id)}>
              {dic.spices}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* 동물 이름 + 성별 입력 */}
      <div className={`${style.inputsContainer}`} >
        {/* 성별 */}
        <Dropdown>
          <Dropdown.Toggle variant="light" className={`${style.inputInContainer} ${style.boxShadow}`} style={{width:"15vw"}} >
            {gender === "Male" ? <MaleIcon/> : <FemaleIcon/>}
          </Dropdown.Toggle>
          <Dropdown.Menu className={style.genderItem}>
            <Dropdown.Item onClick={() => setGender("Male")}>
              <MaleIcon/>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setGender("Female")}>
              <FemaleIcon/>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* 이름 */}
        <input type="text" placeholder="동물 이름을 입력해주세요" defaultValue={data? data.name : null}
        className={`${style.inputInContainer} ${style.boxShadow}`} style={{width:"70vw"}} ref={name}/>
      </div>
      {/* 생일 입력 */}
      <div className={`${style.inputsContainer}`} >
        <div className={`${style.inputInContainer}`} style={{width:"15vw"}}>생일</div>
        <input type="date" ref={birth} defaultValue={data? birthDefault : undefined}
        className={`${style.inputInContainer} ${style.boxShadow}`} style={{width:"70vw"}}/>
      </div>
      {/* 특이사항 입력 */}
      <input placeholder="특이사항을 입력해주세요." ref={issue} defaultValue={data? data.issue : null}
      className={`${style.inputInContainer} ${style.issueInput} ${style.boxShadow} ${style.alignCenter}`} />
      {/* 추가버튼 */}
      <AddBtn feature={handleAdd} command={data? "수정하기" : undefined}/>
    </>
  )
}