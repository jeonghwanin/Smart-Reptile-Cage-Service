// 훅 import 
import { useState,useEffect } from 'react'
import { axiosAnimal } from 'constants/AxiosFunc';
// 상태 정보 import
import { myAnimalStore } from 'store/myAnimalStore';
// 컴포넌트 import
import AnimalItemShort from 'components/CageDatail/Animal/AnimalItemShort';
import { MoveIconLeft, MoveIconRight } from 'components/Shared/MoveIcon';
import TopBox from 'components/Shared/TopBox';
// 스타일 import
import style from 'styles/CageDetail/CageDetail.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function AnimalBox({cageId}:{cageId:number}):JSX.Element {
  // 상태정보 저장
  const myAnimals = myAnimalStore(state => state.animals)

  // 상단 동물들 표시 컨트롤
  const [mainCageOrder, setMainCageOrder] = useState(0);
  const handleCageOrder = (move:number):void => {
    const numberAnimal = Math.ceil(myAnimals.length / 2)
    if (numberAnimal !== 0) {
      setMainCageOrder((mainCageOrder + move + numberAnimal) % (numberAnimal))
    }
  }
  
  // 컴포넌트 표시
  return (
    <div className={`${style.animalContainer} ${style.mainContainer}`}>
      {/* 동물 보기 상단바 */}
      <TopBox name='내 파충류들' link='./AnimalList'/>
      {/* 각 동물 정보*/}
      <div className={`row ${style.animalsContent} d-flex `}>
        <MoveIconLeft moveFunc={() => handleCageOrder(-1)}/>
        <div className='d-flex justify-content-center align-items-center col-10 mx-0 px-0 gx-5'>
          {myAnimals.length !== 0 ?
          myAnimals.map((animal, index) => (
            <AnimalItemShort key={animal.id} animal={animal} index={index} order={mainCageOrder}/>
          ))
          : <h1 className={style.noCage}>케이지가 비었어요!</h1> }
        </div>
        <MoveIconRight moveFunc={() => handleCageOrder(1)}/>
      </div>
    </div>
  )
}