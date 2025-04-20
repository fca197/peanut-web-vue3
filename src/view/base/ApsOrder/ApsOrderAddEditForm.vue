<template>
  <el-form label-width="80px" :model="addForm" ref="addFormRef" :rules="checkRules">
      <el-form-item label="${column.comment}" prop="orderNo">
        <el-input v-model="addForm.orderNo" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="orderRemark">
        <el-input v-model="addForm.orderRemark" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-input v-model="addForm.orderStatus" clearable placeholder="请输入订单状态"/>
      </el-form-item>
      <el-form-item label="成本价" prop="orderTotalPrice">
        <el-input v-model="addForm.orderTotalPrice" clearable placeholder="请输入成本价"/>
      </el-form-item>
      <el-form-item label="商品ID" prop="goodsId">
        <el-input v-model="addForm.goodsId" clearable placeholder="请输入商品ID"/>
      </el-form-item>
      <el-form-item label="总价" prop="reserveAmount">
        <el-input v-model="addForm.reserveAmount" clearable placeholder="请输入总价"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="reserveDatetime">
        <el-input v-model="addForm.reserveDatetime" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="总价" prop="finishPayedAmount">
        <el-input v-model="addForm.finishPayedAmount" clearable placeholder="请输入总价"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="finishPayedDatetime">
        <el-input v-model="addForm.finishPayedDatetime" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="makeFinishDate">
        <el-input v-model="addForm.makeFinishDate" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="实际完成时间" prop="actMakeFinishDate">
        <el-input v-model="addForm.actMakeFinishDate" clearable placeholder="请输入实际完成时间"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="deliveryDate">
        <el-input v-model="addForm.deliveryDate" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="工厂ID" prop="factoryId">
        <el-input v-model="addForm.factoryId" clearable placeholder="请输入工厂ID"/>
      </el-form-item>
      <el-form-item label="紧急度0最小,越大越紧急" prop="urgencyLevel">
        <el-input v-model="addForm.urgencyLevel" clearable placeholder="请输入紧急度0最小,越大越紧急"/>
      </el-form-item>
      <el-form-item label="排产时间" prop="schedulingDate">
        <el-input v-model="addForm.schedulingDate" clearable placeholder="请输入排产时间"/>
      </el-form-item>
      <el-form-item label="父订单号" prop="orderNoParent">
        <el-input v-model="addForm.orderNoParent" clearable placeholder="请输入父订单号"/>
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
import {type ApsOrder} from "./ApsOrderType.ts"
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
const dtoUrl = ref<string>("/apsOrder")
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
    //
    orderNo: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    orderRemark: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 订单状态
    orderStatus: [
      {required: true, message: "请输入订单状态", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 成本价
    orderTotalPrice: [
      {required: true, message: "请输入成本价", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 商品ID
    goodsId: [
      {required: true, message: "请输入商品ID", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 总价
    reserveAmount: [
      {required: true, message: "请输入总价", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    reserveDatetime: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 总价
    finishPayedAmount: [
      {required: true, message: "请输入总价", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    finishPayedDatetime: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    makeFinishDate: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 实际完成时间
    actMakeFinishDate: [
      {required: true, message: "请输入实际完成时间", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    deliveryDate: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 工厂ID
    factoryId: [
      {required: true, message: "请输入工厂ID", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 紧急度0最小,越大越紧急
    urgencyLevel: [
      {required: true, message: "请输入紧急度0最小,越大越紧急", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 排产时间
    schedulingDate: [
      {required: true, message: "请输入排产时间", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 父订单号
    orderNoParent: [
      {required: true, message: "请输入父订单号", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],

})

// 页面加载事件
onMounted(() => {
  loadById()
})
// 添加对象
const addForm = ref<ApsOrder>({
      orderNo: "",
      orderRemark: "",
      orderStatus: "",
      orderTotalPrice: "",
      goodsId: "",
      reserveAmount: "",
      reserveDatetime: "",
      finishPayedAmount: "",
      finishPayedDatetime: "",
      makeFinishDate: "",
      actMakeFinishDate: "",
      deliveryDate: "",
      factoryId: "",
      urgencyLevel: "",
      schedulingDate: "",
      orderNoParent: "",
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

