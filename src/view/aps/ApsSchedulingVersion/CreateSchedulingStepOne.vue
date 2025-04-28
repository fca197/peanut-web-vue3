<script setup lang="ts">
// 获取当前路由信息

import { Factory, queryFactoryList } from "@v/base/Factory/FactoryType.ts";
import { ApsGoods, queryGoodsList } from "@v/aps/ApsGoods/ApsGoodsType.ts";
import { FormRules } from "element-plus";
import { pinyin4jSzm, postNoResult, postResultInfoList } from "@@/utils/common-js.ts";

const props = defineProps({
  id: {
    type: String,
    required: false
  },
  isUpdate: {
    type: Boolean,
    default: false,
    required: false
  },
  saveAfterFun: {
    type: Function,
    required: false
  },
  preStepFun: {
    type: Function,
    required: false
  }
})

interface AddFormDto {
  schedulingVersionNo: string
  schedulingVersionName: string
  schedulingConstraintsId: string
  startDate: string
  useSaleConfigMakeCapacity: boolean
  useGoodsMakeCapacity: boolean
  useFactoryMakeCapacity: boolean
  schedulingDayCount: number
  factoryIdList: string []
  goodsIdList: string []
}

const addForm = ref<AddFormDto>({
  schedulingVersionNo: "",
  schedulingVersionName: "",
  schedulingConstraintsId: "",
  startDate: "",
  useSaleConfigMakeCapacity: false,
  useGoodsMakeCapacity: false,
  useFactoryMakeCapacity: false,
  schedulingDayCount: 94,
  factoryIdList: [],
  goodsIdList: [],
  id: props.id
})

const formRef = ref(null)
const saveOrUpdate = () => {
  console.info("saveOrUpdate addForm ", addForm, props.isUpdate)
  if(!props.isUpdate) {
    props.saveAfterFun();
    return;
  }

  formRef.value.validate(res => {
    if(res) {
      if("-1" === props.id) {
        postNoResult("/apsSchedulingVersion/insert", addForm.value, "保存成功", (r) => {
          props.saveAfterFun(r)
        })
      } else {
        postNoResult("/apsSchedulingVersion/updateById", addForm.value, "修改成功", (r) => {
          props.saveAfterFun(undefined)
        })
      }
    } else {
      ElMessage.error("表单校验失败，请检查必填项")
    }
  })


}

const factoryList = ref<Factory []>([])
const goodsList = ref<ApsGoods[]>([])

const schedulingConstraintsList = ref<any []>([])

const rules = ref<FormRules>(
  {
    schedulingDayCount: [ { required: true, message: "不能为空" },
      { type: "number", message: "必须为数字值" } ],
    schedulingVersionNo: [ { required: true, message: "不能为空", trigger: "blur" }, {
      min: 1,
      max: 20,
      message: "长度在 1 到 20 个字符",
      trigger: "blur"
    } ],
    schedulingVersionName: [ { required: true, message: "不能为空", trigger: "blur" }, {
      min: 1,
      max: 20,
      message: "长度在 1 到 20 个字符",
      trigger: "blur"
    } ],
    schedulingConstraintsId: [ { required: true, message: "不能为空", trigger: "blur" } ],
    startDate: [ { required: true, message: "不能为空", trigger: "blur" } ]

  }
)
const loadSzm = () => {
  pinyin4jSzm(addForm.value.schedulingVersionName).then(r => addForm.value.schedulingVersionNo = r)
}


onMounted(() => {
  queryFactoryList().then(r => factoryList.value = r)
  queryGoodsList().then(r => goodsList.value = r)
  postResultInfoList("/apsSchedulingConstraints/queryPageList", { queryPage: false }).then(r => schedulingConstraintsList.value = r)

  postResultInfoList("/apsSchedulingVersion/queryByIdList", { idList: [ props.id ] }).then((t) => {
    console.log("apsSchedulingVersion ", t)
    if (t.length>0) {
      addForm.value = t[0]
    }
  })
})

</script>

<template>
  <el-form ref="formRef" :model="addForm" label-width="130px" :rules="rules">
    <el-form-item label="版本名称" prop="schedulingVersionName">
      <el-input v-model="addForm.schedulingVersionName" placeholder="请输入版本名称" @change="loadSzm"></el-input>
    </el-form-item>
    <el-form-item label="版本号" prop="schedulingVersionNo">
      <el-input v-model="addForm.schedulingVersionNo" placeholder="请输入版本号"></el-input>
    </el-form-item>

    <el-form-item label="工厂" prop="factoryIdList">
      <el-select v-model="addForm.factoryIdList" placeholder="请输入版本名称" multiple
                 @change="addForm.goodsIdList = []">
        <el-option v-for="f in factoryList" :label="f.factoryName" :value="f.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品" prop="goodsIdList">
      <el-select v-model="addForm.goodsIdList" placeholder="请输入版本名称" multiple>
        <el-option
          v-for="g in goodsList.filter(t => addForm.factoryIdList.filter((tt) => tt === t.factoryId).length > 0)"
          :value="g.id" :label="g.goodsName"
        ></el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="约束条件" prop="schedulingConstraintsId">
      <el-select v-model="addForm.schedulingConstraintsId" placeholder="请选择约束条件">
        <el-option
          v-for="item in schedulingConstraintsList"
          :key="item.id"
          :label="item.constraintsName"
          :value="item.id"
        >
        </el-option>
      </el-select>

    </el-form-item>

    <el-form-item label="开始日期" prop="startDate">
      <el-date-picker type="date" value-format="YYYY-MM-DD" v-model="addForm.startDate"
                      placeholder="开始日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="排产限制约束">
      <el-checkbox v-model="addForm.useFactoryMakeCapacity" :value="true" label="工厂产能"></el-checkbox>
      <el-checkbox v-model="addForm.useGoodsMakeCapacity" :value="true" label="商品产能">
      </el-checkbox>
      <el-checkbox v-model="addForm.useSaleConfigMakeCapacity" :value="true" label="销售配置产能">
      </el-checkbox>
    </el-form-item>
    <el-form-item label="排产天数" prop="schedulingDayCount">
      <el-input-number
        :min="1" :max="100" v-model.number="addForm.schedulingDayCount"
        placeholder="请输入排产天数"
      />
    </el-form-item>
    <el-row>
      <el-button type="primary" @click="saveOrUpdate">
        下一步
      </el-button>
    </el-row>
  </el-form>
</template>


<style scoped lang="scss">
.el-checkbox-group {
  margin: 0 20px 0 0px;
}
</style>