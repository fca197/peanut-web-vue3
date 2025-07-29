<script setup lang="ts">
import {onMounted, ref} from "vue"
import {type ApsMachineWorkstation} from "./ApsMachineWorkstationType.ts"
import {getById, pinyin4jSzmV2, postNoResult} from "@/common/utils/common-js.ts"
import {type FormInstance, FormRules} from "element-plus"
import {Factory, queryFactoryList} from "@v/base/Factory/FactoryType.ts";
import {ApsMachine, queryApsMachineList} from "@v/aps/ApsMachine/ApsMachineType.ts";
import {ArrowDown} from "@element-plus/icons-vue";

const props = defineProps({
  saveFun: {
    type: Function
  },
  editId: {
    type: String,
    required: false
  }
})

// 对象URL
const dtoUrl = ref<string>("/apsMachineWorkstation")
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
  // 工作站编号
  machineWorkstationNo: [
    {required: true, message: "请输入工作站编号", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 工作站名称
  machineWorkstationName: [
    {required: true, message: "请输入工作站名称", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 最小功率
  minPower: [
    {required: true, message: "请输入最小功率", trigger: "blur"},
    {min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"}
  ],
  // 最大功率
  maxPower: [
    {required: true, message: "请输入最大功率", trigger: "blur"},
    {min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur"}
  ],
  // 工厂ID
  factoryId: [
    {required: true, message: "请输入工厂ID", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 排序索引
  sortIndex: [
    {required: true, message: "请输入排序索引", trigger: "blur"}
  ],

  // 耗时
  useTime: [
    {required: true, message: "请输入排序索引", trigger: "blur"}
  ],

})

const loadEntity = ref<boolean>(true)
// 添加对象
const addForm = ref<ApsMachineWorkstation>({
  machineWorkstationNo: "",
  machineWorkstationName: "",
  minPower: "",
  maxPower: "",
  factoryId: "",
  sortIndex: 0,
  id: "",
  machineWorkstationItemDtoList: []
})

const apsMachineList = ref<ApsMachine[]>([])
const loadingMachineList = ref<boolean>(false)
watch(() => addForm.value.factoryId, (n) => {
  if (n) {
    loadingMachineList.value = true;
    // addForm.value.machineWorkstationItemDtoList = []
    queryApsMachineList(addForm.value.factoryId).then((res) => {
      apsMachineList.value = res
      apsMachineList.value.forEach(t => {
        t.machineId = t.id
        t.id = undefined
        t.sortIndex = Number.parseInt(t.sortIndex)
      })
      loadingMachineList.value = false;
      sortArrays()
      loadEntity.value = false
    })
  } else {
    apsMachineList.value = []
  }
})

const loadById = () => {
  if (!props.editId) {
    loadEntity.value = false
    return
  }
  console.info("props.editId ", props.editId)
  getById(`${dtoUrl.value}/queryByIdList`, props.editId).then((t) => {
    t.sortIndex = Number.parseInt(t.sortIndex)
    addForm.value = t
    console.info(" addForm.value ", addForm.value)
  })
}

// 保存
const saveForm = () => {

  console.info("addForm ", addForm)
  addFormRef.value?.validate((valid) => {
    if (valid) {
      // 存在ID ，调用更新
      if (props.editId) {
        postNoResult(`${dtoUrl.value}/updateById`, addForm.value, "修改成功", saveFormAfter)
      } else {
        // 调用保存
        postNoResult(`${dtoUrl.value}/insert`, addForm.value, "保存成功", saveFormAfter)
      }
    } else {
      ElMessage.error("表单校验失败，请检查必填项")
    }
  })
}

// 保存成功后，方法， 目前关闭弹窗
const saveFormAfter = () => {
  cancelForm()
}

// 取消方法
const cancelForm = () => {
  if (props.saveFun) {
    props.saveFun()
  }
}
const factoryList = ref<Factory[]>([])

// 页面加载事件
onMounted(() => {
  loadById()
  queryFactoryList().then(t => factoryList.value = t)
})
watch(() => addForm.value.machineWorkstationName, (n, o) => {
  pinyin4jSzmV2(addForm.value.machineWorkstationName, o).then((res) => addForm.value.machineWorkstationNo = res)
})

// 按数组A的顺序排序数组B，多余元素排在后面
const sortArrays = () => {
  // 创建ID到索引的映射
  const arrayA = addForm.value.machineWorkstationItemDtoList
  const arrayB = apsMachineList;
  const idIndexMap = new Map()
  arrayA.forEach((item, index) => {
    idIndexMap.set(item.machineId, index)
  })

  // 分离匹配元素和多余元素
  const matchedItems = []
  const extraItems = []

  arrayB.value.forEach(item => {
    if (idIndexMap.has(item.machineId)) {
      matchedItems.push(item)
    } else {
      extraItems.push(item)
    }
  })
  console.log("matchedItems", matchedItems, extraItems)
  // 对匹配的元素进行排序
  matchedItems.sort((a, b) => {
    const indexA = idIndexMap.get(a.machineId)
    const indexB = idIndexMap.get(b.machineId)
    return indexA - indexB
  })
  console.info("matchedItems ", matchedItems, extraItems)
  // 合并排序后的元素和多余元素
  apsMachineList.value = [...matchedItems, ...extraItems]
  console.info("apsMachineList ", apsMachineList)
}

// 交换数组中两个元素的位置
const swapItems = (indexA, indexB) => {
  const array = addForm.value.machineWorkstationItemDtoList;
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
}
const addMachine = (data: ApsMachine) => {
  addForm.value?.machineWorkstationItemDtoList.push({...data})
}
const deleteMachine = (index: number) => {
  addForm.value.machineWorkstationItemDtoList.splice(index, 1)
}

const sumUseTime = () => {
  addForm.value.useTime = addForm.value?.machineWorkstationItemDtoList
  .map(t => t.useTime)
  .filter(t => t !== undefined && t !== null)
  .map(t => Number.parseInt(t))
  .reduce((acc, curr) => acc + curr, 0)
}
const sumMinPower = () => {
  addForm.value.minPower = addForm.value?.machineWorkstationItemDtoList
  .map(t => t.minPower)
  .filter(t => t !== undefined && t !== null)
  .map(t => Number.parseInt(t))
  .reduce((acc, curr) => acc + curr, 0)
}
const sumMaxPower = () => {
  addForm.value.maxPower = addForm.value?.machineWorkstationItemDtoList
  .map(t => t.maxPower)
  .filter(t => t !== undefined && t !== null)
  .map(t => Number.parseInt(t))
  .reduce((acc, curr) => acc + curr, 0)
}

</script>

<template>
  <el-form v-loading="loadEntity" label-width="100px" :model="addForm" ref="addFormRef"
           :rules="checkRules">
    <el-form-item label="工作站名称" prop="machineWorkstationName">
      <el-input v-model="addForm.machineWorkstationName" clearable placeholder="请输入工作站名称"/>
    </el-form-item>
    <el-form-item label="工作站编号" prop="machineWorkstationNo">
      <el-input v-model="addForm.machineWorkstationNo" clearable placeholder="请输入工作站编号"/>
    </el-form-item>
    <el-form-item label="工厂" prop="factoryId">
      <el-select v-model="addForm.factoryId" clearable placeholder="请选择工厂" style="width: 100%">
        <el-option
          v-for=" f in factoryList" :label="f.factoryName" :key="f.id" :value="f.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="机器">
      <el-dropdown type="primary">
        <template #default>
          <el-button type="primary">
            添加
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </el-button>
        </template>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="addMachine(m)" v-for="m in apsMachineList" :key="m.machineId">
              {{ m.machineName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-table
        :data="addForm.machineWorkstationItemDtoList">
        <el-table-column prop="machineName" label="机器名称"/>
        <el-table-column prop="minPower" label="最小功率"/>
        <el-table-column prop="maxPower" label="最大功率"/>
        <el-table-column prop="useTime" label="耗时">
          <template #default="scope">
            <el-input v-model="scope.row.useTime"/>
          </template>
        </el-table-column>
        <ElTableColumn fixed="right" label="操作" width="250" align="center">
          <template #default="scope">
            <el-button type="primary" icon="ArrowUp" v-if="scope.$index !==0"
                       @click="swapItems(scope.$index,scope.$index-1)">
              上移
            </el-button>
            <el-button type="danger" @click="deleteMachine(scope.$index)">
              删除
            </el-button>
          </template>
        </ElTableColumn>
      </el-table>
    </el-form-item>
    <el-form-item label="最小功率" prop="minPower">
      <el-input v-model="addForm.minPower" clearable placeholder="请输入最小功率">
        <template #append>
          <el-button icon="Refresh" @click="sumMinPower"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="最大功率" prop="maxPower">
      <el-input v-model="addForm.maxPower" clearable placeholder="请输入最大功率">
        <template #append>
          <el-button icon="Refresh" @click="sumMaxPower"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="耗时" prop="useTime">
      <el-input v-model="addForm.useTime" clearable placeholder="请输入耗时">
        <template #append>
          <el-button icon="Refresh" @click="sumUseTime"/>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="排序索引" prop="sortIndex">
      <el-input-number
        v-model="addForm.sortIndex" style="width: 100%" clearable
        placeholder="请输入排序索引"/>
    </el-form-item>
  </el-form>
  <el-row class="addFormBtnRow">
    <el-button @click="cancelForm" type="info" icon="close">
      取消
    </el-button>
    <el-button @click="saveForm" type="primary" icon="check">
      确定
    </el-button>
  </el-row>
</template>

<style scoped lang="scss">

</style>
