import { postResultInfoList } from "@@/utils/common-js.ts";

export interface ApsMachine {
  machineNo: string
  machineName: string
  factoryId: string
  sortIndex: string
  id: string
}
export function queryApsMachineList(factoryId: string) {
  return postResultInfoList("/apsMachine/queryPageList", {
    queryPage: false,
    data: {
      factoryId
    }
  }) as Promise<ApsMachine[]>
}