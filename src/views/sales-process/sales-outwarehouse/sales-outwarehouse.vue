<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
      <el-button-group>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
      <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
      <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-refresh" size="small" style="margin-left:10px" @click="handleResect">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="80px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <management-subject  @childevent = "manageSubNameFill" :querySelect="formData.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-subject  @childevent = "bizOrgNameFill" :querySelect="formData.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出库单号" prop="soOsNo">
                    <el-input v-model="formData.soOsNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售类型" prop="soType">
                  <el-select v-model="formData.soType" placeholder="请选择" size="mini" clearable>
                    <el-option v-for="(value,key) in soType" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="客户" prop="customerName">
                  <customer-select @childevent="customerNameFill" :querySelect="formData.customerName"></customer-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="仓库" prop="warehouseName">
                  <warehouse-select @childevent="warehouseNameFill" :querySelect="formData.warehouseName"></warehouse-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据状态" prop="osStatus">
                  <el-select v-model="formData.osStatus" placeholder="请选择" size="mini" clearable>
                    <el-option v-for="(value,key) in osStatus" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员" prop="buyerName">
                  <staff-select @childevent="buyerNameFill" :querySelect="formData.buyerName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="销售合同号" prop="soContractNo">
                    <el-input v-model="formData.soContractNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="确认出库" prop="isOutstock">
                    <el-select v-model="formData.isOutstock" placeholder="请选择" clearable size="mini">
                      <el-option key="0" label="是" value="0"></el-option>
                      <el-option key="1" label="否" value="1"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="签收日期" prop="signDate">
                      <el-date-picker v-model="signDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币别" prop="currencyName">
                  <CurrencySelect  @childevent="currencyFill" :querySelect="formData.currencyName"></CurrencySelect>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="出库日期" prop="outstockDate">
                    <el-date-picker v-model="outstockDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建时间" prop="createdTime">
                    <el-date-picker v-model="createdTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createdBy">
                  <staff-select @childevent="createdByFill" :querySelect="formData.createdBy"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="OA审核标题" prop="auitTitle">
                  <el-input v-model="formData.auitTitle" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="修改时间" prop="updatedTime">
                  <el-date-picker v-model="updatedTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改人" prop="updatedBy">
                  <staff-select @childevent="updatedByFill" :querySelect="formData.updatedBy"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账时间" prop="postDate">
                  <el-date-picker v-model="postDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账人" prop="postPersonName">
                  <staff-select @childevent="postPersonNameFill" :querySelect="formData.postPersonName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click="establish('edit')" :disabled="editBtnStatus">修改</el-button>
      <el-button type="warning" size="mini" @click="handleDeleteClick"  :disabled="delBtnStatus">删除</el-button>
      <el-button type="warning" size="mini" @click="handlePostClick" :disabled="postBtnStatus">过账</el-button>
      <el-button type="warning" size="mini" @click="handleCanclePostClick" :disabled="canclePostBtnStatus">取消过账</el-button>
      <el-button type="warning" size="mini" @click="handleCusSureClick" :disabled="outstockBtnStatus">出库确认</el-button>
      <el-button type="warning" size="mini">超限放行</el-button>
    </div>
    <div class="table">
      <common-table
        :data="tableData"
        :maxHeight="300"
        :fit="true" ref="multipleTable"
        :headers="headers"
        @row-db-click = "handleDblclick"
        @selection-change="handleSelectionChange"
        >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'osStatus'">
            <span>{{tableData[scope.index]['osStatus'] | osStatusFilter}}</span>
          </div>
          <div v-if="scope.text == 'isOutstock'">
            <span>{{tableData[scope.index]['isOutstock'] | isOutstockFilter}}</span>
          </div>
          <div v-if="scope.text == 'soType'">
            <span>{{tableData[scope.index]['soType'] | soTypeFilter}}</span>
          </div>
        </template>
        </common-table>
    </div>
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
  </div>
</template>
<script>
  import router from '@/router';
  import {pickerOptions} from '@/util'
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from 'components/common-select/department-select.vue'//部门
  import CurrencySelect from '@/components/common-select/currency-select.vue'//币种
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员
  import CustomerSelect from 'components/common-select/customer-select.vue' //客户
  import WarehouseSelect from 'components/common-select/warehouse-select.vue' //仓库
  import {doQuerySoOsWithPage,doDeleteSoOs,doCusPost,doCusModifyPost,doCusSure} from 'api/sales-process/sales-outwarehouse/sales-outwarehouse.js';



  const headers = [
    { type: 'selection', width: '55px',fixed:'left'},
    { prop: 'soOsNo', label: '出库单号', width: '120px',align:'center' },
    { prop: 'soType', label: '销售类型', width: '110px',align:'center',filter: 'soType'},
//    { prop: 'soContractNo', label: '销售合同号', width: '120px',align:'center'},
    { prop: 'warehouseName', label: '仓库', width: '120px',align:'center'},
    { prop: 'manageSubName', label: '经营主体', width: '110px' ,align:'center'},
    { prop: 'bizOrgName', label: '部门' , width: '100px',align:'center'},
    { prop: 'customerName', label: '客户', width: '120px',align:'center' },
    { prop: 'osStatus', label: '单据状态' , width: '120px',align:'center',filter: 'osStatus'},
    { prop: 'buyerName', label: '业务员' , width: '120px',align:'center'},
    { prop: 'currencyName', label: '币别' , width: '120px',align:'center'},
    { prop: 'contacts', label: '联系人' , width: '120px',align:'center'},
    { prop: 'signer', label: '签收人' , width: '120px',align:'center'},
    { prop: 'outstockAmt', label: '出库总金额' , width: '120px',align:'center',digit: '2'},
    { prop: 'rateCurrency', label: '汇率' , width: '120px',align:'center',digit: '8'},
    { prop: 'contactsPhone', label: '联系方式' , width: '120px',align:'center'},
    { prop: 'signDate', label: '签收日期' , width: '120px',align:'center',dataType: 'Date'},
    { prop: 'outstockDa2te', label: '出库日期' , width: '120px',align:'center',dataType: 'Date'},
    { prop: 'isOutstock', label: '确认出库' , width: '120px',align:'center',filter: 'isOutstock'},
    { prop: 'auitTitle', label: 'OA审核标题' , width: '120px',align:'center'},
    { prop: 'createdBy', label: '创建人' , width: '120px',align:'center'},
    { prop: 'createdTime', label: '创建时间' , width: '150px',align:'center',dataType: 'Time'},
    { prop: 'updatedBy', label: '修改人' , width: '120px',align:'center'},
    { prop: 'updatedTime', label: '修改时间' , width: '150px',align:'center',dataType: 'Time'},
    { prop: 'postPersonName', label: '过账人' , width: '120px',align:'center'},
    { prop: 'postDate', label: '过账时间' , width: '150px',align:'center',dataType: 'Time'},
  ];


  export default {
    components:{
      ManagementSubject,
      DepartmentSubject,
      CurrencySelect,
      CustomerSelect,
      WarehouseSelect,
      StaffSelect
    },
    filters: {
      osStatusFilter(val) { //单据状态
        return ENUMS["7060"][val];
      },
      soTypeFilter(val) { //销售类型
        return ENUMS["7270"][val];
      },
      isOutstockFilter(val) { //确认出库
        if(val == 0){
            return '是';
        }else if(val == 1){
            return '否';
        }else{
            return '';
        }
      },
    },
    computed: {
      editBtnStatus(){ //修改按钮状态
        if(this.multipleSelection.length!=1){
          return  true;
        }
        if(this.multipleSelection[0].osStatus == '70600020' ){
          return  true;
        }
        return (false||this.operateFlg);
      },
      postBtnStatus(){ //过账按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.osStatus != '70600010' && val.osStatus != '70600030'){
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
            if(val.osStatus != '70600010'){
              status = true;
            }
          });
          return status||this.operateFlg;
        }
        return true;
      },
      canclePostBtnStatus(){ //取消过账按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.osStatus != '70600020'){
              status = true;
            }
          });
          return status||this.operateFlg;
        }
        return true;
      },
      outstockBtnStatus(){ //确认出库按钮状态
        let status = false;
        if(this.multipleSelection.length>0){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.osStatus != '70600020' || val.isOutstock!='1'){
              status = true;
            }
          });
          return status||this.operateFlg;
        }
        return true;
      }
    },
    created(){
      this.getList();
    },
    activated(){
      this.getList();
      this.deleteList = [];
      this.postList = [];
      this.cusSureList = [];
      this.canclePostList = [];
    },
    data(){
      return {
        formData: {
          manageSubName: '',
          manageSubCode: '',
          bizOrgName: '',
          bizOrgCode: '',
          soOsNo: '',
          soType: '',

          customerName: '',
          customerCode: '',
          warehouseName: '',
          warehouseCode: '',
          osStatus: '',
          buyerName: '',

          soContractNo: '',
          isOutstock: '',
          currencyName: '',
          currencyCode: '',
          signDate: '',
          signDateStart: '',
          signDateEnd: '',

          outstockDate: '',
          outstockDateStart: '',
          outstockDateEnd: '',
          createdTime: '',
          createdTimeStart: '',
          createdTimeEnd: '',
          createdBy: '',
          auitTitle: '',

          updatedTime: '',
          updatedTimeStart: '',
          updatedTimeEnd: '',
          updatedBy: '',
          postDate: '',
          postDateStart: '',
          postDateEnd: '',
          postPersonName: '',
        },
        listLoading: 'false',
        headers: headers,
        tableData: [],
        multipleSelection: [],
        canclePostList: [],
        postList: [],
        cusSureList: [],
        listQuery:{
          page: 1,
          limit: 10,
        },
        total: null,
        deleteList:[],//删除
        searchBarFlg: true,
        operateFlg: false,
        pickerOptions: {
            shortcuts: pickerOptions
        },
        signDate: '',//签收日期
        outstockDate: '', //出库日期
        createdTime: '',
        updatedTime: '',
        postDate: '',
        soType:ENUMS["7270"], //销售类型
        osStatus:ENUMS["7060"], //单据状态
      }
    },
    methods:{
      handleResect(){ //重置
        this.formData={
          manageSubName: '',
          manageSubCode: '',
          bizOrgName: '',
          bizOrgCode: '',
          soOsNo: '',
          soType: '',

          customerName: '',
          customerCode: '',
          warehouseName: '',
          warehouseCode: '',
          osStatus: '',
          buyerName: '',

          soContractNo: '',
          isOutstock: '',
          currencyName: '',
          currencyCode: '',
          signDate: '',
          signDateStart: '',
          signDateEnd: '',

          outstockDate: '',
          outstockDateStart: '',
          outstockDateEnd: '',
          createdTime: '',
          createdTimeStart: '',
          createdTimeEnd: '',
          createdBy: '',
          auitTitle: '',

          updatedTime: '',
          updatedTimeStart: '',
          updatedTimeEnd: '',
          updatedBy: '',
          postDate: '',
          postDateStart: '',
          postDateEnd: '',
          postPersonName: '',
        },

        this.createdTime = '';
        this.updatedTime = '';
        this.outstockDate = '';
        this.signDate = '';
        this.postDate = '';
        this.getList();
      },
      handleSearch(){
        this.getList();
      },
      handleDblclick(row){
        this.$store.dispatch('toggleCurrentView', {
          SalesOutwarehouse: {
            view: 'look',
            params: {
              soOsId: row.soOsId
            }
          }
        });
      },
      establish(text){
//        if (text == 'add') {
//          this.$router.push({params: {type: 'add'}});
//        }
        if (text == 'edit') {
          this.$store.dispatch('toggleCurrentView', {
            SalesOutwarehouse: {
              view: 'edit',
               params: {
                 soOsId: this.multipleSelection[0].soOsId
               }
            }
          });
        }
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val){
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getList();
      },
      getList(){
        this.listLoading = true;
        if(this.signDate){ //签收日期
          this.formData.signDateStart = this.signDate[0].parseTime ('YYYY-MM-DD');
          this.formData.signDateEnd = this.signDate[1].parseTime ('YYYY-MM-DD');
        }else{
          this.formData.signDateStart = '';
          this.formData.signDateEnd = '';
        }
        if(this.outstockDate){ //出库日期
          this.formData.outstockDateStart = this.outstockDate[0].parseTime ('YYYY-MM-DD');
          this.formData.outstockDateEnd = this.outstockDate[1].parseTime ('YYYY-MM-DD');
        }else{
          this.formData.outstockDateStart = '';
          this.formData.outstockDateEnd = '';
        }
        if(this.createdTime){ //创建时间
          this.formData.createdTimeStart = this.createdTime[0].parseTime ('YYYY-MM-DD')+' 00:00:00';
          this.formData.createdTimeEnd = this.createdTime[1].parseTime ('YYYY-MM-DD')+' 23:59:59';
        }else{
          this.formData.createdTimeStart = '';
          this.formData.createdTimeEnd = '';

        }
        if(this.postDate){ //过账时间
          this.formData.postDateStart = this.postDate[0].parseTime ('YYYY-MM-DD')+' 00:00:00';
          this.formData.postDateEnd = this.postDate[1].parseTime ('YYYY-MM-DD')+' 23:59:59';
        }else{
          this.formData.postDateStart = '';
          this.formData.postDateEnd = '';

        }
        if(this.updatedTime){ //修改时间
          this.formData.updatedTimeStart = this.updatedTime[0].parseTime ('YYYY-MM-DD')+' 00:00:00';
          this.formData.updatedTimeEnd = this.updatedTime[1].parseTime ('YYYY-MM-DD')+' 23:59:59';
        }else{
          this.formData.updatedTimeStart = '';
          this.formData.updatedTimeEnd = '';
        }
        doQuerySoOsWithPage(this.formData,this.listQuery).then(response => {
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
      currencyFill(val){ // 币别
        if(val){
          this.formData.currencyName = val.currencyShortname;
          this.formData.currencyCode = val.currencyCode;
        }else {
          this.formData.currencyName = '';
          this.formData.currencyCode = '';
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
      postPersonNameFill(val){// 过账人
        if(val){
          this.formData.postPersonName = val.userName;
        }else {
          this.formData.postPersonName = '';
        }
      },
      buyerNameFill(val){// 业务员
        if(val){
          this.formData.buyerName = val.userName;
        }else {
          this.formData.buyerName = '';
        }
      },
      customerNameFill(val){// 客户
        if(val){
          this.formData.customerName = val.custName;
          this.formData.customerCode = val.custCode;
        }else {
          this.formData.customerCode = '';
          this.formData.customerName = '';
        }
      },
      warehouseNameFill(val){// 仓库
        if(val){
          this.formData.warehouseName = val.warehouseName;
          this.formData.warehouseCode = val.warehouseCode;
        }else {
          this.formData.warehouseName = '';
          this.formData.warehouseCode = '';
        }
      },
      // 删除按钮
      handleDeleteClick(){
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.deleteList=[];
          this.multipleSelection.forEach((x,i) => {
            this.deleteList.push({
              'soOsId':x.soOsId,
              'version':x.version
            });
          });
          doDeleteSoOs(this.deleteList).then(response => {
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
        this.$confirm('您确认要过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.postList=[];
          this.multipleSelection.forEach((x,i) => {
            this.postList.push({
              'soOsId':x.soOsId,
              'version':x.version
            });
          });
          doCusPost(this.postList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '过账成功！',
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
      handleCanclePostClick(){ //取消过账
        this.$confirm('您确认要取消过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.canclePostList=[];
          this.multipleSelection.forEach((x,i) => {
            this.canclePostList.push({
              'soOsId':x.soOsId,
              'version':x.version
            });
          });
          doCusModifyPost(this.canclePostList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '取消过账成功！',
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
      handleCusSureClick(){ //出库确认
        this.$confirm('您确认要出库确认吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.operateFlg = true;
          this.cusSureList=[];
          this.multipleSelection.forEach((x,i) => {
            this.cusSureList.push({
              'soOsId':x.soOsId,
              'version':x.version
            });
          });
          doCusSure(this.cusSureList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '出库确认成功！',
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

    }
  }

</script>
<style scoped>

</style>
