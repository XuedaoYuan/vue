<template>
  <div class="container">
    <h1>共通组件测试界面</h1>
    <el-button size="small" @click.native="submit">提交</el-button>
    <el-form :model="testObj" label-width="120px" :rules="rules" ref="ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="经营主体：" prop="companyName">
            <management-subject @childevent="childEventHandlerMainInfo" :querySelect="testObj.companyName"></management-subject>
            {{testObj.companyName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门：" prop="orgName">
            <department-select @childevent="childEventHandlerDepartment"  :transferSearch = 'transferSearch' :querySelect="testObj.orgName" ></department-select>
            {{testObj.orgName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户：" prop="orgName">
            <customer-select @childevent="childEventHandlerCustomer" :disabled="customerDisabled" :querySelect="testObj.customerName" :transferSearch = 'transferSearch'></customer-select>
            {{testObj.customerName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="仓库：">
            <warehouse-select @childevent="childEventHandlerWarehouse" :querySelect="testObj.warehouseName">
            </warehouse-select>
            {{testObj.warehouseName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商：" prop="main1">
            <supplier @getData="getData" :selectName="selectName" :transferSearch = 'transferSearch' ref="supplierPage"></supplier>
            {{testObj.supplyName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="币别：" prop="currencyName">
            <currency-select @childevent="childEventHandlerCurrency" :querySelect="testObj.currencyName" :disabled="disabled"></currency-select>{{testObj.currencyName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="物料编号：" prop="main1">
            <goods-select @childevent="childEventHandlerGoods" :querySelect="testObj.goodsName" ></goods-select>
            {{testObj.goodsName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人员：" prop="staffName">
            <staff-select @childevent="childEventHandlerStaff" :querySelect="testObj.staffName" :disabled="disabled"></staff-select>
            {{testObj.staffName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="国家选择：" prop="main1">
            <country-select @childevent="childEventHandleCountry" :querySelect="testObj.countryName"></country-select>
            {{testObj.countryName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位：" prop="main1">
            <unit-select @childevent="getDataforUnit" :querySelect="selectNameforUnit" ref="supplierPage"></unit-select>
            {{testObj.selectNameForUnit}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="在途单：" prop="main1">
            <ow-select @childevent="childeventHandleOw" :querySelect="testObj.ow" ref="supplierPage"></ow-select>
            {{testObj.ow}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="暂收单：" prop="main1">
            <sourceno-select @childevent="childeventHandlePoGrNo" :querySelect="testObj.poGrNo" ref="supplierPage"></sourceno-select>
            {{testObj.poGrNo}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="批次号：" prop="main1">
            <series-select @childevent="childEventHandlerSeries" :querySelect="testObj.seriesId"></series-select>
            {{testObj.seriesId}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="港口：" prop="main1">
            <port-select @childevent="childEventHandlerPort" :querySelect="testObj.seriesId"></port-select>
            {{testObj.seriesId}}
          </el-form-item>
        </el-col>
      </el-row>
      <!--没有接口-->
      <!--<el-col :span="12">-->
      <!--<el-form-item label="到达港口" prop="main1">-->
      <!--<el-col :span="24">-->
      <!--<arrive-port @childevent="getChildevent" @getData="getData3" :selectName="selectNameforPort"-->
      <!--ref="supplierPage"></arrive-port>-->
      <!--</el-col>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--</el-row>-->
    </el-form>
  </div>
</template>
<script>
import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
import DepartmentSelect from 'components/common-select/department-select.vue' //部门
import CustomerSelect from 'components/common-select/customer-select.vue' //客户
import WarehouseSelect from 'components/common-select/warehouse-select.vue' //仓库
import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
//
import supplier from '@/components/common-select/supplier.vue' //供应商
import StaffSelect from '@/components/common-select/staff-select.vue' //人员
import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
import unitSelect from '@/components/common-select/unit-select.vue' //单位
import CountrySelect from '@/components/common-select/country-select.vue' //国家
import owSelect from '@/components/common-select/ow-select.vue' //在途单
import sourcenoSelect from '@/components/common-select/sourceno-select.vue' //暂收单
import SeriesSelect from 'components/common-select/series-select.vue' //批次号弹框
import PortSelect from 'components/common-select/port-select.vue' //港口弹框

export default {
  components: {
    ManagementSubject,
    DepartmentSelect,
    CustomerSelect,
    WarehouseSelect,
    supplier,
    GoodsSelect,
    StaffSelect,
    CurrencySelect,
    unitSelect,
    CountrySelect,
    owSelect,
    sourcenoSelect,
    SeriesSelect,
    PortSelect
  },
  data() {
    return {
      disabled: true,
      testObj: {
        companyName: "",
        orgName: '销售部',
        customerName: '',
        warehouseName: '',
        supplyName: '',
        portName: '',
        goodsName: '',
        staffName: '人员',
        currencyName: '',
        countryName: '',
        selectNameForUnit: '',
        ow: '',
        poGrNo: '',
        seriesId: ''
      },
      selectName: '', //供应商默认选中值
      selectNameforCurreny: '', //币种默认选中值
      selectNameforPort: '', //到达港口默认选中值
      selectNameforUnit: '',
      transferSearch:{
        companyName:"",
        companyId:"",
        companyCode:"",
        boolToBtn:true,
      },
      customerDisabled:true,//客户显示
      rules: {
        companyName: {
          required: true,
          message: ' ',
          trigger: 'change'
        },
        currencyName: {
          required: true,
          message: ' ',
          trigger: 'change'
        }
      }
    }
  },
  methods: {
    submit() {
      this.disabled = false;
      this.$refs['ruleForm'].validate((valid) => {
        console.log(this.testObj.companyName);
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 国家选择
    childEventHandleCountry(val) {
      console.log(val);
      if (val) {
        this.testObj.countryName = val.countryName;
        this.testObj.countrycode = val.countrycode;
        this.testObj.countryId = val.countryId;
      } else {
        this.testObj.countryName = '';
        this.testObj.countrycode = '';
        this.testObj.countryId = '';
      }
    },
    childEventHandlerCurrency(val) {
      console.log('childEventHandlerCurrency', val);
      if (val) {
        this.testObj.currencyName = val.currencyShortname;
      } else {
        this.testObj.currencyName = '';
      }
      this.$refs['ruleForm'].validateField('currencyName');
    },
    childEventHandlerStaff(val) {
      console.log('childEventHandlerStaff', val);
      if (val) {
        this.testObj.staffName = val.userName;
      } else {
        this.testObj.staffName = '';
      }
    },
    getDataforUnit(val) { //单位
      if (val) {
        this.testObj.selectNameForUnit = val.unitName;
      } else {
        this.testObj.selectNameForUnit = '';
      }
    },
    childeventHandleOw(val){
      console.log(val);
    },
    childeventHandlePoGrNo(val){
      console.log(val);
    },
    childEventHandlerSeries(val){
      console.log('series',val);
    },

    childEventHandlerMainInfo(val) { //经营主体
      console.log(val);
      if (val) {
        this.testObj.companyName = val.companyName;
        this.transferSearch.companyName = val.companyName;
        this.transferSearch.companyId = val.companyId;
        this.transferSearch.companyCode = val.companyCode;

        this.customerDisabled = false;
      } else {
        this.testObj.companyName = '';
        this.transferSearch.companyName = '';
        this.transferSearch.companyId = '';
        this.transferSearch.companyCode = '';

        this.customerDisabled = true;
      }
      this.testObj.customerName = '';
      this.$refs['ruleForm'].validateField('companyName');
    },
    childEventHandlerDepartment(val) { //部门
      console.log(val);
      if (val) {
        this.testObj.orgName = val.orgName;
      } else {
        this.testObj.orgName = '';
      }
    },
    childEventHandlerCustomer(val) { //客户
      if (val) {
        this.testObj.customerName = val.custName;
      } else {
        this.testObj.customerName = '';
      }
    },
    childEventHandlerWarehouse(val) {
      console.log(val, '===');
      this.testObj.warehouseName = val.warehouseName
    },
    //供应商
    getData(val) {
      console.log(val);
      if (val) {
        this.testObj.supplyName = val.supplyName;
      } else {
        this.testObj.supplyName = ''
      }
      console.log(val)
    },
    //到达港口
    childEventHandlerPort(val) {
      if (val) {
        this.testObj.bsPtName = val.bsPtName;
      } else {
        this.testObj.portName = ''
      }
      console.log(val)
    },
    getChildevent(val) {
      console.log(val)
    },
    childEventHandlerGoods(val) {
      console.log(val);
      if (val) {
        this.testObj.goodsName = val.goodsName;
        // goodsCode   goodsId
      } else {
        this.testObj.goodsName = '';
      }

    }
  }

}

</script>
<style scoped>
.container {
  padding: 0 6px;
}

</style>
