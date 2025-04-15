import {request} from "@/http/axios"

export interface Result<ResultPageInfo> {
  code: number
  data: ResultPageInfo
}

export interface ResultPageInfo {
  total: string // 总数
  size: string// 页面条数
  current: string // 当前页
  records: [] // 数组
  dataList: [] // 数组
}

export interface ResultInfo {
  total: number // 总数
  size: number// 页面条数
  current: number // 当前页
  records: [] // 数组
  dataList: [] // 数组
  data: any
}

/** 增 */
export function postNoResult(url: string, data: any, suMsg: string, suFun: any) {
  request<Result<ResultInfo>>({
    url,
    method: "post",
    data
  }).then((r) => {
    console.info("r ", r)
    if (r.code === 200) {
      ElMessage.success(suMsg || "操作成功")
      if (suFun) {
        suFun(r)
      }
    }
  })
}

export function postResultInfo(url: string, data: any) {
  return request<Result<ResultPageInfo>>({
    url,
    method: "post",
    data
  })
}

export async function downloadFilePost(reqUrl: string, reqData: any) {
  try {
    reqData = reqData || {}
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 请求体为 JSON 格式
        "Accept": "application/octet-stream" // 期望响应为二进制流
      },
      body: JSON.stringify(reqData) // 将请求数据转换为 JSON 字符串
    })
    ElMessage.info("下载中，请等待")
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    // 提取文件名
    let fileName = "data.bin"
    const contentDisposition = response.headers.get("Content-Disposition")
    if (contentDisposition) {
      const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
      if (match != null && match[1]) {
        fileName = match[1].replace(/['"]/g, "")
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
