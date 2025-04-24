<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
              <el-form-item label="${column.comment}" prop="orderNo">
                <el-input v-model="queryForm.orderNo" clearable placeholder="请输入${column.comment}" />
              </el-form-item>
              <el-form-item label="${column.comment}" prop="orderRemark">
                <el-input v-model="queryForm.orderRemark" clearable placeholder="请输入${column.comment}" />
              </el-form-item>
              <el-form-item label="订单状态" prop="orderStatus">
                <el-input v-model="queryForm.orderStatus" clearable placeholder="请输入订单状态" />
              </el-form-item>
              <el-form-item label="成本价" prop="orderTotalPrice">
                <el-input v-model="queryForm.orderTotalPrice" clearable placeholder="请输入成本价" />
              </el-form-item>
              <el-form-item label="商品ID" prop="goodsId">
                <el-input v-model="queryForm.goodsId" clearable placeholder="请输入商品ID" />
              </el-form-item>
              <el-form-item label="总价" prop="reserveAmount">
                <el-input v-model="queryForm.reserveAmount" clearable placeholder="请输入总价" />
              </el-form-item>
              <el-form-item label="${column.comment}" prop="reserveDatetime">
                <el-input v-model="queryForm.reserveDatetime" clearable placeholder="请输入${column.comment}" />
              </el-form-item>
              <el-form-item label="总价" prop="finishPayedAmount">
                <el-input v-model="queryForm.finishPayedAmount" clearable placeholder="请输入总价" />
              </el-form-item>
              <el-form-item label="${column.comment}" prop="finishPayedDatetime">
                <el-input v-model="queryForm.finishPayedDatetime" clearable placeholder="请输入${column.comment}" />
              </el-form-item>
              <el-form-item label="${column.comment}" prop="makeFinishDate">
                <el-input v-model="queryForm.makeFinishDate" clearable placeholder="请输入${column.comment}" />
              </el-form-item>
              <el-form-item label="实际完成时间" prop="actMakeFinishDate">
                <el-input v-model="queryForm.actMakeFinishDate" clearable placeholder="请输入实际完成时间" />
              </el-form-item>
              <el-form-item label="${column.comment}" prop="deliveryDate">
                <el-input v-model="queryForm.deliveryDate" clearable placeholder="请输入${column.comment}" />
              </el-form-item>
              <el-form-item label="工厂ID" prop="factoryId">
                <el-input v-model="queryForm.factoryId" clearable placeholder="请输入工厂ID" />
              </el-form-item>
              <el-form-item label="紧急度0最小,越大越紧急" prop="urgencyLevel">
                <el-input v-model="queryForm.urgencyLevel" clearable placeholder="请输入紧急度0最小,越大越紧急" />
              </el-form-item>
              <el-form-item label="排产时间" prop="schedulingDate">
                <el-input v-model="queryForm.schedulingDate" clearable placeholder="请输入排产时间" />
              </el-form-item>
              <el-form-item label="父订单号" prop="orderNoParent">
                <el-input v-model="queryForm.orderNoParent" clearable placeholder="请输入父订单号" />
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
import {ref} from "vue"
import AddEditFormVue from "./ApsOrderAddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import { ElTable } from 'element-plus';
import {HeaderInfo, postResultInfo} from "@@/utils/common-js.ts"
import {type ApsOrder} from "./ApsOrderType.ts"

const dtoUrl = ref<string>("/apsOrder")
const documentTitle = ref<string>("订单表")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsOrder>({
  orderNo:  undefined,
  orderRemark:  undefined,
  orderStatus:  undefined,
  orderTotalPrice:  undefined,
  goodsId:  undefined,
  reserveAmount:  undefined,
  reserveDatetime:  undefined,
  finishPayedAmount:  undefined,
  finishPayedDatetime:  undefined,
  makeFinishDate:  undefined,
  actMakeFinishDate:  undefined,
  deliveryDate:  undefined,
  factoryId:  undefined,
  urgencyLevel:  undefined,
  schedulingDate:  undefined,
  orderNoParent:  undefined,
  id: undefined
})

// 表格选中的id
const multipleSelection = ref<(string | undefined) []>([])

// 表格
// const dataTableRef = ref<InstanceType<typeof ElTable> | null>(null)
const dataTableRef = ref({})
// 表格操作头
const tableBarRef = ref<InstanceType<typeof TableBar> | null>(null)
// 表格相关
const dataList = ref<ApsOrder[] >([])
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
// 页面加载事件
onMounted(() => {
  getDataList()
})
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
function handleSelectionChange(val: ApsOrder[]) {
  multipleSelection.value = val.map(t => t.id)
  console.info("multipleSelection ", multipleSelection)
}

</script>

<style scoped lang="scss">

</style>

