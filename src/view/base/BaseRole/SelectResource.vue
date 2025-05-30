<template>
  <el-row style="margin-top: 30px" :key="timeKey">

    <el-tree
      :default-checked-keys="selectResourceList"
      :data="allResourceTree"
      node-key="id"
      default-expand-all
      :props="treeProps"
      show-checkbox
      ref="treeRef"
    />
    <div class="addFormBtnRow">

      <el-button @click="cancelForm" type="info" icon="close">
        取消
      </el-button>
      <el-button @click="submitAppForm" type="primary" icon="check">
        确定
      </el-button>
    </div>
  </el-row>
</template>

<script setup lang="ts">

import { listGroupBy, postResultInfoList } from "@@/utils/common-js.ts";
import { list2tree } from "@@/utils/listUtils.ts";

const props = defineProps({
  closeFun: {
    type: Function
  },
  id: {
    type: String
  }

});
const timeKey = ref<string>("")

const timeKeyUpdate = () => {
  timeKey.value = Math.random() + ""
}
const treeProps = {
  label: "treeName",
  children: "children"
}

const selectResourceList = ref<string []>([])
const allResourceTree = ref<any []>([])
const treeRef = ref(null)

const submitAppForm = () => {

}
const cancelForm = () => {
  if(props.closeFun) {
    props.closeFun()
  }
}
onMounted(() => {
  console.info("id ", props.id)
  const ll = [];
  ll.push(postResultInfoList("/baseResource/queryPageList", { queryPage: false }))
  ll.push(postResultInfoList("/baseRoleResource/queryPageList", {
    queryPage: false, data: { roleId: props.id }
  }))
  Promise.all(ll).then(vl => {
    const resourceList = vl[0];
    console.info("vl ", resourceList)
    allResourceTree.value = list2tree(resourceList, "0")
    console.info("allResourceTree ", allResourceTree.value)
  })
})

</script>


<style scoped lang="scss">

</style>