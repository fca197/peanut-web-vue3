<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="queryForm.goodsId" clearable placeholder="请输入商品ID"/>
        </el-form-item>
        <el-form-item label="零件组ID" prop="groupId">
          <el-input v-model="queryForm.groupId" clearable placeholder="请输入零件组ID"/>
        </el-form-item>
        <el-form-item label="商品ID" prop="bomId">
          <el-input v-model="queryForm.bomId" clearable placeholder="请输入商品ID"/>
        </el-form-item>
        <el-form-item label="bom 编码" prop="bomCode">
          <el-input v-model="queryForm.bomCode" clearable placeholder="请输入bom 编码"/>
        </el-form-item>
        <el-form-item label="bom 名称" prop="bomName">
          <el-input v-model="queryForm.bomName" clearable placeholder="请输入bom 名称"/>
        </el-form-item>
        <el-form-item label="使用量" prop="bomUsage">
          <el-input v-model="queryForm.bomUsage" clearable placeholder="请输入使用量"/>
        </el-form-item>
        <el-form-item label="单位" prop="bomUnit">
          <el-input v-model="queryForm.bomUnit" clearable placeholder="请输入单位"/>
        </el-form-item>
        <el-form-item label="成本价" prop="bomCostPrice">
          <el-input v-model="queryForm.bomCostPrice" clearable placeholder="请输入成本价"/>
        </el-form-item>
        <el-form-item label="单位" prop="bomCostPriceUnit">
          <el-input v-model="queryForm.bomCostPriceUnit" clearable placeholder="请输入单位"/>
        </el-form-item>
        <el-form-item label="使用工位" prop="bomUseWorkStation">
          <el-input v-model="queryForm.bomUseWorkStation" clearable placeholder="请输入使用工位"/>
        </el-form-item>
        <el-form-item label="使用表达式" prop="bomUseExpression">
          <el-input v-model="queryForm.bomUseExpression" clearable placeholder="请输入使用表达式"/>
        </el-form-item>
        <el-form-item label="库存" prop="bomInventory">
          <el-input v-model="queryForm.bomInventory" clearable placeholder="请输入库存"/>
        </el-form-item>
        <el-form-item label="是否关注" prop="isFollow">
          <el-input v-model="queryForm.isFollow" clearable placeholder="请输入是否关注"/>
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
      <el-table ref="dataTableRef" :data="dataList" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column v-for="h in headerList" :key="h.fieldName" :label="h.showName" :prop="h.fieldName"/>
        <el-table-column fixed="right" label="操作" width="150px">
          <template #default="scope">
            <el-button
              type="warning"
              icon="edit"
              @click="editData(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
import AddEditFormVue from "./ApsGoodsBomAddEditForm.vue"
import TableBar from "@/layouts/components/TableBar/index.vue"
import {ElTable} from 'element-plus';
import {HeaderInfo, postResultInfo} from "@@/utils/common-js.ts"
import {type ApsGoodsBom} from "./ApsGoodsBomType.ts"

const dtoUrl = ref<string>("/apsGoodsBom")
const documentTitle = ref<string>("BOM 清单")
const dataBatchDeleteUrl = ref<string>(`${dtoUrl.value}/deleteByIdList`)

// 查询表格
const queryForm = ref<ApsGoodsBom>({
  goodsId: undefined,
  groupId: undefined,
  bomId: undefined,
  bomCode: undefined,
  bomName: undefined,
  bomUsage: undefined,
  bomUnit: undefined,
  bomCostPrice: undefined,
  bomCostPriceUnit: undefined,
  bomUseWorkStation: undefined,
  bomUseExpression: undefined,
  bomInventory: undefined,
  isFollow: undefined,
  factoryId: undefined,
  id: undefined
})

// 表格选中的id
const multipleSelection = ref<string []>([])

// 表格
const dataTableRef = ref({})
// 表格操作头
const tableBarRef = ref<InstanceType<typeof TableBar> | null>(null)
// 表格相关
const dataList = ref<ApsGoodsBom[]>([])
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
function handleSelectionChange(val: ApsGoodsBom[]) {
  multipleSelection.value = val.map(t => t.id)
  console.info("multipleSelection ", multipleSelection)
}

</script>

<style scoped lang="scss">

</style>

