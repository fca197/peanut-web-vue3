<script setup lang="ts">
import {ref, onMounted} from "vue"
import AddEditFormVue from "./ApsOrderGoodsSaleConfigHistoryAddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import { ElTable } from "element-plus";
import {HeaderInfo, postResultInfo} from "@@/utils/common-js.ts"
import {type ApsOrderGoodsSaleConfigHistory} from "./ApsOrderGoodsSaleConfigHistoryType.ts"

const dtoUrl = ref<string>("/apsOrderGoodsSaleConfigHistory")
const documentTitle = ref<string>("销售规划订单历史销售占比")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsOrderGoodsSaleConfigHistory>({
  factoryId: undefined,
  goodsId: undefined,
  goodsName: undefined,
  saleParentId: undefined,
  saleParentConfigName: undefined,
  saleConfigId: undefined,
  saleConfigName: undefined,
  year: undefined,
  monthCount01: undefined,
  monthRatio01: undefined,
  monthCount02: undefined,
  monthRatio02: undefined,
  monthCount03: undefined,
  monthRatio03: undefined,
  monthCount04: undefined,
  monthRatio04: undefined,
  monthCount05: undefined,
  monthRatio05: undefined,
  monthCount06: undefined,
  monthRatio06: undefined,
  monthCount07: undefined,
  monthRatio07: undefined,
  monthCount08: undefined,
  monthRatio08: undefined,
  monthCount09: undefined,
  monthRatio09: undefined,
  monthCount10: undefined,
  monthRatio10: undefined,
  monthCount11: undefined,
  monthRatio11: undefined,
  monthCount12: undefined,
  monthRatio12: undefined,
  id: undefined
})

// 表格选中的id
const multipleSelection = ref<(string | undefined)[]>([])

// 表格
// const dataTableRef = ref<InstanceType<typeof ElTable> | null>(null)
const dataTableRef = ref({})
// 表格操作头
const tableBarRef = ref<InstanceType<typeof TableBar> | null>(null)
// 表格相关
const dataList = ref<ApsOrderGoodsSaleConfigHistory[] >([])
const currentPageNum = ref<number>(1)
const currentPageSize = ref<number>(10)
const tableTotal = ref<number>(0)
const headerList = ref<HeaderInfo[]>([
 {fieldName: "id", showName: "序号"},
  { fieldName: "factoryId", showName: "工厂ID" },
  { fieldName: "goodsId", showName: "商品ID" },
  { fieldName: "goodsName", showName: "商品名称" },
  { fieldName: "saleParentId", showName: "销售上级ID" },
  { fieldName: "saleParentConfigName", showName: "销售组名称" },
  { fieldName: "saleConfigId", showName: "销售ID" },
  { fieldName: "saleConfigName", showName: "销售组名称" },
  { fieldName: "year", showName: "年份" },
  { fieldName: "monthCount01", showName: "1月销售数量" },
  { fieldName: "monthRatio01", showName: "1月销售占比" },
  { fieldName: "monthCount02", showName: "2月销售数量" },
  { fieldName: "monthRatio02", showName: "2月销售占比" },
  { fieldName: "monthCount03", showName: "3月销售数量" },
  { fieldName: "monthRatio03", showName: "3月销售占比" },
  { fieldName: "monthCount04", showName: "4月销售数量" },
  { fieldName: "monthRatio04", showName: "4月销售占比" },
  { fieldName: "monthCount05", showName: "5月销售数量" },
  { fieldName: "monthRatio05", showName: "5月销售占比" },
  { fieldName: "monthCount06", showName: "6月销售数量" },
  { fieldName: "monthRatio06", showName: "6月销售占比" },
  { fieldName: "monthCount07", showName: "7月销售数量" },
  { fieldName: "monthRatio07", showName: "7月销售占比" },
  { fieldName: "monthCount08", showName: "8月销售数量" },
  { fieldName: "monthRatio08", showName: "8月销售占比" },
  { fieldName: "monthCount09", showName: "9月销售数量" },
  { fieldName: "monthRatio09", showName: "9月销售占比" },
  { fieldName: "monthCount10", showName: "10月销售数量" },
  { fieldName: "monthRatio10", showName: "10月销售占比" },
  { fieldName: "monthCount11", showName: "11月销售数量" },
  { fieldName: "monthRatio11", showName: "11月销售占比" },
  { fieldName: "monthCount12", showName: "12月销售数量" },
  { fieldName: "monthRatio12", showName: "12月销售占比" },
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
const handleSelectionChange = (val: ApsOrderGoodsSaleConfigHistory[]) => {
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
        <el-form-item label="工厂ID" prop="factoryId">
          <el-input v-model="queryForm.factoryId" clearable placeholder="请输入工厂ID" />
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="queryForm.goodsId" clearable placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="queryForm.goodsName" clearable placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="销售上级ID" prop="saleParentId">
          <el-input v-model="queryForm.saleParentId" clearable placeholder="请输入销售上级ID" />
        </el-form-item>
        <el-form-item label="销售组名称" prop="saleParentConfigName">
          <el-input v-model="queryForm.saleParentConfigName" clearable placeholder="请输入销售组名称" />
        </el-form-item>
        <el-form-item label="销售ID" prop="saleConfigId">
          <el-input v-model="queryForm.saleConfigId" clearable placeholder="请输入销售ID" />
        </el-form-item>
        <el-form-item label="销售组名称" prop="saleConfigName">
          <el-input v-model="queryForm.saleConfigName" clearable placeholder="请输入销售组名称" />
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-input v-model="queryForm.year" clearable placeholder="请输入年份" />
        </el-form-item>
        <el-form-item label="1月销售数量" prop="monthCount01">
          <el-input v-model="queryForm.monthCount01" clearable placeholder="请输入1月销售数量" />
        </el-form-item>
        <el-form-item label="1月销售占比" prop="monthRatio01">
          <el-input v-model="queryForm.monthRatio01" clearable placeholder="请输入1月销售占比" />
        </el-form-item>
        <el-form-item label="2月销售数量" prop="monthCount02">
          <el-input v-model="queryForm.monthCount02" clearable placeholder="请输入2月销售数量" />
        </el-form-item>
        <el-form-item label="2月销售占比" prop="monthRatio02">
          <el-input v-model="queryForm.monthRatio02" clearable placeholder="请输入2月销售占比" />
        </el-form-item>
        <el-form-item label="3月销售数量" prop="monthCount03">
          <el-input v-model="queryForm.monthCount03" clearable placeholder="请输入3月销售数量" />
        </el-form-item>
        <el-form-item label="3月销售占比" prop="monthRatio03">
          <el-input v-model="queryForm.monthRatio03" clearable placeholder="请输入3月销售占比" />
        </el-form-item>
        <el-form-item label="4月销售数量" prop="monthCount04">
          <el-input v-model="queryForm.monthCount04" clearable placeholder="请输入4月销售数量" />
        </el-form-item>
        <el-form-item label="4月销售占比" prop="monthRatio04">
          <el-input v-model="queryForm.monthRatio04" clearable placeholder="请输入4月销售占比" />
        </el-form-item>
        <el-form-item label="5月销售数量" prop="monthCount05">
          <el-input v-model="queryForm.monthCount05" clearable placeholder="请输入5月销售数量" />
        </el-form-item>
        <el-form-item label="5月销售占比" prop="monthRatio05">
          <el-input v-model="queryForm.monthRatio05" clearable placeholder="请输入5月销售占比" />
        </el-form-item>
        <el-form-item label="6月销售数量" prop="monthCount06">
          <el-input v-model="queryForm.monthCount06" clearable placeholder="请输入6月销售数量" />
        </el-form-item>
        <el-form-item label="6月销售占比" prop="monthRatio06">
          <el-input v-model="queryForm.monthRatio06" clearable placeholder="请输入6月销售占比" />
        </el-form-item>
        <el-form-item label="7月销售数量" prop="monthCount07">
          <el-input v-model="queryForm.monthCount07" clearable placeholder="请输入7月销售数量" />
        </el-form-item>
        <el-form-item label="7月销售占比" prop="monthRatio07">
          <el-input v-model="queryForm.monthRatio07" clearable placeholder="请输入7月销售占比" />
        </el-form-item>
        <el-form-item label="8月销售数量" prop="monthCount08">
          <el-input v-model="queryForm.monthCount08" clearable placeholder="请输入8月销售数量" />
        </el-form-item>
        <el-form-item label="8月销售占比" prop="monthRatio08">
          <el-input v-model="queryForm.monthRatio08" clearable placeholder="请输入8月销售占比" />
        </el-form-item>
        <el-form-item label="9月销售数量" prop="monthCount09">
          <el-input v-model="queryForm.monthCount09" clearable placeholder="请输入9月销售数量" />
        </el-form-item>
        <el-form-item label="9月销售占比" prop="monthRatio09">
          <el-input v-model="queryForm.monthRatio09" clearable placeholder="请输入9月销售占比" />
        </el-form-item>
        <el-form-item label="10月销售数量" prop="monthCount10">
          <el-input v-model="queryForm.monthCount10" clearable placeholder="请输入10月销售数量" />
        </el-form-item>
        <el-form-item label="10月销售占比" prop="monthRatio10">
          <el-input v-model="queryForm.monthRatio10" clearable placeholder="请输入10月销售占比" />
        </el-form-item>
        <el-form-item label="11月销售数量" prop="monthCount11">
          <el-input v-model="queryForm.monthCount11" clearable placeholder="请输入11月销售数量" />
        </el-form-item>
        <el-form-item label="11月销售占比" prop="monthRatio11">
          <el-input v-model="queryForm.monthRatio11" clearable placeholder="请输入11月销售占比" />
        </el-form-item>
        <el-form-item label="12月销售数量" prop="monthCount12">
          <el-input v-model="queryForm.monthCount12" clearable placeholder="请输入12月销售数量" />
        </el-form-item>
        <el-form-item label="12月销售占比" prop="monthRatio12">
          <el-input v-model="queryForm.monthRatio12" clearable placeholder="请输入12月销售占比" />
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

<style scoped lang="scss">

</style>

