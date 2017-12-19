<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="info" size="small" @click="handleCancel">取 消</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg">
        <el-tabs v-model="activeTabs"  @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="first" class="tabpane">
            <el-form ref="form" label-width="80px" :model="formData">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="系统单据号" prop="poRoNo">
                    <el-input v-model="formData.poRoNo" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="过账状态" prop="postStatus">
                    <el-select disabled v-model="formData.postStatus" placeholder="请选择" clearable size="mini">
                      <el-option v-for="(value,key) in postStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="采购收货单" prop="poGrNo">
                    <el-input v-model="formData.poGrNo" size="mini" disabled="disabled" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="退货类型" prop="roType">
                    <el-select disabled v-model="formData.roType" @change="selectRoType(formData)" clearable placeholder="请选择" size="mini">
                      <el-option  v-for="(value,key) in roType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>              </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="经营主体" >
                    <el-input v-model="formData.manageSubName" size="mini" disabled="disabled" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="供应商" >
                    <el-input v-model="formData.supplierName" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="仓库" >
                    <el-input v-model="formData.warehouseName" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="人民币汇率" >
                    <el-input v-model="formData.rateCurrency" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="采购类型" prop="roPoType">
                    <el-select v-model="formData.roPoType" disabled clearable placeholder="请选择" size="mini">
                      <el-option  v-for="(value,key) in roPoType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别" prop="currencyName">
                    <el-input disabled v-model="formData.currencyName" size="mini" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据日期" prop="billDate">
                    <el-date-picker disabled type="date" placeholder="选择日期" v-model="billDate"
                                    size="mini"></el-date-picker>              </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" prop="bizOrgName">
                    <el-input disabled v-model="formData.bizOrgName" size="mini" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="冲销原因" >
                    <el-input v-model="formData.rateCurrency" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="凭证信息" name="second" class="tabpane">
            <el-form ref="form" label-width="150px" :model="formData">
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="冲销/退货凭证标识" prop="credenIden">
                    <el-col :span="22">
                      <el-select style="width: 100%;"  v-model="formData.credenIden" placeholder="请选择" size="mini" disabled="disabled">
                        <el-option label="凭证未操作" value="shanghai"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="冲销/退货凭证编号" prop="credenNo">
                    <el-col :span="22">
                      <el-input v-model="formData.credenNo" size="mini" disabled="disabled" ></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="推送失败的原因" prop="failReason">
                    <el-col :span="22">
                      <el-input type="textarea" v-model="formData.failReason" size="mini" disabled="disabled" ></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="third" class="tabpane">
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
    </el-collapse-transition>
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"

    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'selectPackType'">
          <span>{{tableData[scope.index]['packType'] | packTypeTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'productDateFilter'">
          <span>{{tableData[scope.index]['productDate'] | productDateFilter}}</span>
        </div>
      </template>
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
      </template>
    </common-table>
    <!--分页-->

  </div>
</template>
<script type="text/javascript">
  import { doQueryCusAll } from '@/api/purchase/purchase-return/purchase-return.js'

  import router from '@/router'
  const ENUMS = {
    "roType": {//退货类型
      "73050005": "冲销",
      "73050010": "退货",
      "73050015": "换货"
    },
    "postStatus": { //过账状态//采购退货/冲销状态
      "70400010": "保存",
      "70400020": "已过账",
      "70400030": "已冲销"
    },
    "roPoType": { //采购类型
      "72300010": "国内采购",
      "72300020": "自营进口",
      "72300030": "代理进口"
    },
    "packType": {//包装方式
      "71350010": "编织袋",
      "71350020": "中性编织袋",
      "71350030": "纸箱",
      "71350040": "托盘",
      "71350050": "其他"
    },
    "credenIden": { //凭证标识
      "72400010": "凭证未操作",
      "72400020": "凭证未过账",
      "72400030": "凭证已过账"
    }
  }
  const headers = [
    {  type: 'selection', label: '序号',width:'55px',fixed:'left'},
    { type: 'index', label: '行号',width:'60px',align:'center'},
    { prop: 'poNo', label: '采购合同单据号', width:'150px',align:'center'},
    { prop: 'poContractNo', label: '采购合同号',width:'150px',align:'center'},
    { prop: 'poGrDtlRowNo', label: '采购收货单行号',width:'200px',align:'center'},
    { prop: 'goodsCode', label: '物料编号',align:'center'},
    { prop: 'goodsName', label: '物料名称',align:'center'},
    { prop: 'unitName', label: '单位',align:'center'},
    { prop: 'packType',template:'selectPackType', label: '包装方式', width: '120px',align:'center' , filter: true},
    { prop: 'retireQty', label: '实退数量',width: '120px' ,align:'center',required:true},
    { prop: 'qty', label: '件数',align:'center',required:true},
    { prop: 'settleQty', label: '结算数量' ,width: '120px',align:'center',required:true},
    { prop: 'lessQty', label: '可溢短数量',width:'100px',align:'center'},
    { prop: 'cabinetNo', label: '柜号',align:'center' },
    { prop: 'seriesNo', label: '批次',align:'center' ,required:true},
    { prop: 'supplierBatchNo', label: '供应商批号',width:'150px',align:'center' },
    { prop: 'productDate', label: '供方生产日期',dataType: 'Date',width:'180px',filter:'productDateFilter',align:'center' },
    { prop: 'contractQty', label: '合同数量',align:'center' },
    { prop: 'texRate', label: '税率',digit: '8',align:'center' },
    { prop: 'orginPriceTex', label: '原币单价(含税)',digit: '6',width:'150px' ,align:'center'},
    { prop: 'orginPrice', label: '原币单价(不含税)',digit: '6',width:'150px' ,align:'center'},
    { prop: 'orginAmtTex', label: '原币金额',digit: '2',align:'center' },
    { prop: 'orginAmt', label: '原币税前金额' ,digit: '2',width:'120px',align:'center'},
    { prop: 'orginTexAmt', label: '原币税额' ,width:'120px',align:'center'},
    { prop: 'basePriceTex', label: '本币单价(含税)',digit: '6',width:'150px',align:'center' },
    { prop: 'basePrice', label: '本币单价(不含税)',digit: '6',width:'150px',align:'center' },
    { prop: 'baseAmtTex', label: '本币金额',digit: '2',align:'center' },
    { prop: 'baseAmt', label: '本币税前金额' ,digit: '2',width:'120px',align:'center'},
    { prop: 'baseTexAmt', label: '本币税额' ,digit: '8',width:'120px',align:'center'},
    { prop: 'bizOrgCode', label: '采购部门编号',width:'120px',align:'center' },
    { prop: 'bizOrgName', label: '采购部门名称',width:'120px',align:'center' },
    { prop: 'remark', label: '备注',align:'center' },
  ];
  const baseList = [{
    goodsCode: '123',
    goodsName: '123',
    unitName: '市场部',
    retireQty: '2',
    operableQty: '过账状态',
  }];
  export default {
    data(){
      return {
        searchBarFlg:true,
        searchDataList:[],
        activeTabs: 'first',
        billDate:'',
        formData: {
          poRoNo: "",
          poNo: '',
          poGrNo: '',
          postStatus: '',
          manageSubCode: '',
          manageSubName: '',
          manageSubId: '',
          bizOrgCode: '',
          bizOrgName: '',
          bizOrgId: '',
          operationType: '',
          roPoType: '',
          currencyCode: '',
          billDate: '',
          supplierCode: '',
          supplierName: '',
          supplierId: '',
          rateCurrency: '',
          writeOffReason: '',
          credenIden: '',
          credenNo: '',
          failReason: '',
          createdBy: '',
          updatedBy: '',
          postPersonName: '',
          createdTime: '',
          updatedTime: '',
          postDate: '',
        },
        postStatus:ENUMS.postStatus,
        operationType:ENUMS.operationType,
        roType:ENUMS.roType,
        roPoType:ENUMS.roPoType,
        credenIden:ENUMS.credenIden,
        packType:ENUMS.packType,
        value4: '',
        value1: '',
        headers: headers,
        tableData: [],
        total:null,
        listQuery:{
          currentPage:1,
          pageSize:10,
        }
      }
    },
    methods: {
      getList() {
        let vm=this;
        let id = this.$store.getters.params.PurchaseReturn.poRoId;
        doQueryCusAll(id).then(res => {
          if(res.data.status === 1) {
            vm.formData=res.data.data.codPoRoVo;
            vm.formData.createdTime ?vm.formData.createdTime = vm.formData.createdTime.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.formData.updatedTime ?vm.formData.updatedTime = vm.formData.updatedTime.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.formData.postDate ? vm.formData.postDate = vm.formData.postDate.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.tableData=res.data.data.codPoRoDtlVo;
            vm.formData.roType = String(vm.formData.roType);
            vm.formData.postStatus = String(vm.formData.postStatus);
            vm.formData.rateCurrency = String(vm.formData.rateCurrency);
            vm.formData.roPoType = String(vm.formData.roPoType);
            vm.billDate = res.data.data.codPoRoVo.billDate;
            vm.total = res.data.data.items;
            vm.loading = false
          }
        })
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
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleCancel(){
        this.$store.dispatch('toggleCurrentView', {
          PurchaseReturn: {
            view: 'index'
          }
        });
      },
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleClick() {

      }
    },
    created(){
      this.getList()
    },
    activated: function(){
      this.getList()
      this.activeTabs = 'first';
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
      credenIdenTypeFilter(val) {
        return ENUMS.credenIden[val];
      },
      packTypeTypeFilter(val) {
        return ENUMS.packType[val];
      },
      productDateFilter(val){
        if (val && val != '') {
          return val.parseTime('YYYY-MM-DD')
        }else {
          return '';
        }
      },
    },
    watch:{
      billDate:function (val) {
        if(val){
          this.formData.billDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.billDate = "";
        }
      },
    },
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .btn{
    margin-bottom: 20px;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .tabpane{
    height: 125px;
  }
</style>
