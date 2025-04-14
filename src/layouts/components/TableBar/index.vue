<script lang="ts" setup>


const props = defineProps({
  documentUrl: {
    type: String,
    required: true
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
  editComponent: {
    type: Object,
    required: false
  },
  editItemDto: {
    type: Object,
    required: false
  },
  saveUrl: {
    type: String,
    required: false
  }
})

const addDialogShow = ref(false);
const editDialogShow = ref(false);
const config = ref({
  title: ""
})

// const addItemDto = ref({})

const addItem = () => {
  config.value.title = "添加" + props.documentTitle
  addDialogShow.value = true
}
const deleteById = () => {
  console.info("dataTableRef.value ",props.dataTableRef)
}

const saveFun = () => {
  addDialogShow.value = false;
}

</script>

<template>
  <el-button v-if="props.showAddBtn" type="primary" icon="plus" @click="addItem">添加</el-button>
  <el-button v-if="props.showDelBtn" type="danger" icon="minus" @click="deleteById">删除</el-button>
  <el-button v-if="props.showRefreshBtn && props.refreshList" type="info" icon="Refresh" @click="props.refreshList">
    刷新
  </el-button>
  <el-button v-if="props.showDownloadBtn" type="warning" icon="download">下载</el-button>
  <slot name="otherBtn"></slot>
  <el-dialog :title="config.title" v-model="addDialogShow" destroy-on-close>
    <component :is="props.addComponent" v-bind="{
      saveFun: saveFun }"
    />
  </el-dialog>
  <el-dialog :title="config.title" v-model="editDialogShow" destroy-on-close>
    <component :is="props.editComponent"></component>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
