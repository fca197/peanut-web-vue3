import {KVEntity, Result} from "@@/utils/common-js.ts";
import {request} from "@/http/axios.ts";

export interface ApsOrder {
  orderNo: string
  orderRemark: string
  orderStatus: string
  orderTotalPrice: string
  goodsId: string
  reserveAmount: string
  reserveDatetime: string
  finishPayedAmount: string
  finishPayedDatetime: string
  makeFinishDate: string
  actMakeFinishDate: string
  deliveryDate: string
  factoryId: string
  urgencyLevel: string
  schedulingDate: string
  orderNoParent: string
  id: string
}

export interface OrderStatusRes {
  dataList: OrderStatus []
}

export interface OrderStatus {
  code: string
  desc: string
}

export function queryOrderStatusList(): Promise<KVEntity[]> {
  return request<Result<OrderStatusRes>>(
    {
      url: "/apsOrder/statusList",
      method: "post",
      data: {}
    }
  ).then((t) => {
    return t.data.dataList.map<KVEntity>((tt) => {
      const ttt: KVEntity = {
        label: tt.desc,
        value: tt.code
      }
      return ttt
    })
  })
}
