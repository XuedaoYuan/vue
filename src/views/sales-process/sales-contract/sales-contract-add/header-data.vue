<template>
<div class="allTemplate">
    <el-form :ref="headerDataForm" label-width="120px" :rules="rules" :model="tempAll">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-form-item label="系统单据号" prop="poNo">
              <el-col>
                <el-input v-model="tempAll.poNo" size="mini" :disabled="true"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
              <el-form-item label="包装方式" prop="name">
                <el-col>
                  <el-select v-model="tempAll.transType" placeholder="请选择" clearable size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务员" prop="buyerName">
              <el-col>
                <el-input v-model="tempAll.buyerName" size="mini" ></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同来源" prop="code">
              <el-col>
                <el-select v-model="tempAll.type" placeholder="请选择" clearable size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
            <el-col :span="12">
                <el-form-item label="交货日期" prop="deliveryDate">
                  <el-col :span="12">
                    <el-date-picker v-model="tempAll.deliveryDate" type="date" size="mini"
                      placeholder="起始时间" style="width:100%"></el-date-picker>
                  </el-col>
                  <el-col :span="12">
                    <el-date-picker v-model="tempAll.value1" type="date" size="mini"
                      placeholder="结束时间" style="width:100%"></el-date-picker>
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
                <el-form-item label="合同质量要求" prop="name">
                  <el-col>
                    <el-input v-model="tempAll.name" size="mini"></el-input>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="计量标准" prop="name">
                  <el-col>
                  <el-select v-model="tempAll.type" placeholder="请选择" clearable size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="签署日期" prop="name">
                  <el-col>
                  <el-date-picker size="mini" v-model="tempAll.value1" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker></el-col>
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
                <el-form-item label="贸易地区" prop="tradeZoneName">
                  <el-col>
                  <el-input v-model="tempAll.tradeZoneName" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="运输方式" prop="transType">
                  <el-col>
                    <el-select v-model="tempAll.transType" placeholder="请选择" clearable size="mini">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="溢短装数量" prop="lessQty">
                  <el-col>
                  <el-input v-model="tempAll.lessQty" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="6">
            <el-col :span="6">
                <el-form-item label="合同数量" prop="setttleWeight">
                  <el-col>
                  <el-input v-model="tempAll.setttleWeight" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="交货地点" prop="name">
                  <el-col>
                  <el-input v-model="tempAll.name" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="OA审核标题" prop="auitTitle">
                  <el-col>
                  <el-input v-model="tempAll.auitTitle" size="mini"></el-input></el-col>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="" prop="checked">
                  <el-checkbox v-model="tempAll.checked">客户确认</el-checkbox></el-form-item>
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
export default {
    data(){
        return {
            tempAll:{
              checked:false,
            },
            headerDataForm:null,
            rules:{
              buyerName:[
                  {required: true, message: '请选择业务员。', trigger: 'change'}
              ],
            },
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
    },
    methods:{
      aaa(){

      },
      childHeaderData() {
        // console.log(tempAll);
        // this.$emit('childHeaderData', this.tempAll);
      }
    }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom:0;
}
</style>