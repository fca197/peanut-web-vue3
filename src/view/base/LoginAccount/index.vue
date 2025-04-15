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
        document-title="用户" :add-component="AddEditFormVue" :refresh-list="getDataList"
        :data-table-ref="dataTableRef" :multiple-selection="multipleSelection" ref="tableBarRef"
        data-batch-delete-url="/loginAccount/deleteByIdList"
      />
      <el-table ref="dataTableRef" :data="dataList" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column v-for="h in headerList" :key="h.fieldName" :label="h.showName" :prop="h.fieldName"/>
        <el-table-column fixed="right" label="操作" width="350px">
          <template #default="scope">
            <el-button
              type="warning"
              icon="edit"
              @click="editData(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon="Refresh"
              @click="resetPwd(scope.row)"
            >
              重置密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="paginationDiv">
        <el-pagination
          background
          v-model:current-page="currentPageNum"
          v-model:page-size="currentPageSize"
          :page-sizes="pageSizeAr"
          layout="total, sizes, prev, pager, next"
          :total="tableTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import AddEditFormVue from "./AddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import {postNoResult, postResultInfo} from "@@/utils/common-js.ts";

import {type LoginAccount} from "@/view/base/LoginAccount/Type.ts"

const queryForm = ref({
  loginPhone: undefined
})

const multipleSelection = ref<string []>([])

function handleSelectionChange(val: LoginAccount []) {
  multipleSelection.value = val.map(t => t.id)
  console.info("multipleSelection ", multipleSelection)
}

const dataTableRef = ref({})
const dataList = ref([])
const tableBarRef = ref({})
const headerList = ref([
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

const currentPageNum = ref(1)
const pageSizeAr = ref([1, 2, 3, 4, 5, 6, 7])
const currentPageSize = ref(pageSizeAr.value[0])
const tableTotal = ref(0)

function getDataList() {
  const req = {
    pageSize: currentPageSize.value,
    pageNum: currentPageNum.value
  }
  console.info("getDataList {}", req)
  postResultInfo("/loginAccount/queryPageList", req)
    .then((t) => {
      dataList.value = t.data.records
      tableTotal.value = Number.parseInt(t.data.total)
    })
}

onMounted(() => {
  getDataList()
})

function editData(data: any) {
  // console.info("data ", data)
  tableBarRef.value?.showEditDialog(data.id)
}

function handleSizeChange(val: number) {
  currentPageSize.value = val
  getDataList()
}

function handleCurrentChange(val: number) {
  currentPageNum.value = val
  getDataList()
}

function resetPwd(row) {
  postNoResult("/loginAccount/resetPwd", {
    id: row.id
  }, "修改成功", (t) => {
    const newPwd = t.data.newPwd
    ElMessageBox.alert(`密码为： <span style='font-size: 20px;color: red'>${newPwd}</span>,仅提示一次，请妥善保存`, "密码提示", {
      dangerouslyUseHTMLString: true
    })
  })
}
</script>

<style scoped lang="scss">

</style>
