// 훅 import 
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { axiosCage } from 'constants/AxiosFunc';
// 상태 정보 import
import { myCage, myCagesStore } from 'store/myCageStore';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'
import style from 'styles/CageDetail/CageDetail.module.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
  modalShow: boolean,
  setModalShow: Function
  cageInfo: myCage|undefined
}

export default function CageUpdateModal({modalShow, setModalShow, cageInfo}:Props):JSX.Element { 
  // 현재 케이지 정보 변수에 할당
  const serialNumber = cageInfo?.snum
  const name = useRef<HTMLInputElement>(null)
  const category = useRef<HTMLSelectElement>(null)

  // 모달창 끄기 함수
  const handleClose = () => {
      setModalShow(false); 
  };

  // 케이지 수정 함수
  const updateCage = myCagesStore(state => state.updateCage);
  const handleUpdate = async() => {
    if (name.current?.value && category.current?.value && cageInfo !== undefined) {
      try {
        // 데이터베이스 수정
        const newInfo = {
          ...cageInfo, 
          cage_name: name.current?.value, 
          category: category.current?.value
        };
        const updatedCageInfo = await axiosCage(`cage/${cageInfo.cageId}`, "PUT", newInfo);
        // // 로컬 스토리지 수정
        updateCage(newInfo);
      }
      catch {
        // 오류 처리
      }
      finally{
        // 완료시 모달창 끄기
        handleClose();
      }
    }
  }

  // 케이지 삭제 함수
  const deleteCage = myCagesStore(state => state.deleteCage);
  const navigate = useNavigate();
  const handleDelete = async() => {
    if (!cageInfo) return
    try {
      // 데이터베이스 수정
      const deletedInfo = await axiosCage(`cage/${cageInfo?.cageId}`, "DELETE");
      // 로컬 스토리지 수정
      deleteCage(cageInfo?.cageId);
    }
    catch {
      // 오류 처리
    }
    finally {
      // 완료시 모달창 종료 후, 메인페이지로 이동
      handleClose();
      navigate('/');
    }
  }

  return (
      <Modal show={modalShow} onHide={handleClose}>
        {/* 타이틀 */}
        <Modal.Header closeButton>
          <Modal.Title className={style.editName}>케이지 정보 수정</Modal.Title>
        </Modal.Header>
        {/* 정보 입력창 */}
        <Modal.Body>
          <div className={`${style.inputContainer}`}>
            <span className={`${style.inputLabel}`}>시리얼넘버 : {serialNumber}</span>
          </div>
          <div className={`${style.inputContainer}`}>
            <label htmlFor="name" className={`${style.inputLabel}`}>케이지 이름</label>
            <input type="text" id="name" className={`${style.inputTage}`}
            ref={name} defaultValue={cageInfo?.cage_name}/>
          </div>
          <div className={`${style.inputContainer}`}>
            <label htmlFor="category" className={`${style.inputLabel}`}>동물 카테고리</label>
            <select id="category" className={`${style.inputTage}`}
            defaultValue={cageInfo?.category} ref={category}>
              <option value="snake">뱀</option>
              <option value="lizard">도마뱀</option>
              <option value="turtle">거북이</option>
            </select>
          </div>
        </Modal.Body>
        {/* 조작 버튼 */}
        <Modal.Footer className={`${style.btnBox}`}>
          <Button variant="primary" onClick={handleUpdate}>
            수정하기
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            케이지 삭제
          </Button>
        </Modal.Footer>
      </Modal>
  )
}