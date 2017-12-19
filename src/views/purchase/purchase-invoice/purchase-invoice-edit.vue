<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="primary" size="small" @click="handleSave">保 存</el-button>
      <el-button type="info" size="small" @click="handleCancel">取 消</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg">
        <el-tabs v-model="activeTabs"  @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="headerData" class="tabpane">
            <el-form ref="headerForm" label-width="80px" :model="formData" :rules="rules">
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-form-item label="系统单据号" prop="poInvoiceNo">
                    <el-input v-model="formData.poInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票类别" prop="poInvoiceType">
                    <el-select  v-model="formData.poInvoiceType" placeholder="请选择" size="mini" :disabled="editStatus" clearable collapse-tags>
                      <el-option v-for="(value,key) in poInvoiceType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票外部编号" prop="extInvoiceNo">
                    <el-input v-model="formData.extInvoiceNo" size="mini" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="状态" prop="invoiceStatus">
                    <el-select  v-model="formData.invoiceStatus" placeholder="请选择" size="mini" clearable disabled>
                      <el-option v-for="(value,key) in invoiceStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <management-subject  @childevent = "manageSubNameFill" :querySelect="formData.manageSubName" :disabled="editStatus"></management-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" prop="bizOrgName">
                    <department-subject  @childevent = "bizOrgNameFill" :querySelect="formData.bizOrgName" :transferSearch="transferSearchDepartment" :disabled="disabled"></department-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="供应商" prop="supplierName">
                    <supplier  @getData="supplierNameFill" :selectName="formData.supplierName" :transferSearch="transferSearchDepartment" :disabled="disabled"></supplier>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="凭证日期" prop="certificatesDate">
                    <el-date-picker type="date" placeholder="起始时间" v-model="certificatesDate"
                                    size="mini" ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-form-item label="币别" prop="currencyName">
                    <CurrencySelect  @childevent="currencyFill" :querySelect="formData.currencyName" :disabled="editStatus"></CurrencySelect>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="汇率(本位币)" prop="rateCurrency">
                    <el-input :value="formData.rateCurrency | EightDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票日期" prop="invoiceDate">
                    <el-date-picker type="date" placeholder="起始时间" v-model="invoiceDate"
                                    size="mini" ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注" prop="remark">
                    <el-input  v-model="formData.remark" size="mini" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-form-item label="" prop="isConfirm">
                    <el-checkbox v-model="isCancel" disabled>被取消</el-checkbox></el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="取消发票号" prop="newPpoInvoiceNo">
                    <el-input  v-model="newPpoInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="汇总信息" name="summarizeInfo" class="tabpane">
            <el-form ref="form" label-width="140px" :model="formData">
              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="原币总金额" prop="orginAmtTex">
                    <el-input :value="orginAmtTex | TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原币总金额(不含税)" prop="orginAmt">
                    <el-input :value="orginAmt| TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原币税额" prop="orginTexAmt">
                    <el-input :value="orginTexAmt| TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="本币总金额" prop="baseAmtTex">
                    <el-input :value="baseAmtTex| TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本币总金额(不含税)" prop="baseAmt">
                    <el-input :value="baseAmt| TwoDecimal" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本币税额" prop="baseTexAmt">
                    <el-input :value="baseTexAmt| TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="发票总数量" prop="invoiceQty">
                    <el-input :value="invoiceQty| TwoDecimal" size="mini"disabled ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="凭证信息" name="credentialInfo" class="tabpane">
            <el-form ref="form" label-width="90px" :model="formData">
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="凭证标识" prop="credenIden">
                    <el-select  v-model="formData.credenIden" placeholder="请选择" size="mini" disabled="disabled" clearable>
                      <el-option v-for="(value,key) in credenIden" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="凭证过账编号" prop="credenNo">
                    <el-input v-model="formData.credenNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="推送失败原因" prop="failReason">
                    <el-input type="textarea" v-model="formData.failReason" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="systemInfo" class="tabpane">
            <el-form ref="form" label-width="80px" :model="formData" style="padding-top:16px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-col :span="18">
                      <el-input v-model="formData.createdBy" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改人" prop="updatedBy">
                    <el-col :span="18">
                      <el-input v-model="formData.updatedBy" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="postPersonName">
                    <el-col :span="18">
                      <el-input v-model="formData.postPersonName" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-col :span="18">
                      <el-date-picker v-model="formData.createdTime" type="datetime" size="mini" :disabled="true"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-col :span="18">
                      <el-date-picker v-model="formData.updatedTime" type="datetime" size="mini" :disabled="true"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="postDate">
                    <el-col :span="18">
                      <el-date-picker v-model="formData.postDate" type="datetime" size="mini" :disabled="true"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-form>

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-collapse-transition>
    <div style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="mini" @click="handleAddNewCell" >创 建</el-button>
      <el-button type="warning" size="mini" @click="handleDeleteClick" plain icon="el-icon-delete">删 除</el-button>
    </div>
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @selection-change="handleSelectionChange"
      v-loading="listLoading"
    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'selectPackType'">
          <span>{{tableData[scope.index]['packType'] | packTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'inputIsGift'">
          <span>{{tableData[scope.index]['isGift'] | isGiftFilter}}</span>
        </div>
        <!--<div v-if="scope.text == 'receiveQty'">-->
          <!--<span>{{tableData[scope.index]['receiveQty'] | TwoDecimal}}</span>-->
        <!--</div>-->
        <!--<div v-if="scope.text == 'orginInvoiceAmt'">-->
          <!--<span>{{tableData[scope.index]['orginInvoiceAmt'] | TwoDecimal}}</span>-->
        <!--</div>-->
      </template>
      <template slot="default" slot-scope="scope">
        <div v-if="scope.text == 'inputIsGift'">
          <el-select v-model="tableData[scope.index]['isGift']" clearable placeholder="请选择" size='mini'>
            <el-option key="1" label="是" value="1"></el-option>
            <el-option key="0" label="否" value="0"></el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'selectPackType'">
          <el-select v-model="tableData[scope.index]['packType']" clearable placeholder="请选择" size='mini'>
            <el-option v-for="(value,key) in packType" :key="key" :label="value" :value="key"></el-option>
          </el-select>
        </div>
        <!-- 本次发票数量 -->
        <div v-if="scope.text == 'currentInvoiceQty'">
          <el-input v-number-only:10.abs="2" v-model.number="tableData[scope.index]['currentInvoiceQty']" @input="calcuteMoney(tableData[scope.index])" size='mini'></el-input>
        </div>
        <!-- 税率 -->
        <div v-if="scope.text == 'texRate'">
          <el-input v-number-only:10.abs="2" v-model.number="tableData[scope.index]['texRate']" @input="calcuteMoney(tableData[scope.index])" size='mini'></el-input>
        </div>
        <!-- 原币单价（含税） -->
        <div v-if="scope.text == 'orginInvoicePriceTex'">
          <el-input v-number-only:10.abs="6" v-model.number="tableData[scope.index]['orginInvoicePriceTex']" @input="calcuteMoney(tableData[scope.index])"  size='mini'></el-input>
        </div>
        <!-- 原币金额 -->
        <div v-if="scope.text == 'orginInvoiceAmtTex'">
          <el-input v-number-only:10.abs="2" v-model.number="tableData[scope.index]['orginInvoiceAmtTex']" @input="calcuteAmtMoney(tableData[scope.index])" size='mini'></el-input>
        </div>
      </template>
    </common-table>

    <ReceivingnoteDialog :choosedData="tableData" :receiveDialogStatus="receiveDialogStatus" :manageSubId="formData.manageSubId" :poInvoiceType="formData.poInvoiceType"  :bizOrgId="formData.bizOrgId" :currencyId="formData.currencyId" :supplierId="formData.supplierId" @fillRow="fillRow" @closeItem="closeReceiveDialog"></ReceivingnoteDialog>
  </div>
</template>
<script type="text/javascript">
  import router from '@/router'
  import NP from 'number-precision';
  import {doQueryPoInvoiceInfo,doUpdatePoInvoice,createPrompt } from 'api/purchase/purchase-invoice/purchase-invoice.js';
  import CurrencySelect from '@/components/common-select/currency-select.vue'//币种
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import Supplier from '@/components/common-select/supplier.vue'//供应商
  import ReceivingnoteDialog from './receivingnote-dialog.vue'//收货单
  import {calculateOrderDatail,amtTexBlur} from '@/util';

  const headers = [
    {  type: 'selection', label: '序号',fixed:'left'},
    { prop: 'poInvoiceRowNo', label: '行号',width:'60px',align:'center'},
    { prop: 'poDtlRowNo', label: '采购合同行号',width:'120px',align:'center'},
    { prop: 'poNo', label: '采购合同系统单据号',width:'160px',align:'center',required: true},
    { prop: 'poContractNo', label: '采购合同号',width:'160px',align:'center'},
    { prop: 'poGrNo', label: '收货单号', align:'center',required: true,width:'140px'},
    { prop: 'poGrDtlRowNo', label: '收货单行号',width:'110px', align:'center'},
    { prop: 'goodsCode', label: '物料编号', align:'center',width:'140px'},
    { prop: 'goodsName', label: '物料名称', align:'center',width:'140px'},
    { prop: 'packType', label: '包装方式', align:'center',width:'120px',filter:'selectPackType'},
    { prop: 'isGift', label: '是否赠品',align:'center',filter:'inputIsGift'},
    { prop: 'receiveQty', label: '收货数量',align:'center',digit: '2'},
    { prop: 'currentInvoiceQty', label: '本次发票数量',width:'120px',align:'center',digit: '2',template: 'currentInvoiceQty',required: true },
//    { prop: '', label: '税金科目',align:'center'},
    { prop: 'unitName', label: '单位',align:'center'},
    { prop: 'texRate', label: '税率',align:'center', digit: '2',width:'120px',template: 'texRate',required: true},
    { prop: 'orginInvoicePriceTex', label: '原币单价（含税）',width:'140px',align:'center', digit: '6',template: 'orginInvoicePriceTex',required: true},
    { prop: 'orginInvoicePrice', label: '原币单价（不含税）',width:'140px',align:'center', digit: '6'},
    { prop: 'orginInvoiceAmtTex', label: '原币金额',width:'120px',align:'center',digit: '2',template: 'orginInvoiceAmtTex',required: true},
    { prop: 'orginInvoiceAmt', label: '原币税前金额',width:'120px',align:'center',digit: '2'},
    { prop: 'orginTexAmt', label: '原币税额',align:'center',digit: '2'},
    { prop: 'baseInvoicePriceTex', label: '本币单价（含税）',width:'150px',align:'center',digit: '6'},
    { prop: 'baseInvoicePrice', label: '本币单价（不含税）',width:'140px',align:'center',digit: '6'},
    { prop: 'baseInvoiceAmtTex', label: '本币金额',width:'150px',align:'center',digit: '2'},
    { prop: 'baseInvoiceAmt', label: '本币税前金额',width:'110px',align:'center',digit: '2'},
    { prop: 'baseTexAmt', label: '本币税额',align:'center',digit: '2'},
    { prop: 'remark', label: '备注',align:'center',editable: true,width:'200px'}
  ];

  export default {
    components: {
      CurrencySelect,
      ManagementSubject,
      DepartmentSubject,
      Supplier,
      ReceivingnoteDialog
    },
    props:{
      poInvoiceId:String
    },
    data(){
      return {
        activeTabs: 'headerData',
        headers: headers,
        tableData: [],
        formData:{},
        deleteList:[],
        multipleSelection:[],
        packType:ENUMS["7135"],
        poInvoiceType:ENUMS["7260"],
        invoiceStatus:ENUMS["7100"],
        credenIden:ENUMS["7240"],
        listLoading:'false',
        searchBarFlg: true,
        isCancel: false,
        rules:{
          poInvoiceType:[{ required: true, message: '', trigger: 'change' }],
          invoiceStatus:[{ required: true, message: '', trigger: 'change' }],
          certificatesDate:[{ required: true, message: '', trigger: 'change' }],
          manageSubName:[{required: true, message: '', trigger: 'change'}],//经营主体
          bizOrgName:[{required: true, message: '', trigger: 'change'}],//部门
          supplierName:[{required: true, message: '', trigger: 'change'}],//供应商
          currencyName:[{required: true, message: ' ', trigger: 'change'}],//币种
        },
        certificatesDate:'',
        invoiceDate:'',
        receiveDialogStatus:false,
        transferSearchDepartment:{
          companyName:"",
          companyId:"",
          companyCode:"",
          boolToBtn:true
        },
      }
    },
    created(){
        this.doreset();
    },
    mounted() {

    },
    activated(){
//      this.getData();
    },
    filters: {
      packTypeFilter(val) {
        return ENUMS["7135"][val];
      },
      isGiftFilter(val) {
          if(val == 0){
              return '否';
          }else if(val == 1){
              return '是';
          }else{
              return '';
          }
      },
      TwoDecimal(val){
        return Number(val).toFixed(2);
      },
      EightDecimal(val){
        return Number(val).toFixed(8);
      },
      SixDecimal(val){
        return Number(val).toFixed(6);
      },
    },
    computed: {
      orginAmtTex(){//原币总金额
        return this.collectAdd('orginInvoiceAmtTex','orginAmtTex');
      },
      orginAmt(){//原币总金额(不含税)
        return this.collectAdd('orginInvoiceAmt','orginAmt');
      },
      orginTexAmt(){//原币税额
        return this.collectAdd('orginTexAmt','orginTexAmt');
      },
      baseAmtTex(){//本币总金额
        return this.collectAdd('baseInvoiceAmtTex','baseAmtTex');
      },
      baseAmt(){//本币总金额(不含税)
        return this.collectAdd('baseInvoiceAmt','baseAmt');
      },
      baseTexAmt(){//本币税额
        return this.collectAdd('baseTexAmt','baseTexAmt');
      },
      invoiceQty(){//发票总数量
        return this.collectAdd('currentInvoiceQty','invoiceQty');
      },
      disabled(){ //部门
        if(this.formData.manageSubName && this.tableData.length<=0){
          return false;
        }else{
          return true;
        }
      },
      editStatus(){
        if(this.tableData.length>0){
          return true;
        }
        return false;
      }
    },
    watch: {
      certificatesDate:function (val) {
        if(val){
          this.formData.certificatesDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.certificatesDate = "";
        }
      },
      invoiceDate:function (val) {
        if(val){
          this.formData.invoiceDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.invoiceDate = "";
        }
      },
    },
    methods: {
      collectAdd(key,returnKey){//汇总计算
        let sum = 0;
        this.tableData.forEach((val,index)=>{
          if(val[key]) {
            sum = NP.plus(sum, val[key]);
          }else{
            sum = NP.plus(sum,0);
          }
        });
        this.formData[returnKey] = sum;
        return sum;
      },
      handleDeleteClick(){ //删除
        if(this.multipleSelection.length<1){
          this.$message({
            message:'请选择一行或多行进行删除',
            type:'warning',
            duration:2*1000
          });
        }else {
          this.$confirm('您确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.multipleSelection.forEach((x,i) => {
              let idx = this.tableData.findIndex((val) => val.$index == x.$index);
              this.tableData[idx].poInvoiceDtlId && this.deleteList.push(this.tableData[idx].poInvoiceDtlId);
              idx>-1 && this.tableData.splice(idx, 1);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });

        }
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleAddNewCell(){
        if(createPrompt(this.formData)){
          this.receiveDialogStatus = true;
        }
      },
      handleCancel(){ //取消
        this.doreset();
        this.$refs['headerForm'].resetFields();
        this.$store.dispatch('toggleCurrentView', {
          PurchaseInvoice: {
            view: 'index'
          }
        });
      },
      handleSave(){
        this.validateForm('headerForm');
      },
      doSave(){
        this.$confirm('您确认要修改吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.tableData.map((x)=>{
            delete x.$index;
          });
          doUpdatePoInvoice(this.formData,this.tableData,this.deleteList).then(response => {
            if (response.data.status ==1) {
              this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success',
                duration: 2000
              });
              this.doreset();
              this.$refs['headerForm'].resetFields();
              this.$store.dispatch('toggleCurrentView', {
                PurchaseInvoice: {
                  view: 'index'
                }
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      doreset(){
        this.tableData = [];
        this.deleteList = [];
        this.activeTabs = 'headerData';
        this.certificatesDate = '';
        this.isCancel = false;
        this.invoiceDate = '';
        this.newPpoInvoiceNo = '';
        this.formData = {
          //抬头数据
          poInvoiceNo:'',
          poInvoiceType:'',
          extInvoiceNo:'',
          invoiceStatus:'71000010',
          manageSubCode:'',
          manageSubName:'',
          manageSubId:'',
          bizOrgCode:'',
          bizOrgName:'',
          bizOrgId:'',
          supplierCode:'',
          supplierName:'',
          supplierId:'',
          certificatesDate:'',
          currencyCode:'',
          currencyName:'',
          currencyId:'',
          rateCurrency:'',
          remark:'',
          invoiceDate:'',
          isCancel:false,
          //汇总信息
          orginAmtTex:'',
          orginAmt:'',
          orginTexAmt:'',
          baseAmtTex:'',
          baseAmt:'',
          baseTexAmt:'',
          invoiceQty:'',
          //凭证信息
          credenIden:'',
          credenNo:'',
          failReason:'',
          //系统信息
          createdBy:'',
          createdTime:'',
          updatedBy:'',
          updatedTime:'',
          postPersonName:'',
          postDate:''
        };
        this.getData();
      },
      handleClick() {
      },
      getData(){
        this.listLoading = true;
        doQueryPoInvoiceInfo(this.poInvoiceId).then(response => {
          if (response.data.status == 1) {
           let data = response.data.data;
           let form =data.codPoInvoiceVO;
            this.formData = {
              //抬头数据
              poInvoiceNo:form.poInvoiceNo,
              poInvoiceType:form.poInvoiceType.toString(),
              extInvoiceNo:form.extInvoiceNo,
              invoiceStatus:form.invoiceStatus.toString(),
              manageSubCode:form.manageSubCode,
              manageSubName:form.manageSubName,
              manageSubId:form.manageSubId,
              bizOrgCode:form.bizOrgCode,
              bizOrgName:form.bizOrgName,
              bizOrgId:form.bizOrgId,
              supplierCode:form.supplierCode,
              supplierName:form.supplierName,
              supplierId:form.supplierId,
              certificatesDate:form.certificatesDate ?form.certificatesDate.parseTime('YYYY-MM-DD'):'',
              currencyCode:form.currencyCode,
              currencyName:form.currencyName,
              currencyId:form.currencyId,
              rateCurrency:form.rateCurrency,
              remark:form.remark,
              isCancel:form.isCancel,
              invoiceDate:form.invoiceDate ?form.invoiceDate.parseTime('YYYY-MM-DD'):'',
              //汇总信息
              orginAmtTex:form.orginAmtTex,
              orginAmt:form.orginAmt,
              orginTexAmt:form.orginTexAmt,
              baseAmtTex:form.baseAmtTex,
              baseAmt:form.baseAmt,
              baseTexAmt:form.baseTexAmt,
              invoiceQty:form.invoiceQty,
              //凭证信息
              credenIden:form.credenIden,
              credenNo:form.credenNo,
              failReason:form.failReason,
              //系统信息
              createdBy:form.createdBy,
              createdTime:form.createdTime ,
              updatedBy:form.updatedBy,
              updatedTime:form.updatedTime ,
              postPersonId:form.postPersonId,
              postDate:form.postDate ,
              postPersonName:form.postPersonName,
              poInvoiceId:form.poInvoiceId,
              version:form.version,
            };
            this.certificatesDate = form.certificatesDate;
            this.invoiceDate = form.invoiceDate;
            this.newPpoInvoiceNo = data.newPpoInvoiceNo;
            this.tableData=[];

            if(this.formData.isCancel == 1){
              this.isCancel = true;
            }else if(this.formData.isCancel == 0){
              this.isCancel = false;
            }
            data.codPoInvoiceDtlVOList.forEach((val,i) => {
              this.tableData.push({
                poInvoiceDtlId:val.poInvoiceDtlId,
                poInvoiceRowNo:val.poInvoiceRowNo,
                poDtlRowNo:val.poDtlRowNo,
                poNo:val.poNo,
                poContractNo:val.poContractNo,
                poGrNo:val.poGrNo,
                poGrDtlRowNo:val.poGrDtlRowNo,
                goodsCode:val.goodsCode,
                goodsName:val.goodsName,
                packType:val.packType,
                isGift:val.isGift,
                receiveQty:val.receiveQty,
                currentInvoiceQty:val.currentInvoiceQty,
                unitName:val.unitName,
                texRate:val.texRate,
                orginInvoicePriceTex:val.orginInvoicePriceTex,
                orginInvoicePrice:val.orginInvoicePrice,
                orginInvoiceAmtTex:val.orginInvoiceAmtTex,
                orginInvoiceAmt:val.orginInvoiceAmt,
                orginTexAmt:val.orginTexAmt,
                baseInvoicePriceTex:val.baseInvoicePriceTex,
                baseInvoicePrice:val.baseInvoicePrice,
                baseInvoiceAmtTex:val.baseInvoiceAmtTex,
                baseInvoiceAmt:val.baseInvoiceAmt,
                baseTexAmt:val.baseTexAmt,
                remark:val.remark,
                poGrDtlId:val.poGrDtlId,
              })
            });
            this.listLoading = false;
          }
        });

      },
      currencyFill(val){
        if(val){
          this.formData.currencyName = val.currencyShortname;
          this.formData.currencyCode = val.currencyCode;
          this.formData.currencyId = val.currencyId;
          this.formData.rateCurrency = val.exchangeRate;
        }else {
          this.formData.currencyName = '';
          this.formData.currencyCode = '';
          this.formData.currencyId = '';
          this.formData.rateCurrency = '';
        }
        this.$refs['headerForm'].validateField('currencyName');
        this.tableData.forEach((val,idx)=>{
          this.calcuteMoney(val);
        });
      },
      manageSubNameFill(val){ // 经营主体
        if(val){
          this.formData.manageSubName = val.companyName;
          this.formData.manageSubCode = val.companyCode;
          this.formData.manageSubId = val.companyId;
          this.transferSearchDepartment.companyName = val.companyName;
          this.transferSearchDepartment.companyId = val.companyId;
          this.transferSearchDepartment.companyCode = val.companyCode;
        }else {
          this.formData.manageSubName = '';
          this.formData.manageSubCode = '';
          this.formData.manageSubId = '';
          this.transferSearchDepartment.companyName = '';
          this.transferSearchDepartment.companyId = '';
          this.transferSearchDepartment.companyCode = '';
        }
        this.formData.bizOrgName = '';
        this.formData.bizOrgCode = '';
        this.formData.bizOrgId = '';

        this.formData.supplierName = '';
        this.formData.supplierCode = '';
        this.formData.supplierId = '';

        this.$refs['headerForm'].validateField('manageSubName');
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.formData.bizOrgName = val.orgName;
          this.formData.bizOrgCode = val.orgCode;
          this.formData.bizOrgId = val.orgId;
        }else {
          this.formData.bizOrgName = '';
          this.formData.bizOrgCode = '';
          this.formData.bizOrgId = '';
        }
        this.$refs['headerForm'].validateField('bizOrgName');
      },
      supplierNameFill(val){ // 供应商
        if(val){
          this.formData.supplierName = val.supplyName;
          this.formData.supplierCode = val.supplyCode;
          this.formData.supplierId = val.id;
        }else {
          this.formData.supplierName = '';
          this.formData.supplierCode = '';
          this.formData.supplierId = '';
        }
        this.$refs['headerForm'].validateField('supplierName');
      },
      validateForm(formName) { //表单校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.validateTable();//通过调用tale验证
          } else {
            this.$message({
              message: '请完善必输字段',
              type: 'warning'
            });
            return false;
          }
        });
      },
      validateTable(){ //表格校验
        eventBus.$emit('validateTable', {
          data: this.tableData,    //表示表格数据
          headers: this.headers,   //表示表头数据
          success: (valid)=>{   //成功回掉
            if (valid) {
              //校验通过后，代码书写处
              if(this.tableData.length>0){
                this.doSave();
              }else{
                this.$message({
                  type:'warning',
                  message:"请创建明细"
                })
              }
            }
          }
        })
      },
      fillRow(val){
        for(let obj of val) {
//          let index = this.tableData.findIndex((x) => obj.poGrNo == x.poGrNo);
//          if(index==-1){
            let poInvoiceRowNo = 1;
            if(this.tableData.length>=1){
              poInvoiceRowNo = this.tableData[this.tableData.length-1].poInvoiceRowNo +1
            }
            this.tableData.push({
              poInvoiceRowNo:poInvoiceRowNo,
              poDtlRowNo:obj.poRowNo, //采购合同行号
              poNo:obj.poNo,
              poContractNo:obj.poContractNo,
              poGrNo:obj.poGrNo, //收货单号
              poGrDtlRowNo:obj.poGrRowNo, //收货单行号
              goodsCode:obj.goodsCode,
              goodsName:obj.goodsName,
              goodsId:obj.goodsId,
              packType:obj.packType,
              isGift:obj.isGift,
              receiveQty:obj.actReceiveQty,
              currentInvoiceQty:obj.currentInvoiceQty,
              //税金科目
              poDtlId:obj.poDtlId,
              poGrDtlId:obj.poGrDtlId,
              unitId:obj.unitId,
              unitName:obj.unitName,
              unitCode:obj.unitCode,
              texRate:obj.texRate,
              orginInvoicePriceTex:obj.orginPriceTex,
              orginInvoicePrice:obj.orginPrice,
              orginInvoiceAmtTex:obj.orginAmtTex,
              orginInvoiceAmt:obj.orginAmt,
              orginTexAmt:obj.orginTexAmt,
              baseInvoicePriceTex:obj.basePriceTex,
              baseInvoicePrice:obj.basePrice,
              baseInvoiceAmtTex:obj.baseAmtTex,
              baseInvoiceAmt:obj.baseAmt,
              baseTexAmt:obj.baseAmtTex,
              remark:''
            });
//          }
        }
        this.receiveDialogStatus = false;
      },
      closeReceiveDialog(val){
        this.receiveDialogStatus = false;
      },
      calcuteMoney(row){//输入单价、数量、税率
        setTimeout(()=>{
          if(row.currentInvoiceQty && row.texRate && row.orginInvoicePriceTex){
            var obj = calculateOrderDatail({"priceTex":row.orginInvoicePriceTex,"num":row.currentInvoiceQty,"texRate":row.texRate});
            row.orginInvoiceAmtTex = obj.amtTex;//原币金额
            row.orginInvoiceAmt = obj.amt;//原币税前金额
            row.orginInvoicePrice = obj.price;//原币税前单价
            row.orginTexAmt = obj.texAmt;//原币税额
            this.calcuteBasicMoney(row);
          };
        },10);
      },
      calcuteAmtMoney(row){ //输入金额
        setTimeout(()=> {
          if (row.orginInvoiceAmtTex) {
            var obj = amtTexBlur({
              "amtTex": row.orginInvoiceAmtTex,
              "num": row.currentInvoiceQty,
              "texRate": row.texRate
            });
            row.orginTexAmt = obj.texAmt;//原币税额
            row.orginInvoiceAmt = obj.amt;//原币税前金额
            row.orginInvoicePriceTex = obj.priceTex;//原币单价
            row.orginInvoicePrice = obj.price;//原币税前单价
            this.calcuteBasicMoney(row);
          };
        });
      },
      calcuteBasicMoney(row){ //本币计算
        let vm = this;
        setTimeout(function () {
          let rateCurrency = vm.formData.rateCurrency;
          row.baseInvoicePrice = NP.times(row.orginInvoicePrice, rateCurrency).toFixed(6);//本币单价（不含税） = 原币无税单价 * 对人民币税率
          row.baseInvoicePriceTex = NP.times(row.orginInvoicePriceTex, rateCurrency).toFixed(6);//本币单价（含税）= 原币含税单价 * 对人民币税率
          row.baseInvoiceAmt = NP.times(row.orginInvoiceAmt, rateCurrency).toFixed(2);//本币金额（不含税）= 原币税前金额 * 对人民币税率
          row.baseTexAmt = NP.times(row.orginTexAmt, rateCurrency).toFixed(2);//本币税额 = 原币税额 * 对人民币税率
          row.baseInvoiceAmtTex = NP.times(row.baseInvoiceAmt, row.baseTexAmt).toFixed(2);//本币金额（含税）= 本币税前金额 * 本币税额
        });
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
    height: 120px;
  }
</style>
