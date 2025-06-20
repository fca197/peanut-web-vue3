<script lang="ts" setup>
import Editor from "./components/Editor.vue"
import { postNoResult, postResultInfo } from "@@/utils/common-js.ts";
import { checkCookiesValue, setKeyValueAndTTL } from "@@/utils/cache/cookies.ts";

const ignoreDbResetKey = ref<string>("ignoreDbReset1")
const ignoreDbResetKeyTTL = ref<number>(1000 * 60 * 30)

onMounted(() => {

  checkCookiesValue(ignoreDbResetKey.value, ignoreDbResetKeyTTL.value, () => {
    postResultInfo("/db/reset/last", {}).then(r => {
      const lastTime = parseInt(r.data.expire)
      console.info("距离还原数据库还剩： ", r.data.remainingTime, lastTime)
      if(lastTime <= 0) {
        openDb()
      } else {
        ElMessage.warning("距离还原数据库还剩： " + r.data.remainingTime)
        setCookiesValue()
      }
    })
  })
})

const openDb = () => {
  ElMessageBox.confirm(
    "是否还原数据库?",
    "警告",
    {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      postNoResult("/db/reset", {}, "还原成功", undefined)
    })
    .catch(() => {
      setCookiesValue()
    })
}
const setCookiesValue = () => {
  setKeyValueAndTTL(ignoreDbResetKey.value, "1", ignoreDbResetKeyTTL.value, false)
}
</script>

<template>
  <component :is="Editor"/>
</template>
