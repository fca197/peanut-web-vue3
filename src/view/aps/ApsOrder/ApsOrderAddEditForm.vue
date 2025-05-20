<template>
  <el-form ref="form" :model="addForm" label-width="100px" :rules="checkRules">
    <el-tabs tab-position="left" style="height: 650px;" type="border-card">
      <el-tab-pane label="基本信息">
        <el-form-item label="订单编号" prop="orderNo">
          <el-input disabled v-model="addForm.orderNo" placeholder="请输入订单编号"/>
        </el-form-item>
        <el-form-item label="订单金额" prop="orderAmount">
          <el-input v-model="addForm.orderTotalPrice" placeholder="请输入订单金额"/>
        </el-form-item>
        <el-form-item label="定金金额" prop="orderAmount">
          <el-input v-model="addForm.reserveAmount" placeholder="请输入定金金额"/>
        </el-form-item>
        <el-form-item label="定金支付时间">
          <el-date-picker v-model="addForm.reserveDatetime" type="datetime" placeholder="选择日期时间"
                          align="right" value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="尾款金额" prop="finishPayedAmount">
          <el-input v-model="addForm.finishPayedAmount" placeholder="请输入尾款金额"/>
        </el-form-item>
        <el-form-item label="尾款支付时间" prop="finishPayedDatetime">
          <el-date-picker v-model="addForm.finishPayedDatetime" type="datetime" placeholder="选择日期时间"
                          align="right" value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="制造完成时间" prop="makeFinishDate">
          <el-date-picker v-model="addForm.makeFinishDate" type="date" placeholder="选择日期时间"
                          align="right" value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="交付时间" prop="deliveryDate">
          <el-date-picker v-model="addForm.deliveryDate" type="date" placeholder="选择日期时间"
                          align="right" value-format="yyyy-MM-dd"
          />
        </el-form-item>


        <el-form-item label="订单备注" prop="orderRemark">
          <el-input v-model="addForm.orderRemark" placeholder="请输入订单备注"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="用户管理">
        <el-form-item label="客户名称" prop="userName">
          <el-input v-model="addForm.orderUser.userName" placeholder="请输入客户名称"/>
        </el-form-item>
        <el-form-item label="客户电话" prop="userPhone">
          <el-input v-model="addForm.orderUser.userPhone" placeholder="请输入客户电话"/>
        </el-form-item>
        <el-form-item label="客户性别" prop="userMobile">
          <el-radio-group v-model="addForm.orderUser.userSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="国家" prop="userEmail">
          <el-select v-model="addForm.orderUser.countryCode" placeholder="请选择省份">
            <el-option v-for="item in countryCodeList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="provinceCode">
          <el-select v-model="addForm.orderUser.provinceCode" placeholder="请选择省份">
            <el-option v-for="item in provinceCodeList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="cityCode">
          <el-select v-model="addForm.orderUser.cityCode" placeholder="请选择城市">
            <el-option v-for="item in cityCodeList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="区县" prop="areaCode">
          <el-select v-model="addForm.orderUser.areaCode" placeholder="请选择区县">
            <el-option v-for="item in areaCodeList" :key="item.code" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地址" prop="userAddress">
          <el-input v-model="addForm.orderUser.userAddress" placeholder="请输入客户地址"/>
        </el-form-item>
        <el-form-item label="备注" prop="userAddress">
          <el-input v-model="addForm.orderUser.userRemark" placeholder="请输入备注"/>
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="商品管理">
        <el-form-item :span="24" v-for="(it ,i) in addForm.goodsList" :key="i">

          <el-select v-model="it.goodsId" placeholder="请选择商品" @change="value=>selectGoods(i,value)"
                     style="width: 100%">
            <el-option v-for="item in goodsList" :key="item.id" :label="item.goodsName" :value="item.id"/>
          </el-select>
          <el-input disabled v-model="it.goodsNum" placeholder="请输入商品数量"/>
          <!--              <el-col :span="7" :offset="1">-->
          <!--                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteGoods(i)"></el-button>-->
          <!--                <el-button type="primary" size="mini" icon="el-icon-plus" @click="addGoods"></el-button>-->
          <!--              </el-col>-->
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane label="销售配置">
        <el-row title="销售配置" v-for="(it ,i) in  addForm.goodsList" :name="i" :key="i">
          <div v-if="goodsMap[it.goodsId]"> {{ goodsMap[it.goodsId].goodsName }}/ <span>{{
              it.goodsNum
            }} /{{ goodsMap[it.goodsId].goodsRemark }}</span></div>
          <el-col :span="24" v-for="(sa ,index) in apsSaleConfigList" :key="index">
            <el-divider/>
            <el-col :span="6">
              {{ sa.saleName }}/{{ sa.saleCode }}
            </el-col>
            <el-col :span="18">
              <el-radio-group v-model="goodsSaleConfigMap[it.goodsId][sa.id]"
                              @change="value=>changeGM(it.goodsId, sa.id,value)">
                <el-radio v-for=" (ss ,j) in sa.children" :label="ss.id" :key="j">{{ ss.saleName }}/{{
                    ss.saleCode
                  }}
                </el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="工程配置">工程配置</el-tab-pane>
      <el-tab-pane label="零件">
        <el-table :data="goodsBomList">
          <el-table-column prop="bomName" label="名称"/>
          <el-table-column prop="bomCode" label="编号"/>
          <el-table-column prop="bomCostPriceUnit" label="单价规格"/>
          <el-table-column prop="bomCostPrice" label="单价"/>
          <el-table-column prop="isFollow" label="关注"/>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <el-input v-model="addForm.goodsBom[scope.row.id]">数量</el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
import { onMounted, ref } from "vue"
import { type ApsOrder } from "./ApsOrderType.ts"
import { getById, postNoResult } from "@/common/utils/common-js.ts"
import { type FormInstance, FormRules } from "element-plus"
import { DistrictCode } from "@v/base/DistrictCode/DistrictCodeType.ts";
import { ApsGoods } from "@v/aps/ApsGoods/ApsGoodsType.ts";
import { ApsGoodsSaleItem } from "@v/aps/ApsGoodsSaleItem/ApsGoodsSaleItemType.ts";

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
const checkRules = ref<FormRules>({})

const countryCodeList = ref<DistrictCode []>([])
const provinceCodeList = ref<DistrictCode []>([])
const cityCodeList = ref<DistrictCode []>([])
const areaCodeList = ref<DistrictCode []>([])
const apsSaleConfigList = ref<ApsGoodsSaleItem []>([])
const goodsList = ref<ApsGoods []>([])
const goodsMap = ref ({})
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
  urgencyLevel: 0,
  schedulingDate: "",
  orderNoParent: "",
  id: "",
  orderUser: {},
  goodsList: []
})

function loadById() {
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
function saveForm() {
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
function saveFormAfter() {
  cancelForm()
}

// 取消方法
function cancelForm() {
  if(props.saveFun) {
    props.saveFun()
  }
}

function selectGoods(value) {
  console.info("selectGoods ", value)
}
function changeGM(value) {
  console.info("changeGM ", value)
}
</script>

<style scoped lang="scss">

</style>

