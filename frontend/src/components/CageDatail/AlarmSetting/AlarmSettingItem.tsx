// 훅/함수 import
import { axiosAlarm } from 'constants/AxiosFunc';
import { useEffect, useState } from 'react';
// 상태 정보 import
import { alarmSetting, alarmSettingStore } from 'store/mySettingStore';
// 스타일 import
import style from 'styles/CageDetail/CageSetting.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

// 각 세팅별 컴포넌트
export default function AlarmSettingItem(props:{setting:alarmSetting, showUpdateModal:Function}):JSX.Element {
  // 날짜 형식 맞추기(string타입으로 전달됨)
  const setting:alarmSetting = props.setting
  const recentDate = new Date(setting.recent)

  // 주기 계산(일, 시간, 분 별로)
  const dayCycle:number = Math.floor(setting.cycle / 1440);
  const hourCycle:number = Math.floor((setting.cycle % 1440) / 60)
  const minuteCycle:number = Math.floor(setting.cycle % 60)

  // 오늘 날짜인지 계산
  const [todayAlarm, setTodayAlarm] = useState(false)
  useEffect(() => {
    setTodayAlarm(false)
    const recent = String(recentDate).split(" ");
    const today = String(new Date()).split(" ");
    if (today[1] === recent[1] && today[2] === recent[2] && today[3] === recent[3]) {
      setTodayAlarm(true)
    }
  }, [props.setting])


  // 세팅 삭제
  const deleteSetting = alarmSettingStore(state => state.deleteSetting)
  const handleDelete = async() => {
    try {
      // db에서 삭제
      const deletedStatus = axiosAlarm(`alarm/${setting.arm_id}`, "DELETE");
      // 상태정보에서 삭제
      deleteSetting(setting.arm_id);
    }
    catch {
      // 오류 처리
    }
  }

  // 컴포넌트 렌더링
  return (
    <div className={`${style.settingContainer} ${todayAlarm && style.todayAlarm}`}>
      {/* 상단 부분 */}
      <div className={`${style.topContent}`}>
        {/* 시간 표시 */}
        <h1 className={`${style.setName}`}>{setting.name}</h1>
        {/* 수정, 삭제 버튼 */}
        <div>
          <FontAwesomeIcon icon={faPenToSquare} color="black" className={`${style.operIcon}`} onClick={() => props.showUpdateModal()}/>
          <FontAwesomeIcon icon={faTrash} color="red" className={`${style.operIcon}`} onClick={handleDelete}/>
        </div>
      </div>
      {/* 하단 부분 */}
      <div className={`${style.alarmInfoBox}`}>
        <p className={`${style.alarmInfo}`} >
          <span className={`${style.alarmCategory}`}>알람 주기</span>
          {dayCycle}일 {hourCycle}시간 {minuteCycle}분
        </p>
        <p className={`${style.alarmInfo}`}>
          <span className={`${style.alarmCategory}`}>다음 알람</span>
        {recentDate.toLocaleString().slice(0,-3)}</p>
      </div>
    </div>
  )
}