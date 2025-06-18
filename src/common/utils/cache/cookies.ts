// 统一处理 Cookie

import { CacheKey } from "@@/constants/cache-key"
import Cookies from "js-cookie"

export function getToken() {
  return Cookies.get(CacheKey.TOKEN)
}

export function setToken(token: string) {
  Cookies.set(CacheKey.TOKEN, token)
}

export function getValue(key: string) {
  return Cookies.get(key);
}

export function setKeyValue(key: string, value: string) {
  Cookies.set(key, value)
}
export function setKeyValueAndTTL(key: string, value: string, lifetime: number) {
  const ti = new Date().getTime() + lifetime
  console.info("setKeyValueAndTTL ", key, " v ", value, " lifetime ", lifetime)
  Cookies.set(key, value, { expires: new Date(ti), path: "/" })
}

export function checkCookiesValue(key: string, ttl: number, fun: () => void) {
  const value = getValue(key);
  if(value === undefined) {
    fun()
    setKeyValueAndTTL(key, "1", ttl)
  }
}

export function removeToken() {
  console.info("删除token")
  Cookies.remove(CacheKey.TOKEN)
}
