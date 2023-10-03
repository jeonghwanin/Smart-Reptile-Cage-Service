import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// 로그인 유저 정보 정의
export interface User {
  id: number;
  userId: string | undefined;
  password: string | undefined,
  nickname: string;
  number: string;
};

// 상태 정보 정의
export interface userInfoState {
  user: User,
  isLoggedIn : boolean
  setUserInfo: (userData:User) => void;
  deleteUserInfo: () => void;
};

// 로그인 유저 상태 정보
export const userInfoStore = create<userInfoState>()(
    persist(
    set => ({
      // 기본 유저 정보
      user: { 
        id: 0,
        userId: "",
        password: "",
        nickname: "",
        number: "",
      },
      isLoggedIn: false,
      // 로그인 메서드
      setUserInfo: (user) => set((state) => ({
        ...state,
        user: user,
        isLoggedIn: true
      })),
      // 로그아웃 메서드
      deleteUserInfo: () => set((state) => 
      { 
        localStorage.clear();
        sessionStorage.clear();
        return {
        ...state,
        user: {
          id:0,
          userId:"",
          password: "",
          nickname:"",
          number:"",
        },
        isLoggedIn: false
      }})
    }),
    // 로컬스토리지 저장 옵션
    {name: "userInfo", 
    partialize: (state) => ({
      user: {
        id: state.user.id,
        userId: state.user.userId,
        nickname: state.user.nickname,
        number: state.user.number,
      },
      isLoggedIn: state.isLoggedIn
    })
    }
  )
)



