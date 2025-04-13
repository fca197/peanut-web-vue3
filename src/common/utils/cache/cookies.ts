// 统一处理 Cookie

import {CacheKey} from "@@/constants/cache-key"
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

export function removeToken() {
  Cookies.remove(CacheKey.TOKEN)
}
