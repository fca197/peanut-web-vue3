import {postResultInfo} from "@@/utils/common-js.ts";

export interface BaseRoleGroup {
  roleGroupCode: undefined
  roleGroupName: undefined
  id: string
}

export function getRoleGroupList(): Promise<BaseRoleGroup[]> {
  return postResultInfo(`/baseRoleGroup/queryPageList`, {
    queryPage: false
  }).then((t) => {
    return t.data.dataList
  })
}
