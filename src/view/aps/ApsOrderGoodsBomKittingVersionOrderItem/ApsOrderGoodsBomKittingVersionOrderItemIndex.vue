<script setup lang="ts">
import { ref, onMounted } from "vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import { ElTable } from "element-plus";
import { HeaderInfo, postResultInfo } from "@@/utils/common-js.ts"
import { type ApsOrderGoodsBomKittingVersionOrderItem } from "./ApsOrderGoodsBomKittingVersionOrderItemType.ts"

const dtoUrl = ref<string>("/apsOrderGoodsBomKittingVersionOrderItem")
const documentTitle = ref<string>("齐套检查版本详情")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsOrderGoodsBomKittingVersionOrderItem>({
  kittingVersionId: undefined,
  orderId: undefined,
  orderNo: undefined,
  orderMakeBeginDateTime: undefined,
  goodsId: undefined,
  goodsName: undefined,
  workshopSectionId: undefined,
  workshopSectionName: undefined,
  workshopStationId: undefined,
  workshopStationName: undefined,
  apsRoomId: undefined,
  apsRoomName: undefined,
  bomId: undefined,
  bomName: undefined,
  bomUsage: undefined,
  inventoryBeforeCount: undefined,
  inventoryAfterCount: undefined,
  goodsStatusId: undefined,
  goodsStatusName: undefined,
  bomUseDateTime: undefined,
  createDate: undefined,
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
const dataList = ref<ApsOrderGoodsBomKittingVersionOrderItem[] >([])
const currentPageNum = ref<number>(1)
const currentPageSize = ref<number>(10)
const tableTotal = ref<number>(0)
const headerList = ref<HeaderInfo[]>([
 { fieldName: "id", showName: "序号" },
  { fieldName: "kittingVersionId", showName: "齐套版本id" },
  { fieldName: "orderId", showName: "订单ID" },
  { fieldName: "orderNo", showName: "订单ID" },
  { fieldName: "orderMakeBeginDateTime", showName: "开始制造时间" },
  { fieldName: "goodsId", showName: "商品ID" },
  { fieldName: "goodsName", showName: "商品名称" },
  { fieldName: "workshopSectionId", showName: "工段Id" },
  { fieldName: "workshopSectionName", showName: "工段名称" },
  { fieldName: "workshopStationId", showName: "工位ID" },
  { fieldName: "workshopStationName", showName: "工位名称" },
  { fieldName: "apsRoomId", showName: "车间ID" },
  { fieldName: "apsRoomName", showName: "车间名称" },
  { fieldName: "bomId", showName: "零件ID" },
  { fieldName: "bomName", showName: "零件名称" },
  { fieldName: "bomUsage", showName: "单个商品用量" },
  { fieldName: "inventoryBeforeCount", showName: "库存使用前数量" },
  { fieldName: "inventoryAfterCount", showName: "库存使用后数量" },
  { fieldName: "goodsStatusId", showName: "状态ID" },
  { fieldName: "goodsStatusName", showName: "状态名称" },
  { fieldName: "bomUseDateTime", showName: "零件使用时间" },
  { fieldName: "createDate", showName: "计算日期" },
  { fieldName: "factoryId", showName: "工厂ID" },
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
const handleSelectionChange = (val: ApsOrderGoodsBomKittingVersionOrderItem[]) => {
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
          <el-input v-model="queryForm.kittingVersionId" clearable placeholder="请输入齐套版本id" />
        </el-form-item>
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="queryForm.orderId" clearable placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="订单ID" prop="orderNo">
          <el-input v-model="queryForm.orderNo" clearable placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="开始制造时间" prop="orderMakeBeginDateTime">
          <el-input v-model="queryForm.orderMakeBeginDateTime" clearable placeholder="请输入开始制造时间" />
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="queryForm.goodsId" clearable placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="queryForm.goodsName" clearable placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="工段Id" prop="workshopSectionId">
          <el-input v-model="queryForm.workshopSectionId" clearable placeholder="请输入工段Id" />
        </el-form-item>
        <el-form-item label="工段名称" prop="workshopSectionName">
          <el-input v-model="queryForm.workshopSectionName" clearable placeholder="请输入工段名称" />
        </el-form-item>
        <el-form-item label="工位ID" prop="workshopStationId">
          <el-input v-model="queryForm.workshopStationId" clearable placeholder="请输入工位ID" />
        </el-form-item>
        <el-form-item label="工位名称" prop="workshopStationName">
          <el-input v-model="queryForm.workshopStationName" clearable placeholder="请输入工位名称" />
        </el-form-item>
        <el-form-item label="车间ID" prop="apsRoomId">
          <el-input v-model="queryForm.apsRoomId" clearable placeholder="请输入车间ID" />
        </el-form-item>
        <el-form-item label="车间名称" prop="apsRoomName">
          <el-input v-model="queryForm.apsRoomName" clearable placeholder="请输入车间名称" />
        </el-form-item>
        <el-form-item label="零件ID" prop="bomId">
          <el-input v-model="queryForm.bomId" clearable placeholder="请输入零件ID" />
        </el-form-item>
        <el-form-item label="零件名称" prop="bomName">
          <el-input v-model="queryForm.bomName" clearable placeholder="请输入零件名称" />
        </el-form-item>
        <el-form-item label="单个商品用量" prop="bomUsage">
          <el-input v-model="queryForm.bomUsage" clearable placeholder="请输入单个商品用量" />
        </el-form-item>
        <el-form-item label="库存使用前数量" prop="inventoryBeforeCount">
          <el-input v-model="queryForm.inventoryBeforeCount" clearable placeholder="请输入库存使用前数量" />
        </el-form-item>
        <el-form-item label="库存使用后数量" prop="inventoryAfterCount">
          <el-input v-model="queryForm.inventoryAfterCount" clearable placeholder="请输入库存使用后数量" />
        </el-form-item>
        <el-form-item label="状态ID" prop="goodsStatusId">
          <el-input v-model="queryForm.goodsStatusId" clearable placeholder="请输入状态ID" />
        </el-form-item>
        <el-form-item label="状态名称" prop="goodsStatusName">
          <el-input v-model="queryForm.goodsStatusName" clearable placeholder="请输入状态名称" />
        </el-form-item>
        <el-form-item label="零件使用时间" prop="bomUseDateTime">
          <el-input v-model="queryForm.bomUseDateTime" clearable placeholder="请输入零件使用时间" />
        </el-form-item>
        <el-form-item label="计算日期" prop="createDate">
          <el-input v-model="queryForm.createDate" clearable placeholder="请输入计算日期" />
        </el-form-item>
        <el-form-item label="工厂ID" prop="factoryId">
          <el-input v-model="queryForm.factoryId" clearable placeholder="请输入工厂ID" />
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
        :show-add-btn="false"
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

