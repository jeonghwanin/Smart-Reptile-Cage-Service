// 훅 import 
import { useNavigate} from 'react-router-dom';
// 상태 정보 import
import { dicAnimal } from 'store/animalDicStore'
// 스타일 import
import style from 'styles/Dictionary/DicList.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// 각 항목별 컴포넌트
export default function DicItemShort(props: {dicItem:dicAnimal}):JSX.Element {
  // 변수 설정
  const imgUrl:string = process.env.PUBLIC_URL+`/images/${props.dicItem.img}`

  // 항목 상세보기 이동 함수
  const navigate = useNavigate();
  const handleDicDetail = () => {
    navigate(`./${props.dicItem.spices}` )
  }
  
  // 컴포넌트 렌더링
  return (
      <div className={`${style.dicItemContainer}`} onClick={handleDicDetail}>
        <div className={`${style.dicImgContainer}`}>
          <img src={imgUrl} alt="" className={`${style.dicImg}`}/>
        </div>
        <p className={`${style.dicTextContainer}`}>{props.dicItem.spices}</p>
      </div>
  )
}