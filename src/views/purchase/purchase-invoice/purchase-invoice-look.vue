<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="info"  size="small" @click="handleCancel" >取 消</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg">
        <el-tabs v-model="activeTabs"  @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="headerData" class="tabpane">
            <el-form ref="form" label-width="80px" :model="formData">
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-form-item label="系统单据号" prop="poInvoiceNo">
                    <el-input v-model="formData.poInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票类别" prop="poInvoiceType">
                    <el-select  v-model="formData.poInvoiceType" placeholder="请选择" size="mini" clearable disabled>
                      <el-option v-for="(value,key) in poInvoiceType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票外部编号" prop="extInvoiceNo">
                    <el-input v-model="formData.extInvoiceNo" size="mini" disabled></el-input>
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
                  <el-form-item label="经营主体">
                    <el-input v-model="formData.manageSubName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" >
                    <el-input v-model="formData.bizOrgName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="供应商">
                    <el-input v-model="formData.supplierName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="凭证日期" prop="certificatesDate">
                    <el-date-picker type="date" placeholder="起始时间" v-model="formData.certificatesDate"
                                    style="width: 100%;" size="mini" disabled></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="6">
                <el-col :span="6">
                  <el-form-item label="币别">
                    <el-input v-model="formData.currencyName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="汇率(本位币)" prop="rateCurrency" >
                    <el-input :value="formData.rateCurrency | EightDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票日期" prop="invoiceDate">
                    <el-date-picker type="date" placeholder="起始时间" v-model="formData.invoiceDate"
                                    style="width: 100%;" size="mini" disabled></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注" prop="remark">
                    <el-input  v-model="formData.remark" size="mini" disabled></el-input>
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
                    <el-input :value="formData.orginAmtTex | TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原币总金额(不含税)" prop="orginAmt">
                    <el-input :value="formData.orginAmt | TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="原币税额" prop="orginTexAmt">
                    <el-input :value="formData.orginTexAmt | TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="本币总金额" prop="baseAmtTex">
                    <el-input :value="formData.baseAmtTex | TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本币总金额(不含税)" prop="baseAmt">
                    <el-input :value="formData.baseAmt | TwoDecimal" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="本币税额" prop="baseTexAmt">
                    <el-input :value="formData.baseTexAmt | TwoDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="6">
                <el-col :span="8">
                  <el-form-item label="发票总数量" prop="invoiceQty">
                    <el-input :value="formData.invoiceQty | TwoDecimal" size="mini"disabled ></el-input>
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
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      v-loading="listLoading"
      style="margin-top: 12px;"
    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'selectPackType'">
          <span>{{tableData[scope.index]['packType'] | packTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'inputIsGift'">
          <span>{{tableData[scope.index]['isGift'] | isGiftFilter}}</span>
        </div>
      </template>
    </common-table>
  </div>
</template>
<script type="text/javascript">
  import router from '@/router';
  import {doQueryPoInvoiceInfo } from 'api/purchase/purchase-invoice/purchase-invoice.js';



  const headers = [
    {  type: 'selection', label: '序号',fixed:'left'},
    { prop: 'poInvoiceRowNo', label: '行号',width:'60px',align:'center'},
    { prop: 'poDtlRowNo', label: '采购合同行号',width:'120px',align:'center'},
    { prop: 'poNo', label: '采购合同系统单据号',width:'150px',align:'center'},
    { prop: 'poContractNo', label: '采购合同号',width:'100px',align:'center'},
    { prop: 'poGrNo', label: '收货单号', align:'center',width:'140px'},
    { prop: 'poGrDtlRowNo', label: '收货单行号',width:'110px', align:'center'},
    { prop: 'goodsCode', label: '物料编号', align:'center',width:'140px'},
    { prop: 'goodsName', label: '物料名称', align:'center',width:'140px'},
    { prop: 'packType', label: '包装方式', align:'center',width:'120px',filter: 'selectPackType'},
    { prop: 'isGift', label: '是否赠品',align:'center',filter:'inputIsGift'},
    { prop: 'receiveQty', label: '收货数量',align:'center', digit: '2'},
    { prop: 'currentInvoiceQty', label: '本次发票数量',width:'120px',align:'center', digit: '2'},
//    { prop: '', label: '税金科目',align:'center'},
    { prop: 'unitName', label: '单位',align:'center'},
    { prop: 'texRate', label: '税率',align:'center', digit: '2',width:'120px'},
    { prop: 'orginInvoicePriceTex', label: '原币单价（含税）',width:'140px',align:'center', digit: '6'},
    { prop: 'orginInvoicePrice', label: '原币单价（不含税）',width:'140px',align:'center', digit: '6'},
    { prop: 'orginInvoiceAmtTex', label: '原币金额',width:'120px',align:'center', digit: '2'},
    { prop: 'orginInvoiceAmt', label: '原币税前金额',width:'120px',align:'center', digit: '2'},
    { prop: 'orginTexAmt', label: '原币税额',align:'center', digit: '2'},
    { prop: 'baseInvoicePriceTex', label: '本币单价（含税）',width:'150px',align:'center', digit: '6'},
    { prop: 'baseInvoicePrice', label: '本币单价（不含税）',width:'140px',align:'center', digit: '6'},
    { prop: 'baseInvoiceAmtTex', label: '本币金额',width:'150px',align:'center', digit: '2'},
    { prop: 'baseInvoiceAmt', label: '本币税前金额',width:'110px',align:'center', digit: '2'},
    { prop: 'baseTexAmt', label: '本币税额',align:'center', digit: '2'},
    { prop: 'remark', label: '备注',align:'center',width:'200px'}
  ];

  export default {
    props:{
      poInvoiceId:String
    },
    data(){
      return {
        disabled: true,
        activeTabs: 'headerData',
        headers: headers,
        tableData: [],
        formData:{},
        packType:ENUMS["7135"],
        poInvoiceType:ENUMS["7260"],
        invoiceStatus:ENUMS["7100"],
        credenIden:ENUMS["7240"],
        listLoading:'false',
        searchBarFlg: true,
        isCancel: false,
        newPpoInvoiceNo: '',
      }
    },
    created(){
      this.tableData = [];
      this.activeTabs = 'headerData';
      this.getData();
    },
    mounted() {

    },
    activated(){

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
    watch: {

    },
    methods: {
      handleCancel(){
        this.$store.dispatch('toggleCurrentView', {
          PurchaseInvoice: {
            view: 'index'
          }
        });
      },
      handleClick() {},
      getData(){
        this.listLoading = true;
        doQueryPoInvoiceInfo(this.poInvoiceId).then(response => {
          if (response.data.status == 1) {
            let data = response.data.data;
            this.formData = data.codPoInvoiceVO;
            this.formData.poInvoiceType = this.formData.poInvoiceType.toString();
            this.formData.invoiceStatus = this.formData.invoiceStatus.toString();
            this.newPpoInvoiceNo = data.newPpoInvoiceNo;
            if(this.formData.isCancel == 1){
              this.isCancel = true;
            }else if(this.formData.isCancel == 0){
              this.isCancel = false;
            }
            this.tableData = data.codPoInvoiceDtlVOList;
            this.listLoading = false;
          }
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

