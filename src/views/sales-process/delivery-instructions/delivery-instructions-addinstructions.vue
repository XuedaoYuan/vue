<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px" class="btn">
        <el-button type="primary" size="small" @click="SaveClick">保 存</el-button>
        <el-button type="info" size="small" @click="CancelClick">取 消</el-button>
        <el-button type="primary" size="small" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
        <el-button type="primary" size="small" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="headerDataForm" label-width="90px" :model="formData" :rules="rules">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="系统单据号" prop="dinNo">
                  <el-input v-model="dinNo" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <management-subject disabled @childevent = "childEventHandlerMainInfo" :querySelect="formData.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-subject disabled @childevent = "bizOrgNameFill" :querySelect="formData.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据状态" prop="dinStatus">
                  <el-select v-model="formData.dinStatus" size="mini" placeholder="请选择" clearable disabled>
                    <el-option v-for="(val, key) in dinStatus" :key="key" :label="val" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="客户" prop="customerName">
                  <customer-select disabled @childevent="childEventHandlerCustomerHeader" :querySelect="formData.customerName"></customer-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员" prop="buyerName">
                  <staff-select disabled @childevent="childEventHandlerStaff" :querySelect="formData.buyerName"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据日期" prop="createdTime">
                  <el-date-picker v-model="createdTime" disabled type="date" size='mini' placeholder=""></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="销售类型" prop="deliveryType">
                  <el-select v-model="formData.deliveryType" size="mini" placeholder="请选择" disabled clearable>
                    <el-option v-for="(val, key) in deliveryType" :key="key" :label="val" :value="key">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="币别" prop="currencyName">
                  <currency-select disabled :querySelect="formData.currencyName"></currency-select>
                </el-form-item>
              </el-col>
               <el-col :span="6">
                <el-form-item label="汇率" prop="rateCurrency">
                  <el-input v-model="formData.rateCurrency" v-number-only:10.abs="6" size="mini" @input="rateCurrencyIpt"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原币金额(含税)" prop="orginTex">
                  <el-input v-model="orginTex" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
              <!-- class="elColWidth24" -->
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="formData.remark" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div style="margin-bottom:6px;">
      <el-button type="warning" size="mini" icon="el-icon-delete" :disabled="deleteStatus" @click="deleterow" plain>删 除</el-button>
    </div>
    <div class="table">
      <div class="commonTable">
        <common-table
        :data="list"
        :maxHeight="300"
        :fit="true" :rowSelection="false"
        :headers="header1"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
        >
        <template slot-scope="scope">
          <div v-if="scope.text == 'applyDeliveryQty'">
            <el-input v-number-only:10.abs="2" v-model.number="list[scope.index]['applyDeliveryQty']" @input="orginAmtTexIpt(list[scope.index])" size='mini'></el-input>
          </div>
        </template>
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'packType'">
            <span>{{list[scope.index]['packType'] | packType}}</span>
          </div>
        </template>
      </common-table>
    </div>
  </div>
</div>
</template>
<script>
  import {
    doCusSave
  } from 'api/sales-process/delivery-instructions/delivery-instructions.js'

  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //开票方、客户
  import StaffSelect from '@/components/common-select/staff-select.vue' //业务员
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import { ENUMS } from '../../../assets/enums.js'
  import { deliveryPrice } from '@/util'
  import NP from 'number-precision';
  const header1 = [
  { type: 'selection', width: '55px'},
  {prop: 'index', type: 'index', label: '行号', fixed: "left"},
  {prop: 'soContractNo', label: '销售合同号',align: 'center','width':'160px'},
  {prop: 'soNo', label: '销售合同单据号',align: 'center','width':'160px'},
  {prop: 'goodsCode', label: '物料编码',align: 'center'},
  {prop: 'goodsName', label: '物料名称',align: 'center'},
  {prop: 'applyDeliveryQty', label: '申请发货数量',align: 'center','width':'160px',template:'applyDeliveryQty',required: true, digit: '2'},
  {prop: 'packType', label: '包装方式',align: 'center',filter:'packType'},
  {prop: 'dtlQty', label: '合同数',align: 'center'},
  {prop: 'deliveryDateStart', label: '交货开始日期',align: 'center','width':'160px',dataType: 'Date'},
  {prop: 'deliveryDateEnd', label: '交货截止日期',align: 'center','width':'160px',dataType: 'Date'},
  {prop: 'supplierBatchNo', label: '供应商批号',align: 'center','width':'120px'},
  {prop: 'orginPriceTex', label: '原币单价（含税）',align: 'center','width':'120px', digit: '6'},
  {prop: 'orginAmtTex', label: '原币金额（含税）',align: 'center','width':'120px', digit: '2'},
  {prop: 'contactsAddress', label: '收货地址',align: 'center'},
  {prop: 'contacts', label: '联系人',align: 'center'},
  {prop: 'contactsPhone', label: '联系电话',align: 'center'},
  {prop: 'dtlRemark', label: '备注',align: 'center',editable: true},
  ];
  export default {
    components: {
      ManagementSubject,DepartmentSubject,CustomerSelect,StaffSelect,CurrencySelect
    },
    props:{
      select:'',
      addTempAll:'',
      soType:'',
    },
    data(){
      return {
        dinStatus: ENUMS["7050"],//发货指令状态
        deliveryType: ENUMS["7270"],//发货类型
        packType: ENUMS["7135"],//包装方式
        formData: {
          orginTex:0,//原币金额合计(含税)
          orginAmt:0,//原币金额合计(不含税)
          baseAmtTex:0,//本币金额合计(含税)
          baseAmt:0,//本币金额合计(不含税)
          orginTexAmt:0,//原币税额合计
          baseTexAmt:0,//本币税额合计
        },
        orginTex:0,
        createdTime:new Date(),
        dinNo:'',
        rules:{
          manageSubName:[//经营主体
          {required: true, message: ' ', trigger: 'change'}
          ],
          bizOrgName:[//部门
          {required: true, message: ' ', trigger: 'change'}
          ],
          buyerName:[//采购员
          {required: true, message: ' ', trigger: 'change'}
          ],
          customerName:[//客户
          {required: true, message: ' ', trigger: 'change'}
          ],
          deliveryType:[//发货类型
          {required: true, message: ' ', trigger: 'change'}
          ],
          currencyName:[//币别
              {required: true, message: ' ', trigger: 'change'}
          ],
          rateCurrency:[//汇率
              {required: true, message: ' ', trigger: 'change'}
          ],
        },
        searchBarFlg: true,
        header1: header1,
        list: [],
        value4: '',
        selectchange:'',
        deleteStatus:true,
      }
    },
    filters:{
      packType(val) {
        return ENUMS["7135"][val];
      },
      pointAfter: function(val, num) {
          if (!val) {
              return '';
          }
          if (typeof val == 'number') {
              return val.toFixed(num) + '';
          } else {
              return parseFloat(val).toFixed(num) + '';
          }
      },
    },
    created(){
      this.getDetail();
    },
    methods:{
      getDetail(){
        var details = this.$store.getters.params.DeliveryInstructions.select;
        this.list = details;
        this.formData = this.$store.getters.params.DeliveryInstructions.addTempAll;
        this.formData.dinStatus = '70500010';//单据状态
        this.formData.remark = '';//备注
        this.formData.deliveryType = this.$store.getters.params.DeliveryInstructions.soType;//销售状态

        for(var i=0;i<this.list.length;i++){
          var iIndex = this.list[i];
          this.calculateOrderDatail(iIndex);
        }
        this.formData.orginTex = 0;//原币金额合计(含税)
        this.formData.orginAmt = 0;//原币金额合计(不含税)
        this.formData.baseAmtTex = 0;//本币金额合计(含税)
        this.formData.baseAmt = 0;//本币金额合计(不含税)
        this.formData.orginTexAmt = 0;//原币税额合计
        this.formData.baseTexAmt = 0;//本币税额合计
        for(var i=0;i<this.list.length;i++){
          var iIndex = this.list[i];
          this.commonPriceTax(iIndex);
        }
        this.orginTex = this.formData.orginTex.toFixed(2);
        delete this.formData.goodsName;
        delete this.formData.postPersonName;
        // console.log(this.list);
      },
      calculateOrderDatail(row){//明细金额计算
          var caculatePrice = deliveryPrice({
            "priceTex":row.orginPriceTex,
            "applyDeliveryQty":row.applyDeliveryQty,
            "texRate":row.texRate,
            "rateCurrency":this.formData.rateCurrency,
          })
          row.baseAmt = caculatePrice.baseAmt;
          row.baseAmtTex = caculatePrice.baseAmtTex;
          row.basePrice = caculatePrice.basePrice;
          row.basePriceTex = caculatePrice.basePriceTex;
          row.baseTexAmt = caculatePrice.baseTexAmt;
          row.orginAmt = caculatePrice.orginAmt;
          row.orginAmtTex = caculatePrice.orginAmtTex;
          row.orginPrice = caculatePrice.orginPrice;
          row.orginTexAmt = caculatePrice.orginTexAmt;
      },
      // 头部金额总数计算
      commonPriceTax(iIndex){
        if(!isNaN(Number(iIndex.orginAmtTex))){//原币金额合计(含税)
            this.formData.orginTex += Number(iIndex.orginAmtTex);
          }
          if(!isNaN(Number(iIndex.orginAmt))){//原币金额合计(不含税)
            this.formData.orginAmt += Number(iIndex.orginAmt);
          }
          if(!isNaN(Number(iIndex.baseAmtTex))){//本币金额合计(含税)
            this.formData.baseAmtTex += Number(iIndex.baseAmtTex);
          }
          if(!isNaN(Number(iIndex.baseAmt))){//本币金额合计(不含税)
            this.formData.baseAmt += Number(iIndex.baseAmt);
          }
          if(!isNaN(Number(iIndex.orginTexAmt))){//原币税额合计
            this.formData.orginTexAmt += Number(iIndex.orginTexAmt);
          }
          if(!isNaN(Number(iIndex.baseTexAmt))){//本币税额合计
            this.formData.baseTexAmt += Number(iIndex.baseTexAmt);
          }

      },

      SaveClick(){ //保存
        if(this.list.length==0){
          this.$message({
            message: '请至少添加一条明细再进行操作',
            type: 'warning'
          });
          return;
        }
        console.log(this.formData,'toutou');
        console.log(this.list);
        var passInfo = [];
        this.$refs['headerDataForm'].validate((valid) => {
          if(valid){
            eventBus.$emit('validateTable', {
              data: this.list,    //表示表格数据
              headers: this.header1,   //表示表头数据
              success: (valid)=>{   //成功回掉
                if (valid) {
                  this.$confirm('您确认要新增吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }).then(() => {
                    this.list.forEach((o,i)=> {
                      passInfo.push({
                        applyDeliveryQty:o.applyDeliveryQty,
                        dinDtlId:o.dinDtlId,
                        dinId:o.dinId,
                        dinNo:o.dinNo,
                        soId:o.soId,
                        soNo:o.soNo,
                        soDtlId:o.soDtlId,
                        soContractNo:o.soContractNo,
                        goodsId:o.goodsId,
                        goodsCode:o.goodsCode,
                        goodsName:o.goodsName,
                        contractQty:o.contractQty,
                        deliveryStartDate:o.deliveryDateStart,
                        deliveryEndDate:o.deliveryDateEnd,
                        supBatchNo:o.supplierBatchNo,
                        packType:o.packType,
                        contactsAddress:o.contactsAddress,
                        contacts:o.contacts,
                        contactsPhone:o.contactsPhone,
                        baseAmt:o.baseAmt,
                        baseAmtTex:o.baseAmtTex,
                        basePrice:o.basePrice,
                        basePriceTex:o.basePriceTex,
                        orginAmt:o.orginAmt,
                        orginAmtTex:o.orginAmtTex,
                        orginPrice:o.orginPrice,
                        orginPriceTex:o.orginPriceTex,
                        orginTexAmt:o.orginTexAmt,
                        texRate:o.texRate,
                        unitId:o.unitId,
                        unitName:o.unitName,
                        unitCode:o.unitCode,
                        remark:o.dtlRemark,
                      })
                    })
                    delete this.formData.soType;
                    this.formData.orginTex = this.formData.orginTex.toFixed(2);//原币金额合计(含税)
                    this.formData.orginAmt = this.formData.orginAmt.toFixed(2);//原币金额合计(不含税)
                    this.formData.baseAmtTex = this.formData.baseAmtTex.toFixed(2);//本币金额合计(含税)
                    this.formData.baseAmt = this.formData.baseAmt.toFixed(2);//本币金额合计(不含税)
                    this.formData.orginTexAmt = this.formData.orginTexAmt.toFixed(2);//原币税额合计
                    this.formData.baseTexAmt = this.formData.baseTexAmt.toFixed(2);//本币税额合计

                    // console.log(this.formData,'formData');
                    // console.log(passInfo,'list');
                    doCusSave(this.formData,passInfo).then(response =>{
                      if(response.data.status == 1){
                        this.$notify({
                          title: '成功',
                          message: '新增成功！',
                          type: 'success'
                        });
                        this.CancelClick1();
                      }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消操作'
                    });
                  });

                }
              }
            })
          }
        })


      },
      //取消1
      CancelClick(){
        this.formData = {
          manageSubName: "",//经营主体
          manageSubCode:"",
          manageSubId:'',
          bizOrgName: '',//部门
          bizOrgCode:'',
          bizOrgId:'',
          dinStatus:'',//单据状态
          customerId:'',//客户
          customerName:'',
          customerCode:'',
          buyerCode:'',//采购员
          buyerId:"",
          buyerName:'',
          remark:''//备注
        }
        this.list = [];
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'add'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
    //取消2
      CancelClick1(){
        this.formData = {
          manageSubName: "",//经营主体
          manageSubCode:"",
          manageSubId:'',
          bizOrgName: '',//部门
          bizOrgCode:'',
          bizOrgId:'',
          dinStatus:'',//单据状态
          customerId:'',//客户
          customerName:'',
          customerCode:'',
          buyerCode:'',//采购员
          buyerId:"",
          buyerName:'',
          remark:''//备注
        }
        this.list = [];
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      rateCurrencyIpt(){//汇率计算
        setTimeout(() => {
        // console.log(this.formData.rateCurrency);
          for(var i=0;i<this.list.length;i++){
            var iIndex = this.list[i];
            this.calculateOrderDatail(iIndex);
          }
          this.formData.orginTex = 0;//原币金额合计(含税)
          this.formData.orginAmt = 0;//原币金额合计(不含税)
          this.formData.baseAmtTex = 0;//本币金额合计(含税)
          this.formData.baseAmt = 0;//本币金额合计(不含税)
          this.formData.orginTexAmt = 0;//原币税额合计
          this.formData.baseTexAmt = 0;//本币税额合计
          for(var i=0;i<this.list.length;i++){
            var iIndex = this.list[i];
            this.commonPriceTax(iIndex);
          }
          this.orginTex = this.formData.orginTex.toFixed(2);
        }, 10);
      },
      // 原币金额计算
      orginAmtTexIpt(row){
        row.orginAmtTex = toDecimal2(row.applyDeliveryQty)*row.priceTex;
        setTimeout(() => {
          this.calculateOrderDatail(row);
          this.formData.orginTex = 0;//原币金额合计(含税)
          this.formData.orginAmt = 0;//原币金额合计(不含税)
          this.formData.baseAmtTex = 0;//本币金额合计(含税)
          this.formData.baseAmt = 0;//本币金额合计(不含税)
          this.formData.orginTexAmt = 0;//原币税额合计
          this.formData.baseTexAmt = 0;//本币税额合计
          for(var i=0;i<this.list.length;i++){
            var iIndex = this.list[i];
            this.commonPriceTax(iIndex);
          }
          this.orginTex = this.formData.orginTex.toFixed(2);
        }, 6);
      },
      childEventHandlerMainInfo(val) {//经营主体
        if(val){
          this.formData.manageSubName = val.companyName;
          this.formData.manageSubCode = val.companyCode;
          this.formData.manageSubId = val.companyId;
        }else {
          this.formData.manageSubName = '';
          this.formData.manageSubCode = '';
          this.formData.manageSubId = '';
        }
        this.$refs['headerDataForm'].validateField('manageSubName');
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.formData.bizOrgName = val.orgName;
          this.formData.bizOrgCode = val.orgCode;
          this.formData.bizOrgId = val.orgId;
        }else {
          this.formData.bizOrgName = '';
          this.formData.bizOrgCode = '';
          this.formData.bizOrgId = '';
        }
        this.$refs['headerDataForm'].validateField('bizOrgName');
      },
      childEventHandlerStaff(val){//业务员
        if(val){
          this.formData.buyerName = val.userName;
          this.formData.buyerId = val.userId;
          this.formData.buyerCode = val.userCode;
        }else {
          this.formData.buyerName = '';
          this.formData.buyerId = '';
          this.formData.buyerCode = '';
        }
        this.$refs['headerDataForm'].validateField('buyerName');
      },
      childEventHandlerCustomerHeader(val){//客户
        if(val){
          this.formData.customerName = val.custName;
          this.formData.customerCode = val.custCode;
          this.formData.customerId = val.id;
        }else {
          this.formData.customerId = '';
          this.formData.customerCode = '';
          this.formData.customerName = '';
        }
        this.$refs['headerDataForm'].validateField('customerName');
      },
      //选择信息
      handleCellClick(){

      },
      handleSelectionChange(val){
        var vm = this;
        vm.selectchange = val;
        if(val.length>0){
          this.deleteStatus = false;
        }else {
          this.deleteStatus = true;
        }
      },
      deleterow(){
        this.$confirm('您确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
          for (var i = 0; i < this.list.length; i++) {
            let v = this.list[i];
            for (var j = 0; j < this.selectchange.length; j++) {
              if (this.selectchange[j].$index == v.$index) {
                this.list.splice(i, 1);
                i--;
              }
            }
          }
          for(var i=0;i<this.list.length;i++){
            var iIndex = this.list[i];
            this.calculateOrderDatail(iIndex);
          }

          this.formData.orginTex = 0;//原币金额合计(含税)
          this.formData.orginAmt = 0;//原币金额合计(不含税)
          this.formData.baseAmtTex = 0;//本币金额合计(含税)
          this.formData.baseAmt = 0;//本币金额合计(不含税)
          this.formData.orginTexAmt = 0;//原币税额合计
          this.formData.baseTexAmt = 0;//本币税额合计
          for(var i=0;i<this.list.length;i++){
            var iIndex = this.list[i];
            this.commonPriceTax(iIndex);
          }
          this.orginTex = this.formData.orginTex.toFixed(2);
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
      },

    }
  }



       //制保留2位小数，如：2，会在2后面补上00.即2.00
    function toDecimal2(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x*100)/100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
</script>

<style>

</style>
