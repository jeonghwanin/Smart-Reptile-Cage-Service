// 훅 import
import { Link } from 'react-router-dom';
// 스타일 hook
import style from 'styles/Main.module.css'

export default function TopBox(props:{name:string, link:string}):JSX.Element {
  return (
    <div className={`${style.containerTop}`}>
      <span>{props.name}</span>
      <Link to={props.link} className={style.noDeco}>목록 보기</Link>
    </div>
  )
}