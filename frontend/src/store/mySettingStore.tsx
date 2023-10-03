import {create} from 'zustand'
import {persist} from 'zustand/middleware'


// 자동화 설정 세팅
export interface autoSetting {
  set_id: number;
  cageId: number;
  time: string;
  set_temp: number | null;
  set_hum: number | null;
  set_uv: number | null;
}

interface autoSettingState {
  settings: Array<autoSetting>;
  addSetting: (setting: autoSetting) => void;
  updateSetting: (setting: autoSetting) => void;
  deleteSetting: (id: number) => void;
  setSetting: (settings: Array<autoSetting>) => void;
}

export const autoSettingStore = create<autoSettingState>()(
  persist(
  set => ({
      settings: [],
      // 세팅 추가
      addSetting: (setting: autoSetting) => {
        set((state) => {
          state.settings.push(setting);
          return {...state}
        })
      },
      // 세팅 수정
      updateSetting: (inputSetting: autoSetting) => {
        set((state) => {
          const settingIndex = state.settings.findIndex(setting => setting.set_id === inputSetting.set_id);
          if (settingIndex === -1) {
            return state;
          }
          const updatedsettings = [...state.settings];
          updatedsettings[settingIndex] = inputSetting;
          return { ...state, settings: updatedsettings };
        });
      },
      // 세팅 삭제
      deleteSetting: (id: number) => {        
        set((state) => {
          const updatedSettings = state.settings.filter(setting => setting.set_id !== id);
          return { ...state, settings: updatedSettings };
        })
      },
      // 기존 세팅 데이터 저장
      setSetting: (settings: Array<autoSetting>) => {
        set(state => {return {...state, settings:settings}})
      },
    }),
  {name:'autoSettings'}
  )
)


// 알람 설정 세팅
export interface alarmSetting {
  arm_id: number;
  cageId: number;
  name: string;
  cycle : number;
  recent : Date;
}

interface alarmSettingState {
  settings: Array<alarmSetting>;
  addSetting: (setting: alarmSetting) => void;
  updateSetting: (setting: alarmSetting) => void;
  deleteSetting: (id: number) => void;
  setSetting: (settings: Array<alarmSetting>) => void;
}

export const alarmSettingStore = create<alarmSettingState>()(
  persist(
  set => ({
      settings: [],
      // 알람 추가
      addSetting: (setting: alarmSetting) => {
        set((state) => {
          state.settings.push(setting);
          return {...state}
        })
      },
      // 알람 수정
      updateSetting: (inputSetting: alarmSetting) => {
        set((state) => {
          const settingIndex = state.settings.findIndex(setting => setting.arm_id === inputSetting.arm_id);
          if (settingIndex === -1) {
            return state;
          }
          const updatedsettings = [...state.settings];
          updatedsettings[settingIndex] = inputSetting;
          return { ...state, settings: updatedsettings };
        });
      },
      // 알람 삭제
      deleteSetting: (id: number) => {
        set((state) => {
          const updatedSettings = state.settings.filter(setting => setting.arm_id !== id);
          return { ...state, settings: updatedSettings };
        })
      },
      // 기존 알람 데이터 저장
      setSetting: (settings: Array<alarmSetting>) => {
        set(state => {return {...state, settings:settings}})
      },
    }),
  {name:'alarmSetting'}
  )
)