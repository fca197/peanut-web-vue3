import {postResultInfoList} from "@@/utils/common-js.ts";

export interface ApsMachine {
  machineNo: string
  machineName: string
  factoryId: string
  sortIndex: string
  minPower: number | undefined | string
  maxPower: number | undefined | string
  id: string
  machineId?: string | undefined
}

export function queryApsMachineList(factoryId: string) {
  return postResultInfoList("/apsMachine/queryPageList", {
    queryPage: false,
    data: {
      factoryId
    }
  }) as Promise<ApsMachine[]>
}
