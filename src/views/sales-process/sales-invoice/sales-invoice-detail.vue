<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <el-button type="primary" size="small" @click="toSave">返回</el-button>
    </div>
    <div class="elTabs info">
      <div style="padding-bottom: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="first">
            <el-form ref="form" label-width="80px" :model="dataForPage">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="发票单据号" prop="soInvoiceNo">
                    <el-input v-model="dataForPage.soInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="开票数量" prop="invoiceQty">
                    <el-input v-model="invoiceQty" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="汇率" prop="rateCurrency">
                    <el-input disabled v-model="dataForPage.rateCurrency" size="mini"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="发票类型" prop="soInvoiceType">
                    <el-select v-model="dataForPage.soInvoiceType" placeholder="请选择" size="mini"disabled>
                      <el-option
                        v-for="item in soInvoiceType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <el-input v-model="dataForPage.manageSubName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" prop="bizOrgName">
                    <el-input v-model="dataForPage.bizOrgName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户" prop="customerName">
                    <el-input v-model="dataForPage.customerName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票外部编号" prop="extInvoiceNo">
                    <el-input v-model="dataForPage.extInvoiceNo" size="mini"disabled>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="开票日期" prop="invoiceDate">
                    <el-date-picker v-model="dataForPage.invoiceDate" type="date"
                                    size="mini"disabled></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务员" prop="buyerName">
                    <el-input v-model="dataForPage.buyerName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!--todo-->
                  <el-form-item label="销售类型" prop="soType">
                    <el-select v-model="dataForPage.soType" placeholder="请选择" size="mini"disabled>
                      <el-option
                        v-for="item in soType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别" prop="currencyName">
                    <el-input v-model="dataForPage.currencyName" size="mini"disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="dataForPage.remark" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="汇总信息" name="second">
            <el-form ref="form" label-width="80px" :model="dataForPage">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="原币含税金额" prop="orginalAmtTex">
                    <el-input v-model="dataForPage.orginAmtTex" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原币税前金额" prop="orginalAmt">
                    <el-input v-model="dataForPage.orginAmt" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原币税额" prop="orginalTexAmt">
                    <el-input v-model="dataForPage.orginTexAmt" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="本币含税金额" prop="baseAmtTex">
                    <el-input v-model="dataForPage.baseAmtTex" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本币税前金额" prop="baseAmt">
                    <el-input v-model="dataForPage.baseAmt" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本币税额" prop="baseTexAmt">
                    <el-input v-model="dataForPage.baseTexAmt" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="开票信息" name="third">
            <el-form ref="form" label-width="80px" :model="dataForPage">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="开票方编码" prop="invoiceCode">
                    <el-input v-model="dataForPage.invoiceCode" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话号码" prop="invoiceTel">
                    <el-input v-model="dataForPage.invoiceTel" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label='纳税识别号' prop="taxNo">
                    <el-input v-model="dataForPage.taxNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="银行账号" prop="bankAccount">
                    <el-input v-model="dataForPage.bankAccount" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户银行名称" prop="bankName">
                    <el-input v-model="dataForPage.bankName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地址" prop="invoiceAddress">
                    <el-input v-model="dataForPage.invoiceAddress" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="凭证信息" name="fourth">
            <el-form ref="form" label-width="80px" :model="dataForPage">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="凭证标识" prop="credenIden">
                    <el-select v-model="dataForPage.credenIden" placeholder="请选择" size="mini" disabled>
                        <el-option label="凭证未操作" value="72400010"></el-option>
                        <el-option label="凭证未过账" value="72400020"></el-option>
                        <el-option label="凭证已过账" value="72400030"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="凭证过账编号" prop="credenNo">
                    <el-input v-model="dataForPage.credenNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="推送失败原因" prop="failReason">
                    <!-- type="textarea"-->
                    <el-input v-model="dataForPage.failReason" disabled size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="其他信息" name="fifth">
            <el-form ref="form" label-width="80px" :model="dataForPage">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="销项发票状态" prop="salesInvoiceStatus">
                    <el-select v-model="dataForPage.salesInvoiceStatus" placeholder="请选择" size="mini" disabled>
                      <el-option label="保存" value="71150010"></el-option>
                      <el-option label="已提交" value="71150020"></el-option>
                      <el-option label="已过账" value="71150030"></el-option>
                      <el-option label="已驳回" value="71150040"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="取消发票日期" prop="cancelInvoiceDate">
                    <el-date-picker disabled v-model="dataForPage.cancelInvoiceDate" type="date"
                                    size="mini"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="取消发票编号" prop="cancelInvoiceNo">
                    <el-input v-model="dataForPage.cancelInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="" prop="name">
                    <el-checkbox v-model="checked" disabled>被取消</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="sixth">
            <el-form ref="form" label-width="80px" :model="dataForPage">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-input v-model="dataForPage.createdBy" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改人" prop="updatedBy">
                    <el-input v-model="dataForPage.updatedBy" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="postPersonName">
                    <el-input v-model="dataForPage.postPersonName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-date-picker disabled v-model="dataForPage.createdTime" type="datetime"
                                    size="mini"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-date-picker disabled v-model="dataForPage.updatedTime" type="datetime"
                                    size="mini"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="postDate">
                    <el-date-picker disabled v-model="dataForPage.postDate" type="datetime"size="mini"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs></div>

    </div>
    <div class="btn" style="margin: 25px auto">
    </div>
    <div class="commonTable">
      <common-table
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'companyFilter'">
            <span>{{list[scope.index]['packType'] | companyFilter}}</span>
          </div>
        </template>
      </common-table>
    </div>
  </div>
</template>
<script type="text/javascript">

  //接口引用
  import {
    doQueryModified,
  } from '@/api/sales-process/sales-invoice/sales-invoice'
import {pickerOptions} from '@/util'

  const headers = [
    {type: 'selection', width: '55px',fixed:"left"},
    {prop: 'soInvoiceDtlRowNo', type: 'index', label: '行号', fixed: "left", width: '55px',align:'center'},
    {prop: 'soContractNo', label: '销售合同号', width: '160px',align:'center'},
    {prop: 'goodsCode', label: '物料编号', width: '120px',align:'center',},//没有的
    {prop: 'goodsName', label: '物料描述',  width: '210px',align:'center'},
    {prop: 'invoiceQty', label: '开票数量', width: '120px',align:'center',},
//    {prop: 'invoicePrice', label: '开票单价', width: '120px',align:'center'},
    {prop: 'packType', label: '包装方式', width: '120px',align:'center',filter: 'companyFilter'},
    {prop: 'invoicePriceTex', label: '原币单价(含税)', width: '120px',align:'center',digit: '6'},
    {prop: 'invoicePrice', label: '原币单价(不含税)', width: '120px',align:'center',digit: '6'},
    {prop: 'orginalAmtTex', label: '原币金额', width: '120px',align:'center',digit: '2'},
    {prop: 'orginAmt', label: '原币税前金额', width: '120px',align:'center',digit: '2'},
    {prop: 'texRate', label: '税率', width: '120px',align:'center',digit: '2'},
    {prop: 'orginTexAmt', label: '原币税额', width: '120px',align:'center',digit: '2'},
    {prop: 'orginDiscountAmt', label: '原币折扣金额', width: '120px',align:'center',digit: '2'},
    {prop: 'costAmt', label: '成本', width: '120px',align:'center',},
    {prop: 'remark', label: '备注', width: '120px',align:'center',},
    {prop: 'seriesNo', label: '批次', width: '120px',align:'center'},
    {prop: 'bizOrgName', label: '部门名称', width: '120px',align:'center'},
    {prop: 'soNo', label: '销售单号', width: '160px',align:'center',},
    {prop: 'soDtlRowNo', label: '销售单行号', width: '160px',align:'center'},
    {prop: 'soOsDtlRowNo', label: '交货单行号', width: '160px',align:'center'},
    {prop: 'soRoNo', label: '交货单号', width: '160px',align:'center'},
    {prop: 'taxSubject', label: '税金科目', width: '120px',align:'center'},
  ];
const soInvoiceType = [//发票类型
  {value: 73100005, label: "标准发票"},
  {value: 73100010, label: "取消发票"},
  {value: 73100015, label: "退货发票-标准"},
  {value: 73100020, label: "退货发票-标准取消"},
  {value: 73100025, label: "事后借记"},
  {value: 73100030, label: "事后贷记"}
]
const soType = [//销售类型
  {value: 72700010, label: "国内销售"},
  {value: 72700020, label: "进口销售"},
  {value: 72700030, label: "出口销售"},
  {value: 72700040, label: "样品销售"}
]
  export default {
    data(){
      return {
        options: [],
        headers: headers,
        list: [],
        value4: "",
        dataPickValue: '',
        currentPage: 2,
        deleteCellData: [],
        dataForPage: {},
        pageState: true,
        pickerOptions: {
          shortcuts: pickerOptions
        },
        activeName:'first',
        soType: soType,
        soInvoiceType: soInvoiceType,
        checked:false,
        }
    },
    created(){
//      let dataId = this.$route.query.data;
      let dataId = this.$store.getters.params.SalesInvoice;
      this.getDataMain(dataId.soInvoiceId);

    },
    filters: {
      companyFilter(val) {
        if(val){
          val.toString();
        }
        return ENUMS['7135'][val];
      },
    },
    computed:{
      invoiceQty(){
        let [vm,invoiceQty]=[this,null];
        vm.list.forEach((o, i) => {
          if(!o.invoiceQty){o.invoiceQty=0}
          invoiceQty += Number(o.invoiceQty)
        });
        return invoiceQty;
      }
    },
    methods: {
      getDataMain(val){
        doQueryModified(val).then(response => {
          if (response.data.status == '1') {
            this.list = [];
            let vm = this;
            let codSoInvoiceDtlCusList = response.data.data.codSoInvoiceDtlCusList;
            let data = response.data.data;
            if (codSoInvoiceDtlCusList.length > 0) {
              codSoInvoiceDtlCusList.forEach((o, i) => {
                vm.list.push({
                costAmt:o.costAmt,
                seriesId:o.seriesId,
                soOsDtlRowNo:o.soOsDtlRowNo,
                soInvoiceDtlRowNo:o.soInvoiceDtlRowNo,
                soRoNo:o.soRoNo,
                taxSubject:o.taxSubject,
                bizOrgName:o.bizOrgName,
                soDtlId:o.soDtlId,
                goodsCode:o.goodsCode,
                goodsName:o.goodsName,
                goodsId:o.goodsId,
                soNo:o.soNo,
                soContractNo:o.soContractNo,
                seriesNo:o.seriesNo,
                orginAmtTex:o.orginAmtTex,
                orginAmt:o.orginAmt,
                texRate:o.texRate,
                packType:o.packType,
                orginTexAmt:o.orginTexAmt,
                soDtlRowNo:o.soDtlRowNo,
                invoicePrice:o.invoicePrice,
                soOsDtlId:o.soOsDtlId,
                invoiceQty:o.invoiceQty,
                remark:o.remark,
                })
              });
              vm.dataForPage = {
                'soInvoiceNo': data.soInvoiceNo,
                'extInvoiceNo': data.extInvoiceNo,
                'soType': data.soType,
                'soInvoiceType': data.soInvoiceType,
                'manageSubName': data.manageSubName,
                'manageSubCode': data.manageSubCode,
                'manageSubId': data.manageSubId,
                'bizOrgName': data.bizOrgName,
                'bizOrgCode': data.bizOrgCode,
                'bizOrgId': data.bizOrgId,
                'invoiceDate': data.invoiceDate,
                'customerName': data.customerName,
                'customerCode': data.customerCode,
                'customerId': data.customerId,
                'invoiceQty': data.invoiceQty,
                'buyerName': data.buyerName,
                'buyerCode': data.buyerCode,
                'buyerId': data.buyerId,
                'remark': data.remark,
                //汇率
                'currencyName': data.currencyName,
                'currencyCode': data.currencyCode,
                'currencyId': data.currencyId,
                'rateCurrency': data.rateCurrency.toFixed(8),
                //汇总
                'baseAmtTex': data.baseAmtTex,//本币含税金额
                'baseAmt': data.baseAmt,//本币税前金额
                'baseTexAmt': data.baseTexAmt,//本币税额
                'orginAmtTex': data.orginAmtTex,//原币含税金额
                'orginAmt': data.orginAmt,//原币税前金额
                'orginTexAmt': data.orginTexAmt,//原币税额
                //开票信息
                'invoiceCode': data.invoiceCode,
                'taxNo': data.taxNo,
                'invoiceAddress': data.invoiceAddress,
                'invoiceTel': data.invoiceTel,
                'bankAccount': data.bankAccount,
                'bankName': data.bankName,
                'bankCode': data.bankCode,
                'bankId': data.bankId,
                //凭证
                'credenIden': data.credenIden+'',
                'credenNo': data.credenNo,
                'failReason': data.failReason,
                //其他
                'salesInvoiceStatus': data.salesInvoiceStatus+'',
                'cancelInvoiceDate': data.cancelInvoiceDate,
                'cancelInvoiceNo': data.cancelInvoiceNo,
                'isCancel': data.isCancel,
                //系统
                'createdTime': data.createdTime,
                'createdBy': data.createdBy,
                'updatedTime': data.updatedTime,
                'postPersonName': data.postPersonName,
                'postPersonCode': data.postPersonCode,
                'postPersonId': data.postPersonId,
                'postDate': data.postDate,
                'updatedBy': data.updatedBy,
              }
              if(this.dataForPage.isCancel==0){
                this.checked=true;
              }else{
                this.checked=false;
              }
            } else {
              vm.list = []
            }
          }
        })
      },
      toSave(){
          this.$store.dispatch('toggleCurrentView', {
            SalesInvoice: {
              view: 'index'
            }
          });
      },
      //表格点击
      handleCellClick(){

      },
      handleSelectionChange(val){
        this.deleteCellData = val;
      },
      //tab点击
      handleClick(){

      },
      //分页
      handleSizeChange(val){
        console.log(val, "handleSizeChange=>val")
      },
      handleCurrentChange(val){
        console.log('val=>handleCurrentChange', val)
      },
      //子页面方法
      methodForPage(val){
        console.log(val, "<=子页面数据")
      },
    },
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .elTabs {
    /*height: 260px;*/
  }
</style>
