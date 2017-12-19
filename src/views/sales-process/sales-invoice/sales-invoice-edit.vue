<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="primary" size="small" @click="toSave('yes')" :disabled="!operateFlg">保 存</el-button>
      <el-button type="info" size="small" @click="toSave('no')">取 消</el-button>
    </div>
    <div class="elTabs info" style="padding-bottom: 10px">
      <!--<tabs-for-edit :dataForPage="dataForPage" :pageState="pageState"-->
      <!--@methodForPage="methodForPage"></tabs-for-edit>-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抬头数据" name="first">
          <el-form ref="formFirst" label-width="90px" :model="dataForPage" :rules="rules">
            <el-row>
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
                  <!--<el-input disabled v-model="dataForPage.rateCurrency" size="mini"></el-input>-->
                  <el-input v-model="dataForPage.rateCurrency" size="mini" v-number-only:1.abs="8"
                            @blur="decimalTwo"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="发票类型" prop="soInvoiceType">
                  <el-select disabled v-model="dataForPage.soInvoiceType" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in soInvoiceType"
                      :key="item.value"
                      :disabled="item.type"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
                  <el-input v-model="dataForPage.extInvoiceNo" size="mini">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="开票日期" prop="invoiceDate">
                  <el-date-picker v-model="dataForPage.invoiceDate" type="date"
                                  size="mini" :editable="false"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员" prop="buyerName">
                  <!--<el-input v-model="dataForPage.buyerName" size="mini" disabled></el-input>-->
                  <staff-select @childevent="getBuyerName":querySelect="dataForPage.buyerName" ref="buyerNamePage"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!--todo-->
                <el-form-item label="销售类型" prop="soType">
                  <el-select v-model="dataForPage.soType" placeholder="请选择" size="mini" disabled>
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
                  <!--<el-input v-model="dataForPage.currencyName" size="mini"></el-input>-->
                  <currency-select @childevent="childEventHandlerCurrency" :querySelect="currencyName"
                                   disabled></currency-select>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注" prop="remark" class="elColWidth24">
                  <el-input v-model="dataForPage.remark" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="汇总信息" name="second">
          <el-form ref="form" label-width="80px" :model="dataForPage">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="原币含税金额" prop="orginAmtTex">
                  <el-input v-model="orginAmtTexTotal" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原币税前金额" prop="orginAmt">
                  <el-input v-model="orginAmtTotal" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原币税额" prop="orginTexAmt">
                  <el-input v-model="orginTexAmtTotal" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="本币含税金额" prop="baseAmtTex">
                  <el-input v-model="baseAmtTexTotal" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本币税前金额" prop="baseAmt">
                  <el-input v-model="baseAmtTotal" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本币税额" prop="baseTexAmt">
                  <el-input v-model="baseTexAmtTotal" size="mini" disabled></el-input>
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
                  <el-input v-model="dataForPage.invoiceCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电话号码" prop="invoiceTel">
                  <el-input v-model="dataForPage.invoiceTel" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label='纳税识别号' prop="taxNo">
                  <el-input v-model="dataForPage.taxNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="银行账号" prop="bankAccount">
                  <el-input v-model="dataForPage.bankAccount" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户银行名称" prop="bankName">
                  <el-input v-model="dataForPage.bankName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地址" prop="invoiceAddress">
                  <el-input v-model="dataForPage.invoiceAddress" size="mini"></el-input>
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
                                  size="mini" :editable="false"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="取消发票编号" prop="cancelInvoiceNo">
                  <el-input v-model="dataForPage.cancelInvoiceNo" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="" prop="name">
                  <el-checkbox disabled v-model="checked">被取消</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="sixth">
          <el-form ref="form" label-width="80px" :model="dataForPage" style="margin-top:16px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人" prop="createdBy">
                  <el-col :span="18">
                    <el-input v-model="dataForPage.createdBy" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改人" prop="name">
                  <el-col :span="18">
                    <el-input v-model="dataForPage.code" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账人" prop="code">
                  <el-col :span="18">
                    <el-input v-model="dataForPage.code" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="createdTime">
                  <el-col :span="18">
                    <el-date-picker v-model="dataForPage.createdTime" type="datetime" size="mini"
                                    disabled></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间" prop="updatedTime">
                  <el-col :span="18">
                    <el-date-picker v-model="dataForPage.updatedTime" type="datetime" size="mini"
                                    disabled></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账时间" prop="postDate">
                  <el-col :span="18">
                    <el-date-picker v-model="dataForPage.postDate" type="datetime" size="mini"
                                    disabled></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="small" @click="showDialog">创 建</el-button>
      <el-button type="warning" size="mini" icon="el-icon-delete" plain @click="deleteCell">删 除</el-button>
    </div>
    <div class="commonTable">
      <common-table
        ref="firstTable"
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @row-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot-scope="scope" slot="default">
          <div v-if="scope.text =='texRate'">
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['texRate']" @input="setPriceMoney(list[scope.index])"
                      size="mini"></el-input>
          </div>
          <div v-if="scope.text =='orginAmtTex'">
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['orginAmtTex']" @input="setAmtTexBlurIpt(list[scope.index])"
                      size="mini"></el-input>
          </div>
          <div v-if="scope.text =='invoicePriceTex'">
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['invoicePriceTex']" @input="setPriceMoney(list[scope.index])"
                      size="mini"></el-input>
          </div>
          <div v-if="scope.text =='invoiceQty'">
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['invoiceQty']" @input="setPriceMoney(list[scope.index])"
                      size="mini"></el-input>
          </div>
        </template>
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'companyFilter'">
            <span>{{list[scope.index]['packType'] | companyFilter}}</span>
          </div>
        </template>
      </common-table>
    </div>
    <sales-invoice-dialog :dialogShow="dialogShow" @closeDialogPurchase="closeDialogPurchase" @choosePurse="chooseSales"
                          :queryDialog="queryDialogData"></sales-invoice-dialog>
  </div>
</template>
<script type="text/javascript">
  //接口引用
  import {
    doQueryModified,
    doModify
  } from '@/api/sales-process/sales-invoice/sales-invoice'

  import {pickerOptions,calculateOrderDatail , amtTexBlur, } from '@/util'
  import {createPrompt } from '@/api/sales-process/sales-invoice/sales-invoice'
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import SalesInvoiceDialog from './sales-invoice-dialog.vue' //创建弹框
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员
  import NP from 'number-precision';


  const headers = [
    {type: 'selection', width: '55px', fixed: "left"},
    {prop: 'soDtlRowNo', type: 'index', label: '行号', fixed: "left", width: '55px', align: 'center'},
    {prop: 'soContractNo', label: '销售合同号', width: '160px', align: 'center'},
    {prop: 'goodsCode', label: '物料编号', width: '120px', editable: false, align: 'center'},//没有的
    {prop: 'goodsName', label: '物料描述', template: 'goodsName', width: '210px', align: 'center'},
    {prop: 'invoiceQty', label: '开票数量', width: '120px',template:'invoiceQty',align: 'center'},
//    {prop: 'invoicePrice', label: '开票单价', width: '120px', editable: true, align: 'center'},
    {prop: 'packType', label: '包装方式', width: '120px', filter: 'companyFilter', align: 'center'},
    {
      prop: 'invoicePriceTex',
      label: '原币单价(含税)',
      width: '120px',
      align: 'center',
      template: 'invoicePriceTex',
      required: true,
      digit: '6'
    },
    {prop: 'invoicePrice', label: '原币单价(不含税)', width: '120px', align: 'center', digit: '6'},
    {
      prop: 'orginAmtTex',
      label: '原币金额',
      width: '120px',
      align: 'center',
      digit: '2',
      template: 'orginAmtTex',
      required: true,
    },
    {prop: 'orginAmt', label: '原币税前金额', width: '120px', align: 'center', digit: '2'},
    {prop: 'texRate', label: '税率', width: '120px', align: 'center', template: 'texRate', required: true, digit: '2'},
    {prop: 'orginTexAmt', label: '原币税额', width: '120px', align: 'center', digit: '2'},
    {prop: 'orginDiscountAmt', label: '原币折扣金额', width: '120px', align: 'center', digit: '2'},
    {prop: 'costAmt', label: '成本', width: '120px', editable: true, align: 'center'},
    {prop: 'remark', label: '备注', width: '120px', editable: true, align: 'center'},
    {prop: 'seriesNo', label: '批次', width: '120px', align: 'center'},
    {prop: 'bizOrgName', label: '部门名称', width: '120px', align: 'center'},
    {prop: 'soNo', label: '销售单号', width: '160px', editable: true, align: 'center'},
    {prop: 'soInvoiceDtlRowNo', label: '销售单行号', width: '160px', align: 'center'},
    {prop: 'soOsDtlRowNo', label: '交货单行号', width: '160px', align: 'center'},
    {prop: 'soRoNo', label: '交货单号', width: '160px', align: 'center'},
    {prop: 'taxSubject', label: '税金科目', width: '120px', align: 'center'},
  ];
  const soInvoiceType = [//发票类型
    {value: 73100005, label: "标准发票", type: false},
    {value: 73100010, label: "取消发票", type: true},
    {value: 73100015, label: "退货发票-标准", type: false},
    {value: 73100020, label: "退货发票-标准取消", type: true},
//    {value: 73100025, label: "事后借记", type: false},
//    {value: 73100030, label: "事后贷记", type: false}
  ];
  const soType = [//销售类型
    {value: 72700010, label: "国内销售"},
    {value: 72700020, label: "进口销售"},
    {value: 72700030, label: "出口销售"},
    {value: 72700040, label: "样品销售"}
  ];
  const packType = [
    {value: 71350010, label: '编织袋'},
    {value: 71350020, label: '中性编织袋'},
    {value: 71350030, label: '纸箱'},
    {value: 71350040, label: '托盘'},
    {value: 71350050, label: '其他'},
  ];
  export default {
    components: {CurrencySelect, SalesInvoiceDialog, StaffSelect},
    data(){
      return {
        operateFlg: true,
        goodsName: '',
        soType: soType,
        packType: packType,
        soInvoiceType: soInvoiceType,
        headers: headers,
        list: [],
        value4: "",
        currentPage: 2,
        deleteCellData: [],
        dataForPage: {},
        pageState: true,
        activeName: 'first',
        goodsIndex: '',
        currencyName: '',
        rateCurrency: '',//汇率
        rules: {
          soInvoiceType: [{type: 'number', required: true, message: ' ', trigger: 'change'}],//发票类型
          extInvoiceNo: [{required: true, message: ' ', trigger: 'blur'}],//发票外部编号
//          soType:[{ required: true, message:' ', trigger: 'change' }],//销售类型
          invoiceDate: [{type: 'date', required: true, message: ' ', trigger: 'blur'}],//开票日期
          rateCurrency: [{required: true, message: ' ', trigger: 'input'}],//汇率
          currencyName: [{required: true, message: ' ', trigger: 'change'}],//币别
        },
        deleteCellDataId: [],
        dialogShow: false,
        queryDialogData: {
          soInvoiceType: '',
          manageSubName: '',
          manageSubCode: '',
          manageSubId: '',
          currencyName: '',
          currencyCode: '',
          currencyId: '',
          bizOrgName: '',
          bizOrgCode: '',
          bizOrgId: '',
        },
        addItemTable: '',   //增行所在表格
        addItemFlg: false,   //是否增行标志
        checked:false,
      }
    },
    filters: {
      companyFilter(val) {
        if (val) {
          val.toString();
        }
        return ENUMS['7135'][val];
      },
    },
    created(){
      let dataId = this.$store.getters.params.SalesInvoice;
      this.getDataMain(dataId.soInvoiceId);//查询数据
      this.operateFlg = true;
    },
    updated() {
      this.$nextTick(() => {
        //添加时  &&  列表已经创建
        if (this.addItemFlg && this.$refs[this.addItemTable].$el.querySelector(".el-table__body-wrapper")) {
          // 滚动条 焦点到达底部
          this.$refs[this.addItemTable].$el.querySelector(".el-table__body-wrapper").scrollTop = this.$refs[this.addItemTable].$el.querySelector(".el-table__body-wrapper").scrollHeight;
          // 添加结束
          this.addItemFlg = false;
        }
      });
    },
    computed: {
      invoiceQty(){
        let [vm, invoiceQty] = [this, null];
        vm.list.forEach((o, i) => {
          if (!o.invoiceQty) {
            o.invoiceQty = 0
          }
          invoiceQty += Number(o.invoiceQty)
        });
        return invoiceQty;
      },
      //原币含税金额
      orginAmtTexTotal(){
        let [vm, orginAmtTex] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.orginAmtTex) {
            o.orginAmtTex = 0
          }
          orginAmtTex += Number(o.orginAmtTex)
        });
        return orginAmtTex;
      },
      //原币税前金额
      orginAmtTotal(){
        let [vm, orginAmt] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.orginAmt) {
            o.orginAmt = 0
          }
          orginAmt += Number(o.orginAmt)
        });
        return orginAmt;
      },
      //原币税额
      orginTexAmtTotal(){
        let [vm, orginTexAmt] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.orginTexAmt) {
            o.orginTexAmt = 0
          }
          orginTexAmt += Number(o.orginTexAmt)
        });
        return orginTexAmt;
      },
      //本币含税金额
      baseAmtTexTotal(){
        let [vm, baseAmtTex] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.baseAmtTex) {
            o.baseAmtTex = 0
          }
          baseAmtTex += Number(o.baseAmtTex)
        });
        return baseAmtTex;
      },
      //本币税前金额
      baseAmtTotal(){
        let [vm, baseAmt] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.baseAmt) {
            o.baseAmt = 0
          }
          baseAmt += Number(o.baseAmt)
        });
        return baseAmt;
      },
      //本币税额
      baseTexAmtTotal(){
        let [vm, baseTexAmt] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.baseTexAmt) {
            o.baseTexAmt = 0
          }
          baseTexAmt += Number(o.baseTexAmt)
        });
        return baseTexAmt;
      },
    },
    methods: {
      //价格计算
      //价格计算--延迟防止v-number-only
      setPriceMoney(row){
        setTimeout(() => {
          this.calculateOrderDatail(row);
        }, 10);
      },
      setAmtTexBlurIpt(row){
        setTimeout(() => {
          this.amtTexBlurIpt(row);
        }, 10);
      },
      // [输入含稅单价、数量、税率时]
      calculateOrderDatail(row){
        //原币金额(含税)=数量*含税单价
        //orginAmtTex(含税)=invoiceQty*invoicePriceTex
        //税额=(数量*含税单价)/(1+税率）税率
        //orginTexAmt=(invoiceQty*invoicePriceTex)/(1+texRate)/texRate
        //税前金额=数量*含税单价-(数量*含税单价)/(1+税率)税率
        //orginAmt=(invoiceQty*invoicePriceTex)-(invoiceQty*invoicePriceTex)/(1+texRate)/texRate
        //无税单价=(数量*含税单价-数量*单价/(1+税率)*税率)数量
        //invoicePrice=((invoiceQty*invoicePriceTex)-invoiceQty*invoicePriceTex/(1+texRate)/texRate)invoiceQty
        if(row.invoicePriceTex && row.invoiceQty && row.texRate){
          var caculer = calculateOrderDatail({"priceTex":row.invoicePriceTex, 'num': row.invoiceQty, "texRate": row.texRate});
          row.orginTexAmt = caculer.texAmt;//税额
          row.orginAmt = caculer.amt;//税前金额
          row.invoicePrice = caculer.price;//无税单价
          row.orginAmtTex = caculer.amtTex;//含税金额
        }
      },
      // [输入含税金额时]
      amtTexBlurIpt(row){//含税金额
        if(row.invoiceQty && row.orginAmtTex){
          var getInfo = amtTexBlur({"amtTex":row.orginAmtTex,"texRate":row.texRate,'num':row.invoiceQty});
          row.orginTexAmt = getInfo.texAmt;//税额
          row.orginAmt = getInfo.amt;//税前金额
          row.invoicePriceTex = getInfo.priceTex;//含税单价
          row.invoicePrice = getInfo.price;//无税单价
        }
      },
      //价格计算
      getBuyerName(val) {//业务员
        if (val) {
          this.dataForPage.buyerName = val.userName;
          this.dataForPage.buyerCode = val.userCode;
          this.dataForPage.buyerId = val.userId;
        } else {
          this.dataForPage.buyerName = '';
          this.dataForPage.buyerCode = '';
          this.dataForPage.buyerId = '';
        }
      },
      decimalTwo(){
        if (this.dataForPage.rateCurrency && this.dataForPage.rateCurrency != 0 && this.dataForPage.rateCurrency <= 1) {

          this.dataForPage.rateCurrency = (Number(this.dataForPage.rateCurrency)).toFixed(8)
        } else {
          this.dataForPage.rateCurrency = '';
          this.$message({
            type: 'warning',
            message: "汇率介于0和1之间"
          })
        }
      },
      closeDialogPurchase(){
        this.dialogShow = false;
      },
      //增行
      chooseSales(valData){
        let [soInvoiceDtlRowNo, vm] = [1, this];
        if (this.list.length >= 1) {
          soInvoiceDtlRowNo = this.list[this.list.length - 1].soInvoiceDtlRowNo + 1
        }
        //
        if (valData.length) {
          valData.forEach((o, i) => {
            var data = {'invoiceQty': '',version:0,orginAmt:0};
            if (o.soContractNo) {
              data.costAmt=o.costPrice;
              data.seriesId=o.seriesId;
              data.soOsDtlRowNo=o.osDtlRowNo;
              data.soInvoiceDtlRowNo=soInvoiceDtlRowNo;
              data.soRoNo=o.soOsNo;
              data.taxSubject=null;
              data.bizOrgName=o.bizOrgName;
              data.bizOrgId=o.bizOrgId;
              data.bizOrgCode=o.bizOrgCode;
              data.soDtlId=o.soDtlId;
              data.goodsCode=o.goodsCode;
              data.goodsName=o.goodsName;
              data.goodsId=o.goodsId;
              data.soNo=o.soNo;
              data.soContractNo=o.soContractNo;
              data.seriesNo=o.seriesNo;
              data.orginAmtTex=o.orginAmtTex;
              data.texRate=o.texRate;
              data.packType=o.packType;
              data.orginTexAmt=o.orginTexAmt;
              data.soDtlRowNo=o.soDtlRowNo;
              data.invoicePrice=o.orginPrice;
              data.soOsDtlId=o.osDtlId;
              data.remark=o.remark;
              data.soInvoiceDtlId=null;
              vm.list.push(data);
            } else {
            }
          });
        } else {
          //双击单选
          var data = {'invoiceQty': '',version:0,orginAmt:0};
          if (valData.soContractNo) {
            data.costAmt=valData.costPrice;
            data.seriesId=valData.seriesId;
            data.soOsDtlRowNo=valData.osDtlRowNo;
            data.soInvoiceDtlRowNo=soInvoiceDtlRowNo;
            data.soRoNo=valData.soOsNo;
            data.taxSubject=null;
            data.bizOrgName=valData.bizOrgName;
            data.bizOrgId=valData.bizOrgId;
            data.bizOrgCode=valData.bizOrgCode;
            data.soDtlId=valData.soDtlId;
            data.goodsCode=valData.goodsCode;
            data.goodsName=valData.goodsName;
            data.goodsId=valData.goodsId;
            data.soNo=valData.soNo;
            data.soContractNo=valData.soContractNo;
            data.seriesNo=valData.seriesNo;
            data.orginAmtTex=valData.orginAmtTex;
            data.texRate=valData.texRate;
            data.packType=valData.packType;
            data.orginTexAmt=valData.orginTexAmt;
            data.soDtlRowNo=valData.soDtlRowNo;
            data.invoicePrice=valData.orginPrice;
            data.soOsDtlId=valData.osDtlId;
            data.remark=valData.remark;
            data.soInvoiceDtlId=null;
            this.list.push(data)
          } else {
          }
        }
        this.addItemFlg = true;
        this.addItemTable = 'firstTable';
      },
      //创建
      showDialog(){
        if(createPrompt(this.dataForPage,'invoice')){
          this.dialogShow = true;
          this.queryDialogData.soInvoiceType = this.dataForPage.soInvoiceType;
          this.queryDialogData.manageSubName = this.dataForPage.manageSubName;//主体
          this.queryDialogData.manageSubCode = this.dataForPage.manageSubCode;
          this.queryDialogData.manageSubId = this.dataForPage.manageSubId;
          this.queryDialogData.currencyName = this.dataForPage.currencyName;//币别
          this.queryDialogData.currencyCode = this.dataForPage.currencyCode;
          this.queryDialogData.currencyId = this.dataForPage.currencyId;
          this.queryDialogData.bizOrgName = this.dataForPage.bizOrgName;//部门
          this.queryDialogData.bizOrgCode = this.dataForPage.bizOrgCode;
          this.queryDialogData.bizOrgId = this.dataForPage.bizOrgId;
        } else {
          this.$message({
            type: 'warning',
            message: "请选择发票类型"
          })
        }
      },
      submitForm(formName) {
        let vm = this;
        if (typeof (this.dataForPage.invoiceDate) == 'number') {
          this.dataForPage.invoiceDate = new Date(this.dataForPage.invoiceDate)
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (vm.list.length > 0) {
              this.$confirm('是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.exChangeData()
//                  this.$message({
//                    type: 'success',
//                    message: '删除成功!'
//                  });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消保存'
                });
              });
//              this.exChangeData();
            } else {
              vm.$message({
                type: "warning",
                message: "至少保留一条明细"
              })
            }
          } else {
            this.$message({
              type:"warning",
              message:"请完善必填字段"
            })
          }
        });
      },
      childEventHandlerCurrency(val) {//币别
        if (val) {
          this.dataForPage.currencyName = val.currencyShortname;
          this.dataForPage.currencyId = val.currencyId;
          this.dataForPage.currencyCode = val.currencyCode;
          this.rateCurrency = val.exchangeRate.toFixed(8);
//          this.$refs['ruleForm'].validateField('currencyName');
        } else {
          this.dataForPage.currencyName = '';
          this.dataForPage.currencyId = '';
          this.dataForPage.currencyCode = '';
          this.rateCurrency = '';
        }
      },
      childEventHandlerGoods(val) {//物料
        let vm = this;
        if (val) {
          vm.list.forEach((o, i) => {
            if (o.$index == this.goodsIndex) {
              o.goodsName = val.goodsName;
              o.goodsCode = val.goodsCode;
              o.goodsId = val.goodsId;
            }
          })
        } else {
          this.goodsName = '';
        }
      },

      handleClick(){
      },

      toSave(text){
        if (text == 'yes') {//保存
          this.submitForm("formFirst")
        } else {//取消
          this.$store.dispatch('toggleCurrentView', {
            SalesInvoice: {
              view: 'index'
            }
          });
        }
      },
      exChangeData(){
        let vm = this;
        vm.operateFlg = false;
        vm.list.forEach((o, i) => {
          delete o.$index;
        });
        if (this.dataForPage.invoiceDate != '' && this.dataForPage.invoiceDate != null) {
          this.dataForPage.invoiceDate = this.dataForPage.invoiceDate.parseTime('YYYY-MM-DD');
        } else {
          this.dataForPage.invoiceDate = '';
        }
//        vm.dataForPage.rateCurrency=vm.rateCurrency;//汇率
        let queryData = vm.dataForPage;
        //汇总数据
        queryData.baseAmtTex = vm.baseAmtTexTotal;//本币含税金额
        queryData.baseAmt = vm.baseAmtTotal;//本币税前金额
        queryData.baseTexAmt = vm.baseTexAmtTotal;//本币税额
        queryData.orginAmtTex = vm.orginAmtTexTotal;//原币含税金额
        queryData.orginAmt = vm.orginAmtTotal;//原币税前金额
        queryData.orginTexAmt = vm.orginTexAmtTotal;//原币税额
        queryData.invoiceQty = vm.invoiceQty;//原币税额
        queryData.codSoInvoiceCusList = vm.list;
        queryData.deleteIdList = vm.deleteCellDataId;//删除数据
        doModify(queryData).then(response => {
          if (response.data.status == '1') {
            vm.operateFlg = true;
            vm.$notify({
              title: '成功',
              type: 'success',
              message: '修改成功'
            });
            this.$store.dispatch('toggleCurrentView', {
              SalesInvoice: {
                view: 'index'
              }
            });
          }else{
            vm.operateFlg = true;
          }
        })
      },
      //表格点击
      handleCellClick(row){
        this.goodsIndex = row.$index;
        this.goodsName = row.goodsName;
      },
      handleSelectionChange(val){
        this.deleteCellData = val;
      },
      //tab点击
      handleClick(){

      },
      //分页
      handleSizeChange(val){
//        console.log(val, "handleSizeChange=>val")
      },
      handleCurrentChange(val){
//        console.log('val=>handleCurrentChange', val)
      },
      //删除
      deleteCell2(){
        let data = [];
        let vm = this;
        vm.deleteCellDataId = [];
        for (var i = 0; i < this.list.length; i++) {
          for (var j = 0; j < this.deleteCellData.length; j++) {
            if (this.deleteCellData[j] == this.list[i]) {
              data[j] = this.deleteCellData[j];
              this.list.splice(i, 1);
              i--;
            }
          }
        }
        data.forEach((o, i) => {
          vm.deleteCellDataId.push(o.soInvoiceDtlId)
        });
      },
      deleteCell(){
        if(this.deleteCellData.length<=0){
          this.$message({
            type: 'info',
            message: '请选择删除数据'
          });
        }else{
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteCell2();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },

      //查询数据
      getDataMain(val){
        doQueryModified(val).then(response => {
          if (response.data.status == '1') {
            this.list = [];
            let vm = this;
            let codSoInvoiceDtlCusList = response.data.data.codSoInvoiceDtlCusList;
            let data = response.data.data;
            this.currencyName = data.currencyName;//默认显示
            this.rateCurrency = data.rateCurrency;//默认显示
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
                  bizOrgCode:o.bizOrgCode,
                  bizOrgId:o.bizOrgId,
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
                  version:o.version,
                  soInvoiceDtlId:o.soInvoiceDtlId,
                })
              });
              vm.dataForPage = {
                'soInvoiceId': data.soInvoiceId,
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
                'version': data.version,
                'currencyName': data.currencyName,
                'currencyCode': data.currencyCode,
                'currencyId': data.currencyId,
                'rateCurrency': data.rateCurrency.toFixed(8),
                //汇总-计算的
//                'baseAmtTex': data.baseAmtTex,
//                'baseTexAmt': data.baseTexAmt,
//                'baseAmt': data.baseAmt,
//                'orginAmtTex': data.orginAmtTex,//原币含税金额
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
                'credenIden': data.credenIden + '',
                'credenNo': data.credenNo,
                'failReason': data.failReason,
                //其他
                'salesInvoiceStatus': data.salesInvoiceStatus + '',
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
    },

//    mounted(){//不及时
//        console.log("地址栏参数=>挂载数据",this.$route.query)
//    },
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
