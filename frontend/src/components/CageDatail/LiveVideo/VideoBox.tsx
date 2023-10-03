// 훅|함수 import

// 상태 정보 import
// 스타일 import
import style from 'styles/CageDetail/LiveViedo.module.css'

export default function VideoBox({url}:{url:string}):JSX.Element {
  // 영상 크기 조절 
  const vh = window.innerHeight;

  return (
    // 동영상 컨테이너
    <div className={`${style.videoContainer}`}>
      <iframe src={`https://${url}`} width={0.35*vh} height={0.35*vh} title='liveCage' id="content"></iframe>
    </div>
  )
}