<template>
  <el-form ref="form" label-width="80px" :model="formData" style="padding: 10px 0 20px 0;">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="系统单据号" prop="alNo">
          <el-input v-model="formData.alNo" disabled size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="调拨单号" prop="alSheetNo">
          <el-input v-model="formData.alSheetNo" @input="fatherText" size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="调拨日期" prop="alDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.alDate"
                          style="width: 100%;" size="mini"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="调拨单状态" prop="alStatus">
          <!--<el-input v-model="tempAll.name" size="mini"></el-input>-->
          <el-select v-model="formData.alStatus" size="mini" clearable placeholder="请选择">
            <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!--<el-col :span="12">-->
        <el-col :span="6">
          <el-form-item label="经营主体" prop="manageSubName">
            <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="testObj.companyName"></management-subject>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门" prop="bizOrgName">
            <department-select  @childevent = "childEventHandlerDepartment" :querySelect="testObj.orgName"></department-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="调出仓库" prop="outWarehouseName">
          <warehouse-select  @childevent = "childEventHandlerWarehouse" :querySelect="testObj.warehouseName"></warehouse-select>
        </el-form-item>
      </el-col>
        <el-col :span="6">
        <el-form-item label="调入仓库" prop="inWarehouseName">
          <warehouse-select  @childevent = "childEventHandlerWarehouse1" :querySelect="testObj.warehouseName"></warehouse-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" disabled size="mini"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script type="text/javascript">
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
  import WarehouseSelect from '@/components/common-select/warehouse-select.vue' //仓库
  export default {
    props: {
      headData:Array
    },
    components: {
      ManagementSubject,DepartmentSelect,WarehouseSelect
    },
    data(){
      return {
        testObj: {
          companyName: "",
          orgName: '',
          warehouseName: '',
        },
        selectName: '', //供应商默认选中值
        selectNameforCurreny: '', //币种默认选中值
        selectNameforPort: '', //到达港口默认选中值
        formData: {
          poNo: "",//系统单据号
          alSheetNo: '',//调拨单号
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
          remark:''//备注
        } ,
        port:[{
          value:'0',
          label:'杭州'
        },{
          value:'1',
          label:'诸暨'
        }]
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$on('childMethod', function () {
          this.$emit('sonText',this.formData)
        })
      })
    },
    methods: {
      fatherText() {
        this.$emit('sonText','311817')
      },
      childEventHandlerDepartment(val) {
        console.log('childEventHandlerDepartment',val)
        if(val){
          this.formData.bizOrgName = val.orgName;
          this.formData.bizOrgId = val.orgId;
          this.formData.bizOrgCode = val.orgCode;
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
        }else {
          this.formData.manageSubCode = '';
          this.formData.manageSubId = '';
          this.formData.manageSubName = '';
        }
      },
      childEventHandlerWarehouse(val) {
        console.log('childEventHandlerWarehouse',val);
        if(val){
          this.formData.outWarehouseName = val.warehouseName;
          this.formData.outWarehouseId = val.warehouseId;
          this.formData.outWarehouseCode = val.warehouseCode;
        }else{
          this.formData.outWarehouseName = ''
          this.formData.outWarehouseId = ''
          this.formData.outWarehouseCode = ''
        }

      },
      childEventHandlerWarehouse1(val) {
        console.log('childEventHandlerWarehouse',val);
        if(val){
          this.formData.inWarehouseName = val.warehouseName;
          this.formData.inWarehouseId = val.warehouseId;
          this.formData.inWarehouseCode = val.warehouseCode;
        }else{
          this.formData.inWarehouseName = ''
          this.formData.inWarehouseId = ''
          this.formData.inWarehouseCode = ''
        }

      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
