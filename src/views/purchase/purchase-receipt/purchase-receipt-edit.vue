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
            <el-form :rules="rules" ref="riseDataForm" :model="riseData" label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="收货单号">
                    <el-input disabled size="mini" v-model="riseData.poGrNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="采购类型">
                    <el-select disabled size="mini" v-model="riseData.poGrType" placeholder="请选择类型">
                      <el-option v-for="item in purchasTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="移动类型">
                    <el-select disabled size="mini" clearable v-model="riseData.operationType" placeholder="请选择类型">
                      <el-option v-for="item in movementTypeOptions" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="入库仓库" prop="warehouseName">
                    <!-- name id code -->
                    <warehouse-select @childevent="childEventHandlerWarehouse" :querySelect="riseData.warehouseName"></warehouse-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <!-- 采购暂收/在途单号 lbNo  lbId -->
                  <el-form-item :label="sourceName">
                    <!-- 采购类型为国内采购，移动类型为暂收，该字段只读  
采购类型为国内采购，移动类型为收货，该字段弹窗为采购暂收单号   
采购类型为进口采购，移动类型为收货，该字段弹窗为采购在途单弹窗-->
                    <el-input size="mini" disabled v-model="riseData.sourceNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据日期" prop="certificatesDate">
                    <!-- <el-input size="mini" v-model="riseData.certificatesDate"></el-input> -->
                    <el-date-picker :editable="false" size="mini" v-model="riseData.certificatesDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="经营主体">
                    <!-- manageSubId manageSubCode -->
                    <el-input disabled size="mini" v-model="riseData.manageSubName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="提单号">
                    <!-- 提单在途  No Id   lbId-->
                    <el-input disabled size="mini" v-model="riseData.billNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="供应商">
                    <!-- name id code -->
                    <el-input size="mini" disabled v-model="riseData.supplierName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门">
                    <!-- name id code -->
                    <el-input size="mini" disabled v-model="riseData.bizOrgName"></el-input>
                    <!-- <department-select @childevent="childEventHandlerDepartment" :querySelect="riseData.bizOrgName"></department-select> -->
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据状态">
                    <el-select disabled size="mini" v-model="riseData.poGrStatus" placeholder="请选择状态">
                      <el-option v-for="item in purchaseReceiptStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别">
                    <!-- name code id -->
                    <el-input size="mini" disabled v-model="riseData.currencyName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="实收数量合计">
                    <el-input disabled size="mini" v-number-only:10.abs="2" v-model="actReceiveAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="OA审核标题">
                    <el-input size="mini" v-model="riseData.auitTitle"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="对人民币汇率">
                    <el-input disabled @change="calculateOrginAmtAndBaseAmtAccordToRateCurrency" @blur="handleRateCurrencyChange" v-number-only:10.abs="8" size="mini" v-model="riseData.rateCurrency"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注">
                    <el-input size="mini" v-model="riseData.remark"></el-input>
                  </el-form-item>
                </el-col>
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
                    <el-input size="mini" v-model="riseData.credenIden"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="凭证过账编号">
                    <el-input size="mini" v-model="riseData.credenNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col class="pushDefeatReason" :span="24">
                  <el-form-item label="推送失败原因">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="riseData.failReason">
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
                    <el-input disabled size="mini" placeholder="0.00" v-model="poAmt.poOrginAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原币金额总计(不含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model="poAmt.poOrginAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本位币金额总计(含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model="poAmt.poBaseAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本位币金额总计(不含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model="poAmt.poBaseAmt"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相关文件" name="fourth">
          <div class="tabPane">
            <div class="fileUpload">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">上传</el-button>
                <span slot="tip" class="el-upload__tip">文件上传上限20M</span>
              </el-upload>
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
                    <el-date-picker disabled size="mini" v-model="riseData.createdTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="修改时间">
                    <!-- <el-input size="mini" v-model="riseData.updatedTime"></el-input> -->
                    <el-date-picker disabled size="mini" v-model="riseData.updatedTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="width:75%;" label="过账时间">
                    <!-- <el-input size="mini" v-model="riseData.postDate"></el-input> -->
                    <el-date-picker disabled size="mini" v-model="riseData.postDate" type="datetime" placeholder="选择日期时间">
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
        <el-button @click="createNewDetailData" type="primary" size="small">创建</el-button>
        <el-button @click="handleDeleteDetail" type="warning" size="small">删除</el-button>
        <!-- <el-button @click="handleCopyData" type="success" size="small">复制</el-button> -->
      </div>
      <div>
        <common-table :data="riseData.codPoGrDtlCusList" :maxHeight="400" :fit="true" ref="multipleTable" :headers="headers" @selection-change="handleSelectionChange">
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text=='packType'">
              <span>{{riseData.codPoGrDtlCusList[scope.index].packType | parsePackType}}</span>
            </div>
          </template>
          <template slot="default" slot-scope="scope">
            <div v-if="scope.text=='unitName'">
              <unit-select @childevent="childEventHandleUnit" :querySelect="riseData.codPoGrDtlCusList[scope.index].unitName" :rowIndex="scope.index"></unit-select>
            </div>
            <div v-if="scope.text == 'settleUnitName'">
              <unit-select @childevent="childEventHandleSettleUnitNameUnit" :querySelect="riseData.codPoGrDtlCusList[scope.index].settleUnitName"></unit-select>
            </div>
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
    </div>
    <!-- 暂收 -->
    <pogr-dialog v-if="sourceNoType=='1'" :detailIndex="detailIndex" :poGrId="riseData.sourceId" :supplierId="riseData.supplierId" :manageSubId="riseData.manageSubId" :currencyId="riseData.currencyId" :owInfoDialogFormVisible="owInfoDialogFormVisible" @closeItem="closeOwInfoDialog" @setItem="setPoGrInfoDialog"></pogr-dialog>
    <!-- 在途 -->
    <owinfo-dialog v-else-if="sourceNoType=='2'" :detailIndex="detailIndex" :owId="riseData.sourceId" :owInfoDialogFormVisible="owInfoDialogFormVisible" @closeItem="closeOwInfoDialog" @setItem="setOwInfoDialog"></owinfo-dialog>
    <!-- 合同 supplierId currencyName manageSubName-->
    <contract-dialog v-else="sourceNoType=='3'" :detailIndex="detailIndex" :supplierId="riseData.supplierId" :currencyName="riseData.currencyName" :manageSubName="riseData.manageSubName" :owInfoDialogFormVisible="owInfoDialogFormVisible" @closeItem="closeOwInfoDialog" @setItem="setContractInfoDialog"></contract-dialog>
  </div>
</template>
<script type="text/javascript">
/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-22
 * ============================
 */

import { getList, getDetailData, doModify } from '../../../api/purchase/purchas-receipt/index.js'
import {
  deleteSelectedRows,
  calculateOrderDatail,
  amtTexBlur,
  imtAmtTexBur,
  imtTaxTexBur
} from '../../../util/index.js'


import { getPurchasReceiptEditDataDefault } from '../../../util/getDefault.js'

import { ENUMS } from '../../../assets/enums.js'

import DepartmentSelect from 'components/common-select/department-select.vue' //部门
import WarehouseSelect from 'components/common-select/warehouse-select.vue' //仓库
import UnitSelect from '@/components/common-select/unit-select.vue' //单位

import owinfoDialog from './owinfo-dialog.vue'; //在途单号
import pogrDialog from './pogr-dialog.vue'; //暂收单号
import contractDialog from './contract-dialog.vue'; //合同号

import NP from 'number-precision'

const fileHeaders = [
  { prop: 'fileOperation', label: '文件操作' },
  { prop: 'fileName', label: '文件名称' },
  { prop: 'creater', label: '创建人' },
  { prop: 'createTime', label: '创建时间' },
]


const headers = [

  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'poGrRowNo', label: '行号', width: '100px', align: 'center' },
  { prop: 'poContractNo', label: '采购合同号', width: '180px', align: 'center' },
  { prop: 'goodsCode', label: '物料编号', width: '120px', align: 'center' },
  { prop: 'goodsName', label: '物料名称', width: '180px', align: 'center' },
  { prop: 'actReceiveQty', required: true, label: '实收数量', width: '120px', align: 'center', editable: true },
  // start
  // template: 'unitName'
  { prop: 'unitName', required: true, label: '单位', width: '120px', align: 'center' },
  { prop: 'packType', required: true, label: '包装方式', width: '120px', align: 'center', filter: 'packType' },
  { prop: 'seriesNo', label: '批次', width: '120px', align: 'center' },
  { prop: 'cabinetNo', label: '柜号', width: '120px', align: 'center' },
  { prop: 'supplierBatchNo', required: true, label: '供应商批次号', width: '120px', align: 'center', editable: true }, //
  {
    prop: 'productDate',
    required: true,
    label: '供方生产日期',
    dataType: 'Date',
    width: '120px',
    align: 'center',
    template: 'productDate'
    // filter: 'productDate'
  },
  { prop: 'qty', label: '件数', required: true, width: '120px', align: 'center', editable: true },
  { prop: 'settleQty', required: true, label: '结算数量', width: '120px', align: 'center', template: 'settleQty' },
  // end
  { prop: 'settleUnitName', required: true, label: '结算单位', width: '120px', align: 'center', template: 'settleUnitName' },
  { prop: 'poNo', label: '采购合同单据号', width: '120px', align: 'center' }, //poGrStatusDisabled
  { prop: 'goodsProductQty', required: true, label: '良品', dataType: 'Number', digit: 0, width: '120px', align: 'center', editable: true },
  { prop: 'rejectsProductQty', required: true, label: '不良品', dataType: 'Number', digit: 0, width: '120px', align: 'center', editable: true },
  { prop: 'remark', label: '备注', width: '120px', align: 'center', editable: true },
]

export default {
  components: {
    DepartmentSelect,
    WarehouseSelect,
    UnitSelect,
    owinfoDialog,
    pogrDialog,
    contractDialog
  },
  props: {

  },
  data() {
    return {
      owInfoDialogFormVisible: false,
      sourceNoType: '0', //明细的弹出类型
      detailIndex: 0,
      fileHeaders: fileHeaders,
      headers: headers,
      // list: baseList,
      activeName: 'first',
      sourceName: '', //来源单名字
      purchasTypeOptions: ENUMS.array7230,
      movementTypeOptions: ENUMS.array7405, //移动类型
      purchaseReceiptStatusOptions: ENUMS.array7030,
      packTypeOptions: ENUMS.array7135, //包装方式
      queryId: '',
      riseData: {


        poGrId: '',
        poGrNo: '',
        rateCurrency: '', //对人民币汇率
        sourceNo: '',
        sourceId: '',
        poGrStatus: '',
        operationType: '',
        manageSubCode: '',
        manageSubName: '',
        manageSubId: '',
        poGrType: '',
        supplierId: '',
        supplierCode: '',
        supplierName: '',
        bizOrgId: '',
        bizOrgCode: '',
        bizOrgName: '',
        certificatesDate: '',
        warehouseId: '',
        warehouseCode: '',
        warehouseName: '',
        auitTitle: '',
        actReceiveAmt: 0,
        poOrginAmt: 0,
        poOrginAmtTex: 0,
        poBaseAmt: 0,
        billNo: '',
        poBaseAmtTex: 0,
        currencyId: '',
        currencyCode: '',
        currencyName: '',
        rateCurrency: 1,
        credenIden: 0,
        credenNo: '',
        failReason: '',
        isReturn: 1,
        setttleWeight: 1,
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
        codPoGrDtlCusList: [],


        deleteIdList: []
      },
      // 明细里面的数据
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
        goodsName: '',
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
        productDate: '',
        packType: '',
        remark: '',
        isDel: 0,
        createdBy: '',
        createdTime: '',
        updatedTime: '',
        updatedBy: '',
        version: 1,
        isInactive: 1,
        isolationCode: 1,
        baseTexAmt: 0,
        texRate: 1,
        orginTexAmt: 0,
      },
      rules: {
        warehouseName: [
          { required: true, message: ' ', trigger: 'change' }
        ],
        // certificatesDate: [
        //   { type: 'date', required: true, message: ' ', trigger: 'blur' }
        // ]
      },
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      filesData: [{
          fileOperation: '上传',
          fileName: 'index.js',
          creater: 'xdyuan',
          createTime: new Date()
        },
        {
          fileOperation: '下载',
          fileName: 'src.js',
          creater: 'sss',
          createTime: new Date() + 3600 * 24
        }
      ],

      inputDiv: null,
      columnSpan: null,
      cell: null,


      selectedRows: [], //选中的明细

    }
  },
  computed: {
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

      console.log(poOrginAmtTex, poOrginAmt, poBaseAmtTex, poBaseAmt, '=======');
      return {
        poOrginAmtTex: poOrginAmtTex.toFixed(2),
        poOrginAmt: poOrginAmt.toFixed(2),
        poBaseAmtTex: poBaseAmtTex.toFixed(2),
        poBaseAmt: poBaseAmt.toFixed(2),

      };
    }
  },
  filters: {},
  methods: {

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

    handleWarnMsg(msg) {
      this.$message({
        message: msg,
        type: 'warning'
      });
    },

    /*    handleSettleQtyChange(index) {
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
          this.riseData.codPoGrDtlCusList[index].orginAmtTex = o.amtTex || 0 //含税金额
          // this.riseData.codPoGrDtlCusList[index].originTexAmt = o.texAmt //  税额
          this.riseData.codPoGrDtlCusList[index].orginAmt = o.amt || 0 //税前金额
          this.riseData.codPoGrDtlCusList[index].orginPrice = o.price || 0 //无税单价
          if (o.price && this.riseData.rateCurrency) {
            this.riseData.codPoGrDtlCusList[index].basePrice = (NP.times(o.price, this.riseData.rateCurrency)).toFixed(6); //本币单价
          } else {
            this.riseData.codPoGrDtlCusList[index].basePrice = 0;
          }
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


          this.riseData.codPoGrDtlCusList[index].orginAmtTex = o.orginAmtTex || 0 // 原币金额 
          this.riseData.codPoGrDtlCusList[index].basePriceTex = o.basePriceTex || 0 // 本币单价
          this.riseData.codPoGrDtlCusList[index].baseAmtTex = o.baseAmtTex || 0 // 本币金额
          // o.texAmt // 增值税金额

        },
    */

    //对人民币汇率  失去焦点
    handleRateCurrencyChange() {
      if (this.riseData.rateCurrency) {
        this.riseData.rateCurrency = parseFloat(this.riseData.rateCurrency).toFixed(8)
      } else {
        this.riseData.rateCurrency = '';
      }


      var list = this.riseData.codPoGrDtlCusList;
      var len = list.length;
      for (var i = 0; i < len; i++) {
        this.imtAmtTexBur(i);
      }

    },
    closeOwInfoDialog() {
      this.owInfoDialogFormVisible = false;
    },
    // 暂收
    setPoGrInfoDialog(val, index) {

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
    childEventHandleUnit(val, index) {
      if (val) {
        this.riseData.codPoGrDtlCusList[index].unitName = val.unitName;
        this.riseData.codPoGrDtlCusList[index].unitCode = val.unitCode;
        this.riseData.codPoGrDtlCusList[index].unitId = val.unitId;
      } else {
        this.riseData.codPoGrDtlCusList[index].unitName = '';
        this.riseData.codPoGrDtlCusList[index].unitCode = '';
        this.riseData.codPoGrDtlCusList[index].unitId = '';
      }

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
    // 部门选择
    childEventHandlerDepartment(val) {
      var _this = this;
      if (val) {
        _this.riseData.bizOrgCode = val.orgCode;
        // _this.riseData.bizOrgDesc = val.orgDesc;
        _this.riseData.bizOrgId = val.orgId;
        _this.riseData.bizOrgName = val.orgName;
        // _this.riseData.credenNo= val.orgCode;
        return;
      } else {
        _this.riseData.bizOrgCode = '';
        // _this.riseData.bizOrgDesc = val.orgDesc;
        _this.riseData.bizOrgId = '';
        _this.riseData.bizOrgName = '';
      }


    },
    createNewDetailData() {
      // riseData.codPoGrDtlCusList   明细的list
      // codPoGrDtlCusObj
      if (!this.riseData) {
        return;
      }
      var _this = this;
      var list = this.riseData.codPoGrDtlCusList;

      // 后台返回可能是null
      if (!list) {
        list = [];
        this.riseData.codPoGrDtlCusList = [];
      }

      var len = list.length;

      _this.detailIndex = len;


      this.owInfoDialogFormVisible = true;

      /* var obj = this.codPoGrDtlCusObj;

       var o = {};
       for (var key in obj) {
         o[key] = obj[key];
       }

       // 如果没有元素了， 直接加一个
       if (len == 0) {
         o['poGrRowNo'] = '1';
         this.riseData.codPoGrDtlCusList.push(o);
         return;
       }

       o['poGrRowNo'] = (parseInt(list[len - 1]['poGrRowNo']) + 1) + '';

       this.riseData.codPoGrDtlCusList.push(o);*/
    },
    /*handleCopyData() {

      var _this = this;
      var list = this.riseData.codPoGrDtlCusList;
      var len2 = list.length;
      var rows = this.selectedRows;
      var len = rows.length;

      if (len == 0) {
        return;
      }

      for (var i = 0; i < len; i++) {
        len2 = this.riseData.codPoGrDtlCusList.length;
        var o = {};
        for (var key in rows[i]) {
          o[key] = rows[i][key];
        }
        if (typeof(list[len2 - 1]['poGrRowNo']) == 'string') {
          o['poGrRowNo'] = parseInt(list[len2 - 1]['poGrRowNo']) + 1;
        } else {
          o['poGrRowNo'] = list[len2 - 1]['poGrRowNo'] + 1;
        }


        this.riseData.codPoGrDtlCusList.push(o);
      }
    },*/
    // 删除选中的
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
        var len2 = rows.length;
        var results = []; //保存不相等的值
        // poGrRowNo
        for (var i = 0; i < len1; i++) {
          var obj = list[i];
          var flag = true;
          for (var j = 0; j < len2; j++) {
            if (obj['poGrRowNo'] == rows[j]['poGrRowNo']) {
              flag = false; //是相等的， 不需要了 直接退出
              //rows[j] 是被删除的， 需要判断是否有明细id， 有的话放到deleteIdList里面
              if (rows[j].poGrDtlId) {
                this.riseData["deleteIdList"].push(rows[j].poGrDtlId);
              }
              //里面是明细ID，  poGrDtlId
              break;
            }
          }
          // 走完for还是true， 说明没有一个相等,是需要的
          if (flag) {
            results.push(obj);
          }

        }

        list = results;
        rows = null;
        this.selectedRows = [];
        this.riseData.codPoGrDtlCusList = results;

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
      /* if (cell.querySelector('.el-select')) {
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
      console.log(val);
      this.selectedRows = [];
      this.selectedRows = val;
    },
    handleInputBlur(e) {
      // previousSibling - 取得某节点的上一个同级节点
      console.log(e);
    },
    handleCancel() {
      this.$store.dispatch('toggleCurrentView', {
        PurchaseReceipt: {
          view: 'index'
          // params: 跳转过去的子组件的属性对象
        }
      });
      // this.riseData = getPurchasReceiptEditDataDefault();
      // this.$router.push({ path: '/purchase/PurchaseReceipt/:type' });
    },
    // 修改保存
    handleSave() {
      // todo
      // doModify
      var vm = this;

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

      if (flag) {
        return;
      }

      var riseData = JSON.parse(JSON.stringify(this.riseData));


      if (riseData.createdTime) {
        riseData.createdTime = this.riseData.createdTime.parseTime('YYYY-MM-DD HH:mm:ss')
      }

      if (riseData.updatedTime) {
        riseData.updatedTime = this.riseData.updatedTime.parseTime('YYYY-MM-DD HH:mm:ss')
      }

      if (riseData.postDate) {
        riseData.postDate = this.riseData.postDate.parseTime('YYYY-MM-DD HH:mm:ss');
      }

      if(riseData.certificatesDate){
        riseData.certificatesDate = this.riseData.certificatesDate.parseTime('YYYY-MM-DD');
      }

      delete riseData.poGrReCode;
      delete riseData.poGrReId;
      delete riseData.lbNos
      delete riseData.lbId
      delete riseData.poNo
      delete riseData.poId

      // delete riseData.poContractNo

      var list = this.riseData.codPoGrDtlCusList;
      // var codPoGrDtlCusList = this.riseData.codPoGrDtlCusList;

      for (var i = 0, len = list.length; i < len; i++) {
        delete riseData.codPoGrDtlCusList[i].currentInvoiceQty;
        delete riseData.codPoGrDtlCusList[i].unreceivedInvoice;
        delete riseData.codPoGrDtlCusList[i].unreceivedInvoice;

        delete riseData.codPoGrDtlCusList[i].seriesId;
        delete riseData.codPoGrDtlCusList[i].poGrNo;
        delete riseData.codPoGrDtlCusList[i].itemQty;
        delete riseData.codPoGrDtlCusList[i].owDtlId;
        delete riseData.codPoGrDtlCusList[i].suspendQty;
        delete riseData.codPoGrDtlCusList[i].unenteredQty;

        delete riseData.codPoGrDtlCusList[i].$index;


        if (list[i].actReceiveQty == 0) {
          vm.handleWarnMsg('实收数量不能为0');
          return;
        }

        // 结算数量小于等于实收数量
        if (parseFloat(list[i].settleQty) > parseFloat(list[i].actReceiveQty)) {
          vm.handleWarnMsg('结算数量需要小于等于实收数量');
          return;
        }

        if (list[i].createdTime) {
          riseData.codPoGrDtlCusList[i].createdTime = list[i].createdTime.parseTime('YYYY-MM-DD HH:mm:ss');
        }
        if (list[i].updatedTime) {
          riseData.codPoGrDtlCusList[i].updatedTime = list[i].updatedTime.parseTime('YYYY-MM-DD HH:mm:ss');
        }
        if (list[i].productDate) {
          riseData.codPoGrDtlCusList[i].productDate = list[i].productDate.parseTime('YYYY-MM-DD');
        }

      }



      // 给几个默认值，需要修改
      /*this.riseData.certificatesDate = '';

      if (this.riseData.postDate) {

      } else {
        this.riseData.postDate = ''
      };
      this.riseData.isDel = 0;*/

      // 枚举值转换
      riseData.poGrStatus = parseInt(this.riseData.poGrStatus);
      riseData.operationType = parseInt(this.riseData.operationType);
      riseData.poGrType = parseInt(this.riseData.poGrType);

      // 实收数量合计
      riseData.actReceiveAmt = this.actReceiveAmt;

      //金额总计计算
      riseData.poOrginAmtTex = this.poAmt.poOrginAmtTex;
      riseData.poOrginAmt = this.poAmt.poOrginAmt;
      riseData.poBaseAmtTex = this.poAmt.poBaseAmtTex;
      riseData.poBaseAmt = this.poAmt.poBaseAmt;


      doModify(riseData).then(res => {
        console.log('保存成功');
        console.log(res);

        if (res.data.status == 1) {
          this.$notify({
            title: '成功',
            message: '保存成功！',
            type: 'success'
          });
          vm.handleCancel();
        }
        /*else {
                 vm.$notify.error({
                   title: '错误',
                   message: res.data.errorMsg
                 });
               }*/
      }).catch(err => {
        console.log(err);
      })
      // this.$router.push({ path: '/purchase/PurchaseReceipt/:type' });
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
    },
    handleGetDataSuccess() {
      var vm = this;

      var poGrType = vm.riseData.poGrType;
      var operationType = vm.riseData.operationType;
      if (poGrType == '72300010' && operationType == "74050020") { //国内暂收---》只读
        this.sourceNoType = '3';
        // vm.lbNoDisabled = false; //提单号输入

        // vm.rules.warehouseName[0].required = false;
        // vm.rules.sourceNo[0].required = false;

      } else if (poGrType == '72300010' && operationType == "74050010") { //国内入库---》暂收单
        this.sourceNoType = '1';
        // vm.lbNoDisabled = true; //提单号输入
        // vm.rules.warehouseName[0].required = true;
        // vm.rules.sourceNo[0].required = true;
      } else if (poGrType != '72300010' && operationType == "74050010") { //进口入库 --》在途单号
        this.sourceNoType = '2';
        // vm.lbNoDisabled = true; //提单号带出
        // vm.rules.warehouseName[0].required = true;
        // vm.rules.sourceNo[0].required = true;
      } else {
        this.sourceNoType = '3';
        // vm.lbNoDisabled = false; //提单号输入

        // vm.rules.warehouseName[0].required = false;
        // vm.rules.sourceNo[0].required = false;
      }
    },
    getDetailData() {
      var query = this.$store.getters.params.PurchaseReceipt;

      var _this = this;

      getDetailData(query).then(res => {
        this.riseData = res.data.data;
        if (typeof _this.riseData.poGrStatus == 'number') {
          _this.riseData.poGrStatus += ''
          _this.riseData.operationType += ''
          _this.riseData.poGrType += ''
        }

        if (this.riseData.poGrType == '72300010') { //选择了国内采购
          // 在这里更改弹窗， 直接利用变量和v-if实现
          this.sourceName = '采购暂收';
        } else { //不是国内采购 进口采购
          this.sourceName = '在途单号';
        }

        if (_this.riseData.rateCurrency && (typeof _this.riseData.rateCurrency) == 'number') {
          _this.riseData.rateCurrency = _this.riseData.rateCurrency.toFixed(8);
        }



        if (_this.riseData.codPoGrDtlCusList) {
          var dtList = _this.riseData.codPoGrDtlCusList;
          // createdTime   updatedTime
          for (var i = 0, len = dtList.length; i < len; i++) {


            _this.riseData.codPoGrDtlCusList[i].orginTexAmt = 1111;

            _this.riseData.codPoGrDtlCusList[i].packType += ''; //包装方式


          }
        } else {
          _this.riseData.codPoGrDtlCusList = [];
        }


        // 需要删除的内容
        _this.riseData["deleteIdList"] = [];

        _this.handleGetDataSuccess();
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.query);
    next();
  },
  mounted() {},
  activated() {


  },
  created() {
    this.getDetailData();
  }
}

</script>
<style>
.saveAndCancelbtns {
  /*border-bottom: 1px solid #ccc;*/
  padding: 10px 0 10px 0;
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
  /*padding: 15px;*/
}



























































/*.el-col {
  height: 41px;
}*/

.fileUpload {
  padding: 10px 0 10px 0px;
  width: 40%;
}

.fileOperation {
  padding: 10px 0 10px 0;
}



.tabPane {
  padding-bottom: 15px;
}

.tabPaneSecond {
  /*padding-bottom: 34px;*/
}

.tabPaneThird {
  padding-bottom: 34px;
}

.pushDefeatReason {
  height: auto !important;
}

</style>
