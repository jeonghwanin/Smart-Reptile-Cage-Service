import {create} from 'zustand'
import {persist} from 'zustand/middleware'

// 개별 동물 정의
export interface Animal {
  id : number;
  cageId : number;
  dict_id : number;
  name : string;
  gender : string;
  birth : Date;
  issue : string|null;
  created_at : Date;
  photo: string;
}

// 케이지별 동물들 리스트 정의
export interface MyAnimal {
  animals: Array<Animal>;
  addAnimal: (animal: Animal) => void;
  updateAnimal: (animal: Animal) => void;
  deleteAnimal: (id: number) => void;
  setAnimals: (animals: Array<Animal>) => void;
}

// 케이지별 동물들 
export const myAnimalStore = create<MyAnimal>() (
  persist(
    set => ({
      animals : [],
      // 동물 추가하기
      addAnimal: (animal: Animal) => {
        set((state) => {
          state.animals.push(animal);
          return {...state}
        })
      },
      // 동물 데이터 업데이트
      updateAnimal: (animal: Animal) => {
        set((state) => {
          // id와 일치하는 동물의 인덱스 탐색
          const animalIndex = state.animals.findIndex(a => a.id === animal.id);
          // id와 일치하는 케이지를 찾지 못한 경우, 현재 상태를 변경하지 않고 반환
          if (animalIndex === -1) {
            return state;
          };
          // 업데이트된 동물를 담는 새로운 배열을 생성
          const updatedAnimals = [...state.animals];
          updatedAnimals[animalIndex] = animal;
          // 업데이트된 animals 배열을 가진 새로운 상태를 반환
          return { ...state, animals: updatedAnimals };
        });
      },
      // 특정 동물 삭제 
      deleteAnimal: (id: number) => {
          set((state) => {
          const updatedAnimals = state.animals.filter(animal => animal.id !== id);
          return { ...state, animals: updatedAnimals };
        });
      },
      // 기존 동물 데이터 입력
      setAnimals: (animals: Array<Animal>) => set(
        state => {return {...state, animals:animals}})
      }),
    {name:'myAnimls'}
  )
)



