<template>
  <div class="app-container">
    <el-card class="search-wrapper" shadow="never">
      <el-form v-model="queryForm" inline>
        <el-form-item label="手机号" prop="loginPhone">
          <el-input v-model="queryForm.loginPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search"> 查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-button type="primary" icon="plus" @click="addEditClick">添加</el-button>
      <el-button type="danger" icon="Minus">删除</el-button>
    </el-card>
    <el-card shadow="never">
      <el-table :data="dataList" v-loading="tableLoading">
        <el-table-column label="手机号" prop="loginPhone"></el-table-column>
        <el-table-column label="手机号" prop="loginPhone"></el-table-column>
        <el-table-column label="手机号" prop="loginPhone"></el-table-column>
        <el-table-column label="手机号" prop="loginPhone"></el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="adDialogShowTitle" v-model="adDialogShow">
      <add-edit-form-vue :login-account="addEditForm"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import AddEditFormVue from "./AddEditForm.vue";

const queryForm = ref({
  loginPhone: undefined
})
const addEditForm = ref({
  loginPhone: undefined
})
const adDialogShowTitle = ref("");
const tableLoading = ref(true)
const adDialogShow = ref(true)
const dataList = [{
  loginPhone: "1293892323"
}, {
  loginPhone: "1293892323"
}, {
  loginPhone: "1293892323"
}, {
  loginPhone: "1293892323"
}];
tableLoading.value = false

function addEditClick(data: any) {
  if (data) {
    adDialogShowTitle.value = "修改用户信息"
  } else {
    adDialogShowTitle.value = "添加用户信息"
  }
  adDialogShow.value = true
}
</script>

<style scoped lang="scss">

</style>
