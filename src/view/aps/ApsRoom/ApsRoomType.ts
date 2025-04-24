import {type ApsRoomConfig} from "@v/aps/ApsRoomConfig/ApsRoomConfigType.ts";
import {request} from "@/http/axios.ts";
import {Result, ResultPageInfo} from "@@/utils/common-js.ts";

export interface ApsRoom {
  roomCode: string
  roomName: string
  factoryId: string
  id: string
  configList: ApsRoomConfig[]
}

export function queryApsRoomList() {
  return request<Result<ResultPageInfo<ApsRoom>>>({
    url: "/apsRoom/queryPageList",
    method: "post",
    data: {
      queryPage: false
    }
  }).then((r) => {
    return r.data.dataList
  })
}
