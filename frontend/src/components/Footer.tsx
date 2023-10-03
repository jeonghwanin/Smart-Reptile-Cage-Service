// 훅 import
import { Link } from 'react-router-dom';
// 스타일 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faBook, faBabyCarriage } from '@fortawesome/free-solid-svg-icons'
import style from 'styles/Footer.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Footer():JSX.Element {
  // 컴포넌트 렌더링
  return (
    <div className={`${style.Footer} d-flex align-items-center justify-content-center z-3`}>
      <div className='w-100 d-flex align-items-center justify-content-between'>
        <Link to='/'><FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} className={style.footerIcon} /></Link>
        <Link to='/Dictionary'><FontAwesomeIcon icon={faBook} style={{color: "#ffffff",}} className={style.footerIcon}/></Link>
        <Link to='/Cages'><FontAwesomeIcon icon={faBabyCarriage} style={{color: "#ffffff",}} className={style.footerIcon}/></Link>
        <Link to='/MyPage'><FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}} className={style.footerIcon}/></Link>
      </div>
    </div>
  )
}