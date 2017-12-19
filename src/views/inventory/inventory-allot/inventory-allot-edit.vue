<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <el-button type="primary" size="small" @click="onClickSave">保 存</el-button>
      <el-button type="info" size="small" @click="onClickCancel">取 消</el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="height:140px;">
        <el-tab-pane label="抬头数据" name="first">
          <el-form ref="saveForm" :rules="rules" label-width="80px" :model="formData" style="padding: 10px 0 20px 0;">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="alNo">
                  <el-input v-model="formData.alNo" disabled size="mini"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
              <!--<el-form-item label="调拨单号" prop="alSheetNo">-->
              <!--<el-input v-model="formData.alSheetNo"  size="mini"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="6">
                <el-form-item label="调拨日期" prop="alDate">
                  <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="alDate"
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
                  <management-subject disabled  @childevent = "childEventHandlerMainInfo" :querySelect="formData.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-select :transferSearch="transferSearchDepartment"  @childevent = "childEventHandlerDepartment" :disabled="isDepartment" :querySelect="formData.bizOrgName"></department-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调入仓库" prop="inWarehouseName">
                  <warehouse-select disabled  @childevent = "childEventHandlerWarehouse1" :querySelect="formData.inWarehouseName"></warehouse-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调出仓库" prop="outWarehouseName">
                  <!--<warehouse-select  @childevent = "childEventHandlerWarehouse" :querySelect="formData.outWarehouseName"></warehouse-select>-->
                  <warehouse-select disabled  @childevent = "childEventHandlerWarehouse" :querySelect="formData.outWarehouseName"></warehouse-select>
                  <!--调入仓库和调出仓库不能相同-->
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
          <!--<header-data ref="child" :headData="headData" @sonText="sonText"></header-data>-->
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="second">
          <el-form ref="form" label-width="110px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人" prop="createdBy">
                  <el-col :span="24">
                    <el-input v-model="formData.createdBy" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改人" prop="updatedBy">
                  <el-col :span="24">
                    <el-input v-model="formData.updatedBy" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账人" prop="postPersonName">
                  <el-col :span="24">
                    <el-input v-model="formData.postPersonName" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="createdTime">
                  <el-col :span="24">
                    <el-input
                      size="mini"
                      v-model="formData.createdTime"
                      :disabled="true">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间" prop="updatedTime">
                  <el-col :span="24">
                    <el-input
                      v-model="formData.updatedTime"
                      size="mini"
                      :disabled="true">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账时间" prop="postDate">
                  <el-col :span="24">
                    <el-input
                      v-model="formData.postDate"
                      size="mini"
                      :disabled="true">
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--<system-information></system-information>-->
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="mini" :disabled ="!createdBtnStatus" @click = "onClickCreate">创 建</el-button>
      <el-button type="warning" size="mini" icon="el-icon-delete" @click="onClickDel" plain>删 除</el-button>
    </div>
    <div class="commonTable">
      <common-table
        :data="tableData"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot-scope="scope">
          <!--批次号弹框-->
          <div v-if="scope.text == 'seriesNo'">
            <series-select @childevent="childEventHandlerSeries" :querySelect="tableData[scope.index]['seriesNo']"></series-select>
          </div>
          <div v-if="scope.text == 'alQty'">
            <el-input v-number-only:10.abs="2" @blur="alQtyBlur(tableData[scope.index])" v-model="tableData[scope.index]['alQty']" size='mini'></el-input>
          </div>
          <div v-if="scope.text == 'qty'">
            <el-input v-number-only:10.abs="2" @blur="qtyBlur(tableData[scope.index])" v-model="tableData[scope.index]['qty']" size='mini'></el-input>
          </div>
          <div v-if="scope.text == 'costPrice'">
            <el-input v-model="tableData[scope.index]['costPrice']" size='mini'></el-input>
          </div>
          <div v-if="scope.text == 'costAmt'">
            <el-input v-model="tableData[scope.index]['costAmt']" size='mini'></el-input>
          </div>
        </template>
      </common-table>
    </div>

  </div>
</template>
<script type="text/javascript">
  import { doModify, doQueryWindow,doQueryModified } from '@/api/inventory/inventory-allot/inventory-allot.js'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
  import WarehouseSelect from '@/components/common-select/warehouse-select.vue' //仓库
  import SeriesSelect from 'components/common-select/series-select.vue' //批次号弹框

  const ENUMS = {
    "alStatus":{
      "71500005":"已保存",
      "71500010":"已过账"
    }
  };
  const headers = [
    { prop: 'checkbox', width: 100, type: 'selection'},
    { width: 60, type: 'index',label: '行号',align:'center'},
    { prop: 'seriesNo',template:'seriesNo', label: '批次',align:'center',required: true},
    { prop: 'goodsCode', label: '物料编号',align:'center',required: true },
    { prop: 'goodsName', label: '物料名称',align:'center',required: true },
    { prop: 'alQty',template:'alQty', label: '调拨数量',align:'center',required: true },
    { prop: 'unitName', label: '基本单位',align:'center',required: true },
    { prop: 'qty', label: '调拨件数',template:'qty',align:'center',required: true },
    { prop: 'costPrice', label: '成本单价',align:'center',digit: '2'},
    { prop: 'costAmt', label: '成本金额',align:'center',digit: '2'},
    { prop: 'remark', label: '备注',align:'center'},

  ];
  export default {
    components:{
      ManagementSubject,DepartmentSelect,WarehouseSelect,SeriesSelect
    },
    data(){
      return {
        index:null,
        isDepartment:true,//是否有公司
        transferSearchDepartment:{
          companyName:"",
          companyId:"",
          companyCode:"",
          boolToBtn:true,
        },
        rules:{
          alDate: [
            {required: true, message: ' ',trigger: 'change'}
          ],
          alStatus: [
            {required: true, message: ' ',trigger: 'change'}
          ],
          manageSubName: [
            {required: true, message: ' ',trigger: 'change'}
          ],
          bizOrgName: [
            {required: true, message: ' ',trigger: 'change'}
          ],
          outWarehouseName: [
            {required: true, message: ' ',trigger: 'change'}
          ],
          inWarehouseName: [
            {required: true, message: ' ',trigger: 'change'}
          ],
        },
        multipleSelection:[],
        tableData:[],
        activeName: 'first',
        listQuery:{
          pageSize:10,
          currentPage:1
        },
        alDate:undefined,
        outWarehouseName:'',
        inWarehouseName:'',
        formData: {
          poNo: "",//系统单据号
//          alSheetNo: '',//调拨单号
          alDate: '' ,//调拨日期
          alStatus: '71500005',//调拨状态
          manageSubCode:'',//经营主体code
          manageSubId:'',//经营主体id
          manageSubName:'',//经营主体name
          bizOrgId:'',//业务部门id
          bizOrgName:'',//业务部门name
          bizOrgCode:'',//业务部门code
          outWarehouseId:'',//仓库id
          outWarehouseName:'',//仓库name
          outWarehouseCode:'',//仓库code
          inWarehouseId:'',//仓库code
          inWarehouseName:'',//仓库code
          inWarehouseCode:'',//仓库code
          remark:'',//备注
          createdBy:'',//创建人
          createdTime:'',//创建时间
          updatedBy:'',//修改人
          updatedTime:'',//修改时间
          postPersonName:'',//过账人
          postDate:'',//过账时间
        } ,
        delList:[],
        alStatus:ENUMS.alStatus,
        total:null,
        headers: headers,
      }
    },
    created(){
      console.log('this.$store',this.$store)
//      console.log('this.$store.test',this.$store.getters.params.InventoryAllot.test)
      this.getList()
    },
    methods:{
      qtyBlur(val){
        if (val.qty) {
          val.qty = parseFloat(val.qty).toFixed(2)
        }else{
          val.qty = ''
        }
      },
      alQtyBlur(val){
        if (val.alQty) {
          val.alQty = parseFloat(val.alQty).toFixed(2)
        }else{
          val.alQty = ''
        }
      },
      getList() {
        doQueryModified(this.$store.getters.params.InventoryAllot.editId).then(response => {
          if(response.data.status == 1) {
            console.log('response.data.data',response.data.data)
            console.log('alDate',response.data.data.alDate)
            this.formData.alNo = response.data.data.alNo//系统单据号
            this.formData.alId = response.data.data.alId//系统单据号
              this.formData.alSheetNo = response.data.data.alSheetNo//调拨单号
              this.alDate = response.data.data.alDate//调拨日期
              this.formData.alStatus = String(response.data.data.alStatus)//调拨状态
              this.formData.manageSubCode = response.data.data.manageSubCode//经营主体code
              this.formData.manageSubId = response.data.data.manageSubId//经营主体id
              this.formData.manageSubName = response.data.data.manageSubName//经营主体name
              this.formData.bizOrgId = response.data.data.bizOrgId//业务部门id
              this.formData.bizOrgName = response.data.data.bizOrgName//业务部门name
              this.formData.bizOrgCode = response.data.data.bizOrgCode//业务部门code
              this.formData.outWarehouseId = response.data.data.outWarehouseId//仓库id
              this.formData.outWarehouseName = response.data.data.outWarehouseName//仓库name
              this.formData.outWarehouseCode = response.data.data.outWarehouseCode//仓库code
              this.formData.inWarehouseId = response.data.data.inWarehouseId//仓库code
              this.formData.inWarehouseName = response.data.data.inWarehouseName//仓库code
              this.formData.inWarehouseCode = response.data.data.inWarehouseCode//仓库code
              this.formData.remark = response.data.data.remark//备注
              this.formData.createdBy = response.data.data.createdBy//创建人
              this.formData.createdTime = response.data.data.createdTime//创建时间
              this.formData.updatedBy = response.data.data.updatedBy//修改人
              this.formData.updatedTime = response.data.data.updatedTime//修改时间
              this.formData.postPersonName = response.data.data.postPersonName//过账人
              this.formData.postDate = response.data.data.postDate//过账时间
              this.formData.version = response.data.data.version//版本号
            this.formData.createdTime ?this.formData.createdTime = this.formData.createdTime.parseTime('YYYY-MM-DD HH:MM:SS'):''
            console.log('createdTime1',response.data.data.createdTime)
            console.log('createdTime',this.formData.createdTime)
            this.formData.updatedTime ?this.formData.updatedTime = this.formData.updatedTime.parseTime('YYYY-MM-DD HH:MM:SS'):''
            this.formData.postDate ? this.formData.postDate = this.formData.postDate.parseTime('YYYY-MM-DD HH:MM:SS'):''
              this.tableData = response.data.data.codAlDtlCusList
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCellClick(row, column, cell) {
        this.index = row.$index;
      },
      handleSelectionChange(row){
        this.multipleSelection = row;
        console.log("表格点击",row)
      },
      //分页
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      onClickCancel() {
//        this.$router.push({ params:{ type: 'list'}})
        this.$store.dispatch('toggleCurrentView',{
          InventoryAllot: {
            view: 'index'
          }
        })
      },
      onClickCreate() {
        if (!this.formData.manageSubId) {
          this.$message({
            message: '请选择经营主体',
            type: 'warning'
          });
          return;
        }
        if (!this.formData.bizOrgId) {
          this.$message({
            message: '请选择部门',
            type: 'warning'
          });
          return;
        }
        if (!this.formData.inWarehouseId) {
          this.$message({
            message: '请选择调入仓库',
            type: 'warning'
          });
          return;
        }
        if (!this.formData.outWarehouseId) {
          this.$message({
            message: '请选择调出仓库',
            type: 'warning'
          });
          return;
        }
        this.tableData.push({
          'goodsCode': '',
          'goodsId': '',
          'goodsName': '',
          'seriesNo':'',
          'alQty': '',
          'unitName':'',
          'unitCode':'',
          'unitId':'',
          'costPrice':'',
          'costAmt':'',
          'remark':'',
        })
      },
      onClickDel() {
        this.$confirm('您确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.multipleSelection.forEach((o,i)=>{
            let idx = this.tableData.findIndex((val)=>val == o)
            if(idx>-1){
              this.delList.push(this.tableData[idx].alDtlId)
              this.tableData.splice(idx, 1);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      onClickSave() {
        let vm = this
        vm.tableData.map((x)=>{
          delete x.$index;
        });
        vm.$refs['saveForm'].validate((valid) => {
          console.log('valid',valid)
          if (valid) {
            eventBus.$emit('validateTable', {
              data: vm.tableData,    //表示表格数据
              headers: vm.headers,   //表示表头数据
              success: (valid)=>{   //成功回掉
                if (valid) {
                  //校验通过后，代码书写处
                  if(vm.formData && vm.tableData){
                    doModify(vm.formData,vm.tableData,vm.delList,vm.listQuery).then(response => {
                      if (response.data.status == 1) {
                        vm.$notify({
                          title: '成功',
                          message: '保存成功!',
                          type: 'success',
                          duration: 2000
                        });
                        vm.$store.dispatch('toggleCurrentView', {
                          InventoryAllot: {
                            view: 'index',
                          }
                        });
                      }
                    })
                  }else{
                    this.$message({
                      type:'warning',
                      message:"请创建明细"
                    })
                  }
                  }
                }
            })
          }else{
            this.$message({
              type:'warning',
              message:"请完善必填字段"
            })
          }
        });
      },
      childEventHandlerDepartment(val) {
        console.log('childEventHandlerDepartment',val)
        if(val){
          this.formData.bizOrgName = val.orgName;
          this.formData.bizOrgId = val.orgId;
          this.formData.bizOrgCode = val.orgCode;
          this.$refs['saveForm'].validateField('bizOrgName');
        }else {
          this.formData.bizOrgName = '';
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';
        }
      },
      childEventHandlerMainInfo(val) {
        console.log('childEventHandlerMainInfo',val)
        if(val){
          this.formData.manageSubCode = val.companyCode;
          this.formData.manageSubId = val.companyId;
          this.formData.manageSubName = val.companyName;
          this.isDepartment = false;
          this.transferSearchDepartment.companyName = val.companyName;
          this.transferSearchDepartment.companyId = val.companyId;
          this.transferSearchDepartment.companyCode = val.companyCode;
          this.$refs['saveForm'].validateField('manageSubName');
        }else {
          this.formData.manageSubCode = '';
          this.formData.manageSubId = '';
          this.formData.manageSubName = '';
          this.isDepartment = true;
          this.transferSearchDepartment.companyName = '';
          this.transferSearchDepartment.companyId = '';
          this.transferSearchDepartment.companyCode = '';
        }
      },
      childEventHandlerWarehouse(val) {
        console.log('childEventlHanderWarehouse',val);
        if(val){
          this.outWarehouseName = val.warehouseName;
          this.formData.outWarehouseId = val.warehouseId;
          this.formData.outWarehouseCode = val.warehouseCode;
        }else{
          this.outWarehouseName = '';
          this.formData.outWarehouseId = '';
          this.formData.outWarehouseCode = '';
        }

      },
      childEventHandlerWarehouse1(val) {
        console.log('childEventHandlerWarehouse1',val);
        if(val){
          this.inWarehouseName = val.warehouseName;
          this.formData.inWarehouseId = val.warehouseId;
          this.formData.inWarehouseCode = val.warehouseCode;
        }else{
          this.inWarehouseName = '';
          this.formData.inWarehouseId = '';
          this.formData.inWarehouseCode = '';
        }
      },
      childEventHandlerSeries(val) {
        console.log('childEventHandlerSeries',val);
        if(val){
          this.tableData[this.index].seriesId = val.seriesId;
          this.tableData[this.index].seriesNo = val.seriesNo;
          this.tableData[this.index].alQty = val.stockQty;
          this.tableData[this.index].goodsName = val.goodsName;
          this.tableData[this.index].goodsCode = val.goodsCode;
          this.tableData[this.index].goodsId = val.goodsId;
          this.tableData[this.index].unitName = val.unitName;
          this.tableData[this.index].unitCode = val.unitCode;
          this.tableData[this.index].unitId = val.unitId;
          this.tableData[this.index].qty = val.qty;
          this.tableData[this.index].remark = val.remark;
        }else{
          this.tableData[this.index].seriesId = '';
          this.tableData[this.index].seriesNo = '';
          this.tableData[this.index].alQty = '';
          this.tableData[this.index].goodsName = '';
          this.tableData[this.index].goodsCode = '';
          this.tableData[this.index].goodsId = '';
          this.tableData[this.index].unitName = '';
          this.tableData[this.index].unitCode = '';
          this.tableData[this.index].unitId = '';
          this.tableData[this.index].qty = '';
          this.tableData[this.index].remark = ''
        }
      }
    },
    computed: {
      createdBtnStatus(){
        if(this.alDate&&this.formData.bizOrgName&&this.formData.inWarehouseName&&this.formData.outWarehouseName&&this.formData.manageSubName){
          return true
        }else{
//          console.log('this.alDate',this.alDate)
//          console.log('this.formData.bizOrgName',this.formData.bizOrgName)
//          console.log('this.formData.inWarehouseName',this.formData.inWarehouseName)
//          console.log('this.formData.outWarehouseName',this.formData.outWarehouseName)
//          console.log('this.formData.manageSubName',this.formData.manageSubName)
          return false
        }
      }

    },
    watch: {
      outWarehouseName: function (val) {
        if (val) {
          if (val == this.formData.inWarehouseName) {
            this.$notify({
              title: '警告',
              message: '调出仓库不能与调入仓库相同',
              type: 'error'
            });
            this.outWarehouseName='';
            this.formData.outWarehouseName = '';
            this.formData.outWarehouseId = '';
            this.formData.outWarehouseCode = '';
          } else {
            this.formData.outWarehouseName = this.outWarehouseName
            this.$refs['saveForm'].validateField('outWarehouseName');

          }
        }
      },
      inWarehouseName: function (val) {
        if (val) {
          if (val == this.formData.outWarehouseName) {
            this.$notify({
              title: '警告',
              message: '调出仓库不能与调入仓库相同',
              type: 'error'
            });
            this.inWarehouseName='';
            this.formData.inWarehouseName = '';
            this.formData.inWarehouseId = '';
            this.formData.inWarehouseCode = '';
          } else {
            this.formData.inWarehouseName = this.inWarehouseName
            this.$refs['saveForm'].validateField('inWarehouseName');

          }
        }
      },
      alDate:function (val) {
        if(val){
          this.formData.alDate = val.parseTime ('YYYY-MM-DD');
          console.log('alDate',this.formData.alDate)
        }else {
          this.formData.alDate = "";
        }
      }

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
