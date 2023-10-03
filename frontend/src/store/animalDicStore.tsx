import {create} from 'zustand'
import {persist} from 'zustand/middleware'

export interface dicAnimal {
  spices: string;
  lifespan: string;
  feed: string;
  feed_cycle: string;
  temp: string;
  lighting: string;
  humidity: string;
  environment: string;
  home: string;
  info: string;
  img: string;
  id:number
}

interface animalDic {
  dictionary:Array<dicAnimal>;
  unknown: dicAnimal | null;
  setDictionary: (infos:Array<dicAnimal>) => void;
  setUnknown : (info:dicAnimal) => void;
}

// 케이지별 동물들 
export const animalDicStore = create<animalDic>() 
  (persist(set => ({
      dictionary : [],
      unknown: null,
      setDictionary:(infos:Array<dicAnimal>) => set(
          state => {return {...state, dictionary:infos}}
      ),
      setUnknown:(info:dicAnimal) => set(
        state => {return {...state, unknown:info}}
      )
  }),
  {name:'Dictionary'}
  )
)
