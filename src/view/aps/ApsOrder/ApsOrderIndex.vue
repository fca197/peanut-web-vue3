<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="queryForm.orderNo" clearable placeholder="请输入订单号"/>
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
      >
        <template #otherBtn>
          <el-button type="warning" icon="plus" @click="batchInsert">
            批量随机{{ createCount }}条
          </el-button>
        </template>
      </TableBar>
      <ElTable ref="dataTableRef" :data="dataList" stripe @selection-change="handleSelectionChange"
               v-loading="loadDataIng">
        <ElTableColumn type="selection"/>
        <ElTableColumn v-for="h in headerList" :key="h.fieldName" :label="h.showName" :prop="h.fieldName"
                       :width="h.width">
          <template #default="scope">
            <span v-if="h.fieldName === 'orderGoodsStatus'">
              <el-select v-model="scope.row.orderGoodsStatus"
                         @change="value=>{ updateOrderGoodsStatus(scope.row.id, value)}">
                <el-option v-for="(s,i) in apsStatusList" :key="s.id" :value="s.id" :label="s.statusName"></el-option>
              </el-select>
            </span>
            <span v-else-if="h.fieldName === 'schedulingDate'">
              <el-date-picker v-model="scope.row.schedulingDate" value-format="YYYY-MM-DD"
                              @change="value=>{updateSchedulingDate(scope.row,value)}" style="width: 140px"
              />
            </span>
            <span v-else>
              {{ scope.row[h.fieldName] }}
            </span>
          </template>
        </ElTableColumn>
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
import { ref } from "vue"
import AddEditFormVue from "./ApsOrderAddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import { ElTable } from "element-plus"
import { HeaderInfo, postNoResult, postResultInfo } from "@@/utils/common-js.ts"
import { type ApsOrder } from "./ApsOrderType.ts"
import { ApsStatus, queryApsStatusList } from "@v/aps/ApsStatus/ApsStatusType.ts";

const dtoUrl = ref<string>("/apsOrder")
const documentTitle = ref<string>("订单表")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsOrder>({
  orderNo: undefined,
  orderRemark: undefined,
  orderStatus: undefined,
  orderTotalPrice: undefined,
  goodsId: undefined,
  reserveAmount: undefined,
  reserveDatetime: undefined,
  finishPayedAmount: undefined,
  finishPayedDatetime: undefined,
  makeFinishDate: undefined,
  actMakeFinishDate: undefined,
  deliveryDate: undefined,
  factoryId: undefined,
  urgencyLevel: undefined,
  schedulingDate: undefined,
  orderNoParent: undefined,
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
const dataList = ref<ApsOrder[]>([])
const currentPageNum = ref<number>(1)
const currentPageSize = ref<number>(10)
const tableTotal = ref<number>(0)
const headerList = ref<HeaderInfo[]>([])
const apsStatusList = ref<ApsStatus[]>([])
const loadDataIng = ref<boolean>(true)
// 获取表格内数据
function getDataList() {
  loadDataIngOpen()
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
      loadDataIngClose()
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
function handleSelectionChange(val: ApsOrder[]) {
  multipleSelection.value = val.map(t => t.id)
  console.info("multipleSelection ", multipleSelection)
}
const updateOrderGoodsStatus = (orderId: string, sid: string) => {
  loadDataIngOpen()
  postNoResult("/apsOrder/updateOrderStatus", {
    orderId,
    goodsStatusId: sid
  }, "修改成功", loadDataIngClose)
}
const updateSchedulingDate = (row: ApsOrder, val: string) => {
  console.info("updateSchedulingDate", row, val)
  ElMessageBox({
    message: '订单号:[<span style="color:red">' + row.orderNo + '</span>],排产日期修改为:[<span style="color:red">' + (val == null ? '空' : val) + '</span>]',
    dangerouslyUseHTMLString: true,
    title: "修改排产日期",
    type: "warning"
  }).then(r => {
    loadDataIngOpen()
    postNoResult("/apsOrder/updateSchedulingDate", { id: row.id, schedulingDate: val }, "修改成功", loadDataIngClose);
  })
}

const createCount = ref<number>(100);

const batchInsert = () => {
  loadDataIngOpen()
  postNoResult("/apsOrder/batchInsert", { createCount: createCount.value }, "添加成功", getDataList)
}

const loadDataIngClose = () => {
  loadDataIng.value = false
}

const loadDataIngOpen = () => {
  loadDataIng.value = true
}

// 页面加载事件
onMounted(() => {
  getDataList()
  queryApsStatusList().then(r => apsStatusList.value = r)
})
</script>

<style scoped lang="scss">

</style>

