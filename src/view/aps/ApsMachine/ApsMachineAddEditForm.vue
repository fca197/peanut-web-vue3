<template>
  <el-form label-width="80px" :model="addForm" ref="addFormRef" :rules="checkRules">
      <el-form-item label="机器编号" prop="machineNo">
        <el-input v-model="addForm.machineNo" clearable placeholder="请输入机器编号"/>
      </el-form-item>
      <el-form-item label="机器名称" prop="machineName">
        <el-input v-model="addForm.machineName" clearable placeholder="请输入机器名称"/>
      </el-form-item>
      <el-form-item label="工厂" prop="factoryId">
        <el-input v-model="addForm.factoryId" clearable placeholder="请输入工厂ID"/>
      </el-form-item>
      <el-form-item label="排序索引" prop="sortIndex">
        <el-input v-model="addForm.sortIndex" clearable placeholder="请输入排序索引"/>
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

<script setup lang="ts">
import {onMounted, ref} from "vue"
import {type ApsMachine} from "./ApsMachineType.ts"
import {getById, postNoResult} from "@/common/utils/common-js.ts"
import {type FormInstance, FormRules} from "element-plus"

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
const dtoUrl = ref<string>("/apsMachine")
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
    // 机器编号
    machineNo: [
      {required: true, message: "请输入机器编号", trigger: "blur" },
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 机器名称
    machineName: [
      {required: true, message: "请输入机器名称", trigger: "blur" },
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 工厂ID
    factoryId: [
      {required: true, message: "请输入工厂ID", trigger: "blur" },
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 排序索引
    sortIndex: [
      {required: true, message: "请输入排序索引", trigger: "blur" },
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],

})

// 页面加载事件
onMounted(() => {
  loadById()
})
// 添加对象
const addForm = ref<ApsMachine>({
      machineNo: "",
      machineName: "",
      factoryId: "",
      sortIndex: "",
      id: ""
})

function loadById() {
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
function saveForm() {
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
function saveFormAfter() {
  cancelForm()
}

// 取消方法
function cancelForm() {
  if (props.saveFun) {
    props.saveFun()
  }
}
</script>

<style scoped lang="scss">

</style>

