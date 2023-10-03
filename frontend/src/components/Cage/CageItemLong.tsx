// 함수 import
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// 상태정보 import
import { myCage } from 'store/myCageStore';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'
import style from 'styles/Cage/Cages.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faDroplet, faLightbulb } from '@fortawesome/free-solid-svg-icons'


export default function CageItemLong(props:{cage:myCage}):JSX.Element {
  // 이미지 변수
  const imgUrl:string = process.env.PUBLIC_URL+`/images/${props.cage.category}.jpg`

  // 클릭하면 케이지 상세페이지로 이동
  const navigate = useNavigate();
  const handleMoveDetail = () => {
    navigate(`/CageDetail/${props.cage.cageId}`)
  }

  // 렌더링
  return (
    <div className={style.cageContainer} onClick={handleMoveDetail}>
      <div className={`${style.imgContainer}`}>
        <img src={imgUrl} alt="" className={style.img}/>
      </div>
      <div className={` ${style.infoContainer}`}>
        <p className={style.cageName}>{props.cage.cage_name}</p>
        <div className={style.cageInfo}>
          <div className={style.eachInfo}>
            <FontAwesomeIcon icon={faTemperatureThreeQuarters} style={{color: "#000000",}} />
            <span> {props.cage.set_temp}</span>
          </div>
          <div className={style.eachInfo}>
            <FontAwesomeIcon icon={faDroplet} style={{color: "#000000",}} />
            <span> {props.cage.set_hum}</span>
          </div>
          <div className={style.eachInfo}>
            <FontAwesomeIcon icon={faLightbulb} style={{color: "#000000",}} />
            <span> {props.cage.set_uv === 0? 'Off' : 'On'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}