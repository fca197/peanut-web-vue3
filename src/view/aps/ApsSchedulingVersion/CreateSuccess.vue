<template>
  <el-row>
    <CircleCheck style="width: 5em; height: 5em; color: #00bb99;margin: 3% 45% 0 "/>
    <div style="margin-left: 43%; margin-top: 40px; text-align: center ;line-height: 60px">
      <el-button @click="closeTag" size="default" type="primary" icon="Select">
        创建成功，点此返回
      </el-button>
    </div>
  </el-row>
</template>

<script setup lang="ts">

import { useTagsViewStore } from "@/pinia/stores/tags-view.ts";
const props = defineProps({
  id: {
    type: String,
    required: false
  },
  isUpdate: {
    type: Boolean,
    default: false,
    required: false
  },
  saveAfterFun: {
    type: Function,
    required: false
  },
  preStepFun: {
    type: Function,
    required: false
  }
})
const router = useRouter()
const tagsViewStore = useTagsViewStore()
const closeTag = () => {

  tagsViewStore.delVisitedView({
     path:`/aps/CreateScheduling/${props.id}/${props.isUpdate}`
  })
  router.push("/aps/ApsSchedulingVersion")
}
</script>


<style scoped lang="scss">

</style>