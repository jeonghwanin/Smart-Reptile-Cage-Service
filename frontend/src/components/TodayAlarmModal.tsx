// 상태정보 
import { warningAlarmStore } from 'store/myExtraStore';
// 스타일 import
import style from 'styles/Header.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function TodayAlarmModal({show, handleClose}:{show:boolean, handleClose:Function}):JSX.Element {
  // 경고창 알람 상태정보
  const warnings = warningAlarmStore(state => state.warnings)
  const cleanWarnings = warningAlarmStore(state => state.cleanWarnings)

  return (
    <>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title className={`${style.modalTitle}`}>경고 알람</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { warnings.map((warning, index) => (
            <div key={index} className={`${style.warningText}`}>{warning}</div>
          ))
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => cleanWarnings()}>
            초기화
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}