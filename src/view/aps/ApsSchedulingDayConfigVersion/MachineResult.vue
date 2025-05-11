<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form :inline="true" size="small">
        <el-form-item label="时间间隔">
          <el-select style="width: 200px" v-model="timeInterval" @change="timeSpanChange">
            <el-option v-for="t in timeIntervalArr" :key="t.value" :value="t.value" :label="t.label"/>
          </el-select>
        </el-form-item>
        <el-form-item>

          <el-button type="primary" icon="download" @click="downloadDataList">
            下载
          </el-button>
        </el-form-item>
      </el-form>
      <el-divider>
        概览
      </el-divider>
      <el-form :inline="true">
        <el-form-item label="开始时间:">{{ beginDateTime }}</el-form-item>
        <el-form-item label="结束时间时间:">{{ endDateTime }}</el-form-item>
        <el-form-item label="时间段数量:">{{ zzljEnd - zzljStart }}</el-form-item>
        <el-form-item label="总耗时:">{{ (zzljEnd - zzljStart) * timeInterval }} 秒</el-form-item>
      </el-form>
    </el-card>
    <el-card class="search-wrapper" shadow="never">
      <el-divider>
        机器生产顺序
      </el-divider>
      <el-row :style="{'width':((zzljEnd-zzljStart)*130+100 )+'px'}" id="jqscsxDivId" :key="reloadZZLJKey">
        <div class="headerItem " style="width: 100px"> 机器名称</div>
        <span class="headerItem  header" v-for="(index,i) in zzljEnd-zzljStart" style="width: 130px;text-align: center">
        {{ formatDate(new Date((zzljStart * 1000 * timeInterval) + index * 1000 * timeInterval)).substr(0, 10) }}
        <br/>
        {{ formatDate(new Date((zzljStart * 1000 * timeInterval) + index * 1000 * timeInterval)).substr(11) }}
      </span>

        <div v-for="(m,i) in machineList">
          <el-row class="headerItem  orderNoDiv" style="width: 100px">{{ m.machineName }}</el-row>
          <el-row class="headerItem orderNoDiv" :id="m.id + '_' + i" v-for="(index,i) in zzljEnd-zzljStart"
                  style="width: 130px;text-align: left">
            <el-row
              v-if="orderNoTimeMap[m.id + '_' + index] && orderNoTimeMap[m.id + '_' + index].length>0">
              <el-row class="orderNoInfo"
                      :style="{'z-index': index,'width': o.colSpan*130 +'px','backgroundColor':colorMap[o.orderNo]}"
                      v-for="(o,i) in  ( orderNoTimeMap[m.id + '_' + index])"
              >{{ o.orderNo }}
              </el-row>
            </el-row>
          </el-row>
          <hr/>
        </div>
      </el-row>
    </el-card>

    <el-card class="search-wrapper" shadow="never">
      <h2>机器使用率</h2>
      <el-table :data="machineList">
        <el-table-column label="机器名称" prop="machineName"></el-table-column>
        <el-table-column label="制造数量">
          <template #default="scope">
            {{ machineUseRate[scope.row.id]["makeProduceCount"] }}
          </template>
        </el-table-column>
        <el-table-column label="制造耗时">
          <template #default="scope">
            {{ machineUseRate[scope.row.id]["useTime"] }}
          </template>
        </el-table-column>
        <el-table-column label="使用率">
          <template #default="scope">
            {{ machineUseRate[scope.row.id]["useUsageRate"] }}%
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import { useRoute } from "vue-router";
import { ApsMachine, queryApsMachineList } from "@v/aps/ApsMachine/ApsMachineType.ts";
import { downloadFilePost, KVEntity, listGroupBy, postResultInfo, postResultInfoList } from "@@/utils/common-js.ts";

const beginDateTime = ref<string>(null)
const endDateTime = ref<string>(null)
const reloadZZLJKey = ref<string>(Math.random() * 100000 + "")
const zzljEnd = ref<number>(0)
const zzljStart = ref<number>(0)
const jqscsxDivRef = ref<any>(null)

const timeIntervalArr = ref<KVEntity []>([
  { label: "10分钟", value: 600 },
  { label: "15分钟", value: 900 },
  { label: "30分钟", value: 1800 },
  { label: "1小时", value: 3600 },
  { label: "3小时", value: 10800 },
  { label: "6小时", value: 21600 },
  { label: "12小时", value: 43200 },
  { label: "24小时", value: 86400 }
])

const timeInterval = ref<number>(timeIntervalArr.value[0].value)
const machineList = ref<ApsMachine[]>([])
const orderNoTimeMap = ref<any>({})
const colorMap = ref<any>({})
const machineUseRate = ref<any>({})
// 获取当前路由信息
const route = useRoute();

// 从路由参数中获取id
const id = route.params.id as string;
console.info("id ", id)
const factoryId = route.params.factoryId as string;
console.info("factoryId ", factoryId)

const formatDate = (val) => {
  var date = new Date(Number(val)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1)
    : date.getMonth() + 1) + "-";
  var D = padLeftZero(date.getDate()) + " ";
  var h = padLeftZero(date.getHours()) + ":";
  var m = padLeftZero(date.getMinutes()) + ":";
  var s = padLeftZero(date.getSeconds());
  return Y + M + D + h + m + s;
}

const padLeftZero = (str) => {
  return str <= 9 ? '0' + str : str;
}

const timeSpanChange = () => {
  queryDetailList()
}
const queryDetailList = () => {
  orderNoTimeMap.value = {}

  return queryApsMachineList(factoryId).then(r => {
    r = r.sort((a, b) => {
      return parseInt(a.sortIndex) - parseInt(b.sortIndex)
    })
    machineList.value = r
    console.info("queryApsMachineList", machineList.value, factoryId)
  }).then(() => {
    postResultInfo("/apsSchedulingDayConfigVersionDetailMachine/queryList", {
      data: {
        schedulingDayId: id
      }
    }).then(r => {
      let ll = r.data.dataList.sort((a, b) => a.beginDateTime.localeCompare(b.beginDateTime))
      ll.forEach(o => {
        let t = colorMap.value[o.orderNo]
        if(t === undefined) {
          colorMap.value[o.orderNo] = getRandomShallowColor()
        }
      })
      let apsSchedulingDayConfigVersionDetailMachineList = listGroupBy(ll, 'machineName')
      beginDateTime.value = ll.map(t => t.beginDateTime).sort()[0]
      endDateTime.value = ll.map(t => t.beginDateTime).sort()[ll.length - 1]
      zzljStart.value = getTimeInterval(beginDateTime.value) - 1
      zzljEnd.value = getTimeInterval(endDateTime.value) - 1
      for (let k in apsSchedulingDayConfigVersionDetailMachineList) {
        let orderList = apsSchedulingDayConfigVersionDetailMachineList[k]
        let tm = {}
        console.info("k ", k, orderList)
        orderList.forEach(o => {
          let obI = getTimeInterval(o.beginDateTime)
          let ebI = getTimeInterval(o.endDateTime)
          let elementId = o.machineId + '_' + (obI - zzljStart.value)
          let t = tm[elementId]
          o.colSpan = ebI - obI + 1
          if(t) {
            tm[elementId].push(o)
          } else {
            tm[elementId] = [ o ]
          }
          // this.orderNoTimeMap [elementId]=  this.orderNoTimeMap [elementId].sort(function(o1, o2) {return  o1.beginDateTime > o2.beginDateTime})
        })
        for (const tmKey in tm) {
          orderNoTimeMap.value[tmKey] = tm[tmKey]
        }
      }
      reloadZZLJKey.value = Math.random() + ""
      console.info("reloadZZLJKey ", reloadZZLJKey.value, "orderNoTimeMap", orderNoTimeMap, machineList.value, "jqscsxDivRef", jqscsxDivRef.value)

    }).then(() => {
      console.info("      document.getElementById(\"jqscsxDivId\") ", document.getElementById("jqscsxDivId"))
      document.getElementById("jqscsxDivId").className = "scrollDiv"
    })
  })
}

const queryMachineUserRate = () => {

  postResultInfoList("/apsSchedulingDayConfigVersionDetailMachineUseTime/queryList", { data: { schedulingDayId: id } })
    .then(r => {
      // log(t)
      r.forEach(tt => {
        machineUseRate.value[tt.machineId] = tt
      })
    })
}
onMounted(() => {
  queryDetailList()
  queryMachineUserRate()
})
const getRandomShallowColor = () => {
  const maxValue = 255
  const shallowValue = 200  // 假设浅色的明度是最大值的一半
  const randomValue = () => Math.random() * shallowValue + shallowValue / 2 // 生成位于半明度和最大值之间的随机数
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`
}
const getTimeInterval = (time) => {
  return parseInt(new Date(Date.parse(time)).getTime() / 1000 / timeInterval.value + '')
}

const downloadDataList = () => {
  downloadFilePost("/apsSchedulingDayConfigVersionDetailMachine/exportQueryPageList", {
    timeSpan: timeInterval.value,
    data: {
      schedulingDayId: id
    }
  }, "排程结果.xlsx")
}
</script>

<style scoped lang="scss">

.headerItem {
  display: inline-flex;
}

.zzljDiv {
  overflow-x: scroll;
  margin: 5px;
}

.zzljDiv > div > div.header {
  border-right: 1px solid #00D3E9;
}

div.orderNoInfo {
  line-height: 25px;
  height: 25px;
  border: 1px solid #dddddd;
}

div.orderNoDiv {
  line-height: 30px;
}

.scrollDiv {
  overflow-x: scroll;
}
</style>