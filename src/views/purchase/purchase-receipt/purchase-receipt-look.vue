<template>
  <div class="allTemplate">
    <div class="saveAndCancelbtns">
      <!-- <el-button type="primary" size="small" @click="handleSave">保存</el-button> -->
      <el-button type="info" size="small" @click="handleCancel">返回</el-button>
    </div>
    <div class="infoDataTabs">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="抬头数据" name="first">
          <div class="tabPane">
            <el-form ref="form" :model="riseData" label-width="80px">
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
                  <el-form-item label="OA审核标题">
                    <el-input disabled size="mini" v-model="riseData.auitTitle"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <!-- 采购暂收/在途单号 lbNo  lbId -->
                  <el-form-item label="在途单号">
                    <!-- 采购类型为国内采购，移动类型为暂收，该字段只读
采购类型为国内采购，移动类型为收货，该字段弹窗为采购暂收单号
采购类型为进口采购，移动类型为收货，该字段弹窗为采购在途单弹窗-->
                    <el-input size="mini" disabled v-model="riseData.sourceNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据日期">
                    <!-- <el-input size="mini" v-model="riseData.certificatesDate"></el-input> -->
                    <el-date-picker disabled size="mini" v-model="riseData.certificatesDate" type="date" placeholder="选择日期">
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
                  <el-form-item label="供应商">
                    <!-- name id code -->
                    <el-input disabled size="mini" disabled v-model="riseData.supplierName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="部门">
                    <!-- name id code -->
                    <el-input disabled size="mini" disabled v-model="riseData.bizOrgName"></el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="入库仓库">
                    <!-- name id code -->
                    <el-input disabled size="mini" disabled v-model="riseData.warehouseName"></el-input>

                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="提单号">
                    <!-- 提单在途  No Id   lbId-->
                    <el-input disabled size="mini" v-model="riseData.sourceNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别">
                    <!-- name code id -->
                    <el-input disabled size="mini" disabled v-model="riseData.currencyName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="到货状态">
                    <el-select disabled size="mini" v-model="riseData.poGrStatus" placeholder="请选择类型">
                      <el-option v-for="item in purchaseReceiptStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                  <el-form-item label="应收数量合计">
                    <el-input size="mini" v-model="riseData.shouldReceiveQty"></el-input>
                  </el-form-item>
                </el-col> -->
                <el-col :span="6">
                  <el-form-item label="实收数量合计">
                    <el-input disabled size="mini" v-model="riseData.actReceiveAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item  label="备注">
                    <el-input disabled size="mini" v-model="riseData.remark"></el-input>
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
                <el-col class="pushDefeatReason" :span="24">
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
                    <el-input disabled size="mini" placeholder="0.00" v-model="riseData.poorginalAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="原币金额总计(不含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model="riseData.poorginalAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本位币金额总计(含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model="riseData.poBaseAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="本位币金额总计(不含税)">
                    <el-input disabled size="mini" placeholder="0.00" v-model="riseData.poBaseAmt"></el-input>
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
                  <el-form-item label="创建人">
                    <el-input disabled size="mini" v-model="riseData.createdBy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改人">
                    <el-input disabled size="mini" v-model="riseData.updatedBy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人">
                    <!-- name id code -->
                    <el-input disabled size="mini" v-model="riseData.postPersonName"></el-input>
                  </el-form-item>
                </el-col>
                
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="创建时间">
                    <el-input disabled size="mini" v-model="riseData.createdTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间">
                    <el-input disabled size="mini" v-model="riseData.updatedTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间">
                    <el-input disabled size="mini" v-model="riseData.postDate"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="footer">
      <div class="footerTables">
        <el-table max-height="400" fit :data="riseData.codPoGrDtlCusList" border style="width: 100%">
     <!--      <el-table-column align="center" type="selection" width="55">
          </el-table-column> -->
          <el-table-column show-overflow-tooltip  align="center" label="行号" width="180">
            <template slot-scope="scope">
              <span class="rowNumber">{{ scope.row.poGrRowNo}}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="采购合同号" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.poContractNo }}</span>

            </template>
          </el-table-column>

          <!--采购类型需要修改  -->
          <el-table-column show-overflow-tooltip align="center" label="物料编号" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.goodsCode }}</span>

            </template>
          </el-table-column>
         
          <el-table-column show-overflow-tooltip align="center" label="物料名称" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.goodsName }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="实收数量" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.actReceiveQty }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="单位" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.unitName }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="包装方式" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.packType | parsePackType}}</span>


            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="批次" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.seriesNo }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="柜号" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.cabinetNo }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="供应商批次号" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.supplierBatchNo }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="供方生产日期" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.productDate | parseTime}}</span>

              <!--  <el-input @blur="handleInputBlur($event)" style="display: none;" v-model="riseData.codPoGrDtlCusList[scope.$index].productDate" size="mini"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="件数" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.qty }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="结算数量" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.settleQty }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="结算单位" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.settleUnitName }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="采购系统单据号" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.poNo }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="良品" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.goodsProductQty }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="不良品" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.rejectsProductQty }}</span>

            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="备注" width="180">
            <template slot-scope="scope">
              <span class="">{{ scope.row.remark }}</span>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
import { deleteSelectedRows } from '../../../util/index.js'


import { getPurchasReceiptEditDataDefault } from '../../../util/getDefault.js'

import { ENUMS } from '../../../assets/enums.js'

import DepartmentSelect from 'components/common-select/department-select.vue' //部门
import WarehouseSelect from 'components/common-select/warehouse-select.vue' //仓库





const fileHeaders = [
  { prop: 'fileOperation', label: '文件操作' },
  { prop: 'fileName', label: '文件名称' },
  { prop: 'creater', label: '创建人' },
  { prop: 'createTime', label: '创建时间' },
]

export default {
  components: {
    DepartmentSelect,
    WarehouseSelect
  },
  data() {
    return {
      fileHeaders: fileHeaders,
      // headers: headers,
      // list: baseList,
      activeName: 'first',

      purchasTypeOptions: ENUMS.array7230,
      movementTypeOptions: ENUMS.array7405, //移动类型
      purchaseReceiptStatusOptions: ENUMS.array7030,
      packTypeOptions: ENUMS.array7135, //包装方式

      riseData: {

        poGrId: '0e4b44c879074f4f83dbd460a86344e7',
        poGrNo: 'SH201712000016',

        sourceNo: 'sourceNo',
        sourceId: 'sourceId',
        poGrStatus: 1,
        operationType: 1,
        manageSubCode: 'manageSubCode',
        manageSubName: 'manageSubName',
        manageSubId: 'manageSubId',
        poGrType: 1,
        supplierId: 'supplierId',
        supplierCode: 'supplierCode',
        supplierName: 'supplierName',
        bizOrgId: 'bizOrgId',
        bizOrgCode: 'bizOrgCode',
        bizOrgName: 'bizOrgName',
        certificatesDate: '2017-08-08',
        warehouseId: 'warehouseId',
        warehouseCode: 'warehouseCode',
        warehouseName: 'warehouseName',
        auitTitle: 'auitTitle',
        actReceiveAmt: 11,
        poorginalAmt: 11,
        poorginalAmtTex: 11,
        poBaseAmt: 11,
        poBaseAmtTex: 11,
        currencyId: 'currencyId',
        currencyCode: 'currencyCode',
        currencyName: 'currencyName',
        rateCurrency: 11,
        credenIden: 11,
        credenNo: 'credenNo',
        failReason: 'failReason',
        isReturn: 1,
        setttleWeight: 111,
        postPersonName: 'postPersonName',
        postPersonCode: 'postPersonCode',
        postPersonId: 'postPersonId',
        postDate: '2017-03-03',
        remark: 'remark',
        isDel: 1,
        createdBy: 'createdBy',
        createdTime: '2017-09-09',
        updatedTime: '2017-09-09',
        updatedBy: 'updatedBy',
        isInactive: 1,
        isolationCode: 1,
        codPoGrDtlCusList: [{
          poRowNo: '1',
          poGrDtlId: '11',
          poDtlId: '111',
          poGrRowNo: 1,
          poGrId: '12312',
          poContractNo: '',
          poNo: '23123',
          sourceDtlId: '12312',
          goodsId: '1231',
          goodsCode: '1231',
          goodsName: '水果',
          isGift: 1,
          bizOrgId: '221321',
          bizOrgCode: '123123',
          qty: 111,
          bizOrgName: '21312',
          rejectsProductQty: 213,
          goodsProductQty: 312312321,
          settleReturnQty: 312312321,
          settleChangeQty: 2132312,
          settleWriteOffQty: 4567898765,
          actChangeQty: 3123123,
          actWriteOffQty: 21312,
          actReturnQty: 12321,
          hasSettleQty: 1231223,
          settleQty: 123123,
          lessQty: 21312,
          actReceiveQty: 3233,
          unitId: '2312',
          unitName: '123 ',
          unitCode: '个',
          settleUnitId: '1231223',
          settleUnitName: '54535',
          settleUnitCode: '34534',
          cabinetNo: '435',
          basePrice: 34543,
          basePriceTex: 354,
          orginPrice: 3453,
          orginPriceTex: 345,
          baseAmt: 345,
          baseAmtTex: 8799,
          orginAmt: 7897,
          orginAmtTex: 789,
          seriesNo: '987',
          supplierBatchNo: '876',
          productDate: '2017-09-09',
          packType: '71350010',
          remark: '阿斯达',
          isDel: 0,
          createdBy: '袁学道',
          createdTime: '2017-09-09',
          updatedTime: '2016-26-12',
          updatedBy: '相当于',
          version: 0,
          isInactive: 1,
          isolationCode: 1,
          baseTexAmt: 11,
          texRate: 1.01,
          orginTexAmt: 111,
        }],
        deleteIdList: []
      },
      // 明细里面的数据
      codPoGrDtlCusObj: {
        poRowNo: '1',
        poGrDtlId: '11',
        poDtlId: '111',
        poGrRowNo: 1,
        poGrId: '12312',
        poContractNo: '',
        poNo: '23123',
        sourceDtlId: '12312',
        goodsId: '1231',
        goodsCode: '1231',
        goodsName: '水果',
        isGift: 1,
        bizOrgId: '221321',
        bizOrgCode: '123123',
        qty: 111,
        bizOrgName: '21312',
        rejectsProductQty: 213,
        goodsProductQty: 312312321,
        settleReturnQty: 312312321,
        settleChangeQty: 2132312,
        settleWriteOffQty: 4567898765,
        actChangeQty: 3123123,
        actWriteOffQty: 21312,
        actReturnQty: 12321,
        hasSettleQty: 1231223,
        settleQty: 123123,
        lessQty: 21312,
        actReceiveQty: 3233,
        unitId: '2312',
        unitName: '123 ',
        unitCode: '个',
        settleUnitId: '1231223',
        settleUnitName: '54535',
        settleUnitCode: '34534',
        cabinetNo: '435',
        basePrice: 34543,
        basePriceTex: 354,
        orginPrice: 3453,
        orginPriceTex: 345,
        baseAmt: 345,
        baseAmtTex: 8799,
        orginAmt: 7897,
        orginAmtTex: 789,
        seriesNo: '987',
        supplierBatchNo: '876',
        productDate: '2017-09-09',
        packType: '71350010',
        remark: '阿斯达',
        isDel: 0,
        createdBy: '袁学道',
        createdTime: '2017-09-09',
        updatedTime: '2016-26-12',
        updatedBy: '相当于',
        version: 1,
        isInactive: 1,
        isolationCode: 1,
        baseTexAmt: 11,
        texRate: 1.01,
        orginTexAmt: 111,
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
  filters: {},
  methods: {

    // 删除选中的



    handleCancel() {

      // this.riseData = getPurchasReceiptEditDataDefault();
     this.$store.dispatch('toggleCurrentView', {
        PurchaseReceipt: {
          view: 'index',
          // params: { "id":row.poGrId }
          // params: { "id": '12345678976543' }
        }
      });
    },
    // 修改保存

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
    getData() {
      var query = this.$store.getters.params.PurchaseReceipt;
      var _this = this;

      getDetailData(query).then(res => {
        this.riseData = res.data.data;


        if (typeof _this.riseData.poGrStatus == 'number') {
          _this.riseData.poGrStatus += ''
          _this.riseData.operationType += ''
          _this.riseData.poGrType += ''
        }


        if (_this.riseData.createdTime) {
          _this.riseData.createdTime = _this.riseData.createdTime.parseTime('YYYY-MM-DD HH:mm:ss')
        }
        if (_this.riseData.updatedTime) {
          _this.riseData.updatedTime = _this.riseData.updatedTime.parseTime('YYYY-MM-DD HH:mm:ss')
        }
        if (_this.riseData.postDate) {
          _this.riseData.postDate = _this.riseData.postDate.parseTime('YYYY-MM-DD HH:mm:ss')
        }
        if (_this.riseData.codPoGrDtlCusList) {
          var dtList = _this.riseData.codPoGrDtlCusList;
          // createdTime   updatedTime
          for (var i = 0, len = dtList.length; i < len; i++) {
            if (dtList[i].createdTime) {
              _this.riseData.codPoGrDtlCusList[i].createdTime = dtList[i].createdTime.parseTime('YYYY-MM-DD HH:mm:ss');
            }
            if (dtList[i].updatedTime) {
              _this.riseData.codPoGrDtlCusList[i].updatedTime = dtList[i].updatedTime.parseTime('YYYY-MM-DD HH:mm:ss');
            }
          }
        }

        // 需要删除的内容
        // _this.riseData["deleteIdList"] = [];
      });
    }
  },

  mounted() {

  },
  activated() {

    


  },
  created() {
    this.getData();

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
