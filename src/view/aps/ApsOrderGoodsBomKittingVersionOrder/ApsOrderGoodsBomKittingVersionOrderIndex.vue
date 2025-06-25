<script setup lang="ts">
import {ref, onMounted} from "vue"
import AddEditFormVue from "./ApsOrderGoodsBomKittingVersionOrderAddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import {ElTable} from "element-plus";
import {HeaderInfo, postResultInfo} from "@@/utils/common-js.ts"
import {
  type ApsOrderGoodsBomKittingVersionOrder
} from "./ApsOrderGoodsBomKittingVersionOrderType.ts"

const dtoUrl = ref<string>("/apsOrderGoodsBomKittingVersionOrder")
const documentTitle = ref<string>("齐套检查订单详情")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsOrderGoodsBomKittingVersionOrder>({
  kittingVersionId: undefined,
  orderId: undefined,
  orderNo: undefined,
  kittingRate: undefined,
  kittingStatus: undefined,
  kittingMissingBom: undefined,
  orderField01: undefined,
  orderField02: undefined,
  orderField03: undefined,
  orderField04: undefined,
  orderField05: undefined,
  orderField06: undefined,
  orderField07: undefined,
  orderField08: undefined,
  orderField09: undefined,
  orderField10: undefined,
  orderField11: undefined,
  orderField12: undefined,
  orderField13: undefined,
  orderField14: undefined,
  orderField15: undefined,
  orderField16: undefined,
  orderField17: undefined,
  orderField18: undefined,
  orderField19: undefined,
  orderField20: undefined,
  factoryId: undefined,
  id: undefined
})

// 表格
// 表格选中的id
const multipleSelection = ref<(string | undefined)[]>([])
// const dataTableRef = ref<InstanceType<typeof ElTable> | null>(null)
const dataTableRef = ref({})
// 表格操作头
const tableBarRef = ref<InstanceType<typeof TableBar> | null>(null)
// 表格相关
const dataList = ref<ApsOrderGoodsBomKittingVersionOrder[]>([])
const currentPageNum = ref<number>(1)
const currentPageSize = ref<number>(10)
const tableTotal = ref<number>(0)
const headerList = ref<HeaderInfo[]>([
  {fieldName: "id", showName: "序号"},
  {fieldName: "kittingVersionId", showName: "齐套版本id"},
  {fieldName: "orderId", showName: "订单ID"},
  {fieldName: "orderNo", showName: "订单ID"},
  {fieldName: "kittingRate", showName: "齐套率"},
  {fieldName: "kittingStatus", showName: "齐套状态 已齐套， 部分齐套，未齐套"},
  {fieldName: "kittingMissingBom", showName: "缺失物料前10 [{id: label}]"},
  {fieldName: "orderField01", showName: "订单字段"},
  {fieldName: "orderField02", showName: "订单字段"},
  {fieldName: "orderField03", showName: "订单字段"},
  {fieldName: "orderField04", showName: "订单字段"},
  {fieldName: "orderField05", showName: "订单字段"},
  {fieldName: "orderField06", showName: "订单字段"},
  {fieldName: "orderField07", showName: "订单字段"},
  {fieldName: "orderField08", showName: "订单字段"},
  {fieldName: "orderField09", showName: "订单字段"},
  {fieldName: "orderField10", showName: "订单字段"},
  {fieldName: "orderField11", showName: "订单字段"},
  {fieldName: "orderField12", showName: "订单字段"},
  {fieldName: "orderField13", showName: "订单字段"},
  {fieldName: "orderField14", showName: "订单字段"},
  {fieldName: "orderField15", showName: "订单字段"},
  {fieldName: "orderField16", showName: "订单字段"},
  {fieldName: "orderField17", showName: "订单字段"},
  {fieldName: "orderField18", showName: "订单字段"},
  {fieldName: "orderField19", showName: "订单字段"},
  {fieldName: "orderField20", showName: "订单字段"},
  {fieldName: "factoryId", showName: "工厂ID"},
])

// 获取表格内数据
const getDataList = () => {
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
const editData = (data: any) => {
  // console.info("data ", data)
  tableBarRef.value?.showEditDialog(data.id)
}
// 页面条数变更事件
const handleSizeChange = (val: number) => {
  currentPageSize.value = val
  getDataList()
}
// 页面变更事件
const handleCurrentChange = (val: number) => {
  currentPageNum.value = val
  getDataList()
}
// 表格选中事件
const handleSelectionChange = (val: ApsOrderGoodsBomKittingVersionOrder[]) => {
  multipleSelection.value = val.map(t => t.id)
  console.info("multipleSelection ", multipleSelection)
}

// 页面加载事件
onMounted(() => {
  getDataList()
})
</script>

<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
        <el-form-item label="齐套版本id" prop="kittingVersionId">
          <el-input v-model="queryForm.kittingVersionId" clearable placeholder="请输入齐套版本id"/>
        </el-form-item>
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="queryForm.orderId" clearable placeholder="请输入订单ID"/>
        </el-form-item>
        <el-form-item label="订单ID" prop="orderNo">
          <el-input v-model="queryForm.orderNo" clearable placeholder="请输入订单ID"/>
        </el-form-item>
        <el-form-item label="齐套率" prop="kittingRate">
          <el-input v-model="queryForm.kittingRate" clearable placeholder="请输入齐套率"/>
        </el-form-item>
        <el-form-item label="齐套状态 已齐套， 部分齐套，未齐套" prop="kittingStatus">
          <el-input v-model="queryForm.kittingStatus" clearable
                    placeholder="请输入齐套状态 已齐套， 部分齐套，未齐套"/>
        </el-form-item>
        <el-form-item label="缺失物料前10 [{id: label}]" prop="kittingMissingBom">
          <el-input v-model="queryForm.kittingMissingBom" clearable
                    placeholder="请输入缺失物料前10 [{id: label}]"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField01">
          <el-input v-model="queryForm.orderField01" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField02">
          <el-input v-model="queryForm.orderField02" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField03">
          <el-input v-model="queryForm.orderField03" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField04">
          <el-input v-model="queryForm.orderField04" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField05">
          <el-input v-model="queryForm.orderField05" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField06">
          <el-input v-model="queryForm.orderField06" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField07">
          <el-input v-model="queryForm.orderField07" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField08">
          <el-input v-model="queryForm.orderField08" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField09">
          <el-input v-model="queryForm.orderField09" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField10">
          <el-input v-model="queryForm.orderField10" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField11">
          <el-input v-model="queryForm.orderField11" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField12">
          <el-input v-model="queryForm.orderField12" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField13">
          <el-input v-model="queryForm.orderField13" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField14">
          <el-input v-model="queryForm.orderField14" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField15">
          <el-input v-model="queryForm.orderField15" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField16">
          <el-input v-model="queryForm.orderField16" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField17">
          <el-input v-model="queryForm.orderField17" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField18">
          <el-input v-model="queryForm.orderField18" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField19">
          <el-input v-model="queryForm.orderField19" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="订单字段" prop="orderField20">
          <el-input v-model="queryForm.orderField20" clearable placeholder="请输入订单字段"/>
        </el-form-item>
        <el-form-item label="工厂ID" prop="factoryId">
          <el-input v-model="queryForm.factoryId" clearable placeholder="请输入工厂ID"/>
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
        <ElTableColumn
            v-for="h in headerList" :key="h.fieldName" :label="h.showName"
            :prop="h.fieldName" :width="h.width"
        />
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

<style scoped lang="scss">

</style>

