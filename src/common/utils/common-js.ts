import {request} from "@/http/axios"

export interface Result {
  code: number
  data: ResultInfo
}

export interface ResultInfo {
  total: number // 总数
  size: number// 页面条数
  current: number // 当前页
  records: [] // 数组
  dataList: [] // 数组
}

/** 增 */
export function save(url: string, data: any, suFun: any) {
  return request<Result>({
    url,
    method: "post",
    data
  }).then((r) => {
    console.info("r ", r)
    if (r.code === 200) {
      ElMessage.success("保存成功")
      if (suFun) {
        suFun(r)
      }
    }
  })
}

export function queryPage(url: string, data: any) {
  return request<Result>({
    url,
    method: "post",
    data
  })
}
