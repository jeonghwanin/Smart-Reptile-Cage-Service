// 훅 import
import { useNavigate } from 'react-router-dom';
// 상태정보 import
import {dicAnimal} from 'store/animalDicStore'
// 스타일 import
import style from 'styles/Main.module.css'

export default function DicItemBig(props: {index:number, dicIdx:number, item:dicAnimal}):JSX.Element {
  // 이미지 url
  const imgUrl = process.env.PUBLIC_URL+`/images/${props.item.img}`
  // 도감 상세보기로 이동
  const navigate = useNavigate();
  const handleDicDetail = (species:string) => {
    navigate(`/Dictionary/${species}`)
  }
  // 컴포넌트 구성
  return (
    <div className={`${style.dicContent} ${props.index === props.dicIdx? "":"d-none"} col-10`}>
      <img src={imgUrl} alt="" 
      className={`${style.dicImg}`} onClick={() => handleDicDetail(props.item.spices)}/>
      <h3 className={style.dicText}>{props.item.spices}</h3>
    </div>
  )
}