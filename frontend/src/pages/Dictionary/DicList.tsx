// 훅 | 함수 import 
import { useEffect } from 'react'
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
import { animalDicStore } from 'store/animalDicStore'
// 컴포넌트 import
import DicItemShort from 'components/Dictionary/DicItemShort';
// 스타일 import
import style from 'styles/Dictionary/DicList.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function DicList():JSX.Element {
  // 상태 정보 받아오기
  const animalDic = animalDicStore(state => (state.dictionary))

  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("도감 목록");
  }, [])

  // 페이지 렌더링
  return (
    <div className={`row ${style.DicList}`}>
      {animalDic.map((dicItem, index) => (
        <DicItemShort key={index} dicItem={dicItem}/>
      ))}
    </div>
  )
}