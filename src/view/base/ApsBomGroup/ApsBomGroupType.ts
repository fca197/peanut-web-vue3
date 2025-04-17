import {request} from "@/http/axios"

import {ResultInfo} from "@@/utils/common-js.ts"
import {list2tree} from "@@/utils/listUtils.ts"

export interface ApsBomGroup {
  groupCode: string
  groupName: string
  parentId: string
  pathId: string
  id: string
}

export function queryApsBomGroupTree() {

  return request<ResultInfo>({
    url: "/apsBomGroup/queryPageList",
    method: "post",
    data: {
      queryPage: false
    }
  }).then((r) => {
    const dataList = r.data.dataList

    dataList.push({
      groupName: "顶级",
      parentId: null,
      id: "0"
    })

    const data = list2tree(r.data.dataList, null)
    console.info("list2tree ", data)
    return data
  })
}
