<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 2px">
      <el-button type="primary" size="small" @click="toSave('yes')">返回</el-button>
      <!--<el-button type="primary" size="small" @click="toSave('no')">取消</el-button>-->
    </div>
    <div class="elTabs info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抬头数据" name="first">
          <el-form ref="form" label-width="80px" :model="tempAll">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="owNo">
                  <el-input v-model="tempAll.owNo" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提单号" prop="billNo">
                  <el-input v-model="tempAll.billNo" size="mini"disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据类型" prop="owType">
                  <el-select v-model="tempAll.owType" placeholder="请选择" size="mini"disabled>
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
                  <el-input v-model="tempAll.invoiceNo" size="mini"disabled></el-input>
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
                  <el-input v-model="tempAll.bizOrgName" size="mini" disabled></el-input>
                  <!--<department-select @childevent="childEventHandlerDepartment"-->
                                     <!--:querySelect="bizOrgName"></department-select>-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="供应商" prop="supplierName">
                  <el-input v-model="tempAll.supplierName" size="mini" disabled></el-input>
                  <!--<supplier @childevent="getChildevent" @getData="getData" :selectName="selectName" :canChange="canChange"></supplier>-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到达港口" prop="arrivePortName">
                  <!--<arrive-port @childevent="getChildevent" @getData="getData" :selectName="selectNamePort"-->
                               <!--ref="supplierPage"></arrive-port>-->
                  <el-input v-model="tempAll.arrivePortName" size="mini" disabled></el-input>

                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="预计付税日" prop="expectPayRateDate">
                  <el-date-picker v-model="tempAll.expectPayRateDate" type="date" size="mini"disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="免箱期限" prop="freeDay">
                  <el-input v-model.munber="tempAll.freeDay" size="mini" type="number"disabled></el-input>
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
                <!--TODO 费用供应商 必填没控制-->
                <el-form-item label="费用供应商" prop="costSupplierName">
                  <el-input v-model="tempAll.costSupplierName" size="mini"disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="负责货代" prop="freightForwarder">
                  <el-select v-model="tempAll.freightForwarder" placeholder="请选择" size="mini"disabled>
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
                <el-form-item label="实际到港日" prop="actualArrive">
                  <el-date-picker v-model="tempAll.actualArrive" type="date" size="mini"disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到单寄出日" prop="arriveSendDate">
                  <el-date-picker v-model="tempAll.arriveSendDate" type="date" size="mini"disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="来源单据号" prop="sourceOwNo">
                  <el-input v-model="tempAll.sourceOwNo" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="单据日期" prop="lbDate">
                  <el-date-picker v-model="tempAll.lbDate" type="date" size="mini" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备 注" prop="remark">
                  <el-input v-model="tempAll.remark" size="mini"disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label='币别' prop="remark">
                  <el-input v-model="tempAll.currencyName" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" v-if="tempAll.owType=='72000020'">
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
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="systemInformation.createdTime"
                                  style="width: 100%;" size="mini" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间" prop="updatedTime">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="systemInformation.updatedTime"
                                    style="width: 100%;" size="mini" disabled></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账时间" prop="postDate">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="systemInformation.postDate"
                                    style="width: 100%;" size="mini" disabled></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="btn" style="margin:25px auto">
      <!--<el-button type="warning" size="mini" disabled>创建</el-button>-->
      <!--<el-button type="warning" size="mini" disabled>删除</el-button>-->
    </div>
    <div class="commonTable">
      <common-table
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        v-loading.sync="loading"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'packTypeFilter'">
            <span>{{list[scope.index]['packType'] | packTypeFilter}}</span>
          </div>
        </template>
      </common-table>
    </div>
    <!--<div class="pagination" style="margin-top: 15px">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="10"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="40">-->
      <!--</el-pagination>-->
    <!--</div>-->
  </div>
</template>
<script type="text/javascript">
  import moment from 'moment';//时间
  //接口引用
  import {
    doQueryCodOw,
  } from '@/api/purchase/tracking-manage/tracking-manage'

  import {pickerOptions} from '@/util'

  const headers = [
    {type: 'selection', width: '55px', fixed: "left"},
    {prop: 'owDtlRowNo', type: 'index', label: '行号', required: true, width: "55px",align: 'center'},
    {prop: 'cabinetNo', label: '柜号',align: 'center'},
    {prop: 'poContractNo', label: '采购合同号', width: '160px',align: 'center'},
    {prop: 'poNo', label: '采购合同单据号', width: '180px',required: true,align: 'center'},
    {prop: 'goodsCode', label: '物料编号', width: '140px', align: 'center'},
    {prop: 'goodsName', label: '物料名称', width: '160px', align: 'center'},
    {prop: 'packType', label: '包装方式', width: '120px', filter: 'packTypeFilter',align: 'center'},
    {prop: 'grossWeight', label: '毛重/kg', width: '120px', required: true,align: 'center'},
    {prop: 'netWeight', label: '净重/kg', width: '120px',required: true,align: 'center'},
    {prop: 'pubWeight', label: '公重/kg', width: '120px', align: 'center', required: true},
    {prop: 'orginPriceTex', label: '原币单价', width: '120px',align: 'center',digit: '6'},
    {prop: 'orginAmtTex', label: '原币金额', width: '120px',align: 'center',digit: '2'},
    {prop: 'basePriceTex', label: '本币单价', width: '120px',align: 'center',digit: '6'},
    {prop: 'baseAmtTex', label: '本币金额', width: '120px',align: 'center',digit: '2'},
    {prop: 'qty', label: '件数', width: '120px', editable: true,align: 'center'},
    {prop: 'packageWeight', label: '包重/kg', width: '120px',align: 'center'},
//    {prop: 'seriesNo', label: '批次', width: '120px'},
    {prop: 'supplierBatchNo', label: '供应商批号', width: '120px',align: 'center'},
    {prop: 'productDate', label: '供方生产日期', width: '120px',dataType: 'Date',align: 'center'},
    {prop: 'tariffAmt', label: '关税', width: '120px',align: 'center',digit: '2'},
    {prop: 'texAmt', label: '增值税', width: '120px',align: 'center',digit: '2'},
    {prop: 'otherAmt', label: '其他费用', width: '120px',align: 'center',digit: '2'},
  ];
  const owType = [
    {value: 72000020, label: '到港'},
    {value: 72000030, label: '清关'},
    {value: 72000010, label: '提单'},
  ];
  const freightForwarder = [
    {value: 72200010, label: '物产物流'},
    {value: 72200020, label: '象屿物流'},
    {value: 72200030, label: '中外运'},
    {value: 72200040, label: '邦达'},
    {value: 72200050, label: '长发'},
  ]
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
    data(){
      return {
        owStatus:owStatus,
        packType:packType,
        freightForwarder:freightForwarder,
        owType: owType,
        pickerOptions: {
          shortcuts: pickerOptions
        },
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
        loading:true,
      }
    },
    created(){
//      let dataId = this.$route.query;
      let dataId = this.$store.getters.params.TrackingManage
      let vm = this;
      doQueryCodOw(dataId).then(response => {
          vm.loading=false;
        let dataCodOwVO = response.data.data.codOwVO;
        let dataCodOwDtlVO = response.data.data.codOwDtlVO;
        vm.list = [];
        dataCodOwDtlVO.forEach((o, i) => {
          vm.list.push({
            'owDtlRowNo':o.owDtlRowNo,
            'cabinetNo': o.cabinetNo,
            'poNo': o.poNo,
            'goodsCode': o.goodsCode,
            'goodsName': o.goodsName,
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
            'packType':o.packType,
            'poContractNo':o.poContractNo,
            'tariffAmt':o.tariffAmt,
            'texAmt':o.texAmt,
            'otherAmt':o.otherAmt,
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
          owNo: dataCodOwVO.owNo,
          billNo: dataCodOwVO.billNo,
          expectPayRateDate: dataCodOwVO.expectPayRateDate,
          owType: dataCodOwVO.owType,
          invoiceNo: dataCodOwVO.invoiceNo,
          createdTime: dataCodOwVO.createdTime,
          createdBy: dataCodOwVO.createdBy,
          updatedTime: dataCodOwVO.updatedTime,
          postPersonName: dataCodOwVO.postPersonName,
          freightForwarder: dataCodOwVO.freightForwarder,
          bizOrgName: dataCodOwVO.bizOrgName,
          freeDay: dataCodOwVO.freeDay+'',
          remark: dataCodOwVO.remark,
          owStatus: dataCodOwVO.owStatus,
          currencyName: dataCodOwVO.currencyName,//币种
//          rateCurrency: dataCodOwVO.rateCurrency,//汇率

          arrivePortName:dataCodOwVO.arrivePortName,
          lbDate: dataCodOwVO.lbDate,
          costSupplierName:dataCodOwVO.costSupplierName,
          sourceOwId:dataCodOwVO.sourceOwId,
          sourceOwNo:dataCodOwVO.owNo,
          actualArrive:dataCodOwVO.actualArrive,
          arriveSendDate:dataCodOwVO.arriveSendDate,
        };
        //系统信息
        vm.systemInformation = {
          createdBy: dataCodOwVO.createdBy,
          createdTime: dataCodOwVO.createdTime,
          postPersonName: dataCodOwVO.postPersonName,
          postDate: dataCodOwVO.postDate,
          updatedBy: dataCodOwVO.updatedBy,
          updatedTime: dataCodOwVO.updatedTime
        };
      });
    },
    filters: {
      packTypeFilter(val) {
          if(val){
            val.toString();
          }
        return ENUMS['7135'][val];
      }
    },
    computed: {
      actualArriveDay(){
        let date;
        date=moment(this.tempAll.actualArrive).add(this.tempAll.freeDay,'days').format('YYYY-MM-DD');
        return date
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
      allOrginAmtTex(){
        let [vm,orginAmtTex]=[this,0];
        vm.list.forEach((o, i) => {
          if(!o.orginAmtTex){o.orginAmtTex=0}
          orginAmtTex += Number(o.orginAmtTex)
        })
        return orginAmtTex.toFixed(2);
      },
      allBaseAmtTex(){
          let [vm,baseAmtTex]=[this,0];
        vm.list.forEach((o, i) => {
          if(!o.baseAmtTex){o.baseAmtTex=0}
          baseAmtTex += Number(o.baseAmtTex)
        })
        return baseAmtTex.toFixed(2);
      },
    },
    methods: {
      toSave(text){
        if (text == 'yes') {//保存
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'index'
            }
          });
        } else {//取消
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'index'
            }
          });
        }
      },
      //表格点击
      handleCellClick(){

      },
      handleSelectionChange(val){
        this.deleteCellData = val;
//        console.log(this.deleteCellData, "<=删除数据")
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
    },
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
