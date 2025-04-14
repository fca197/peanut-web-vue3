<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
        <el-form-item label="手机号" prop="loginPhone">
          <el-input v-model="queryForm.loginPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search"> 查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <TableBar
        document-title="用户" :document-url="documentUrl" :add-component="AddEditFormVue" :refresh-list="getDataList"
        :data-table-ref="dataTableRef"
      />
        <el-table ref="dataTableRef" :data="dataList" stripe>
          <el-table-column type="selection"/>
          <el-table-column v-for="h in headerList" :label="h.showName" :prop="h.fieldName"/>
        </el-table>
      <el-row >
        <el-pagination background layout="prev, pager, next" :total="100"/>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import AddEditFormVue from "./AddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import {queryPage} from "@@/utils/common-js.ts";

const queryForm = ref({
  loginPhone: undefined
})

const dataTableRef = ref({});
const documentUrl = ref("/tLoginAccount")
let dataList = ref([])
let headerList = ref([
  {
    showName: "序号",
    fieldName: "id"
  }, {
    showName: "用户名",
    fieldName: "userName"
  }, {
    showName: "手机号",
    fieldName: "loginPhone"
  }
])

const getDataList = () => {
  queryPage("/loginAccount/queryPageList", {pageSize: 10, pageNum: 1})
    .then((t) => {
      // console.info(t)
      dataList.value = t.data.records
    })
}
onMounted(() => {
  getDataList()
})
</script>

<style scoped lang="scss">

</style>
