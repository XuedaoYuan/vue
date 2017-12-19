<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <el-button type="info" size="small" @click.native="onClickCancel">取 消</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="height:140px;">
        <el-tab-pane label="抬头数据" name="first">
          <el-form ref="form" label-width="80px" :model="formData" style="padding: 10px 0 20px 0;">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="alNo">
                  <el-input v-model="formData.alNo" disabled size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调拨日期" prop="alDate">
                  <el-date-picker disabled type="date" placeholder="选择日期" v-model="formData.alDate"
                                  style="width: 100%;" size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调拨单状态" prop="alStatus">
                  <el-select disabled v-model="formData.alStatus" size="mini" clearable placeholder="请选择">
                    <el-option v-for="(value,key) in alStatus" :key="key" :label="value" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <el-input disabled size="mini" v-model="formData.manageSubName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <el-input disabled size="mini" v-model="formData.bizOrgName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调出仓库" prop="outWarehouseName">
                    <el-input disabled size="mini" v-model="formData.outWarehouseName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调入仓库" prop="inWarehouseName">
                  <el-input disabled size="mini" v-model="formData.inWarehouseName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="formData.remark" disabled size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="second">
          <el-form ref="form" label-width="100px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人" prop="createdBy">
                  <el-col :span="22">
                    <el-input v-model="formData.createdBy" size="mini" disabled="disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改人" prop="updatedBy">
                  <el-col :span="22">
                    <el-input v-model="formData.updatedBy" size="mini" disabled="disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账人" prop="postPersonName">
                  <el-col :span="22">
                    <el-input v-model="formData.postPersonName" size="mini" disabled="disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="createdTime">
                  <el-col :span="22">
                    <el-input v-model="formData.createdTime" size="mini" disabled="disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间" prop="updatedTime">
                  <el-col :span="22">
                    <el-input v-model="formData.updatedTime" size="mini" disabled="disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账时间" prop="postDate">
                  <el-col :span="22">
                    <el-input v-model="formData.postDate" size="mini" disabled="disabled"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--<div style="margin-top:12px;margin-bottom:6px">-->
      <!--<el-button type="warning" disabled size="mini" icon="el-icon-delete" @click="onClickDel" plain>删 除</el-button>-->
    <!--</div>-->
    <div class="commonTable">
      <common-table
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot-scope="scope">
          <div v-if="scope.text == 'select'">
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
    </div>
  </div>
</template>
<script type="text/javascript">
  import { doQueryModified } from '@/api/inventory/inventory-allot/inventory-allot.js'
  const ENUMS = {
    "alStatus":{
      "71500005":"已保存",
      "71500010":"已过账"
    }
  };

  const headers = [
    { prop: 'checkbox', width: 100, type: 'selection'},
    { width: 60, type: 'index',label: '行号',align:'center'},
    { prop: 'goodsCode', label: '物料编号',align:'center',required: true },
    { prop: 'goodsName', label: '物料名称',align:'center',required: true },
    { prop: 'seriesNo',label: '批次',align:'center',required: true},
    { prop: 'alQty', label: '调拨数量',align:'center',required: true },
    { prop: 'unitName', label: '基本单位',align:'center',required: true },
    { prop: 'costPrice', label: '成本单价',align:'center',digit: '2'},
    { prop: 'costAmt', label: '成本金额',align:'center',digit: '2'},

  ];
  export default {
    data(){
      return {
        tableData:[],
        formData: {
          alNo:"",
          poNo: "",//系统单据号
          alDate: '',//调拨日期
          alStatus: '',//调拨状态
          manageSubCode:'',//经营主体code
          manageSubId:'',//经营主体id
          manageSubName:'',//经营主体name
          bizOrgId:'',//业务部门id
          bizOrgName:'',//业务部门name
          bizOrgCode:'',//业务部门code
          outWarehouseId:'',//仓库id
          outwarehouseName:'',//仓库name
          outwarehouseCode:'',//仓库code
          inWarehouseId:'',//仓库code
          inWarehouseName:'',//仓库code
          inWarehouseCode:'',//仓库code
          remark:'',//备注
          createdBy:'',
          updatedBy:'',
          postPersonName:'',
          createdTime:'',
          updatedTime:'',
          postDate:'',
        },
        selectList:[],
        activeName: 'first',
        listQuery:{
          pageSize:10,
          currentPage:1
        },
        alStatus:ENUMS.alStatus,
        total:null,
        headers: headers,
        list: []
      }
    },
    methods:{
      getList() {
        let vm=this;
        doQueryModified(vm.$store.getters.params.InventoryAllot.alId,vm.listQuery).then(res => {
          if(res.data.status === 1) {
              vm.formData.alNo=res.data.data.alNo,
              vm.formData.poNo=res.data.data.poNo,//系统单据号
                vm.formData.alId = res.data.data.alId,//系统单据号
                vm.alDate=res.data.data.alDate,//调拨日期
              vm.formData.alStatus=String(res.data.data.alStatus),//调拨状态
              vm.formData.manageSubCode=res.data.data.manageSubCode,//经营主体code
              vm.formData.manageSubId=res.data.data.manageSubId,//经营主体id
              vm.formData.manageSubName=res.data.data.manageSubName,//经营主体name
              vm.formData.bizOrgId=res.data.data.bizOrgId,//业务部门id
              vm.formData.bizOrgName=res.data.data.bizOrgName,//业务部门name
              vm.formData.bizOrgCode=res.data.data.bizOrgCode,//业务部门code
              vm.formData.outWarehouseId=res.data.data.outWarehouseId,//仓库id
              vm.formData.outWarehouseName=res.data.data.outWarehouseName,//仓库name
              vm.formData.outWarehouseCode=res.data.data.outWarehouseCode,//仓库code
              vm.formData.inWarehouseId=res.data.data.inWarehouseId,//仓库code
              vm.formData.inWarehouseName=res.data.data.inWarehouseName,//仓库code
              vm.formData.inWarehouseCode=res.data.data.inWarehouseCode,//仓库code
              vm.formData.remark=res.data.data.remark//备注;
              vm.formData.createdBy=res.data.data.createdBy//备注;
              vm.formData.updatedBy=res.data.data.updatedBy//备注;
              vm.formData.postPersonName=res.data.data.postPersonName//备注;
              vm.formData.createdTime=res.data.data.createdTime//备注;
              vm.formData.updatedTime=res.data.data.updatedTime//备注;
              vm.formData.postDate=res.data.data.postDate//备注;
            vm.formData.createdTime ?vm.formData.createdTime = vm.formData.createdTime.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.formData.updatedTime ?vm.formData.updatedTime = vm.formData.updatedTime.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.formData.postDate ? vm.formData.postDate = vm.formData.postDate.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.list=res.data.data.codAlDtlCusList;
            vm.total = res.data.data.items;
            vm.loading = false
          }
        })

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
        this.selectList = row;
        console.log("表格点击",row)
      },
      //分页
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      onClickCancel() {
        this.$store.dispatch('toggleCurrentView', {
          InventoryAllot: {
            view: 'index',
          }
        });
      }
    },
    created(){
      console.log('this',this.$store)
      console.log('alId',this.$store.getters.params.InventoryAllot.alId)
      this.getList()
    },
    activated: function(){
      this.getList()
    },
    filter:{
      alStatusTypeFilter(val) {
        return ENUMS.alStatus[val];
      },
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
