import {postResultInfo} from "@@/utils/common-js.ts"

export interface BaseRole {
  roleCode: undefined
  roleName: undefined
  roleGroupId: undefined
  id: string
}

export function getRoleList(): Promise<BaseRole[]> {
  return postResultInfo(`/baseRole/queryPageList`, {
    queryPage: false
  }).then((t) => {
    return t.data.dataList
  })
}
