<template>
  <div class="allTemplate">
    <div class="saveAndCancelbtns">
      <el-button type="primary" size="small" @click="handleSave">保存</el-button>
      <el-button type="info" size="small" @click="handleCancel">取消</el-button>
    </div>
    <div class="infoDataTabs">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="抬头数据" name="first">
          <div class="tabPane">
            <el-form :rules="rules" ref="riseDataForm" :model="riseData" label-width="90px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="收货单号">
                    <el-input disabled size="mini" v-model="riseData.poGrNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="poGrType" label="采购类型">
                    <el-select :disabled="isCanSelectPoGrAndOperationType" size="mini" @change="handlePoGrStatusChange" clearable v-model="riseData.poGrType" placeholder="请选择类型">
                      <el-option v-for="item in purchasTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="operationType" label="移动类型">
                    <el-select :disabled="isCanSelectPoGrAndOperationType" size="mini" clearable @change="handleOperationTypeChange" v-model="riseData.operationType" placeholder="请选择类型">
                      <el-option v-for="item in movementTypeOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="warehouseName" label="入库仓库">
                    <!-- name id code -->
                    <!-- <el-input size="mini" v-model="riseData.warehouseName"></el-input> -->
                    <warehouse-select @childevent="childEventHandlerWarehouse" :querySelect="riseData.warehouseName"></warehouse-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <!-- 采购暂收/在途单号 lbNo  lbId -->
                  <el-form-item prop="sourceNo" :label="sourceName">
                    <!-- sourceId sourceNoType 控制类型  //采购暂收 1/在途单号 2/只读3  判断-->
                    <!-- owSelect   sourcenoSelect -->
                    <!-- 暂收 -->
                    <!-- operationType poGrType poGrStatus -->
                    <sourceno-select v-if="sourceNoType=='1'" @childevent="childeventHandlePoGrNo" :querySelect="riseData.sourceNo"></sourceno-select>
                    <!-- 在途 -->
                    <ow-select v-else-if="sourceNoType=='2'" @childevent="childeventHandleOw" :querySelect="riseData.sourceNo"></ow-select>
                    <!-- 只读 -->
                    <el-input disabled v-else="sourceNoType=='3'" size="mini" v-model="riseData.sourceNo"></el-input>
                    <!--   <el-input  size="mini" v-model="riseData.sourceNo"></el-input>
                    <el-input prefix-icon="el-icon-search"  size="mini" v-model="riseData.sourceNo"></el-input> -->
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="certificatesDate" label="单据日期">
                    <!-- <el-input size="mini" v-model="riseData.certificatesDate"></el-input> -->
                    <el-date-picker :editable="false" size="mini" v-model="riseData.certificatesDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="manageSubName" label="经营主体">
                    <!-- manageSubId manageSubCode -->
                    <!-- <el-input size="mini" v-model="riseData.manageSubName"></el-input> -->
                    <management-subject :querySelect="riseData.manageSubName" @childevent="childEventHandleManageSubName"></management-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="提单号">
                    <!-- 提单在途  lbId   isWay  lbNo  :disabled="lbNoDisabled"-->
                    <el-input disabled size="mini" v-model="riseData.billNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item prop="supplierName" label="供应商">
                    <!-- name id code -->
                    <!-- <el-input size="mini" v-model="riseData.supplierName"></el-input> -->
                    <supplier @getData="childEventHandleSupplier" :selectName="riseData.supplierName" :disabled="riseData.manageSubName==''" :transferSearch="transferSearch"></supplier>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="bizOrgName" label="部门">
                    <!-- name id code -->
                    <!-- <el-input size="mini" v-model="riseData.bizOrgName"></el-input> -->
                    <department-select @childevent="childEventHandlerDepartment" :querySelect="riseData.bizOrgName" :disabled="riseData.manageSubName==''" :transferSearch="transferSearch"></department-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据状态">
                    <!-- 设计书上没有 :disabled="poGrStatusDisabled"-->
                    <!-- <el-input size="mini" v-model="riseData.postStatus"></el-input> -->
                    <el-select disabled size="mini" clearable v-model="riseData.poGrStatus" laceholder="请选择类型">
                      <el-option v-for="item in purchaseReceiptStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      <!--  <el-option label="已过账" value="2"></el-option>
                      <el-option label="已开票" value="3"></el-option>
                      <el-option label="已冲销" value="4"></el-option> -->
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item prop="currencyName" label="币别">
                    <currency-select @childevent="childEventHandleCurrency" :querySelect="riseData.currencyName"></currency-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!--  <el-col :span="6">
                  <el-form-item label="应收数量合计">
                    <el-input disabled size="mini" v-model="riseData.shouldReceiveQty"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="6">
                  <el-form-item label="实收数量合计">
                    <el-input disabled size="mini" v-model.number="actReceiveAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="OA审核标题">
                    <el-input size="mini" v-model="riseData.auitTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="对人民币汇率" prop="rateCurrency">
                    <el-input @change="calculateOrginAmtAndBaseAmtAccordToRateCurrency" @blur="handleRateCurrencyChange" v-number-only:10.abs="8" size="mini" v-model="riseData.rateCurrency"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注">
                    <el-input size="mini" v-model="riseData.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="收货金额合计(原币)">
                    <el-input size="mini" v-model="riseData.receiptCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收货金额合计(本位币)">
                    <el-input size="mini" v-model="riseData.receiptCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="凭证信息" name="second">
          <div class="tabPane tabPaneSecond">
            <el-form ref="form" :model="riseData" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="凭证标识">
                    <!-- SAP回传 -->
                    <el-input disabled size="mini" v-model="riseData.credenIden"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="凭证过账编号">
                    <el-input disabled size="mini" v-model="riseData.credenNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="pushDefeatReason" :span="12">
                  <el-form-item label="推送失败原因">
                    <el-input disabled type="textarea" :rows="2" placeholder="请输入内容" v-model="riseData.failReason">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="汇总信息" name="third">
          <div class="tabPane tabPaneThird">
            <el-form ref="form" :model="riseData" label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="原币金额总计(含税)">
                    <el-input disabled size="mini" v-number-only:10.abs='2' placeholder="0.00" v-model="poAmt.poOrginAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原币金额总计(不含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model.number="poAmt.poOrginAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本位币金额总计(含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model.number="poAmt.poBaseAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本位币金额总计(不含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model.number="poAmt.poBaseAmt"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相关文件" name="fourth">
          <div class="tabPane">
            <div class="fileUpload">
              <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">上传</el-button>
                <span slot="tip" class="el-upload__tip">文件上传上限20M</span>
              </el-upload> -->
              <common-upload @uploadedFile="handleUploadedFile"></common-upload>
            </div>
            <div class="fileOperation">
              <common-table :data="filesData" :headers="fileHeaders">
              </common-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="fifth">
          <div class="tabPane">
            <el-form ref="form" :model="riseData" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="创建人">
                    <el-input disabled size="mini" v-model="riseData.createdBy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="修改人">
                    <el-input disabled size="mini" v-model="riseData.updatedBy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="过账人">
                    <!-- name id code -->
                    <el-input disabled size="mini" v-model="riseData.postPersonName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="创建时间">
                    <!-- <el-input size="mini" v-model="riseData.createdTime"></el-input> -->
                    <!--     <el-date-picker size="mini" v-model="riseData.createdTime" type="date" placeholder="选择日期">
                    </el-date-picker> -->
                    <el-date-picker disabled size="mini" v-model="riseData.createdTime" type="datetime" placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="修改时间">
                    <el-date-picker disabled size="mini" v-model="riseData.updatedTime" type="datetime" placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="过账时间">
                    <el-date-picker disabled size="mini" v-model="riseData.postDate" type="datetime" placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer">
      <div class="createAndDeleteAndCopyBtns">
        <el-button @click="handleCreateNewDetail" type="warning" size="small">创建</el-button>
        <el-button @click="handleDeleteDetail" :disabled="riseData.codPoGrDtlCusList.length == 0" type="warning" size="small">删除</el-button>
        <!-- <el-button type="success" size="small">复制</el-button> -->
      </div>
      <div>
        <common-table :data="riseData.codPoGrDtlCusList" :maxHeight="400" :fit="true" ref="multipleTable" :headers="headers" @selection-change="handleSelectionChange">
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text=='packType'">
              <span>{{riseData.codPoGrDtlCusList[scope.index].packType | parsePackType}}</span>
            </div>
            <div v-if="scope.text=='productDate'">
              <span>{{riseData.codPoGrDtlCusList[scope.index].productDate | parseTime}}</span>
            </div>
          </template>
          <template slot="default" slot-scope="scope">
            <div v-if="scope.text=='unitName'">
              <unit-select @childevent="childEventHandleUnit" :querySelect="riseData.codPoGrDtlCusList[scope.index].unitName" :rowIndex="scope.index"></unit-select>
            </div>
            <div v-if="scope.text=='actReceiveQty'">
              <el-input @input="inputActReceiveQty(scope.index)" size="mini" v-model="riseData.codPoGrDtlCusList[scope.index].actReceiveQty"></el-input>
            </div>
            <div v-if="scope.text=='goodsProductQty'">
              <el-input @input="inputGoodsProductQty(scope.index)" size="mini" v-model="riseData.codPoGrDtlCusList[scope.index].goodsProductQty"></el-input>
            </div>
            <div v-if="scope.text=='rejectsProductQty'">
              <el-input @input="inputRejectsProductQty(scope.index)" size="mini" v-model="riseData.codPoGrDtlCusList[scope.index].rejectsProductQty"></el-input>
            </div>
            <!-- <div v-if="scope.text == 'settleUnitName'">
              <unit-select @childevent="childEventHandleSettleUnitNameUnit" :querySelect="riseData.codPoGrDtlCusList[scope.index].settleUnitName"></unit-select>
            </div> -->
            <div v-if="scope.text == 'productDate'">
              <el-date-picker :editable="false" size="mini" v-model="riseData.codPoGrDtlCusList[scope.index].productDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
            <div v-if="scope.text=='settleQty'">
              <el-input @input="calculateOrginAmtAndBaseAmt(scope.index)" size="mini" v-model="riseData.codPoGrDtlCusList[scope.index].settleQty"></el-input>
            </div>
          </template>
        </common-table>
      </div>
      <div>
      </div>
    </div>
    <!-- 暂收 -->
    <pogr-dialog v-if="sourceNoType=='1'" :detailIndex="detailIndex" :poGrId="riseData.sourceId" :supplierId="riseData.supplierId" :manageSubId="riseData.manageSubId" :currencyId="riseData.currencyId" :owInfoDialogFormVisible="owInfoDialogFormVisible" @closeItem="closeOwInfoDialog" @setItem="setPoGrInfoDialog"></pogr-dialog>
    <!-- 在途 -->
    <owinfo-dialog v-else-if="sourceNoType=='2'" :detailIndex="detailIndex" :owNo="riseData.sourceNo" :owInfoDialogFormVisible="owInfoDialogFormVisible" @closeItem="closeOwInfoDialog" @setItem="setOwInfoDialog"></owinfo-dialog>
    <!-- 合同 supplierId currencyName manageSubName-->
    <contract-dialog v-else="sourceNoType=='3'" :detailIndex="detailIndex" :supplierId="riseData.supplierId" :currencyName="riseData.currencyName" :manageSubName="riseData.manageSubName" :owInfoDialogFormVisible="owInfoDialogFormVisible" @closeItem="closeOwInfoDialog" :poDtlIdList="selectedPoDtlIds" @setItem="setContractInfoDialog"></contract-dialog>
  </div>
</template>
<script type="text/javascript">
/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-22
 * ============================
 */

import { getList, getDetailData, doModify, doSave, doQueryWithPage, doCusQueryDtlOw } from '../../../api/purchase/purchas-receipt/index.js'

import {
  deleteSelectedRows,
  parseTime,
  calculateOrderDatail,
  amtTexBlur,
  imtAmtTexBur,
  imtTaxTexBur
} from '../../../util/index.js'

import { getPurchasReceiptDataDefault } from '../../../util/getDefault.js'

import DepartmentSelect from 'components/common-select/department-select.vue' //部门
import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
import currencySelect from '@/components/common-select/currency-select.vue' //币种
import supplier from '@/components/common-select/supplier.vue' //供应商
import WarehouseSelect from 'components/common-select/warehouse-select.vue' //仓库
import unitSelect from '@/components/common-select/unit-select.vue' //单位

import owSelect from '@/components/common-select/ow-select.vue' //在途单
import sourcenoSelect from '@/components/common-select/sourceno-select.vue' //暂收单

import owinfoDialog from './owinfo-dialog.vue'; //在途单号
import pogrDialog from './pogr-dialog.vue'; //暂收单号
import contractDialog from './contract-dialog.vue'; //合同号

import CommonUpload from '@/components/common-upload/common-upload' //上传

import { ENUMS } from '../../../assets/enums.js'

import NP from 'number-precision'

// import { doQueryWithReceived, doQueryCodOwWithPage } from '../../../api/common-select/sourceno-select'


const fileHeaders = [
  { prop: 'fileOperation', label: '上传', align: "center" },
  { prop: 'oldFilename', label: '文件名称', align: "center" },
  { prop: 'creater', label: '创建人', align: "center" },
  { prop: 'createTime', label: '创建时间', align: "center" },
]

// 进口
const headers = [

  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'poGrRowNo', label: '行号', width: '100px', align: 'center' },
  { prop: 'poContractNo', label: '采购合同号', width: '180px', align: 'center' },
  { prop: 'goodsCode', label: '物料编号', width: '120px', align: 'center' },
  { prop: 'goodsName', label: '物料名称', width: '180px', align: 'center' },
  { prop: 'actReceiveQty', required: true, label: '实收数量', width: '120px', align: 'center', template: 'actReceiveQty' },
  // start
  // template: 'unitName'
  { prop: 'unitName', required: true, label: '单位', width: '120px', align: 'center' },
  { prop: 'packType', required: true, label: '包装方式', width: '120px', align: 'center', filter: 'packType' },
  { prop: 'seriesNo', label: '批次', width: '120px', align: 'center' },
  { prop: 'cabinetNo', label: '柜号', width: '120px', align: 'center' },
  { prop: 'supplierBatchNo', required: true, label: '供应商批号', width: '120px', align: 'center' }, //
  {
    prop: 'productDate',
    required: true,
    label: '供方生产日期',
    dataType: 'Date',
    width: '120px',
    align: 'center',
    filter: 'productDate'
  },
  { prop: 'qty', label: '件数', required: true, width: '120px', align: 'center' },
  { prop: 'settleQty', required: true, label: '结算数量', width: '120px', align: 'center', template: 'settleQty' },
  // end
  { prop: 'settleUnitName', required: true, label: '结算单位', width: '120px', align: 'center' },
  { prop: 'poNo', label: '采购合同单据号', width: '120px', align: 'center' }, //poGrStatusDisabled
  { prop: 'goodsProductQty', required: true, label: '良品', digit: 0, width: '120px', align: 'center', template: 'goodsProductQty' },
  { prop: 'rejectsProductQty', required: true, label: '不良品', digit: 0, width: '120px', align: 'center', template: 'rejectsProductQty' },
  { prop: 'remark', label: '备注', width: '120px', align: 'center', editable: true },
]

//  国内   暂收的headers
const headersPoGr = [

  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'poGrRowNo', label: '行号', width: '100px', align: 'center' },
  { prop: 'poContractNo', label: '采购合同号', width: '180px', align: 'center' },
  { prop: 'goodsCode', label: '物料编号', width: '120px', align: 'center' },
  { prop: 'goodsName', label: '物料名称', width: '180px', align: 'center' },
  { prop: 'actReceiveQty', required: true, label: '实收数量', width: '120px', align: 'center', template: 'actReceiveQty' },
  // start
  // template: 'unitName'
  { prop: 'unitName', required: true, label: '单位', width: '120px', align: 'center' },
  { prop: 'packType', required: true, label: '包装方式', width: '120px', align: 'center', filter: 'packType' },
  { prop: 'seriesNo', label: '批次', width: '120px', align: 'center' },
  { prop: 'cabinetNo', label: '柜号', width: '120px', align: 'center' },
  { prop: 'supplierBatchNo', required: true, label: '供应商批号', width: '120px', align: 'center', editable: true }, //
  {
    prop: 'productDate',
    required: true,
    label: '供方生产日期',
    dataType: 'Date',
    width: '120px',
    align: 'center',
    // filter: 'productDate',
    template: 'productDate'
  },
  { prop: 'qty', label: '件数', required: true, width: '120px', align: 'center', editable: true },
  { prop: 'settleQty', required: true, label: '结算数量', width: '120px', align: 'center', template: 'settleQty' },
  // end
  { prop: 'settleUnitName', required: true, label: '结算单位', width: '120px', align: 'center' },
  { prop: 'poNo', label: '采购合同单据号', width: '120px', align: 'center' }, //poGrStatusDisabled
  { prop: 'goodsProductQty', required: true, label: '良品', digit: 0, width: '120px', align: 'center', template: 'goodsProductQty' },
  { prop: 'rejectsProductQty', required: true, label: '不良品', digit: 0, width: '120px', align: 'center', template: 'rejectsProductQty' },
  { prop: 'remark', label: '备注', width: '120px', align: 'center', editable: true },
]

export default {
  data() {
    return {

      fileHeaders: fileHeaders,
      headers: headers,
      // list: baseList,
      activeName: 'first',
      riseData: {
        region: '',
        receiptCode: ''
      },
      transferSearch: {
        boolToBtn: true,
        companyName: '',
        companyCode: '',
        companyId: '',
      },
      poGrStatusDisabled: false,
      actReceiveAmtDisabled: false, //实收数量合计控制
      // 采购暂收 / 在途单号
      sourceName: '采购暂收',
      lbNoDisabled: false,
      sourceNoType: '3', //采购暂收 1/在途单号 2/只读3  判断

      owInfoDialogFormVisible: false,

      detailIndex: 0, //创建传入弹窗的索引值


      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      filesData: [],

      purchasTypeOptions: ENUMS.array7230,
      purchaseReceiptStatusOptions: ENUMS.array7030,
      // movementTypeOptions: ENUMS.array7405, //移动类型
      movementTypeOptions: [
        { "value": "74050010", "label": "入库单", disabled: false },
        { "value": "74050020", "label": "暂收单", disabled: false },
      ], //移动类型
      inputDiv: null,
      columnSpan: null,
      cell: null,

      codPoGrDtlCusObj: {
        poRowNo: '1',
        poGrDtlId: '',
        poDtlId: '',
        poGrRowNo: 1,
        poGrId: '',
        poContractNo: '',
        poNo: '',
        sourceDtlId: '',
        goodsId: '',
        goodsCode: '',
        goodsName: "",
        isGift: 1,
        bizOrgId: '',
        bizOrgCode: '',
        qty: 0,
        bizOrgName: '',
        rejectsProductQty: 0,
        goodsProductQty: 0,
        settleReturnQty: 0,
        settleChangeQty: 0,
        settleWriteOffQty: 0,
        actChangeQty: 0,
        actWriteOffQty: 0,
        actReturnQty: 0,
        hasSettleQty: 0,
        settleQty: 0,
        lessQty: 0,
        actReceiveQty: 0,
        unitId: '',
        unitName: '',
        unitCode: '',
        settleUnitId: '',
        settleUnitName: '',
        settleUnitCode: '',
        cabinetNo: '',
        basePrice: 0,
        basePriceTex: 0,
        orginPrice: 0,
        orginPriceTex: 0,
        baseAmt: 0,
        baseAmtTex: 0,
        orginAmt: 0,
        orginAmtTex: 0,
        seriesNo: '',
        supplierBatchNo: '',
        productDate: new Date(),
        packType: '71350010',
        remark: '',
        isDel: 0,
        createdBy: '',
        createdTime: '',
        updatedTime: '',
        updatedBy: ' ',
        version: 1,
        isInactive: 1,
        isolationCode: 1,
        baseTexAmt: 0,
        texRate: 1,
        orginTexAmt: 0,
      },
      // riseData.codPoGrDtlCusList   明细的list
      // codPoGrDtlCusObj
      riseData: {
        sourceNo: '',
        sourceId: '',
        poGrStatus: '70300010',
        operationType: '74050020', //移动类型
        manageSubCode: '',
        manageSubName: '',
        manageSubId: '',
        poGrType: '72300010', //采购了信息给
        supplierId: '',
        supplierCode: '',
        supplierName: '',
        bizOrgId: '',
        bizOrgCode: '',
        bizOrgName: '',
        billNo: '', //提单号
        certificatesDate: new Date(),
        warehouseId: '',
        warehouseCode: '',
        warehouseName: '',
        auitTitle: '',
        actReceiveAmt: 0,
        poOrginAmt: 0,
        poOrginAmtTex: 0,
        poBaseAmt: 0,
        poBaseAmtTex: 0,
        currencyId: '3833D6D58235DF20E050A8C043FA215F',
        currencyCode: '',
        currencyName: '',
        rateCurrency: '',
        /*CNY
中国人民币（国际）
1.00000000*/
        credenIden: '',
        credenNo: '',
        failReason: '',
        isReturn: 1,
        setttleWeight: 0,
        postPersonName: '',
        postPersonCode: '',
        postPersonId: '',
        postDate: '',
        remark: '',
        isDel: 1,
        createdBy: '',
        createdTime: '',
        updatedTime: '',
        updatedBy: '',
        isInactive: 1,
        isolationCode: 1,
        codPoGrDtlCusList: []
      },
      selectedRows: [],
      // 入库管控
      rules: {
        poGrType: [
          { required: true, message: '', trigger: 'change' }
        ],
        operationType: [
          { required: true, message: '', trigger: 'change' }
        ],
        warehouseName: [
          { required: false, message: '', trigger: 'change' }
        ],
        sourceNo: [
          { required: false, message: ' ', trigger: 'blur' }
        ],
        certificatesDate: [
          { type: 'date', required: true, message: '', trigger: 'change' }
        ],
        manageSubName: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        supplierName: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        bizOrgName: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        currencyName: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        rateCurrency: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },


    }
  },
  components: {
    ManagementSubject,
    DepartmentSelect,
    currencySelect,
    WarehouseSelect,
    supplier,
    unitSelect,
    owSelect,
    sourcenoSelect,
    owinfoDialog,
    pogrDialog,
    contractDialog,
    CommonUpload
  },
  filters: {

  },
  computed: {
    // 实收数量合计
    actReceiveAmt: function() {
      var list = this.riseData.codPoGrDtlCusList;
      var len = list.length;
      if (len == 0) {
        return 0;
      } else {
        var sum = 0.00;
        for (var i = 0; i < len; i++) {
          if (list[i].actReceiveQty) {
            sum += (parseFloat(list[i].actReceiveQty))
          }
        }
        return sum.toFixed(2);
      }

    },
    isCanSelectPoGrAndOperationType: function() {
      var list = this.riseData.codPoGrDtlCusList;
      if (list) {
        if (list.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 原币和本币金额总计， 含税护着不含税
    poAmt: function() {
      var list = this.riseData.codPoGrDtlCusList;
      if (!list) {
        return {
          poOrginAmtTex: '0.00',
          poOrginAmt: '0.00',
          poBaseAmtTex: '0.00',
          poBaseAmt: '0.00',
        };

      }
      var len = list.length;
      if (len == 0) {
        return {
          poOrginAmtTex: '0.00',
          poOrginAmt: '0.00',
          poBaseAmtTex: '0.00',
          poBaseAmt: '0.00',
        }
      }
      var poOrginAmtTex = 0;
      var poOrginAmt = 0;
      var poBaseAmtTex = 0;
      var poBaseAmt = 0;

      for (var i = 0; i < len; i++) {
        if (list[i].orginAmtTex) {
          poOrginAmtTex += parseFloat(list[i].orginAmtTex);
        }
        if (list[i].orginAmt) {
          poOrginAmt += parseFloat(list[i].orginAmt);
        }
        if (list[i].baseAmtTex) {
          poBaseAmtTex += parseFloat(list[i].baseAmtTex);
        }
        if (list[i].baseAmt) {
          poBaseAmt += parseFloat(list[i].baseAmt);
        }
      }

      return {
        poOrginAmtTex: poOrginAmtTex.toFixed(2),
        poOrginAmt: poOrginAmt.toFixed(2),
        poBaseAmtTex: poBaseAmtTex.toFixed(2),
        poBaseAmt: poBaseAmt.toFixed(2),

      };
    },
    selectedPoDtlIds: function() {
      var list = this.riseData.codPoGrDtlCusList;
      var len = list.length;
      var results = [];
      if (len === 0) {
        return results;
      }
      for (var i = 0; i < len; i++) {
        results.push(list[i].poDtlId)
      }

      return results;
    }


  },

  methods: {

    /*{ prop: 'fileOperation', label: '上传' },
  { prop: 'oldFilename', label: '文件名称' },
  { prop: 'creater', label: '创建人' },
  { prop: 'createTime', label: '创建时间' },*/
    handleUploadedFile(data) {
      console.log(data, '数据上传成功');
      data.forEach((o, i) => {
        o.fileOperation = '上传';
        o.creater = '给我’名字‘吧';
        o.createTime = '0000-00-00 00:00:00';
      })
      this.filesData = data;

    },
    /*
       basePrice: 0,     本位币单价(不含税)   --- 
       basePriceTex: 0,  本位币单价(含税)   --
       orginPrice: 0,    原币单价(不含税)   --
       orginPriceTex: 0, 原币单价(含税)   --
       baseAmt: 0,       本位币金额(不含税)   
       baseAmtTex: 0,    本位币金额(含税) ---  
       orginAmt: 0,      原币金额(不含税)  -- 
       orginAmtTex: 0,   原币金额(含税)   --

       baseTexAmt 本币税额
       texRate 税率
       orginTexAmt 原币税额
       */
    // 根据汇率计算本币金额
    calculateOrginAmtAndBaseAmtAccordToRateCurrency(index) {
      var timer;
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        if (this.riseData.rateCurrency) {
          this.riseData.rateCurrency = parseFloat(this.riseData.rateCurrency).toFixed(8)
        } else {
          this.riseData.rateCurrency = 0;
        }

        var list = this.riseData.codPoGrDtlCusList;
        var len = list.length;

        var rateCurrency = parseFloat(this.riseData.rateCurrency);

        for (var index = 0; index < len; index++) {
          var orginAmt, orginAmtTex;
          if (this.riseData.codPoGrDtlCusList[index].orginAmt) {
            orginAmt = parseFloat(this.riseData.codPoGrDtlCusList[index].orginAmt);
          } else {
            orginAmt = 0;
          }

          if (this.riseData.codPoGrDtlCusList[index].orginAmtTex) {
            orginAmtTex = parseFloat(this.riseData.codPoGrDtlCusList[index].orginAmtTex);
          } else {
            orginAmtTex = 0;
          }

          this.riseData.codPoGrDtlCusList[index].baseAmt = (NP.times(orginAmt, rateCurrency)).toFixed(2)
          this.riseData.codPoGrDtlCusList[index].baseAmtTex = (NP.times(orginAmtTex, rateCurrency)).toFixed(2);
        }
      }, 50)

    },
    //计算本币金额和原币金额
    calculateOrginAmtAndBaseAmt(index) {
      var detailObj = this.riseData.codPoGrDtlCusList[index];
      /*baseTexAmt
texRate
orginTexAmt*/
      var basePrice = parseFloat(detailObj.basePrice) || 0;
      var basePriceTex = parseFloat(detailObj.basePriceTex) || 0;
      var orginPrice = parseFloat(detailObj.orginPrice) || 0;
      var orginPriceTex = parseFloat(detailObj.orginPriceTex) || 0;
      var texRate = parseFloat(detailObj.texRate) || 0; //税率

      var num = parseFloat(detailObj.settleQty) || 0

      var baseAmt = (NP.times(basePrice, num));
      var baseAmtTex = (NP.times(basePriceTex, num));
      var orginAmt = (NP.times(orginPrice, num));
      var orginAmtTex = (NP.times(orginPriceTex, num));

      // 税额
      var baseTexAmt = NP.times((NP.divide(baseAmtTex, NP.plus(1, texRate))), texRate);
      var orginTexAmt = NP.times((NP.divide(orginAmtTex, NP.plus(1, texRate))), texRate);

      this.riseData.codPoGrDtlCusList[index].baseAmt = baseAmt.toFixed(2);
      this.riseData.codPoGrDtlCusList[index].baseAmtTex = baseAmtTex.toFixed(2);
      this.riseData.codPoGrDtlCusList[index].orginAmt = orginAmt.toFixed(2);
      this.riseData.codPoGrDtlCusList[index].orginAmtTex = orginAmtTex.toFixed(2);

      this.riseData.codPoGrDtlCusList[index].baseTexAmt = baseTexAmt.toFixed(2);
      this.riseData.codPoGrDtlCusList[index].orginTexAmt = orginTexAmt.toFixed(2);




    },
    /*
        handleSettleQtyChange(index) {
          this.imtAmtTexBur(index);
          this.calculateOrderDatail(index);
        },
       

        // 金额计算 v含税单价 结算数量 税率


        calculateOrderDatail(index) {
          // 原币 (含税)
          var detailObj = this.riseData.codPoGrDtlCusList[index];
          var o = calculateOrderDatail({
            priceTex: detailObj.orginPriceTex, //含税单价
            num: detailObj.settleQty, //结算数量
            texRate: detailObj.texRate //税率
            // texRate: 0.2 //税率
          })
          this.riseData.codPoGrDtlCusList[index].orginAmtTex = o.amtTex || 0 //含税原币金额
          // this.riseData.codPoGrDtlCusList[index].orginTexAmt = o.texAmt //  税额
          this.riseData.codPoGrDtlCusList[index].orginAmt = o.amt || 0 //税前金额
          if (o.amt && this.riseData.rateCurrency) {
            this.riseData.codPoGrDtlCusList[index].baseAmt = (NP.times(o.amt, this.riseData.rateCurrency)).toFixed(2); //本位币金额（不含税）
          } else {
            this.riseData.codPoGrDtlCusList[index].baseAmt = 0;
          }


        },

        imtAmtTexBur(index) {
          var detailObj = this.riseData.codPoGrDtlCusList[index];
          var o = imtAmtTexBur({
            orginPriceTex: detailObj.orginPriceTex, //原币单价
            rmbCurrencyRate: this.riseData.rateCurrency, //对人民币汇率
            tariffRate: 1, //关税税率
            addTexRate: detailObj.texRate, //增值税税率
            num: detailObj.settleQty, //数量
          });

          // this.riseData.codPoGrDtlCusList[index].basePriceTex = o.basePriceTex || 0 // 本币单价
          this.riseData.codPoGrDtlCusList[index].baseAmtTex = o.baseAmtTex || 0 // 本币金额
          // o.texAmt // 增值税金额

        },

        amtTexBlur(index) {
          //       var detailObj = this.riseData.codPoGrDtlCusList[index];
          //       var o = amtTexBlur({
          //         amtTex: detailObj.orginAmtTex, //含税金额
          //         texRate: detailObj.texRate, //税率
          //         num: detailObj.settleQty //数量
          //       })
          //       this.riseData.codPoGrDtlCusList[index].orginTexAmt = o.texAmt ;

          // 税额 texAmt
          // 税前金额 amt
          // 含税单价 priceTex
          // 无税单价 price


        },*/



    //对人民币汇率  失去焦点
    handleRateCurrencyChange() {
      if (this.riseData.rateCurrency) {
        this.riseData.rateCurrency = parseFloat(this.riseData.rateCurrency).toFixed(8)
      } else {
        this.riseData.rateCurrency = '';
      }

    },
    // 实收
    inputActReceiveQty(index) {
      this.riseData.codPoGrDtlCusList[index].goodsProductQty = this.riseData.codPoGrDtlCusList[index].actReceiveQty;
      this.riseData.codPoGrDtlCusList[index].rejectsProductQty = 0;
    },
    // 良品
    inputGoodsProductQty(index) {
      /*var reg = /^[0-9]*$/
      if(reg.test(this.riseData.codPoGrDtlCusList[index].goodsProductQty)){

      }else {

      }*/

      this.riseData.codPoGrDtlCusList[index].rejectsProductQty = this.riseData.codPoGrDtlCusList[index].actReceiveQty - this.riseData.codPoGrDtlCusList[index].goodsProductQty;
    },
    // 不良品
    inputRejectsProductQty(index) {
      this.riseData.codPoGrDtlCusList[index].goodsProductQty = this.riseData.codPoGrDtlCusList[index].actReceiveQty - this.riseData.codPoGrDtlCusList[index].rejectsProductQty;
    },
    closeOwInfoDialog() {
      this.owInfoDialogFormVisible = false;
    },
    // 暂收
    setPoGrInfoDialog(val, index) {

      this.headers = headersPoGr;

      console.log(val, index);
      var obj = this.codPoGrDtlCusObj;
      var list = this.riseData.codPoGrDtlCusList;
      var len = list.length;

      var o = {};
      for (var key in obj) {
        o[key] = val[key];
      }

      o.orginPrice = val.orginPrice;
      o.orginPriceTex = val.orginPriceTex;
      o.basePrice = val.basePrice;
      o.basePriceTex = val.basePriceTex;
      o.baseAmt = val.baseAmt;
      o.baseAmtTex = val.baseAmtTex;
      o.orginAmt = val.orginAmt;
      o.orginAmtTex = val.orginAmtTex;

      // 给o赋值val的值
      // poContactNo 后台数据库录错了
      o.poContractNo = val.poContractNo;

      o.goodsCode = val.goodsCode;
      o.goodsName = val.goodsName;
      o.goodsId = val.goodsId;

      // 实收数量======= 2703bug不需要带出  2714 bug
      if (val.actReceiveQty) {
        o.actReceiveQty = parseFloat(val.actReceiveQty);
      } else {
        o.actReceiveQty = 0;
      }
      // 单位===
      o.unitName = val.unitName;
      o.unitCode = val.unitCode;
      o.unitId = val.unitId;

      // 包装方式
      o.packType = val.packType;

      // 批次
      o.seriesNo = val.seriesNo;

      // 柜号
      o.cabinetNo = val.cabinetNo;

      // 供应商批次号
      o.supplierBatchNo = val.supplierBatchNo;

      // 供方生产日期
      o.productDate = val.productDate;

      // 件数
      o.qty = val.qty;

      // 结算数量===
      o.settleQty = val.settleQty;
      o.actReceiveQty = val.settleQty;
      // 结算单位===
      /* o.settleUnitName = val.settleUnitName;
       o.settleUnitCode = val.settleUnitCode;
       o.settleUnitId = val.settleUnitId;*/

      o.settleUnitName = val.unitName;
      o.settleUnitCode = val.unitCode;
      o.settleUnitId = val.unitId;

      // 采购合同单据号
      o.poNo = val.poNo;

      // 良品====  根据实收
      o.goodsProductQty = o.actReceiveQty;

      o.rejectsProductQty = '0'; //不良品为0


      // 采购合同明细id
      o.poDtlId = val.poDtlId;

      // poGrDtlId 采购赞收单明细ID
      if (val.poGrDtlId) {
        o.sourceDtlId = val.poGrDtlId;
      } else {
        o.sourceDtlId = '';
      }


      // 如果没有元素了， 直接加一个
      if (len == 0) {
        o['poGrRowNo'] = '1';
        // this.riseData.codPoGrDtlCusList.push(o);
      } else {
        o['poGrRowNo'] = (parseInt(list[len - 1]['poGrRowNo']) + 1) + '';
      }



      this.riseData.codPoGrDtlCusList.push(o);

      this.calculateOrginAmtAndBaseAmt(this.riseData.codPoGrDtlCusList.length - 1)

    },
    // 合同
    setContractInfoDialog(val, index) {
      console.log(val, index);

      this.headers = headersPoGr;

      var obj = this.codPoGrDtlCusObj;
      var list = this.riseData.codPoGrDtlCusList;
      var len = list.length;

      var o = {};
      for (var key in obj) {
        o[key] = val[key];
      }

      o.orginPrice = val.orginPrice;
      o.orginPriceTex = val.orginPriceTex;
      o.basePrice = val.basePrice;
      o.basePriceTex = val.basePriceTex;
      o.baseAmt = val.baseAmt;
      o.baseAmtTex = val.baseAmtTex;
      o.orginAmt = val.orginAmt;
      o.orginAmtTex = val.orginAmtTex;


      // 给o赋值val的值
      // poContactNo 后台数据库录错了
      o.poContractNo = val.poContractNo;

      o.goodsCode = val.goodsCode;
      o.goodsName = val.goodsName;
      o.goodsId = val.goodsId;

      // 实收数量=======2703bug不需要带出
      /*if (val.actReceiveQty) {
        o.actReceiveQty = parseFloat(val.actReceiveQty);
      } else {
        o.actReceiveQty = 0;
      }*/

      // 单位===
      o.unitName = val.unitName;
      o.unitCode = val.unitCode;
      o.unitId = val.unitId;

      // 包装方式
      o.packType = val.packType;

      // 批次
      o.seriesNo = val.seriesNo;

      // 柜号
      o.cabinetNo = val.cabinetNo;

      // 供应商批次号
      o.supplierBatchNo = val.supplierBatchNo;

      // 供方生产日期
      o.productDate = val.productDate;

      // 件数
      o.qty = val.qty

      // 结算数量===
      o.settleQty = val.itemQty; //采购合同明细数量

      o.actReceiveQty = o.settleQty; //实收取结算

      // 结算单位===
      /*o.settleUnitName = val.settleUnitName;
      o.settleUnitCode = val.settleUnitCode;
      o.settleUnitId = val.settleUnitId;*/

      o.settleUnitName = val.unitName;
      o.settleUnitCode = val.unitCode;
      o.settleUnitId = val.unitId;

      // 采购合同单据号
      o.poNo = val.poNo;

      // 良品====
      o.goodsProductQty = o.actReceiveQty;

      o.rejectsProductQty = '0';

      // 采购合同明细id
      o.poDtlId = val.poDtlId;

      // poGrDtlId 采购暂收收单明细ID
      if (val.poDtlId) {
        // o.sourceDtlId = val.poGrDtlId;
        o.sourceDtlId = val.poDtlId;
      } else {
        o.sourceDtlId = '';
      }

      // 原币金额计算 
      /*if (val.settleQty && val.itemQty) {
        if (val.orginAmtTex) {
          o.orginPriceTex = NP.times(NP.divide(val.settleQty, val.itemQty), val.orginAmtTex); //含税
        } else {
          o.orginPriceTex = 0;
        }
        if (val.orginAmt) {
          o.orginPrice = NP.times(NP.divide(val.settleQty, val.itemQty), val.orginAmt); //不含税
        } else {
          o.orginPrice = 0;
        }
      } else {
        o.orginPriceTex = 0;
        o.orginPrice = 0;
      }*/



      // 如果没有元素了， 直接加一个
      if (len == 0) {
        o['poGrRowNo'] = '1';
        // this.riseData.codPoGrDtlCusList.push(o);
      } else {
        o['poGrRowNo'] = (parseInt(list[len - 1]['poGrRowNo']) + 1) + '';
      }

      this.riseData.codPoGrDtlCusList.push(o);


      this.calculateOrginAmtAndBaseAmt(this.riseData.codPoGrDtlCusList.length - 1)
    },
    // 在途单
    setOwInfoDialog(val, index) {
      console.log(val, index);
      this.headers = headers;

      var obj = this.codPoGrDtlCusObj;
      var list = this.riseData.codPoGrDtlCusList;
      var len = list.length;

      var o = {};
      for (var key in obj) {
        o[key] = val[key];
      }

      o.orginPrice = val.orginPrice;
      o.orginPriceTex = val.orginPriceTex;
      o.basePrice = val.basePrice;
      o.basePriceTex = val.basePriceTex;
      o.baseAmt = val.baseAmt;
      o.baseAmtTex = val.baseAmtTex;
      o.orginAmt = val.orginAmt;
      o.orginAmtTex = val.orginAmtTex;

      // 给o赋值val的值
      // poContactNo 后台数据库录错了
      o.poContractNo = val.poContractNo;

      o.goodsCode = val.goodsCode;
      o.goodsName = val.goodsName;
      o.goodsId = val.goodsId;

      // 实收数量======= 2703bug说不需要带出
      /*if (val.actReceiveQty) {
        o.actReceiveQty = parseFloat(val.actReceiveQty);
      } else {
        o.actReceiveQty = 0;
      }*/



      // 单位===
      o.unitName = val.unitName;
      o.unitCode = val.unitCode;
      o.unitId = val.unitId;

      // 包装方式
      o.packType = val.packType;

      // 批次
      o.seriesNo = val.seriesNo;

      // 柜号
      o.cabinetNo = val.cabinetNo;

      // 供应商批次号
      o.supplierBatchNo = val.supplierBatchNo;

      // 供方生产日期
      o.productDate = val.productDate;

      // 件数
      o.qty = val.qty

      // 结算数量===
      o.settleQty = val.settleQty;

      o.actReceiveQty = val.netWeight; //净重

      // 结算单位===
      /*o.settleUnitName = val.settleUnitName;
      o.settleUnitCode = val.settleUnitCode;
      o.settleUnitId = val.settleUnitId;*/

      o.settleUnitName = val.unitName;
      o.settleUnitCode = val.unitCode;
      o.settleUnitId = val.unitId;

      // 采购合同单据号
      o.poNo = val.poNo;

      // 良品====
      o.goodsProductQty = o.actReceiveQty;
      o.rejectsProductQty = '0';


      // 采购合同明细id
      o.poDtlId = val.poDtlId;

      // poGrDtlId 采购赞收单明细ID
      if (val.owDtlId) {
        o.sourceDtlId = val.owDtlId;
      } else {
        o.sourceDtlId = '';
      }


      // 如果没有元素了， 直接加一个
      if (len == 0) {
        o['poGrRowNo'] = '1';
        // this.riseData.codPoGrDtlCusList.push(o);
      } else {
        o['poGrRowNo'] = (parseInt(list[len - 1]['poGrRowNo']) + 1) + '';
      }



      this.riseData.codPoGrDtlCusList.push(o);

      this.calculateOrginAmtAndBaseAmt(this.riseData.codPoGrDtlCusList.length - 1)

    },

    handleRowClick(row, event, column) {

    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handlePurchasAndOperationChange() {

      var vm = this;

      var poGrType = vm.riseData.poGrType;
      var operationType = vm.riseData.operationType;
      if (poGrType == '72300010' && operationType == "74050020") { //国内暂收---》只读
        this.sourceNoType = '3';
        vm.lbNoDisabled = false; //提单号输入

        vm.rules.warehouseName[0].required = false;
        vm.rules.sourceNo[0].required = false;

      } else if (poGrType == '72300010' && operationType == "74050010") { //国内入库---》暂收单
        this.sourceNoType = '1';
        vm.lbNoDisabled = true; //提单号输入
        vm.rules.warehouseName[0].required = true;
        vm.rules.sourceNo[0].required = true;
      } else if (poGrType != '72300010' && operationType == "74050010") { //进口入库 --》在途单号
        this.sourceNoType = '2';
        vm.lbNoDisabled = true; //提单号带出
        vm.rules.warehouseName[0].required = true;
        vm.rules.sourceNo[0].required = true;
      } else {
        this.sourceNoType = '3';
        vm.lbNoDisabled = false; //提单号输入

        vm.rules.warehouseName[0].required = false;
        vm.rules.sourceNo[0].required = false;
      }

      vm.riseData.sourceNo = '';
      vm.riseData.sourceId = '';

      this.childeventHandlePoGrNo(null);

    },
    // 移动类型值发生变化
    handleOperationTypeChange(val) {
      var vm = this;

      // vm.operationType
      /*    "72300010": "国内采购",
    "72300020": "自营进口",
    "72300030": "代理进口"*/
      /*    "74050010": "入库单",
      "74050020": "暂收单",*/

      // //采购暂收 1/在途单号 2/只读3  判断


      // warehouseName
      // sourceNo
      if (val == "74050020") { //暂收

        vm.rules.warehouseName[0].required = false;
        vm.rules.sourceNo[0].required = false;

        vm.actReceiveAmtDisabled = false; //实收数量合计

        vm.poGrStatusDisabled = false; //单据状态
      } else if (val == "74050010") { //入库
        // vm.lbNoDisabled = true; //提单号带出
        vm.rules.warehouseName[0].required = true;
        vm.rules.sourceNo[0].required = true;

        vm.actReceiveAmtDisabled = true; //实收数量合计

        vm.poGrStatusDisabled = true; //单据状态
      } else {
        // vm.lbNoDisabled = false; //提单号输入
        vm.rules.warehouseName[0].required = false;
        vm.rules.sourceNo[0].required = false;
        vm.poGrStatusDisabled = false; //单据状态
        vm.actReceiveAmtDisabled = false; //实收数量合计
      }

      this.handlePurchasAndOperationChange();


    },

    // 采购类型选择值发生变化
    handlePoGrStatusChange(val) {
      var vm = this;
      /*  movementTypeOptions: [
        { "value": "74050010", "label": "入库单", disabled: true},
        { "value": "74050020", "label": "暂收单", disabled: true},
      ], //移动类型*/
      //选择国内采购可选择暂收和入库，非国内采购只能选择入库  

      if (val == '72300010') { //选择了国内采购
        // 在这里更改弹窗， 直接利用变量和v-if实现
        this.sourceName = '采购暂收';
        // this.riseData.operationType = '74050020';
        this.movementTypeOptions = [
          { "value": "74050010", "label": "入库单", disabled: false },
          { "value": "74050020", "label": "暂收单", disabled: false },
        ]
        this.riseData.operationType = '74050020';

        //默认人民币
        /* this.riseData.currencyCode = 'CNY';
         this.riseData.currencyId = '3833D6D58235DF20E050A8C043FA215F';
         this.riseData.currencyName = '中国人民币（国际）';*/

        this.riseData.rateCurrency = '1.00000000';

      } else { //不是国内采购 进口采购
        this.sourceName = '在途单号';
        this.movementTypeOptions = [
          { "value": "74050010", "label": "入库单", disabled: false },
          { "value": "74050020", "label": "暂收单", disabled: true },
        ];
        this.riseData.operationType = '74050010';


        /*this.riseData.currencyCode = '';
        this.riseData.currencyId = '';
        this.riseData.currencyName = '';*/

        this.riseData.rateCurrency = '';
      }


      this.handlePurchasAndOperationChange();


    },
    // 币别
    childEventHandleCurrency(val) {
      console.log(val);
      if (val) {
        this.riseData.currencyName = val.currencyName;
        this.riseData.currencyCode = val.currencyCode;
        this.riseData.currencyId = val.currencyId;
        if (val.exchangeRate) {
          this.riseData.rateCurrency = val.exchangeRate.toFixed(8);
        } else {
          var zero = 0;
          this.riseData.rateCurrency = zero.toFixed(8);
        }


      } else {
        this.riseData.currencyName = '';
        this.riseData.currencyCode = '';
        this.riseData.currencyId = '';

        var zero = 0;
        this.riseData.rateCurrency = zero.toFixed(8);
      }

      this.$refs['riseDataForm'].validateField('currencyName');
    },
    // 单位选择
    childEventHandleUnit(val, index) {
      if (val) {
        /*settleUnitId   settleUnitName   settleUnitCode*/
        this.riseData.codPoGrDtlCusList[index].unitName = val.unitName;
        this.riseData.codPoGrDtlCusList[index].unitCode = val.unitCode;
        this.riseData.codPoGrDtlCusList[index].unitId = val.unitId;
      } else {
        this.riseData.codPoGrDtlCusList[index].unitName = '';
        this.riseData.codPoGrDtlCusList[index].unitCode = '';
        this.riseData.codPoGrDtlCusList[index].unitId = '';
      }
    },
    // 结算单位
    childEventHandleSettleUnitNameUnit(val, index) {
      if (val) {
        /*settleUnitId   settleUnitName   settleUnitCode*/
        this.riseData.codPoGrDtlCusList[index].settleUnitName = val.unitName;
        this.riseData.codPoGrDtlCusList[index].settleUnitCode = val.unitCode;
        this.riseData.codPoGrDtlCusList[index].settleUnitId = val.unitId;
      } else {
        this.riseData.codPoGrDtlCusList[index].settleUnitName = '';
        this.riseData.codPoGrDtlCusList[index].settleUnitCode = '';
        this.riseData.codPoGrDtlCusList[index].settleUnitId = '';
      }

      console.log(val, index);
      // this.$refs['riseDataForm'].validateField('unitName');
    },
    childEventHandlerWarehouse(val) {
      if (val) {
        this.riseData.warehouseName = val.warehouseName;
        this.riseData.warehouseCode = val.warehouseCode;
        this.riseData.warehouseId = val.warehouseId;
      } else {
        this.riseData.warehouseName = '';
        this.riseData.warehouseCode = '';
        this.riseData.warehouseId = '';
      }
      this.$refs['riseDataForm'].validateField('warehouseName');
    },
    // 暂收单
    childeventHandlePoGrNo(val) {
      console.log(val);
      if (val) {
        this.riseData.sourceNo = val.poGrNo;
        this.riseData.sourceId = val.poGrId;

        //到货类型和提单号
        // this.riseData.poGrStatus = (val.poGrStatus += '');
        this.riseData.billNo = val.billNo;

        // 经营主体
        this.riseData.manageSubName = val.manageSubName;
        this.riseData.manageSubCode = val.manageSubCode;
        this.riseData.manageSubId = val.manageSubId;

        // 供应商
        this.riseData.supplierName = val.supplierName;
        this.riseData.supplierCode = val.supplierCode;
        this.riseData.supplierId = val.supplierId;

        //部门  部门没有
        this.riseData.bizOrgId = val.bizOrgId;
        this.riseData.bizOrgCode = val.bizOrgCode;
        this.riseData.bizOrgName = val.bizOrgName;

        // 币别
        this.riseData.currencyName = val.currencyName;
        this.riseData.currencyCode = val.currencyCode;
        this.riseData.currencyId = val.currencyId;

        //汇率
        this.riseData.rateCurrency = val.rateCurrency.toFixed(8);

        // 实收数量 
        this.riseData.actReceiveAmt = val.actReceiveAmt;

      } else {
        this.riseData.sourceNo = '';
        this.riseData.sourceId = '';

        // this.riseData.poGrStatus = '';
        this.riseData.billNo = '';


        // 经营主体
        this.riseData.manageSubName = '';
        this.riseData.manageSubCode = '';
        this.riseData.manageSubId = '';

        // 供应商
        this.riseData.supplierName = '';
        this.riseData.supplierCode = '';
        this.riseData.supplierId = '';

        //部门  部门没有
        this.riseData.bizOrgId = '';
        this.riseData.bizOrgCode = '';
        this.riseData.bizOrgName = '';

        // 币别
        this.riseData.currencyName = '';
        this.riseData.currencyCode = '';
        this.riseData.currencyId = '';

        // 汇率
        this.riseData.rateCurrency = '';

        // 实收数量 
        this.riseData.actReceiveAmt = 0;
      }

      this.$refs['riseDataForm'].validateField('sourceNo');

    },
    // 在途单
    childeventHandleOw(val) {
      console.log(val);
      if (val) {
        // 来源单
        this.riseData.sourceNo = val.owNo;
        this.riseData.sourceId = val.owId;
        // lbId   isWay  lbNo
        // 提单号 billNo 
        this.riseData.billNo = val.billNo;
        // 供应商
        this.riseData.supplierName = val.supplierName;
        this.riseData.supplierCode = val.supplierCode;
        this.riseData.supplierId = val.supplierId;
        // 部门
        this.riseData.bizOrgCode = val.bizOrgCode;
        this.riseData.bizOrgId = val.bizOrgId;
        this.riseData.bizOrgName = val.bizOrgName;

        // 经营主体
        this.riseData.manageSubName = val.manageSubName;
        this.riseData.manageSubCode = val.manageSubCode;
        this.riseData.manageSubId = val.manageSubId;

        // 币别
        this.riseData.currencyName = val.currencyName;
        this.riseData.currencyCode = val.currencyCode;
        this.riseData.currencyId = val.currencyId;

        // 对人民币汇率
        if (val.rateCurrency) {
          this.riseData.rateCurrency = val.rateCurrency
        } else {
          this.riseData.rateCurrency = '';
        }


      } else {
        this.riseData.sourceNo = '';
        this.riseData.sourceId = '';

        this.riseData.supplierName = '';
        this.riseData.supplierCode = '';
        this.riseData.supplierId = '';

        // 部门
        this.riseData.bizOrgCode = '';
        this.riseData.bizOrgId = '';
        this.riseData.bizOrgName = '';

        // 经营主体
        this.riseData.manageSubName = '';
        this.riseData.manageSubCode = '';
        this.riseData.manageSubId = '';


        // 币别
        this.riseData.currencyName = '';
        this.riseData.currencyCode = '';
        this.riseData.currencyId = '';

        // 对人民币汇率
        this.riseData.rateCurrency = '';

      }
      this.$refs['riseDataForm'].validateField('sourceNo');

    },
    childEventHandlerDepartment(val) {
      var _this = this;
      if (val) {
        _this.riseData.bizOrgCode = val.orgCode;
        // _this.riseData.bizOrgDesc = val.orgDesc;
        _this.riseData.bizOrgId = val.orgId;
        _this.riseData.bizOrgName = val.orgName;
        // _this.riseData.credenNo= val.orgCode;
      } else {
        _this.riseData.bizOrgCode = '';
        // _this.riseData.bizOrgDesc = val.orgDesc;
        _this.riseData.bizOrgId = '';
        _this.riseData.bizOrgName = '';
      }
      this.$refs['riseDataForm'].validateField('bizOrgName');
    },
    childEventHandleSupplier(val) {
      console.log(val);
      if (val) {
        this.riseData.supplierName = val.supplyName;
        this.riseData.supplierCode = val.supplyCode;
        this.riseData.supplierId = val.id;
      } else {
        this.riseData.supplierName = '';
        this.riseData.supplierCode = '';
        this.riseData.supplierId = '';
      }
      this.$refs['riseDataForm'].validateField('supplierName');
    },
    // riseData.manageSubName
    // 经营主体
    childEventHandleManageSubName(val) {
      console.log(val);
      if (val) {
        this.riseData.manageSubName = val.companyName;
        this.riseData.manageSubCode = val.companyCode;
        this.riseData.manageSubId = val.companyId;

        this.transferSearch = {
          boolToBtn: true,
          companyName: val.companyName,
          companyCode: val.companyCode,
          companyId: val.companyId,
        }

      } else {
        this.riseData.manageSubName = '';
        this.riseData.manageSubCode = '';
        this.riseData.manageSubId = '';

        this.riseData.bizOrgCode = '';
        // this.riseData.bizOrgDesc = val.orgDesc;
        this.riseData.bizOrgId = '';
        this.riseData.bizOrgName = '';

        this.riseData.supplierName = '';
        this.riseData.supplierCode = '';
        this.riseData.supplierId = '';

        this.transferSearch = {
          boolToBtn: false,
          companyName: '',
          companyCode: '',
          companyId: ''
        }
      }

      //根据经营主体带出币别
      this.childEventHandleCurrency(val);

      this.$refs['riseDataForm'].validateField('manageSubName');
    },

    // 新增新的明细
    handleCreateNewDetail() {

      var vm = this;
      // riseData.codPoGrDtlCusList   明细的list
      // codPoGrDtlCusObj
      var _this = this;
      var list = this.riseData.codPoGrDtlCusList;


      var poGrType = vm.riseData.poGrType;
      var operationType = vm.riseData.operationType;
      if (!poGrType) {
        this.$message({
          message: '请选择采购类型',
          type: 'warning'
        });
        return;
      }
      if (!operationType) {
        this.$message({
          message: '请选择移动类型',
          type: 'warning'
        });
        return;
      }

      if (poGrType == '72300010' && operationType == "74050020") { //国内暂收---》只读

        if (!vm.riseData.manageSubId) {
          this.$message({
            message: '请选择经营主体',
            type: 'warning'
          });
          return;
        }

        if (!vm.riseData.supplierId) {
          vm.$message({
            message: '请选择供应商',
            type: 'warning'
          });
          return;
        }
        if (!vm.riseData.bizOrgId) {
          this.$message({
            message: '请选择部门',
            type: 'warning'
          });
          return;
        }

        // 2842 bug不需要币别
        if (!vm.riseData.currencyId) {
          this.$message({
            message: '请选择币别',
            type: 'warning'
          });
          return;
        }



      } else if (poGrType == '72300010' && operationType == "74050010") { //国内入库---》暂收单
        if (!vm.riseData.sourceNo) {
          this.$message({
            message: '请选择采购暂收',
            type: 'warning'
          });
          return;
        }

        if (!vm.riseData.supplierId) {
          this.$message({
            message: '请选择供应商',
            type: 'warning'
          });
          return;
        }
        if (!vm.riseData.manageSubId) {
          this.$message({
            message: '请选择经营主体',
            type: 'warning'
          });
          return;
        }
        if (!vm.riseData.currencyId) {
          this.$message({
            message: '请选择币别',
            type: 'warning'
          });
          return;
        }


      } else if (poGrType != '72300010' && operationType == "74050010") { //进口入库 --》在途单号
        if (!vm.riseData.sourceNo) {
          this.$message({
            message: '请选择在途单号',
            type: 'warning'
          });
          return;
        }
      } else {

      }







      // 后台返回可能是null
      if (!list) {
        list = [];
        this.riseData.codPoGrDtlCusList = [];
      }

      var len = list.length;

      _this.detailIndex = len;


      this.owInfoDialogFormVisible = true;



    },
    //删除明细
    handleDeleteDetail() {
      var _this = this;
      this.$confirm('您确定要删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {


        var list = this.riseData.codPoGrDtlCusList; //已经存在的数据列表
        var len1 = list.length;
        var rows = this.selectedRows; //选中需要删的
        /* var len2 = rows.length;
      var results = []; //保存不相等的值
      // poGrRowNo
      for (var i = 0; i < len1; i++) {
        var obj = list[i];
        var flag = true;
        for (var j = 0; j < len2; j++) {
          if (obj['poGrRowNo'] == rows[j]['poGrRowNo']) {
            flag = false; //是相等的， 不需要了 直接退出
            break;
          }
        }
        // 走完for还是true， 说明没有一个相等,是需要的
        if (flag) {
          results.push(obj);
        }

      }
*/
        this.riseData.codPoGrDtlCusList = deleteSelectedRows(list, rows, 'poGrRowNo');

        // list = results;
        // rows = null;
        this.selectedRows = [];
        // this.riseData.codPoGrDtlCusList = results;
      }).catch(() => {
        _this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })

    },
    handleCellClick(row, col, cell) {

      // console.log(row, column, cell);
      var vm = this;
      vm.cell = cell;

      // 先前的复位
      if (this.inputDiv && this.columnSpan) {
        this.columnSpan.style.display = 'block';
        this.inputDiv.style.display = 'none';
      }

      if (!cell) {
        return;
      }

      // 处理多选框   还有行号  不想操作的都可以加在这里
      if (cell.querySelector('.el-checkbox') || cell.querySelector('.rowNumber')) {
        return;
      }

      this.inputDiv = cell.querySelector('.toggleShowDiv');
      /*if (cell.querySelector('.el-select')) {
        this.inputDiv = cell.querySelector('.el-select');
      } else if (cell.querySelector('.el-input')) {
        this.inputDiv = cell.querySelector('.el-input'); //日期选择也是el-input
      }*/



      // toggleShowSpan切换显示的span
      this.columnSpan = cell.querySelector('.toggleShowSpan');
      if (this.columnSpan && this.inputDiv) {
        this.columnSpan.style.display = 'none';
        this.inputDiv.style.display = 'block';

        // this.inputDiv.querySelector('.el-input__inner').focus();
        if (this.inputDiv.querySelector('.el-dialog__wrapper')) {

          // this.inputDiv.querySelector('.').querySelector('.el-input__inner').focus();
        } else {
          this.inputDiv.querySelector('.el-input__inner').focus();
        }

      }

    },
    handleSelectionChange(val) {
      this.selectedRows = val;
      console.log(val);
    },
    handleInputBlur(e) {
      // previousSibling - 取得某节点的上一个同级节点
    },
    handleCancel() {

      // 恢复默认一些东西
      this.riseData = null;
      this.riseData = this.$options.riseData;
      this.riseData = getPurchasReceiptDataDefault();
      // this.riseData.codPoGrDtlCusList = [];

      this.sourceName = '采购暂收';
      this.sourceNoType = '3';

      this.activeName = 'first';

      this.movementTypeOptions = [
        { "value": "74050010", "label": "入库单", disabled: false },
        { "value": "74050020", "label": "暂收单", disabled: false },
      ];

      this.$store.dispatch('toggleCurrentView', {
        PurchaseReceipt: {
          view: 'index'
          // params: 跳转过去的子组件的属性对象
        }
      });
      // this.$router.push({ path: '/purchase/PurchaseReceipt/:type' });
    },
    handleWarnMsg(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    },
    // 修改保存
    handleSave() {
      // todo
      // doModify
      var vm = this;
      // if (vm.riseData.createdTime) {
      //   vm.riseData.createdTime = vm.riseData.createdTime.parseTime('YYYY-MM-DD HH:mm:ss');
      // }
      // if (vm.riseData.updatedTime) {
      //   vm.riseData.updatedTime = vm.riseData.updatedTime.parseTime('YYYY-MM-DD HH:mm:ss');
      // }
      // if (vm.riseData.postDate) {
      //   vm.riseData.postDate = vm.riseData.postDate.parseTime('YYYY-MM-DD');
      // }
      var flag = false;

      this.$refs['riseDataForm'].validate((valid) => {
        if (valid) {
          // alert('submit!');
        } else {
          // console.log('error submit!!');
          vm.$message({
            message: '请输入必输的字段',
            type: 'warning'
          });
          flag = true;
        }
      });
      console.log(flag, 'flag');
      if (flag) {
        return;
      }


      eventBus.$emit('validateTable', {
        data: vm.riseData.codPoGrDtlCusList,
        headers: vm.headers,
        success: (valid) => {
          if (!valid) {
            flag = true;
          }
        }
      });

      console.log(flag, 'flag');
      if (flag) {
        return;
      }

      var riseData = JSON.parse(JSON.stringify(vm.riseData));

      // 时间转换
      if (vm.riseData.certificatesDate && (typeof vm.riseData.certificatesDate) != 'string') {
        riseData.certificatesDate = vm.riseData.certificatesDate.parseTime('YYYY-MM-DD');
      }

      //数量合计
      riseData.actReceiveAmt = parseFloat(vm.actReceiveAmt);

      // 单据状态
      riseData.poGrStatus = parseInt(vm.riseData.poGrStatus);
      // 移动类型
      riseData.operationType = parseInt(vm.riseData.operationType);
      riseData.poGrType = parseInt(vm.riseData.poGrType);

      // 金额总计
      riseData.poOrginAmtTex = this.poAmt.poOrginAmtTex;
      riseData.poOrginAmt = this.poAmt.poOrginAmt;
      riseData.poBaseAmtTex = this.poAmt.poBaseAmtTex;
      riseData.poBaseAmt = this.poAmt.poBaseAmt;





      var list = vm.riseData.codPoGrDtlCusList;
      for (var i = 0, len = list.length; i < len; i++) {

        if (list[i].actReceiveQty == 0) {
          vm.handleWarnMsg('实收数量不能为0');
          return;
        }

        // 结算数量小于等于实收数量
        if (parseFloat(list[i].settleQty) > parseFloat(list[i].actReceiveQty)) {
          vm.handleWarnMsg('结算数量需要小于等于实收数量');
          return;
        }

        /*
                if (!list[i].actReceiveQty && list[i].actReceiveQty != 0) {
                  vm.handleWarnMsg('实收数量为必填字段')
                  return;
                }
                if (!list[i].unitName) {
                  vm.handleWarnMsg('单位为必填字段')
                  return;
                }
                if (!list[i].pack) {
                  vm.handleWarnMsg('包装方式为必填字段')
                  return;
                }
                if (!list[i].supplierBatchNo) {
                  vm.handleWarnMsg('供应商批次号为必填字段')
                  return;
                }
                if (!list[i].productDate) {
                  vm.handleWarnMsg('供方生产日期为必填字段')
                  return;
                }
                if (!list[i].qty) {
                  vm.handleWarnMsg('件数为必填字段')
                  return;
                }
                if (!list[i].settleQty) {
                  vm.handleWarnMsg('结算数量为必填字段')
                  return;
                }
                if (!list[i].settleUnitName) {
                  vm.handleWarnMsg('结算单位为必填字段')
                  return;
                }
                if (!list[i].goodsProductQty) {
                  vm.handleWarnMsg('良品为必填字段')
                  return;
                }
                if (!list[i].rejectsProductQty) {
                  vm.handleWarnMsg('不良品为必填字段')
                  return;
                }*/



        if (vm.riseData.codPoGrDtlCusList[i].productDate && (typeof vm.riseData.codPoGrDtlCusList[i].productDate) != 'string') {
          riseData.codPoGrDtlCusList[i].productDate = vm.riseData.codPoGrDtlCusList[i].productDate.parseTime('YYYY-MM-DD');
        }
        riseData.codPoGrDtlCusList[i].packType = parseInt(vm.riseData.codPoGrDtlCusList[i].packType);


        delete riseData.codPoGrDtlCusList[i].$index;


      }

      doSave(riseData).then(res => {
        var data = res.data;
        if (data.status == 1) {
          vm.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success'
          });
          vm.riseData = getPurchasReceiptDataDefault();
          vm.handleCancel();

          // 通过data.data 重新查询
          /*getDetailData({ id: data.data }).then(res2 => {

            if (res2.data.status == 1) {
              vm.riseData = res2.data.data;
            }
          }).catch(e => {

          });*/
        }
      }).catch(e => {
        vm.$notify.error({
          title: '失败',
          message: '保存失败'
        });
      })

    },
    handleTabClick(tab) {
      console.log(tab);

    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.query);
    next();
  },
  mounted() {

  },
  activated() {


    var query = this.$route.query;


  },
  created() {
    // console.log(NP, 'npnpnppnpnpnp');
    // console.log(this.$store.getters.params.PurchaseReceipt, 'asdasdad');
  }
}

</script>
<style>
.saveAndCancelbtns {
  /*border-bottom: 1px solid #ccc;*/
  padding: 0px 0 10px 0px;
}

.infoDataTabs {
  /*padding-left: 15px;*/
  /*height: 300px;*/
  /*border-bottom: 1px solid #ccc;*/
  /*padding-right: 15px;*/
  padding-bottom: 10px;
}

.infoDataTabs .el-tabs__item {
  /*padding-left: 20px !important;*/
}

.footer {
  padding-top: 10px;
}

.createAndDeleteAndCopyBtns {
  /*padding-left: 15px;*/
  margin-bottom: 15px;
}

.footerTables {
  /*padding: px;*/
}



.pushDefeatReason {
  height: auto !important;
}

.fileUpload {
  padding: 10px 0 10px 0px;
  width: 40%;
}

.fileOperation {
  padding: 10px 0 10px 0px;
}

.tabPane {
  padding-bottom: 15px;
}

.tabPaneSecond {
  /*padding-bottom: 34px;*/
}

.tabPaneThird {
  padding-bottom: 30px;
}

.toggleShowDiv .searchDialogOpen {
  height: auto;
}

</style>
