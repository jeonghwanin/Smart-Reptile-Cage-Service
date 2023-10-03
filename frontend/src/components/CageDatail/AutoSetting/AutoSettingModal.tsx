// 훅 import
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosAuto } from 'constants/AxiosFunc';
// 상태 정보 import
import { autoSetting, autoSettingStore } from 'store/mySettingStore';
// 컴포넌트 import
import AddBtn from 'components/Shared/AddBtn';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'
import style from 'styles/CageDetail/CageSetting.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters, faDroplet, faLightbulb } from '@fortawesome/free-solid-svg-icons'

export default function AutoSettingModal(props:{modalShow:boolean, handleClose:Function, settingInfo:null|autoSetting}) {
  // params
  const cageId = Number(useParams().cageId);
  const settingInfo = props.settingInfo

  // 입력값들
  const [useTemp, setUseTemp] = useState(false);
  const [useHum, setUseHum] = useState(false);
  const [useUv, setUseUv] = useState(false);
  const time = useRef<HTMLInputElement>(null);
  const temp = useRef<HTMLInputElement>(null);
  const hum = useRef<HTMLInputElement>(null);
  const uv = useRef<HTMLSelectElement>(null);

  // 경고 문구 / 세팅 사용여부 초기화
  const [warning, setWarning] = useState(false);
  useEffect(() => {
    if (settingInfo) {
      setUseTemp(settingInfo?.set_temp !== null);
      setUseHum(settingInfo?.set_hum !== null);
      setUseUv(settingInfo?.set_uv !== null);
    } else {
      setUseTemp(false);
      setUseHum(false);
      setUseUv(false);
    }
    setWarning(false);
  }, [props.modalShow])

  // 자동화 세팅 추가하기 / 수정하기
  const addSetting = autoSettingStore(state => state.addSetting)
  const updateSetting = autoSettingStore(state => state.updateSetting)
  const HandleAddSetting = async() => {
    const setTemp: number | null = useTemp? Number(temp.current!.value) : null;
    const setHum: number | null = useHum? Number(hum.current!.value) : null;
    const setUv: number | null = useUv? Number(uv.current?.value) : null;
    // 시간 입력 확인
    if (!time.current?.value) {
      time.current?.focus();
      return;
    }
    // 세팅값 하나 이상 입력됐는지 확인
    else if (!useTemp && !useHum && !useUv) {
      setWarning(true);
      return
    }
    // 적절한 온도인지 확인
    else if (setTemp !== null && (setTemp < 10 || setTemp > 50)) {
      temp.current?.focus();
      return
    }
    // 적절한 습도인지 확인
    else if (setHum !== null && (setHum < 0 || setHum > 100)) {
      hum.current?.focus();
      return
    }
    try {
      const timeValue = time.current?.value.split(":")
      const settingInput = {
        cageId: cageId,
        time: `${timeValue[0]}:${timeValue[1]}:00`,
        set_temp: setTemp,
        set_hum: setHum, 
        set_uv: setUv,
      };
      // 세팅 추가
      if (! settingInfo) {
        const addedSetting = await axiosAuto("setting", "POST", settingInput);
        addSetting(addedSetting);
      }
      // 세팅 수정하기
      else {
        const updatedSetting = await axiosAuto(`setting/${settingInfo.set_id}`, "PUT", settingInput);
        updateSetting(updatedSetting);
      }
    }
    catch {
      // 오류 처리
    }
    finally{
      props.handleClose();
    }
  }

  return (
    <>
      <Modal show={props.modalShow} onHide={() => props.handleClose()} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title className={`${style.modalTitle}`}>{settingInfo? "세팅 수정하기" : "세팅 추가하기"}</Modal.Title>
          <Button variant="secondary" onClick={() => props.handleClose()}>닫기</Button>
        </Modal.Header>
        <Modal.Body>
          {/* 시간 입력 */}
          <FloatingLabel controlId="floatingInputGrid" label="시간" className={`${style.inputTime}`}>
            <Form.Control type="time" className={`${style.inputTag}`} ref={time} defaultValue={settingInfo? settingInfo.time : undefined}/>
          </FloatingLabel>
          {/* 온도 입력 */}
          <div className={`${style.inputBox}`}>
            <span className={`${style.iconBox}`} style={{backgroundColor:useTemp?'hotpink':'white'}} onClick={() => setUseTemp(!useTemp)}>
              <FontAwesomeIcon icon={faTemperatureThreeQuarters} color={useTemp? 'white':'grey'}  />
            </span>
            <FloatingLabel controlId="floatingInputGrid" label="온도(10℃~50℃)" 
            className={`${style.inputLabel} ${!useTemp && "invisible"}`}>
              <Form.Control type="number" className={`${style.inputTag}`} ref={temp}
              defaultValue={settingInfo && settingInfo.set_temp !== null? settingInfo.set_temp : undefined}/>
            </FloatingLabel>
          </div>
          {/* 습도 입력 */}
          <div className={`${style.inputBox}`}>
            <span className={`${style.iconBox}`} style={{backgroundColor:useHum?'skyblue':'white'}} onClick={() => setUseHum(!useHum)}>
              <FontAwesomeIcon icon={faDroplet} color={useHum? 'white':'grey'}  />
            </span>
            <FloatingLabel controlId="floatingInputGrid" label="습도(0%~100%)" 
            className={`${style.inputLabel} ${!useHum && "invisible"}`}>
              <Form.Control type="number" className={`${style.inputTag}`} ref={hum}
              defaultValue={settingInfo && settingInfo.set_hum !== null? settingInfo.set_hum : undefined}/>
            </FloatingLabel>
          </div>
          {/* UV등 */}
          <div className={`${style.inputBox}`}>
            <span className={`${style.iconBox}`} style={{backgroundColor:useUv?'gold':'white'}} onClick={() => setUseUv(!useUv)}>
              <FontAwesomeIcon icon={faLightbulb} color={useUv? 'white':'grey'}  />
            </span>
            <FloatingLabel controlId="floatingSelectGrid" label="UV등" 
            className={`${style.inputLabel} ${!useUv && "invisible"}`}>
              <Form.Select aria-label="Floating label select example" className={`${style.inputTag}`} 
              ref={uv} defaultValue={settingInfo && settingInfo.set_uv === 0? "0" : "1"}>
                <option value="1">ON</option>
                <option value="0">OFF</option>
              </Form.Select>
            </FloatingLabel> 
          </div>
          {/* 경고 문구 */}
          <p className={`${style.warningText} ${!warning && "d-none"}`}>하나 이상의 세팅 값을 입력해주세요!</p>
        </Modal.Body>
        {/* 추가 버튼 */}
        <Modal.Footer>
          <AddBtn feature={HandleAddSetting} command={settingInfo? "수정하기" : "추가하기"}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}