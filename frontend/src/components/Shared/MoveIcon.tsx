// 스타일 import
import style from 'styles/Main.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

// 오른쪽 이동
export function MoveIconRight(props:{moveFunc:Function}):JSX.Element {
  return (
    <div className={`col-1 ${style.moveIcon} justify-content-end`}>
      <FontAwesomeIcon icon={faChevronRight} style={{color: "#000000",}} onClick={() => props.moveFunc()}/>
    </div>
  )
}

// 왼쪽 이동
export function MoveIconLeft(props:{moveFunc:Function}):JSX.Element {
  return (
    <div className={`col-1 ${style.moveIcon}`}>
      <FontAwesomeIcon icon={faChevronLeft} style={{color: "#000000",}} onClick={() => props.moveFunc()}/>
    </div>
  )
}