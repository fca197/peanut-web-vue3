<template>
  <el-form label-width="90px" :model="addForm">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="addForm.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="loginPhone">
      <el-input v-model="addForm.loginPhone" placeholder="请输入电话"></el-input>
    </el-form-item>
  </el-form>
  <el-row class="addFormBtnRow">
    <el-button @click="cancelForm" type="info" icon="close">取消</el-button>
    <el-button @click="saveForm" type="primary" icon="check">确定</el-button>
  </el-row>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {save} from "@/common/utils/common-js.ts"

const props = defineProps({
  saveFun: {
    type: Function
  }
})

const addForm = ref({
  userName: undefined,
  loginPhone: undefined
})

const saveForm = () => {
  console.info("addForm ", addForm)
  save("/loginAccount/insert", addForm.value, saveFormAfter)
}
const saveFormAfter = (data: any) => {
  const pwd = data.data.newPwd
  console.info("data ",data)
  ElMessageBox.alert(`密码为： <span style='font-size: 20px;color: red'>${pwd}</span>,仅提示一次，请妥善保存`,"密码提示",{
    dangerouslyUseHTMLString: true
  })
  cancelForm()
}

const cancelForm = (data: any) => {
  if (props.saveFun) {
    props.saveFun();
  }
}

</script>

<style scoped lang="scss">

</style>
