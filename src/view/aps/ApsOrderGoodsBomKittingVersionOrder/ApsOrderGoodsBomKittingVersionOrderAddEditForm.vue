<script setup lang="ts">
import {onMounted, ref} from "vue"
import {
  type ApsOrderGoodsBomKittingVersionOrder
} from "./ApsOrderGoodsBomKittingVersionOrderType.ts"
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
const dtoUrl = ref<string>("/apsOrderGoodsBomKittingVersionOrder")
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
  // 齐套版本id
  kittingVersionId: [
    {required: true, message: "请输入齐套版本id", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单ID
  orderId: [
    {required: true, message: "请输入订单ID", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单ID
  orderNo: [
    {required: true, message: "请输入订单ID", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 齐套率
  kittingRate: [
    {required: true, message: "请输入齐套率", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 齐套状态 已齐套， 部分齐套，未齐套
  kittingStatus: [
    {required: true, message: "请输入齐套状态 已齐套， 部分齐套，未齐套", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 缺失物料前10 [{id: label}]
  kittingMissingBom: [
    {required: true, message: "请输入缺失物料前10 [{id: label}]", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField01: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField02: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField03: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField04: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField05: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField06: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField07: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField08: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField09: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField10: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField11: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField12: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField13: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField14: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField15: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField16: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField17: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField18: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField19: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 订单字段
  orderField20: [
    {required: true, message: "请输入订单字段", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],
  // 工厂ID
  factoryId: [
    {required: true, message: "请输入工厂ID", trigger: "blur"},
    {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
  ],

})


// 添加对象
const addForm = ref<ApsOrderGoodsBomKittingVersionOrder>({
  kittingVersionId: "",
  orderId: "",
  orderNo: "",
  kittingRate: "",
  kittingStatus: "",
  kittingMissingBom: "",
  orderField01: "",
  orderField02: "",
  orderField03: "",
  orderField04: "",
  orderField05: "",
  orderField06: "",
  orderField07: "",
  orderField08: "",
  orderField09: "",
  orderField10: "",
  orderField11: "",
  orderField12: "",
  orderField13: "",
  orderField14: "",
  orderField15: "",
  orderField16: "",
  orderField17: "",
  orderField18: "",
  orderField19: "",
  orderField20: "",
  factoryId: "",
  id: ""
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

// 页面加载事件
onMounted(() => {
  loadById()
})
</script>

<template>
  <el-form label-width="80px" :model="addForm" ref="addFormRef" :rules="checkRules">
    <el-form-item label="齐套版本id" prop="kittingVersionId">
      <el-input v-model="addForm.kittingVersionId" clearable placeholder="请输入齐套版本id"/>
    </el-form-item>
    <el-form-item label="订单ID" prop="orderId">
      <el-input v-model="addForm.orderId" clearable placeholder="请输入订单ID"/>
    </el-form-item>
    <el-form-item label="订单ID" prop="orderNo">
      <el-input v-model="addForm.orderNo" clearable placeholder="请输入订单ID"/>
    </el-form-item>
    <el-form-item label="齐套率" prop="kittingRate">
      <el-input v-model="addForm.kittingRate" clearable placeholder="请输入齐套率"/>
    </el-form-item>
    <el-form-item label="齐套状态 已齐套， 部分齐套，未齐套" prop="kittingStatus">
      <el-input v-model="addForm.kittingStatus" clearable
                placeholder="请输入齐套状态 已齐套， 部分齐套，未齐套"/>
    </el-form-item>
    <el-form-item label="缺失物料前10 [{id: label}]" prop="kittingMissingBom">
      <el-input v-model="addForm.kittingMissingBom" clearable
                placeholder="请输入缺失物料前10 [{id: label}]"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField01">
      <el-input v-model="addForm.orderField01" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField02">
      <el-input v-model="addForm.orderField02" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField03">
      <el-input v-model="addForm.orderField03" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField04">
      <el-input v-model="addForm.orderField04" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField05">
      <el-input v-model="addForm.orderField05" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField06">
      <el-input v-model="addForm.orderField06" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField07">
      <el-input v-model="addForm.orderField07" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField08">
      <el-input v-model="addForm.orderField08" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField09">
      <el-input v-model="addForm.orderField09" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField10">
      <el-input v-model="addForm.orderField10" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField11">
      <el-input v-model="addForm.orderField11" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField12">
      <el-input v-model="addForm.orderField12" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField13">
      <el-input v-model="addForm.orderField13" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField14">
      <el-input v-model="addForm.orderField14" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField15">
      <el-input v-model="addForm.orderField15" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField16">
      <el-input v-model="addForm.orderField16" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField17">
      <el-input v-model="addForm.orderField17" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField18">
      <el-input v-model="addForm.orderField18" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField19">
      <el-input v-model="addForm.orderField19" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="订单字段" prop="orderField20">
      <el-input v-model="addForm.orderField20" clearable placeholder="请输入订单字段"/>
    </el-form-item>
    <el-form-item label="工厂ID" prop="factoryId">
      <el-input v-model="addForm.factoryId" clearable placeholder="请输入工厂ID"/>
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

