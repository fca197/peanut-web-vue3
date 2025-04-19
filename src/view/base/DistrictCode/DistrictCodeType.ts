import {KVEntity} from "@@/utils/common-js.ts";

export interface DistrictCode {
  code: string
  name: string
  parentCode: string
  path: string
  level: number
  id: string
}

export const districtCodeLevel: KVEntity[] = [
  {
    label: "省份",
    value: 1
  },
  {
    label: "城市",
    value: 2
  },
  {
    label: "区县",
    value: 3
  },
]
