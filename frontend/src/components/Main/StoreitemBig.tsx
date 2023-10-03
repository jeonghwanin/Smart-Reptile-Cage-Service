// 훅 import
// 상태정보 import
import { item } from 'store/itemStore'; 
// 스타일 import
import style from 'styles/Main.module.css'

export default function StoreItemBig({index, itemIdx, item}: {index: number, itemIdx: number, item: item}):JSX.Element {
  // 이미지 url
  const imgUrl = process.env.PUBLIC_URL+`/images/${item.photo}.jpg`

  // 컴포넌트 구성
  return (
    <div className={`${style.shopContent} ${index === itemIdx? "":"d-none"} col-10`}>
      <img src={imgUrl} alt="" className={`${style.shopImg}`}/>
      <div className={`${style.shopTextBox}`}>
        <a href={item.url} className={`${style.itemName}`}>{item.name}</a>
        <span>{item.price}원</span>
      </div>
    </div>
  )
}