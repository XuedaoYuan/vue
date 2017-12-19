<template>
  <div>
    <div>
      <el-button type="primary" size="small" @click="handleSave">保 存</el-button>
      <el-button type="info" size="small" @click="handleCancel">取 消</el-button>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="抬头数据" name="first">
          <div class="tabPane" style="margin-bottom:12px">
            <el-form ref="riseForm" :rules="rules" :model="riseData" label-width="100px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="系统单据号">
                    <el-input size="mini" disabled v-model="riseData.soNo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="销售出库单号" prop="soOsNo">
                    <!--<el-input size="mini" @childevent="childEventHandlerReceived" v-model="riseData.soOsNo"></el-input>-->
                    <library-subject @childevent="childEventHandlerReceived" :querySelect="riseData.soOsNo"></library-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="退货类型" prop="pinBackType">
                    <el-select v-model="riseData.pinBackType" placeholder="请选择" size="mini" clearable>
                      <el-option v-for="(value,key) in pinBackType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="销售类型" prop="orderType">
                    <el-select disabled v-model="riseData.orderType" placeholder="请选择" size="mini" clearable>
                      <el-option v-for="(value,key) in orderType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="经营主体">
                    <!--<el-input size="mini" v-model="riseData.receiptCode"></el-input>-->
                    <management-subject disabled @childevent="childEventHandlerMainInfo" :querySelect="riseData.manageSubName"></management-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门">
                    <!--<el-input size="mini" v-model="riseData.receiptCode"></el-input>-->
                    <department-subject disabled @childevent="bizOrgNameFill" :querySelect="riseData.bizOrgName"></department-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="退货原因" prop="returnReason">
                    <el-input size="mini" v-model="riseData.returnReason"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="汇率(本位币)" prop="rateCurrency">
                    <el-input @blur="handleRateCurrencyBlur" size="mini" v-number-only:5.abs="8" v-model="riseData.rateCurrency"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="客户">
                    <!--<el-input size="mini" v-model="riseData.receiptCode"></el-input>-->
                    <customer-select disabled @childevent="childEventHandlerCustomer" :querySelect="riseData.customerName"></customer-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="仓库">
                    <!--<el-input size="mini" v-model="riseData.receiptCode"></el-input>-->
                    <warehouse-subject @childevent="warehouseNameFill" :querySelect="riseData.warehouseName"></warehouse-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别">
                    <!--<el-input size="mini" v-model="riseData.receiptCode"></el-input>-->
                    <currency-Subject disabled @childevent="currencyNameFill" :querySelect="riseData.currencyName"></currency-Subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="税额">
                    <el-input size="mini" disabled v-model="calculateAmtTex.texAmt"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="总金额(含税)">
                    <el-input size="mini" disabled v-model="calculateAmtTex.totalAmtTex"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="总金额(无税)">
                    <el-input size="mini" disabled v-model="calculateAmtTex.totalAmt"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="销售退货单状态">
                    <el-select v-model="riseData.soRoStatus" disabled placeholder="请选择" size="mini" clearable>
                      <el-option v-for="(value,key) in soRoStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="备注" class="elColWidth12">
                    <el-input size="mini" v-model="riseData.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="third">
          <div class="tabPane">
            <el-form ref="form" :model="OtherData" label-width="80px">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="凭证日期">
                    <el-date-picker disabled size="mini" v-model="OtherData.certificatesDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="收货过账日期">
                    <el-date-picker disabled size="mini" disabled v-model="OtherData.null" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:12px">
                <el-col :span="6">
                  <el-form-item label="开票过账日期">
                    <el-date-picker disabled size="mini" v-model="OtherData.null" type="date" placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="凭证信息" name="fourth">
          <el-form ref="form" :model="VoucherData" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="凭证标识">
                  <el-input disabled size="mini" v-model="VoucherData.credenIden"></el-input>
                  <!-- <el-select size="mini" v-model="VoucherData.credenIden" placeholder="请选择类型">
                    <el-option disabled label="凭证未操作" value="01"></el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="凭证过期编号">
                  <el-input disabled size="mini" v-model="VoucherData.credenNo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom:36px">
              <el-col :span="14">
                <el-form-item label="推送失败原因">
                  <el-input disabled type="textarea" :rows="2" placeholder="请输入内容" v-model="VoucherData.failReason">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="sixth">
          <el-form ref="form" label-width="80px" :model="systemData" style="margin-top:16px">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人" prop="createdBy">
                  <el-col :span="18">
                    <el-input v-model="systemData.createdBy" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改人" prop="updatedBy">
                  <el-col :span="18">
                    <el-input v-model="systemData.updatedBy" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账人" prop="postPersonName">
                  <el-col :span="18">
                    <el-input v-model="systemData.postPersonName" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:12px">
              <el-col :span="8">
                <el-form-item label="创建日期" prop="createdTime">
                  <el-col :span="18">
                    <el-input v-model="systemData.createdTime" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改日期" prop="updatedTime">
                  <el-col :span="18">
                    <el-input v-model="systemData.updatedTime" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账日期" prop="postDate">
                  <el-col :span="18">
                    <el-input v-model="systemData.postDate" size="mini" :disabled="true"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div style="margin-top:12px;margin-bottom:6px">
      <!--弹框-->
      <sales-Return-dialog :receiveDialogStatus="receiveDialogStatus" :soOsNo="riseData.soOsNo" @fillRow="fillRow" @closeItem="closeReceiveDialog">
      </sales-Return-dialog>
      <el-button type="warning" size="small" @click="Establish" :disabled="createdBtnStatus">创 建</el-button>
      <!-- icon="el-icon-delete" -->
      <el-button type="warning" size="mini" plain @click="handleDeleteClick">删 除</el-button>
    </div>
    <div class="commonTable">
      <common-table :data="tableData" :maxHeight="300" :fit="true" :headers="header" @cell-click="handleCellClick" @selection-change="handleSelectionChange">
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'productDate'">
            <span>{{tableData[scope.index]['productDate'] | productDateFilter}}</span>
          </div>
          <div v-if="scope.text == 'selectPackType'">
            <span>{{tableData[scope.index]['packType'] | packTypeTypeFilter}}</span>
          </div>
        </template>
        <template slot="default" slot-scope="scope">
          <div v-if="scope.text == 'selectPackType'" class="table-from">
            <el-select v-model="tableData[scope.index]['packType']" size='mini' clearable placeholder="请选择">
              <el-option v-for="(value,key) in packType" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </div>
          <div v-if="scope.text == 'productDate'">
            <el-date-picker v-model="tableData[scope.index]['productDate']" size="mini" type="date" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </div>
        </template>
      </common-table>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import { pickerOptions } from '@/util'
import ManagementSubject from '@/components/common-select/management-subject.vue' //经营主体
import DepartmentSubject from '@/components/common-select/department-select.vue' //部门
import WarehouseSubject from '@/components/common-select/warehouse-select.vue' //仓库
import currencySubject from '@/components/common-select/currency-select.vue' //币别
import CustomerSelect from 'components/common-select/customer-select.vue' //客户
import LibrarySubject from '@/components/common-select/library-select.vue'; //销售出库单号
import salesReturnDialog from './salesReturn-dialog.vue' //创建弹框

import NP from 'number-precision'

import {
  doCusSave
} from '../../../api/sales-process/sales-return/sales-return'

const header = [
  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'soRoDtlRowNo', label: '行号', align: 'center', width: '60px' },
  { prop: 'soNo', label: '销售合同单据号', align: 'center', width: '120px' },
  { prop: 'soContractNo', label: '销售合同号', align: 'center', width: '120px' },
  { prop: 'goodsCode', label: '物料编号', align: 'center', width: '120px' },
  { prop: 'goodsName', label: '物料名称', align: 'center', width: '120px' },
  { prop: 'returnQty', label: '退货数量', align: 'center', width: '100px', editable: true, required: true, digit: '2' },
  { prop: 'unitName', label: '单位', align: 'center', width: '100px' },
  { prop: 'packType', label: '包装方式', align: 'center', width: '100px', template: 'selectPackType', filter: 'selectPackType' },
  { prop: 'settleQty', label: '结算数量', align: 'center', width: '100px', editable: true, digit: '2' },
  { prop: 'settleUnitName', label: '结算单位', align: 'center', width: '100px' },
  { prop: 'cabinetNo', label: '柜号', align: 'center', width: '100px' },
  { prop: 'seriesNo', label: '批次', align: 'center', width: '100px' },
  { prop: 'supplierBatchNo', label: '供应商批号', align: 'center', width: '100px', editable: true },
  { prop: 'productDate', label: '供方生产日期', align: 'center', width: '140px', template: 'productDate', filter: 'productDate' },
  { prop: 'qty', label: '件数', align: 'center', width: '100px', digit: '2', editable: true },
  { prop: 'orginPriceTex', label: '含税单价', align: 'center', width: '100px', editable: true, digit: '6' },
  { prop: 'orginPrice', label: '无税单价', align: 'center', width: '100px', digit: '6' },
  { prop: 'texRate', label: '税率', align: 'center', width: '100px', digit: '8' },
  { prop: 'orginAmtTex', label: '含税金额', align: 'center', width: '100px', digit: '2' },
  { prop: 'orginAmt', label: '税前金额', align: 'center', width: '100px', digit: '2' },
  { prop: 'texAmt', label: '税额', align: 'center', width: '100px', digit: '2' },
  { prop: 'remark', label: '备注', align: 'center', width: '100px', editable: true },
];

export default {
  components: {
    ManagementSubject,
    DepartmentSubject,
    WarehouseSubject,
    CustomerSelect,
    currencySubject,
    LibrarySubject,
    salesReturnDialog
  },

  data() {
    return {
      packType: ENUMS["7135"], //包装方式
      orderType: ENUMS["7270"], //销售类型
      pinBackType: ENUMS["7290"], //退货类型
      soRoStatus: ENUMS["7105"], //销售退货状态
      //      packType:ENUMS.packType,//包装方式
      pickerOptions: {
        shortcuts: pickerOptions
      },
      activeName: 'first',
      receiveDialogStatus: false,
      header: header,
      selectchange: [],
      delsoRoId: [],
      //抬头数据
      riseData: {
        //经营主体
        manageSubName: '',
        manageSubCode: '',
        manageSubId: '',
        //部门
        bizOrgName: '',
        bizOrgId: '',
        bizOrgCode: '',
        //仓库
        warehouseName: '',
        warehouseCode: '',
        warehouseId: '',
        //客户
        customerName: '',
        customerCode: '',
        customerId: '',
        //币别
        currencyId: '',
        currencyCode: '',
        currencyName: '',

        soRoNo: '', //系统单据号
        soOsNo: '', //销售出库单号
        soRoStatus: '71050010', //销售退货单状态
        returnReason: '', //退货原因
        orderType: '72700010', //销售类型
        pinBackType: '72900030', //退货类型
        rateCurrency: '0.00000000', //汇率
        texAmt: '0.00', //税额
        totalAmtTex: '0.00', //总金额(含税)
        totalAmt: '0.00', //总金额(无税)
        remark: '', //备注
      },
      rules: {
        pinBackType: [
          { required: true, message: ' ', trigger: 'change' },
        ],
        rateCurrency: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        soOsNo: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        returnReason: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
      },
      //其他信息
      OtherData: {
        certificatesDate: '', //凭证日期
        null: '', //收货过账日期
        null: '', //开票过账日期
      },
      //凭证信息
      VoucherData: {
        credenIden: '凭证未操作', //凭证标识
        credenNo: '', //凭证过账编号
        failReason: '', //推送失败原因
      },
      //系统信息
      systemData: {
        createdBy: '', //创建人
        postPersonName: '', //过账人
        updatedBy: '', //修改人
        createdTime: null, //创建时间
        updatedTime: null, //更新时间
        postDate: null, //过账时间
      },
      tableData: [],
    }
  },
  created() {
    this.tableData = [];
  },
  activated() {
    this.$refs['riseForm'].clearValidate(); //移除整个表单验证
  },
  methods: {
    handleRateCurrencyBlur() {
      this.riseData.rateCurrency = parseFloat(this.riseData.rateCurrency).toFixed(8);
    },

    // 计算金额和税额
    /*
      orginPriceTex 含税单价
      orginPrice 无税单价
      settleQty 结算数量
      
    */
    calculateAmtAndTex(index) {
      // tableData  表格数据数组
      var detailObj = this.tableData[index];
      /*baseTexAmt
texRate
originTexAmt*/
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

      // var baseTexAmt = NP.times((NP.divide(baseAmtTex, NP.plus(1, texRate))), baseAmtTex);
      // var originTexAmt = NP.times((NP.divide(orginAmtTex, NP.plus(1, texRate))), orginAmtTex);
      // var texAmt = NP.times((NP.divide(orginAmtTex, NP.plus(1, texRate))), orginAmtTex);

      this.tableData[index].baseAmt = baseAmt.toFixed(2);
      this.tableData[index].baseAmtTex = baseAmtTex.toFixed(2);
      this.tableData[index].orginAmt = orginAmt.toFixed(2);
      this.tableData[index].orginAmtTex = orginAmtTex.toFixed(2);

      // this.tableData[index].baseTexAmt = baseTexAmt.toFixed(2);
      // this.tableData[index].originTexAmt = originTexAmt.toFixed(2);


    },

    //取消
    handleCancel() {
      //      this.$router.push({ path: '/salesProcess/salesReturn/:type' });
      this.$store.dispatch('toggleCurrentView', {
        SalesReturn: {
          view: 'index'
          // params: 跳转过去的子组件的属性对象
        }
      });
    },

    //保存
    handleSave() {
      this.validateForm('riseForm');
    },

    validateForm(formName) { //表单校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.validateTable(); //通过调用tale验证
        } else {
          return false;
        }
      });
    },

    validateTable() { //表格校验
      eventBus.$emit('validateTable', {
        data: this.tableData, //表示表格数据
        headers: this.header, //表示表头数据
        success: (valid) => { //成功回掉
          if (valid) {
            //校验通过后，代码书写处
            if (this.tableData.length > 0) {
              this.doCusSave();
            } else {
              this.$message({
                type: 'warning',
                message: "请创建明细"
              })
            }
          }
        }
      })
    },
    // 保存按钮
    doCusSave() {

      var vm = this;

      if (this.riseData && this.tableData) {

        for (let i = 0; i < this.tableData.length; i++) {

          if (parseFloat(vm.tableData[i].qty) <= 0) {
            vm.$message.error('件数必须大于0');
            return;
          }
          this.tableData[i].productDate = this.tableData[i].productDate ? this.tableData[i].productDate.parseTime('YYYY-MM-DD') : '';
        }



        this.tableData.forEach((o, i) => {
          delete o.$index;
        });

        // 来自于计算属性
        this.riseData.texAmt = this.calculateAmtTex.texAmt;
        this.riseData.totalAmtTex = this.calculateAmtTex.totalAmtTex;
        this.riseData.totalAmt = this.calculateAmtTex.totalAmt;

        doCusSave(this.riseData, this.tableData, this.delsoRoId).then(res => {
          if (res.data.status === 1) {
            vm.$notify({
              title: '成功',
              message: '保存成功!',
              type: 'success',
              duration: 2000
            });
            //            this.$router.push({ path: '/salesProcess/salesReturn/:type' });
            this.$store.dispatch('toggleCurrentView', {
              SalesReturn: {
                view: 'index'
                // params: 跳转过去的子组件的属性对象
              }
            });
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        })
      }
    },
    //创建
    Establish() {
      this.receiveDialogStatus = true;
    },
    //删除
    handleDeleteClick() {
      console.log(this.selectchange);
      if (this.selectchange.length < 1) {
        this.$notify({
          title: '警告',
          message: '请选择一行或多行进行删除',
          type: 'warning'
        });
      } else {
        this.selectchange.forEach((x, i) => {
          let idx = this.tableData.findIndex((val) => val.$index == x.$index);
          this.tableData[idx].soRoId && this.delsoRoId.push(this.tableData[idx].soRoId);
          idx > -1 && this.tableData.splice(idx, 1);
        });
      }
    },
    handleTabClick(tab) {
      console.log(tab);
    },
    //弹框
    closeReceiveDialog(val) {
      this.receiveDialogStatus = false;
    },
    //增加行
    fillRow(val) {
      console.log('fillRow', val)
      for (let obj of val) {
        let index = this.tableData.findIndex((x) => obj.soRoDtlRowNo == x.soRoDtlRowNo);
        if (index == -1) {
          let soRoDtlRowNo = 1;
          if (this.tableData.length >= 1) {
            soRoDtlRowNo = this.tableData[this.tableData.length - 1].soRoDtlRowNo + 1
          }
          this.tableData.push({
            soRoDtlRowNo: soRoDtlRowNo,
            osDtlId: obj.osDtlId, // 销售出库明细id
            soDtlId: obj.soDtlId, //销售明细id
            soNo: obj.soNo,
            soContractNo: obj.soContractNo,
            goodsCode: obj.goodsCode,
            goodsName: obj.goodsName,
            returnQty: obj.returnQty,
            unitName: obj.unitName,
            packType: obj.packType,
            settleQty: obj.settleQty,
            settleUnitName: obj.settleUnitName,
            cabinetNo: obj.cabinetNo,
            seriesNo: obj.seriesNo,
            supplierBatchNo: obj.supplierBatchNo,
            productDate: obj.productDate,
            qty: obj.qty,
            orginPriceTex: obj.orginPriceTex,
            orginPrice: obj.orginPrice,
            texRate: obj.texRate,
            orginAmtTex: obj.orginAmtTex,
            orginAmt: obj.orginAmt,
            texAmt: obj.texAmt,
            remark: obj.remark,
          });

          this.calculateAmtAndTex(this.tableData.length - 1);
        }
      }
      this.receiveDialogStatus = false;
    },
    //销售出库单
    childEventHandlerReceived(val) {
      console.log('childEventHandlerReceived', val)
      if (val) {
        //经营主体
        this.riseData.manageSubName = val.manageSubName;
        this.riseData.manageSubCode = val.manageSubCode;
        this.riseData.manageSubId = val.manageSubId;
        //部门
        this.riseData.bizOrgName = val.bizOrgName;
        this.riseData.bizOrgId = val.bizOrgId;
        this.riseData.bizOrgCode = val.bizOrgCode;
        //仓库
        this.riseData.warehouseName = val.warehouseName;
        this.riseData.warehouseCode = val.warehouseCode;
        this.riseData.warehouseId = val.warehouseId;
        //客户
        this.riseData.customerName = val.customerName;
        this.riseData.customerCode = val.customerCode;
        this.riseData.customerId = val.customerId;
        //币别
        this.riseData.currencyId = val.currencyId;
        this.riseData.currencyCode = val.currencyCode;
        this.riseData.currencyName = val.currencyName;

        this.riseData.soRoNo = val.soRoNo; //系统单据号
        this.riseData.soOsNo = val.soOsNo; //销售出库单号
        //          this.riseData.soRoStatus = val.soRoStatus ;//销售退货单状态
        this.riseData.returnReason = val.returnReason; //退货原因
        // this.riseData.texAmt = val.texAmt; //税额
        // this.riseData.totalAmtTex = val.totalAmtTex; //总金额(含税)
        // this.riseData.totalAmt = val.totalAmt; //总金额(无税)
        // this.riseData.remark = val.remark; //备注


        // 本位币汇率
        if (val.rateCurrency) {
          this.riseData.rateCurrency = val.rateCurrency.toFixed(8);
        } else {
          this.riseData.rateCurrency = '';
        }




      } else {

        //经营主体
        this.riseData.manageSubName = '';
        this.riseData.manageSubCode = '';
        this.riseData.manageSubId = '';
        //部门
        this.riseData.bizOrgName = '';
        this.riseData.bizOrgId = '';
        this.riseData.bizOrgCode = '';
        //仓库
        this.riseData.warehouseName = '';
        this.riseData.warehouseCode = '';
        this.riseData.warehouseId = '';
        //客户
        this.riseData.customerName = '';
        this.riseData.customerCode = '';
        this.riseData.customerId = '';
        //币别
        this.riseData.currencyId = '';
        this.riseData.currencyCode = '';
        this.riseData.currencyName = '';

        this.riseData.soRoNo = ''; //系统单据号
        this.riseData.soOsNo = ''; //销售出库单号
        //        this.riseData.soRoStatus = '' ;//销售退货单状态
        this.riseData.returnReason = ''; //退货原因
        // this.riseData.texAmt = ''; //税额
        // this.riseData.totalAmtTex = ''; //总金额(含税)
        // this.riseData.totalAmt = ''; //总金额(无税)
        // this.riseData.remark = ''; //备注


        this.riseData.rateCurrency = '';
      }
    },
    // 经营主体
    childEventHandlerMainInfo(val) {
      console.log(val)
      if (val) {
        this.riseData.manageSubName = val.companyName;
        this.riseData.manageSubId = val.companyId;
        this.riseData.manageSubCode = val.companyCode;
      } else {
        this.riseData.manageSubName = '';
        this.riseData.manageSubId = '';
        this.riseData.manageSubCode = '';
      }
    },
    //部门
    bizOrgNameFill(val) {
      console.log(val)
      if (val) {
        this.riseData.bizOrgName = val.orgName;
        this.riseData.bizOrgCode = val.orgTreeCode;
        this.riseData.bizOrgId = val.orgId;
      } else {
        this.riseData.bizOrgName = '';
        this.riseData.bizOrgCode = '';
        this.riseData.bizOrgId = '';
      }
    },
    //仓库
    warehouseNameFill(val) {
      console.log(val)
      if (val) {
        console.log(val)
        this.riseData.warehouseName = val.warehouseName;
        this.riseData.warehouseId = val.warehouseId;
        this.riseData.warehouseCode = val.warehouseCode;
      } else {
        this.riseData.warehouseName = '';
        this.riseData.warehouseId = '';
        this.riseData.warehouseCode = '';
      }
    },
    //币别
    currencyNameFill(val) {
      if (val) {
        console.log(val)
        this.riseData.currencyId = val.currencyId;
        this.riseData.currencyCode = val.currencyCode;
        this.riseData.currencyName = val.currencyName;
      } else {
        this.riseData.currencyId = '';
        this.riseData.currencyCode = '';
        this.riseData.currencyName = '';
      }
    },
    //客户
    childEventHandlerCustomer(val) {
      console.log(val);
      if (val) {
        this.riseData.customerName = val.custName;
        this.riseData.customerCode = val.custCode;
        //        this.riseData.customerId = val.customerId;
      } else {
        this.riseData.customerName = '';
        this.riseData.customerCode = '';
        this.riseData.customerId = '';
      }
    },
    handleSelectionChange(val) {
      this.selectchange = val;
    },
    handleCellClick() {

    },
  },
  filters: {
    packTypeTypeFilter(val) {
      return ENUMS["7135"][val];
    },
    productDateFilter(val) {
      console.log(val)
      if (val && val != '') {
        return val.parseTime('YYYY-MM-DD')
      } else {
        return '';
      }
    },

  },
  computed: {

    /*税额(增值税) texAmt
      总金额(含税) totalAmtTex
      总金额(不含税) totalAmt
      var orginAmt原币金额不含税 = (NP.times(orginPrice, num));
      var orginAmtTex原币金额含税 = (NP.times(orginPriceTex, num));
      */
    calculateAmtTex() {
      var list = this.tableData;


      if (!list) {
        return {
          texAmt: '0.00',
          totalAmtTex: '0.00',
          totalAmt: '0.00'
        };

      }

      var len = list.length;
      if (len == 0) {
        return {
          texAmt: '0.00',
          totalAmtTex: '0.00',
          totalAmt: '0.00'
        }
      }
      var texAmt = 0;
      var totalAmtTex = 0;
      var totalAmt = 0;
      // 税额拿原币计算
      for (var i = 0; i < len; i++) {

        var texRate = parseFloat(list[i].texRate) || 0; //税率

        var orginAmtTex = list[i].orginAmtTex;

        if (list[i].orginAmt) {
          totalAmt += parseFloat(list[i].orginAmt);
        }
        if (list[i].orginAmtTex) {
          totalAmtTex += parseFloat(list[i].orginAmtTex);
        }
        // 税额总计

        texAmt += parseFloat(list[i].texAmt);
        /*if (texRate) {
          var texAmtI = NP.times((NP.divide(orginAmtTex, NP.plus(1, texRate))), orginAmtTex);
          texAmt += texAmtI;
        }*/
      }
      return {
        texAmt: texAmt.toFixed(2),
        totalAmtTex: totalAmtTex.toFixed(2),
        totalAmt: totalAmt.toFixed(2),
      };
    },
    createdBtnStatus() {
      if (this.riseData.soOsNo) {
        return false;
      }
      return true;
    },
    disabled() {
      if (this.formData.manageSubName) {
        return false;
      } else {
        return true;
      }
    },
  }

}

</script>
<style>


</style>
