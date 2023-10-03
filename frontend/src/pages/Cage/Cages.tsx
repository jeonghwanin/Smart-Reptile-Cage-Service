// 훅 import 
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
// 상태 정보 import
import { nowPageStore } from 'store/myExtraStore';
import { userInfoStore, userInfoState } from 'store/userInfoStore';
import { myCage, myCagesStore } from 'store/myCageStore';
// 컴포넌트 import
import CageItemLong from 'components/Cage/CageItemLong';
import AddBtn from 'components/Shared/AddBtn';
// 스타일 import
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Cages():JSX.Element {
  // 상태 정보 받아오기
  const userInfo = userInfoStore();
  const myCages = myCagesStore(state => (state.cages));

  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("케이지 목록");
  }, [])

  // 훅 함수
  const navigate = useNavigate();

  return (
    <div>
      {myCages.map((cage) => (
        <CageItemLong key={cage.cageId} cage={cage}/>
      ))}
      <AddBtn feature={() => navigate('../AddCage')}/>
    </div>
  )
}