<template>
  <div class="info" style="margin-bottom: 15px">
    <!-- <el-button type="primary" icon="el-icon-search" size="small" @click="doQuery">查询</el-button> -->
    <div style="margin-bottom:10px">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="doQuery">查询</el-button>
        <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down"
                   @click="searchBarFlg = true"></el-button>
        <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up"
                   @click="searchBarFlg = false"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="doClean" style="margin-left:10px">重置
      </el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg">
        <el-form ref="form" label-width="80px" :model="tempAll">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="经营主体" prop="manageSubName">
                <!--<el-input v-model="tempAll.manageSubName" size="mini"></el-input>-->
                <management-subject @childevent="childEventHandlerMainInfo" :querySelect="manageSubName"
                                    ref="managementPage"></management-subject>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门" prop="bizOrgName">
                <!--<el-input v-model="tempAll.bizOrgName" size="mini"></el-input>-->
                <department-select @childevent="childEventHandlerDepartment" :querySelect="bizOrgName"
                                   ref="departmentPage"></department-select>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户" prop="customerName">
                <!--<el-input v-model="tempAll.customerName" size="mini"></el-input>-->
                <customer-select @childevent="childEventHandlerCustomer" :querySelect="customerName"
                                 ref="customerNamePage"></customer-select>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发票单据号" prop="soInvoiceNo">
                <el-input v-model="tempAll.soInvoiceNo" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="销售合同号" prop="soContractNo">
                <el-input v-model="tempAll.soContractNo" size="mini" placeholder=""></el-input>
                <!--<sales-contract-select></sales-contract-select>-->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="销售类型" prop="soType">
                <el-select v-model="tempAll.soType" placeholder="请选择" size="mini">
                  <el-option label="国内销售" value="72700010"></el-option>
                  <el-option label="进口销售" value="72700020"></el-option>
                  <el-option label="出口销售" value="72700030"></el-option>
                  <el-option label="样品销售" value="72700040"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发票类型" prop="soInvoiceType">
                <el-select v-model="tempAll.soInvoiceType" placeholder="请选择" size="mini">
                  <el-option label="标准发票" value="73100005"></el-option>
                  <el-option label="取消发票" value="73100010"></el-option>
                  <el-option label="退货发票-标准" value="73100015"></el-option>
                  <el-option label="退货发票-标准取消" value="73100020"></el-option>
                  <!--<el-option label="事后借记" value="73100025"></el-option>-->
                  <!--<el-option label="事后贷记" value="73100030"></el-option>-->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="开票日期" prop="invoiceDate">
                <el-date-picker v-model="tempAll.invoiceDate" type="daterange" :editable="false"
                                start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="业务员" prop="buyerName">
                <!--<el-input v-model="tempAll.buyerName" size="mini"></el-input>-->
                <staff-select @childevent="getBuyerName" :querySelect="buyerName" ref="buyerNamePage"></staff-select>

              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发票外部编号" prop="extInvoiceNo">
                <el-input v-model="tempAll.extInvoiceNo" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建时间" prop="createdTime">
                <el-date-picker v-model="tempAll.createdTime" type="datetimerange" :editable="false"
                                start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="创建人" prop="createdBy">
                <!--<el-input v-model="tempAll.createdBy" size="mini"></el-input>-->
                <staff-select @childevent="getCreatedBy" :querySelect="createdBy" ref="createdByPage"></staff-select>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="修改时间" prop="updatedDate">
                <el-date-picker v-model="tempAll.updatedDate" type="datetimerange" :editable="false"
                                start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="过账时间" prop="postDate">
                <!--todo-->
                <el-date-picker v-model="tempAll.postDate" type="datetimerange" :editable="false"
                                start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="过账人" prop="postPersonName">
                <!--<el-input v-model="tempAll.postPersonName" size="mini"></el-input>-->
                <staff-select @childevent="getPostPersonName" :querySelect="postPersonName"
                              ref="postPersonNamePage"></staff-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="修改人" prop="updatedBy">
                <!--<el-input v-model="tempAll.updatedBy" size="mini"></el-input>-->
                <staff-select @childevent="getUpdatedBy" :querySelect="updatedBy" ref="updatedByPage"></staff-select>

              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
  import {pickerOptions} from '@/util'
  import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //客户
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员
  import unitSelect from '@/components/common-select/unit-select.vue'//单位
//  import salesContractSelect from '@/components/common-select/sales-contract-select.vue'//单位


  //  TODO 部门 提单日期 采购合同单据号
  export default {
    components: {ManagementSubject, DepartmentSelect, CustomerSelect, unitSelect, StaffSelect},
    props: {
      dataForPage: Array,
      pageState: Boolean,
      listQuery:Object,
    },
    data(){
      return {
        searchBarFlg: true,
        selectNameForUnit: '',
        customerName: '',
        manageSubName: '',
        bizOrgName: '',
        tempAll: {
          //--分页信息
          currentPage: 1,
          pageSize: 10,//一页的条数
          needCount: true
        },
        dataPickValue: '',
        buyerName: '',
        updatedBy: '',
        createdBy: '',
        postPersonName: '',
      }
    },
    methods: {
      getBuyerName(val) {//业务员
        console.log('childEventHandlerStaff', val);
        if (val) {
          this.tempAll.buyerName = val.userName;
          this.tempAll.buyerCode = val.userCode;
          this.tempAll.buyerId = val.userId;
        } else {
          this.tempAll.buyerName = '';
          this.tempAll.buyerCode = '';
          this.tempAll.buyerId = '';
        }
      },
      getCreatedBy(val) {//创建人
        if (val) {
          this.tempAll.createdBy = val.userName;
        } else {
          this.tempAll.createdBy = '';
        }
      },
      getUpdatedBy(val) {//修改人
        if (val) {
          this.tempAll.updatedBy = val.userName;
        } else {
          this.tempAll.updatedBy = '';
        }
      },
      getPostPersonName(val) {//过账人
        if (val) {
          this.tempAll.postPersonName = val.userName;
          this.tempAll.postPersonCode = val.userCode;
          this.tempAll.postPersonId = val.userId;
        } else {
          this.tempAll.postPersonName = '';
          this.tempAll.postPersonCode = '';
          this.tempAll.postPersonId = '';
        }
      },
      childEventHandlerMainInfo(val) { //经营主体
        if (val) {
          this.tempAll.manageSubName = val.companyName;
          this.tempAll.manageSubCode = val.companyCode;
          this.tempAll.manageSubId = val.companyId;
        } else {
          this.tempAll.manageSubName = '';
        }
      },
      childEventHandlerDepartment(val) { //部门
        if (val) {
          this.tempAll.bizOrgName = val.orgName;
          this.tempAll.bizOrgId = val.orgId;
          this.tempAll.bizOrgCode = val.orgCode;
        } else {
          this.tempAll.bizOrgName = '';
          this.tempAll.bizOrgId = '';
          this.tempAll.bizOrgCode = '';
        }
      },
      childEventHandlerCustomer(val) { //客户
        if (val) {
          this.tempAll.customerName = val.custName;
          this.tempAll.customerCode = val.custCode;
          this.tempAll.customerId = val.id;
        } else {
          this.tempAll.customerName = '';
          this.tempAll.customerCode = '';
          this.tempAll.customerId='';
        }
      },
      //查询
      doQuery(){
        //创建
        if (this.tempAll.createdTime) {
          if (this.tempAll.createdTime[0]) {
            this.tempAll.createdTimeStart = this.tempAll.createdTime[0].parseTime('YYYY-MM-DD');
            this.tempAll.createdTimeEnd = this.tempAll.createdTime[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.tempAll.createdTime === null) {
          this.tempAll.createdTimeStart = '';
          this.tempAll.createdTimeEnd = '';
        }
        //开票
        if (this.tempAll.invoiceDate) {
          if (this.tempAll.invoiceDate[0]) {
            this.tempAll.invoiceDateStart = this.tempAll.invoiceDate[0].parseTime('YYYY-MM-DD');
            this.tempAll.invoiceDateEnd = this.tempAll.invoiceDate[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.tempAll.invoiceDate === null) {
          this.tempAll.invoiceDateStart = '';
          this.tempAll.invoiceDateEnd = '';
        }
        //过账
        if (this.tempAll.postDate) {
          if (this.tempAll.postDate[0]) {
            this.tempAll.postDateStart = this.tempAll.postDate[0].parseTime('YYYY-MM-DD');
            this.tempAll.postDateEnd = this.tempAll.postDate[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.tempAll.postDate === null) {
          this.tempAll.postDateStart = '';
          this.tempAll.postDateEnd = '';
        }
        //修改
        if (this.tempAll.updatedDate) {
          if (this.tempAll.updatedDate[0]) {
            this.tempAll.updateTimeStart = this.tempAll.updatedDate[0].parseTime('YYYY-MM-DD');
            this.tempAll.updateTimeEnd = this.tempAll.updatedDate[1].parseTime('YYYY-MM-DD');
          }

        } else if (this.tempAll.updatedDate === null) {
          this.tempAll.updateTimeStart = '';
          this.tempAll.updateTimeEnd = '';
        }
        this.tempAll.pageSize=this.listQuery.pageSize;
        this.tempAll.currentPage=this.listQuery.currentPage;
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
        this.$emit('getTableData', data)
      },
      //清除-重置
      doClean(){
        this.tempAll = {};
        this.$emit('doClearPage');
        this.tempAll.currentPage=this.listQuery.currentPage;
        this.tempAll.pageSize=this.listQuery.pageSize;
        this.$refs.managementPage.clearCustomer();//经营主体
        this.$refs.departmentPage.clearCustomer();//部门
        this.$refs.postPersonNamePage.clearCustomer();//人员
        this.$refs.updatedByPage.clearCustomer();//人员
        this.$refs.createdByPage.clearCustomer();//人员
        this.$refs.buyerNamePage.clearCustomer();//人员
        this.$refs.customerNamePage.clearCustomer();//人员
        this.$emit('getTableData',  this.tempAll)
      },
    },
    watch: {
      pageState: function () {
        console.log(this.pageState, "pageState", this.dataForPage)
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
