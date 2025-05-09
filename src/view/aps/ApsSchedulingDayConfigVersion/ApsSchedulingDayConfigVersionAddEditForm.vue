<script setup lang="ts">
import { onMounted, ref } from "vue"
import { type ApsSchedulingDayConfigVersion } from "./ApsSchedulingDayConfigVersionType.ts"
import { getById, postNoResult } from "@/common/utils/common-js.ts"
import { type FormInstance, FormRules } from "element-plus"

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
const dtoUrl = ref<string>("/apsSchedulingDayConfigVersion")
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
  // 配置ID
  schedulingDayConfigId: [
    { required: true, message: "请输入配置ID", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 工厂ID
  factoryId: [
    { required: true, message: "请输入工厂ID", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 排程版本号
  schedulingDayVersionNo: [
    { required: true, message: "请输入排程版本号", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 排程日期
  schedulingDay: [
    { required: true, message: "请输入排程日期", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 是否查询历史订单 0否， 1是
  searchOld: [
    { required: true, message: "请输入是否查询历史订单 0否， 1是", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 是否下发 0 否,1 是
  isIssuedThird: [
    { required: true, message: "请输入是否下发 0 否,1 是", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 工艺路径id
  processId: [
    { required: true, message: "请输入工艺路径id", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 排产日配置版本表头
  headerList: [
    { required: true, message: "请输入排产日配置版本表头", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 排产生产类型
  productType: [
    { required: true, message: "请输入排产生产类型", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 商品列表
  goodsIdList: [
    { required: true, message: "请输入商品列表", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 销售配置ID
  saleConfigIdList: [
    { required: true, message: "请输入销售配置ID", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 当前步骤
  stepIndex: [
    { required: true, message: "请输入当前步骤", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 订单字段
  orderFieldList: [
    { required: true, message: "请输入订单字段", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  // 订单用户字段
  orderUserFieldList: [
    { required: true, message: "请输入订单用户字段", trigger: "blur" },
    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],

})


// 添加对象
const addForm = ref<ApsSchedulingDayConfigVersion>({
  schedulingDayConfigId: "",
  factoryId: "",
  schedulingDayVersionNo: "",
  schedulingDay: "",
  searchOld: "",
  isIssuedThird: "",
  processId: "",
  headerList: "",
  productType: "",
  goodsIdList: "",
  saleConfigIdList: "",
  stepIndex: "",
  orderFieldList: "",
  orderUserFieldList: "",
  id: ""
})

const loadById = () => {
  if(!props.editId) {
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
    if(valid) {
      // 存在ID ，调用更新
      if(props.editId) {
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
  if(props.saveFun) {
    props.saveFun()
  }
}

// 页面加载事件
onMounted(() => {
  loadById()
})
</script>

<template>
  <el-form label-width="80px" :model="addForm" ref="addFormRef" :rules="checkRules">
    <el-form-item label="配置ID" prop="schedulingDayConfigId">
      <el-input v-model="addForm.schedulingDayConfigId" clearable placeholder="请输入配置ID"/>
    </el-form-item>
    <el-form-item label="工厂ID" prop="factoryId">
      <el-input v-model="addForm.factoryId" clearable placeholder="请输入工厂ID"/>
    </el-form-item>
    <el-form-item label="排程版本号" prop="schedulingDayVersionNo">
      <el-input v-model="addForm.schedulingDayVersionNo" clearable placeholder="请输入排程版本号"/>
    </el-form-item>
    <el-form-item label="排程日期" prop="schedulingDay">
      <el-input v-model="addForm.schedulingDay" clearable placeholder="请输入排程日期"/>
    </el-form-item>
    <el-form-item label="是否查询历史订单 0否， 1是" prop="searchOld">
      <el-input v-model="addForm.searchOld" clearable placeholder="请输入是否查询历史订单 0否， 1是"/>
    </el-form-item>
    <el-form-item label="是否下发 0 否,1 是" prop="isIssuedThird">
      <el-input v-model="addForm.isIssuedThird" clearable placeholder="请输入是否下发 0 否,1 是"/>
    </el-form-item>
    <el-form-item label="工艺路径id" prop="processId">
      <el-input v-model="addForm.processId" clearable placeholder="请输入工艺路径id"/>
    </el-form-item>
    <el-form-item label="排产日配置版本表头" prop="headerList">
      <el-input v-model="addForm.headerList" clearable placeholder="请输入排产日配置版本表头"/>
    </el-form-item>
    <el-form-item label="排产生产类型" prop="productType">
      <el-input v-model="addForm.productType" clearable placeholder="请输入排产生产类型"/>
    </el-form-item>
    <el-form-item label="商品列表" prop="goodsIdList">
      <el-input v-model="addForm.goodsIdList" clearable placeholder="请输入商品列表"/>
    </el-form-item>
    <el-form-item label="销售配置ID" prop="saleConfigIdList">
      <el-input v-model="addForm.saleConfigIdList" clearable placeholder="请输入销售配置ID"/>
    </el-form-item>
    <el-form-item label="当前步骤" prop="stepIndex">
      <el-input v-model="addForm.stepIndex" clearable placeholder="请输入当前步骤"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderFieldList">
      <el-input v-model="addForm.orderFieldList" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单用户字段" prop="orderUserFieldList">
      <el-input v-model="addForm.orderUserFieldList" clearable placeholder="请输入订单用户字段"/>
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

