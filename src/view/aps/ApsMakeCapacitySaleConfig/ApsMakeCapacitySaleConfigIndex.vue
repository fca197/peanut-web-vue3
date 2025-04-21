<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
        <el-form-item label="${column.comment}" prop="saleConfigId">
          <el-input v-model="queryForm.saleConfigId" clearable placeholder="请输入${column.comment}" />
        </el-form-item>
        <el-form-item label="${column.comment}" prop="makeCapacityQuantity">
          <el-input v-model="queryForm.makeCapacityQuantity" clearable placeholder="请输入${column.comment}" />
        </el-form-item>
        <el-form-item label="${column.comment}" prop="year">
          <el-input v-model="queryForm.year" clearable placeholder="请输入${column.comment}" />
        </el-form-item>
        <el-form-item label="${column.comment}" prop="month">
          <el-input v-model="queryForm.month" clearable placeholder="请输入${column.comment}" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin1">
          <el-input v-model="queryForm.dayMin1" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax1">
          <el-input v-model="queryForm.dayMax1" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin2">
          <el-input v-model="queryForm.dayMin2" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax2">
          <el-input v-model="queryForm.dayMax2" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin3">
          <el-input v-model="queryForm.dayMin3" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax3">
          <el-input v-model="queryForm.dayMax3" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin4">
          <el-input v-model="queryForm.dayMin4" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax4">
          <el-input v-model="queryForm.dayMax4" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin5">
          <el-input v-model="queryForm.dayMin5" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax5">
          <el-input v-model="queryForm.dayMax5" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin6">
          <el-input v-model="queryForm.dayMin6" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax6">
          <el-input v-model="queryForm.dayMax6" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin7">
          <el-input v-model="queryForm.dayMin7" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax7">
          <el-input v-model="queryForm.dayMax7" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin8">
          <el-input v-model="queryForm.dayMin8" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax8">
          <el-input v-model="queryForm.dayMax8" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin9">
          <el-input v-model="queryForm.dayMin9" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax9">
          <el-input v-model="queryForm.dayMax9" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin10">
          <el-input v-model="queryForm.dayMin10" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax10">
          <el-input v-model="queryForm.dayMax10" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin11">
          <el-input v-model="queryForm.dayMin11" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax11">
          <el-input v-model="queryForm.dayMax11" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin12">
          <el-input v-model="queryForm.dayMin12" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax12">
          <el-input v-model="queryForm.dayMax12" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin13">
          <el-input v-model="queryForm.dayMin13" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax13">
          <el-input v-model="queryForm.dayMax13" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin14">
          <el-input v-model="queryForm.dayMin14" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax14">
          <el-input v-model="queryForm.dayMax14" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin15">
          <el-input v-model="queryForm.dayMin15" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax15">
          <el-input v-model="queryForm.dayMax15" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin16">
          <el-input v-model="queryForm.dayMin16" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax16">
          <el-input v-model="queryForm.dayMax16" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin17">
          <el-input v-model="queryForm.dayMin17" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax17">
          <el-input v-model="queryForm.dayMax17" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin18">
          <el-input v-model="queryForm.dayMin18" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax18">
          <el-input v-model="queryForm.dayMax18" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin19">
          <el-input v-model="queryForm.dayMin19" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax19">
          <el-input v-model="queryForm.dayMax19" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin20">
          <el-input v-model="queryForm.dayMin20" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax20">
          <el-input v-model="queryForm.dayMax20" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin21">
          <el-input v-model="queryForm.dayMin21" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax21">
          <el-input v-model="queryForm.dayMax21" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin22">
          <el-input v-model="queryForm.dayMin22" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax22">
          <el-input v-model="queryForm.dayMax22" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin23">
          <el-input v-model="queryForm.dayMin23" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax23">
          <el-input v-model="queryForm.dayMax23" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin24">
          <el-input v-model="queryForm.dayMin24" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax24">
          <el-input v-model="queryForm.dayMax24" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin25">
          <el-input v-model="queryForm.dayMin25" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax25">
          <el-input v-model="queryForm.dayMax25" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin26">
          <el-input v-model="queryForm.dayMin26" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax26">
          <el-input v-model="queryForm.dayMax26" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin27">
          <el-input v-model="queryForm.dayMin27" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax27">
          <el-input v-model="queryForm.dayMax27" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin28">
          <el-input v-model="queryForm.dayMin28" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax28">
          <el-input v-model="queryForm.dayMax28" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin29">
          <el-input v-model="queryForm.dayMin29" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax29">
          <el-input v-model="queryForm.dayMax29" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin30">
          <el-input v-model="queryForm.dayMin30" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax30">
          <el-input v-model="queryForm.dayMax30" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMin31">
          <el-input v-model="queryForm.dayMin31" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item label="制造数" prop="dayMax31">
          <el-input v-model="queryForm.dayMax31" clearable placeholder="请输入制造数" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="getDataList">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <TableBar
        :document-title="documentTitle"
        :add-component="AddEditFormVue"
        :refresh-list="getDataList"
        :data-table-ref="dataTableRef"
        :multiple-selection="multipleSelection"
        ref="tableBarRef"
        :data-batch-delete-url="dataBatchDeleteUrl"
      />
      <ElTable ref="dataTableRef" :data="dataList" stripe @selection-change="handleSelectionChange">
        <ElTableColumn type="selection"/>
        <ElTableColumn v-for="h in headerList" :key="h.fieldName" :label="h.showName" :prop="h.fieldName" />
        <ElTableColumn fixed="right" label="操作" width="150px">
          <template #default="scope">
            <el-button
              type="warning"
              icon="edit"
              @click="editData(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </ElTableColumn>
      </ElTable>
      <el-row class="paginationDiv">
        <el-pagination
          background
          v-model:current-page="currentPageNum"
          v-model:page-size="currentPageSize"
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
import {ref, onMounted} from "vue"
import AddEditFormVue from "./ApsMakeCapacitySaleConfigAddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import { ElTable } from 'element-plus';
import {HeaderInfo, postResultInfo} from "@@/utils/common-js.ts"
import {type ApsMakeCapacitySaleConfig} from "./ApsMakeCapacitySaleConfigType.ts"

const dtoUrl = ref<string>("/apsMakeCapacitySaleConfig")
const documentTitle = ref<string>("工厂产能销售配置")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsMakeCapacitySaleConfig>({
  saleConfigId:  undefined,
  makeCapacityQuantity:  undefined,
  year:  undefined,
  month:  undefined,
  dayMin1:  undefined,
  dayMax1:  undefined,
  dayMin2:  undefined,
  dayMax2:  undefined,
  dayMin3:  undefined,
  dayMax3:  undefined,
  dayMin4:  undefined,
  dayMax4:  undefined,
  dayMin5:  undefined,
  dayMax5:  undefined,
  dayMin6:  undefined,
  dayMax6:  undefined,
  dayMin7:  undefined,
  dayMax7:  undefined,
  dayMin8:  undefined,
  dayMax8:  undefined,
  dayMin9:  undefined,
  dayMax9:  undefined,
  dayMin10:  undefined,
  dayMax10:  undefined,
  dayMin11:  undefined,
  dayMax11:  undefined,
  dayMin12:  undefined,
  dayMax12:  undefined,
  dayMin13:  undefined,
  dayMax13:  undefined,
  dayMin14:  undefined,
  dayMax14:  undefined,
  dayMin15:  undefined,
  dayMax15:  undefined,
  dayMin16:  undefined,
  dayMax16:  undefined,
  dayMin17:  undefined,
  dayMax17:  undefined,
  dayMin18:  undefined,
  dayMax18:  undefined,
  dayMin19:  undefined,
  dayMax19:  undefined,
  dayMin20:  undefined,
  dayMax20:  undefined,
  dayMin21:  undefined,
  dayMax21:  undefined,
  dayMin22:  undefined,
  dayMax22:  undefined,
  dayMin23:  undefined,
  dayMax23:  undefined,
  dayMin24:  undefined,
  dayMax24:  undefined,
  dayMin25:  undefined,
  dayMax25:  undefined,
  dayMin26:  undefined,
  dayMax26:  undefined,
  dayMin27:  undefined,
  dayMax27:  undefined,
  dayMin28:  undefined,
  dayMax28:  undefined,
  dayMin29:  undefined,
  dayMax29:  undefined,
  dayMin30:  undefined,
  dayMax30:  undefined,
  dayMin31:  undefined,
  dayMax31:  undefined,
  id: undefined
})

// 表格选中的id
const multipleSelection = ref<string []>([])

// 表格
// const dataTableRef = ref<InstanceType<typeof ElTable> | null>(null)
const dataTableRef = ref({})
// 表格操作头
const tableBarRef = ref<InstanceType<typeof TableBar> | null>(null)
// 表格相关
const dataList = ref<ApsMakeCapacitySaleConfig[] >([])
const currentPageNum = ref<number>(1)
const currentPageSize = ref<number>(10)
const tableTotal = ref<number>(0)
const headerList = ref<HeaderInfo[]>([])


// 获取表格内数据
function getDataList() {
  const req = {
    pageSize: currentPageSize.value,
    pageNum: currentPageNum.value,
    data: queryForm.value
  }
  console.info("getDataList {}", req)
  postResultInfo(`${dtoUrl.value}/queryPageList`, req)
    .then((t) => {
      dataList.value = t.data.dataList
      tableTotal.value = Number.parseInt(t.data.total)
      headerList.value = t.data.headerList
    })
}

// table点击事件
function editData(data: any) {
  // console.info("data ", data)
  tableBarRef.value?.showEditDialog(data.id)
}
// 页面条数变更事件
function handleSizeChange(val: number) {
  currentPageSize.value = val
  getDataList()
}
// 页面变更事件
function handleCurrentChange(val: number) {
  currentPageNum.value = val
  getDataList()
}
// 表格选中事件
function handleSelectionChange(val: ApsMakeCapacitySaleConfig[]) {
  multipleSelection.value = val.map(t => t.id)
  console.info("multipleSelection ", multipleSelection)
}

// 页面加载事件
onMounted(() => {
  getDataList()
})

</script>

<style scoped lang="scss">

</style>

