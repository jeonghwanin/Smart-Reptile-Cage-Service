// 훅 import 
import { useState, } from 'react'
// 상태 정보 import
import { animalDicStore } from 'store/animalDicStore';
// 컴포넌트 import
import TopBox from 'components/Shared/TopBox';
import DicItemBig from 'components/Main/DicItemBig';
import { MoveIconLeft, MoveIconRight } from 'components/Shared/MoveIcon';
// 스타일 import
import style from 'styles/Main.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function DictionaryBox():JSX.Element {
  // 상태 정보 저장
  const animalDic = animalDicStore(state => state.dictionary)

  // 도감 표시 컨트롤
  const [dicIdx, setDicIdx] = useState(0);
  const handleDicOrder = (move:number):void => {
    const numberDic:number = animalDic.length
    setDicIdx((dicIdx + numberDic + move) % numberDic)
  }

  return (
    <div className={`${style.mainContainer} ${style.mainDic}`}>
      <TopBox name="파충류 도감" link="/Dictionary"/>
      <div className={`${style.dicContainer} row d-flex`}>
        <MoveIconLeft moveFunc={() => handleDicOrder(-1)}/>
        {animalDic.map((item, index) => (
          <DicItemBig key={index} index={index} dicIdx={dicIdx} item={item}/>
        ))}
        <MoveIconRight moveFunc={() => handleDicOrder(1)}/>
      </div>
    </div>
  )
}