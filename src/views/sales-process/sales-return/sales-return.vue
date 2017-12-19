<template>
  <div>
    <div style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" size="small" icon="el-icon-refresh" style="margin-left:10px" @click="handleReset">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="100px" :model="tempAll">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="经营主体">
                  <!-- <el-input v-model="tempAll.name" size="mini"></el-input> -->
                  <management-subject @childevent="childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门">
                  <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
                  <department-subject @childevent="bizOrgNameFill" :querySelect="tempAll.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <!--       <el-col :span="6">
                  <el-form-item label="订单类型">
                    <el-select  v-model="tempAll.orderType" placeholder="请选择" size="mini" clearable>
                      <el-option v-for="(value,key) in orderType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>-->
              <el-col :span="6">
                <el-form-item label="销退类型">
                  <el-select v-model="tempAll.pinBackType" placeholder="请选择" size="mini" clearable>
                    <el-option v-for="(value,key) in pinBackType" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="仓库">
                  <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
                  <warehouse-subject @childevent="warehouseNameFill" :querySelect="tempAll.warehouseName"></warehouse-subject>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="客户">
                  <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
                  <customer-select @childevent="childEventHandlerCustomer" :querySelect="tempAll.customerName"></customer-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售退货单号">
                  <el-input v-model="tempAll.soRoNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售类型">
                  <el-select v-model="tempAll.orderType" placeholder="请选择" size="mini" clearable>
                    <el-option v-for="(value,key) in orderType" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售合同外部编号">
                  <el-input v-model="tempAll.soContractNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="币别">
                  <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
                  <currency-Subject @childevent="currencyNameFill" :querySelect="tempAll.currencyCode"></currency-Subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售退货单状态">
                  <el-select v-model="tempAll.soRoStatus" placeholder="请选择" size="mini" clearable>
                    <el-option v-for="(value,key) in soRoStatus" :key="key" :label="value" :value="key" :disabled="value!='71050010'"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改日期">
                  <el-date-picker size="mini" v-model="tempAll.updatedTime" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改人">
                  <el-input v-model="tempAll.updatedBy" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="创建日期">
                  <el-date-picker size="mini" v-model="tempAll.createdTime" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人">
                  <el-input v-model="tempAll.createdBy" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账日期">
                  <el-date-picker size="mini" v-model="tempAll.postDate" type="daterange" align="right" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账人">
                  <el-input v-model="tempAll.postPersonName" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click="handleCreateNew">创建</el-button>
      <el-button type="warning" size="mini" :disabled="editBtnStatus" @click="handleUpdateOld">修改</el-button>
      <!-- <el-button type="warning" size="mini">查看</el-button> -->
      <el-button type="warning" size="mini" :disabled="postBtnStatus" @click="Posting">过账</el-button>
      <el-button type="warning" size="mini" @click="WriteOff" :disabled="writeOffBtnStatus">冲销</el-button>
      <el-button type="warning" size="mini" :disabled="delBtnStatus" @click="deleteData">删除</el-button>
    </div>
    <div class="commonTable">
      <common-table :data="tableData" :maxHeight="300" :fit="true" :headers="header" @cell-click="handleCellClick" @selection-change="handleSelectionChange">
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'parseSoRoStatus'">
            <span>{{tableData[scope.index]['soRoStatus'] | parseSoRoStatus}}</span>
          </div>
          <div v-if="scope.text=='parsePinBackType'">
            <span>{{tableData[scope.index]['pinBackType'] | parsePinBackType}}</span>
          </div>
        </template>
      </common-table>
    </div>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 20, 30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import { pickerOptions } from '@/util'
import ManagementSubject from '@/components/common-select/management-subject.vue' //经营主体
import DepartmentSubject from '@/components/common-select/department-select.vue' //部门
import WarehouseSubject from '@/components/common-select/warehouse-select.vue' //仓库
import currencySubject from '@/components/common-select/currency-select.vue' //币别
import CustomerSelect from 'components/common-select/customer-select.vue' //客户
import {
  doQueryWithPage,
  doDeleteSoRo, //删除
  doPostSoRo, //过账
  doWriteOffSoRo //冲销
} from '../../../api/sales-process/sales-return/sales-return'

const header = [
  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'soRoNo', label: '销售退货单号', align: 'center', width: '120px' },
  { prop: 'orderType', label: '订单类型', align: 'center', width: '100px' },
  { prop: 'soOsNo', label: '销售出库单号', align: 'center', width: '100px' },
  { prop: 'soRoStatus', label: '销售退货单状态', align: 'center', width: '120px', filter: 'parseSoRoStatus' },
  { prop: 'manageSubName', label: '经营主体', align: 'center', width: '100px' },
  { prop: 'bizOrgName', label: '部门', align: 'center', width: '100px' },
  { prop: 'customerName', label: '客户', align: 'center', width: '100px' },
  { prop: 'pinBackType', label: '销退类型', align: 'center', width: '100px', filter: 'parsePinBackType' },
  { prop: 'warehouseName', label: '仓库', align: 'center', width: '100px' },
  { prop: 'soContractNo', label: '销售合同外部编号', align: 'center', width: '120px' },
  { prop: 'currencyName', label: '币别', align: 'center', width: '100px' },
  { prop: 'rateCurrency', label: '本位币汇率', align: 'center', width: '100px' },
  { prop: 'returnReason', label: '退货原因', align: 'center', width: '100px' },
  { prop: 'totalAmtTex', label: '总金额(含税)', align: 'center', width: '120px', digit: '2' },
  { prop: 'totalAmt', label: '总金额(无税)', align: 'center', width: '120px', digit: '2' },
  { prop: 'texAmt', label: '税额', align: 'center', width: '100px', digit: '2' },
  { prop: 'createdBy', label: '创建人', align: 'center', width: '100px' },
  { prop: 'createdTime', label: '创建日期', align: 'center', width: '100px', dataType: 'Date' },
  { prop: 'updatedBy', label: '修改人', align: 'center', width: '100px' },
  { prop: 'updatedTime', label: '修改日期', align: 'center', width: '100px', dataType: 'Date' },
  { prop: 'postPersonName', label: '过账人', align: 'center', width: '100px' },
  { prop: 'postDate', label: '过账日期', align: 'center', width: '100px', dataType: 'Date' },
];

export default {
  components: {
    ManagementSubject,
    DepartmentSubject,
    WarehouseSubject,
    CustomerSelect,
    currencySubject
  },
  data() {
    return {
      //枚举
      pinBackType: ENUMS["7290"], //销退类型
      orderType: ENUMS["7270"], //销售类型
      soRoStatus: ENUMS["7105"], //销售退货状态

      pickerOptions: {
        shortcuts: pickerOptions
      },
      searchBarFlg: true,
      tempAll: {
        //经营主体
        manageSubName: '',
        manageSubCode: '',
        manageSubId: '',
        //部门
        bizOrgName: '',
        bizOrgId: '',
        bizOrgCode: '',
        //仓库
        warehouseName: '',
        warehouseCode: '',
        warehouseId: '',
        //客户
        customerName: '',
        customerCode: '',
        customerId: '',
        //币别
        currencyName: '',
        currencyCode: '',
        currencyId: '',

        soRoNo: '', //销售退货单号
        pinBackType: '', //销退类型
        soContractNo: '', //销售合同外部编号
        orderType: '', //销售类型
        soRoStatus: '', //销售退货单状态
        createdBy: '', //创建人
        postPersonName: '', //过账人
        updatedBy: '', //修改人
        //创建时间
        createdTimeStart: '',
        createdTimeEnd: '',
        //过账时间
        postDateStart: '',
        postDateEnd: '',
        //修改日期
        updatedTimeStart: '',
        updatedTimeEnd: '',
      },
      createdTime: null, //创建时间
      updatedTime: null, //更新时间
      postDate: null, //过账时间

      header: header,
      multipleSelection: [],
      deleteRowId: [], //删除id
      //      editStatus: '',
      total: null,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
      },
      tableData: [],
    }
  },
  created() {

  },
  activated() {
    this.getList();
  },
  filters: {
    /*    "71050010": "保存",
    "71050020": "已过账",
    "71050030": "已冲销"*/

  },
  methods: {
    getList() {
      this.listLoading = true;
      let vm = this;
      doQueryWithPage(vm.listQuery, vm.tempAll).then(res => {
        if (res.data.status === 1) {
          this.tableData = res.data.data.datalist;
          this.total = res.data.data.items;
          this.listLoading = false;
        } else {
          this.listLoading = false;
        }
      })
    },
    //查询
    handleSearch() {
      this.getList();
    },
    //重置
    handleReset() {
      this.tempAll = {
        //经营主体
        manageSubName: '',
        manageSubCode: '',
        manageSubId: '',
        //部门
        bizOrgName: '',
        bizOrgId: '',
        bizOrgCode: '',
        //仓库
        warehouseName: '',
        warehouseCode: '',
        warehouseId: '',
        //客户
        customerName: '',
        customerCode: '',
        customerId: '',
        //币别
        currencyName: '',
        currencyCode: '',
        currencyId: '',

        orderType: '', //订单类型
        soRoNo: '', //销售退货单号
        pinBackType: '', //销退类型
        soContractNo: '', //销售合同外部编号
        orderType: '', //销售类型
        soRoStatus: '', //销售退货单状态

        createdBy: '', //创建人
        postPersonName: '', //过账人
        updatedBy: '', //修改人
      };
      this.createdTime = null; //创建时间
      this.updatedTime = null; //更新时间
      this.postDate = null; //过账时间
      this.getList();
    },
    //创建
    handleCreateNew() {
      //      this.$router.push({ path: '/salesProcess/salesReturn/add' })
      this.$store.dispatch('toggleCurrentView', {
        SalesReturn: {
          view: 'add'
          // params: 跳转过去的子组件的属性对象
        }
      });
    },
    //修改
    handleUpdateOld() {
      console.log(this.multipleSelection[0].soRoId)
      if (this.multipleSelection.length == 1) {
        //        router.push({ params: { type: 'edit'}, query:{SoRoId: this.multipleSelection[0].soRoId}})
        this.$store.dispatch('toggleCurrentView', {
          SalesReturn: {
            view: 'edit',
            params: {
              "SoRoId": this.multipleSelection[0].soRoId
            }
          }
        });
      }
    },
    // 删除按钮
    deleteData() {
      var vm = this;
      this.$confirm('您确定要删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var selectedList = this.multipleSelection;
        var len = selectedList.length;

        if (len > 0) {
          var deleteDatas = [];
          // [{"soRoId":"xxx","version":"xx"},{"soRoId":"xxx","version":"xx"}]
          for (var i = 0; i < len; i++) {
            var o = {};
            o.soRoId = selectedList[i].soRoId;
            o.version = selectedList[i].version;
            deleteDatas.push(o);
          }
          doDeleteSoRo(deleteDatas).then(res => {
            if (res.data.status == '1') {
              this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success'
              })

              vm.getList();
            }
          });


        } else {
          this.$message({
            message: '请选择一条或多条进行删除',
            type: 'warning'
          });
        }
      }).catch(() => {
        vm.$message({
          type: 'info',
          message: '已取消删除'
        });
      })


    },
    //过账
    Posting() {
      var selectedList = this.multipleSelection;
      var len = selectedList.length;
      if (len < 0) {
        this.$message({
          message: '请选择一条或多条进行过账',
          type: 'warning'
        });
        return;
      }

      this.$confirm('您确认要过账吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        var postDatas = [];
        // [{"soRoId":"xxx","version":"xx"},{"soRoId":"xxx","version":"xx"}]
        for (var i = 0; i < len; i++) {
          var o = {};
          o.soRoId = selectedList[i].soRoId;
          o.version = selectedList[i].version;
          postDatas.push(o);
        }
        doPostSoRo(postDatas).then(res => {
          if (res.data.status == '1') {
            this.$notify({
              title: '成功',
              message: '过账成功！',
              type: 'success'
            })
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    //冲销
    WriteOff() {
      var selectedList = this.multipleSelection;
      var len = selectedList.length;
      if (len < 0) {
        this.$message({
          message: '请选择一条或多条进行冲销',
          type: 'warning'
        });
        return;
      }

      this.$confirm('您确认要冲销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // doWriteOffSoRo

        var postDatas = [];
        // [{"soRoId":"xxx","version":"xx"},{"soRoId":"xxx","version":"xx"}]
        for (var i = 0; i < len; i++) {
          var o = {};
          o.soRoId = selectedList[i].soRoId;
          o.version = selectedList[i].version;
          postDatas.push(o);
        }

        doWriteOffSoRo(postDatas).then(res => {
          if (res.data.status == '1') {
            this.$notify({
              title: '成功',
              message: '冲销成功！',
              type: 'success'

            })
          }
        })


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 经营主体
    childEventHandlerMainInfo(val) {
      console.log(val)
      if (val) {
        this.tempAll.manageSubName = val.companyName;
        this.tempAll.manageSubId = val.companyId;
        this.tempAll.manageSubCode = val.companyCode;
      } else {
        this.tempAll.manageSubName = '';
        this.tempAll.manageSubId = '';
        this.tempAll.manageSubCode = '';
      }
    },
    //部门
    bizOrgNameFill(val) {
      console.log(val)
      if (val) {
        this.tempAll.bizOrgName = val.orgName;
        this.tempAll.bizOrgCode = val.orgTreeCode;
        this.tempAll.bizOrgId = val.orgId;
      } else {
        this.tempAll.bizOrgName = '';
        this.tempAll.bizOrgCode = '';
        this.tempAll.bizOrgId = '';
      }
    },
    //仓库
    warehouseNameFill(val) {
      console.log(val)
      if (val) {
        console.log(val)
        this.tempAll.warehouseName = val.warehouseName;
        this.tempAll.warehouseId = val.warehouseId;
        this.tempAll.warehouseCode = val.warehouseCode;
      } else {
        this.tempAll.warehouseName = '';
        this.tempAll.warehouseId = '';
        this.tempAll.warehouseCode = '';
      }
    },
    //币别
    currencyNameFill(val) {
      if (val) {
        console.log(val)
        this.tempAll.currencyId = val.currencyId;
        this.tempAll.currencyCode = val.currencyCode;
        this.tempAll.currencyName = val.currencyName;
      } else {
        this.tempAll.currencyId = '';
        this.tempAll.currencyCode = '';
        this.tempAll.currencyName = '';
      }
    },
    //客户
    childEventHandlerCustomer(val) {
      console.log(val);
      if (val) {
        this.tempAll.customerName = val.custName;
        this.tempAll.customerCode = val.custCode;
        //        this.tempAll.customerId = val.customerId;
      } else {
        this.tempAll.customerName = '';
        this.tempAll.customerCode = '';
        this.tempAll.customerId = '';
      }
    },
    //分页
    handleCellClick() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val;
      this.getList();
    },
  },
  watch: {
    createdTime: function(val) { //创建时间
      if (val && val[0] && val[1]) {
        this.formData.createdTimeStart = parseTime(val[0], '{y}-{m}-{d} 00:00:00');
        this.formData.createdTimeEnd = parseTime(val[1], '{y}-{m}-{d} 23:59:59');
      } else {
        this.formData.createdTimeStart = '';
        this.formData.createdTimeEnd = '';
      }
    },
    postDate: function(val) { //过账时间
      if (val && val[0] && val[1]) {
        this.formData.postDateStart = parseTime(val[0], '{y}-{m}-{d}');
        this.formData.postDateEnd = parseTime(val[1], '{y}-{m}-{d}');
      } else {
        this.formData.postDateStart = '';
        this.formData.postDateEnd = '';
      }
    },
    updatedTime: function(val) { //修改日期
      if (val && val[0] && val[1]) {
        this.formData.updatedTimeStart = parseTime(val[0], '{y}-{m}-{d}');
        this.formData.updatedTimeEnd = parseTime(val[1], '{y}-{m}-{d}');
      } else {
        this.formData.updatedTimeStart = '';
        this.formData.updatedTimeEnd = '';
      }
    },
  },
  computed: {
    editBtnStatus() { //修改按钮状态
      let status = false;
      if (this.multipleSelection.length != 1) {
        status = true;
      } else {
        console.log(this.multipleSelection[0].soRoStatus)
        if (this.multipleSelection[0].soRoStatus == '71050020' /*|| this.multipleSelection[0].soRoStatus == '71000030'*/ ) {
          status = true;
        }
      }
      return status;
    },
    delBtnStatus() { //删除按钮状态
      let status = false;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((val, idx) => {
          if (val.soRoStatus == '71050020') {
            status = true;
          }
        });
        return status;
      }
      return true;
    },
    postBtnStatus() { //过账按钮状态
      let status = false;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((val, idx) => {
          if (val.soRoStatus == '71050020') {
            status = true;
          }
        });
        return status;
      }
      return true;
    },
    writeOffBtnStatus() { //冲销按钮状态
      let status = false;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((val, idx) => {
          if (val.soRoStatus != '71050020') {
            status = true;
          }
        });
        return status;
      }
      return true;
    },

  },
}

</script>
