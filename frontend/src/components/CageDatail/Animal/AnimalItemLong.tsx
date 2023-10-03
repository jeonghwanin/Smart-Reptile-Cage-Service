// 훅 import
import { useNavigate } from 'react-router-dom';
import { getAge } from 'constants/CommonFunc';
// 상태정보 import
import { Animal } from 'store/myAnimalStore';
import { animalDicStore } from 'store/animalDicStore';
// 스타일 import
import style from 'styles/CageDetail/AnimalList.module.css'

export default function AnimalItemLong({animal}: {animal:Animal}):JSX.Element {
  // 동물 상세보기로 이동
  const navigate = useNavigate();
  const handleDetail = (animalId:number):void => {
    navigate(`../AnimalDetail/${animalId}`)
  }

  // 사전정보, 이미지 불러오기
  const dictInfos = animalDicStore(state => state.dictionary)
  const dictInfo = dictInfos.find(info => info.id === animal.dict_id)
  const imgUrl  = process.env.PUBLIC_URL+`/images/${animal.photo}`

  return (
    <div className={`${style.animalContainer}`} onClick={() => handleDetail(animal.id)}>
      <div className={`${style.imgContainer}`}>
        <img src={imgUrl} alt="" className={style.image}/>
      </div>
      <div className={`${style.textContainer}`}>
        <p className={`${style.animalName}`}>{animal.name}</p>
        <div className={`${style.animalInfo}`}>
          <span className={`${style.animalText}`}>{dictInfo?.spices}</span>
          <span className={`${style.animalText}`}>{getAge(animal.birth)}살</span>
        </div>
      </div>
    </div>
  )
}