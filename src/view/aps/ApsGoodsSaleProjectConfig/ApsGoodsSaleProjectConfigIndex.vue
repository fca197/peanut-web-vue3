<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">

      <el-form ref="queryForm" :inline="true" label-width="100px">
        <el-form-item label="请选择商品" prop="goodsId">
          <el-select v-model="form.goodsId" style="width: 200px">
            <el-option v-for="item in goodsList" :key="item.id" :label="item.goodsName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveConfig">
            保存配置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="search-wrapper" shadow="never">
      <el-table id="dataTable" :key="dataTableKey" :data="apsSaleConfigList" :default-expand-all="true"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" stripe>
        <el-table-column label="组编码" prop="saleCode" width="170px">
          <template #scope="scope">
            <span v-if="scope.row.isValue!== 1">{{ scope.row.saleCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="组名称" prop="saleName" width="170px">
          <template #scope="scope">
            <span v-if="scope.row.isValue!== 1">{{ scope.row.saleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值编码" prop="saleCode" width="170px">
          <template #scope="scope">
            <span v-if="scope.row.isValue === 1">{{ scope.row.saleCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="值名称" prop="saleName" width="170px">
          <template #scope="scope">
            <span v-if="scope.row.isValue === 1">{{ scope.row.saleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工程特征组" width="170px">
          <template #default="scope">
          <span v-if="scope.row.isValue!== 1">
            <el-select v-model="scope.row.projectId" @change="(value) => selectProject(scope.row.id, value)">
              <el-option
                v-for="item in apsProjectConfigList" :key="item.id" :label="item.saleName"
                         :value="item.id"></el-option>
            </el-select>
          </span>
          </template>
        </el-table-column>
        <el-table-column label="工程特征值">
          <template #default="scope">
          <span v-if="scope.row.isValue === 1">
            <el-col
              :span="12" v-for="(plt, index ) in goodsProjectMap[scope.row.parentId+'-'+scope.row.id]"
                    :key="index">
              <el-col :span="24">
                <el-col :span="12">
                  <el-input v-model="plt.saleConfigId" disabled style="display: none"/>
                  <el-input v-model="plt.projectConfigId" disabled style="display: none"/>
                  <el-input v-model="plt.projectConfigName" disabled/>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="plt.quantity"/>
                </el-col>
              </el-col>
            </el-col>
          </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import type {ElForm, ElTable} from 'element-plus'
import {querySaleConfigList} from "@v/aps/ApsSaleConfig/ApsSaleConfigType.ts"
import {postResultInfo} from "@@/utils/common-js.ts"
import {queryGoodsList} from "@v/aps/ApsGoods/ApsGoodsType.ts"

// 定义表单引用
const queryForm = ref<InstanceType<typeof ElForm>>()
const dataTableKey = ref<number>(0)

// 定义响应式数据
const goodsList = ref<any[]>([])
const goodsSaleConfig = ref<any>({})
const goodsSaleForecastConfig = {}
const form = ref({
  goodsId: "",
  goods: {
    factoryId: undefined
  }
})
const apsSaleConfigList = ref<any[]>([])
const apsProjectConfigList = ref<any[]>([])
const saleProjectMap = ref<any>({})
const goodsProjectMap = ref<any>({})

// 生命周期钩子，在组件挂载后执行
onMounted(() => {

  querySaleConfigList()
    .then(t => {
      apsSaleConfigList.value = t
    })
    .then(() => {
      apsSaleConfigList.value.forEach(t => {
        t.children.forEach(t1 => {
          goodsSaleConfig.value[t1.id] = false
        })
        goodsSaleConfig.value[t.id] = false
      })
    })
    .then(() => {
      postResultInfo("/apsProjectConfig/queryPageList", {queryPage: false}).then(t => {
        apsProjectConfigList.value = t.data.dataList
      })
      queryGoodsList().then(t => {
        goodsList.value = t
        form.value.goodsId = goodsList.value[0].id
        form.value.goods = goodsList.value[0]
      })
    })
})

// 监听 form.goodsId 的变化
watch(() => form.value.goodsId, (val) => {
  getList()
})

// 定义方法
const getList = async () => {

  postResultInfo("/apsProjectConfig/queryPageList", {queryPage: false})
    .then(r => {
      const dataList = r.data.dataList
      dataTableKey.value = Math.random()
      console.info("dataTableKey.value ", dataTableKey.value, dataList)
    })
}

const selectProject = (saleId: string, projectId: string) => {
  const lt = apsProjectConfigList.value.filter(t => t.id === projectId)[0].children || []
  if (lt.length === 0) {
    alert('请先添加工程特征值')
    return
  }
  const saleConfigList = apsSaleConfigList.value.filter(t => t.id === saleId)[0].children || []

  saleConfigList.forEach(sc => {
    const ltt: any[] = []
    lt.forEach(t => {
      const parse = {
        quantity: 0,
        factoryId: form.value.goods.factoryId,
        saleConfigId: sc.id,
        saleConfigParentId: sc.parentId,
        saleConfigName: sc.saleName,
        goodsId: form.value.goodsId,
        projectConfigId: t.id,
        projectConfigParentId: t.parentId,
        projectConfigName: t.saleName
      }
      ltt.push(parse)
    })
    goodsProjectMap.value[saleId + '-' + sc.id] = ltt
  })
  console.log("goodsSaleConfig", saleId, projectId, goodsProjectMap.value)
}

const saveConfig = () => {
  const f: any[] = []
  for (let key in goodsProjectMap.value) {
    const l = goodsProjectMap.value[key]
    l.forEach(t => {
      f.push(t)
    })
  }
  if (f.length === 0) {
    alert('请先选择工程特征值')
    return
  }
  // post("/apsGoodsSaleProjectConfig/insertBatch", f)
}

</script>

<style lang="scss" scoped>

</style>
