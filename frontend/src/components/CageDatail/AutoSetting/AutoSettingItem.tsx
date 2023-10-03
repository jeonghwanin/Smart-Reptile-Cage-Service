// 훅/함수 import
import { axiosAuto } from 'constants/AxiosFunc';
// 상태 정보 import
import { autoSetting, autoSettingStore } from 'store/mySettingStore';
// 스타일 import
import style from 'styles/CageDetail/CageSetting.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faDroplet, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

// 각 세팅별 컴포넌트
export default function AutoSettingItem({setting, showUpdateModal}:{setting:autoSetting, showUpdateModal:Function}):JSX.Element {
  // 시간 표시
  const timeSplit = setting.time.split(":")

  // 세팅 삭제
  const deleteSetting = autoSettingStore(state => state.deleteSetting)
  const handleDelete = async() => {
    try {
      // db에서 삭제
      const deletedStatus = axiosAuto(`setting/${setting.set_id}`, "DELETE");
      // 상태정보에서 삭제
      deleteSetting(setting.set_id);
    }
    catch {
      // 오류 처리
    }
  }

  return (
    <div className={`${style.settingContainer}`}>
      {/* 상단 부분 */}
      <div className={`${style.topContent}`}>
        {/* 시간 표시 */}
        <h1 className={`${style.settingTime}`}>{`${timeSplit[0]}:${timeSplit[1]}`}</h1>
        {/* 수정, 삭제 버튼 */}
        <div>
          <FontAwesomeIcon icon={faPenToSquare} color="black" className={`${style.operIcon}`} onClick={() => showUpdateModal()}/>
          <FontAwesomeIcon icon={faTrash} color="red" className={`${style.operIcon}`} onClick={handleDelete}/>
        </div>
      </div>
      {/* 하단 부분(선택된 옵션은 배경색으로 표시) */}
      <div className={`${style.bottomContent}`}>
        {/* 설정 온도 표시 */}
        <div className={`${style.item} ${setting.set_temp !== null && style.selected}`}>
          <FontAwesomeIcon icon={faTemperatureThreeQuarters} color={setting.set_temp !== null? 'red':'black'} className={`${style.settingIcon}`}/>
          {setting.set_temp? `${setting.set_temp}℃` : ''}
        </div>
        {/* 설정 습도 표시 */}
        <div className={`${style.item} ${setting.set_hum !== null && style.selected}`}>
          <FontAwesomeIcon icon={faDroplet} color={setting.set_hum !== null? 'skyblue':'black'} className={`${style.settingIcon}`}/>
          {setting.set_hum !==null ? `${setting.set_hum}%` : ''}
        </div>
        {/* UV 설정 표시 */}
        <div className={`${style.item} ${setting.set_uv !== null && style.selected}`}>
          <FontAwesomeIcon icon={faLightbulb} color={setting.set_uv === 1? 'peru':'black'} className={`${style.settingIcon}`}/>
          {setting.set_uv === 1 && 'On'}{setting.set_uv === 0 && 'Off'}
        </div>
      </div>
    </div>
  )
}