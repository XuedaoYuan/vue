<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom:2px">
      <!--<el-button type="primary" size="small" @click="toBeArrivePort" v-if="btn=='arrivePort'">保存-到港</el-button>-->
      <!--<el-button type="primary" size="small" @click="toBeArrivePort" v-else-if="btn=='qingGuan'">保存-清关</el-button>-->
      <el-button type="primary" size="small" @click="toSave('yes')" :disabled="!operateFlg">保存</el-button>
      <el-button type="info" size="small" @click="toSave('no')">取消</el-button>
    </div>
    <div class="elTabs info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抬头数据" name="first">
          <el-form ref="formFirst" label-width="80px" :model="tempAll" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="owNo">
                  <el-input v-model="tempAll.owNo" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提单号" prop="billNo">
                  <el-input v-model="tempAll.billNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据类型" prop="owType">
                  <el-select v-model="tempAll.owType" placeholder="请选择" size="mini" disabled>
                    <el-option
                      v-for="item in owType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发票号" prop="invoiceNo">
                  <el-input v-model="tempAll.invoiceNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <el-input v-model="tempAll.manageSubName" size="mini" disabled></el-input>
                  <!--<management-subject @childevent="childEventHandlerMainInfo"-->
                  <!--:querySelect="manageSubName"></management-subject>-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <!--<el-input v-model="tempAll.bizQrgName" size="mini" disabled></el-input>-->
                  <department-select @childevent="childEventHandlerDepartment"
                                     :transferSearch="transferSearchDepartment"
                                     :querySelect="bizOrgName" :disabled="true"></department-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="供应商" prop="supplierName">
                  <el-input v-model="tempAll.supplierName" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到达港口" prop="arrivePortName">
                  <el-input v-model="tempAll.arrivePortName" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="预计付税日" prop="expectPayRateDate">
                  <el-date-picker v-model="tempAll.expectPayRateDate" type="date" :editable="false"
                                  size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="免箱期限" prop="freeDay">
                  <el-input v-model="tempAll.freeDay" v-number-only:2.abs="1" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据状态" prop="owStatus">
                  <el-select v-model="tempAll.owStatus" clearable placeholder="请选择" size="mini" disabled>
                    <el-option
                      v-for="item in owStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="费用供应商" prop="costSupplierName" v-if="costSupplierNameShow.qing">
                  <supplier @getData="getData" :transferSearch="transferSearchDepartment" :selectName="costSupplierName"></supplier>
                </el-form-item>
                <el-form-item label="费用供应商" prop="costSupplierName1" v-else>
                  <!--<el-input v-model="tempAll.costSupplierName" size="mini"></el-input>-->
                  <supplier @getData="getData" :transferSearch="transferSearchDepartment" :selectName="costSupplierName"></supplier>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="负责货代" prop="freightForwarder">
                  <el-select v-model="tempAll.freightForwarder" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in freightForwarder"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!--{{costSupplierNameShow.arrive}}-->
                <el-form-item label="实际到港日" prop="actualArrive" v-if="costSupplierNameShow.arrive">
                  <el-date-picker v-model="tempAll.actualArrive" type="date" :editable="false"
                                  size="mini"></el-date-picker>
                </el-form-item>
                <el-form-item label="实际到港日" prop="actualArrive1" v-else>
                  <el-date-picker v-model="tempAll.actualArrive" type="date" :editable="false"
                                  size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到单寄出日" prop="arriveSendDate">
                  <el-date-picker v-model="tempAll.arriveSendDate" type="date" :editable="false"
                                  size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="来源单据号" prop="sourceOwNo">
                  <el-input size="mini" v-model="tempAll.sourceOwNo" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="单据日期" prop="lbDate">
                  <el-date-picker v-model="tempAll.lbDate" type="date" :editable="false" size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备 注" prop="remark">
                  <el-input v-model="tempAll.remark" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label='币别' prop="remark">
                  <currency-select @childevent="childEventHandlerCurrency" :querySelect="currencyName"
                                   ref="currencyNamePage" :disabled="true"></currency-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="costSupplierNameShow.arrive">
                <el-form-item label="免箱到期日" prop="remark">
                  <el-date-picker v-model="actualArriveDay" type="date" :editable="false"
                                  size="mini" disabled></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="汇总数据" name="second">
          <el-form ref="form" label-width="80px" :model="summaryData">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="总毛重/kg" prop="allGrossWeight">
                  <el-input v-model="allGrossWeight" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总净重/kg" prop="allNetWeight">
                  <el-input v-model="allNetWeight" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总公重/kg" prop="allPubWeight">
                  <el-input v-model="allPubWeight" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原币金额" prop="allOrginAmtTex">
                  <el-input v-model="allOrginAmtTex" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="本币金额" prop="allBaseAmtTex">
                  <el-input v-model="allBaseAmtTex" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总件数" prop="allQty">
                  <el-input v-model="allQty" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
              <!--<el-form-item label="总包重/kg" prop="allPackageWeight">-->
              <!--<el-input v-model="allPackageWeight" size="mini" disabled></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="系统信息" name="third">
          <el-form ref="form" label-width="80px" :model="systemInformation">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建人" prop="createdBy">
                  <el-input v-model="systemInformation.createdBy" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改人" prop="updatedBy">
                  <el-input v-model="systemInformation.updatedBy" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账人" prop="postPersonName">
                  <el-input v-model="systemInformation.postPersonName" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="创建时间" prop="createdTime">
                  <el-date-picker v-model="systemInformation.createdTime" type="datetime" :editable="false" size="mini"
                                  disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间" prop="updatedTime">
                  <el-date-picker v-model="systemInformation.updatedTime" type="datetime" size="mini"
                                  disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账时间" prop="postDate">
                  <el-date-picker v-model="systemInformation.postDate" type="datetime" size="mini"
                                  disabled></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn" style="margin: 15px auto">
      <el-button type="warning" size="mini" @click="showDialogPurchase" :disabled="arriveEdit">创建</el-button>
      <el-button type="warning" icon="el-icon-delete" plain size="mini" @click="deleteCell" :disabled="arriveEdit">删除
      </el-button>
    </div>
    <div class="commonTable">
      <!--v-loading.sync="loading"-->

      <common-table
        ref="firstTable"
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @row-click="handleRowClick"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'companyFilter'">
            <span>{{list[scope.index]['packType'] | companyFilter}}</span>
          </div>
          <div v-if="scope.text == 'date'">
            <span>{{list[scope.index]['productDate'] | parseTime('{y}-{m}-{d}')}}</span>
          </div>
        </template>
        <template slot="default" slot-scope="scope">
          <div v-if="scope.text == 'date'">
            <el-date-picker
              v-model="list[scope.index]['productDate']"
              size="mini"
              type="date"
              :editable="false"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div v-if="scope.text == 'grossWeight'">
            <el-input v-number-only:5.abs="2" v-model="list[scope.index]['grossWeight']" @input="getPackageWeight"
                      size="mini" :disabled="arriveEdit" @blur="inspectNo"></el-input>
          </div>
          <div v-if="scope.text == 'pubWeight'">
            <el-input v-number-only:5.abs="3" v-model="list[scope.index]['pubWeight']" @input="getPackageWeight"
                      size="mini" :disabled="arriveEdit" @blur="inspectNo"></el-input>
          </div>
          <div v-if="scope.text == 'netWeight'">
            <el-input v-number-only:5.abs="2" v-model="list[scope.index]['netWeight']" @input="getPackageWeight"
                      size="mini" :disabled="arriveEdit" @blur="inspectNo"></el-input>
          </div>
          <div v-if="scope.text == 'qty'">
            <el-input v-number-only:5.abs="0" v-model="list[scope.index]['qty']" @input="getPackageWeight"
                      size="mini" @blur="inspectNo"></el-input>
          </div>
        </template>
      </common-table>
    </div>
    <!--采购合同单据号-->
    <contract-of-purchase :dialogShow="dialogShow" @choosePurse="choosePurse"
                          @closeDialogPurchase="closeDialogPurchase"
                          :queryDialogDtl="queryDialogDtl"
                          :queryDialog="queryDialogData"></contract-of-purchase>
  </div>
</template>
<script type="text/javascript">
  import supplier from '@/components/common-select/supplier.vue'
  import arrivePort from '@/components/common-select/arrive-port.vue'
  import contractOfPurchase from 'components/common-dialog/contract-of-purchase-dialog.vue' //采购合同单据号
  import ManagementSubject from 'components/common-select/management-subject.vue' //经营主体
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别

  import {pickerOptions} from '@/util'
  import {createPrompt } from '@/api/sales-process/sales-invoice/sales-invoice'
  import moment from 'moment';//时间


  //接口引用
  import {
    doQueryCodOw,
    doUpdateCodOw,
    doCusSave,//生成接口
  } from '@/api/purchase/tracking-manage/tracking-manage'
  const headers = [
    {type: 'selection', width: '55px', fixed: "left"},
    {prop: 'owDtlRowNo', type: 'index', label: '行号', fixed: "left", width: "55px", align: 'center'},
    {prop: 'cabinetNo', label: '柜号', template: 'date', editable: true, required: true, align: 'center'},
    {prop: 'poContractNo', label: '采购合同号', width: '160px', align: 'center'},
    {prop: 'poNo', label: '采购合同单据号', width: '180px', required: true, align: 'center'},
    {prop: 'goodsName', label: '物料名称', width: '160px', required: true, align: 'center'},
    {prop: 'packType', label: '包装方式', width: '120px', filter: 'companyFilter', align: 'center'},
    {prop: 'goodsCode', label: '物料编号', width: '120px', align: 'center'},
    {prop: 'grossWeight', label: '毛重/kg', width: '120px', required: true, template: 'grossWeight', align: 'center'},
    {prop: 'netWeight', label: '净重/kg', width: '120px', template: 'netWeight', required: true, align: 'center'},
    {prop: 'pubWeight', label: '公重/kg', width: '120px', template: 'pubWeight', required: true, align: 'center'},
    {prop: 'orginPriceTex', label: '原币单价', width: '120px', align: 'center', digit: '6'},
    {prop: 'orginAmtTex', label: '原币金额', width: '120px', align: 'center', digit: '2'},
    {prop: 'basePriceTex', label: '本币单价', width: '120px', align: 'center', digit: '6'},
    {prop: 'baseAmtTex', label: '本币金额', width: '120px', align: 'center', digit: '2'},
    {prop: 'qty', label: '件数', width: '120px', template: 'qty', required: true, align: 'center'},
    {prop: 'packageWeight', label: '包重/kg', width: '120px', align: 'center'},
//    {prop: 'seriesNo', label: '批次', width: '120px', align: 'center'},
    {prop: 'supplierBatchNo', label: '供应商批号', width: '120px', editable: true, align: 'center', required: true},
    {
      prop: 'productDate',
      label: '供方生产日期',
      width: '200px',
      template: 'date',
      filter: 'productDateFilter',
      align: 'center', required: true
    },
//    {prop: 'productDate', label: '供方生产日期', width: '200px', template: 'date', transform: {date: true}},
    {prop: 'tariffAmt', label: '关税', width: '120px', editable: true, align: 'center', digit: '2'},
    {prop: 'texAmt', label: '增值税', width: '120px', editable: true, align: 'center', digit: '2'},
    {prop: 'otherAmt', label: '其他费用', width: '120px', editable: true, align: 'center', digit: '2'},
  ];
  const owType = [
    {value: 72000010, label: '提单'},
    {value: 72000030, label: '清关'},
    {value: 72000020, label: '到港'},
  ];
  const freightForwarder = [
    {value: 72200010, label: '物产物流'},
    {value: 72200020, label: '象屿物流'},
    {value: 72200030, label: '中外运'},
    {value: 72200040, label: '邦达'},
    {value: 72200050, label: '长发'},
  ];
  const packType = [
    {value: 71350010, label: '编织袋'},
    {value: 71350020, label: '中性编织袋'},
    {value: 71350030, label: '纸箱'},
    {value: 71350040, label: '托盘'},
    {value: 71350050, label: '其他'},
  ];
  const owStatus = [
    {value: 70100010, label: '保存'},
    {value: 70100020, label: '已过账'},
    {value: 70100030, label: '已冲销'},
    {value: 70100040, label: '已关闭'},
  ];
  export default {
    components: {supplier, arrivePort, ManagementSubject, DepartmentSelect, contractOfPurchase, CurrencySelect},
    data(){
      return {
        total: null,
        owStatus: owStatus,
        packType: packType,
        freightForwarder: freightForwarder,
        owType: owType,
        //抬头数据
        tempAll: {},
        //汇总数据
        summaryData: {},
        //系统信息
        systemInformation: {},
        activeName: 'first',
        headers: headers,
        list: [],
        currentPage: 2,
        deleteCellData: [],
        deleteCellDataId: [],
        selectName: '',//选中的名字默认显示
        selectNamePort: '',//选中的名字默认显示
        pickerOptions: {
          shortcuts: pickerOptions
        },
        bizOrgName: '',//部门
        manageSubName: '',//供应商
        canChange: false,
        rules: {
          billNo: [{required: true, message: ' ', trigger: 'blur'},],
          owType: [{type: 'number', required: true, message: ' ', trigger: 'change'}],
          invoiceNo: [{required: true, message: ' ', trigger: 'blur'}],
          manageSubName: [{required: true, message: ' ', trigger: 'input'}],
          bizOrgName: [{required: true, message: ' ', trigger: 'change'}],
          arrivePortName: [{required: true, message: ' ', trigger: 'blur'}],
          freightForwarder: [{type: 'number', required: true, message: ' ', trigger: 'change'}],
          freeDay: [{required: true, message: ' ', trigger: 'blur'}],
          actualArrive: [{type: 'date', required: true, message: ' ', trigger: 'change'}],
          actualArrive1: [{type: 'date', required: false, message: ' ', trigger: 'change'}],
          supplierName: [{required: true, message: ' ', trigger: 'change'}],
          currencyName: [{required: true, message: ' ', trigger: 'change'}],
          costSupplierName: [{type: 'string', required: true, message: ' ', trigger: 'change'}],
          costSupplierName1: [{type: 'string', required: false, message: ' ', trigger: 'change'}],
        },
        dialogShow: false,
        loading: true,
        arriveEdit: false,
        btn: "",
        transferSearchDepartment: {
          companyName: "",
          companyId: "",
          companyCode: "",
          boolToBtn: true,
        },
        queryDialogData:{},
        textMain: '',
        costSupplierName: '',
        currencyName: '',
        operateFlg: false,//操作按钮
        queryDialogDtl:[],//弹框已选数据
//        goodsName: '',
//        goodsIndex: ""
      }
    },
    filters: {
      companyFilter(val) {
        if (val) {
          val.toString()
        }
        return ENUMS['7135'][val];
      },
      productDateFilter(val){
        if (val && val != '') {
          return moment(val).format('YYYY-MM-DD')
        } else {
          return '';
        }
      },
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
    created(){
      let vm = this;
      vm.operateFlg = true;
      let queryData = {};
      vm.deleteCellDataId = [];
//      this.$refs['formFirst'].clearValidate();//移除整个表单验证
      vm.arriveEdit = false;
      let dataId = this.$store.getters.params.TrackingManage;
      if (dataId.data) {
        queryData.owId = dataId.data.owId;
        vm.btn = dataId.data.owType;
      } else {
        queryData.owId = dataId.owId;
      }
      doQueryCodOw(queryData).then(response => {
        vm.loading = false;
        let dataCodOwVO = response.data.data.codOwVO;
        let dataCodOwDtlVO = response.data.data.codOwDtlVO;
        vm.list = [];
        dataCodOwDtlVO.forEach((o, i) => {
          vm.list.push({
            'owDtlRowNo': o.owDtlRowNo,
            'owDtlId': o.owDtlId,
            'owId': o.owId,
            'cabinetNo': o.cabinetNo,
            'poNo': o.poNo,
            'goodsCode': o.goodsCode,
            'goodsName': o.goodsName,
            'goodsId': o.goodsId,
            'grossWeight': o.grossWeight,
            'netWeight': o.netWeight,
            'pubWeight': o.pubWeight,
            'orginPriceTex': o.orginPriceTex,
            'orginAmtTex': o.orginAmtTex,
            'basePriceTex': o.basePriceTex,
            'baseAmtTex': o.baseAmtTex,
            'qty': o.qty,
            'packageWeight': o.packageWeight,
            'seriesNo': o.seriesNo,
            'supplierBatchNo': o.supplierBatchNo,
            'productDate': o.productDate,
            'poContractNo': o.poContractNo,
            'packType': o.packType,
            'tariffAmt': o.tariffAmt,
            'texAmt': o.texAmt,
            'otherAmt': o.otherAmt,
            'poDtlId': o.poDtlId,
            'weightStandType': o.weightStandType,//合同计重标准-字段没加
            'unitCode': o.unitCode,//合同计重标准-字段没加
            'unitName': o.unitName,//合同计重标准-字段没加
            'unitId': o.unitId,//合同计重标准-字段没加
            'dtlQty': o.dtlQty,//合同计重标准-字段没加
            'version': o.version,
            //听说是没加的BASE_TEX_AMT'orginPrice=valData.orginPrice;
            'basePrice': o.basePrice,
            'orginPrice': o.orginPrice,
            'baseAmt': o.baseAmt,//本位币金额不含税
            'baseTexAmt': o.baseTexAmt,
            'orginAmt': o.orginAmt,
          })
        });

        //抬头数据
        vm.tempAll = {
          version: dataCodOwVO.version,
          owId: dataCodOwVO.owId,
          manageSubCode: dataCodOwVO.manageSubCode,
          manageSubName: dataCodOwVO.manageSubName,
          manageSubId: dataCodOwVO.manageSubId,
          supplierCode: dataCodOwVO.supplierCode,
          supplierName: dataCodOwVO.supplierName,
          supplierId: dataCodOwVO.supplierId,
          currencyCode: dataCodOwVO.currencyCode,
          currencyName: dataCodOwVO.currencyName,
          currencyId: dataCodOwVO.currencyId,
          rateCurrency: dataCodOwVO.rateCurrency,//汇率
          bizOrgName: this.tempAll.bizOrgName,
          bizOrgId: this.tempAll.bizOrgId,
          bizOrgCode: this.tempAll.bizOrgCode,
          owNo: dataCodOwVO.owNo,
          billNo: dataCodOwVO.billNo,
          expectPayRateDate: dataCodOwVO.expectPayRateDate,
//          owType: dataCodOwVO.owType,
          invoiceNo: dataCodOwVO.invoiceNo,
          createdTime: dataCodOwVO.createdTime,
          createdBy: dataCodOwVO.createdBy,
          updatedTime: dataCodOwVO.updatedTime,
          postPersonName: dataCodOwVO.postPersonName,
          freightForwarder: dataCodOwVO.freightForwarder,
          bizOrgName: dataCodOwVO.bizOrgName,
          bizOrgId: dataCodOwVO.bizOrgId,
          bizOrgCode: dataCodOwVO.bizOrgCode,
          freeDay: dataCodOwVO.freeDay + '',
          remark: dataCodOwVO.remark,
          owStatus: dataCodOwVO.owStatus,

          arrivePortName: dataCodOwVO.arrivePortName,
          arriveSendDate: dataCodOwVO.arriveSendDate,
          actualArrive: dataCodOwVO.actualArrive,
          lbDate: dataCodOwVO.lbDate,
          costSupplierName: dataCodOwVO.costSupplierName,
          costSupplierCode: dataCodOwVO.costSupplierCode,
          costSupplierName: dataCodOwVO.costSupplierId,
          sourceOwId: dataCodOwVO.sourceOwId,
//          sourceOwNo: dataCodOwVO.sourceOwNo,
        };
        vm.transferSearchDepartment.companyName = vm.tempAll.manageSubName;
        vm.transferSearchDepartment.companyId = vm.tempAll.manageSubId;
        vm.transferSearchDepartment.companyCode = vm.tempAll.manageSubCode;
        if (vm.btn == 'arrivePort') {//提单赋值为到港--生成到港
          vm.tempAll.owType = Number(72000020);
          vm.tempAll.owStatus = Number(70100010);
          this.tempAll.sourceOwNo = vm.tempAll.owNo;
          vm.arriveEdit = true;
        } else if (vm.btn == 'qingGuan') {//到港赋值为清关
          vm.tempAll.owType = Number(72000030);
          vm.tempAll.owStatus = Number(70100010);
          this.tempAll.sourceOwNo = vm.tempAll.owNo;
          vm.arriveEdit = true;
        } else {
          vm.tempAll.owType = dataCodOwVO.owType;
          vm.arriveEdit = false;
        }
        if (this.tempAll.owType != '72000010') {
          this.tempAll.sourceOwNo = vm.tempAll.owNo;
        }
        //系统信息
        vm.systemInformation = {
          createdBy: dataCodOwVO.createdBy,
          createdTime: dataCodOwVO.createdTime,
          postPersonName: dataCodOwVO.postPersonName,
          postDate: dataCodOwVO.postDate,
          updatedBy: dataCodOwVO.updatedBy,
          updatedTime: dataCodOwVO.updatedTime
        };
        //共通组件默认选择
        vm.selectName = vm.tempAll.supplierName;//修改页默认选择--供应商
        vm.bizOrgName = vm.tempAll.bizOrgName;//修改页默认选择--部门
        vm.manageSubName = vm.tempAll.manageSubName;//修改页默认选择--经营主体
        vm.currencyName = vm.tempAll.currencyName;//修改页默认选择--币种
        vm.costSupplierName = vm.tempAll.costSupplierName;//修改页默认选择--费用供应
      })
    },
    computed: {
      allOrginAmtTex(){
        let [vm, orginAmtTex] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.orginAmtTex) {
            o.orginAmtTex = 0
          }
          orginAmtTex += Number(o.orginAmtTex)
        })
        return orginAmtTex.toFixed(2);
      },
      allBaseAmtTex(){
        let [vm, baseAmtTex] = [this, 0];
        vm.list.forEach((o, i) => {
          if (!o.baseAmtTex) {
            o.baseAmtTex = 0
          }
          baseAmtTex += Number(o.baseAmtTex)
        })
        return baseAmtTex.toFixed(2);
      },
      allGrossWeight(){
        let grossWeightTotal = 0;
        let vm = this;
        vm.list.forEach((o, i) => {
          grossWeightTotal += Number(o.grossWeight)
        })
        return grossWeightTotal;
      },
      allNetWeight(){
        let netWeightTotal = 0;
        let vm = this;
        vm.list.forEach((o, i) => {
          netWeightTotal += Number(o.netWeight)
        })
        return netWeightTotal;
      },
      allPubWeight(){
        var pubWeightTotal = 0;
        let vm = this;
        vm.list.forEach((o, i) => {
          pubWeightTotal += Number(o.pubWeight)
        })
        return pubWeightTotal;
      },
      allQty(){
        let totalQty = 0;
        let vm = this;
        vm.list.forEach((o, i) => {
          totalQty += Number(o.qty)
        })
        return totalQty;
      },
      allPackageWeight(){
        let packageWeightTotal = 0;
        let vm = this;
        vm.list.forEach((o, i) => {
          packageWeightTotal += Number(o.packageWeight)
        })
        return packageWeightTotal;
      },
      costSupplierNameShow(){
//        {value: 72000020, label: '到港'},
//        {value: 72000030, label: '清关'},
//        {value: 72000010, label: '提单'},
        let data = [];
        if (this.tempAll.owType == '72000030') {
          data.qing = true;
          data.arrive = false;
//          data = true;
        } else if (this.tempAll.owType == '72000020') {
          data.qing = false;
          data.arrive = true;
        }
        return data;
      },
      actualArriveDay(){
        let date;
        date = moment(this.tempAll.actualArrive).add(this.tempAll.freeDay, 'days').format('YYYY-MM-DD');
        return date
      },
      //---
//      getDetData(){
//          let data;
//        data=this.deleteCellData.length;
////        this.deleteCellData.forEach(()=>{
////
////        });
//      },
    },
    methods: {
      childEventHandlerCurrency(val) {//币种
        if (val) {
          this.tempAll.currencyName = val.currencyShortname;
          this.tempAll.currencyId = val.currencyId;
          this.tempAll.currencyCode = val.currencyCode;
          //新增对人民币汇率
          this.tempAll.rateCurrency=val.exchangeRate;
          this.$refs['formFirst'].validateField('currencyName');
        } else {
          this.tempAll.currencyName = '';
          this.tempAll.currencyId = '';
          this.tempAll.currencyCode = '';
          this.tempAll.rateCurrency = '';
        }
      },
      inspectNo(){
        let vm = this;
        vm.list.forEach((o, i) => {
//          console.log(o,"---");
          if (o.weightStandType == '71250010') {//毛重
            if (o.grossWeight <= 0) {
              o.grossWeight = '';
              if (vm.textMain == '毛重/kg' && this.goodsIndex == o.$index) {
                vm.$message({
                  type: "warning",
                  message: "毛重不能小于等于0"
                })
              }
            }
          } else if (o.weightStandType == '71250020') {//净重
            if (o.netWeight <= 0) {
              o.netWeight = '';
              if (vm.textMain == '净重/kg' && this.goodsIndex == o.$index) {
                vm.$message({
                  type: "warning",
                  message: "净重不能小于等于0"
                })
              }
            }
          } else if (o.weightStandType == '71250030') {//公重
            if (o.pubWeight <= 0) {
              o.pubWeight = '';
              if (vm.textMain == '公重/kg' && this.goodsIndex == o.$index) {
                vm.$message({
                  type: "warning",
                  message: "公重不能小于等于0"
                })
              }
            }
          }
          if (vm.textMain == '件数' && this.goodsIndex == o.$index) {
            if (o.qty <= 0) {
              o.qty = '';
              o.packageWeight = '';
              vm.$message({
                type: "warning",
                message: "件数不能小于等于0"
              })
            }
          }
        });
      },
      getPackageWeight(row){//包重
        let vm = this;
        vm.list.forEach((o, i) => {
          if (this.goodsIndex == o.$index) {
            if (o.grossWeight == '') {
              o.grossWeight = 0
            }
            if (o.qty == '') {
              o.qty = 1
            }//除数不能为0
            o.packageWeight = (Number(o.grossWeight) / Number(o.qty)).toFixed(2);
          }
          if (o.weightStandType == '71250010') {//毛重
            o.orginAmtTex = (o.orginPriceTex * o.grossWeight).toFixed(2);
            o.baseAmtTex = (o.basePriceTex * o.grossWeight).toFixed(2);
            o.dtlQty = o.grossWeight;
          } else if (o.weightStandType == '71250020') {//净重
            o.orginAmtTex = (o.orginPriceTex * o.netWeight).toFixed(2);
            o.baseAmtTex = (o.basePriceTex * o.netWeight).toFixed(2);
            o.dtlQty = o.netWeight;
          } else if (o.weightStandType == '71250030') {//公重
            o.orginAmtTex = (o.orginPriceTex * o.pubWeight).toFixed(2);
            o.baseAmtTex = (o.basePriceTex * o.pubWeight).toFixed(2);
            o.dtlQty = o.pubWeight;
          }
        });
      },
      choosePurse(valData){
        let vm = this;
        let owDtlRowNo = 1;
        if (this.list.length >= 1) {
          owDtlRowNo = this.list[this.list.length - 1].owDtlRowNo + 1
        }
        if (valData.length) {
          valData.forEach((val, i) => {
            var data = {
              'owDtlRowNo': owDtlRowNo,
              'cabinetNo': '',//柜号
              'poContractNo': '',//采购合同单据号
              'goodsCode': '',
              'goodsName': '',
              'grossWeight': '',
              'netWeight': '',
              'pubWeight': '',
              'orginPriceTex': '',
              'orginAmtTex': '',
              'basePriceTex': '',
              'baseAmtTex': '',
              'qty': '',
              'packageWeight': '',
              'seriesNo': '',
              'supplierBatchNo': '',
              'productDate': '',
              'dtlQty': '',
              'weightStandType': '',
//          'owId': '',
//          'version': '',
            };
            data.poContractNo = val.poContractNo;//采购合同单据号
            data.goodsName = val.goodsName;//物料名称
            data.goodsCode = val.goodsCode;//物流code
            data.goodsId = val.goodsId;//物流code
            data.poNo = val.poNo;//
            data.packType = val.packType;//
            data.basePriceTex = (val.basePriceTex).toFixed(6);//
            data.orginPriceTex = (val.orginPriceTex).toFixed(6);//
            data.poDtlId = val.poDtlId;//
            data.weightStandType = val.weightStandType;//合同计重标准
            //后面加了3个
            data.unitCode = val.unitCode;
            data.unitId = val.unitId;
            data.unitName = val.unitName;
            //听说是没加的BASE_TEX_AMT
            data.orginPrice = val.orginPrice;
            data.basePrice = val.basePrice;
            data.baseAmt = val.baseAmt;
            data.baseTexAmt = val.baseTexAmt;
            data.orginAmt = val.orginAmt;
            if (val.poContractNo) {
              if (val.weightStandType == '71250010') {//毛重
                data.orginAmtTex = (data.orginPriceTex * data.grossWeight).toFixed(2);
                data.baseAmtTex = (data.basePriceTex * data.grossWeight).toFixed(2);
              } else if (val.weightStandType == '71250020') {//净重
                data.orginAmtTex = (data.orginPriceTex * data.netWeight).toFixed(2);
                data.baseAmtTex = (data.basePriceTex * data.netWeight).toFixed(2);
              } else if (val.weightStandType == '71250030') {//公重
                data.orginAmtTex = (data.orginPriceTex * data.pubWeight).toFixed(2);
                data.baseAmtTex = (data.basePriceTex * data.pubWeight).toFixed(2);
              }
              vm.list.push(data)
            } else {
            }
          });
        } else {
          //双击单选
          var data = {
            'owDtlRowNo': owDtlRowNo,
            'cabinetNo': '',//柜号
            'poContractNo': '',//采购合同单据号
            'goodsCode': '',
            'goodsName': '',
            'grossWeight': '',
            'netWeight': '',
            'pubWeight': '',
            'orginPriceTex': '',
            'orginAmtTex': '',
            'basePriceTex': '',
            'baseAmtTex': '',
            'qty': '',
            'packageWeight': '',
            'seriesNo': '',
            'supplierBatchNo': '',
            'productDate': '',
            'dtlQty': '',
            'weightStandType': '',
//          'owId': '',
//          'version': '',
          };
          //带出采购合同号，物料，包装，单价，批次，采购合同单据号
          data.poContractNo = valData.poContractNo;//采购合同单据号
          data.goodsName = valData.goodsName;//物料名称
          data.goodsCode = valData.goodsCode;//物流code
          data.goodsId = valData.goodsId;//物流code
          data.poNo = valData.poNo;//
          data.packType = valData.packType;//
          data.basePriceTex = (valData.basePriceTex).toFixed(6);//
          data.orginPriceTex = (valData.orginPriceTex).toFixed(6);//
          data.poDtlId = valData.poDtlId;//
          data.weightStandType = valData.weightStandType;//合同计重标准
          //后面加了3个
          data.unitCode = valData.unitCode;
          data.unitId = valData.unitId;
          data.unitName = valData.unitName;
          //听说是没加的BASE_TEX_AMT
          data.orginPrice = valData.orginPrice;
          data.basePrice = valData.basePrice;
          data.baseAmt = valData.baseAmt;//本位币金额不含税
          data.baseTexAmt = valData.baseTexAmt;
          data.orginAmt = valData.orginAmt;
          if (valData.poContractNo) {
            if (valData.weightStandType == '71250010') {//毛重
              data.orginAmtTex = (data.orginPriceTex * data.grossWeight).toFixed(2);
              data.baseAmtTex = (data.basePriceTex * data.grossWeight).toFixed(2);
            } else if (valData.weightStandType == '71250020') {//净重
              data.orginAmtTex = (data.orginPriceTex * data.netWeight).toFixed(2);
              data.baseAmtTex = (data.basePriceTex * data.netWeight).toFixed(2);
            } else if (valData.weightStandType == '71250030') {//公重
              data.orginAmtTex = (data.orginPriceTex * data.pubWeight).toFixed(2);
              data.baseAmtTex = (data.basePriceTex * data.pubWeight).toFixed(2);
            }
            this.list.push(data)
          } else {
          }
        }
        this.addItemFlg = true;
        this.addItemTable = 'firstTable';
      },
      showDialogPurchase(){
        let vm=this;
        vm.queryDialogDtl=[];
        if(createPrompt(this.tempAll,'tracking')){
          vm.list.forEach((o,i)=>{
            vm.queryDialogDtl.push(o.poDtlId)
          });
          this.dialogShow = true;
          this.queryDialogData.supplierId = this.tempAll.supplierId;
          this.queryDialogData.manageSubId = this.tempAll.manageSubId;
          this.queryDialogData.bizOrgId = this.tempAll.bizOrgId;
          this.queryDialogData.currencyId = this.tempAll.currencyId;
        }
      },
      closeDialogPurchase(){
        this.dialogShow = false;
      },
      submitForm(formName) {
//        console.log(typeof (new Date(this.tempAll.actualArrive)), "tempAll");
        if (typeof (this.tempAll.actualArrive) == 'number') {
          this.tempAll.actualArrive = new Date(this.tempAll.actualArrive)
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.table();
          } else {
            this.$message({
              type:"warning",
              message:"请完善必填字段"
            })
          }
        });
      },
      toSave(text){
        if (text == 'yes') {//保存
          this.submitForm('formFirst');
        } else {//取消
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'index'
            }
          });
        }
      },
      table(){
        let vm = this;
        eventBus.$emit('validateTable', {
          data: this.list,    //表示表格数据
          headers: this.headers,   //表示表头数据
          success: (valid) => {   //成功回掉
            if (valid) {
              if (vm.list.length > 0) {
                this.$confirm('是否保存?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.exchangeAllData()
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消保存'
                  });
                });
//                this.exchangeAllData();
              } else {
                vm.$message({
                  type: "warning",
                  message: "至少保留一条明细"
                })
              }
            } else {
            }
          }
        })
      },
      exchangeAllData(){
        let vm = this;
        vm.operateFlg = true;
        let pathWay;
        vm.list.forEach((o, i) => {
          delete o.$index;
//          delete o.weightStandType;
          if (vm.btn == 'qingGuan' || vm.btn == 'arrivePort') {
            o.sourceOwDtlId = o.owDtlId;
            o.owDtlId = '';
            pathWay = doCusSave;
          } else {
            pathWay = doUpdateCodOw;
          }
          if (o.productDate != '' & o.productDate != null) {
            o.productDate = o.productDate.parseTime('YYYY-MM-DD');
          } else {
            o.productDate = '';
          }
        });
        let changeData = {
          'version': this.tempAll.version,
          "owNo": this.tempAll.owNo,
          "owId": this.tempAll.owId,
          "sourceOwId": this.tempAll.sourceOwId,
//          "sourceOwNo": this.tempAll.sourceOwNo,
          "manageSubName": this.tempAll.manageSubName,
          "manageSubCode": this.tempAll.manageSubCode,
          "manageSubId": this.tempAll.manageSubId,
          "supplierName": this.tempAll.supplierName,
          "supplierCode": this.tempAll.supplierCode,
          "supplierId": this.tempAll.supplierId,
          'currencyName': this.tempAll.currencyName,
          'currencyCode': this.tempAll.currencyCode,
          'currencyId': this.tempAll.currencyId,
          'bizOrgName': this.tempAll.bizOrgName,
          'bizOrgId': this.tempAll.bizOrgId,
          'bizOrgCode': this.tempAll.bizOrgCode,
          "billNo": this.tempAll.billNo,
          "invoiceNo": this.tempAll.invoiceNo,
          'freeDay': this.tempAll.freeDay,
          'arriveSendDate': this.tempAll.arriveSendDate == null ? null : this.tempAll.arriveSendDate.parseTime('YYYY-MM-DD'),
          'expectPayRateDate': this.tempAll.expectPayRateDate == null ? null : this.tempAll.expectPayRateDate.parseTime('YYYY-MM-DD'),
          'actualArrive': this.tempAll.actualArrive == null ? null : this.tempAll.actualArrive.parseTime('YYYY-MM-DD'),
          'lbDate': this.tempAll.lbDate == null ? null : this.tempAll.lbDate.parseTime('YYYY-MM-DD'),
          'owType': this.tempAll.owType,
          'postPersonName': this.tempAll.postPersonName,
          'remark': this.tempAll.remark,
          'freightForwarder': this.tempAll.freightForwarder,
          'costSupplierName': this.tempAll.costSupplierName,
          'costSupplierCode': this.tempAll.costSupplierCode,
          'costSupplierId': this.tempAll.costSupplierId,
          'arrivePortName': this.tempAll.arrivePortName,
          'rateCurrency': this.tempAll.rateCurrency,
          //明细
          "codOwDtlCusFormList": [],
          //汇总数据
          'grossWeightTotal': this.allGrossWeight,
          'netWeightTotal': this.allNetWeight,
          'pubWeightTotal': this.allPubWeight,
          'totalQty': this.allQty,
//          'packageWeightTotal': this.allPackageWeight,
          'baseAmtTex': this.allbaseAmtTex,
          'orginTex': this.allorginalTex,
          //系统信息
          'createdTime': this.tempAll.createdTime,
          'createdBy': this.tempAll.createdBy,
          'updatedTime': this.tempAll.updatedTime,
          'postDate': this.systemInformation.postDate,
          'updatedBy': this.systemInformation.updatedBy,
        };
        if (pathWay === doCusSave) {
          changeData.sourceOwId = vm.tempAll.owId;
          changeData.owId = '';
          changeData.rateCurrency =vm.tempAll.rateCurrency;//汇率
          changeData.owStatus = '70100010';//状态保存
        } else {
          changeData.deleteCodOwDtlIDList = vm.deleteCellDataId;
        }
        changeData.codOwDtlCusFormList = vm.list;
        pathWay(changeData).then(response => {
          if (response.data.status == '1') {
            vm.operateFlg = false;
            if (pathWay === doCusSave) {
              vm.$notify({
                title: '成功',
                type: "success",
                message: '生成成功'
              });
            } else {
              vm.$notify({
                title: '成功',
                type: "success",
                message: '修改成功'
              });
            }
            this.$store.dispatch('toggleCurrentView', {
              TrackingManage: {
                view: 'index'
              }
            });
          }else{
            vm.operateFlg = false;
          }
        })
      },
      //表格点击
      handleRowClick(row){
        this.goodsIndex = row.$index;
        this.goodsName = row.goodsName;
      },
      handleCellClick(x, y, z){
        this.textMain = y.label
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
          vm.deleteCellDataId.push({
            owDtlId: o.owDtlId,
            version: o.version,
          })
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

      //供应商
      getChildevent(val){
        if (val) {
          this.tempAll.supplyName = val.supplyName;
        } else {
          this.tempAll.supplyName = '';
        }
      },
      getData(data){
        if (data) {
          this.tempAll.costSupplierCode = data.supplyCode;
          this.tempAll.costSupplierId = data.id;
          this.tempAll.costSupplierName = data.supplyName;
        } else {
          this.tempAll.costSupplierCode = '';
          this.tempAll.costSupplierId = '';
          this.tempAll.costSupplierName = '';
        }
      },
      //经营主体
      childEventHandlerMainInfo(data){
        if (data) {
          this.tempAll.manageSubName = data.companyName;
        } else {
          this.tempAll.manageSubName = ''
        }
      },
      //部门
      childEventHandlerDepartment(data){
        if (data) {
          this.tempAll.bizOrgName = data.orgName;
          this.tempAll.bizOrgId = data.orgId;
          this.tempAll.bizOrgCode = data.orgCode;
          this.$refs['formFirst'].validateField('bizOrgName');
        } else {
          this.tempAll.bizOrgName = '';
          this.tempAll.bizOrgId = '';
          this.tempAll.bizOrgCode = '';
        }
      },
    },
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .elTabs {
    /*height: 260px;*/
  }
</style>
