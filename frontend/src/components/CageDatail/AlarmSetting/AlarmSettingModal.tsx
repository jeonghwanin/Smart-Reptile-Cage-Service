// 훅 import
import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { axiosAlarm } from 'constants/AxiosFunc';
// 상태정보 import
import { alarmSetting, alarmSettingStore } from 'store/mySettingStore';
// 컴포넌트 import
import AddBtn from 'components/Shared/AddBtn';
// 스타일 import
import style from 'styles/CageDetail/CageSetting.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin, faCirclePlay, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

export default function AlarmSettingModal(props:{modalShow:boolean, handleClose:Function, settingInfo:null|alarmSetting}) {
  // params
  const cageId = Number(useParams().cageId);
  const settingInfo = props.settingInfo

  // 날짜형식 맞추기
  const [startDate, setstartDate] = useState<string | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (settingInfo) {
      const dateProps = new Date(settingInfo.recent);
      const year = dateProps.getFullYear();
      const month = ("0" + (dateProps.getMonth()+1)).slice(-2);
      const day = ( "0" + dateProps.getDate()).slice(-2);
      const hour = ( "0" + dateProps.getHours()).slice(-2);
      const minute = ( "0" + dateProps.getMinutes()).slice(-2);
      setstartDate(`${year}-${month}-${day}`);
      setStartTime(`${hour}:${minute}`);
    }
  }, [settingInfo])
  
  // 입력값들
  const name = useRef<HTMLInputElement>(null);
  const dayCycle = useRef<HTMLInputElement>(null);
  const hourCycle = useRef<HTMLInputElement>(null);
  const minuteCycle = useRef<HTMLInputElement>(null);
  const dayStart = useRef<HTMLInputElement>(null);
  const timeStart = useRef<HTMLInputElement>(null);

  // 알람 세팅 추가하기 or 수정하기
  const addSetting = alarmSettingStore(state => state.addSetting)
  const updateSetting = alarmSettingStore(state => state.updateSetting)
  const HandleAlarm = async() => {
    // 주기 구하기
    const dayCycleValue:number = parseInt(dayCycle.current?.value || "0", 10);
    const hourCycleValue:number = parseInt(hourCycle.current?.value || "0", 10);
    const minuteCycleValue:number = parseInt(minuteCycle.current?.value || "0", 10);
    const cycle:number = dayCycleValue * 1440 + hourCycleValue * 60 + minuteCycleValue;
    // 입력값 확인
    if (! name.current?.value) {
      name.current?.focus();
    } else if (! cycle ) {
      minuteCycle.current?.focus()
    } else if (! dayStart.current?.value) {
      dayStart.current?.focus();
    } else if (! timeStart.current?.value) {
      timeStart.current?.focus();
    }
    // 입력값이 유효하면 함수 실행
    else { 
      const dateTime = new Date(`${dayStart.current?.value} ${timeStart.current?.value}`);
      const today = new Date();
      // 알람 시작이 현재 시각 이후인지 확인
      if (dateTime < today) {
        alert("시작 시간이 현재 시간보다 빠릅니다!");
        return
      }
      try {
        const AlarmInfo = {
          cageId: cageId,
          name: name.current?.value,
          cycle : cycle,
          recent : dateTime,
        }
        // 알람 추가
        if (settingInfo === null) {
          const addedSetting = await axiosAlarm("alarm", "POST", AlarmInfo);
          addSetting(addedSetting)
        }
        // 알람 수정하기
        else if (settingInfo !== null) {
          const updatedSetting = await axiosAlarm(`alarm/${settingInfo.arm_id}`, "PUT", AlarmInfo);
          updateSetting(updatedSetting)
        }
        // 알람창 종료
        props.handleClose();
      }
      catch {
      }
    }
  }

  return (
    <>
      <Modal show={props.modalShow} onHide={() => props.handleClose()} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className={`${style.modalTitle}`}>
            {settingInfo? "세팅 수정하기" : "세팅 추가하기"}
          </Modal.Title>
          <Button variant="secondary" onClick={() => props.handleClose()}>닫기</Button>
        </Modal.Header>
        <Modal.Body>
          {/* 알람 제목 */}
          <div className={`${style.alarmContentBox}`}>
            <h3 className={`${style.contentTitle}`}>
              <span>알람 제목</span>
              <FontAwesomeIcon icon={faCircleQuestion} />
            </h3>
            {/* 알람 제목 input */}
            <input type="text" className={`${style.inputShared}`} ref={name} 
            defaultValue={settingInfo ? settingInfo.name : ''}/>
          </div>
          <hr />
          {/* 알람 주기 */}
          <div className={`${style.alarmContentBox}`}>
            <h3 className={`${style.contentTitle}`}>
              <span>알람 주기</span>
              <FontAwesomeIcon icon={faArrowsSpin} />
            </h3>
            <div className={`${style.alarmInputBox}`}>
              {/* 일주기 input*/}
              <input type="number" placeholder="일" ref={dayCycle}
              defaultValue={settingInfo ? Math.floor(settingInfo.cycle/1440) : undefined}
              className={`${style.cycleInput} ${style.inputShared}`} />
              {/* 시간주기 input*/}
              <input type="number" placeholder="시간" ref={hourCycle}
              className={`${style.cycleInput} ${style.inputShared}`} 
              defaultValue={settingInfo ? Math.floor((settingInfo.cycle % 1440) / 60) : undefined}/>
              {/* 분주기 input*/}
              <input type="number" placeholder="분" ref={minuteCycle}
              className={`${style.cycleInput} ${style.inputShared}`}
              defaultValue={settingInfo ? settingInfo.cycle % 60 : undefined}/>
            </div>
          </div>
          <hr />
          {/* 알람 시작일 */}
          <div className={`${style.alarmContentBox}`}>
            <h3 className={`${style.contentTitle}`}>
              <span>알람 시작일</span>
              <FontAwesomeIcon icon={faCirclePlay} />
            </h3>
            <div className={`${style.alarmInputBox}`}>
              {/* 날짜 input*/}
              <input type="date" ref={dayStart}
              className={`${style.startInput} ${style.inputShared}`} 
              defaultValue={settingInfo ? startDate : undefined}/>
              {/* 시간 input*/}
              <input type="time"ref={timeStart}
              className={`${style.startInput} ${style.inputShared}`} 
              defaultValue={settingInfo ? startTime : undefined}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <AddBtn feature={HandleAlarm} command={settingInfo? "수정하기" : "추가하기"}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}