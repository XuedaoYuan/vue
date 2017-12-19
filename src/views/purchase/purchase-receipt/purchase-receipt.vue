<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div class="searchAndResetBtns">
        <div>
          <el-button @click="handleSearch" type="primary" icon="el-icon-search" size="small">查询</el-button>
          <el-button @click="handleReset" type="primary" icon="el-icon-refresh" size="small">重置</el-button>
        </div>
      </div>
      <el-form ref="form" label-width="80px" :model="tempAll">
        <el-row>
          <el-col :span="6">
            <el-form-item label="经营主体">
              <!-- <el-input v-model="tempAll.manageSubName" size="mini"></el-input> -->
              <management-subject @childevent="childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门">
              <!-- <el-input v-model="tempAll.bizOrgName" size="mini"></el-input> -->
              <department-select @childevent="childEventHandlerDepartment" :querySelect="tempAll.bizOrgName"></department-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购类型">
              <el-select size="mini" clearable v-model="tempAll.poGrType" placeholder="请选择">
                <el-option v-for="item in purchasTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="币别">
              <!-- <el-input v-model="tempAll.currencyName" size="mini"></el-input> -->
              <currency-select @childevent="childEventHandleCurrency" :selectName="tempAll.currencyName"></currency-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="供应商" prop="supplierName">
              <!-- <el-input v-model="tempAll.supplierName" size="mini"></el-input> -->
              <supplier @getData="childEventHandleSupplier" :selectName="tempAll.supplierName"></supplier>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货单号">
              <el-input v-model="tempAll.poGrNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入库仓库">
              <!-- <el-input v-model="tempAll.warehouseName" size="mini"></el-input> -->
              <warehouse-select @childevent="childEventHandlerWarehouse" :querySelect="tempAll.warehouseName">
              </warehouse-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="修改日期">
              <!--  <el-date-picker size="mini" v-model="tempAll.updatedTime" type="date" placeholder="选择日期">
              </el-date-picker> -->
              <el-date-picker :editable="false" size="mini" v-model="tempAll.updatedTime" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="移动类型" prop="operationType">
              <el-select size="mini" v-model="tempAll.operationType" placeholder="请选择">
                <el-option v-for="item in movementTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购合同号">
              <el-input v-model="tempAll.poContractNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提单号">
              <el-input v-model="tempAll.lbNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="修改人">
              <el-input v-model="tempAll.updatedBy" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="凭证日期">
              <el-date-picker :editable="false" size="mini" v-model="tempAll.certificatesDate" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-date-picker :editable="false" size="mini" v-model="tempAll.createdTime" type="datetimerange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="过账时间">
              <el-date-picker :editable="false" size="mini" v-model="tempAll.postDate" type="datetimerange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- 暂收/到货状态 -->
            <el-form-item label="到货状态">
              <!-- <el-input v-model="tempAll.postStatus" size="mini"></el-input> -->
              <el-select size="mini" v-model="tempAll.poGrStatus" placeholder="请选择类型">
                <el-option v-for="item in purchaseReceiptStatusOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="OA审核标题">
              <el-input v-model="tempAll.auitTitle" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人">
              <el-input v-model="tempAll.createdBy" size="mini"></el-input>
            </el-form-item>
          </el-col>
          </el-col>
          <el-col :span="6">
            <el-form-item label="过账人">
              <el-input v-model="tempAll.postPersonName" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="warning" size="mini" @click="establish">创建</el-button>
      <el-button type="warning" size="mini" @click="handleEdit" :disabled="isCanModify">修改</el-button>
      <el-button type="warning" size="mini" @click="handlePost" :disabled="isCanPost">过账</el-button>
      <!-- 来自于计算属性的修改 -->
      <el-button type="warning" size="mini" @click="handleDelete" :disabled="isCanDelete || controlDelete">删除</el-button>
      <!-- <el-button type="warning" size="mini">查看</el-button> -->
      <!-- <el-button type="warning" size="mini">退货</el-button> -->
      <el-button type="warning" size="mini" @click="handleCancelPost" :disabled="isCanCancelPost|| controlCancelPost">冲销</el-button>
      <!-- <el-button type="warning" size="mini">进口收货单导入</el-buttosn>
      <el-button type="warning" size="mini">入库凭证过账</el-button>
      <el-button type="warning" size="mini">标内导入</el-button>
      <el-button type="warning" size="mini">导出</el-button>
      <el-button type="warning" size="mini">合约收货单导入</el-button>
      <el-button type="warning" size="mini">审批信息查询</el-button>
      <el-button type="warning" size="mini">模板下载</el-button> -->
    </div>
    <div class="commonTable">
      <common-table :data="list" highlight-current-row :maxHeight="400" :fit="true" ref="multipleTable" border @row-db-click="handleTableRowDblClick" :headers="headers" @selection-change="handleSelectionChange">
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text=='poGrType'">
            <span>{{list[scope.index].poGrType | parsepoGrType}}</span>
          </div>
          <div v-if="scope.text=='operationType'">
            <span>{{list[scope.index].operationType | parseOperationType}}</span>
          </div>
          <div v-if="scope.text=='certificatesDate'">
            <span>{{list[scope.index].certificatesDate | parseTime}}</span>
          </div>
          <div v-if="scope.text=='poGrStatus'">
            <span>{{list[scope.index].poGrStatus | parsePoGrStatus}}</span>
          </div>
          <div v-if="scope.text=='createdTime'">
            <span>{{list[scope.index].createdTime | parseDate}}</span>
          </div>
          <div v-if="scope.text=='updatedTime'">
            <span>{{list[scope.index].updatedTime | parseTime}}</span>
          </div>
          <div v-if="scope.text=='postDate'">
            <span>{{list[scope.index].postDate | parseDate}}</span>
          </div>
        </template>
        <!--  <template slot="default" slot-scope="scope">
            
          </template> -->
      </common-table>
      <!-- <el-table max-height="400" fit @selection-change="handleSelectionChange" @cell-click="handleCellClick" :data="list" style="width: 100%">
      
      </el-table> -->
    </div>
    <div class="pagination">
      <!--  /*pageInfo: {
        total: 0,
        pageSize: 5, //每页几条数据
        currentPage: 1, //第几页
        total: 0
      }*/ -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="确认过账？" :visible.sync="postDialogVisible" top="15%" width="20%">
        <el-radio-group v-model="postRadio">
          <el-radio label="1">通 过</el-radio>
          <el-radio label="0">驳 回</el-radio>
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
           <el-button @click="postDialogCancel">取 消</el-button>
           <el-button type="primary" @click="postDialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
import { getList, getDetailData, doCancelPost, doPost, doDelete } from '../../../api/purchase/purchas-receipt/index.js'
// import $ from 'jquery'
import { ENUMS } from '../../../assets/enums.js'

import DepartmentSelect from 'components/common-select/department-select.vue' //部门
import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
import currencySelect from '@/components/common-select/currency-select.vue' //币种
import supplier from '@/components/common-select/supplier.vue' //供应商
import WarehouseSelect from 'components/common-select/warehouse-select.vue' //仓库


import { getPurchasReceiptTempAllDataDefault } from '../../../util/getDefault.js'

const headers = [
  { type: 'selection', label: '行号', fixed: true },
  { prop: 'poGrNo', width: "180px", align: 'center', label: "收货单号" },
  { prop: 'poGrType', width: "140px", align: 'center', label: "采购类型", filter: 'poGrType' },
  { prop: 'operationType', width: "140px", align: 'center', label: "移动类型", filter: 'operationType' },
  { prop: 'certificatesDate', width: "140px", align: 'center', label: "凭证日期", filter: 'certificatesDate' },
  { prop: 'manageSubName', width: "140px", align: 'center', label: "经营主体" },
  { prop: 'bizOrgName', width: "120px", align: 'center', label: "部门" },
  { prop: 'supplierName', width: "120px", align: 'center', label: "供应商" },
  { prop: 'warehouseName', width: "120px", align: 'center', label: "入库仓库" },
  { prop: 'baseRate', width: "120px", align: 'center', label: "本位币汇率", digit: 8 },
  { prop: 'billNo', width: "120px", align: 'center', label: "提单号" },
  { prop: 'currencyName', width: "120px", align: 'center', label: "币别" },
  { prop: 'poGrStatus', width: "120px", align: 'center', label: "过账状态", filter: 'poGrStatus' },
  // { prop: 'shouldReceiveQty', width: "120px", align: 'center', label: "应收数量合计" },
  { prop: 'actReceiveAmt', width: "120px", align: 'center', label: "实收数量合计" },
  { prop: 'poOrginAmt', width: "160px", align: 'center', label: "原币收货金额合计", digit: 2 },
  { prop: 'poBaseAmt', width: "160px", align: 'center', label: "本币收货金额合计", digit: 2 },
  { prop: 'auitTitle', width: "120px", align: 'center', label: "OA审核标题" },
  { prop: 'createdBy', width: "120px", align: 'center', label: "创建人" },
  { prop: 'createdTime', width: "180px", align: 'center', label: "创建时间", filter: 'createdTime' },
  { prop: 'updatedBy', width: "120px", align: 'center', label: "修改人" },
  { prop: 'updatedTime', width: "120px", align: 'center', label: "修改日期", filter: 'updatedTime' },
  { prop: 'postPersonName', width: "120px", align: 'center', label: "过账人" },
  { prop: 'postDate', width: "120px", align: 'center', label: "过账时间", filter: 'postDate' },
]

const baseList = [{
  date: '2016-05-03',
  name: '王小虎',
  index: '0',
  address: '王府井'
}, {
  date: '2016-05-02',
  name: '王小虎',
  index: '1',
  address: '唐人街'
}];

export default {
  data() {
    return {

      controlPost: false,
      controlDelete: false,
      controlCancelPost: false,

      postDialogVisible: false,
      postRadio: "1",
      test: '',
      listTest: baseList,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tempAll: {

        //经营主体
        manageSubCode: '',
        manageSubName: '',
        manageSubId: '',

        // 部门
        bizOrgId: '',
        bizOrgCode: '',
        bizOrgName: '',

        //供应商
        supplierId: '',
        supplierCode: '',
        supplierName: '',

        poGrNo: '',

        poGrType: '',

        operationType: '', //移动类型

        // 采购合同号
        poContractNo: '',



        warehouseId: '',
        warehouseCode: '',
        warehouseName: '',


        certificatesDate: [],
        certificatesDateStart: '',
        certificatesDateEnd: '',

        // 提交号和id
        lbNo: '',
        lbId: '',

        // 币别
        currencyId: '',
        currencyCode: '',
        currencyName: '',

        postStatus: '',

        // OA审核标题
        auitTitle: '',

        createdTime: [],

        updatedTime: [],


        createdBy: '',

        updatedBy: '',

        postDate: [],

        // 过账人
        postPersonName: '',
        postPersonCode: '',
        postPersonId: ''

      },
      purchaseReceiptStatusOptions: ENUMS.array7030, //到货状态
      purchasTypeOptions: ENUMS.array7230,
      movementTypeOptions: ENUMS.array7405, //移动类型
      dataPickValue: '',
      headers: headers,
      list: [],
      value4: '',

      inputDiv: null,
      columnSpan: null,
      cell: null,

      pageInfo: {
        total: 0, //总数
        pageSize: 5, //每页几条数据
        currentPage: 1, //第几页
        pageCount: 0 //总页数
      },
      // 选中的row
      selectedRows: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  components: {
    DepartmentSelect,
    ManagementSubject,
    currencySelect,
    supplier,
    WarehouseSelect
  },
  methods: {
    // 删除
    handleDelete() {

      var vm = this;

      vm.controlDelete = true;
      this.$confirm('您确定要删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        var rows = vm.selectedRows;
        var result = [];
        for (var i = 0, len = rows.length; i < len; i++) {
          var o = {};
          o.poGrId = rows[i].poGrId;
          o.version = rows[i].version;
          result.push(o);
        }

        doDelete(result).then(res => {
          if (res.data.status == '1') {
            vm.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            vm.selectedRows = [];
            vm.getDataList();
            vm.controlDelete = false;
          } else {
            vm.controlDelete = false;
          }
        })

      }).catch(() => {
        vm.controlDelete = false;
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 过账按钮
    handlePost() {

      var vm = this;
      this.controlPost = true;
      this.$confirm('此操作将过账, 是否继续?', '过账提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        var rows = vm.selectedRows;
        var result = [];
        for (var i = 0, len = rows.length; i < len; i++) {
          var o = {};
          o.poGrId = rows[i].poGrId;
          o.version = rows[i].version;
          result.push(o);
        }

        doPost(result).then(res => {
          console.log(res);
          if (res.data.status == '1') {
            vm.$notify({
              title: '成功',
              message: '过账成功',
              type: 'success'
            });
            vm.controlPost = false;
            vm.getDataList();
          } else {
            vm.controlPost = false;
          }

        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消过账操作'
        });
      });
      /* if (this.selectedRows.length != 1) {
         this.$message({
           message: '最多选择一条明细！',
           type: 'warning'
         });
         return;
       }*/

      // this.postDialogVisible = true;

    },
    handleCancelPost() {
      var vm = this;

      vm.controlCancelPost = true;
      this.$confirm('此操作将冲销, 是否继续?', '冲销提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var rows = this.selectedRows;
        var result = [];
        for (var i = 0, len = rows.length; i < len; i++) {
          var o = {};
          o.poGrId = rows[i].poGrId;
          o.version = rows[i].version;
          result.push(o);
        }
        doCancelPost(result).then(res => {
          console.log(res);
          if (res.data.status == '1') {
            vm.$notify({
              title: '成功',
              message: '冲销成功',
              type: 'success'
            });
            vm.getDataList();

            vm.controlCancelPost = false;
          } else {
            vm.controlCancelPost = false;
          }

        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消冲销'
        });
      });


    },
    // 
    postDialogCancel() {
      this.postDialogVisible = false;
      this.postRadio = '1';
    },
    // 确定过账
    postDialogConfirm() {
      var vm = this;
      this.postDialogVisible = false;
      var radio = this.postRadio;
      // doCancelPost    doPost
      var rows = this.selectedRows;
      var result = [];
      for (var i = 0, len = rows.length; i < len; i++) {
        var o = {};
        o.poGrId = rows[i].poGrId;
        o.version = rows[i].version;
        result.push(o);
      }

      if (radio == '1') { //过账
        doPost(result).then(res => {
          console.log(res);
          if (res.data.status == '1') {
            vm.$notify({
              title: '成功',
              message: '过账成功',
              type: 'success'
            });
          }

        })
      } else if (radio == '0') {

      }
    },
    childEventHandlerWarehouse(val) {
      if (val) {
        this.tempAll.warehouseName = val.warehouseName;
        this.tempAll.warehouseCode = val.warehouseCode;
        this.tempAll.warehouseId = val.warehouseId;
      } else {
        this.tempAll.warehouseName = '';
        this.tempAll.warehouseCode = '';
        this.tempAll.warehouseId = '';
      }
    },

    childEventHandleSupplier(val) {
      if (val) {
        this.tempAll.supplierName = val.supplyName;
        this.tempAll.supplierCode = val.supplyCode;
        this.tempAll.supplierId = val.id;
      } else {
        this.tempAll.supplierName = '';
        this.tempAll.supplierCode = '';
        this.tempAll.supplierId = '';
      }
    },
    childEventHandleCurrency(val) {
      console.log(val);
      if (val) {
        this.tempAll.currencyName = val.currencyName;
        this.tempAll.currencyCode = val.currencyCode;
        this.tempAll.currencyId = val.currencyId;
      } else {
        this.tempAll.currencyName = '';
        this.tempAll.currencyCode = '';
        this.tempAll.currencyId = '';
      }
    },

    childEventHandlerMainInfo(val) {
      if (val) {
        this.tempAll.manageSubName = val.companyName;
        this.tempAll.manageSubCode = val.companyCode;
        this.tempAll.manageSubId = val.companyId;
      } else {
        this.tempAll.manageSubName = '';
        this.tempAll.manageSubCode = '';
        this.tempAll.manageSubId = '';
      }

    },
    childEventHandlerDepartment(val) {
      var _this = this;
      if (!val) {
        _this.tempAll.bizOrgCode = '';
        // _this.tempAll.bizOrgDesc = val.orgDesc;
        _this.tempAll.bizOrgId = '';
        _this.tempAll.bizOrgName = '';
        return;
      }

      _this.tempAll.bizOrgCode = val.orgCode;
      // _this.tempAll.bizOrgDesc = val.orgDesc;
      _this.tempAll.bizOrgId = val.orgId;
      _this.tempAll.bizOrgName = val.orgName;
    },
    departmentClearEvent() {
      tempAll.bizOrgCode = '';
      // tempAll.bizOrgDesc = val.orgDesc;
      tempAll.bizOrgId = '';
      tempAll.bizOrgName = '';
    },
    // 查询按钮事件
    handleSearch() {
      // 时间需要转换格式
      this.getDataList();
    },
    // 重置
    handleReset() {
      this.tempAll = getPurchasReceiptTempAllDataDefault();
    },
    handleInputBlur(e) {
      console.log(e.$el, 'xxxxx');
    },
    handleCellClick(row, column, cell) {

    },


    handleSelectionChange(row) {
      this.selectedRows = row;
      console.log("表格点击", row);
    },
    /*total: 0, //总数
        pageSize: 5, //每页几条数据
        currentPage: 1, //第几页
        pageCount: 0 //总页数*/
    //分页
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getDataList();
    },
    establish() {
      this.$store.dispatch('toggleCurrentView', {
        PurchaseReceipt: {
          view: 'add',
          // params: {test: 'tetstststststst'}
        }
      });
      // this.$router.push({ path: '/purchase/PurchaseReceipt/add' })
    },
    // 表格双击
    handleTableRowDblClick(row) {
      console.log(row);
      var vm = this;
      this.$store.dispatch('toggleCurrentView', {
        PurchaseReceipt: {
          view: 'look',
          params: { "id": row.poGrId }
          // params: { "id": '12345678976543' }
        }
      });


    },
    handleEdit() {
      var rows = this.selectedRows;
      if (rows.length != 1 || !rows) {
        this.$message({
          message: '请选择一条明细！',
          type: 'warning'
        });
        return;
      }

      // getDetailData
      this.$store.dispatch('toggleCurrentView', {
        PurchaseReceipt: {
          view: 'edit',
          params: { "id": rows[0].poGrId }
          // params: { "id": '12345678976543' }
        }
      });
      // this.$router.push({ path: '/purchase/PurchaseReceipt/edit', query:  })
    },
    // 获取列表数据
    getDataList() {

      // this.handleEdit();

      var vm = this;
      if (this.tempAll.certificatesDate) {
        if (this.tempAll.certificatesDate[0]) {
          this.tempAll.certificatesDateStart = this.tempAll.certificatesDate[0].parseTime('YYYY-MM-DD')
          this.tempAll.certificatesDateEnd = this.tempAll.certificatesDate[1].parseTime('YYYY-MM-DD')
        } else {
          this.tempAll.certificatesDateStart = '';
          this.tempAll.certificatesDateEnd = '';
        }
      } else {
        this.tempAll.certificatesDateStart = '';
        this.tempAll.certificatesDateEnd = '';
      }

      if (this.tempAll.createdTime) {
        if (this.tempAll.createdTime[0]) {
          this.tempAll.createdTimeStart = this.tempAll.createdTime[0].parseTime('YYYY-MM-DD HH:mm:ss')
          this.tempAll.createdTimeEnd = this.tempAll.createdTime[1].parseTime('YYYY-MM-DD HH:mm:ss')
        } else {
          this.tempAll.createdTimeStart = '';
          this.tempAll.createdTimeEnd = '';
        }
      } else {
        this.tempAll.createdTimeStart = '';
        this.tempAll.createdTimeEnd = '';
      }
      if (this.tempAll.updatedTime) {
        if (this.tempAll.updatedTime[0]) {
          this.tempAll.updateTimeStart = this.tempAll.updatedTime[0].parseTime('YYYY-MM-DD HH:mm:ss')
          this.tempAll.updateTimeEnd = this.tempAll.updatedTime[1].parseTime('YYYY-MM-DD HH:mm:ss')
        } else {
          this.tempAll.updateTimeStart = '';
          this.tempAll.updateTimeEnd = '';
        }
      } else {
        this.tempAll.updateTimeStart = '';
        this.tempAll.updateTimeEnd = '';
      }
      if (this.tempAll.postDate) {
        if (this.tempAll.postDate[0]) {
          this.tempAll.postDateStart = this.tempAll.postDate[0].parseTime('YYYY-MM-DD HH:mm:ss')
          this.tempAll.postDateEnd = this.tempAll.postDate[1].parseTime('YYYY-MM-DD HH:mm:ss')
        } else {
          this.tempAll.updateTimeStart = '';
          this.tempAll.updateTimeEnd = '';
        }
      } else {
        this.tempAll.updateTimeStart = '';
        this.tempAll.updateTimeEnd = '';
      }

      getList(vm.pageInfo, vm.tempAll).then(res => {
        console.log(res);
        var data = res.data.data;
        if (res.data.status == 1) {

        }
        /* total: 0, //总数
        pageSize: 5, //每页几条数据
        currentPage: 1, //第几页
        pageCount: 0 //总页数*/
        vm.pageInfo.total = data.items;
        vm.pageInfo.pageCount = data.pageCount;
        var dataList = data.datalist;

        console.log(dataList);
        vm.list = dataList;
      })
    }
  },
  activated() {
    this.getDataList();
  },
  computed: {
    isCanDelete: function() {
      if (this.selectedRows.length == 0) {
        return true;
      }
      var rows = this.selectedRows;
      var len = rows.length;
      var flag = false;
      for (var i = 0; i < len; i++) {
        if (rows[i].poGrStatus != '70300010') {
          flag = true; //不能删除
          break;
        }
      }
      if (flag) {
        return true;
      } else {
        return false
      }



    },
    // 修改
    isCanModify: function() {
      var rows = this.selectedRows;
      var len = rows.length;

      if (len != 1) {
        return true;
      }

      for (var i = 0; i < len; i++) {
        if (rows[i].poGrStatus != '70300010') {
          return true;
        }
      }

      return false;

    },
    isCanCancelPost: function() {
      if (this.selectedRows.length != 1) {
        return true;
      }
      // 已过账 
      if (this.selectedRows[0].poGrStatus != '70300020') {
        return true
      }

      return false;
    },
    isCanPost: function() {
      if (this.selectedRows.length != 1) {
        return true;
      }

      if (this.selectedRows[0].poGrStatus != '70300010') {
        return true;
      }


      return this.controlPost;
    }
  },
  created() {

  },
  mounted() {


  }
}

</script>
<style scoped>
.pagination {
  /*margin-top: 15px;*/
}

.btn {
  /*padding: 15px 0 10px 15px; */
}



.searchAndResetBtns {
  /*// border-bottom: 1px solid #ccc;*/
  /*padding-left: 15px;*/
}

.el-button+.el-button {
  /*margin-left: 3px;*/
  margin-bottom: 5px;
}

.commonTable {
  /*padding: 15px;*/
}

.el-date-editor--daterange.el-input__inner {
  /*width: 210px !important;*/
}

</style>
