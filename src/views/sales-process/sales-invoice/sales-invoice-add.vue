<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="primary" size="small" @click="toSave('yes')" :disabled="!operateFlg">保 存</el-button>
      <el-button type="info" size="small" @click="toSave('no')">取 消</el-button>
    </div>
    <div class="elTabs info">
      <div style="padding-bottom: 10px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="first">
            <el-form ref="formFirst" label-width="90px" :model="tempAll" :rules="rules">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="发票单据号" prop="soInvoiceNo">
                    <el-input v-model="tempAll.soInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="开票数量" prop="invoiceQty">
                    <el-input v-model="invoiceQty" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="汇率" prop="rateCurrency">
                    <el-input v-model="tempAll.rateCurrency" size="mini" v-number-only:1.abs="8"
                              @blur="decimalTwo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票类型" prop="soInvoiceType">
                    <el-select v-model="tempAll.soInvoiceType" placeholder="请选择" size="mini">
                      <el-option label="标准发票" value="73100005"></el-option>
                      <el-option label="取消发票" value="73100010" disabled></el-option>
                      <el-option label="退货发票-标准" value="73100015"></el-option>
                      <el-option label="退货发票-标准取消" value="73100020" disabled></el-option>
                      <!--<el-option label="事后借记" value="73100025"></el-option>-->
                      <!--<el-option label="事后贷记" value="73100030"></el-option>-->
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <management-subject @childevent="childEventHandlerMainInfo"
                                        :querySelect="manageSubName" ref="managePage"></management-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" prop="bizOrgName">
                    <department-select @childevent="childEventHandlerDepartment"
                                       :querySelect="bizOrgName" ref="bizOrgNamePage"
                                       :transferSearch="transferSearchDepartment"
                                       :disabled='isHaveManage'></department-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户" prop="customerName">
                    <customer-select @childevent="childEventHandlerCustomer" :querySelect="customerName"
                                     :transferSearch="transferSearchDepartment" :disabled='isHaveManage'
                                     ref="customerNamePage"></customer-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票外部编号" prop="extInvoiceNo">
                    <el-input v-model="tempAll.extInvoiceNo" size="mini">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="开票日期" prop="invoiceDate">
                    <el-date-picker v-model="tempAll.invoiceDate" type="date"
                                    size="mini" :editable="false"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务员" prop="buyerName">
                    <staff-select @childevent="getBuyerName" :querySelect="buyerName"
                                  ref="buyerNamePage"></staff-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!--todo-->
                  <el-form-item label="销售类型" prop="soType">
                    <el-select v-model="tempAll.soType" placeholder="请选择" size="mini">
                      <el-option label="国内销售" value="72700010"></el-option>
                      <el-option label="进口销售" value="72700020"></el-option>
                      <el-option label="出口销售" value="72700030"></el-option>
                      <el-option label="样品销售" value="72700040"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别" prop="currencyName">
                    <currency-select @childevent="childEventHandlerCurrency"></currency-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="备注" prop="remark" class="elColWidth24">
                    <el-input v-model="tempAll.remark" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发票状态" prop="salesInvoiceStatus">
                    <el-select v-model="tempAll.salesInvoiceStatus" placeholder="请选择" size="mini" disabled>
                      <el-option label="保存" value="71150010"></el-option>
                      <el-option label="已提交" value="71150020"></el-option>
                      <el-option label="已过账" value="71150030"></el-option>
                      <el-option label="已驳回" value="71150040"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="汇总信息" name="second">
            <el-form ref="form" label-width="80px" :model="tempAll">
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
            <el-form ref="form" label-width="80px" :model="tempAll">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="开票方编码" prop="invoiceCode">
                    <el-input v-model="tempAll.invoiceCode" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话号码" prop="invoiceTel">
                    <el-input v-model="tempAll.invoiceTel" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label='纳税识别号' prop="taxNo">
                    <el-input v-model="tempAll.taxNo" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="银行账号" prop="bankAccount">
                    <el-input v-model="tempAll.bankAccount" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开户银行名称" prop="bankName">
                    <el-input v-model="tempAll.bankName" size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="地址" prop="invoiceAddress">
                    <el-input v-model="tempAll.invoiceAddress" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="凭证信息" name="fourth">
            <el-form ref="form" label-width="80px" :model="tempAll">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="凭证标识" prop="credenIden">
                    <el-select v-model="tempAll.credenIden" placeholder="请选择" size="mini" disabled>
                      <el-option label="凭证未操作" value="72400010"></el-option>
                      <el-option label="凭证未过账" value="72400020"></el-option>
                      <el-option label="凭证已过账" value="72400030"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="凭证过账编号" prop="credenNo">
                    <el-input v-model="tempAll.credenNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="推送失败原因" prop="failReason">
                    <!-- type="textarea"-->
                    <el-input v-model="tempAll.failReason" disabled size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="其他信息" name="fifth">
            <el-form ref="form" label-width="80px" :model="tempAll">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="取消发票日期" prop="cancelInvoiceDate">
                    <el-date-picker disabled v-model="tempAll.cancelInvoiceDate" type="date"
                                    size="mini" :editable="false"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="取消发票编号" prop="cancelInvoiceNo">
                    <el-input v-model="tempAll.cancelInvoiceNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="" prop="name">
                    <el-checkbox disabled>被取消</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="sixth">
            <el-form ref="form" label-width="80px" :model="tempAll" style="margin-top:16px">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-col :span="18">
                      <el-input v-model="tempAll.createdBy" size="mini" :disabled="true"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改人" prop="name">
                    <el-col :span="18">
                      <el-input v-model="tempAll.code" size="mini" :disabled="true"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="code">
                    <el-col :span="18">
                      <el-input v-model="tempAll.code" size="mini" :disabled="true"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-col :span="18">
                      <el-date-picker v-model="tempAll.createdTime" type="datetime" size="mini"
                                      disabled></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-col :span="18">
                      <el-date-picker v-model="tempAll.updatedTime" type="datetime" size="mini"
                                      disabled></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="postDate">
                    <el-col :span="18">
                      <el-date-picker v-model="tempAll.postDate" type="datetime" size="mini"
                                      disabled></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="small" @click="showDialog">创 建</el-button>
      <el-button type="warning" size="mini" icon="el-icon-delete" plain @click="deleteCell">删 除</el-button>
    </div>
    <div>
      <common-table
        ref="firstTable"
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @row-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'companyFilter'">
            <span>{{list[scope.index]['packType'] | companyFilter}}</span>
          </div>
        </template>
        <!--<template slot-scope="scope" slot="default">-->
          <!--<div v-if="scope.text == 'select'">-->
            <!--<el-select v-model="list[scope.index]['packType']" clearable placeholder="请选择" size="mini">-->
              <!--<el-option-->
                <!--v-for="item in packType"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
        <!--</template>-->
        <template slot-scope="scope" slot="default">
          <div v-if="scope.text =='texRate'">
            <!--税率 calculateOrderDatail-->
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['texRate']" @input="setPriceMoney(list[scope.index])"
                      size="mini"></el-input>
          </div>
          <div v-if="scope.text =='orginAmtTex'">
            <!--原币金额 amtTexBlur-->
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['orginAmtTex']" @input="amtTexBlurIpt(list[scope.index])"
                      size="mini"></el-input>
          </div>
          <div v-if="scope.text =='invoicePriceTex'">
            <!--单价 calculateOrderDatail-->
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['invoicePriceTex']" @input="setPriceMoney(list[scope.index])"
                      size="mini"></el-input>
          </div>
          <div v-if="scope.text =='invoiceQty'">
            <!--数量 calculateOrderDatail-->
            <el-input v-number-only:10.abs="2" v-model="list[scope.index]['invoiceQty']" @input="setPriceMoney(list[scope.index])"
                      size="mini"></el-input>
          </div>
        </template>

      </common-table>
    </div>
    <!--创建-->
    <sales-invoice-dialog :dialogShow="dialogShow" @closeDialogPurchase="closeDialogPurchase" @choosePurse="chooseSales"
                          :queryDialog="queryDialogData"></sales-invoice-dialog>
  </div>
</template>
<script type="text/javascript">
  import {pickerOptions,calculateOrderDatail , amtTexBlur, } from '@/util'
  import {createPrompt } from '@/api/sales-process/sales-invoice/sales-invoice'
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
  import SalesInvoiceDialog from './sales-invoice-dialog.vue' //创建弹框
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //客户
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员


  //接口引用
  import {
    doSave,
  } from '@/api/sales-process/sales-invoice/sales-invoice'

  const headers = [
    {type: 'selection', width: '55px', fixed: "left"},
    {prop: 'soInvoiceDtlRowNo', type: 'index', label: '行号', fixed: "left", width: '55px', align: 'center'},
    {prop: 'soContractNo', label: '销售合同号', width: '160px', align: 'center'},
    {prop: 'goodsCode', label: '物料编号', width: '120px', editable: false, align: 'center'},//没有的
    {prop: 'goodsName', label: '物料描述', template: 'goodsName', width: '210px', align: 'center'},
    {prop: 'invoiceQty', label: '开票数量', width: '120px',template:'invoiceQty',align: 'center'},
    {prop: 'packType', label: '包装方式', width: '120px',  filter: 'companyFilter', align: 'center'},
    {prop: 'invoicePriceTex', label: '原币单价(含税)', width: '120px',template:'invoicePriceTex', align: 'center', digit: '6'},
    {prop: 'invoicePrice', label: '原币单价(不含税)', width: '120px', align: 'center', digit: '6'},
    {prop: 'orginAmtTex', label: '原币金额', width: '120px',template:'orginAmtTex', align: 'center', digit: '2'},
    {prop: 'orginAmt', label: '原币税前金额', width: '120px', align: 'center', digit: '2'},
    {prop: 'texRate', label: '税率', width: '120px',template:'texRate', align: 'center', digit: '2'},
    {prop: 'orginTexAmt', label: '原币税额', width: '120px', align: 'center', digit: '2'},
    {prop: 'costAmt', label: '成本', width: '120px', align: 'center'},
    {prop: 'remark', label: '备注', width: '120px', editable: true, align: 'center'},
    {prop: 'seriesNo', label: '批次', width: '120px', align: 'center'},
    {prop: 'bizOrgName', label: '部门名称', width: '120px', align: 'center'},
    {prop: 'soNo', label: '销售单号', width: '160px', align: 'center'},
    {prop: 'soDtlRowNo', label: '销售单行号', width: '160px', align: 'center'},
    {prop: 'soOsDtlRowNo', label: '交货单行号', width: '160px', align: 'center'},
    {prop: 'soRoNo', label: '交货单号', width: '160px', align: 'center'},
    {prop: 'taxSubject', label: '税金科目', width: '120px', align: 'center'},
  ];
  const packType = [
    {value: '71350010', label: '编织袋'},
    {value: '71350020', label: '中性编织袋'},
    {value: '71350030', label: '纸箱'},
    {value: '71350040', label: '托盘'},
    {value: '71350050', label: '其他'},
  ];

  //todo 销售合同号
  export default {
    components: {CurrencySelect, ManagementSubject, SalesInvoiceDialog, DepartmentSelect, CustomerSelect, StaffSelect},
    data(){
      return {
        operateFlg:true,
        packType: packType,
        headers: headers,
        list: [],
        currentPage: 2,
        deleteCellData: [],
        dataForPage: [],
        pageState: true,
        tempAll: {
          rateCurrency: ''
        },
        activeName: 'first',
        goodsName: '',
        goodsIndex: '',
        currencyName: '',
        manageSubName: '',
        rules: {
          soInvoiceType: [{required: true, message: ' ', trigger: 'change'}],//发票类型
          extInvoiceNo: [{required: true, message: ' ', trigger: 'blur'}],//发票外部编号
          soType: [{required: true, message: ' ', trigger: 'change'}],//销售类型
          invoiceDate: [{type: 'date', required: true, message: ' ', trigger: 'blur'}],//开票日期
          rateCurrency: [{required: true, message: ' ', trigger: 'input'}],//汇率
          manageSubName: [{required: true, message: ' ', trigger: 'input'}],
          currencyName: [{required: true, message: ' ', trigger: 'change'}],
          bizOrgName: [{required: true, message: ' ', trigger: 'change'}],
          customerName: [{required: true, message: ' ', trigger: 'change'}],
        },
        dialogShow: false,
        queryDialogData: {
          soInvoiceType: '',
          manageSubName: '',
          manageSubCode: '',
          manageSubId: '',
          currencyName: '',
          currencyCode: '',
          currencyId: '',
          bizOrgName:'',
          bizOrgCode:'',
          bizOrgId:'',
        },
        transferSearchDepartment: {
          companyName: "",
          companyId: "",
          companyCode: "",
          boolToBtn: true,
        },
        bizOrgName: '',
        isHaveManage: true,
        customerName: '',
        buyerName: '',
        addItemTable: '',   //增行所在表格
        addItemFlg: false,   //是否增行标志
      }
    },
    created(){
      this.list = [];
      this.tempAll = {
        rateCurrency: '',
        bizOrgId:'',
        currencyId:'',
        manageSubId:'',
        soInvoiceType:'',
      };
      this.tempAll.salesInvoiceStatus = '71150010';//默认保存
      this.tempAll.credenIden = '72400010';//默认保存
      this.operateFlg=true;
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
    filters: {
      companyFilter(val) {
        if (val) {
          val.toString();
        }
        return ENUMS['7135'][val];
      },
    },

    computed: {
      invoiceQty(){
        let [vm, invoiceQty] = [this, 0];
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
      decimalTwo(){
        if (this.tempAll.rateCurrency && this.tempAll.rateCurrency != 0 && this.tempAll.rateCurrency <= 1) {
          this.tempAll.rateCurrency = (Number(this.tempAll.rateCurrency)).toFixed(8)
        } else {
          this.tempAll.rateCurrency = '';
          this.$message({
            type: 'warning',
            message: "汇率介于0和1之间"
          })
        }
      },
      childEventHandlerCustomer(val) { //客户
        if (val) {
          this.tempAll.customerName = val.custName;
          this.tempAll.customerCode = val.custCode;
          this.tempAll.customerId = val.id;
          this.$refs['formFirst'].validateField('customerName');
        } else {
          this.tempAll.customerName = '';
          this.tempAll.customerCode = '';
          this.tempAll.customerId = '';
        }
      },
      getBuyerName(val) {//业务员
        if (val) {
          this.tempAll.buyerName = val.userName;
          this.tempAll.buyerCode = val.userCode;
          this.tempAll.buyerId = val.userId;
        } else {
          this.tempAll.buyerName = '';
          this.tempAll.buyerCode = '';
          this.tempAll.buyerId = '';
        }
      },
      //部门
      childEventHandlerDepartment(data){
        if (data) {
          this.tempAll.bizOrgName = data.orgName;
          this.tempAll.bizOrgId = data.orgId;
          this.tempAll.bizOrgCode = data.orgCode;
        } else {
          this.tempAll.bizOrgName = '';
          this.tempAll.bizOrgId = '';
          this.tempAll.bizOrgCode = '';
        }
        this.$refs['formFirst'].validateField('bizOrgName');
      },
      //选择增行
      chooseSales(valData){
          let vm=this;
        let soInvoiceDtlRowNo = 1;
        if (this.list.length >= 1) {
          soInvoiceDtlRowNo = this.list[this.list.length - 1].soInvoiceDtlRowNo + 1
        }
        if (valData.length) {
          valData.forEach((o, i) => {
            var data = {'invoiceQty': 0,version:0,'orginAmt':0};
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
              vm.list.push(data);
            } else {
            }
          });
        } else {
          //双击单选
          var data = {'invoiceQty': 0,'version':0,'orginAmt':0};
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
            this.list.push(data)
          } else {
          }
        }
        this.addItemFlg = true;
        this.addItemTable = 'firstTable';
      },
      //创建
      showDialog(){
        if(createPrompt(this.tempAll,'invoice')){
          this.dialogShow = true;
          this.queryDialogData.soInvoiceType = this.tempAll.soInvoiceType;
          this.queryDialogData.manageSubName = this.tempAll.manageSubName;//主体
          this.queryDialogData.manageSubCode = this.tempAll.manageSubCode;
          this.queryDialogData.manageSubId = this.tempAll.manageSubId;
          this.queryDialogData.currencyName = this.tempAll.currencyName;//币别
          this.queryDialogData.currencyCode = this.tempAll.currencyCode;
          this.queryDialogData.currencyId = this.tempAll.currencyId;
          this.queryDialogData.bizOrgName = this.tempAll.bizOrgName;//部门
          this.queryDialogData.bizOrgCode = this.tempAll.bizOrgCode;
          this.queryDialogData.bizOrgId = this.tempAll.bizOrgId;
        }
      },
      closeDialogPurchase(){
        this.dialogShow = false;
      },
      //经营主体
      childEventHandlerMainInfo(data){
        if (data) {
          this.tempAll.manageSubId = data.companyId;
          this.tempAll.manageSubCode = data.companyCode;
          this.tempAll.manageSubName = data.companyName;
          this.transferSearchDepartment.companyName = data.companyName;
          this.transferSearchDepartment.companyId = data.companyId;
          this.transferSearchDepartment.companyCode = data.companyCode;
          this.isHaveManage = false;
          this.$refs['formFirst'].validateField('manageSubName');
        } else {
          this.tempAll.manageSubId = '';
          this.tempAll.manageSubCode = '';
          this.tempAll.manageSubName = '';
          this.transferSearchDepartment.companyName = '';
          this.transferSearchDepartment.companyId = '';
          this.transferSearchDepartment.companyCode = '';
          this.isHaveManage = true;
        }
        this.$refs.bizOrgNamePage.clearCustomer();
        this.$refs.customerNamePage.clearCustomer();
      },
      childEventHandlerCurrency(val){//币别
        let vm = this;
        if (val) {
          this.tempAll.currencyId = val.currencyId;//币别id
          this.tempAll.currencyCode = val.currencyCode;//币别code
          this.tempAll.currencyName = val.currencyName;//币别name
          this.tempAll.rateCurrency = val.exchangeRate.toFixed(8);//汇率
          this.$refs['formFirst'].validateField('rateCurrency');
          this.$refs['formFirst'].validateField('currencyName');
        } else {
          this.tempAll.currencyId = '';
          this.tempAll.currencyCode = '';
          this.tempAll.currencyName = '';
          this.tempAll.rateCurrency = '';
        }
      },
      handleClick(){
      },
      toSave(text){
        if (text == 'yes') {//保存
          this.submitForm('formFirst');
        } else {//取消
          this.$store.dispatch('toggleCurrentView', {
            SalesInvoice: {
              view: 'index'
            }
          });
        }
      },
      submitForm(formName) {
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            this.table();//通过调用tale验证
            if (vm.list.length > 0) {
              this.$confirm('是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.getListData()
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
//              this.getListData();
            } else {
              vm.$message({
                type: "warning",
                message: "请添加明细"
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
      //表格点击
      handleCellClick(row){
        this.goodsIndex = row.$index;
        console.log(this.goodsIndex, "index");
      },
      handleSelectionChange(val){
        this.deleteCellData = val;
        console.log(this.deleteCellData, "<=删除数据")
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
      //删除
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
            for (var i = 0; i < this.list.length; i++) {
              for (var j = 0; j < this.deleteCellData.length; j++) {
                if (this.deleteCellData[j] == this.list[i]) {
                  this.list.splice(i, 1);
                  i--;
                }
              }
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      //子页面方法
      methodForPage(val){
        console.log(val, "<=子页面数据")
      },
      getListData(){
        let vm = this;
        vm.operateFlg=false;
        vm.list.forEach((o, i) => {
          delete o.$index;
        });
        if (this.tempAll.invoiceDate != '' && this.tempAll.invoiceDate != null) {
          this.tempAll.invoiceDate = this.tempAll.invoiceDate.parseTime('YYYY-MM-DD');
        } else {
          this.tempAll.invoiceDate = '';
        }
        this.tempAll.salesInvoiceStatus = '71150010';
        let addData = this.tempAll;
        //汇总数据invoiceQty
        addData.baseAmtTex = vm.baseAmtTexTotal;//本币含税金额
        addData.baseAmt = vm.baseAmtTotal;//本币税前金额
        addData.baseTexAmt = vm.baseTexAmtTotal;//本币税额
        addData.orginAmtTex = vm.orginAmtTexTotal;//原币含税金额
        addData.orginAmt = vm.orginAmtTotal;//原币税前金额
        addData.orginTexAmt = vm.orginTexAmtTotal;//原币税额
        addData.invoiceQty = vm.invoiceQty;//原币税额

        addData.codSoInvoiceCusList = vm.list;
        doSave(addData).then(response => {
          if (response.data.status == '1') {
              vm.operateFlg=true;
            vm.$notify({
              title: '成功',
              type: 'success',
              message: '创建成功'
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
    },
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .elTabs {
    /*height: 260px;*/
  }
</style>
