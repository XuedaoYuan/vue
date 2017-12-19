<template>
  <div class="info" style="margin-bottom: 15px">
    <el-button type="primary" icon="el-icon-search" size="small" @click="doQuery">查询</el-button>
    <el-button type="primary" icon="el-icon-refresh" size="small" @click="doClean">重置</el-button>
    <el-form ref="form" label-width="80px" :model="tempAll">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="经营主体" prop="manageSubCode">
            <management-subject @childevent="childEventHandlerMainInfo"
                                :querySelect="manageSubName" ref="managementPage"></management-subject>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门" prop="bizOrgName">
            <!--<el-input v-model="tempAll.bizOrgName" size="mini"></el-input>-->
            <department-select @childevent="childEventHandlerDepartment"
                               :querySelect="bizOrgName" ref="departmentPage"></department-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商" prop="supplierName">
            <supplier @childevent="getChildevent" @getData="getData" :selectName="selectName"
                      ref="supplierPage"></supplier>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提单日期" prop="lbDate">
            <el-date-picker v-model="tempAll.lbDate" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" size="mini" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="系统单据号" prop="owNo">
            <el-input v-model="tempAll.owNo" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提单号" prop="billNo">
            <el-input v-model="tempAll.billNo" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计付税日" prop="expectPayRateDate">
            <el-date-picker v-model="tempAll.expectPayRateDate" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" size="mini" :editable="false"></el-date-picker>

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="单据类型" prop="owType">
            <el-select v-model="tempAll.owType" placeholder="请选择活动区域" size="mini">
              <el-option
                v-for="item in owType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="发票号" prop="invoiceNo">
            <el-input v-model="tempAll.invoiceNo" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间" prop="createdTime">
            <el-date-picker v-model="tempAll.createdTime" type="datetimerange" start-placeholder="开始日期"
                            end-placeholder="结束日期" size="mini" :editable="false"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="到达港口" prop="arrivePortName">
            <el-input v-model="tempAll.arrivePortName" size="mini"></el-input>
            <!--<arrive-port  @childevent="getChildevent" @getData="getData" :selectName="selectNamePort" ref="supplierPagePort"></arrive-port>-->
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="免箱期限" prop="freeDay">
            <el-input v-model="tempAll.freeDay" v-number-only:2.abs="1" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="到单寄出日" prop="arriveSendDate">
            <el-date-picker v-model="tempAll.arriveSendDate" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" size="mini" :editable="false">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="负责货代" prop="freightForwarder">
            <el-select v-model="tempAll.freightForwarder" placeholder="请选择" size="mini">
              <el-option
                v-for="item in freightForwarder"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建人" prop="createdBy">
            <!--<el-input v-model="tempAll.createdBy" size="mini"></el-input>-->
            <staff-select @childevent="getCreatedBy" :querySelect="createdBy" ref="createdByPage"></staff-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="修改人" prop="name">
            <!--<el-input v-model="tempAll.updatedBy" size="mini"></el-input>-->
            <staff-select @childevent="getUpdatedBy" :querySelect="updatedBy" ref="updatedByPage"></staff-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="修改时间" prop="updatedTime">
            <el-date-picker v-model="tempAll.updatedTime" type="datetimerange" start-placeholder="开始日期"
                            end-placeholder="结束日期" size="mini" :editable="false"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="过账时间" prop="postDate">
            <el-form-item prop="postDate">
              <el-date-picker v-model="tempAll.postDate" type="datetimerange"
                              start-placeholder="开始日期" end-placeholder="结束日期" :editable="false"
                              size="mini"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="过账人" prop="postPersonName">
            <!--<el-input v-model="tempAll.postgetPostPersonNamePersonName" size="mini"></el-input>-->
            <staff-select @childevent="getPostPersonName" :querySelect="postPersonName"
                          ref="postPersonNamePage"></staff-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import supplier from '@/components/common-select/supplier.vue'
  import arrivePort from '@/components/common-select/arrive-port.vue'
  import currency from '@/components/common-select/currency-select.vue'//币种
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员


  import {pickerOptions} from '@/util'


  //  TODO 部门 提单日期 采购合同单据号
  const owType = [
    {value: 72000010, label: '提单'},
    {value: 72000030, label: '清关'},
    {value: 72000020, label: '到港'},
  ];
  const freightForwarder = [
    {value: 72200010, label: '物产物流'},
    {value: 72200020, label: '象屿物流'},
    {value: 72200030, label: '中外运'},
    {value: 72200040, label: '邦达'},
    {value: 72200050, label: '长发'},
  ];
  export default {
    components: {supplier, arrivePort, currency, DepartmentSelect, ManagementSubject, StaffSelect},
    props: {
      dataForPage: Array,
      pageState: Boolean,
      listQuery:Object,
    },
    data(){
      return {
        supplierShow: false,
        freightForwarder: freightForwarder,
        owType: owType,
        tempAll: {
          createdTime: [],
          createStart: '',
          createEnd: '',
//          currentPage:1,
//          pageSize:10,
//          needCount:true,
//          manageSubCode: '',
//          manageSubName: "",
//          supplierCode: '',
//          supplierName: '',
//          owNo: '',
//          billNo: '',
////          expectPayRateDate: '',
//          owType: '',
//          invoiceNo: '',
////          createdTime: '',
//          createdBy: '',
////          updatedTime: '',
//          postPersonName: '',
////          arriveSendDate: "",
////          postDate: '',
//          pageSize: '10',
//          currentPage: '1',
//          arriveSendDateStart: '',
//          arriveSendDateEnd: '',
//          createStart: '',
//          createEnd: '',
//          lbDateStrart: '',
//          lbDateEnd: '',
//          expectPayRateDateStart: '',
//          expectPayRateDateEnd: '',
//          updatedTimeStart: '',
//          updatedTimeEnd: '',
//          postDateStart: '',
//          postDateEnd: '',
        },
        selectName: '',
        selectNamePort: '',
        pickerOptions: {
          shortcuts: pickerOptions
        },
        bizOrgName: "",//部门
        manageSubName: '',//经营主体
        postPersonName: '',
        updatedBy: '',
        createdBy: '',
      }
    },
    methods: {
      getPostPersonName(val){//过账人
        if (val) {
          this.tempAll.postPersonName = val.userName;
        } else {
          this.tempAll.postPersonName = '';
        }
      },
      getUpdatedBy(val){//修改人
        if (val) {
          this.tempAll.updatedBy = val.userName;
        } else {
          this.tempAll.updatedBy = '';
        }
      },
      getCreatedBy(val){//创建人
        if (val) {
          this.tempAll.createdBy = val.userName;
        } else {
          this.tempAll.createdBy = '';
        }
      },
      //查询单条数据
      doQuery(){
        console.log(this.tempAll.createdTime);
        if (this.tempAll.createdTime) {
          if (this.tempAll.createdTime[0]) {
            this.tempAll.createStart = this.tempAll.createdTime[0].parseTime('YYYY-MM-DD HH:MM:SS');
            this.tempAll.createEnd = this.tempAll.createdTime[1].parseTime('YYYY-MM-DD HH:MM:SS');
          }
        } else if (this.tempAll.createdTime === null) {
          this.tempAll.createStart = '';
          this.tempAll.createEnd = '';
        }

        if (this.tempAll.lbDate) {
          if (this.tempAll.lbDate[0]) {
            this.tempAll.lbDateStrart = this.tempAll.lbDate[0].parseTime('YYYY-MM-DD');
            this.tempAll.lbDateEnd = this.tempAll.lbDate[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.tempAll.lbDate === null) {
          this.tempAll.lbDateStrart = '';
          this.tempAll.lbDateEnd = '';
        }

        if (this.tempAll.expectPayRateDate) {
          if (this.tempAll.expectPayRateDate[0]) {
            this.tempAll.expectPayRateDateStart = this.tempAll.expectPayRateDate[0].parseTime('YYYY-MM-DD');
            this.tempAll.expectPayRateDateEnd = this.tempAll.expectPayRateDate[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.tempAll.expectPayRateDate === null) {
          this.tempAll.expectPayRateDateStart = '';
          this.tempAll.expectPayRateDateEnd = '';
        }

        if (this.tempAll.updatedTime) {
          if (this.tempAll.updatedTime[0]) {
            this.tempAll.updatedTimeStart = this.tempAll.updatedTime[0].parseTime('YYYY-MM-DD HH:MM:SS');
            this.tempAll.updatedTimeEnd = this.tempAll.updatedTime[1].parseTime('YYYY-MM-DD HH:MM:SS')
          }
        } else if (this.tempAll.updatedTime === null) {
          this.tempAll.updatedTimeStart = '';
          this.tempAll.updatedTimeEnd = '';
        }

        if (this.tempAll.postDate) {
          if (this.tempAll.postDate[0]) {
            this.tempAll.postDateStart = this.tempAll.postDate[0].parseTime('YYYY-MM-DD HH:MM:SS');
            this.tempAll.postDateEnd = this.tempAll.postDate[1].parseTime('YYYY-MM-DD HH:MM:SS');
          }
        } else if (this.tempAll.postDate === null) {
          this.tempAll.postDateStart = '';
          this.tempAll.postDateEnd = '';
        }

        if (this.tempAll.arriveSendDate) {
          if (this.tempAll.arriveSendDate[0]) {
            this.tempAll.arriveSendDateStart = this.tempAll.arriveSendDate[0].parseTime('YYYY-MM-DD');
            this.tempAll.arriveSendDateEnd = this.tempAll.arriveSendDate[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.tempAll.arriveSendDate === null) {
          this.tempAll.arriveSendDateStart = '';
          this.tempAll.arriveSendDateEnd = '';
        }
        this.tempAll.currentPage=this.listQuery.currentPage;
        this.tempAll.pageSize=this.listQuery.pageSize;
        let data = {};
        for (var key in this.tempAll) {
          var val = this.tempAll[key];
          if (val) {
            if (val instanceof Array) {
            } else {
              data[key] = this.tempAll[key];
            }
          }
        }

        console.log(this.listQuery, "pageState", this.dataForPage)
        this.$emit('tableDataToDetail', data)
      },
      //清除-重置
      doClean(){
        this.$emit('doCleanPage');
        this.tempAll = {};
        this.tempAll.currentPage=this.listQuery.currentPage;
        this.tempAll.pageSize=this.listQuery.pageSize;
        this.$refs.supplierPage.clearCustomer();//供应商
        this.$refs.managementPage.clearCustomer();//经营主体
        this.$refs.departmentPage.clearCustomer();//部门
        this.$refs.postPersonNamePage.clearCustomer();//人员
        this.$refs.updatedByPage.clearCustomer();//人员
        this.$refs.createdByPage.clearCustomer();//人员
        this.$emit('tableDataToDetail',this.tempAll)
      },
      //供应商
      getChildevent(val){
        if (val) {
          this.tempAll.supplyName = val.supplyName;
        } else {
          this.tempAll.supplyName = '';
        }
      },
      getData(data){
//          console.log(data,"====>主页面");
        this.tempAll.supplierCode = data.supplyCode;
        this.tempAll.supplierId = data.id;
        this.tempAll.supplierName = data.supplyName;
//        console.log(this.tempAll,"====>主页面")
      },
      getData2(data){
        console.log(this.tempAll, "====>主页面")
      },
      //部门
      childEventHandlerDepartment(data){
        if (data) {
          this.tempAll.bizOrgName = data.orgName
        } else {
          this.tempAll.bizOrgName = '';
        }
        console.log(this.tempAll, "555");
      },
      //经营主体
      childEventHandlerMainInfo(data){
//        console.log(data,'=====childEventHandlerMainInfo====');
        if (data) {
          this.tempAll.manageSubName = data.companyName;
        } else {
          this.tempAll.manageSubName = ''
        }
      },
    },
    watch: {
      pageState: function () {
        console.log(this.pageState, "pageState", this.dataForPage)

      },
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
