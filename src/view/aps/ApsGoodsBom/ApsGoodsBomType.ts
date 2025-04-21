import {KVEntity, Result} from "@@/utils/common-js.ts";
import {request} from "@/http/axios.ts";

export interface ApsGoodsBom {
  goodsId: string
  groupId: string
  bomId: string
  bomCode: string
  bomName: string
  bomUsage: string
  bomUnit: string
  bomCostPrice: string
  bomCostPriceUnit: string
  bomUseWorkStation: string
  bomUseExpression: string
  bomInventory: string
  isFollow: false
  factoryId: string
  id: string
}


export const isFollowList: KVEntity [] = [
  {
    label: "是",
    value: true
  },
  {
    label: "否",
    value: false
  }
]

interface CheckRes {
  isSuccess: boolean
}

export function checkBomUseExpressionFun(bomUseExpression: string): Promise<boolean> {
  return request<Result<CheckRes>>({
    url: "/apsGoodsBom/check/bomUseExpression",
    method: "post",
    data: {
      bomUseExpression
    }
  }).then((r) => {
    console.info("bomUseExpression ", bomUseExpression, r)
    return r.data.isSuccess
  })
}
