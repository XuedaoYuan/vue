<template>
    <div id="payment" class="allTemplate">
        <div class="info">
            <el-button type="primary"  size="small" @click="SaveClick">保 存</el-button>
            <el-button type="info" size="small"  @click.native="onClick">取 消</el-button>
            <el-button type="primary" size="small" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
            <el-button type="primary" size="small" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
        </div>
    <el-collapse-transition>
        <div v-show="searchBarFlg">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="抬头数据" name="first">
                    <el-form ref="formData"  label-width="120px" :model="formData" style="height: 190px;" :rules="rules">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="经营主体" prop="companyName">
                                    <management-subject  @childevent = "childEventHandlerMainInfo"  :querySelect="formData.companyName"></management-subject>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="部门" prop="orgName">
                                    <department-select  @childevent = "childEventHandlerDepartment" :querySelect="formData.orgName" :disabled="isDepartment" :transferSearch="transferSearchDepartment"></department-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款类别" prop="payCategory">
                                    <el-select  v-model="formData.payCategory" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in payCategory" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="收款单位" prop="payeeName">
                                    <supplier  @childevent="getChildevent" @getData="getData" :selectName="formData.payeeName" ref="supplierPage"></supplier>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="会计年度" prop="accountingYear">
                                    <el-input v-model="formData.accountingYear" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款申请号" prop="extApplyCode">
                                    <el-input v-model="formData.extApplyCode" disabled size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="银行账号" prop="payBankAccount">
                                    <el-input v-model="formData.payBankAccount" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="款项内容" prop="moneyContent">
                                    <el-select  v-model="formData.moneyContent" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in moneyContent" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="开户银行" prop="payBankAddress">
                                    <el-input v-model="formData.payBankAddress" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款方式" prop="payType">
                                    <el-select  v-model="formData.payType" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in payType" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款类型" prop="paymentType">
                                    <el-select  v-model="formData.paymentType" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in paymentType" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="人民币汇率" prop="rateCurrency">
                                    <el-input v-model="formData.rateCurrency" size="mini" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="申请金额" prop="applyAmt">
                                    <el-input v-model="formData.applyAmt" v-number-only:10.abs="2" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="币别" prop="currencyName">
                                    <currency-Subject @childevent = "currencyNameFill"  :querySelect="formData.currencyName"></currency-Subject>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="申请付款日" prop="applyPayTime">
                                    <el-date-picker  v-model="formData.applyPayTime" :editable="false" type="date" size='mini' placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="实际付款日" prop="actualPayDate">
                                    <el-date-picker  v-model="formData.actualPayDate" :editable="false" type="date" size='mini' placeholder="选择日期"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="本位币汇率" prop="baseCurrencyRate">
                                    <el-input v-model="formData.baseCurrencyRate" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="发送SAP" prop="isSendSap">
                                    <el-input v-model="formData.isSendSap" disabled size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="未付款金额(原币)" prop="unPayedAmt">
                                    <el-input v-model="formData.unPayedAmt" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="OA审核标题" prop="auitTitle">
                                    <el-input v-model="formData.auitTitle" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="状态" prop="applyStatus">
                                    <el-select  v-model="formData.applyStatus" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in applyStatus" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="已付款金额(本位币)" prop="basePayedAmt">
                                    <el-input v-model="formData.basePayedAmt" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="信用证号" prop="creditNo">
                                    <el-input v-model="formData.creditNo" disabled size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="是否提交明细" prop="isCommitDtl">
                                    <el-select  v-model="formData.isCommitDtl" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in isCommitDtl" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="已付款金额(原币)" prop="payedAmt">
                                    <el-input v-model="formData.payedAmt" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="申请付款金额" prop="value4">
                                    <el-input v-model="formData.value4" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="发送短信" prop="isSms">
                                    <el-select  v-model="formData.isSms" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in isSms" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item class="payment" label="申请金额本位币" prop="applyBaseAmt">
                                    <el-input v-model="formData.applyBaseAmt" disabled size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
            <!-- <el-row> -->
              <!-- <el-col :span="12">
                <el-form-item label="供应商信用额度" prop="supplierCreditAmt">
                  <el-input v-model="formData.supplierCreditAmt" disabled size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="已使用付款额度" prop="usedCreditAmt">
                  <el-input v-model="formData.usedCreditAmt" disabled size="mini"></el-input>
                </el-form-item>
              </el-col> -->
            <!-- </el-row> -->
            <!-- <el-row> -->
              <!-- <el-col :span="12">
                <el-form-item class="payment" label="剩余付款额度" prop="leftCreditAmt">
                  <el-input  v-model="formData.leftCreditAmt" disabled size="mini"></el-input>
                </el-form-item>
              </el-col> -->
            <!-- </el-row> -->
                        <el-row>
                            <el-col :span="24">
                                <el-form-item class="payment" label="备注" prop="remark">
                                    <el-input v-model="formData.remark" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
        </el-tab-pane>
            <el-tab-pane label="实际付款信息" name="second">
                <div class="table" style="height: 190px;">
                    <el-button type="warning"  size="mini" @click="addClick('firstTable')">添 加</el-button>
                    <el-button type="warning"  size="mini" @click="deleteClick" icon="el-icon-delete" plain>删 除</el-button>
                    <div class="commonTable" style="margin: 20px 0 20px 0;">
                        <common-table
                            :ref="'firstTable'"
                            :data="tableData2"
                            :maxHeight="180"
                            :fit="true"
                            :headers="header2"
                            @cell-click="handleCellClick2"
                            @selection-change="handleSelectionChange2"
                            >
                            <template slot-scope="scope">
                                <div v-if="scope.text == 'select'">
                                    <el-select v-model="formData.value4" clearable placeholder="请选择">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div v-if="scope.text == 'date'">
                                    <el-date-picker v-model="tableData2[scope.index]['date']" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <div v-if="scope.text == 'input'">
                                    <el-input v-model="tableData2[scope.index]['name']" size="mini"></el-input>
                                </div>
                            </template>
                        </common-table>
                    </div>
                <!--  <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange2"
                      @current-change="handleCurrentChange2"
                      :current-page="listQuery1.currentPage"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="listQuery2.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total2">
                    </el-pagination>
                </div>-->
                </div>
            </el-tab-pane>
            <el-tab-pane label="相关文件" name="third">
                <div style="height: 190px">
                    <div style="margin-bottom:12px;font-size:12px">
                        <span>&nbsp;&nbsp;文件：</span>
                        <el-upload ref="upload" action="" style="display: inline-block" :on-change="handleUploadChange" :auto-upload="false" :show-file-list="false" :file-list="fileList">
                            <el-input slot="trigger" size="mini" type="primary" :value="fileList && fileList.length > 0?fileList[0].name:''">
                            </el-input>
                            <el-button class="orange-btn" type="warning" size="mini" style="margin-left:0px" @click="submitUpload">上传</el-button>
                        </el-upload>
                        <span>文件上传上限20M</span>
                    </div>
                    <el-table
                      :data="tableData3"
                      border highlight-current-row stripe fit header-align="center"
                      @selection-change="handleSelectionChange3"
                      style="width: 100%">
                        <el-table-column
                              prop="index"
                              label="文件操作"  align="center"
                              min-width="100">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="downLoad(scope.row, tableData3)" type="text" size="small">下载</el-button>
                                <el-button @click.native.prevent="deleteRelatedDocsRow(scope.$index, tableData3)" type="text" size="small">移除</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="文件名称"  align="center"
                            min-width="250">
                        </el-table-column>
                        <el-table-column
                        prop="address" min-width="100"  align="center"
                        label="创建人">
                        </el-table-column>
                        <el-table-column
                        prop="time" width="180"  align="center"
                        label="创建时间">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeRelatedDocs"
                        @current-change="handleCurrentRelatedDocs"
                        :current-page="relatedDocsListQuery.currentPage"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="relatedDocsListQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="relatedDocsTotal">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="系统信息" name="fourth">
                <el-form ref="form" label-width="80px" :model="formData2" style="height: 2340px;">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="创建人" prop="createdBy">
                                <el-col :span="18">
                                    <el-input v-model="formData2.createdBy" size="mini" :disabled="true"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修改人" prop="name">
                                <el-col :span="18">
                                    <el-input v-model="formData2.code" size="mini" :disabled="true"></el-input></el-col>
                                </el-form-item>
                            </el-col>
                        <el-col :span="8">
                            <el-form-item label="过账人" prop="code">
                                <el-col :span="18">
                                    <el-input v-model="formData2.code" size="mini" :disabled="true"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-bottom:12px">
                        <el-col :span="8">
                            <el-form-item label="创建时间" prop="createdTime">
                                <el-col :span="18">
                                    <el-input v-model="formData2.createdTime" size="mini" :disabled="true"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="修改时间" prop="name">
                                <el-col :span="18">
                                    <el-input v-model="formData2.name" size="mini" :disabled="true"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="过账时间" prop="name">
                                <el-col :span="18">
                                    <el-input v-model="formData2.name" size="mini" :disabled="true"></el-input>
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
            <el-button type="warning" size="mini" @click="Establish('secondTable')">创 建</el-button>
            <el-button type="warning" size="mini" @click="DeleteClick" icon="el-icon-delete" plain>删 除</el-button>
        </div>
        <common-table
            :ref="'secondTable'"
            :data="tableData1"
            :maxHeight="300"
            :fit="true"
            :headers="header1"
            @cell-click="handleCellClick1"
            @selection-change="handleSelectionChange1"
        >
        <template slot-scope="scope">
            <!--  <div v-if="scope.text == 'createdTime'">
                <el-date-picker v-model="tableData1[scope.index]['createdTime']" size="mini" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
              <div v-if="scope.text == 'updatedTime'">
                <el-date-picker v-model="tableData1[scope.index]['updatedTime']" size="mini" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>-->

            <div v-if="scope.text == 'contractNoS'">
              <el-input v-model="tableData1[scope.index]['contractNoS']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'poSerialNo'">
              <el-input v-model="tableData1[scope.index]['poSerialNo']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'poContractNo'">
              <el-input v-model="tableData1[scope.index]['poContractNo']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'paymentType'">
              <el-input v-model="tableData1[scope.index]['paymentType']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'itemApplyAmt'">
              <el-input v-model="tableData1[scope.index]['itemApplyAmt']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'doNo'">
              <el-input v-model="tableData1[scope.index]['doNo']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'doInvoiceNo'">
              <el-input v-model="tableData1[scope.index]['doInvoiceNo']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'contractAmt'">
              <el-input v-model="tableData1[scope.index]['contractAmt']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'contractAmtHigh'">
              <el-input v-model="tableData1[scope.index]['contractAmtHigh']" size="mini"></el-input>
            </div>
            <div v-if="scope.text == 'remark'">
              <el-input v-model="tableData1[scope.index]['remark']" size="mini"></el-input>
            </div>
        </template>
    </common-table>
</div>
</div>
</template>

<script>
  import router from '@/router'
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
  import currencySubject from '@/components/common-select/currency-select.vue'//币别
  import supplier from '@/components/common-select/supplier.vue'//收款单位

  import {pickerOptions} from '@/util'
  import {
    doQueryPayApplyWithDtl,
    doUpdatePayApply
  } from '@/api/money/purchase-requisition/purchase-requisition'
const header1 = [
    { type: 'selection', width: '55px', fixed: "left"},
    {prop: 'payRowNo', type: 'index',width:'80', label: '行号'},
    {prop: 'contractNoS', label: '框架协议',width:'150',align: 'center',template: 'contractNoS'},
    {prop: 'poSerialNo', label: '采购合同单据号',width:'150',align: 'center',template: 'poSerialNo',required: true },
    {prop: 'poContractNo', label: '采购合同号',width:'150',align: 'center',template: 'poContractNo'},
    {prop: 'canApplyAmt', label: '可申请金额',width:'150',align: 'center',template: 'input'},
    {prop: 'paymentType', label: '付款类型',width:'150',align: 'center',template: 'paymentType'},
    {prop: 'timeType', label: '时间节点',width:'150',align: 'center',template: 'input'},
    {prop: 'itemApplyAmt', label: '申请金额',width:'150',align: 'center',template: 'itemApplyAmt'},
    {prop: 'doNo', label: '外向交货单',width:'150',align: 'center',template: 'doNo'},
    {prop: 'soNo', label: '销售合同系统单据号',width:'150',align: 'center',template: 'input'},
    {prop: 'doInvoiceNo', label: '外销发票号',width:'150',align: 'center',template: 'doInvoiceNo'},
    {prop: 'contractAmt', label: '合同金额(原币)',width:'150',align: 'center',template: 'contractAmt'},
    {prop: 'soContractNo', label: '销售合同号',width:'150',align: 'center',template: 'input'},
    {prop: 'contractAmtHigh', label: '合同金额(溢短上限)',width:'150',align: 'center',template: 'contractAmtHigh'},
    {prop: 'remark', label: '备注',width:'150',align: 'center',template: 'remark'},
];
const header2 = [
    { type: 'selection', width: '55px', fixed: "left"},
    {prop: 'index', width: '80px', type: 'index', label: '行号',align: 'center'},
    {prop: 'actualPayDate', label: '实际付款日',align: 'center', width: '150px'},
    {prop: 'address', label: '交易币付款金额',align: 'center',template: 'input', width: '150px'},
    {prop: 'currencyCode', label: '交易币种',align: 'center',template: 'input', width: '120px'},
    {prop: 'rateCurrency', label: '汇率',align: 'center',template: 'input', width: '120px'},
    {prop: 'baseCurrencyCod333e', label: '本位币',align: 'center',template: 'input', width: '120px'},
    {prop: 'address', label: '本位币付款金额',align: 'center',template: 'input', width: '150px'},
    {prop: 'payType', label: '付款方式',align: 'center',template: 'input', width: '120px'},
    {prop: 'address', label: '付款单状态(sap)',align: 'center',template: 'input', width: '150px'},
    {prop: 'extApplyCode', label: '付款申请单号',align: 'center',template: 'input', width: '150px'},
    {prop: 'address', label: '付款单号(sap)',align: 'center',template: 'input', width: '150px'},
    {prop: 'address', label: '付款单行号(sap)',align: 'center',template: 'input', width: '150px'},
];
 /* const header3 = [
    //  { type: 'selection', width: '55px'},
//    {prop: 'index', type: 'index', label: '序号', fixed: "left"},
    {prop: '', label: '文件操作',align: 'center'},
    {prop: 'fileName', label: '文件名称',align: 'center'},
    {prop: 'createdBy', label: '创建人',align: 'center'},
    {prop: 'createdTime', label: '创建日期',align: 'center'},
  ];*/


export default {
    components: {
        ManagementSubject,
        DepartmentSelect,
        currencySubject,
        supplier,//收款单位
    },
    props:{
        payApplyId:String
    },
    data(){
        return {
            //枚举
            payCategory:ENUMS["7320"],//付款类别
            paymentType:ENUMS["7315"],//付款类型
            applyStatus:ENUMS["7360"],//状态
            payType:ENUMS["7210"],//付款方式
            moneyContent:ENUMS["7401"],//款项内容
            isSms:ENUMS["7330"],//发送短信
            isCommitDtl:ENUMS["7335"],//是否提交明细

            pickerOptions: {
                shortcuts: pickerOptions
            },
            formData: {
                companyName: "",//经营主体name
                companyCode: "",//经营主体code
                companyId: "",//经营主体id
                orgId: '',//部门id
                orgCode: '',//部门code
                orgName: '',//部门name
                payCategory: '',//付款类别
                payeeName: '',//收款单位
                accountingYear: '',//会计年度
                extApplyCode: '',//付款申请号
                payBankAccount: '',//银行账号
                moneyContent: null,//款项内容
                payBankAddress: '',//开户银行
                payType: null,//付款方式
                paymentType: null,//付款类型
                rateCurrency: '',//人民币汇率
                applyAmt: null,//申请金额
                currencyCode: '',//币别code
                currencyName: '',//币别name
                currencyId: '',//币别id
                applyPayTime: '',//申请付款日
                actualPayDate: '',//实际付款日
                baseCurrencyRate: null,//本位币汇率
                isSendSap: null,//发送SAP
                unPayedAmt:'',//未付款金额(原币)
                auitTitle: '',//OA审核标题
                applyStatus: '',//状态
                basePayedAmt:'',//已付款金额(本位币)
                creditNo: '',//信用证号
                isCommitDtl: '',//是否提交明细
                payedAmt:'',//已付款金额(原币)
                //申请付款金额---无
                isSms: '',//发送短信
                applyBaseAmt:'',//申请金额本位币
                remark: '',//备注

                // supplierCreditAmt: null,//供应商信用额度
                // usedCreditAmt: null,//已使用付款额度
                // leftCreditAmt: null,//剩余付款额度
            },
            rules:{
                companyName:[{required: true, message: ' ', trigger: 'change'}],//经营主体
                orgName:[{required: true, message: ' ', trigger: 'change'}],//部门
                payCategory:[{required: true, message: ' ', trigger: 'change'}],//付款类别
                payeeName:[{required: true, message: ' ', trigger: 'change' }],//收款单位
                accountingYear:[{required: true, message: ' ', trigger: 'blur'}],//会计年度
                payBankAccount:[{required: true, message: ' ', trigger: 'change'}],//银行账号
                moneyContent:[{required: true, message: ' ', trigger: 'change'}],//款项内容
                payBankAddress:[{required: true, message: ' ', trigger: 'change'}],//开户银行
                payType:[{required: true, message: '', trigger: 'change'}],//付款方式
                paymentType:[{required: true, message: '', trigger: 'change'}],//付款类型
                applyAmt:[{required: true, message: '', trigger: 'blur'}],//申请金额
                currencyName:[{required: true, message: '', trigger: 'change'}],//币别
                applyPayTime:[{required: true, message: '', trigger: 'change'}],//申请付款日
                actualPayDate:[{required: true, message: '', trigger: 'change'}],//实际付款日
                baseCurrencyRate:[{required: true, message: '', trigger: 'change'}],//本位币汇率
                basePayedAmt:[{required: true, message: '', trigger: 'blur'}],//已付款金额(本位币)
                isCommitDtl:[{required: true, message: '', trigger: 'change'}],//是否提交明细
                payedAmt:[{required: true, message: '', trigger: 'blur'}],//是否提交明细
                // payedAmt:[{required: true, message: '', trigger: 'blur'}],//申请付款金额

            },
            formData2: {
                createdBy: '',
                updatedBy: '',
                postPersonName: '',
                createdTime: '',
                updatedTime: '',
                postDate: '',
            },
            activeName: 'first',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }],
            searchBarFlg: true,
            header1: header1,
            header2: header2,
            tableData1: [],//抬头数据
            tableData2: [],//实际付款
            tableData3: [],//相关文件
            selectchange1: '',
            selectchange2: '',
            selectchange3: '',//相关文件
            fileList: [],
            relatedDocsTotal:0,
            relatedDocsListQuery:{
                currentPage:1,
                pageSize:10
            },
            value4:'无字段',
            isDepartment:true,//是否有公司
            transferSearchDepartment:{
                companyName:"",
                companyId:"",
                companyCode:"",
                boolToBtn:true,
            },
            addItemTable: '',   //增行所在表格
            addItemFlg: false,   //是否增行标志
        }
    },
    activated(){

    },
    created(){
        this. getList();
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
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        getList(){
            this.listLoading = true;
            doQueryPayApplyWithDtl(this.payApplyId).then(res => {
                if (res.data.status === 1) {
                    this.formData = res.data.data.codPayApplyVO;
                    this.tableData1 = res.data.data.codPayApplyDtlVOs;
                    this.total = res.data.data.items;
                    this.listLoading = false;
                    console.log(11)
                }
            })
        },
        //保存
        SaveClick(){
            // this.listLoading = true;
            let vm = this;
            this.$refs['formData'].validate((valid) => {
                if (valid) {
                    eventBus.$emit('validateTable', {
                        data: this.tableData1, //表示表格数据
                        headers: this.header1, //表示表头数据
                        success: (valid) => { //成功回掉
                            if (valid) {
                            //校验通过后，代码书写处
                                this.$confirm('您确认要新增吗?', '提示', {
                                      confirmButtonText: '确定',
                                      cancelButtonText: '取消',
                                      type: 'warning',
                                }).then(() => {
                                    delete vm.formData.currencyName;
                                    delete vm.formData.rateCurrency;
                                    delete vm.formData.auitTitle;
                                    delete vm.formData.creditNo;
                                    delete vm.formData.value4;
                                    vm.tableData1.map((x)=>{
                                        delete x.a;
                                        delete x.$index;
                                        delete x.poSerialNo;
                                        delete x.poContractNo;
                                        delete x.doInvoiceNo;
                                    });
                                    doUpdatePayApply(vm.formData,vm.tableData1,vm.codPayApplyDtlIds).then(res => {
                                        if (res.data.status === 1) {
                                            this.$store.dispatch('toggleCurrentView', {
                                                PaymentRequisition: {
                                                    view: 'index'
                                                    // params: 跳转过去的子组件的属性对象
                                                }
                                            });
                                        }
                                    })
                                }).catch(() => {
                                    vm.$message({
                                        type: 'info',
                                        message: '已取消新增'
                                    });
                                });
                            } else {
                            //检验不通过的提示已统一加，这里可以不写代码
                            }
                        }
                      })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //取消
        onClick(){
            this.$store.dispatch('toggleCurrentView', {
                PaymentRequisition: {
                    view: 'index'
                    // params: 跳转过去的子组件的属性对象
                }
            });
        },
        //创建
        Establish(tableName) {
            let payRowNo = 1;
            if(this.tableData1.length >= 1){
                payRowNo = this.tableData1[this.tableData1.length-1].payRowNo + 1;
            }
            this.tableData1.push({
                payRowNo: payRowNo,//行号
                contractNoS: '',//框架协议
                poSerialNo: '',
                poContractNo: '',
                canApplyAmt: null,
                paymentType: '',
                timeType: '',
                doNo: null,
                soNo: null,
                doInvoiceNo: '',
                contractAmt:'',
                soContractNo:'',
                contractAmtHigh:'',
                remark:''
            });
            this.addItemFlg = true;
            this.addItemTable = tableName;
        },
        //删除
        DeleteClick(){
            console.log(this.selectchange1);
            if(this.selectchange1.length<1){
                this.$notify({
                    title: '警告',
                    message: '请选择一行或多行进行删除',
                    type: 'warning'
                });
            }else {
                this.selectchange1.forEach((x,i) => {
                    let idx = this.tableData1.findIndex((val) => val.$index == x.$index);
                    this.tableData1[idx].payApplyDtlId && this.codPayApplyDtlIds.push(this.tableData1[idx].payApplyDtlId);
                    idx>-1 && this.tableData1.splice(idx, 1);
                });
            }
        },
        //添加
        addClick(tableName) {
            this.tableData2.push({
                address: '无字段',
                rateCurrency: '',
                baseCurrencyCode: '',
                payType: '',
            });
            this.addItemFlg = true;
            this.addItemTable = tableName;
        },
        //删除
        deleteClick(){
            if(this.selectchange2.length<1){
                this.$notify({
                    title: '警告',
                    message: '请选择一行或多行进行删除',
                    type: 'warning'
                });
            }else {
                this.selectchange2.forEach((x,i) => {
                    let idx = this.tableData2.findIndex((val) => val.$index == x.$index);
                    idx>-1 && this.tableData2.splice(idx, 1);
                });
            }
        },
        //******************抬头数据**********************
        // 经营主体
        childEventHandlerMainInfo(val) {
            if(val){
                console.log(val)
                this.formData.companyId= val.companyId;
                this.formData.companyCode = val.companyCode;
                this.formData.companyName = val.companyName;
                this.isDepartment = false;
                this.transferSearchDepartment.companyName = val.companyName;
                this.transferSearchDepartment.companyId = val.companyId;
                this.transferSearchDepartment.companyCode = val.companyCode;
                // this.$refs['formData'].validateField('companyName');
            }else {
                this.formData.companyId = '';
                this.formData.companyCode = '';
                this.formData.companyName = '';
                this.isDepartment = true;
                this.transferSearchDepartment.companyName = '';
                this.transferSearchDepartment.companyId = '';
                this.transferSearchDepartment.companyCode = '';
            }
        },
        //部门
        childEventHandlerDepartment(val){ //
            if(val){
                this.formData.orgId = val.orgId;
                this.formData.orgCode = val.orgCode;
                this.formData.orgName = val.orgName;
                // this.$refs['formData'].validateField('bizOrgName');
            } else {
                this.formData.orgId = '';
                this.formData.orgCode = '';
                this.formData.orgName = '';
            }
        },
        //币别
        currencyNameFill(val){
            if(val){
                this.formData.currencyId = val.currencyId;//币别id
                this.formData.currencyCode = val.currencyCode;//币别code
                this.formData.currencyName = val.currencyName;//币别name
                this.formData.rateCurrency = Number(val.exchangeRate).toFixed(8);//对人民币税率
                this.$refs['formData'].validateField('currencyName');
            }else {
                this.formData.currencyId = '';
                this.formData.currencyCode = '';
                this.formData.currencyName = '';
            }
        },
        getChildevent(val){//收款单位
            if(val){
                this.formData.payeeName = val.supplyName;
            }else {
                this.formData.payeeName = '';
            }
        },
        getData(data){//供应商
            if(data){
                this.formData.payeeCompanyCode = data.supplyCode;
                // this.formData.supplierId = data.id;
                this.formData.payeeName = data.supplyName;
            } else {
                this.formData.payeeCompanyCode = '';
                // this.formData.supplierId = data.id;
                this.formData.payeeName = '';
            }
        },
        //分页--1
        handleCellClick1(){

        },
        handleSelectionChange1(val){
            var vm = this;
            vm.selectchange1 = val;
            console.log(vm.selectchange1.length)
        },
        //相关文件
        submitUpload(){
            if(this.fileList.length == 0){
                this.$notify({
                    title: '警告',
                    message: '请选择要进行上传的文件',
                    type: 'warning'
                });
            }else {
                this.relatedDocsTotal++;
                this.tableData3.push(this.fileList[0]);
                this.fileList = [];
            }
        },
        handleUploadChange(file, fileList){
            if (file.hasOwnProperty('size')) {
                if (file.size > 20 * 1024 * 1024) {
                    this.$alert(file.name + '文件上传上限20M');
                    fileList.del(file);
                }
            }
            if (fileList.length > 1) {
                fileList.splice(0, 1);
            }
            this.fileList = fileList;
        },
        downLoad(row){
            if(row.url){
                const a = document.createElement('a');
                a.setAttribute('href', row.url);
                a.setAttribute('download', row.name);
                a.click();
            }
        },
        deleteRelatedDocsRow(index, rows){
            rows.splice(index, 1);
            this.relatedDocsTotal--;
        },
        handleSizeRelatedDocs(val){

        },
        handleCurrentRelatedDocs(val){

        },
        //分页--2
        handleCellClick2(){

        },
        handleSelectionChange2(val){
            var vm = this;
            vm.selectchange2 = val;
            console.log(vm.selectchange2.length)
        },
        //分页--3
        handleCellClick3(){

        },
        handleSelectionChange3(val){
            var vm = this;
            vm.selectchange3 = val;
            console.log(vm.selectchange3.length)
        },
    }
}
</script>
<style>
    .label{
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #5a5e66;
        line-height: 40px;
        padding-left: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    #payment .el-form-item {
        margin-bottom: 0;
    }
    #payment .el-col{
        height: inherit !important;
    }
</style>

