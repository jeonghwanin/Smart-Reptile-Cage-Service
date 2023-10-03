// 스타일 import
import style from 'styles/LoadingAndFail.module.css'
import reptile01 from 'assets/retile01.png'
import Spinner from 'react-bootstrap/Spinner';

export default function Loading():JSX.Element {
    return (
      <div className={`${style.loadingBakcground}`}>
        <div className={`${style.loadingBox}`}>
          <h3 className={`${style.loadingText}`}>로딩 중...</h3>
          <img src={reptile01} alt="" className={style.loadingImg}/>
          <Spinner animation="border" variant="light" className={`${style.spinner}`}/>
        </div>
      </div>
    )
}