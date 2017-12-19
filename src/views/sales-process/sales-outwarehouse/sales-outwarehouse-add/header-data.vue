<template>
<div class="allTemplate">
    <el-form ref="form" label-width="120px" :model="tempAll">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-form-item label="出库单号" prop="poNo">
              <el-col>
                <el-input v-model="tempAll.poNo" size="mini" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售类型" prop="salesType">
              <el-col>
                <el-select v-model="tempAll.salesType" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in salesType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="销售合同号" prop="name">
              <el-col>
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="仓库" prop="buyerName">
              <el-col>
                <el-input v-model="tempAll.buyerName" size="mini" ></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="12">
              <el-form-item label="经营主体" prop="manageSubCode">
                <el-col :span="12">
                  <el-input v-model="tempAll.manageSubCode" size="mini"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="tempAll.manageSubName" size="mini" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门" prop="bizOrgCode">
                <el-col :span="12">
                  <el-input v-model="tempAll.bizOrgCode" size="mini"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="tempAll.bizOrgName" size="mini" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="12">
                <el-form-item label="客户" prop="name">
                  <el-col :span="12">
                    <el-input v-model="tempAll.name" size="mini" ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-input v-model="tempAll.name" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="单据状态" prop="listStatus">
                  <el-col><el-select v-model="tempAll.listStatus" placeholder="请选择" clearable size="mini">
                    <el-option
                      v-for="item in listStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="业务员" prop="currencyName">
                  <el-col>
                    <el-input v-model="tempAll.currencyName" size="mini"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="6">
                <el-form-item label="币别" prop="currencyName">
                  <el-col>
                    <el-input v-model="tempAll.currencyName" size="mini"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="联系人" prop="name">
                  <el-col>
                    <el-input v-model="tempAll.name" size="mini"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="签收人" prop="name">
                  <el-col>
                    <el-input v-model="tempAll.name" size="mini"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="出库总金额" prop="name">
                  <el-col>
                    <el-input v-model="tempAll.name" size="mini"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="6">
                <el-form-item label="汇率" prop="name">
                  <el-col>
                  <el-input v-model="tempAll.name" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="联系方式" prop="tradeZoneName">
                  <el-col>
                  <el-input v-model="tempAll.tradeZoneName" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="签收日期" prop="name">
                  <el-col>
                  <el-date-picker size="mini" v-model="tempAll.value1" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="出库日期" prop="lessQty">
                  <el-col>
                  <el-date-picker size="mini" v-model="tempAll.value1" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker></el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="6">
                <el-form-item label="确认出库" prop="trueout">
                  <el-col><el-select v-model="tempAll.trueout" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in outwarehouseIf"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="OA审核标题" prop="auitTitle">
                  <el-col>
                  <el-input v-model="tempAll.auitTitle" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-col>
                  <el-input v-model="tempAll.remark" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>


<script>

const outwarehouseIf = [//确认出库
  {value: '1',label: '是'},
  {value: '0',label: '否'},
]
const salesType = [//销售类型
  {value: '1',label: '国外销售'},
  {value: '0',label: '国内销售'},
]
const listStatus = [//销售类型
  {value: '1',label: '添加'},
  {value: '0',label: '创建'},
]

export default {
    data(){
        return {
            tempAll:{
              trueout:"0",
              salesType:"0",
              listStatus:"0",
            },
            outwarehouseIf:outwarehouseIf,
            salesType:salesType,
            listStatus:listStatus,
            options: [{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }],

        }
    }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom:0;
}
</style>