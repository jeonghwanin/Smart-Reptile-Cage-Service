// 훅 import 
import { Routes, Route } from 'react-router-dom';
// 상태 정보 import
// 컴포넌트 import
import DicList from 'pages/Dictionary/DicList';
import DicDetail from 'pages/Dictionary/DicDetail';
// 스타일 import


export default function Dictionray():JSX.Element {
  // 페이지 렌더링
  return (
    <>
      <Routes>
        <Route path='/' element={<DicList/>}></Route>
        <Route path='/:species' element={<DicDetail/>}></Route>
      </Routes>
    </>
  )
}

