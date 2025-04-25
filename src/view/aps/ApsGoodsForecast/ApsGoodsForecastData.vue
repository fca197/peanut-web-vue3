<script setup lang="ts">

import { postResultInfo } from "@@/utils/common-js.ts";
import { useRoute } from 'vue-router';

const tableData = ref<any>({})

// 获取当前路由信息
const route = useRoute();

// 从路由参数中获取id
const id = route.params.id as string;

const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if(index === 0) {
      sums[index] = '合计';
      return;
    }
    if(index === 1 || index === 2) {
      sums[index] = '';
      return;
    }
    const values = data.slice(0).map(item => Number(item[column.property]) ? Number(item[column.property]) : Number(item[column.property].replaceAll("%", "")));
    const t = values[0];
    if(!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr);
        if(!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
      sums[index] = t + "/" + (sums[index] - t) + '%';
    } else {
      sums[index] = t + "/" + 'N/A';
    }
  });

  return sums;
}

onMounted(() => {
  postResultInfo("/apsGoodsForecast/getForecastDataById", { id: id }).then(t => {
    tableData.value = t.data
    tableData.value.headerList [0].width = 600

    const headerList = t.data.headerList.slice(3)
    for (let i = 1; i < t.data.dataList.length; i ++) {
      const item = t.data.dataList[i]
      headerList.forEach(header => {
        item[header.fieldName] = item[header.fieldName] * 100 + '%'
      })
    }
    // tableData.value.headerList.slice(1).forEach(h => h.width = 180)
    console.log("tableData.value = t ", t)
  })
})
</script>

<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-divider>预测数据</el-divider>
      <el-table id="dataTable" :data="tableData.dataList" :summary-method="getSummaries" cellpadding="0" cellspacing="0"
                show-summary>
        <el-table-column v-for="(item,index) in  tableData.headerList" :key="index" :label="item.showName"
                         :prop="item.fieldName" align="center"/>
      </el-table>
    </el-card>
  </div>
</template>


<style scoped lang="scss">

</style>