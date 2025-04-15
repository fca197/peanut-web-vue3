<script lang="ts" setup>

import { downloadFilePost, postNoResult } from "@@/utils/common-js.ts"

const props = defineProps({
  multipleSelection: {
    type: Array,
    default: () => []
  },
  dataBatchDeleteUrl: {
    type: String,
    required: false,
    default: ""
  },
  dataTableRef: {
    type: Object,
    required: true
  },
  documentTitle: {
    type: String,
    required: true
  },
  showAddBtn: {
    type: Boolean,
    default: true
  },
  showDelBtn: {
    type: Boolean,
    default: true
  },
  showRefreshBtn: {
    type: Boolean,
    default: true
  },
  showDownloadBtn: {
    type: Boolean,
    default: true
  },
  downLoadUrl: {
    type: String,
    required: false,
    default: ""
  },
  addBtnFun: {
    type: Function,
    required: false
  },
  saveBeforeFun: {
    type: Function,
    required: false
  },
  refreshList: {
    type: Function,
    required: false
  },
  addComponent: {
    type: Object,
    required: false
  },
  queryDto: {
    type: Object,
    required: false
  }
})

const addDialogShow = ref(false)
const editId = ref<string>("")

const config = ref({
  title: ""
})

function addItem() {
  editId.value = ""
  config.value.title = `添加${props.documentTitle}`
  addDialogShow.value = true
}

function deleteById() {
  if (props.dataBatchDeleteUrl === "") {
    ElMessage.error("请配置删除地址")
    return
  }
  if (props.multipleSelection.length < 1) {
    ElMessage.error("请选择需要删除的对象")
    return
  }
  console.info("dataTableRef.value ", props.multipleSelection)
  ElMessageBox.confirm(`确定需要删除${props.multipleSelection.length}条数据吗？`, "删除提示").then(() => {
    postNoResult(props.dataBatchDeleteUrl, { idList: props.multipleSelection }, "删除成功", () => {
      props.refreshList && props.refreshList()
    })
  })
}

function saveFun() {
  addDialogShow.value = false
  props.refreshList && props.refreshList()
}

function showEditDialog(eId: string) {
  console.info("editId ", eId)
  editId.value = eId
  config.value.title = `修改${props.documentTitle}`
  addDialogShow.value = true
}

function downloadFun() {
  downloadFilePost(props.downLoadUrl, props.queryDto)
}

defineExpose({
  showEditDialog
})
</script>

<template>
  <el-button v-if="props.showAddBtn" type="primary" icon="plus" @click="addItem">
    添加
  </el-button>
  <el-button v-if="props.showDelBtn" type="danger" icon="minus" @click="deleteById">
    删除
  </el-button>
  <el-button v-if="props.showRefreshBtn && props.refreshList" type="info" icon="Refresh" @click="props.refreshList">
    刷新
  </el-button>
  <el-button v-if="props.showDownloadBtn && props.downLoadUrl" type="warning" icon="download" @click="downloadFun">
    下载
  </el-button>
  <slot name="otherBtn" />
  <el-dialog :title="config.title" v-model="addDialogShow" destroy-on-close>
    <component
      :is="props.addComponent" :save-fun="saveFun" :edit-id="editId"
    />
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
