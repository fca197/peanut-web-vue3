<template>
  <el-form label-width="80px" :model="addForm" ref="addFormRef" :rules="checkRules">
    <el-form-item label="工厂名称" prop="factoryName">
      <el-input v-model="addForm.factoryName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="工厂编号" prop="factoryCode">
      <el-input v-model="addForm.factoryCode" placeholder="请输入电话"></el-input>
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
import {getById, postNoResult} from "@/common/utils/common-js.ts"
import {type FormInstance, FormRules} from "element-plus"
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
  factoryName: [
    {required: true, message: "请输入工厂名称", trigger: "blur"},
    {min: 3, max: 10, message: "用户名长度在 3 到 10 个字符", trigger: "blur"}
  ],
  factoryCode: [
    {required: true, message: "请输入工厂编码", trigger: "blur"},
    {min: 2, max: 20, message: "密码长度在 2 到 20 个字符", trigger: "blur"}
  ]
})

const props = defineProps({
  saveFun: {
    type: Function
  },
  editId: {
    type: String,
    required: false
  }
})

onMounted(() => {
  loadById()
})

const addForm = ref({
  factoryName: undefined,
  factoryCode: undefined
})

function loadById() {
  if (!props.editId) {
    return
  }
  console.info("props.editId ", props.editId)
  getById("/factory/queryByIdList", props.editId).then(t => {
    addForm.value = t
    console.info(" addForm.value ", addForm.value)
  })
}

function saveForm() {
  console.info("addForm ", addForm)
  addFormRef.value?.validate((valid) => {
    if (valid) {
      if (props.editId) {
        postNoResult("/factory/updateById", addForm.value, "修改成功", saveFormAfter)
      } else {
        postNoResult("/factory/insert", addForm.value, "保存成功", saveFormAfter)
      }
    } else {
      ElMessage.error("表单校验失败，请检查必填项")
    }
  });
}

function saveFormAfter() {
  cancelForm()
}

function cancelForm() {
  if (props.saveFun) {
    props.saveFun()
  }
}
</script>

<style scoped lang="scss">

</style>
