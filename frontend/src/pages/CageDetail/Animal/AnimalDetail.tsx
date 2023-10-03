// 훅 import 
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react'
import { getAge } from 'constants/CommonFunc';
import { axiosAnimal } from 'constants/AxiosFunc';
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
import { animalDicStore } from 'store/animalDicStore'
import { myAnimalStore } from 'store/myAnimalStore';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'
import style from 'styles/CageDetail/AnimalDetail.module.css'
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

export default function AnimalDetail():JSX.Element {
  // 상태정보 및 props 받기
  const animalId:number = Number(useParams().animalId);
  const myAnimals = myAnimalStore(state => state.animals)
  const myAnimal = myAnimals.find((animal) => (animal.id === animalId));
  const birth = new Date(myAnimal? myAnimal?.birth : "");

  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("동물 상세보기");
  }, [])

  // 잘못된 접근이면 동물 리스트로 이동
  useEffect(() => {
  if (! myAnimal) {
    navigate('../AnimalList')
  }
  }, [])

  // 사전정보, 이미지 불러오기
  const dictInfos = animalDicStore(state => state.dictionary)
  const dictInfo = dictInfos.find(info => info.id === myAnimal?.dict_id)
  const imgUrl = process.env.PUBLIC_URL+`/images/${myAnimal?.photo}`

  // 동물 정보 수정창 이동 함수
  const navigate = useNavigate();
  const openUpdateWindow = ():void => {
    navigate('../AddAnimal', {state: myAnimal})
  }

  // 동물 정보 삭제 함수
  const deleteAnimal = myAnimalStore(state => state.deleteAnimal)
  const handleDelete = async() => {
    try {
      // 동물 db에서 삭제
      const deleteStatus = await axiosAnimal(`animal/${myAnimal?.id}`, "DELETE")
      // 상태정보에서 삭제
      deleteAnimal(myAnimal!.id)
    }
    catch {
      // 오류 처리
    }
    finally {
      // 동물 목록보기로 이동
      navigate('../')
    }
  }

  return (
    <>
    {/* 이미지 */}
    <div className={`${style.infoContainer} ${style.imgContainer}`}>
      <img src={imgUrl} alt="" className={`${style.infoImg}`}/>
    </div>
    {/* 기본 정보 */}
    <div className={`${style.infoContainer} ${style.basicInfoContainer}`}>
      {/* 이름, 종, 생일*/}
      <div className={`${style.basicInnerContainer}`}>
        <h1 className={`${style.infoName}`}>{myAnimal?.name}</h1>
        <Link to={`/Dictionary/${dictInfo?.spices}`} className={`${style.infoTextLeft}`}>{dictInfo?.spices}</Link>
        <p className={`${style.infoTextLeft}`}>{birth.toLocaleDateString()}</p>
      </div>
      {/* 성별, 나이 */}
      <div className={`${style.basicInnerContainer}`}>
        <div className={`${style.infoGender}`} style={{backgroundColor: myAnimal?.gender === 'Male' ? 'dodgerblue' : 'deeppink',}}>
          <FontAwesomeIcon icon={myAnimal?.gender === 'Male'? faMars:faVenus} color='white' />
        </div>
        <p className={`${style.infoTextRight}`}>{getAge(birth)}살</p>
      </div>
    </div>
    {/* 이슈 정보 */}
    <Accordion className={`${style.infoContainer}`}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={`z-0`}><b>특이사항</b></Accordion.Header>
        <Accordion.Body className={`fw-bold`}>{myAnimal?.issue}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
    {/* 수정, 삭제 버튼 */}
    <div className={`${style.btnBox}`}>
      <Button variant="primary" className={`${style.btnTag}`} onClick={openUpdateWindow}>수정하기</Button>
      <Button variant="danger" className={`${style.btnTag}`} onClick={handleDelete}>삭제하기</Button>
    </div>
    </>
  )
}