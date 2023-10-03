import {create} from 'zustand'
import {persist} from 'zustand/middleware'

// 개별 케이지 정의
export interface myCage { 
  id: number,
  cageId : number;
  snum: string;
  cage_name : string;
  set_temp : number;
  set_hum : number;
  set_uv : number;
  created_at : Date; 
  category: string
}

// 케이지들 상태 정보
interface myCages {
  cages : Array<myCage>;
  addCage : (cage:myCage) => void;
  updateCage : (cage:myCage) => void;
  deleteCage : (id:number) => void;
  setCages: (cages:Array<myCage>) => void;
}

export const myCagesStore = create<myCages>() (
  persist(
    set => ({
      cages : [],
      // 케이지 추가
      addCage : (cage:myCage) => {
        set((state) => {
          state.cages.push(cage);
          return {...state}
        })
      },
      // 케이지 정보 업데이트(상태정보, 백엔드 서버)
      updateCage : (cage:myCage) => {
          set((state) => {
            // id와 일치하는 케이지의 인덱스 탐색
            const cageIndex = state.cages.findIndex(c => c.cageId === cage.cageId);
            // id와 일치하는 케이지를 찾지 못한 경우, 현재 상태를 변경하지 않고 반환
            if (cageIndex === -1) {
              return state;
            }
            // 업데이트된 케이지를 담는 새로운 배열을 생성
            const updatedCages = [...state.cages];
            updatedCages[cageIndex] = cage;
            // 업데이트된 cages 배열을 가진 새로운 상태를 반환
            return { ...state, cages: updatedCages };
          });
      },
      // 케이지 정보 삭제
      deleteCage: (id: number) => {
        set((state) => {
          const updatedCages = state.cages.filter(cage => cage.cageId !== id);
          return { ...state, cages: updatedCages };
        });
      },
      // 기존 케이지 데이터 입력
      setCages: (cages:Array<myCage>) => {
        set(state => {return {...state, cages:cages}})
      },
      }),
    {name:'myCages'}
  )
)


// 현재 케이지 환경 정보
interface nowCageValue {
  cageId: number;
  temp : number | null;
  hum : number | null;
  uv : number | null;
  setCageId : (val:number) => void;
  setTemp : (val:number | null) => void;
  setHum : (val:number | null) => void;
  setUv : (val:number | null) => void;
}

export const nowCageValueStore = create<nowCageValue>() (
  persist(
  set => ({
    cageId: 0,
    temp: null,
    hum : null,
    uv : null,
    setCageId : (cageId) => set({ cageId }),
    setTemp : (temp) => set({ temp }),
    setHum : (hum) => set({ hum }),
    setUv : (uv) => set({ uv }),
  }),
  {name:"nowCage"}
  )
)