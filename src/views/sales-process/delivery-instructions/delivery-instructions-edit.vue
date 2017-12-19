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
                  <el-input v-model="formData.dinNo" size="mini" disabled></el-input>
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
                  <el-date-picker v-model="formData.createdTime" disabled type="date" size='mini' placeholder=""></el-date-picker>
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
                  <el-input v-model="formData.rateCurrency" v-number-only:10.abs="6" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="原币金额(含税)" prop="orginTex">
                  <el-input v-model="orginTex" size="mini" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注" prop="remark" class="elColWidth24">
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
        :data="list" :rowSelection="false"
        :maxHeight="300"
        :fit="true"
        :headers="header1"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
        >
        <template slot-scope="scope">
          <div v-if="scope.text == 'applyDeliveryQty'">
            <el-input v-number-only:10.abs="2"  v-model.number="list[scope.index]['applyDeliveryQty']" @input="orginAmtTexIpt(list[scope.index])" size='mini'></el-input>
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
    doCusUpdate,
    doQueryCusAll
  } from 'api/sales-process/delivery-instructions/delivery-instructions.js'

  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //开票方、客户
  import StaffSelect from '@/components/common-select/staff-select.vue' //业务员
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import { ENUMS } from '../../../assets/enums.js'
  import { deliveryPrice } from '@/util'
  const header1 = [
    { type: 'selection', width: '55px'},
    {prop: 'index', type: 'index', label: '行号', fixed: "left"},
    {prop: 'soContractNo', label: '销售合同号',align: 'center','width':'160px'},
    {prop: 'soNo', label: '销售合同单据号',align: 'center','width':'160px'},
    {prop: 'goodsCode', label: '物料编码',align: 'center'},
    {prop: 'goodsName', label: '物料名称',align: 'center'},
    {prop: 'applyDeliveryQty', label: '申请发货数量',align: 'center','width':'160px',template:'applyDeliveryQty',required: true,digit:'2'},
    {prop: 'packType', label: '包装方式',align: 'center',filter:'packType'},
    {prop: 'dtlQty', label: '合同数',align: 'center'},
    {prop: 'deliveryStartDate', label: '交货开始日期',align: 'center','width':'160px',dataType: 'Date'},
    {prop: 'deliveryEndDate', label: '交货截止日期',align: 'center','width':'160px',dataType: 'Date'},
    {prop: 'supBatchNo', label: '供应商批号',align: 'center','width':'120px'},
    {prop: 'orginPriceTex', label: '原币单价（含税）',align: 'center','width':'120px', digit: '6'},
    {prop: 'orginAmtTex', label: '原币金额（含税）',align: 'center','width':'120px', digit: '2'},
    {prop: 'contactsAddress', label: '收货地址',align: 'center'},
    {prop: 'contacts', label: '联系人',align: 'center'},
    {prop: 'contactsPhone', label: '联系电话',align: 'center'},
    {prop: 'remark', label: '备注',align: 'center',editable: true},
  ];

  export default {
    components: {
      ManagementSubject,DepartmentSubject,CustomerSelect,StaffSelect,CurrencySelect
    },
    props:{
      updateId:'',
    },
    data(){
      return {
        dinStatus: ENUMS["7050"],//发货指令状态
        deliveryType: ENUMS["7270"],//发货类型
        formData: {},
        orginTex:null,
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
        },

        packType: ENUMS["7135"],//包装方式
        searchBarFlg: true,
        header1: header1,
        list: [],
        value4: '',
        selectchange:'',
        deleteStatus:true,
        deleteId:[],//删除的id组
      }
    },
    filters:{
      packType(val) {
        return ENUMS["7135"][val];
      },
    },
    created(){
      this.getList();
    },
    methods:{
      getList(){
        var id = this.$store.getters.params.DeliveryInstructions.updateId;
        if(id){
          this.deleteId = [];
          this.list = [];
          doQueryCusAll(id).then(response=> {
            if(response.data.status ==1){
              var tempInfo = response.data.data.codDinVO;
              var lists = response.data.data.codDinDtlVO;
              this.formData = {
                bizOrgCode:tempInfo.bizOrgCode,
                bizOrgId:tempInfo.bizOrgId,
                bizOrgName:tempInfo.bizOrgName,
                buyerCode:tempInfo.buyerCode,
                buyerId:tempInfo.buyerId,
                buyerName:tempInfo.buyerName,
                currencyName:tempInfo.currencyName,
                currencyId:tempInfo.currencyId,
                currencyCode:tempInfo.currencyCode,
                createdBy:tempInfo.createdBy,
                createdTime:tempInfo.createdTime,
                customerCode:tempInfo.customerCode,
                customerId:tempInfo.customerId,
                customerName:tempInfo.customerName,
                deliveryType:tempInfo.deliveryType.toString(),
                dinId:tempInfo.dinId,
                dinNo:tempInfo.dinNo,
                dinStatus:tempInfo.dinStatus.toString(),
                isInactive:tempInfo.isInactive,
                manageSubCode:tempInfo.manageSubCode,
                manageSubId:tempInfo.manageSubId,
                manageSubName:tempInfo.manageSubName,
                remark:tempInfo.remark,
                version:tempInfo.version,
                baseAmt:tempInfo.baseAmt,
                baseAmtTex:tempInfo.baseAmtTex,
                baseTexAmt:tempInfo.baseTexAmt,
                orginAmt:tempInfo.orginAmt,
                orginTex:tempInfo.orginTex.toFixed(2),
                orginTexAmt:tempInfo.orginTexAmt,
                rateCurrency:tempInfo.rateCurrency.toFixed(8),
              }

              lists.forEach((o,i)=> {
                this.list.push({
                  applyDeliveryQty:o.applyDeliveryQty,
                  dinDtlId:o.dinDtlId,
                  dinId:o.dinId,
                  dinNo:o.dinNo,
                  soId:o.soId,
                  soNo:o.soNo,
                  soContractNo:o.soContractNo,
                  goodsId:o.goodsId,
                  goodsCode:o.goodsCode,
                  goodsName:o.goodsName,
                  contractQty:o.contractQty,
                  isInactive:o.isInactive,
                  deliveryStartDate:o.deliveryStartDate,
                  deliveryEndDate:o.deliveryEndDate,
                  supBatchNo:o.supBatchNo,
                  version:o.version,
                  packType:o.packType.toString(),
                  contactsAddress:o.contactsAddress,
                  contacts:o.contacts,
                  contactsPhone:o.contactsPhone,
                  remark:o.remark,
                  // ------------------------
                  baseAmt:o.baseAmt,
                  baseAmtTex:o.baseAmtTex,
                  basePrice:o.basePrice,
                  basePriceTex:o.basePriceTex,
                  orginAmt:o.orginAmt,
                  orginAmtTex:o.orginAmtTex,
                  orginPrice:o.orginPrice,
                  orginPriceTex:o.orginPriceTex,
                  orginTexAmt:o.orginTexAmt,
                  unitId:o.unitId,
                  unitName:o.unitName,
                  unitCode:o.unitCode,
                  texRate:o.texRate,
                })
              })
              // console.log(this.list);
              this.orginTex = this.formData.orginTex;
            }else {

            }
          })
        }
      },
      //保存
      SaveClick(){
        if(this.list.length==0){
          this.$message({
            message: '请至少添加一条明细再进行操作',
            type: 'warning'
          });
          return;
        }
        console.log(this.list,',this.list');
        this.$refs['headerDataForm'].validate((valid) => {
          if(valid){
            eventBus.$emit('validateTable', {
              data: this.list,    //表示表格数据
              headers: this.header1,   //表示表头数据
              success: (valid)=>{   //成功回掉
                if (valid) {
                  this.$confirm('您确认要修改吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }).then(() => {
                    this.list.map((x)=>{
                        delete x.$index;
                        delete x.baseTexAmt;
                    });
                    doCusUpdate(this.formData,this.list,this.deleteId).then(response=>{
                      if(response.data.status == 1){
                        this.$notify({
                          title: '成功',
                          message: '修改成功！',
                          type: 'success'
                        });
                        this.CancelClick();
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
      //取消
      CancelClick(){
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
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
          // console.log(row);
      },
      // 原币金额计算
      orginAmtTexIpt(row){
        setTimeout(()=>{
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
        },10)
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
          this.headerData.customerName = val.custName;
          this.headerData.customerCode = val.custCode;
          this.headerData.customerId = val.id;
        }else {
          this.headerData.customerId = '';
          this.headerData.customerCode = '';
          this.headerData.customerName = '';
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
                  if(this.selectchange[j].dinDtlId){
                      this.deleteId.push(
                        this.selectchange[j].dinDtlId
                      )
                    }
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
</script>
