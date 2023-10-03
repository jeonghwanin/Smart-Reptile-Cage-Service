// 훅 import
import { useParams } from "react-router-dom"
import { useEffect } from 'react';
// 상태정보 import
import { animalDicStore  } from "store/animalDicStore";
import { nowPageStore } from 'store/myExtraStore';
// 스타일 import
import style from 'styles/Dictionary/DicDetail.module.css'
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function DicDetail():JSX.Element {
  // props 넘겨받기
  const species = useParams().species;
  const dicItemInfo =  animalDicStore(state => state.dictionary).find(item => (item.spices === species));

  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("도감 상세보기");
  }, [])

  // 표시할 정보
  const infoToShow = {
    "수명" : dicItemInfo?.lifespan,
    "서식지": dicItemInfo?.home,
    "먹이" : dicItemInfo?.feed,
    "먹이주기" : dicItemInfo?.feed_cycle,
    "온도" : dicItemInfo?.temp,
    "습도" : dicItemInfo?.humidity,
    "조명" : dicItemInfo?.lighting,
    "주거 환경" : dicItemInfo?.environment,
    "추가 정보" : dicItemInfo?.info,
  }

  // 페이지 렌더링
  return (
    <>
      <div className={`${style.dicImgContainer} ${style.containerBox}`}>
        <p className={`${style.dicSpecies}`}>{dicItemInfo?.spices}</p>
        <img src={process.env.PUBLIC_URL+`/images/${dicItemInfo?.img}`} alt="" className={`${style.dicImg}`}/>
      </div>
      <Accordion className={`${style.containerBox}`}>
        {Object.entries(infoToShow).map((info, index) => (
          <Accordion.Item eventKey={String(index)} key={index} >
            <Accordion.Header className="z-0"><b>{info[0]}</b></Accordion.Header>
            <Accordion.Body className="fw-bold">{info[1]}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  )
}