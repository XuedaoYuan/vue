<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
        <!-- <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button> -->
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" icon="el-icon-refresh" size="small" style="margin-left:10px" @click="handleResect">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="80px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" >
                  <management-subject  @childevent = "manageSubNameFill" :querySelect="formData.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" >
                  <department-subject  @childevent = "bizOrgNameFill" :querySelect="formData.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改时间" >
                  <el-date-picker v-model="updatedTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改人" prop="updatedBy">
                  <staff-select @childevent="updatedByFill" :querySelect="formData.updatedBy"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="供应商">
                  <supplier  @getData="supplierNameFill" :selectName="formData.supplierName"></supplier>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发票类别" prop="poInvoiceType">
                    <el-select  v-model="formData.poInvoiceType" placeholder="请选择" size="mini" clearable >
                      <el-option v-for="(value,key) in poInvoiceType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建时间" >
                  <el-date-picker v-model="createdTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createdBy">
                  <staff-select @childevent="createdByFill" :querySelect="formData.createdBy"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="poInvoiceNo">
                    <el-input v-model="formData.poInvoiceNo" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="采购合同号" prop="poNo">
                    <el-input v-model="formData.poNo" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账时间" >
                  <el-date-picker v-model="postDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账人" prop="postPersonName">
                  <staff-select @childevent="upostPersonNameFill" :querySelect="formData.postPersonName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="发票外部编号" prop="extInvoiceNo">
                    <el-input v-model="formData.extInvoiceNo" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" prop="invoiceStatus">
                    <el-select v-model="formData.invoiceStatus" placeholder="请选择" size="mini" clearable>
                      <el-option v-for="(value,key) in invoiceStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="凭证日期" >
                  <el-date-picker v-model="certificatesDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click="handleAddClick">创建</el-button>
      <el-button type="warning" size="mini" @click="handleEditClick" :disabled="editBtnStatus">修改</el-button>
      <el-button type="warning" size="mini" @click="handlePostClick" :disabled="postBtnStatus">过账</el-button>
      <el-button type="warning" size="mini" @click="handleDeleteClick" :disabled="delBtnStatus">删除</el-button>
      <el-button type="warning" size="mini" @click="handleWriteOffClick" :disabled="writeOffBtnStatus">冲销</el-button>
      <el-button type="warning" size="mini" @click="handleSubmitClick" :disabled="submitBtnStatus">提交ERP</el-button>
    </div>
    <!--表格-->
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @row-db-click = "handleDblclick"
      @selection-change="handleSelectionChange"
      v-loading="listLoading"
    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'invoiceStatus'">
          <span>{{tableData[scope.index]['invoiceStatus'] | invoiceStatusFilter}}</span>
        </div>
        <div v-if="scope.text == 'poInvoiceType'">
          <span>{{tableData[scope.index]['poInvoiceType'] | poInvoiceTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'isCancel'">
          <span>{{tableData[scope.index]['isCancel'] | isCancelFilter}}</span>
        </div>
        <!--<div v-if="scope.text == 'certificatesDate'">-->
          <!--<span>{{tableData[scope.index]['certificatesDate'] | certificatesDateFilter}}</span>-->
        <!--</div>-->
      </template>
    </common-table>
    <!--页码-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <post-dialog  :postDialogShow="postDialogShow" @childevent="postStatus" @closeItem="closePostDialog"></post-dialog>
  </div>
</template>
<script type="text/javascript">
  import router from '@/router';
  import {pickerOptions} from '@/util'
  import {doQueryWithPage,doQueryDelete,doPost,doWriteOff,doSubmit } from 'api/purchase/purchase-invoice/purchase-invoice.js';
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from 'components/common-select/department-select.vue'//部门
  import Supplier from 'components/common-select/supplier.vue'//供应商
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员
  import PostDialog from './post-dialog.vue' //人员

  const headers = [
    { type: 'selection', label: '序号',fixed:'left'},
    { prop: 'poInvoiceNo', label: '系统单据号',align:'center',width:'160px'},
    { prop: 'extInvoiceNo', label: '发票外部编号',align:'center',width:'120px' },
    { prop: 'poInvoiceType', label: '发票类别',align:'center',width:'150px', filter: 'poInvoiceType'},
    { prop: 'manageSubName', label: '经营主体',align:'center',width:'120px'},
    { prop: 'bizOrgName', label: '部门',align:'center',width:'120px'},
    { prop: 'supplierName', label: '供应商',align:'center',width:'120px'},
    { prop: 'certificatesDate', label: '凭证日期',width:'110px',align:'center',dataType: 'Date'},
    { prop: 'invoiceStatus', label: '状态',align:'center', filter: 'invoiceStatus' },
    { prop: 'isCancel', label: '是否冲销',align:'center', filter: 'isCancel' },
    { prop: 'createdBy', label: '创建人',align:'center'},
    { prop: 'createdTime', label: '创建时间',width:'180px',align:'center' ,dataType: 'Time'},
    { prop: 'updatedBy', label: '修改人',align:'center' },
    { prop: 'updatedTime', label: '修改时间',width:'180px',align:'center',dataType: 'Time'},
    { prop: 'postPersonName', label: '过账人',align:'center' },
    { prop: 'postDate', label: '过账时间',width:'180px',align:'center',dataType: 'Time'},
    { prop: 'remark', label: '备注',align:'center',width:'180px'},

  ];
  export default {
    components:{
      ManagementSubject,
      DepartmentSubject,
      Supplier,
      StaffSelect,
      PostDialog
    },
    data(){
      return {
        searchBarFlg:true,
        formData: {
          manageSubName: '',
          manageSubCode: '',
          bizOrgName: '',
          bizOrgCode: '',
          supplierName: '',
          supplierCode: '',
          poInvoiceNo: '',
          poNo: '',
          extInvoiceNo: '',
          poInvoiceType: '',
          certificatesDateStart: '',
          certificatesDateEnd: '',
          invoiceStatus: '',
          createdBy: '',
          updatedBy: '',
          postPersonName: '',
          postDateStart: '',
          postDateEnd: '',
          createdTimeStart: '',
          createdTimeEnd: '',
          updatedTimeStart: '',
          updatedTimeEnd: '',
        },
        listLoading: 'false',
        operateFlg: false,
        postDialogShow: false,
        headers: headers,
        tableData: [],
        multipleSelection: [],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total: null,
        deleteList:[],//删除
        postList:[],//过账
        writeOffList:[],//冲销
        doSubmitList:[],//提交
        createdTime:'',
        certificatesDate:'',
        updatedTime:'',
        postDate:'',
        poInvoiceType:ENUMS["7260"],
        invoiceStatus:ENUMS["7100"],
        pickerOptions: {
          shortcuts: pickerOptions
        },
      }
    },
    created() {
      this.getList();
    },
    activated(){
      this.getList();
      this.deleteList = [];
      this.postList = [];
      this.writeOffList = [];
      this.doSubmitList = [];
    },
    filters: {
      invoiceStatusFilter(val) { //状态
        return ENUMS["7100"][val];
      },
      poInvoiceTypeFilter(val) { //发票类型
        return ENUMS["7260"][val];
      },
      isCancelFilter(val) { //是否冲销
        if(val == 1){
            return '是'
        }else if(val==0){
            return '否'
        }else{
            return '';
        }
      },
    },
    watch: {

    },
    computed: {
     editBtnStatus(){ //修改按钮状态
        let status = false;
        if(this.multipleSelection.length!=1){
          status =  true;
        }else{
          if(this.multipleSelection[0].invoiceStatus == '71000020' || this.multipleSelection[0].invoiceStatus == '71000030' ){
            status =  true;
          }
        }
        return status||this.operateFlg;
      },
      postBtnStatus(){ //过账按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
              if(val.invoiceStatus != '71000020'){
                status = true;
              }
          });
          return status||this.operateFlg;
        }
        return true;
      },
      writeOffBtnStatus(){ //冲销按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
              if(val.invoiceStatus != '71000030' || val.isCancel != '0'){
                status = true;
              }
          });
          return status||this.operateFlg;
        }
        return true;
      },
      delBtnStatus(){ //删除按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.invoiceStatus != '71000010'){
               status = true;
            }
          });
          return status||this.operateFlg;
        }
        return true;
      },
      submitBtnStatus(){ //提交按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.invoiceStatus != '71000010' && val.invoiceStatus != '71000040'){
               status = true;
            }
          });
          return status||this.operateFlg;
        }
        return true;
      }
    },
    methods: {
      handleResect(){ //重置
        this.formData={
          manageSubName: '',
          manageSubCode: '',
          bizOrgName: '',
          bizOrgCode: '',
          supplierName: '',
          supplierCode: '',
          poInvoiceNo: '',
          poNo: '',
          extInvoiceNo: '',
          poInvoiceType: '',
          invoiceStatus: '',
          createdBy: '',
          updatedBy: '',
          postPersonName: '',
          certificatesDateStart: '',
          certificatesDateEnd: '',
          postDateStart: '',
          postDateEnd: '',
          createdTimeStart: '',
          createdTimeEnd: '',
          updatedTimeStart: '',
          updatedTimeEnd: '',
        };
        this.createdTime = '';
        this.updatedTime = '';
        this.certificatesDate = '';
        this.postDate = '';
        this.getList();
      },
      handleAddClick(){ //创建
        this.$store.dispatch('toggleCurrentView', {
          PurchaseInvoice: {
            view: 'add'
          }
        });
      },
      handleEditClick(){ //编辑
        this.$store.dispatch('toggleCurrentView', {
          PurchaseInvoice: {
            view: 'edit',
             params: {
               poInvoiceId: this.multipleSelection[0].poInvoiceId
             }
          }
        });
      },
      handleDblclick(row, column, cell){ //查询
        this.$store.dispatch('toggleCurrentView', {
          PurchaseInvoice: {
            view: 'look',
            params: {
              poInvoiceId: row.poInvoiceId
            }
          }
        });
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleDeleteClick(){ //删除
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.deleteList=[];
          this.multipleSelection.forEach((x,i) => {
            this.deleteList.push({
              'poInvoiceId':x.poInvoiceId,
              'version':x.version
            });
          });
          doQueryDelete(this.deleteList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
            this.operateFlg = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      handlePostClick(){ //过账
        this.postDialogShow = true;
      },
      handleWriteOffClick(){ //冲销
        this.$confirm('您确认要冲销吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.writeOffList=[];
          this.multipleSelection.forEach((x,i) => {
            this.writeOffList.push({
              'poInvoiceId':x.poInvoiceId,
              'version':x.version
            });
          });
          doWriteOff(this.writeOffList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '冲销成功！',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
            this.operateFlg = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      handleSubmitClick(){ //提交
        this.$confirm('您确认要提交吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.doSubmitList=[];
          this.multipleSelection.forEach((x,i) => {
            this.doSubmitList.push({
              'poInvoiceId':x.poInvoiceId,
              'version':x.version
            });
          });
          doSubmit(this.doSubmitList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '提交成功！',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
            this.operateFlg = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      //分页
      handleSizeChange(val){
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      },
      handleSearch(){
        this.getList();
      },
      closePostDialog(val){
        this.postDialogShow =false;
      },
      postStatus(val){
        this.operateFlg = true;
        this.postList=[];
        this.multipleSelection.forEach((x,i) => {
          this.postList.push({
            'poInvoiceId':x.poInvoiceId,
            'invoiceStatus':val,
            'version':x.version
          });
        });
        doPost(this.postList).then(response => {
          if (response.data.status == 1) {
            if(val=='71000030'){
              this.$notify({
                title: '成功',
                message: '过账成功！',
                type: 'success',
                duration: 2000
              });
            }else{
              this.$notify({
                title: '成功',
                message: '驳回成功！',
                type: 'success',
                duration: 2000
              });
            }
            this.getList();
          }
          this.operateFlg = false;
        });
        this.postDialogShow =false;
      },
      getList(){
        this.listLoading = true;
        if(this.certificatesDate){
          this.formData.certificatesDateStart = this.certificatesDate[0].parseTime ('YYYY-MM-DD');
          this.formData.certificatesDateEnd = this.certificatesDate[1].parseTime ('YYYY-MM-DD');
        }else{
          this.formData.certificatesDateStart = '';
          this.formData.certificatesDateEnd = '';

        }
        if(this.createdTime){
          this.formData.createdTimeStart = this.createdTime[0].parseTime ('YYYY-MM-DD')+' 00:00:00';
          this.formData.createdTimeEnd = this.createdTime[1].parseTime ('YYYY-MM-DD')+' 23:59:59';
        }else{
          this.formData.createdTimeStart = '';
          this.formData.createdTimeEnd = '';

        }
        if(this.postDate){
          this.formData.postDateStart = this.postDate[0].parseTime ('YYYY-MM-DD')+' 00:00:00';
          this.formData.postDateEnd = this.postDate[1].parseTime ('YYYY-MM-DD')+' 23:59:59';
        }else{
          this.formData.postDateStart = '';
          this.formData.postDateEnd = '';

        }
        if(this.updatedTime){
          this.formData.updatedTimeStart = this.updatedTime[0].parseTime ('YYYY-MM-DD')+' 00:00:00';
          this.formData.updatedTimeEnd = this.updatedTime[1].parseTime ('YYYY-MM-DD')+' 23:59:59';
        }else{
          this.formData.updatedTimeStart = '';
          this.formData.updatedTimeEnd = '';
        }
        doQueryWithPage(this.formData,this.listQuery).then(response => {
          this.tableData = response.data.data.datalist;
          this.total = response.data.data.items;
          this.listLoading = false;
        });
      },
      manageSubNameFill(val){ // 经营主体
        if(val){
          this.formData.manageSubName = val.companyName;
          this.formData.manageSubCode = val.companyCode;
        }else {
          this.formData.manageSubName = '';
          this.formData.manageSubCode = '';
        }
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.formData.bizOrgName = val.orgName;
          this.formData.bizOrgCode = val.orgCode;
        }else {
          this.formData.bizOrgName = '';
          this.formData.bizOrgCode = '';
        }
      },
      supplierNameFill(val){ // 供应商
        if(val){
          this.formData.supplierName = val.supplyName;
          this.formData.supplierCode = val.supplyCode;
        }else {
          this.formData.supplierName = '';
          this.formData.supplierCode = '';
        }
      },
      updatedByFill(val){// 修改人
        if(val){
          this.formData.updatedBy = val.userName;
        }else {
          this.formData.updatedBy = '';
        }
      },
      createdByFill(val){// 创建人
        if(val){
          this.formData.createdBy = val.userName;
        }else {
          this.formData.createdBy = '';
        }
      },
      upostPersonNameFill(val){// 过账人
        if(val){
          this.formData.upostPersonName = val.userName;
        }else {
          this.formData.upostPersonName = '';
        }
      }
    },

  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
