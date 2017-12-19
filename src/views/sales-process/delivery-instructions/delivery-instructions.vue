<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px" class="btn">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="small" @click="Search">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" icon="el-icon-refresh" size="small" style="margin-left:10px" @click="Reset">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="headerDataForm" label-width="80px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-subject  @childevent = "bizOrgNameFill" :querySelect="tempAll.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员" prop="buyerName">
                  <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.buyerName"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售合同号" prop="soNo">
                  <el-input v-model="formData.soNo" size="mini"></el-input>
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
                <el-form-item label="物料名称" prop="goodsName">
                  <goods-select @childevent="childEventHandlerGoods" :querySelect="tempAll.goodsName"></goods-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="dinNo">
                  <el-input v-model="formData.dinNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货类型" prop="deliveryType">
                  <el-select v-model="formData.deliveryType" size="mini" placeholder="请选择" clearable>
                    <el-option v-for="(val, key) in salesType" :key="key" :label="val" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click="AddClick">创建</el-button>
      <el-button type="warning" size="mini" @click="DeleteClick" :disabled="AuditingStatus">删除</el-button>
      <el-button type="warning" size="mini" @click="EditClick" :disabled='updateStatus'>修改</el-button>
      <el-button type="warning" size="mini" @click="AuditingClick" :disabled="AuditingStatus">审批</el-button>
      <el-button type="warning" size="mini" @click="CancelAuditing" :disabled="CancelAuditingStatus">取消审批</el-button>
      <el-button type="warning" size="mini" @click="Matching" :disabled="matchingStatus">匹配</el-button>
    </div>
    <div class="table">
      <common-table
      :data="list"
      :fit="true"
      :headers="header" v-loading.body="listLoading"
      @cell-click="handleCellClick"
      @row-db-click = "handleDblclick"
      @selection-change="handleSelectionChange"
      >
      <template slot="filter" slot-scope="scope">
        <!-- 销售类型 -->
        <div v-if="scope.text == 'deliveryType'">
          <span>{{list[scope.index]['deliveryType'] | soType}}</span>
        </div>
        <!-- 单据状态 -->
        <div v-if="scope.text == 'dinStatus'">
          <span>{{list[scope.index]['dinStatus'] | dinStatus}}</span>
        </div>
        <!-- 原币金额（含税） -->
        <div v-if="scope.text == 'orginTex'">
          <span>{{list[scope.index]['orginTex'] | pointAfter(2)}}</span>
        </div>
      </template>
      <template slot-scope="scope" slot="default">

      </template>
    </common-table>
  </div>
  <div class="pagination">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="formData.currentPage"
    :page-sizes="[10, 20, 30,50]"
    :page-size="formData.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</div>
</template>
<script>
  import {
    doQueryWithPage,
    doAuditCodDin,
    abolishAuditCodDin,
    doDeleteDin
  } from 'api/sales-process/delivery-instructions/delivery-instructions.js'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import StaffSelect from '@/components/common-select/staff-select.vue' //业务员
  import CustomerSelect from 'components/common-select/customer-select.vue' //客户
  import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
  import { ENUMS } from '../../../assets/enums.js'
  const header = [
  { type: 'selection', width: '55px',fixed:'left'},
  {prop: 'dinNo', label: '系统单据号',align: 'center',width:'160px'},
  {prop: 'manageSubName', label: '经营主体',align: 'center',width:'100px'},
  {prop: 'bizOrgName', label: '部门',align: 'center',width:'100px'},
  {prop: 'customerName', label: '客户',align: 'center',width:'100px'},
  {prop: 'buyerName', label: '业务员',align: 'center',width:'100px'},
  {prop: 'dinStatus', label: '单据状态',align: 'center',filter:'dinStatus',width:'100px'},
  {prop: 'deliveryType', label: '销售类型',align: 'center',filter:"deliveryType",width:'100px'},
  {prop: 'currencyName', label: '币种',align: 'center',width:'100px'},
  {prop: 'orginTex', label: '原币金额（含税）',align: 'center',width:'140px',filter:"orginTex"},
  {prop: 'remark', label: '备注',align: 'center'},
  ];

  export default {
    components: {
      ManagementSubject,DepartmentSubject,StaffSelect,CustomerSelect,GoodsSelect
    },
    data(){
      return {
        tempAll: {
          manageSubName: "",
          bizOrgName: '',//部门
          buyerName:'',
          goodsName: '',//物料名称
          customerName:'',
        },
        formData: {
          manageSubCode:'',
          bizOrgCode:'',
          buyerCode:'',
          deliveryType:'',//发货类型
          goodsCode:'',
          dinNo:'',//系统单据号
          soNo:'',//销售合同号
          customerCode:'',
          currentPage:1,
          pageSize:10,
          needCount:true
        },
        salesType: ENUMS["7270"],//发货类型
        dinStatus: ENUMS["7050"],//发货指令状态
        header: header,
        list: [],
        searchBarFlg: true,
        listLoading:false,

        total:0,
        selectchange:'',//列表多选
        updateStatus:true,//修改状态
        AuditingStatus:true,//审批状态
        CancelAuditingStatus:true,//取消审批状态
        matchingStatus:true,//匹配状态
      }
    },
    filters: {
      soType(val){
        return ENUMS["7270"][val];
      },
      dinStatus(val){
        return ENUMS["7050"][val];
      },
      pointAfter: function(val, num) {
          if (!val) {
              return '';
          }
          if (typeof val == 'number') {
              return val.toFixed(num) + '';
          } else {
              return parseFloat(val).toFixed(num) + '';
          }
      }
    },
    activated(){
      this.Search();
    },
    created(){
      this.Search();
    },
    methods:{
      //查询
      Search(){
        this.listLoading = true;
        doQueryWithPage(this.formData).then(response => {
          if(response.data.status == 1){
            this.list = response.data.data.datalist;
            this.total = response.data.data.items;
            this.listLoading = false;
          }else {
            this.listLoading = false;
          }
        })
      },
      //Reset
      Reset(){
        this.tempAll = {
          manageSubName: "",
          bizOrgName: '',//部门
          buyerName:'',
          goodsName: '',//物料名称
          customerName:'',
        }
        this.formData = {
          manageSubCode:'',
          bizOrgCode:'',
          buyerCode:'',
          deliveryType:'',//发货类型
          goodsCode:'',
          dinNo:'',//系统单据号
          soNo:'',//销售合同号
          customerCode:'',
          currentPage:1,
          pageSize:10,
          needCount:true
        }

      },

      AddClick(){ //创建
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'add'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      EditClick(){//修改
        var id = this.selectchange[0].dinId;
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'edit',
            params: {
              "updateId": id,
            }
          }
        });
      },

      Matching(){//匹配
        // var info = [];
        // this.selectchange.forEach((o,i)=>{
        //   info.push({
        //     "manageSubCode":o.manageSubCode,
        //     "goodsId":o.goodsId,
        //     "bizOrgCode":o.bizOrgCode,
        //     // "dinId":o.dinId,
        //   })
        // })
        var id = this.selectchange[0].dinId;
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'match',
            params: {
              "passInfo":id,
            }
          }
        });
      },

      DeleteClick(){//删除
        var auditingInfo = [];
        this.selectchange.forEach((o,i)=>{
          auditingInfo.push({
            "dinId":o.dinId,
            "version":o.version
          })
        })
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doDeleteDin(auditingInfo).then(response=>{
            if(response.data.status ==1){
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              });
              this.Search();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      AuditingClick(){
        var auditingInfo = [];
        this.selectchange.forEach((o,i)=>{
          auditingInfo.push({
            "dinId":o.dinId,
            "version":o.version
          })
        })
        this.$confirm('您确认要审批吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doAuditCodDin(auditingInfo).then(response=>{
            if(response.data.status==1){
              this.$notify({
                title: '成功',
                message: '审批成功！',
                type: 'success'
              });
              this.Search();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      CancelAuditing(){
        var auditingInfo = [];
        this.selectchange.forEach((o,i)=>{
          auditingInfo.push({
            "dinId":o.dinId,
            "version":o.version
          })
        })
        this.$confirm('您确认要取消审批吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          abolishAuditCodDin(auditingInfo).then(response=>{
            if(response.data.status==1){
              this.$notify({
                title: '成功',
                message: '取消审批成功！',
                type: 'success'
              });
              this.Search();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

      childEventHandlerMainInfo(val) {// 经营主体
        if(val){
          this.tempAll.manageSubName = val.companyName;
          this.tempAll.manageSubId = val.companyId;
          this.tempAll.manageSubCode = val.companyCode;
          this.formData.manageSubCode = val.companyCode;
        }else {
          this.tempAll.manageSubName = '';
          this.tempAll.manageSubId = '';
          this.tempAll.manageSubCode = '';
          this.formData.manageSubCode = '';
        }
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.tempAll.bizOrgName = val.orgName;
          this.tempAll.bizOrgCode = val.orgCode;
          this.tempAll.bizOrgId = val.orgId;
          this.formData.bizOrgCode = val.orgCode;
        }else {
          this.tempAll.bizOrgName = '';
          this.tempAll.bizOrgCode = '';
          this.tempAll.bizOrgId = '';
          this.formData.bizOrgCode = '';
        }
      },
      childEventHandlerStaff(val){//业务员
        if(val){
          this.tempAll.buyerName = val.userName;
          this.tempAll.buyerId = val.userId;
          this.tempAll.buyerCode = val.userCode;
          this.formData.buyerCode = val.userCode;
        }else {
          this.tempAll.buyerName = '';
          this.tempAll.buyerId = '';
          this.tempAll.buyerCode = '';
          this.formData.buyerCode = '';
        }
      },
      childEventHandlerCustomer(val){//客户
        if(val){
          this.tempAll.customerName = val.custName;
          this.tempAll.customerId = val.id;
          this.tempAll.customerCode = val.custCode;
          this.formData.customerCode = val.custCode;
        }else {
          this.tempAll.customerName = '';
          this.tempAll.customerId = '';
          this.tempAll.customerCode = '';
          this.formData.customerCode = '';
        }
      },
      childEventHandlerGoods(val) {//物料编号
        if(val){
          this.tempAll.goodsName = val.goodsName;
          this.tempAll.goodsId = val.goodsId;
          this.tempAll.goodsCode = val.goodsCode;
          this.formData.goodsCode = val.goodsCode;
        }else {
          this.tempAll.goodsName = '';
          this.tempAll.goodsId = '';
          this.tempAll.goodsCode = '';
          this.formData.goodsCode = '';
        }
      },
      //单选
      handleCellClick(){

      },
      // 双击
      handleDblclick(row){
        var id = row.dinId;
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'look',
            params: {
              "updateId": id,
            }
          }
        });
      },
      handleSelectionChange(val){
        this.selectchange = val;
        if(val.length>0){//匹配
          for(var i=0;i<val.length;i++){
            if(val[i].dinStatus == '70500010'){//审批状态
              this.AuditingStatus = false;
            }else {
              this.AuditingStatus = true;
            }
            if(val[i].dinStatus == '70500020'){//取消审批状态
              this.CancelAuditingStatus = false;
            }else {
              this.CancelAuditingStatus = true;
            }
          }
        }else {
          this.AuditingStatus = true;
          this.CancelAuditingStatus = true;
        }
        if(val.length==1 && val[0].dinStatus == '70500010'){//修改状态
          this.updateStatus = false;
        }else {
          this.updateStatus = true;
        }
        if(val.length==1 && val[0].dinStatus == '70500020'){//匹配
          this.matchingStatus = false;
        }else {
          this.matchingStatus = true;
        }
      },
      handleSizeChange(val){
        this.formData.pageSize = val;
        this.Search();
      },
      handleCurrentChange(val){
        this.formData.currentPage = val;
        this.Search();
      },

    }
  }
</script>
