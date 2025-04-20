<template>
  <el-form label-width="80px" :model="addForm" ref="addFormRef" :rules="checkRules">
      <el-form-item label="工厂ID" prop="factoryId">
        <el-input v-model="addForm.factoryId" clearable placeholder="请输入工厂ID"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="makeCapacityQuantity">
        <el-input v-model="addForm.makeCapacityQuantity" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="year">
        <el-input v-model="addForm.year" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="${column.comment}" prop="month">
        <el-input v-model="addForm.month" clearable placeholder="请输入${column.comment}"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin1">
        <el-input v-model="addForm.dayMin1" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax1">
        <el-input v-model="addForm.dayMax1" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin2">
        <el-input v-model="addForm.dayMin2" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax2">
        <el-input v-model="addForm.dayMax2" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin3">
        <el-input v-model="addForm.dayMin3" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax3">
        <el-input v-model="addForm.dayMax3" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin4">
        <el-input v-model="addForm.dayMin4" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax4">
        <el-input v-model="addForm.dayMax4" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin5">
        <el-input v-model="addForm.dayMin5" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax5">
        <el-input v-model="addForm.dayMax5" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin6">
        <el-input v-model="addForm.dayMin6" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax6">
        <el-input v-model="addForm.dayMax6" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin7">
        <el-input v-model="addForm.dayMin7" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax7">
        <el-input v-model="addForm.dayMax7" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin8">
        <el-input v-model="addForm.dayMin8" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax8">
        <el-input v-model="addForm.dayMax8" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin9">
        <el-input v-model="addForm.dayMin9" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax9">
        <el-input v-model="addForm.dayMax9" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin10">
        <el-input v-model="addForm.dayMin10" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax10">
        <el-input v-model="addForm.dayMax10" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin11">
        <el-input v-model="addForm.dayMin11" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax11">
        <el-input v-model="addForm.dayMax11" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin12">
        <el-input v-model="addForm.dayMin12" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax12">
        <el-input v-model="addForm.dayMax12" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin13">
        <el-input v-model="addForm.dayMin13" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax13">
        <el-input v-model="addForm.dayMax13" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin14">
        <el-input v-model="addForm.dayMin14" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax14">
        <el-input v-model="addForm.dayMax14" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin15">
        <el-input v-model="addForm.dayMin15" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax15">
        <el-input v-model="addForm.dayMax15" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin16">
        <el-input v-model="addForm.dayMin16" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax16">
        <el-input v-model="addForm.dayMax16" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin17">
        <el-input v-model="addForm.dayMin17" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax17">
        <el-input v-model="addForm.dayMax17" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin18">
        <el-input v-model="addForm.dayMin18" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax18">
        <el-input v-model="addForm.dayMax18" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin19">
        <el-input v-model="addForm.dayMin19" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax19">
        <el-input v-model="addForm.dayMax19" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin20">
        <el-input v-model="addForm.dayMin20" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax20">
        <el-input v-model="addForm.dayMax20" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin21">
        <el-input v-model="addForm.dayMin21" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax21">
        <el-input v-model="addForm.dayMax21" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin22">
        <el-input v-model="addForm.dayMin22" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax22">
        <el-input v-model="addForm.dayMax22" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin23">
        <el-input v-model="addForm.dayMin23" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax23">
        <el-input v-model="addForm.dayMax23" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin24">
        <el-input v-model="addForm.dayMin24" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax24">
        <el-input v-model="addForm.dayMax24" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin25">
        <el-input v-model="addForm.dayMin25" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax25">
        <el-input v-model="addForm.dayMax25" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin26">
        <el-input v-model="addForm.dayMin26" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax26">
        <el-input v-model="addForm.dayMax26" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin27">
        <el-input v-model="addForm.dayMin27" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax27">
        <el-input v-model="addForm.dayMax27" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin28">
        <el-input v-model="addForm.dayMin28" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax28">
        <el-input v-model="addForm.dayMax28" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin29">
        <el-input v-model="addForm.dayMin29" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax29">
        <el-input v-model="addForm.dayMax29" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin30">
        <el-input v-model="addForm.dayMin30" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax30">
        <el-input v-model="addForm.dayMax30" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMin31">
        <el-input v-model="addForm.dayMin31" clearable placeholder="请输入制造数"/>
      </el-form-item>
      <el-form-item label="制造数" prop="dayMax31">
        <el-input v-model="addForm.dayMax31" clearable placeholder="请输入制造数"/>
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
import {type ApsMakeCapacityFactory} from "./ApsMakeCapacityFactoryType.ts"
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
const dtoUrl = ref<string>("/apsMakeCapacityFactory")
// 表单引用
const addFormRef = ref<FormInstance>()
// 表单校验规则
const checkRules = ref<FormRules>({
    // 工厂ID
    factoryId: [
      {required: true, message: "请输入工厂ID", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    makeCapacityQuantity: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    year: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    //
    month: [
      {required: true, message: "请输入${column.comment}", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin1: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax1: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin2: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax2: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin3: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax3: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin4: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax4: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin5: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax5: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin6: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax6: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin7: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax7: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin8: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax8: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin9: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax9: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin10: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax10: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin11: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax11: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin12: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax12: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin13: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax13: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin14: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax14: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin15: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax15: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin16: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax16: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin17: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax17: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin18: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax18: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin19: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax19: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin20: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax20: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin21: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax21: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin22: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax22: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin23: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax23: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin24: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax24: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin25: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax25: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin26: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax26: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin27: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax27: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin28: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax28: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin29: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax29: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin30: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax30: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMin31: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],
    // 制造数
    dayMax31: [
      {required: true, message: "请输入制造数", trigger: "blur"},
      {min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur"}
    ],

})


// 添加对象
const addForm = ref<ApsMakeCapacityFactory>({
      factoryId: "",
      makeCapacityQuantity: "",
      year: "",
      month: "",
      dayMin1: "",
      dayMax1: "",
      dayMin2: "",
      dayMax2: "",
      dayMin3: "",
      dayMax3: "",
      dayMin4: "",
      dayMax4: "",
      dayMin5: "",
      dayMax5: "",
      dayMin6: "",
      dayMax6: "",
      dayMin7: "",
      dayMax7: "",
      dayMin8: "",
      dayMax8: "",
      dayMin9: "",
      dayMax9: "",
      dayMin10: "",
      dayMax10: "",
      dayMin11: "",
      dayMax11: "",
      dayMin12: "",
      dayMax12: "",
      dayMin13: "",
      dayMax13: "",
      dayMin14: "",
      dayMax14: "",
      dayMin15: "",
      dayMax15: "",
      dayMin16: "",
      dayMax16: "",
      dayMin17: "",
      dayMax17: "",
      dayMin18: "",
      dayMax18: "",
      dayMin19: "",
      dayMax19: "",
      dayMin20: "",
      dayMax20: "",
      dayMin21: "",
      dayMax21: "",
      dayMin22: "",
      dayMax22: "",
      dayMin23: "",
      dayMax23: "",
      dayMin24: "",
      dayMax24: "",
      dayMin25: "",
      dayMax25: "",
      dayMin26: "",
      dayMax26: "",
      dayMin27: "",
      dayMax27: "",
      dayMin28: "",
      dayMax28: "",
      dayMin29: "",
      dayMax29: "",
      dayMin30: "",
      dayMax30: "",
      dayMin31: "",
      dayMax31: "",
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

// 页面加载事件
onMounted(() => {
  loadById()
})
</script>

<style scoped lang="scss">

</style>

