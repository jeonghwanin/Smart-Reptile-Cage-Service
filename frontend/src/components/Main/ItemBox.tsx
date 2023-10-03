// 훅|함수 import 
import { useEffect, useState } from 'react'
// 상태 정보 import
import { itemStore } from 'store/itemStore'; 
// 컴포넌트 import
import StoreItemBig from './StoreitemBig';
import { MoveIconLeft, MoveIconRight } from 'components/Shared/MoveIcon';
// 스타일 import
import style from 'styles/Main.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ItemBox():JSX.Element {
  // 상태 정보 받아오기
  const items = itemStore(state => (state.items))

  // 도감 표시 컨트롤
  const [itemIdx, setItemIdx] = useState(0);
  const handleItemOrder = (move:number):void => {
    const numbererItem:number = items.length
    setItemIdx((itemIdx + numbererItem + move) % numbererItem)
  }

  // 페이지 렌더링
  return (
      // 관련 상품 보기 컨테이너
      <div className={`${style.mainContainer} ${style.mainShops}`}>
        <div className={`${style.containerTop}`}>
          <span>추천 상품</span>
        </div>
        <div className={style.shopContainer}>
          <MoveIconLeft moveFunc={() => handleItemOrder(-1)}/>
          {items.map((item, index) => (
            <StoreItemBig index={index} itemIdx={itemIdx} item={item} key={item.store_id}/>
            )
          )}
          <MoveIconRight moveFunc={() => handleItemOrder(1)}/>
        </div>
      </div>
  )
}