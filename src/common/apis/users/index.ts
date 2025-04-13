import {request} from "@/http/axios"

export interface Result {
  code: number
  data: ResultInfo
}

export interface ResultInfo {

  userName: string
  loginPhone: string
}

/** 获取当前登录用户详情 */
export function getCurrentUserApi() {
  return request<Result>({
    url: "/loginAccount/getInfo",
    method: "post",
    data: {}
  });
}
