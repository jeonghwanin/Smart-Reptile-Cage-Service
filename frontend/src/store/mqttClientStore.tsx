import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Client } from 'paho-mqtt';

interface mqttClientState {
    client : Client | null;
    setClient : (client:Client) => void; 
}

export const mqttClientStore = create<mqttClientState>() 
  (persist
    (set => ({
      client : new Client("i9a101.p.ssafy.io", 9001, "client"),
      setClient : (client:Client) => set(
        state => {
          console.log(client)
          return {...state, client: client}})
    }),
    {name:'mqttClient'}
  )
)