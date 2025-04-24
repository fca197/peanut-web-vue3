import {type ApsRoomConfig} from "@v/aps/ApsRoomConfig/ApsRoomConfigType.ts";

export interface ApsRoom {
  roomCode: string
  roomName: string
  factoryId: string
  id: string
  configList: ApsRoomConfig[]
}
