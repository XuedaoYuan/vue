<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px" class="btn">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="searchBtn">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" icon="el-icon-refresh" size="mini" style="margin-left:10px" @click="resetBtn">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="80px" :model="tempAll">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                    <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                    <department-select @childevent="childEventHandlerDepartment" :querySelect="tempAll.bizOrgName"></department-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员" prop="buyerName">
                    <!-- <el-input v-model="tempAll.buyerName" size="mini"></el-input> -->
                    <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.buyerName"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建时间" prop="createdTime">
                    <el-date-picker v-model="createdTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" :editable="false">
                </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="客户" prop="customerName">
                    <customer-select @childevent="childEventHandlerCustomer" :querySelect="tempAll.customerName"></customer-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="soNo">
                    <el-input v-model="tempAll.soNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售合同号" prop="soContractNo">
                    <el-input v-model="tempAll.soContractNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createdBy">
                    <!-- <el-input v-model="tempAll.createdBy" size="mini"></el-input> -->
                    <staff-select @childevent="childEventHandlerCreate" :querySelect="tempAll.createdBy"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="销售类型" prop="name">
                  <el-select v-model="tempAll.soType" placeholder="请选择" clearable size="mini">
                     <!--  <el-option v-for="item in salesType" :key="item.value" :label="item.label" :value="item.value">
                      </el-option> -->
                      <el-option v-for="(val, key) in salesType" :key="key" :label="val" :value="key">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="计重标准" prop="code">
                    <el-select v-model="tempAll.weightStandType" placeholder="请选择" clearable size="mini">
                      <el-option v-for="(val, key) in weightStandType" :key="key" :label="val" :value="key">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="交货日期" prop="name">
                    <el-date-picker v-model="deliveryDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" :editable="false">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改时间" prop="name">
                    <el-date-picker v-model="updatedTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" :editable="false">
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="币别" prop="currencyName">
                    <currency-select @childevent="childEventHandlerCurrency" :querySelect="tempAll.currencyName"></currency-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输方式" prop="code">
                  <el-select v-model="tempAll.transType" placeholder="请选择" clearable size="mini">
                    <el-option v-for="(val, key) in transType" :key="key" :label="val" :value="key">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="签署日期" prop="name">
                    <el-date-picker v-model="signDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" :editable="false">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改人" prop="updatedBy">
                    <!-- <el-input v-model="tempAll.updatedBy" size="mini"></el-input> -->
                    <staff-select @childevent="childEventHandlerUpdatedBy" :querySelect="tempAll.updatedBy"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- <el-col :span="6">
                <el-form-item label="贸易地区" prop="tradeZoneName">
                    <el-input v-model="tempAll.tradeZoneName" size="mini"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="交货地点" prop="deliveryAddress">
                    <el-input v-model="tempAll.deliveryAddress" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="OA审核标题" prop="auitTitle">
                    <el-input v-model="tempAll.auitTitle" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核时间" prop="postDate">
                    <el-date-picker v-model="postDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" :editable="false">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核人" prop="postPersonName">
                    <staff-select @childevent="childEventHandlerPostPersonName" :querySelect="tempAll.postPersonName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="合同状态" prop="soStatus">
                  <el-select v-model="tempAll.soStatus" placeholder="请选择" clearable size="mini">
                      <el-option v-for="(val, key) in soStatus" :key="key" :label="val" :value="key">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom:10px">
      <!-- <router-link to="/salesProcess/SalesContractAdd"><el-button type="warning" size="mini">创建</el-button></router-link> -->
      <el-button type="warning" size="mini" @click="establish('add')">创建</el-button>
      <el-button type="warning" size="mini" @click="establish('edit')" :disabled="!attrRadio || (attrRadio && attrRadio.soStatus!='70200010' && attrRadio.soStatus!='70200050')">修改</el-button>
      <el-button type="warning" size="mini" @click="auditing" :disabled="!attrRadio || (attrRadio && attrRadio.soStatus!='70200030')">审核</el-button>
      <el-button type="warning" size="mini" @click="cancelAuditing" :disabled="!attrRadio || (attrRadio && attrRadio.soStatus!='70200040') && attrRadio.soStatus!='70200060'">取消审核</el-button>
      <el-button type="warning" size="mini" @click="deleteData" :disabled="deleteStatus">删除</el-button>
      <el-button type="warning" size="mini" @click="doCloseCodSo" :disabled="doCloseCodSoStatus">合同关闭</el-button>
      <el-button type="warning" size="mini" @click="doSubmitERP" :disabled="ERPStatus">提交ERP</el-button>
      <el-button type="warning" size="mini" @click="doBackorginal" :disabled="doBackStatus">收回原件确认</el-button>
    </div>
    <div class="table">
      <common-table
        :data="list"
        :fit="true" ref="multipleTable"
        :headers="headers" v-loading.body="listLoading"
        @row-click="handleCellClick"
        @row-db-click = "handleDblclick"
        @selection-change="handleSelectionChange"
        >
          <template slot-scope="scope">
          </template>
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text == 'transType'">
              <span>{{list[scope.index]['transType'] | transType}}</span>
            </div>
            <div v-if="scope.text == 'weightStandType'">
              <span>{{list[scope.index]['weightStandType'] | weightStandType}}</span>
            </div>
            <div v-if="scope.text == 'soType'">
              <span>{{list[scope.index]['soType'] | soType}}</span>
            </div>
            <div v-if="scope.text == 'soStatus'">
               <span>{{list[scope.index]['soStatus'] | soStatus}}</span>
            </div>
            <div v-if="scope.text == 'deliveryDateEnd'">
              <span>{{list[scope.index]['deliveryDateStart'] | parseTime('{y}-{m}-{d}')}}</span> -
              <span>{{list[scope.index]['deliveryDateEnd'] | parseTime('{y}-{m}-{d}')}}</span>
            </div>
          </template>
        </common-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tempAll.currentPage"
      :page-sizes="[10, 20, 30,50]"
      :page-size="tempAll.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>


    <div>
        <check-dialog  :checkDialogShow="checkDialogShow" @childevent="checkStatus" @closeItem="closeCheckDialog"></check-dialog>
    </div>
  </div>
</template>
<script>
  import {
    doQueryWithPage,
    doDeleteCodSo,
    doAuditingCodSo,
    doCancelAuditingCodSo,
    doCloseCodSo,
    doBackorginal,
    doSubmitERP
  } from 'api/sales-process/sales-contract/sales-contract.js'

  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //客户
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import StaffSelect from '@/components/common-select/staff-select.vue' //业务员
  import CheckDialog from '@/components/common-dialog/check-dialog.vue' //审核弹框
  import {pickerOptions} from '@/util'
  import { parseTime } from '@/filters/index.js'
  import { ENUMS } from '../../../assets/enums.js'
  const headers = [
    { type: 'selection', width: '55px',fixed:'left'},
    { prop: 'soNo', label: '系统单据号', width: '160px',align:'center' },
    { prop: 'soContractNo', label: '销售合同号', width: '120px',align:'center'},
    { prop: 'soType', label: '销售类型', width: '120px',align:'center',filter:"soType"},
    { prop: 'manageSubName', label: '经营主体', width: '120px' ,align:'center'},
    { prop: 'bizOrgName', label: '部门' , width: '100px',align:'center'},
    { prop: 'customerName', label: '客户', width: '120px',align:'center' },
    { prop: 'deliveryDateEnd', label: '交货日期' , width: '200px',align:'center',filter:'deliveryDateEnd'},
    { prop: 'soStatus', label: '合同状态' , width: '120px',align:'center',filter:'soStatus'},//,fixed:'right'
    { prop: 'currencyName', label: '币别' , width: '120px',align:'center'},
    { prop: 'contractQuality', label: '合同质量要求' , width: '120px',align:'center'},
    { prop: 'weightStandType', label: '计重标准' , width: '120px',align:'center',filter:'weightStandType'},
    { prop: 'signDate', label: '签署日期' , width: '120px',align:'center',dataType: 'Date'},
    { prop: 'rateCurrency', label: '汇率' , width: '120px',align:'center'},
    { prop: 'transType', label: '运输方式' , width: '120px',align:'center',filter:'transType'},
    { prop: 'lessQty', label: '溢短装数量' , width: '120px',align:'center'},
    { prop: 'auitTitle', label: 'OA审核标题' , width: '120px',align:'center'},
    { prop: 'createdBy', label: '创建人' , width: '120px',align:'center'},
    { prop: 'createdTime', label: '创建时间' , width: '160px',align:'center',dataType: 'Time'},
    { prop: 'updatedBy', label: '修改人' , width: '120px',align:'center'},
    { prop: 'updatedTime', label: '修改时间' , width: '160px',align:'center',dataType: 'Time'},
    { prop: 'postPersonName', label: '审核人' , width: '120px',align:'center'},
    { prop: 'postDate', label: '审核时间' , width: '160px',align:'center',dataType: 'Time'},
  ];
  export default {
    components:{
      ManagementSubject,DepartmentSelect,CustomerSelect,CurrencySelect,StaffSelect,CheckDialog
    },
    data(){
      return {
        createdTime:null,//创建时间
        deliveryDate:null,//交货日期
        updatedTime:null,//修改日期
        signDate:null,//签署日期
        postDate:null,//审核时间
        tempAll: {
          manageSubId:'',//经营主题id
          manageSubCode:'',//经营主题code
          manageSubName:'',//经营主题name
          bizOrgId:'',//业务所属部门id
          bizOrgCode:'',//业务所属部门code
          bizOrgName:'',//业务所属部门name
          buyerCode:'',//采购员code
          buyerId:'',//采购员id
          buyerName:'',//采购员name
          customerId:'',//客户id
          customerCode:'',//客户code
          customerName:'',//客户name
          soNo:'',//系统单据号
          soContractNo:'',//销售合同号
          createdBy:'',//记录数据创建用户
          soType:'',//销售类型
          weightStandType:'',//计重标准
          currencyId:'',//币别id
          currencyCode:'',//币别code
          currencyName:'',//币别name
          transType:'',//运输方式
          updatedBy:'',//记录数据最后更新用户
          tradeZoneId:'',//贸易地区id
          tradeZoneCode:'',//贸易地区code
          tradeZoneName:'',//贸易地区name
          deliveryAddress:'',//交货地点
          auitTitle:'',//OA审核标题
          signDateStart:'',//签署日期 开始
          signDateEnd:'',//签署日期 结束
          createdTimeStart:'',//记录数据创建时间 开始
          createdTimeEnd:'',//记录数据创建时间 结束
          updatedTimeStart:'',//修改时间 开始
          updatedTimeEnd:'',//修改时间 结束
          deliveryDateStart:'',//交货日期始
          deliveryDateEnd:'',//交货日期止
          postPersonId:'',//过账人id
          postPersonCode:'',//过账人code
          postPersonName:'',//过账人名称
          postDateStart:'',//过账时间 开始
          postDateEnd:'',//过账时间 结束
          soStatus:'',//合同状态
          currentPage:1,
          pageSize:10,
          needCount: true
        },
        salesType: ENUMS["7270"],
        weightStandType: ENUMS["7125"],
        transType: ENUMS["7120"],
        soStatus: ENUMS["7020"],//合同状态
        listLoading:false,
        searchBarFlg: true,
        total:null,
        checkDialogShow:false,
        pickerOptions: {
            shortcuts: pickerOptions
        },
        deleteRowId:[],//删除id
        list:[],
        headers: headers,
        updateId:null,

        multipleSelection:[],
        radio:'1',
        attrRadio:null,//列表选中的参数(单条的)
        deleteStatus:true,//删除状态
        ERPStatus:true,//提交ERP
        doCloseCodSoStatus:true,//合同关闭状态
        doBackStatus:true,//收回原件确认

      }
    },
    filters: {
      transType(val) {
        return ENUMS["7120"][val];
      },
      weightStandType(val){
        return ENUMS["7125"][val];
      },
      soType(val){
        return ENUMS["7270"][val];
      },
      soStatus(val){
        return ENUMS["7020"][val];
      },
    },
    activated(){
      this.searchBtn();
    },
    created(){
      this.searchBtn();
    },
    methods:{
      searchBtn(){//查询
        this.listLoading = true;
        doQueryWithPage(this.tempAll).then(response => {
          if(response.data.status == 1){
              this.list = response.data.data.datalist;
              this.total = response.data.data.items;
              this.listLoading = false;
          }else {
            this.listLoading = false;
          }
        })
      },
      resetBtn(){
        this.tempAll = {
          manageSubId:'',//经营主题id
          manageSubCode:'',//经营主题code
          manageSubName:'',//经营主题name
          bizOrgId:'',//业务所属部门id
          bizOrgCode:'',//业务所属部门code
          bizOrgName:'',//业务所属部门name
          buyerCode:'',//采购员code
          buyerId:'',//采购员id
          buyerName:'',//采购员name
          customerId:'',//客户id
          customerCode:'',//客户code
          customerName:'',//客户name
          soNo:'',//系统单据号
          soContractNo:'',//销售合同号
          createdBy:'',//记录数据创建用户
          soType:'',//销售类型
          weightStandType:'',//计重标准
          currencyId:'',//币别id
          currencyCode:'',//币别code
          currencyName:'',//币别name
          transType:'',//运输方式
          updatedBy:'',//记录数据最后更新用户
          tradeZoneId:'',//贸易地区id
          tradeZoneCode:'',//贸易地区code
          tradeZoneName:'',//贸易地区name
          deliveryAddress:'',//交货地点
          auitTitle:'',//OA审核标题
          signDateStart:'',//签署日期 开始
          signDateEnd:'',//签署日期 结束
          createdTimeStart:'',//记录数据创建时间 开始
          createdTimeEnd:'',//记录数据创建时间 结束
          updatedTimeStart:'',//修改时间 开始
          updatedTimeEnd:'',//修改时间 结束
          deliveryDateStart:'',//交货日期始
          deliveryDateEnd:'',//交货日期止
          postPersonId:'',//过账人id
          postPersonCode:'',//过账人code
          postPersonName:'',//过账人名称
          postDateStart:'',//过账时间 开始
          postDateEnd:'',//过账时间 结束
          soStatus:'',//合同状态
          currentPage:1,
          pageSize:10,
          needCount: true
        };
        this.createdTime='';//创建时间
        this.deliveryDate='';//交货日期
        this.updatedTime = '';//修改日期
        this.signDate='';//签署日期
        this.postDate='';//审核时间
      },
      handleCellClick(row){
        // console.log(val);
        // this.$refs.multipleTable.toggleRowSelection(row);
      },
      handleDblclick(row){
        this.updateId = row.soId;
        this.$store.dispatch('toggleCurrentView', {
            SalesContract: {
                view: 'look',
                params: {
                  "updateId":this.updateId
                }
              }
            });
      },
      clearCustomer(){
        this.tempAll.main1 = '';
        this.tempAll.mainName = '';
      },
      establish(text){
        if (text == 'add') {
          this.$store.dispatch('toggleCurrentView', {
            SalesContract: {
              view: 'add'
              // params: 跳转过去的子组件的属性对象
            }
          });
          // this.$router.push({params: {type: 'add'}});
        } else if (text == 'edit') {
          if(this.multipleSelection.length == 1){
              this.updateId = this.multipleSelection[0].soId;
              this.$store.dispatch('toggleCurrentView', {
            SalesContract: {
                view: 'edit',
                params: {
                  "updateId":this.updateId
                }
              }
            });
          }else {
            this.$notify({
              title: '警告',
              message: '请选择单个进行操作',
              type: 'warning'
            });
          }
        }
      },
      handleSelect(item) {
        this.tempAll.main1 = item.value;
        this.tempAll.mainName = item.address;
      },
      handleSelectionChange(val){
        this.deleteRowId = [];

        for(var i=0; i<val.length;i++){
          if(val[i].soStatus == '70200010') {//删除状态
            this.deleteStatus = false;
          }else {
            this.deleteStatus = true;
          }
          if(val[i].soStatus == '70200010' || val[i].soStatus == '70200050') {//提交ERP状态
            this.ERPStatus = false;
          }else {
            this.ERPStatus = true;
          }
          if(val[i].soStatus=='70200060' || val[i].soStatus == '70200040'){//合同关闭状态
            this.doCloseCodSoStatus = false;
          }else {
            this.doCloseCodSoStatus = true;
          }
          if(val[i].soStatus=='70200060') {
            this.doBackStatus = false;
          }else {
            this.doBackStatus = true;
          }
        }
        if(val.length == 0) {
          this.deleteStatus = true;
          this.doCloseCodSoStatus = true;
          this.doBackStatus = true;
          this.ERPStatus = true;
        }
        if(val.length == 1){//单条处理
          this.attrRadio = val[0];//单条状态
        }else {
          this.attrRadio = null;
        }
        val.forEach((o,i)=> {
          this.deleteRowId.push({
            "soId":o.soId,
            "version":o.version
          });
        })
        this.multipleSelection = val;
      },
      handleSizeChange(val){
        this.tempAll.pageSize = val;
        this.searchBtn();
      },
      handleCurrentChange(val){
        this.tempAll.currentPage = val;
        this.searchBtn();
      },
      auditing(){//审核
        this.checkDialogShow = true;
      },
      checkStatus(val){//审核确定
            this.radio = val;
            console.log(val);
            if(this.radio == '1'){
                var passInfo = {
                  "version":this.multipleSelection[0].version,
                  "soId":this.multipleSelection[0].soId,
                  "soStatus":70200040
                }
                doAuditingCodSo(passInfo).then(response=> {
                  if(response.data.status == 1){
                    this.$notify({
                      title: '成功',
                      message: '审核成功！',
                      type: 'success'
                    });
                    this.checkDialogShow = false;
                    this.searchBtn();
                  }
                })
            } else if(this.radio == '2'){
              var passInfo2 = {
                  "version":this.multipleSelection[0].version,
                  "soId":this.multipleSelection[0].soId,
                  "soStatus":70200050
                }
                doAuditingCodSo(passInfo2).then(response=> {
                  if(response.data.status == 1){
                    this.$notify({
                      title: '成功',
                      message: '驳回成功！',
                      type: 'success'
                    });
                    this.checkDialogShow = false;
                    this.searchBtn();
                  }
                })
            }
        },
      closeCheckDialog(){
           this.checkDialogShow =false;
      },
      cancelAuditing(){//取消审核
        var passInfo = {
          "version":this.multipleSelection[0].version,
          "soId":this.multipleSelection[0].soId,
        }
        this.$confirm('您确认要取消审核吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            doCancelAuditingCodSo(passInfo).then(response=> {
              if(response.data.status == 1){
                this.$notify({
                  title: '成功',
                  message: '取消审核成功！',
                  type: 'success'
                });
                this.searchBtn();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
      },
      doCloseCodSo(){//合同关闭
        var closeList = [];
        this.multipleSelection.forEach((o,i)=> {
          closeList.push({
            "soId":o.soId,
            "version":o.version
          });
        })
        if(closeList.length>0){
          this.$confirm('您确认要合同关闭吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            doCloseCodSo(closeList).then(response=> {
              if(response.data.status == 1){
                this.$notify({
                  title: '成功',
                  message: '合同关闭成功！',
                  type: 'success'
                });
                this.searchBtn();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else {
          this.$message({
            message: '请选择一条或多条进行合同关闭',
            type: 'warning'
          });
        }
      },
      doSubmitERP(){//提交ERP接口
          var closeList = [];
        this.multipleSelection.forEach((o,i)=> {
          closeList.push({
            "soId":o.soId,
            "version":o.version
          });
        })
        if(closeList.length>0){
          this.$confirm('您确认要提交ERP吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            doSubmitERP(closeList).then(response=> {
              if(response.data.status == 1){
                this.$notify({
                  title: '成功',
                  message: '提交ERP成功！',
                  type: 'success'
                });
                this.searchBtn();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else {
          this.$message({
            message: '请选择一条或多条进行提交ERP',
            type: 'warning'
          })
        }
      },
      doBackorginal(){//收回原件确认
        var closeList = [];
        this.multipleSelection.forEach((o,i)=> {
          closeList.push({
            "soId":o.soId,
            "version":o.version
          });
        })
        if(closeList.length>0){
          this.$confirm('您确认要收回原件确认吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            doBackorginal(closeList).then(response=> {
              if(response.data.status == 1){
                this.$notify({
                  title: '成功',
                  message: '收回原件确认成功！',
                  type: 'success'
                });
                this.searchBtn();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else {
          this.$message({
            message: '请选择一条或多条进行收回原件确认',
            type: 'warning'
          });
        }
      },
      // 删除按钮
      deleteData(){
        if(this.deleteRowId.length>0){
          this.$confirm('您确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            doDeleteCodSo(this.deleteRowId).then(response=> {
              if(response.data.status == 1){
                this.$notify({
                  title: '成功',
                  message: '删除成功！',
                  type: 'success'
                });
                this.searchBtn();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }else {
            this.$message({
              message: '请选择一条或多条进行删除',
              type: 'warning'
            });
        }
      },

      childEventHandlerMainInfo(val){// 经营主体
        if(val){
          this.tempAll.manageSubId = val.companyId;
          this.tempAll.manageSubCode = val.companyCode;
          this.tempAll.manageSubName = val.companyName;
        }else {
          this.tempAll.manageSubId = '';
          this.tempAll.manageSubCode = '';
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
      childEventHandlerCustomer(val){//客户
        if(val){
          this.tempAll.customerName = val.custName;
          this.tempAll.customerCode = val.custCode;
          this.tempAll.customerId = val.id;
        }else {
          this.tempAll.customerId = '';
          this.tempAll.customerCode = '';
          this.tempAll.customerName = '';
        }
      },
      childEventHandlerCurrency(val){//币别
        if(val){
          this.tempAll.currencyId = val.currencyId;//币别id
          this.tempAll.currencyCode = val.currencyCode;//币别code
          this.tempAll.currencyName = val.currencyName;//币别name
        }else {
          this.tempAll.currencyId = '';
          this.tempAll.currencyCode = '';
          this.tempAll.currencyName = '';
        }
      },
      childEventHandlerStaff(val){//业务员
        if(val){
          this.tempAll.buyerName = val.userName;
          this.tempAll.buyerId = val.userId;
          this.tempAll.buyerCode = val.userCode;
        }else {
          this.tempAll.buyerName = '';
          this.tempAll.buyerId = '';
          this.tempAll.buyerCode = '';
        }
      },
      childEventHandlerCreate(val){//创建人
        if(val){
          this.tempAll.createdBy = val.userName;
        }else {
          this.tempAll.createdBy = '';
        }
      },
      childEventHandlerUpdatedBy(val){//修改人
        if(val){
          this.tempAll.updatedBy = val.userName;
        }else {
          this.tempAll.updatedBy = '';
        }
      },
      childEventHandlerPostPersonName(val){//审核人
        if(val){
          this.tempAll.postPersonName = val.userName;
          this.tempAll.postPersonId = val.userId;
          this.tempAll.postPersonCode = val.userCode;
        }else {
          this.tempAll.postPersonName = '';
          this.tempAll.postPersonId = '';
          this.tempAll.postPersonCode = '';
        }
      },

    },
    watch: {
      createdTime: function(val) {//创建时间
            if (val && val[0] && val[1]) {
                this.tempAll.createdTimeStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
                this.tempAll.createdTimeEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
            } else {
                this.tempAll.createdTimeStart = '';
                this.tempAll.createdTimeEnd = '';
            }
        },
      deliveryDate: function(val){//交货日期
          if (val && val[0] && val[1]) {
              this.tempAll.deliveryDateStart = parseTime(val[0],'{y}-{m}-{d}');
              this.tempAll.deliveryDateEnd = parseTime(val[1],'{y}-{m}-{d}');
          } else {
              this.tempAll.deliveryDateStart = '';
              this.tempAll.deliveryDateEnd = '';
          }
      },
      updatedTime: function(val){//修改日期
          if (val && val[0] && val[1]) {
              this.tempAll.updatedTimeStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
              this.tempAll.updatedTimeEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
          } else {
              this.tempAll.updatedTimeStart = '';
              this.tempAll.updatedTimeEnd = '';
          }
      },
      signDate: function(val){//签署日期
          if (val && val[0] && val[1]) {
              this.tempAll.signDateStart = parseTime(val[0],'{y}-{m}-{d}');
              this.tempAll.signDateEnd = parseTime(val[1],'{y}-{m}-{d}');
          } else {
              this.tempAll.signDateStart = '';
              this.tempAll.signDateEnd = '';
          }
      },
      postDate: function(val){//审核时间
          if (val && val[0] && val[1]) {
                this.tempAll.postDateStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
                this.tempAll.postDateEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
            } else {
                this.tempAll.postDateStart = '';
                this.tempAll.postDateEnd = '';
            }
      },
    }
  }

</script>
<style>

</style>
