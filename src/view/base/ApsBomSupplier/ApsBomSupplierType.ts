import {KVEntity} from "@@/utils/common-js.ts";

export interface ApsBomSupplier {
  bomSupplierName: string
  bomSupplierCode: string
  bomSupplierPhone: string
  bomSupplierTel: string
  bomSupplierEmail: string
  provinceCode: string
  cityCode: string
  areaCode: string
  bomSupplierAddr: string
  bomSupplierRemark: string
  supplierStatus: string
  id: string
}

export const supplierStatusList: KVEntity[] = [
  {
    label: "启用",
    value: 1
  },
  {
    label: "禁用",
    value: 0
  }
]
