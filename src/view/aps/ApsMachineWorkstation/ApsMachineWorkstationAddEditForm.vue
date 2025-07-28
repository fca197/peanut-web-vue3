<script setup lang="ts">
import {onMounted, ref} from "vue"
import {type ApsMachineWorkstation} from "./ApsMachineWorkstationType.ts"
import {getById, pinyin4jSzmV2, postNoResult} from "@/common/utils/common-js.ts"
import {type FormInstance, FormRules} from "element-plus"
import {Factory, queryFactoryList} from "@v/base/Factory/FactoryType.ts";
import {ApsMachine, queryApsMachineList} from "@v/aps/ApsMachine/ApsMachineType.ts";
import draggable from "vuedraggable";

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

})

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
    addForm.value.machineWorkstationItemDtoList = []
    queryApsMachineList(addForm.value.factoryId).then((res) => {
      apsMachineList.value = res
      apsMachineList.value.forEach(t=>{
        t.id = undefined
      })
      loadingMachineList.value = false;
    })
  }else{
    apsMachineList.value = []
  }
})

const loadById = () => {
  if (!props.editId) {
    return
  }
  console.info("props.editId ", props.editId)
  getById(`${dtoUrl.value}/queryByIdList`, props.editId).then((t) => {
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

</script>

<template>
  <el-form label-width="100px" :model="addForm" ref="addFormRef" :rules="checkRules">
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

      <draggable v-model="apsMachineList" item-key="id" v-loading="loadingMachineList">
        <template #item="{ element }">
          <el-row>
            <el-checkbox v-model="addForm.machineWorkstationItemDtoList"
              :label="element.machineName" :value="element"
              :key="element.id">
            </el-checkbox>
          </el-row>
        </template>
      </draggable>
    </el-form-item>
    <el-form-item label="最小功率" prop="minPower">
      <el-input v-model="addForm.minPower" clearable placeholder="请输入最小功率"/>
    </el-form-item>
    <el-form-item label="最大功率" prop="maxPower">
      <el-input v-model="addForm.maxPower" clearable placeholder="请输入最大功率"/>
    </el-form-item>
    <el-form-item label="排序索引" prop="sortIndex">
      <el-input-number v-model="addForm.sortIndex" style="width: 100%" clearable
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

