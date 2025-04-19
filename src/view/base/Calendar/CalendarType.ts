import {KVEntity} from "@@/utils/common-js.ts";

export interface Calendar {
  factoryId: string
  calendarName: string
  calendarCode: string
  calendarType: string
  calendarDesc: string
  calendarDisabled: boolean
  id: string
}

export const calendarDisabledList: KVEntity[] = [
  {label: "启用", value: false},
  {label: "禁用", value: true}
]
