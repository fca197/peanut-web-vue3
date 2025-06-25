<script setup lang="ts">
import {onMounted, ref} from "vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import {ElTable} from "element-plus";
import {HeaderInfo, postResultInfo} from "@@/utils/common-js.ts"
import {
  type ApsOrderGoodsBomKittingVersionOrder
} from "./ApsOrderGoodsBomKittingVersionOrderType.ts"
import KittingRate from "@v/aps/ApsOrderGoodsBomKittingVersion/KittingRate.vue";
import {router} from "@/router";

const dtoUrl = ref<string>("/apsOrderGoodsBomKittingVersionOrder")
const documentTitle = ref<string>("齐套检查订单详情")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

const route = useRoute()

const kittingVersionId = ref<string | undefined>(route.params.id)
console.info("kittingVersionId ", kittingVersionId)
// 查询表格
const queryForm = ref<ApsOrderGoodsBomKittingVersionOrder>({
  kittingVersionId: kittingVersionId,
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
  {fieldName: "orderId", showName: "订单ID"},
  {fieldName: "orderNo", showName: "订单编号"},
  // {fieldName: "kittingRate", showName: "齐套率"},
  // {fieldName: "kittingStatus", showName: "齐套状态"},
  // {fieldName: "kittingMissingBom", showName: "缺失物料前10 [{id: label}]"}
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
    // headerList.value = t.data.headerList
  })
}

// table点击事件
const showData = (data: any) => {
  // console.info("data ", data)
  // tableBarRef.value?.showEditDialog(data.id)
  router.push("/aps/ApsOrderGoodsBomKittingVersionOrderItem/"+kittingVersionId.value+"/"+data.orderId)
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
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="queryForm.orderNo" clearable placeholder="请输入订单ID"/>
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
        :refresh-list="getDataList"
        :data-table-ref="dataTableRef"
        :multiple-selection="multipleSelection"
        ref="tableBarRef"
        :data-batch-delete-url="dataBatchDeleteUrl"
      />
      <ElTable ref="dataTableRef" :data="dataList" stripe @selection-change="handleSelectionChange">
        <ElTableColumn
          type="selection"/>
        <ElTableColumn
          v-for="h in headerList" :key="h.fieldName" :label="h.showName"
          :prop="h.fieldName" :width="h.width"
        />
        <ElTableColumn prop="kittingRate" label="齐套率">
          <template #default="scope">
            <KittingRate :kitting-rate="scope.row.kittingRate" />
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="操作" width="150px">
          <template #default="scope">
            <el-button
              type="primary"
              icon="Histogram"
              @click="showData(scope.row)"
            >
              详情
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

