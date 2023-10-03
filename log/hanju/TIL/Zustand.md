# Zustand 개요

## Zustand란?
zustand는 상태 관리 라이브러리이다. 사용이 간편하며 보일러플레이트 코드 또한 아주 적다는 장점이 있다. context api 를 이용하여 상태 관리를 할 때 발생하는 리렌더링은 context 분리, memoization 등을 통해 해결해야 한다. 반면 zustand를 이용하면 상태 변경 시 불필요한 리렌더링을 쉽게 방지할 수 있고 provider hell 문제 또한 해결할 수 있다.

## Zustand 설치
```cmd
npm i zustand
```
<br>

## zustand 사용법

###  상태 정보를 저장할 변수 생성
```ts
// store/store.ts
import {create} from 'zustand'

interface countState {
  count:number;
  increase: () => void;
  decrease: () => void;
}

export const useStore = create<countState>()(set => ({
  count: 0,
  // 상태 정보 갱신 함수들
  increase: () => set(state => ({count: state.count + 1})),
  decrease: () => set(state => ({count: state.count - 1})),
}))
```

### 컴포넌트에 상태 정보를 받아와 조작
```ts
import { useStore } from '../store/store'

export default function C1(): JSX.Element {
  const countState = useStore();
  return (
    <>
      <div>
        <h2>Component1</h2>
        <button onClick={() => countState.increase()}>+</button>
        <h3>{countState.count}</h3>
      </div>
    </>
  );
}
```

### 상태 정보 Local Storage에 저장
```ts
import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface countState {
  count:number;
  name:string;
  increase: () => void;
  decrease: () => void;
}

export const useStore = create<countState>()(
  // 상태 정보 저장
  persist(
    (set) => ({
      count:0,
      name: "hanju",
      increase: () => set((state) => ({count: state.count + 1})),
      decrease: () => set((state) => ({count: state.count - 1})),
    }),
    {name:'counter'}
  )
)
```