import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface item {
    "store_id": number;
    "name": string;
    "itme": string;
    "url": string;
    "price": number;
    "photo": string;
}

interface ItemState {
  items:Array<item>;
  setItems: (infos:Array<item>) => void
}

// 케이지별 동물들 
export const itemStore = create<ItemState>() 
  (persist(set => ({
      items : [],
      setItems:(infos:Array<item>) => set(
          state => {return {...state, items:infos}}
      )
  }),
  {name:'Items'}
  )
)