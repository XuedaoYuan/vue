<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="info"  size="small"  @click.native="onClick">取 消</el-button>
      <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true">展 开</el-button>
      <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <div class="tab">
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg" class="top-from">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="first">
            <el-form  ref="formData" label-width="80px" :model="formData"
                      style="padding-bottom: 10px;"
            >
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="调整单编号" prop="nsNo">
                    <el-input v-model="formData.nsNo" disabled size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态" prop="nsStatus">
                    <el-select clearable v-model="formData.nsStatus" disabled placeholder="请选择" size="mini">
                      <el-option v-for="(value,key) in nsStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <management-subject disabled :querySelect="formData.manageSubName"></management-subject>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="部门" prop="bizOrgName">
                    <department-subject  disabled :querySelect="formData.bizOrgName"></department-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="仓库" prop="warehouseName">
                    <warehouse-subject  disabled :querySelect="formData.warehouseName"></warehouse-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="调整类型" prop="nsType">
                    <el-select clearable v-model="formData.nsType" disabled placeholder="请选择" size="mini">
                      <el-option v-for="(value,key) in nsType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col>
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" disabled size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="five">
            <el-form ref="form"  label-width="100px" :model="formData"
                     style="padding-bottom: 10px;"
            >
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-col :span="22">
                      <el-input v-model="formData.createdBy" disabled size="mini"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="修改人" prop="updatedBy">
                    <el-col :span="22">
                      <el-input v-model="formData.updatedBy" disabled size="mini"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="postPersonName">
                    <el-col :span="22">
                      <el-input v-model="formData.postPersonName" disabled size="mini"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-col :span="22">
                      <el-date-picker disabled v-model="formData.createdTime" :editable="false" type="datetime" size='mini' placeholder="选择日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-col :span="22">
                      <el-date-picker disabled v-model="formData.updatedTime" :editable="false" type="datetime" size='mini' placeholder="选择日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="postDate">
                    <el-col :span="22">
                      <el-date-picker disabled v-model="formData.postDate" :editable="false" type="datetime" size='mini' placeholder="选择日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-collapse-transition>
    <div class="table" style="margin-top: 20px;">
      <div class="commonTable" style="margin: 20px 0 20px 0;">
        <common-table
          :data="tableData"
          :maxHeight="300"
          :fit="true"
          :headers="header1"
          @cell-click="handleCellClick"
          @selection-change="handleSelectionChange"
        >
        </common-table>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import WarehouseSubject from '@/components/common-select/warehouse-select.vue'//仓库
  import {pickerOptions} from '@/util'
  import {
    doQueryCusAll
  } from '../../../api/inventory/inventory-adjustment/inventory-adjustment'
  const header1 = [
    { type: 'selection', width: '55px',fixed:'left'},
    {prop: 'nsDtlRowNo',width: '80px', align: 'center',label: '行号'},
    {prop: 'seriesNo',label: '批次号',align: 'center'},
    {prop: 'goodsCode', label: '物料编号',align: 'center'},
    {prop: 'goodsName', label: '物料名称',align: 'center'},
    {prop: 'nsStockQty', label: '库存调整数量',align: 'center',digit: '2'},
    {prop: 'unitName', label: '单位',align: 'center'},
    {prop: 'qty', label: '库存调整件数',align: 'center',digit: '2'},
    {prop: 'costPrice', label: '单位成本',align: 'center',digit: '2'},
    {prop: 'nsStockAmt', label: '成本金额',align: 'center',digit: '2'},
    {prop: 'remark', label: '备注',align: 'center', editable: true},
  ];

  export default {
    components: {
      ManagementSubject,DepartmentSubject,WarehouseSubject
    },
    props:{
      nsId:String
    },
    data(){
      return {
        //枚举
        nsStatus:ENUMS["7150"],//状态
        nsType:ENUMS["7355"],//调整类型


        searchBarFlg:true,
        pickerOptions: {
          shortcuts: pickerOptions
        },
        title: '',
        activeName: 'first',
        formData: {
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

          nsStatus: '',//状态
          nsNo:'',//调整单编号
          nsType: '',//调整类型
          remark:'',//备注

          createdBy: '',
          updatedBy: '',
          postPersonName: '',
          createdTime: '',
          updatedTime: '',
          postDate: '',
        },
        currentPage:2,
        header1: header1,
        tableData: [],
        selectchange:'',
        value4: ''
      }
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        this.listLoading = true;
        doQueryCusAll(this.nsId).then(res => {
          if (res.data.status === 1) {
            this.formData = res.data.data.codNsVO;
            this.tableData = res.data.data.codNsDtlVO;
            this.formData.nsStatus = this.formData.nsStatus.toString();//状态
            this.formData.nsType = this.formData.nsType.toString();//状态
            this.listLoading = false;
          }
        })
      },
      //取消
      onClick(){
        this.$store.dispatch('toggleCurrentView', {
          SalesInventory: {
            view: 'index'
          }
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCellClick(){

      },
      handleSelectionChange(val){
        var vm = this;
        vm.selectchange = val;
        console.log(vm.selectchange.length)
      },
    }
  }
</script>
<style>

</style>

