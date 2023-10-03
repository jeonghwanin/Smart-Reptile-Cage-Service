// 훅 import 
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react'
// 상태 정보 import
import { myAnimalStore } from 'store/myAnimalStore';
import { nowPageStore } from 'store/myExtraStore';
// 컴포넌트 import
import AddBtn from 'components/Shared/AddBtn';
import AnimalItemLong from 'components/CageDatail/Animal/AnimalItemLong';
// 스타일 import
// import style from 'styles/CageDetail/AnimalList.module.css'

export default function AnimalList():JSX.Element {
  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("동물 목록");
  }, [changePage])

  // 상태 정보 + Props 받기
  const cageId = Number(useParams().cageId);
  const myAnimals  = myAnimalStore(state => (state.animals));

  // 동물 상세보기로 이동
  const navigate = useNavigate();

  // 동물 추가하기로 이동
  const handleAddAnimal = ():void => {
    
  }

  return (
    <>
      {/* 동물 리스트 */}
      {myAnimals.map((animal, index) => (
        <AnimalItemLong key={animal.id} animal={animal}/>
      ))}
      {/* 동물 추가하기로 이동 */}
      <AddBtn feature={() => {navigate('../AddAnimal')}} />
    </>
  )
}