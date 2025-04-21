import {request} from "@/http/axios.ts";
import {Result, ResultPageInfo} from "@@/utils/common-js.ts"

export interface ApsGoods {
  goodsName: string
  goodsRemark: string
  supplierStatus: string
  // 工厂ID
  factoryId: string
  // 工艺路线
  processPathId: string
  // 制造流水线ID produceProcess
  produceProcessId: string
  id: string
}

export function queryGoodsList(): ApsGoods[] {
  return request<Result<ResultPageInfo<ApsGoods>>>(
    {
      url: "/apsGoods/queryPageList",
      method: "post",
      data: {
        queryPage: false
      }
    }
  ).then((r) => {
    return r.data.dataList
  })
}
