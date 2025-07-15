import {KVEntity} from "@@/utils/common-js.ts";

export interface ApsOrderFieldShowTemplate {
  apsOrderUserNo?: string | undefined
  apsOrderUserName?: string | undefined
  isDefault?: number | undefined
  apsOrderSaleConfigList?: string | undefined
  apsOrderOrderConfigList?: string | undefined
  apsOrderOrderUserConfigList?: string | undefined
  id?: string | undefined
}
export const isDefaultList: KVEntity[] = [{
  label: "是",
  value: 1
}, {
  label: "否",
  value: 0
}]
