// 훅|함수 import 
import { useEffect } from 'react';
import { axiosCage } from 'constants/AxiosFunc';
import { axiosExtra } from 'constants/AxiosFunc';
// 상태 정보 import
import { animalDicStore, dicAnimal } from 'store/animalDicStore';
import { userInfoStore } from 'store/userInfoStore';
import { nowPageStore, nowLoadingStore } from 'store/myExtraStore';
import { myCagesStore } from 'store/myCageStore';
import { itemStore } from 'store/itemStore'; 
// 컴포넌트 import
import CageBox from 'components/Main/CageBox';
import DictionaryBox from 'components/Main/DicionaryBox';
import ItemBox from 'components/Main/ItemBox';
// 스타일 import

export default function Main():JSX.Element {
  // 상태정보 받기
  const userID = userInfoStore(state => state.user).id
  const setCages = myCagesStore(state => state.setCages)
  const setDictionary = animalDicStore(state => state.setDictionary)
  const setUnknown = animalDicStore(state => state.setUnknown)
  const setItems = itemStore(state => state.setItems)
  const setIsLoading = nowLoadingStore(state => state.setIsLoading);

  // 페이지명 변경
  const changePage = nowPageStore(state => state.setPage);
  useEffect(() => {
    changePage("홈");
  }, [])

  // 데이터를 api를 통해 받아오는 함수
  const loadInfos = async() => {
    try {
      // 로딩창으로 변경
      setIsLoading(true)
      // 케이지 정보 받아오기
      const cageInfos = await axiosCage(`${userID}/cages`, "GET")
      setCages(cageInfos)
      // 사전 정보 받아오기
      const dicInfos:Array<dicAnimal> = await axiosExtra("dicts", "GET")
      const filteredInfos = dicInfos.filter(dic => dic.spices !== "기타")
      const unknown = dicInfos.find(dic => dic.spices === "기타")
      setDictionary(filteredInfos)
      setUnknown(unknown!)
      // 상점 정보 불러오기
      const itemInfos = await axiosExtra("store", "GET")
      setItems(itemInfos)
    }
    catch {
    }
    finally {
      setIsLoading(false)
    }
  }

  // api를 통해 데이터 불러오기
  useEffect(() => {
    loadInfos();
  },[])

  // 페이지 렌더링
  return (
      <> 
        {/* 케이지 보기 컨테이너 */}
        <CageBox/>
        {/* 도감 보기 컨테이너 */}
        <DictionaryBox/>
        {/* 관련 상품 보기 컨테이너 */}
        <ItemBox/>
      </>
  )
}