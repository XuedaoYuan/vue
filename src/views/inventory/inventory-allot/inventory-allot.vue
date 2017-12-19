<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <!--<el-button type="primary" icon="el-icon-search" size="small">查询</el-button>-->
      <div style="margin-bottom:10px">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
        <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
        <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left:10px" @click="rest">重置</el-button>
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
                  <department-select  @childevent = "childEventHandlerMainInfo" :querySelect="formData.bizOrgName"></department-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调入仓库" prop="inWarehouseName">
                  <warehouse-select  @childevent = "childEventHandlerWarehouse" :querySelect="formData.inWarehouseName"></warehouse-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调出仓库" prop="outWarehouseName">
                  <warehouse-select  @childevent = "childEventHandlerWarehouse1" :querySelect="formData.outWarehouseName"></warehouse-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="调拨单号" prop="alSheetNo">
                  <el-input v-model="formData.alSheetNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调拨状态" prop="alStatus">
                  <el-select v-model="formData.alStatus" size="mini" clearable placeholder="请选择">
                    <el-option v-for="(value,key) in alStatus" :key="key" :label="value" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调拨日期" >
                  <el-date-picker v-model="formData.alDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="创建时间" prop="createdTime">
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
                <el-form-item label="修改人" prop="updatedBy">
                  <staff-select @childevent="childEventHandlerStaff" :querySelect="formData.updatedBy"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改时间" prop="updatedTime">
                  <el-date-picker v-model="formData.updatedTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账时间" prop="postDate">
                  <el-date-picker v-model="formData.postDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" >
                <el-form-item label="过账人" prop="postPersonName">
                  <staff-select @childevent="childEventHandlerPost" :querySelect="formData.postPersonName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>

    </div>
    <div class="btn" style="margin-bottom: 10px">
      <el-button type="warning" size="mini" @click="onClickAdd">创建</el-button>
      <el-button type="warning" size="mini" :disabled="editBtnStatus" @click="onClickEdit">修改</el-button>
      <!--<el-button type="warning" size="mini" >查看</el-button>-->
      <el-button type="warning" size="mini" :disabled="delBtnStatus" @click="onClickDel">删除</el-button>
      <el-button type="warning" size="mini" :disabled="postBtnStatus" @click="handlePost">过账</el-button>
      <el-button type="warning" size="mini" :disabled="cancelPostBtnStatus" @click="cancelHandlePost">取消过账</el-button>
      <!--<el-button type="warning" size="mini">冲销</el-button>-->
      <!--<el-button type="warning" size="mini">刷新</el-button>-->
    </div>
    <div class="commonTable">
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @row-db-click = "handleDblclick"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"
    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'alStatusTypeFilter'">
          <span>{{tableData[scope.index]['alStatus'] | alStatusTypeFilter}}</span>
        </div>
      </template>
    </common-table>
      <h1>{{tableData.alStatus}}</h1>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.currentPage"
      :page-sizes="[10, 20, 30,50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script type="text/javascript">

//  import router from '@/router'
import { doQueryWithPage,doPost,doCancelPost , doDeleteList} from '@/api/inventory/inventory-allot/inventory-allot.js'
import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
import WarehouseSelect from '@/components/common-select/warehouse-select.vue' //仓库
import StaffSelect from '@/components/common-select/staff-select.vue' //人员

import {pickerOptions} from '@/util'
const ENUMS = {
  "alStatus":{
    "71500005":"已保存",
    "71500010":"已过账"
  }
}
  const headers = [
    { type: 'selection', width: '55px',fixed:'left'},
    { type: 'index', label: '行号',width:'60px',align:'center'},
    { prop: 'alNo', label: '系统单据号',width:'180px' ,align:'center'},
//    { prop: 'alSheetNo', label: '调拨单号' ,align:'center'},
    { prop: 'alDate', label: '调拨日期',dataType: 'Date',width:'180px',align:'center'},
    { prop: 'alStatus',filter:'alStatusTypeFilter', label: '调拨单状态',width:'180px' ,align:'center'},
    { prop: 'manageSubName', label: '经营主体',width:'120px' ,align:'center'},
    { prop: 'bizOrgName', label: '部门',width:'120px' ,align:'center'},
    { prop: 'outWarehouseName',width:'120px', label: '调出仓库' ,align:'center'},
    { prop: 'inWarehouseName', label: '调入仓库',width:'120px' ,align:'center'},
    { prop: 'createdBy', label: '创建人' ,align:'center'},
    { prop: 'createdTime', label: '创建时间',dataType: 'Time',width:'180px',align:'center'},
    { prop: 'updatedBy', label: '修改人' ,align:'center'},
    { prop: 'updatedTime', label: '修改时间',dataType: 'Time',width:'180px' ,align:'center'},
    { prop: 'postPersonName', label: '过账人' ,align:'center'},
    { prop: 'postDate', label: '过账时间',dataType: 'Time',width:'180px',align:'center'},
  ];
  export default {
    components: {
      ManagementSubject,DepartmentSelect,WarehouseSelect,StaffSelect
    },
    data(){
      return {
        postList:[],
        deleteList:[],
        searchBarFlg: true,
        value4:'',
        multipleSelection:[],
        listQuery:{
          pageSize:10,
          currentPage:1
        },
        total:null,
        pickerOptions: {
          shortcuts: pickerOptions
        },
        formData: {
          alSheetNo:'',//调拨单号
          alDate:'',//调拨日期
          alStatus:'',//调拨单状态
          manageSubCode:'',//经营主体code
          manageSubId:'',//经营主体id
          manageSubName:'',//经营主体name
          bizOrgId:'',//业务部门id
          bizOrgName:'',//业务部门name
          bizOrgCode:'',//业务部门code,
          outWarehouseId:'',//调出仓库id
          outWarehouseName:'',//调出仓库id
          outWarehouseCode:'',//调出仓库id
          inWarehouseId:'',//调入仓库id
          inWarehouseName:'',//调入仓库id
          inWarehouseCode:'',//调入仓库id
          createdTime:'',//创建时间
          createdBy:'',//创建人
          updatedBy:'',//修改人
          updatedTime:'',//修改日期
          postPersonId:'',//过账人id
          postPersonName:'',//过账人name
          postPersonCode:'',//过账人code
          postDate:'',//过账时间
        },
        alStatus:ENUMS.alStatus,
        headers: headers,
        tableData: []
      }
    },
    methods:{
      handleSearch() {
        this.getList()
      },
      getList: function () {
        let vm = this;
        vm.loading = true;
        vm.formData.createdTime?vm.formData.createdTimeEnd= vm.formData.createdTime[1]:vm.formData.createdTimeEnd='';
        vm.formData.createdTime?vm.formData.createdTimeStart= vm.formData.createdTime[0]:vm.formData.createdTimeStart='';
        vm.formData.updatedTime?vm.formData.updatedTimeStart= vm.formData.updatedTime[0]:vm.formData.updatedTimeStart='';
        vm.formData.updatedTime?vm.formData.updatedTimeEnd= vm.formData.updatedTime[1]:vm.formData.updatedTimeEnd='';
        vm.formData.postDate?vm.formData.postDateStart= vm.formData.postDate[0]:vm.formData.postDateStart='';
        vm.formData.postDate?vm.formData.postDateEnd= vm.formData.postDate[1]:vm.formData.postDateEnd='';
        vm.formData.alDate?vm.formData.alDateStart= vm.formData.alDate[0]:vm.formData.alDateStart='';
        vm.formData.alDate?vm.formData.alDateEnd= vm.formData.alDate[1]:vm.formData.alDateEnd='';
        doQueryWithPage(vm.formData,vm.listQuery).then(res => {
          if(res.data.status === 1) {
            vm.tableData=res.data.data.datalist;
            console.log('data.data.datalist',vm.list)
            vm.total = res.data.data.items;
            vm.loading = false
          }
        })
      },
      cancelHandlePost(){ //取消过账
        this.$confirm('您确认要取消过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.postList=[];
          this.multipleSelection.forEach((x,i) => {
            this.postList.push({
              'alId':x.alId,
              'version':x.version
            })
          });
          doCancelPost(this.postList).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '取消过账成功',
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
      handlePost(){ //过账
        this.$confirm('您确认要过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.postList=[];
          this.multipleSelection.forEach((x,i) => {
            this.postList.push({
              'alId':x.alId,
              'version':x.version
            })
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
      rest(){
        this.formData= {
          alSheetNo:'',//调拨单号
            alDate:'',//调拨日期
            alStatus:'',//调拨单状态
            manageSubCode:'',//经营主体code
            manageSubId:'',//经营主体id
            manageSubName:'',//经营主体name
            bizOrgId:'',//业务部门id
            bizOrgName:'',//业务部门name
            bizOrgCode:'',//业务部门code,
            outWarehouseId:'',//调出仓库id
            outWarehouseName:'',//调出仓库id
            outWarehouseCode:'',//调出仓库id
            inWarehouseId:'',//调入仓库id
            inWarehouseName:'',//调入仓库id
            inWarehouseCode:'',//调入仓库id
            createdTime:'',//创建时间
            createdBy:'',//创建人
            updatedBy:'',//修改人
            updatedTime:'',//修改日期
            postPersonId:'',//过账人id
            postPersonName:'',//过账人name
            postPersonCode:'',//过账人code
            postDate:'',//过账时间
        }
        this.deleteList = [];
        this.getList()
      },
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
        this.multipleSelection=row;
      },
      //分页
      handleSizeChange(val){
        this.listQuery.pageSize=val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.currentPage=val;
        this.getList();
      },
      handleDblclick(row, column, cell){
        this.$store.dispatch('toggleCurrentView', {
          InventoryAllot: {
            view: 'detail',
            params: {
              "alId":row.alId
            }
          }
        });
      },
      onClickAdd() {
        this.$store.dispatch('toggleCurrentView', {
          InventoryAllot: {
            view: 'add',
          }
        });
      },
      onClickEdit() {
          this.$store.dispatch('toggleCurrentView', {
            InventoryAllot: {
              view: 'edit',
             params: {
                editId: this.multipleSelection[0].alId
             }
            }
          });
      },
      onClickDetail() {
          this.$store.dispatch('toggleCurrentView', {
            InventoryAllot: {
              view: 'detail',
               params: {
                 alId:this.multipleSelection[0].alId
               }
            }
          });
      },
      onClickDel(){ //删除
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.deleteList=[];
          this.multipleSelection.forEach((x,i) => {
            this.deleteList.push({
              'alId':x.alId,
              'version':x.version
            });
          });
          doDeleteList(this.deleteList).then(response => {
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
      childEventHandlerWarehouse(val) {
        console.log('childEventHandlerWarehouse',val)
        if (val) {
          this.formData.inWarehouseName= val.warehouseName;
          this.formData.inWarehouseId= val.warehouseId;
          this.formData.inWarehouseCode= val.warehouseCode;
        } else {
          this.formData.inWarehouseName = '';
          this.formData.inWarehouseId = '';
          this.formData.inWarehouseCode = '';
        }
      },
      childEventHandlerWarehouse1(val) {
        console.log('childEventHandlerWarehouse',val)
        if (val) {
          this.formData.outWarehouseName= val.warehouseName;
          this.formData.outWarehouseId= val.warehouseId;
          this.formData.outWarehouseCode= val.warehouseCode;
        } else {
          this.formData.outWarehouseName = '';
          this.formData.outWarehouseId = '';
          this.formData.outWarehouseCode = '';
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
      postBtnStatus(){
        let status = false;
        if(this.multipleSelection.length == 1){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.alStatus != '71500005'){
              status = true;
            }
          });
          return status;
        }
        return true;
      },
      cancelPostBtnStatus(){
        let status = false;
        if(this.multipleSelection.length == 1){
          this.multipleSelection.forEach((val,idx)=>{
            if(val.alStatus != '71500010'){
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
            if(x.alStatus != '71500005'){
              status = true;
            }
          });
          return status;
        }
        return true;
      }
    },
    created: function () {
      this.getList()
    },
    activated: function(){
      this.getList()//keep-alive
    },
    filters:{
      alStatusTypeFilter(val) {
        return ENUMS.alStatus[val];
      },
    }

  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
