import {request} from "@/http/axios"
import {getToken} from "@@/utils/cache/cookies.ts";
import {DistrictCode} from "@v/base/DistrictCode/DistrictCodeType.ts";

export interface Result<T> {
  code: number
  data: T
}

export interface HeaderInfo {
  fieldName: string
  showName: string
}

export interface ResultPageInfo<T> {
  total: string // 总数
  size: string// 页面条数
  current: string // 当前页
  records: T [] // 数组
  dataList: T [] // 数组
  headerList: T [] // 数组
}

export interface ResultInfo<T> {
  data: T
}

/** 增 */
export function postNoResult(url: string, data: any, suMsg: string, suFun: (data: any) => void) {
  request<Result<ResultInfo<any>>>({
    url,
    method: "post",
    data
  }).then((r) => {
    console.info("r ", r)
    if (r.code === 200) {
      ElMessage.success(suMsg || "操作成功")
      if (suFun) {
        suFun(r.data)
      }
    }
  })
}

export function postResultInfo(url: string, data: any) {
  return request<Result<ResultPageInfo<any>>>({
    url,
    method: "post",
    data
  })
}

export async function downloadFilePost(reqUrl: string, reqData: any) {
  try {
    reqData = reqData || {}
    reqUrl = `/api/peanut${reqUrl}`
    const token: string = getToken() + ""
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 请求体为 JSON 格式
        "Accept": "application/octet-stream", // 期望响应为二进制流
        "j-token": token
      },
      body: JSON.stringify(reqData) // 将请求数据转换为 JSON 字符串
    })
    ElMessage.info("下载中，请等待")
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    // 提取文件名
    let fileName = "未命名.xlsx"
    const contentDisposition = response.headers.get("Content-Disposition")
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (match != null && match[1]) {
        fileName = match[1].replace(/['"]/g, "")
      }
      if (fileName.indexOf("%") !== -1) {
        fileName = decodeURI(fileName)
      }
    }
    link.href = url
    link.download = fileName
    link.click()
    URL.revokeObjectURL(url)
    ElMessage.success("下载成功")
  } catch (error) {
    ElMessage.error(`文件下载失败,请稍后再试. 错误信息：${error}`)
  }
}

export async function todo(data: any) {
  console.info("todo ", data)
  ElMessage.warning("敬请期待")
}

export async function getById(url: string, id: string) {
  return request<Result<any>>({
    url,
    method: "post",
    data: {
      idList: [id]
    }
  }).then((t) => {
    return t.data.dataList[0]
  })
}

export async function queryAllList(url: string) {
  return request<Result<any>>({
    url,
    method: "post",
    data: {
      queryPage: false
    }
  }).then((t) => {
    return t.data.dataList[0]
  })
}

export interface KVEntity {
  label: string
  value: any
}

interface pinyin4jSzmData {
  str: string
}

export async function pinyin4jSzm(value: string) {
  const data: pinyin4jSzmData = {
    str: value
  }
  return request<Result<any>>({
    url: "/pinyin4j/getSZM",
    method: "post",
    data
  }).then((t) => {
    return t.data.szmUpper
  })
}
