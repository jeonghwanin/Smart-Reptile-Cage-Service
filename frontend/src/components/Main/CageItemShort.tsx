// 함수 import
import { useNavigate } from "react-router-dom";
// 상태정보 import
import { myCage } from "store/myCageStore"
// 스타일 import
import style from 'styles/Main.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function CageItemShort(props:{cage: myCage, index: number, order: number}):JSX.Element {
  // 이미지 주소
  const imgUrl:string = process.env.PUBLIC_URL+`/images/${props.cage.category}.jpg`
  // 클릭하면 케이지 상세페이지로 이동
  const navigate = useNavigate();
  const handleMoveDetail = () => {
    navigate(`/CageDetail/${props.cage.cageId}`)
  }
  // 컴포넌트 구성
  return (
    <>
      <div className={`${Math.floor(props.index / 2) !== props.order ? 'd-none': ''} ${style.cageContent}`} onClick={handleMoveDetail}>
        <img src={imgUrl} className={style.cageImg} alt="..."></img>
        <p className={`my-0 ${style.cageName}`}>{props.cage.cage_name}</p>
      </div>
    </>
  )
}