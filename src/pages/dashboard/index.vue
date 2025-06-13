<script lang="ts" setup>
import { useUserStore } from "@/pinia/stores/user"
import Admin from "./components/Admin.vue"
import Editor from "./components/Editor.vue"
import { postNoResult, postResultInfo } from "@@/utils/common-js.ts";
import Cookies from 'js-cookie';

const userStore = useUserStore()

const isAdmin = userStore.roles.includes("admin")

const ignoreDbResetKey = ref<string>("ignoreDbReset")

onMounted(() => {

  const ignoreDbResetValue = Cookies.get(ignoreDbResetKey.value);
  console.info("ignoreDbResetKey ", ignoreDbResetKey.value, ignoreDbResetValue)
  // openDb()
  if(ignoreDbResetValue === undefined) {
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
  }
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
const  setCookiesValue =() =>{
  const ti = new Date().getTime() + 1000 * 60 * 60 // 1小时有效
  Cookies.set(ignoreDbResetKey.value, "1", { expires: new Date(ti), path: '/' });
}
</script>

<template>
  <component :is="isAdmin ? Admin : Editor"/>
</template>
