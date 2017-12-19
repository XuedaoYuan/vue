<template>
  <div class="allTemplate">
    <div>
      <el-button @click="toCancel" type="info" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="headerData" class="tabpane">
            <el-form ref="headerForm" label-width="80px" :model="formData" >
              <el-row>
                <el-col :span="6">
                  <el-form-item label="出库单号" prop="soOsNo">
                    <el-col>
                      <el-input v-model="formData.soOsNo" size="mini" :disabled="true"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="销售类型" prop="soType">
                    <el-col>
                      <el-select v-model="formData.soType" placeholder="请选择" size="mini" clearable disabled>
                        <el-option v-for="(value,key) in soType" :key="key" :label="value" :value="key"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="确认出库" prop="isOutstock">
                    <el-col :span="24">
                      <el-select v-model="formData.isOutstock" placeholder="请选择" clearable size="mini" disabled>
                        <el-option key="1" label="是" value="1"></el-option>
                        <el-option key="0" label="否" value="0"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="仓库" prop="warehouseName">
                    <el-col :span="24">
                      <el-input v-model="formData.warehouseName" size="mini" :disabled="true"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <el-input v-model="formData.manageSubName" size="mini" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" prop="bizOrgName">
                    <el-input v-model="formData.bizOrgName" size="mini" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="业务员" prop="buyerName">
                    <el-input v-model="formData.buyerName" size="mini" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="出库总金额" prop="outstockAmt">
                    <el-input v-model="formData.outstockAmt"  @blur="outstockAmtDigit" size="mini"  disabled ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="客户" prop="customerName">
                    <el-input v-model="formData.customerName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据状态" prop="osStatus">
                    <el-select v-model="formData.osStatus" placeholder="请选择" size="mini" clearable disabled>
                      <el-option v-for="(value,key) in osStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="签收人" prop="signer">
                    <el-input v-model="formData.signer" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="出库日期" prop="outstockDate">
                    <el-date-picker size="mini" v-model="outstockDate" type="date" placeholder="选择日期" disabled></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="币别" prop="currencyName">
                    <el-input v-model="formData.currencyName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="汇率" prop="rateCurrency">
                    <el-input :value="formData.rateCurrency | EightDecimal" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="OA审核标题" prop="auitTitle">
                    <el-input v-model="formData.auitTitle" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="签收日期" prop="signDate">
                    <el-date-picker size="mini" v-model="signDate" type="date" placeholder="选择日期" disabled></el-date-picker>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="" prop="isConfirm" >
                    <el-checkbox v-model="isConfirm" disabled >客户确认</el-checkbox></el-form-item>
                </el-col>

                <el-col :span="18">
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:12px">

              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="物流信息" name="second" class="tabpane">
            <el-form ref="form" label-width="80px" :model="formData">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="送货地点" prop="deliveryAddress">
                    <el-input v-model="formData.deliveryAddress" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="物流公司" prop="logisticsCompany">
                    <el-input v-model="formData.logisticsCompany" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="运费" prop="freight">
                    <el-input v-model="formData.freight" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="送货车牌号" prop="carNo">
                    <el-input v-model="formData.carNo" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="司机姓名" prop="driverName">
                    <el-input v-model="formData.driverName" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机手机" prop="driverPhone">
                    <el-input v-model="formData.driverPhone" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机身份证" prop="driverIdCard">
                    <el-input v-model="formData.driverIdCard" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="生产日期" prop="manufactureDate">
                    <el-date-picker size="mini" v-model="manufactureDate" type="date" placeholder="选择日期" disabled></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:12px">
                <el-col :span="6">
                  <el-form-item label="送货方式" prop="deliveryType">
                    <el-select v-model="formData.deliveryType" placeholder="请选择" size="mini" clearable disabled>
                      <el-option v-for="(value,key) in deliveryType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系人" prop="contacts">
                    <el-input v-model="formData.contacts" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系电话" prop="contactsPhone">
                    <el-input v-model="formData.contactsPhone" size="mini" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="凭证信息" name="third" class="tabpane">
            <el-form ref="form" label-width="100px" :model="formData" style="margin-bottom:24px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="出库凭证标识" prop="credenIden">
                    <el-select v-model="formData.credenIden" placeholder="请选择" size="mini" clearable disabled>
                      <el-option v-for="(value,key) in credenIden" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="出库凭证编号" prop="credenNo">
                    <el-input v-model="formData.credenNo" size="mini" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-bottom:34px">
                <el-col :span="12">
                  <el-form-item label="推送失败的原因" prop="failReason">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formData.failReason" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="fourth" class="tabpane">
            <el-form ref="form" label-width="80px" :model="formData" style="padding-top: 16px;">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-col :span="18">
                      <el-input v-model="formData.createdBy" size="mini" :disabled="true"></el-input></el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改人" prop="updatedBy">
                    <el-col :span="18">
                      <el-input v-model="formData.updatedBy" size="mini" :disabled="true"></el-input></el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="postPersonName">
                    <el-col :span="18">
                      <el-input v-model="formData.postPersonName" size="mini" :disabled="true"></el-input></el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" >
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-col :span="18">
                      <el-date-picker v-model="formData.createdTime" type="datetime" size="mini" :disabled="true"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-col :span="18">
                      <el-date-picker v-model="formData.updatedTime" type="datetime" size="mini" :disabled="true"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="name">
                    <el-col :span="18">
                      <el-date-picker v-model="formData.postDate" type="datetime" size="mini" :disabled="true"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-collapse-transition>

    <div class="table">
      <common-table
        :data="tableData"
        :maxHeight="300"
        style="margin-top: 12px;"
        :fit="true" ref="multipleTable"
        :headers="headers"
        @selection-change="handleSelectionChange"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'packType'">
            <span>{{tableData[scope.index]['packType'] | packTypeFilter}}</span>
          </div>
          <div v-if="scope.text == 'productDate'">
            <span>{{tableData[scope.index]['productDate'] | producedDateFilter}}</span>
          </div>
        </template>
        <template slot-scope="scope" slot="default">
          <div v-if="scope.text == 'productDate'">
            <el-date-picker size="mini" v-model="tableData[scope.index]['productDate']" type="date"  :editable="false" placeholder="选择日期"  ref="datePicker">
            </el-date-picker>
          </div>
        </template>
      </common-table>
    </div>

  </div>
</template>
<script>
  import {pickerOptions} from '@/util'
  import router from '@/router';
  import NP from 'number-precision';
  import {doUpdateSoOs,doQuerySoOsWithDtl } from 'api/sales-process/sales-outwarehouse/sales-outwarehouse.js';

  const headers = [
    { type: 'selection', width: '55px',fixed:'left'},
    { prop: 'osDtlRowNo', label: '行号', width: '60px',align:'center' },
    { prop: 'soNo', label: '销售合同单据号', width: '120px',align:'center' },
    { prop: 'dinNo', label: '发货指令单据号', width: '120px',align:'center' },
    { prop: 'goodsCode', label: '物料编号', width: '120px',align:'center'},
    { prop: 'goodsName', label: '物料名称', width: '120px',align:'center', },
    { prop: 'outstockQty', label: '出库数量', width: '120px',align:'center',digit: '2'},
//    { prop: 'soContractNo', label: '销售合同号', width: '120px',align:'center',},
    { prop: 'unitName', label: '单位', width: '120px' ,align:'center',},
    { prop: 'packType', label: '包装方式' , width: '120px',align:'center',filter: 'packType'},
    { prop: 'settleQty', label: '结算数量' , width: '160px',align:'center',digit: '2'},
    { prop: 'settleUnitName', label: '结算单位', width: '120px',align:'center' ,},
    { prop: 'cabinetNo', label: '柜号' , width: '120px',align:'center'},
    { prop: 'seriesNo', label: '批次' , width: '120px',align:'center'},
    { prop: 'supplierBatchNo', label: '供方商批号' , width: '160px',align:'center'},
    { prop: 'productDate', label: '供方生产日期' , width: '160px',align:'center',dataType:'Date'},
    { prop: 'qty', label: '件数' , width: '120px',align:'center',digit: '2'},
    { prop: 'orginPriceTex', label: '含税单价' , width: '120px',align:'center',digit: '6'},
    { prop: 'orginPrice', label: '无税单价' , width: '120px',align:'center',digit: '6'},
    { prop: 'texRate', label: '税率' , width: '120px',align:'center',digit: '8'},
    { prop: 'orginAmtTex', label: '含税金额' , width: '120px',align:'center',digit: '2'},
    { prop: 'orginAmt', label: '税前金额' , width: '120px',align:'center',digit: '2'},
    { prop: 'texAmt', label: '税额' , width: '120px',align:'center',digit: '2'},
    { prop: 'remark', label: '备注' , width: '200px',align:'center'},
  ];
  export default {
    components: {

    },
    props:{
      soOsId:String
    },
    data(){
      return {
        activeName: 'headerData',
        headers: headers,
        tableData: [],
        multipleSelection: [],
        deleteList: [],
        formData:{},
        searchBarFlg: true,
        isConfirm: false,
        soType:ENUMS["7270"], //销售类型
        osStatus:ENUMS["7060"], //单据状态
        credenIden:ENUMS["7240"], //出库凭证标识
        deliveryType:ENUMS["7120"], //送货方式
        outstockDate:'', //出库日期
        signDate:'', //签收日期
        manufactureDate:'', //生产日期
        pickerOptions: {
          shortcuts: pickerOptions
        },
        transferSearchDepartment:{
          companyName:"",
          companyId:"",
          companyCode:"",
          boolToBtn:true
        },
      }
    },
    created(){
      this.tableData = [];
      this.deleteList = [];
      this.activeTabs = 'headerData';
      this.getData();
    },
    filters: {
      packTypeFilter(val) {
        return ENUMS["7135"][val];
      },
      producedDateFilter(val) {
        if(val){
          return val.parseTime ('YYYY-MM-DD');
        }else{
          return '';
        }
      },
      TwoDecimal(val){
        return Number(val).toFixed(2);
      },
      EightDecimal(val){
        return Number(val).toFixed(8);
      },
      SixDecimal(val){
        return Number(val).toFixed(6);
      }
    },
    watch: {
      outstockDate:function (val) {
        if(val){
          this.formData.outstockDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.outstockDate = "";
        }
      },
      signDate:function (val) {
        if(val){
          this.formData.signDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.signDate = "";
        }
      },
      manufactureDate:function (val) {
        if(val){
          this.formData.manufactureDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.manufactureDate = "";
        }
      },
    },
    methods:{
      toCancel(){//取消
        this.$store.dispatch('toggleCurrentView', {
          SalesOutwarehouse: {
            view: 'index',
          }
        });
      },
      handleCellClick(){

      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      getData(){
        this.listLoading = true;
        doQuerySoOsWithDtl(this.soOsId).then(response => {
          if (response.data.status == 1) {
            let data = response.data.data;
            let form =data.codSoOsVO;
            this.formData = {
              //抬头数据
              soOsNo:form.soOsNo,
              soType:form.soType?form.soType.toString():'',
              isOutstock:form.isOutstock?form.isOutstock.toString():'',
              warehouseName:form.warehouseName,
              warehouseCode:form.warehouseCode,
              warehouseId:form.warehouseId,
              manageSubCode:form.manageSubCode,
              manageSubName:form.manageSubName,
              manageSubId:form.manageSubId,
              bizOrgCode:form.bizOrgCode,
              bizOrgName:form.bizOrgName,
              bizOrgId:form.bizOrgId,
              buyerName:form.buyerName,
              outstockAmt:form.outstockAmt,
              customerId:form.customerId,
              customerName:form.customerName,
              customerCode:form.customerCode,
              osStatus:form.osStatus?form.osStatus.toString():'',
              signer:form.signer,
              outstockDate:form.outstockDate ?form.outstockDate.parseTime('YYYY-MM-DD'):'',
              currencyCode:form.currencyCode,
              currencyName:form.currencyName,
              currencyId:form.currencyId,
              rateCurrency:form.rateCurrency,
              auitTitle:form.auitTitle,
              signDate:form.signDate ?form.signDate.parseTime('YYYY-MM-DD'):'',
              isConfirm:form.isConfirm,
              remark:form.remark,
              //物流信息
              deliveryAddress:form.deliveryAddress, //送货地点
              logisticsCompany:form.logisticsCompany, //物流公司
              freight:form.freight, //运费
              carNo:form.carNo, //送货车牌号
              driverName:form.driverName, //司机姓名
              driverPhone:form.driverPhone, //司机手机
              driverIdCard:form.driverIdCard, //司机身份证
              contacts:form.contacts, //联系人
              contactsPhone:form.contactsPhone, //联系电话
              deliveryType:form.deliveryType?form.deliveryType.toString():'', //送货方式
              manufactureDate:form.manufactureDate ?form.manufactureDate.parseTime('YYYY-MM-DD'):'', //生产日期
              //凭证信息
              credenIden:form.credenIden,
              credenNo:form.credenNo,
              failReason:form.failReason,
              //系统信息
              createdBy:form.createdBy,
              createdTime:form.createdTime ,
              updatedBy:form.updatedBy,
              updatedTime:form.updatedTime ,
              postPersonName:form.postPersonName,
              postDate:form.postDate ,
              version:form.version,
              soOsId:form.soOsId,
            };
            if(this.formData.isConfirm == 1){
              this.isConfirm = false;
            }else if(this.formData.isConfirm == 0){
              this.isConfirm = true;
            }
            this.outstockDate = form.outstockDate;
            this.signDate = form.signDate;
            this.manufactureDate = form.manufactureDate;
            this.tableData=[];
            data.codSoOsDtlVOs.forEach((val,i) => {
              this.tableData.push({
                osDtlId:val.osDtlId,
                osDtlRowNo:val.osDtlRowNo,
                soNo:val.soNo,
                goodsCode:val.goodsCode,
                goodsName:val.goodsName,
                outstockQty:val.outstockQty,
//                soContractNo:val.soContractNo,
                unitId:val.unitId,
                unitName:val.unitName,
                unitCode:val.unitCode,
                packType:val.packType,
                settleQty:val.settleQty,
                settleUnitName:val.settleUnitName,
                cabinetNo:val.cabinetNo,
                seriesNo:val.seriesNo,
                supplierBatchNo:val.supplierBatchNo,
                productDate:val.productDate,
                qty:val.qty,
                orginPriceTex:val.orginPriceTex,
                orginPrice:val.orginPrice,
                texRate:val.texRate,
                orginAmtTex:val.orginAmtTex,
                orginAmt:val.orginAmt,
                texAmt:val.texAmt,
                remark:val.remark,
                dinNo:val.dinNo,
                version:val.version
              });
            });
            this.listLoading = false;
          }
        });
      },
      doReset(){ //重置
        this.tableData = [];
        this.activeTabs = 'headerData';
        this.deleteList = [];
//        this.$refs['headerForm'].resetFields();
      },

      outstockAmtDigit(val){
        this.formData.outstockAmt = Number(this.formData.outstockAmt).toFixed(2);
      },
      handleClick(){},
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tabpane{
    height: 140px;
  }
</style>
