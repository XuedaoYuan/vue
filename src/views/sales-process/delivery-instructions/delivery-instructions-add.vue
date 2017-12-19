<template>
  <div class="allTemplate">
    <div class="info">
      <div style="margin-bottom: 10px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="small" @click="Search">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" icon="el-icon-refresh" style="margin-left:10px" size="small" @click="Reset">重 置</el-button>
        <el-button type="info" size="small" @click="Back">返 回</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="headerDataForm" label-width="80px" :model="tempAll" :rules="rules">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-subject :disabled='ifEditDepartment' :transferSearch="transferSearchDepartment" @childevent = "bizOrgNameFill" :querySelect="tempAll.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户" prop="customerName">
                  <customer-select @childevent="childEventHandlerCustomer" :disabled='ifEditDepartment' :transferSearch="transferSearchDepartment" :querySelect="tempAll.customerName"></customer-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审批人" prop="postPersonName">
                  <staff-select @childevent="childEventHandlerPostPersonName" :querySelect="tempAll.postPersonName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="业务员" prop="buyerName">
                  <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.buyerName"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createdBy">
                  <staff-select @childevent="childEventHandlerCreate" :querySelect="formData.createdBy"></staff-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建时间" prop="createdTime">
                  <el-date-picker v-model="createdTime" :editable="false" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size='mini'></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审批时间" prop="postDate">
                  <el-date-picker v-model="postDate" :editable="false" type="daterange" size='mini' start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="物料名称" prop="goodsName">
                  <goods-select @childevent="childEventHandlerGoods" :querySelect="tempAll.goodsName"></goods-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货类型" prop="soType">
                  <el-select v-model="tempAll.soType" size="mini" placeholder="请选择">
                     <el-option v-for="(val, key) in salesType" :key="key" :label="val" :value="key">
                      </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币别" prop="currencyName">
                  <currency-select @childevent="childEventHandlerCurrency" :querySelect="tempAll.currencyName"></currency-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="mini" @click.native="AddClick" :disabled="addStatus">创建发货指令</el-button>
    </div>
    <div class="table">
        <common-table
          :data="list"
          :maxHeight="300"
          :fit="true" v-loading.body="listLoading"
          :headers="header1"
          @cell-click="handleCellClick"
          @selection-change="handleSelectionChange"
        >
          <template slot-scope="scope">
            <div v-if="scope.text == 'applyDeliveryQty'">
              <el-input v-number-only:10.abs="2" v-model.number="list[scope.index]['applyDeliveryQty']" size='mini'></el-input>
            </div>
          </template>
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text == 'deliveryDateStart'">
              <span>{{list[scope.index]['deliveryDateStart'] | parseTime}}</span>
            </div>
            <div v-if="scope.text == 'deliveryDateEnd'">
              <span>{{list[scope.index]['deliveryDateEnd'] | parseTime}}</span>
            </div>
            <div v-if="scope.text == 'packType'">
              <span>{{list[scope.index]['packType'] | packType}}</span>
            </div>
            <div v-if="scope.text == 'orginPriceTex'">
              <span>{{list[scope.index]['orginPriceTex'] | pointAfter(6)}}</span>
            </div>
            <div v-if="scope.text == 'orginAmtTex'">
              <span>{{list[scope.index]['orginAmtTex'] | pointAfter(2)}}</span>
            </div>
            <div v-if="scope.text == 'contractQtyW'">
              <span>{{list[scope.index]['contractQty'] - list[scope.index]['hasOutstockQty']}}</span>
            </div>
          </template>
        </common-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formData.currentPage"
          :page-sizes="[10, 20, 30,50]"
          :page-size="formData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    doQueryWithPageforDin
  } from 'api/sales-process/delivery-instructions/delivery-instructions.js'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import StaffSelect from '@/components/common-select/staff-select.vue' //业务员
  import CustomerSelect from 'components/common-select/customer-select.vue' //客户
  import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import { ENUMS } from '../../../assets/enums.js'
  import { parseTime } from '@/filters/index.js'
  import {pickerOptions} from '@/util'
  const header1 = [
    { type: 'selection', width: '55px'},
    {prop: 'index', type: 'index', label: '序号', fixed: "left"},
    {prop: 'soContractNo', label: '销售合同号',align: 'center',width:'160px'},
    {prop: 'contactsAddress', label: '收货地址',align: 'center',width:'100px'},
    {prop: 'contacts', label: '联系人',align: 'center',width:'100px'},
    {prop: 'contactsPhone', label: '联系电话',align: 'center',width:'100px'},
    {prop: 'goodsCode', label: '物料编码',align: 'center',width:'100px'},
    {prop: 'goodsName', label: '物料名称',align: 'center',width:'100px'},
    {prop: 'applyDeliveryQty', label: '申请发货数量',align: 'center',width:'160px'},
    {prop: 'packType', label: '包装方式',align: 'center',width:'80px',filter:'packType'},
    {prop: 'orginPriceTex', label: '原币单价（含税）',align: 'center',filter:'orginPriceTex',width:'140px'},
    {prop: 'orginAmtTex', label: '原币金额（含税）',align: 'center',width:'140px',filter:'orginAmtTex'},
    {prop: 'dtlQty', label: '合同数',align: 'center'},
    {prop: 'contractQtyW', label: '未发数量',align: 'center',filter:'contractQtyW'},
    {prop: 'deliveryDateStart', label: '交货开始时间',align: 'center',dataType: 'Date',width:'120px'},
    {prop: 'deliveryDateEnd', label: '交货截止时间',align: 'center',dataType: 'Date',width:'120px'},
    {prop: 'supplierBatchNo', label: '供应商批号',align: 'center',width:'120px'},
  ];

  export default {
    components: {
      ManagementSubject,DepartmentSubject,StaffSelect,CustomerSelect,GoodsSelect,CurrencySelect
    },
    data(){
      return {
        tempAll:{
          manageSubName:'',//经营主体
          manageSubId:'',
          manageSubCode:'',
          bizOrgName:'',//部门
          customerName:'',//客户
          postPersonName:'',//过账人
          buyerName:'',//业务员
          goodsName: '',//物料名称
        },
        formData: {
          manageSubCode:'',
          bizOrgCode: '',
          buyerCode:'',
          goodsCode: '',
          customerCode:'',
          postPersonCode:'',//审批人
          createdBy:'',//创建人
          soType:'',//发货类型
          createdTimeStart:'',//创建时间
          createdTimeEnd:'',//创建时间
          postDateStart:'',//审批时间
          postDateEnd:'',//审批时间
          currentPage:1,
          pageSize:10,
          needCount:true,
        },
        rules:{
          buyerName:[//业务员
              {required: true, message: ' ', trigger: 'change'}
          ],
          manageSubName:[//经营主体
              {required: true, message: ' ', trigger: 'change'}
          ],
          bizOrgName:[//部门
              {required: true, message: ' ', trigger: 'change'}
          ],
          customerName:[//客户
              {required: true, message: ' ', trigger: 'change'}
          ],
          currencyName:[//币别
              {required: true, message: ' ', trigger: 'change'}
          ],
          soType:[//发货类型
              {required: true, message: ' ', trigger: 'change'}
          ],
        },
        pickerOptions: {
            shortcuts: pickerOptions
        },
        listLoading:false,
        createdTime:'',//创建时间
        postDate:'',//审批时间
        salesType: ENUMS["7270"],//发货类型
        packType: ENUMS["7135"],//包装方式
        header1: header1,
        searchBarFlg: true,
        list: [],
        total:0,
        addStatus:true,
        selectchange:'',
        ifEditDepartment:true,
        transferSearchDepartment:{
          companyName:"",
          companyId:"",
          companyCode:"",
          boolToBtn:true,
        },
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
      }
    },
    methods:{
      //查询
      Search(){
        this.$refs['headerDataForm'].validate((valid) => {
          if(valid){
            this.formData.soType = this.tempAll.soType;
            this.listLoading = true;
            doQueryWithPageforDin(this.formData).then(response=> {
              if(response.data.status ==1){
                this.list = response.data.data.datalist;
                this.total = response.data.data.items;

                for(var i=0;i<this.list.length;i++){
                  var iIndex = this.list[i];
                  // 原币单价（含税）    含税单价 = 含税金额/数量
                  iIndex['orginPriceTex'] = iIndex.amtTex/iIndex.applyDeliveryQty;
                    // 原币金额（含税） = 申请发货数量 * 含税单价
                  iIndex['orginAmtTex'] = iIndex.applyDeliveryQty * iIndex.orginPriceTex;
                  //原币单价（不含税）  无税单价 = ( 含税金额 - 含税金额/(1 + 税率)*税率)/数量
                  iIndex['orginPrice'] = '';
                  // 原币金额（不含税）
                  iIndex['orginAmt'] = '';
                  // 原币税额 = （数量 * 含税单价）/（1 + 税率） * 税率
                  iIndex['orginTexAmt'] = '';
                  /** 本币单价（含税）本币含税单价 = 原币含税单价 * 对人民币汇率  */
                  iIndex['basePriceTex'] = '';
                  /** 本币单价（不含税） 本币无税单价 = 原币无税单价 * 对人民币汇率 */
                  iIndex['basePrice'] = '';
                  /** 本币金额（不含税）本币税前金额 = 原币税前金额 * 对人民币汇率   */
                  iIndex['baseAmt'] = '';
                  /** 本币金额（含税）本币含税金额 = 本币税前金额 + 本币税额   */
                  iIndex['baseTexAmt'] = '';//本币税额
                  iIndex['baseAmtTex'] = '';
                }

                this.listLoading = false;
              }else {
                this.listLoading = false;
              }
            })
          }
        })

      },
      getBackList(){

      },
      Reset(){//重置
        this.tempAll = {
          manageSubName:'',//经营主体
          bizOrgName:'',//部门
          customerName:'',//客户
          postPersonName:'',//过账人
          buyerName:'',//业务员
          goodsName: '',//物料名称
        }
        this.formData = {
          manageSubCode:'',
          bizOrgCode: '',
          buyerCode:'',
          goodsCode: '',
          customerCode:'',
          currencyCode:'',
          postPersonCode:'',//审批人
          createdBy:'',//创建人
          soType:'',//发货类型
          createdTimeStart:'',//创建时间
          createdTimeEnd:'',//创建时间
          postDateStart:'',//审批时间
          postDateEnd:'',//审批时间
          currentPage:1,
          pageSize:10,
          needCount:true,
        }
        this.$refs['headerDataForm'].resetFields();
        this.createdTime = '';
        this.postDate = '';
        this.list=[];
        this.total = 0;
      },
      //返回
      Back(){
        this.Reset();
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      //创建发货指令
      AddClick(){
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'addAgain',
            params: {
              "addTempAll":this.tempAll,
              "soType":this.formData.soType,
              "select":this.selectchange,
            }
          }
        });
      },

      childEventHandlerMainInfo(val) {// 经营主体
        if(val){
          this.tempAll.manageSubName = val.companyName;
          this.tempAll.manageSubId = val.companyId;
          this.tempAll.manageSubCode = val.companyCode;
          this.formData.manageSubCode = val.companyCode;
          this.ifEditDepartment = false;
          this.transferSearchDepartment.companyName = val.companyName;
          this.transferSearchDepartment.companyId = val.companyId;
          this.transferSearchDepartment.companyCode = val.companyCode;
        }else {
          this.tempAll.manageSubName = '';
          this.tempAll.manageSubId = '';
          this.tempAll.manageSubCode = '';
          this.formData.manageSubCode = '';
          this.ifEditDepartment = true;
          this.transferSearchDepartment.companyName = '';
          this.transferSearchDepartment.companyId = '';
          this.transferSearchDepartment.companyCode = '';
        }
        this.tempAll.bizOrgName = '';
        this.tempAll.bizOrgId = '';
        this.tempAll.bizOrgCode = '';
        this.tempAll.customerName = '';
        this.tempAll.customerId = '';
        this.tempAll.customerCode = '';
        this.formData.customerCode = '';
        this.$refs['headerDataForm'].validateField('manageSubName');
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.tempAll.bizOrgName = val.orgName;
          this.tempAll.bizOrgCode = val.orgCode;
          this.tempAll.bizOrgId = val.orgId;
          this.formData.bizOrgCode = val.orgCode;
        }else {
          this.tempAll.bizOrgName = '';
          this.tempAll.bizOrgCode = '';
          this.tempAll.bizOrgId = '';
          this.formData.bizOrgCode = '';
        }
        this.$refs['headerDataForm'].validateField('bizOrgName');
      },
      childEventHandlerStaff(val){//业务员
        if(val){
          this.tempAll.buyerName = val.userName;
          this.tempAll.buyerId = val.userId;
          this.tempAll.buyerCode = val.userCode;
          this.formData.buyerCode = val.userCode;
        }else {
          this.tempAll.buyerName = '';
          this.tempAll.buyerId = '';
          this.tempAll.buyerCode = '';
          this.formData.buyerCode = '';
        }
        this.$refs['headerDataForm'].validateField('buyerName');
      },
      childEventHandlerPostPersonName(val){//审批人
        if(val){
          this.tempAll.postPersonName = val.userName;
          this.formData.postPersonCode = val.userCode;
        }else {
          this.tempAll.postPersonName = '';
          this.formData.postPersonCode = '';
        }
      },
      childEventHandlerCreate(val){//创建人
        if(val){
          this.formData.createdBy = val.userName;
        }else {
          this.formData.createdBy = '';
        }
      },
      childEventHandlerCustomer(val){//客户
        if(val){
          this.tempAll.customerName = val.custName;
          this.tempAll.customerId = val.id;
          this.tempAll.customerCode = val.custCode;
          this.formData.customerCode = val.custCode;
        }else {
          this.tempAll.customerName = '';
          this.tempAll.customerId = '';
          this.tempAll.customerCode = '';
          this.formData.customerCode = '';
        }
        this.$refs['headerDataForm'].validateField('customerName');
      },
      childEventHandlerGoods(val) {//物料编号
        if(val){
          this.tempAll.goodsName = val.goodsName;
          this.formData.goodsCode = val.goodsCode;
        }else {
          this.tempAll.goodsName = '';
          this.formData.goodsCode = '';
        }
      },
      childEventHandlerCurrency(val){//币别
        if(val){
          this.tempAll.currencyId = val.currencyId;//币别id
          this.tempAll.currencyCode = val.currencyCode;//币别code
          this.tempAll.currencyName = val.currencyName;//币别name
          this.tempAll.rateCurrency = val.exchangeRate.toFixed(8);//汇率
          this.formData.currencyCode = val.currencyCode;
        }else {
          this.tempAll.currencyId = '';
          this.tempAll.currencyCode = '';
          this.tempAll.currencyName = '';
          this.tempAll.rateCurrency = '';
          this.formData.currencyCode = '';
        }
        this.$refs['headerDataForm'].validateField('currencyName');
      },
      //分页
      handleCellClick(){

      },
      handleSelectionChange(val){
        this.selectchange = val;
        if(val.length>0){
          this.addStatus = false;
        }else {
          this.addStatus = true;
        }

      },
      handleSizeChange(val){
        this.formData.pageSize = val;
        this.Search();
      },
      handleCurrentChange(val){
        this.formData.currentPage = val;
        this.Search();
      },

    },
    watch: {
      createdTime:function(val){
        if(val && val[0] && val[1]){
          this.formData.createdTimeStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
          this.formData.createdTimeEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
        }else {
          this.formData.createdTimeStart = '';
          this.formData.createdTimeEnd = '';
        }
      },
      postDate:function(val){
        if(val && val[0] && val[1]){
          this.formData.postDateStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
          this.formData.postDateEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
        }else {
          this.formData.postDateStart = '';
          this.formData.postDateEnd = '';
        }
      }
    }
  }
</script>
