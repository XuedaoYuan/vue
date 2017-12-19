<template>
  <div class="allTemplate creditAdd" >
    <h1>信用查看</h1>
    <div class="info" style="margin-bottom: 15px">
      <!--<el-button type="primary" icon="el-icon-search" size="small">保存</el-button>-->
        <el-button type="primary" icon="el-icon-search" @click.native="onClick" size="small">取消</el-button>
      <el-form ref="form" label-width="100px" :model="tempAll">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="申请单号" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
             <el-form-item label="申请日期" prop="date">
                <el-date-picker type="date" placeholder="开始时间" v-model="tempAll.date1"
                                  style="width: 100%;" size="mini"></el-date-picker>
             </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申请人" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="经营主体" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="line-height: 27px">
              <el-input disabled size="mini"></el-input>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开证金额" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="折美元金额" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="交货期限/天" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证类别" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="币别" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证属性" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="起运港" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="目的港" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证性质" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="溢短装数量" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="付款期限/天" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际贸易条款" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最迟装期" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证有效期" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="付款条款" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预计到港日" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预计付款日" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批状态" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="到单签收人" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产国别" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产厂商" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="line-height: 27px;">
            <el-input disabled v-model="tempAll.name" size="mini"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="开证银行" prop="name">
              <el-input disabled v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="line-height: 27px;">
            <el-input disabled v-model="tempAll.name" size="mini"></el-input>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承兑金额" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="信用证号" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="采购合同号" prop="region">
              <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
              <el-select v-model="tempAll.name" size="mini" placeholder="请选择">
                <el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="备注" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="type">
              <el-checkbox v-model="checked">是否完全承兑112</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="name">
              <el-checkbox v-model="checked">是否完全付款2</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import router from '@/router'
  export default {
    data(){
      return {
        checked:true,
        payApplyId:'330681',//申请单号
        //申请日期
        proposer:'申请人',//申请人
        // 状态
        manageSubCode:'',//经营主体code
        manageSubId:'',//经营主体id
        manageSubName:'',//经营主体name
        //开证金额
        //折美元金额
        deliveryDateStart:11,//交货其限始
        deliveryDateEnd:11,//交货其限止
        creditClass:'信用证类别',//信用证类别
        currencyCode:'币别',//币别code
        currencyName:'币别',//币别name
        currencyId:'币别',//币别id
        //信用证属性
        portId:'哦哦',//起运港id
        portName:'哦哦',//起运港name
        portCode:'哦哦',//起运港code
        arrivePortId:'哦哦',//目的港id
        arrivePortName:'哦哦',//目的港name
        arrivePortCode:'哦哦',//目的港code
        formCredit:'信用证性质',//信用证性质
        lessQty:'溢短装数量',//溢短装数量
        //付款期限/天
        //国际贸易条款
        //最迟装期
        //信用证有效日期
        //付款条款
        //预计到港日
        //预计付汇日
        //审批状态
        //到单签收人
        //生产国别
        //生产厂商
        //开证银行
        //兑现金额
        //信用证号
        poContractNo:'poContractNo',//采购合同号
        remark:'remark',//备注
        //是否完全兑换
        //是否完全付款
        date1:'1',
        date2:'2',
        tempAll: {
          name: "",
          date1: '',
          date2: '',
          region: '',
        },
        opt: [{
          value: '选项1',
          label: '黄金糕'
        }],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    }  ,
    methods: {
      onClick() {
        router.push({ params: { type: 'list' } });
      }
    }
  }

</script>
<style>
  .creditAdd .el-row{
      margin-bottom: 18px;
    }

</style>
