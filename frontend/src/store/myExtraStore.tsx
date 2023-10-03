import {create} from 'zustand'
import {persist} from 'zustand/middleware'

// 현재 페이지
interface nowPageState {
  pageName: string;
  setPage: (nowPage: string) => void;
}

export const nowPageStore = create<nowPageState>()(
  persist(
  set => ({
      pageName: 'Test',
      setPage:(nowPage: string) => set({pageName: nowPage})
    }),
  { name:'pageName'}
  )
)


// 로딩
interface nowLoading {
  isLoading: boolean;
  setIsLoading: (status:boolean) => void;
}

export const nowLoadingStore = create<nowLoading>()(set => ({
  isLoading: false,
  setIsLoading:(status:boolean) => set({isLoading: status})
  }),
)


// 경고메시지
interface warningAlarm {
  warnings: Array<string>;
  addWarnings: (warning:string) => void;
  cleanWarnings: () => void;
}

export const warningAlarmStore = create<warningAlarm>()(persist(
  set =>({
  warnings: [],
  addWarnings: (warning:string) => set((state) => {
    state.warnings.push(warning);
    return {...state}
  }),
  cleanWarnings: () => set({warnings: []})
  }), {name: "warnings"}
))

