// 스타일 import
import style from 'styles/LoadingAndFail.module.css'
import reptile01 from 'assets/retile01.png'

export default function WrongAccess():JSX.Element {
    return (
      <div className={`${style.loadingBakcground}`}>
        <div className={`${style.loadingBox}`}>
          <h3 className={`${style.wrongText}`}>잘못된 접근입니다</h3>
          <img src={reptile01} alt="" className={style.loadingImg}/>
        </div>
      </div>
    )
}