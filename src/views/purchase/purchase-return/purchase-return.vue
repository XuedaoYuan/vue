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
                    <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="formData.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-select  @childevent = "childEventHandlerDepartment" :querySelect="formData.bizOrgName"></department-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="采购类型" prop="roPoType">
                  <el-select v-model="formData.roPoType" clearable placeholder="请选择" size="mini" >
                    <el-option  v-for="(value,key) in roPoType" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币别" prop="currencyName">
                  <currency-select @childevent="getChildEventCurrency" :querySelect="formData.currencyName"
                            ref="supplierPage"></currency-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="供应商" prop="supplierName">
                  <supplier @childevent="getChildEventSupplier" @getData="getData" ref="supplierPage" :selectName="formData.supplierName"></supplier>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="冲销凭证号" prop="credenNo">
                  <el-input v-model="formData.credenNo" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退货类型" prop="roType">
                  <el-select v-model="formData.roType" clearable placeholder="请选择" size="mini" >
                    <el-option  v-for="(value,key) in roType" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改日期" prop="name">
                  <el-date-picker v-model="formData.updateTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="采购收货单" prop="poGrNo">
                  <el-input v-model="formData.poGrNo" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账状态" prop="postStatus">
                  <el-select v-model="formData.postStatus" clearable placeholder="请选择" size="mini">
                    <el-option v-for="(value,key) in postStatus" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据日期" prop="billDate">
                  <el-date-picker v-model="formData.billDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改人" prop="updatedBy">
                  <staff-select @childevent="childEventHandlerStaff" :querySelect="formData.updatedBy"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="创建时间" prop="name">
                  <el-date-picker v-model="formData.createdTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createdBy">
                  <staff-select @childevent="showCreatedBy" :querySelect="formData.createdBy"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账时间" prop="name">
                  <el-date-picker v-model="formData.postDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账人" prop="postPersonName">
                  <staff-select @childevent="childEventHandlerPost" :querySelect="formData.postPersonName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click="handleAddClick">创建</el-button>
      <el-button type="warning" size="mini" :disabled = 'editBtnStatus' @click="handleEditClick">修改</el-button>
      <el-button type="warning" size="mini" :disabled="postBtnStatusSave" @click="handlePostSave">过账</el-button>
      <el-button type="warning" size="mini" :disabled="postBtnStatus" @click="handlePost">取消过账</el-button>
      <el-button type="warning" size="mini" :disabled = 'delBtnStatus' @click="handleDeleteClick">删除</el-button>
    </div>
    <!--表格-->
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @row-db-click = "handleDblclick"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'select'">
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'roTypeTypeFilter'">
        <span>{{tableData[scope.index]['roType'] | roTypeTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'operationTypeFilter'">
          <span>{{tableData[scope.index]['operationType'] | operationTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'roPoTypeTypeFilter'">
          <span>{{tableData[scope.index]['roPoType'] | roPoTypeTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'postStatusTypeFilter'">
          <span>{{tableData[scope.index]['postStatus'] | postStatusTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'date'">
          <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="scope.text == 'input'">
          <el-input v-model="list[scope.index]['name']"></el-input>
        </div>
      </template>
    </common-table>
    <!--页码-->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script type="text/javascript">
  import { doQueryWithPage, doQueryDelete, doCusModifyPost, doPost } from '@/api/purchase/purchase-return/purchase-return.js'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
  import supplier from '@/components/common-select/supplier.vue'//供应商
  import CurrencySelect from '@/components/common-select/currency-select.vue'//币别
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员

  import {pickerOptions} from '@/util'
  const ENUMS = {
    "roType": { //采购退货/冲销状态
      "73050005": "冲销",
      "73050010": "退货",
      "73050015": "换货"
    },
    "postStatus": { //过账状态
      "70400010": "保存",
      "70400020": "已过账",
      "70400030": "已冲销"
    },
    "roPoType": { //采购类型
      "72300010": "国内采购",
      "72300020": "自营进口",
      "72300030": "代理进口"
    },
    "operationType": { //移动类型
      "74050010": "入库单",
      "74050020": "暂收单",
//      "1": "暂收单",
//      "2": "入库单",
//      "3": "提单",
//      "4": "到港",
//      "5": "清关",
    }
  }
  const headers = [
    {  type: 'selection',width:'55px', label: '序号',align:'center',fixed:'left'},
    { prop: 'poRoNo', label: '系统单据号',width:'160px',align:'center'},
    { prop: 'poGrNo', label: '采购收货单',width:'160px',align:'center'},
    { prop: 'postStatus', label: '过账状态',align:'center',filter: 'postStatusTypeFilter'},
    { prop: 'manageSubName', label: '经营主体',align:'center' },
    { prop: 'bizOrgName', label: '部门',align:'center'},
//    { prop: 'operationType', label: '移动类型' ,align:'center',filter: 'operationTypeFilter' },
    { prop: 'roType', label: '退货类型' ,align:'center',filter: 'roTypeTypeFilter' },
    { prop: 'roPoType', label: '采购类型',align:'center',filter:'roPoTypeTypeFilter' },
    { prop: 'currencyName', label: '币别',align:'center' },
    { prop: 'billDate', label: '单据日期',width:'180px',dataType: 'Date',align:'center' },//待修改字段
    { prop: 'supplierName', label: '供应商',width:'100px',align:'center' },
    { prop: 'rateCurrency', label: '人民币汇率',digit: '8',width:'120px',align:'center' },
    { prop: 'createdBy', label: '创建人',align:'center' },
    { prop: 'createdTime',dataType: 'Time',width:'180px', label: '创建时间',align:'center' },
    { prop: 'updatedBy', label: '修改人',align:'center' },
    { prop: 'updatedTime',dataType: 'Time',width:'180px', label: '修改时间',align:'center'},
    { prop: 'postPersonName', label: '过账人',align:'center' },
    { prop: 'postDate',dataType: 'Time',width:'180px', label: '过账时间',align:'center' },
  ];
  export default {
    components: {
      ManagementSubject,DepartmentSelect,supplier,CurrencySelect,StaffSelect
    },
    data(){
      return {
        loading:false,
        searchBarFlg: true,
        searchDataList:[],
        title: 'order2!',
        formData: {
          manageSubCode: '',//经营主体code
          manageSubId: '',//经营主体id
          manageSubName: '',//经营主体name
          bizOrgCode: '',//部门code
          bizOrgName: '',//部门name
          bizOrgId: '',//部门id
          roPoType: '',//采购类型
          currencyName: '',//币别name
          currencyId: '',//币别name
          currencyCode: '',//币别name
          supplierId: '',//供应商id
          supplierCode: '',//供应商code
          supplierName: '',//供应商name
          credenNo: '',//冲销凭证号
          poNo: '',//系统单据号
          roType: '',//退货类型
          updateTimeStart: '',//修改时间
          updateTimeEnd: '',//修改时间
          poGrNo: '',//采购收货单号
          postStatus: '',//过账状态
          //单据日期
          billDate:'',
          billDateStart:'',
          billDateEnd:'',
          updatedBy: '',//修改人
          createdTimeStart: '',//创建时间
          createdTimeEnd: '',//创建时间
          createdBy: '',//创建人
          postDateStart: '',//过账时间
          postDateEnd: '',//过账时间
          postPersonName: '',//过账人
          postDate: '',//过账时间
          createdTime: '',//创建时间
          updateTime: '',//修改时间
        },
        pickerOptions: {
          shortcuts: pickerOptions
        },
        postStatus:ENUMS.postStatus,
        operationType:ENUMS.operationType,
        roType:ENUMS.roType,
        roPoType:ENUMS.roPoType,
        value4: '',
        value1: '',
        headers: headers,
        tableData: [],
        multipleSelection: [],
        total:null,
        deleteList:[],//删除
        postList:[],//过账
        writeOffList:[],//冲销
        listQuery:{
          currentPage:1,
          pageSize:10,
        },
      }
    },
    created: function () {
      this.getList()
    },
    activated: function(){
      this.deleteList = [];
      this.postList = null;
      this.writeOffList = [];
      this.formData= {
        manageSubCode: '',//经营主体code
          manageSubId: '',//经营主体id
          manageSubName: '',//经营主体name
          bizOrgCode: '',//部门code
          bizOrgName: '',//部门name
          bizOrgId: '',//部门id
          roPoType: '',//采购类型
          currencyName: '',//币别name
          currencyId: '',//币别name
          currencyCode: '',//币别name
          supplierId: '',//供应商id
          supplierCode: '',//供应商code
          supplierName: '',//供应商name
          credenNo: '',//冲销凭证号
          poNo: '',//系统单据号
          roType: '',//退货类型
          updateTimeStart: '',//修改时间
          updateTimeEnd: '',//修改时间
          poGrNo: '',//采购收货单号
          postStatus: '',//过账状态
          //单据日期
          billDate:'',
          billDateStart:'',
          billDateEnd:'',
          updatedBy: '',//修改人
          createdTimeStart: '',//创建时间
          createdTimeEnd: '',//创建时间
          createdBy: '',//创建人
          postDateStart: '',//过账时间
          postDateEnd: '',//过账时间
          postPersonName: '',//过账人
          postDate: '',//过账时间
          createdTime: '',//创建时间
          updateTime: '',//修改时间
      },
      this.getList()//keep-alive
    },
    computed: {
      editBtnStatus(){
        let status = false;
        if(this.multipleSelection.length!=1){
          status =  true;
        }else{
          if(this.multipleSelection[0].postStatus == '70400020'|| this.multipleSelection[0].postStatus == '70400030'){
            status =  true;
          }
        }
        return status;
      },
      postBtnStatusSave(){
        let status = false;
        if(this.multipleSelection.length == 1){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.postStatus != '70400010'){
              status = true;
            }
          });
          return status;
        }
        return true;
      },
      postBtnStatus(){
        let status = false;
        if(this.multipleSelection.length == 1){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.postStatus != '70400020'){
              status = true;
            }
          });
          return status;
        }
        return true;
      },
      delBtnStatus(){
        let status = false;
        if(this.multipleSelection.length >= 1){
          this.multipleSelection.forEach((x,i)=>{
            if(x.postStatus != '70400010'){
              status = true;
            }
          });
          return status;
        }
        return true;
      }
    },
    methods: {
      getList: function () {
        let vm = this;
        vm.loading = true;
        vm.formData.createdTime?vm.formData.createdTimeEnd= vm.formData.createdTime[0]:vm.formData.createdTimeEnd='';
        vm.formData.createdTime?vm.formData.createdTimeStart= vm.formData.createdTime[1]:vm.formData.createdTimeStart='';
        vm.formData.updateTime?vm.formData.updateTimeStart= vm.formData.updateTime[0]:vm.formData.updateTimeStart='';
        vm.formData.updateTime?vm.formData.updateTimeEnd= vm.formData.updateTime[1]:vm.formData.updateTimeEnd='';
        vm.formData.postDate?vm.formData.postDateStart= vm.formData.postDate[0]:vm.formData.postDateStart='';
        vm.formData.postDate?vm.formData.postDateEnd= vm.formData.postDate[1]:vm.formData.postDateEnd='';
        vm.formData.billDate?vm.formData.billDateStart= vm.formData.billDate[0]:vm.formData.billDateStart='';
        vm.formData.billDate?vm.formData.billDateEnd= vm.formData.billDate[1]:vm.formData.billDateEnd='';
        doQueryWithPage(vm.formData,vm.listQuery).then(res => {
          if(res.data.status === 1) {
            vm.tableData=res.data.data.datalist;
            for(var i=0;i<vm.tableData.length;i++){
              vm.tableData[i].roType=String( vm.tableData[i].roType)
            }
            console.log(vm.tableData)
            vm.total = res.data.data.items;
            vm.loading = false
          }
        })
      },
      handleResect(){
        this.formData={
          manageSubCode: '',//经营主体code
            manageSubId: '',//经营主体id
            manageSubName: '',//经营主体name
            bizOrgCode: '',//部门code
            bizOrgName: '',//部门name
            bizOrgId: '',//部门id
            roPoType: '',//采购类型
            currencyName: '',//币别name
            currencyId: '',//币别name
            currencyCode: '',//币别name
            supplierId: '',//供应商id
            supplierCode: '',//供应商code
            supplierName: '',//供应商name
            credenNo: '',//冲销凭证号
            poNo: '',//系统单据号
            roType: '',//退货类型
            updateTimeStart: '',//修改时间
            updateTimeEnd: '',//修改时间
            poGrNo: '',//采购收货单号
            postStatus: '',//过账状态
            //单据日期
            billDateStart:'',
            billDateEnd:'',
            billDate:'',
            updatedBy: '',//修改人
            createdTimeStart: '',//创建时间
            createdTimeEnd: '',//创建时间
            createdBy: '',//创建人
            postDateStart: '',//过账时间
            postDateEnd: '',//过账时间
            postPersonName: '',//过账人
        }
      },
      handleAddClick(){
        this.$store.dispatch('toggleCurrentView',{
          PurchaseReturn: {
            view: 'add',
          },

        })
//        this.$router.push({ params: { type: 'add' } });
      },
      handleDblclick(row, column, cell){
        console.log('双击')
        this.$store.dispatch('toggleCurrentView', {
          PurchaseReturn: {
            view: 'detail',
            params: {
              "poRoId":row.poRoId
            }
          }
        });
//        this.$router.push({ params: { type: 'detail'}, query:{poRoId:row.poRoId}})
      },
      handleEditClick(){
        this.$store.dispatch('toggleCurrentView', {
          PurchaseReturn: {
            view: 'edit',
            params: {
              "poRoId":this.multipleSelection[0].poRoId
            }
          }
        });

//        this.$router.push({ params: { type: 'edit'}, query:{poRoId:this.multipleSelection[0].poRoId}})
      },
      handleLookClick(){
        let vm=this;
        if(vm.multipleSelection.length == 1){
          console.log('id=>poRoId',vm.multipleSelection[0].poRoId)
          vm.$store.dispatch('toggleCurrentView',{
            PurchaseReturn: {
              view: 'detail',
              params: {
                "poRoId":this.multipleSelection[0].poRoId
              }
            }
          })
//          vm.$router.push({ params: { type: 'detail'}, query:{poRoId: vm.multipleSelection[0].poRoId}})
        } else{
          this.$notify({
            title: '警告',
              message: '请选择一行进行查看',
            type: 'warning'
          });
        }
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
          this.deleteList=[];
          this.multipleSelection.forEach((x,i) => {
            this.deleteList.push({
              'poRoId':x.poRoId,
              'version':x.version
            });
          });
          doQueryDelete(this.deleteList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
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
        this.listQuery.pageSize = val;
        this.getList()
      },
      handleCurrentChange(val){
        this.listQuery.currentPage = val;
        this.getList()
      },
      handleCellClick(row, column, cell) {

      },
      handlePostSave(){ //过账
        this.$confirm('您确认要过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.postList=[];
          this.multipleSelection.forEach((x,i) => {
            this.postList.push({
              'poRoId':x.poRoId,
              'version':x.version
            });
          });
          doPost(this.postList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '过账成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      handlePost(){ //取消过账
        this.$confirm('您确认要取消过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.postList=[];
          this.multipleSelection.forEach((x,i) => {
            this.postList.push({
              'poRoId':x.poRoId,
              'version':x.version
            });
          });
          doCusModifyPost(this.postList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '过账成功',
                type: 'success',
                duration: 2000
              });
              this.getList();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      handleSearch() {
        this.getList()
      },
      childEventHandlerDepartment(val) {
        console.log('childEventHandlerDepartment',val)
        if(val){
          this.formData.bizOrgName = val.orgName;
//          this.formData.bizOrgId = val.orgId;
//          this.formData.bizOrgCode = val.orgCode;
        }else {
          this.formData.bizOrgName = '';
//          this.formData.bizOrgId = '';
//          this.formData.bizOrgCode = '';
        }
      },
      childEventHandlerMainInfo(val) {
        console.log('childEventHandlerMainInfo',val)
        if(val){
          this.formData.manageSubName = val.companyName;
//          this.formData.manageSubId = val.companyId;
//          this.formData.manageSubCode = val.companyCode;
        }else {
          this.formData.manageSubName = '';
//          this.formData.manageSubId = '';
//          this.formData.manageSubCode = '';
        }
      },
      getChildEventSupplier(val){
        console.log(123123)
        console.log('getChildEventSupplier',val)
        if (val) {
          this.formData.supplierName = val.supplyName;
//          this.formData.supplierCode = val.supplyCode;
//          this.formData.supplierId = val.id;
        } else {
          this.formData.supplierName = ''
//          this.formData.supplierCode = ''
//          this.formData.supplierId = ''
        }
      },
      getData(data){//供应商
//        this.formData.supplierCode = data.supplyCode;
//        this.formData.supplierId = data.id;
        this.formData.supplierName = data.supplyName;
      },
      getChildEventCurrency(val){
        console.log('getCurrencyData',val)
        if (val) {
//          this.formData.currencyId = val.currencyId;
//          this.formData.currencyCode = val.currencyCode;
          this.formData.currencyName = val.currencyName;
        } else {
//          this.formData.currencyId = '';
//          this.formData.currencyCode = '';
          this.formData.currencyName = '';
        }
      },
      childEventHandlerStaff(val){//人员
        console.log(val,"修改人");
        if (val) {
          this.formData.updatedBy = val.userName;
        } else {
          this.formData.updatedBy = '';
        }
      },
      childEventHandlerPost(val){//过账人
        if (val) {
          this.formData.postPersonName = val.userName;
        } else {
          this.formData.postPersonName = '';
        }
      },
      showCreatedBy(val){//创建人
        if (val) {
          this.formData.createdBy = val.userName;
        } else {
          this.formData.createdBy = '';
        }
      },
    },
    filters: {
      operationTypeFilter(val) {
        return ENUMS.operationType[val];
      },
      roTypeTypeFilter(val) {
        return ENUMS.roType[val];
      },
      postStatusTypeFilter(val) {
        return ENUMS.postStatus[val];
      },
      roPoTypeTypeFilter(val) {
        return ENUMS.roPoType[val];
      },

    },
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btn{
  margin-bottom: 20px;
}
</style>
