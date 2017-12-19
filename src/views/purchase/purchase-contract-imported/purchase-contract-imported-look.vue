<template>
    <div class="allTemplate purchaseContract">
        <div class="info" style="margin-bottom: 15px">
            <div class="btn">
                <!-- <el-button type="primary" size="small" @click="toSave">保存</el-button> -->
                <el-button type="info" size="small" @click="toCancel">取 消</el-button>
                <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true">展 开</el-button>
                <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false">收 起</el-button>
            </div>

            <el-collapse-transition>
                <div v-show="searchBarFlg" class="top-from">
                    <el-tabs v-model="activeName"  @tab-click="handleClick">
                        <el-tab-pane label="抬头数据" name="first">
                           <el-form ref="tempAll" label-width="80px" :model="tempAll" class="header-from">
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="系统单据号" prop="poNo">
                                            <el-input v-model="tempAll.poNo" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="合同类型" prop="poType">
                                            <el-input :value="tempAll.poType | poType" size="mini" :disabled="true"></el-input>
                                            <!-- <el-select v-model="tempAll.poType" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in poType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select> -->
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="采购员" prop="buyerName">
                                            <el-input v-model="tempAll.buyerName" size="mini" :disabled="true"></el-input>
                                            <!-- <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.buyerName"></staff-select> -->
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="运输方式" prop="transType">
                                            <el-select v-model="tempAll.transType" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in transType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="经营主体" prop="manageSubName">
                                            <el-input v-model="tempAll.manageSubName" size="mini" :disabled="true"></el-input>
                                            <!-- <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject> -->
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="部门" prop="bizOrgName">
                                            <el-input v-model="tempAll.bizOrgName" size="mini" :disabled="true"></el-input>
                                            <!-- <department-select  @childevent = "childEventHandlerDepartment" :querySelect="tempAll.bizOrgName" :disabled="isDepartment" :transferSearch="transferSearchDepartment"></department-select> -->
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="提货方式" prop="pickUpType">
                                            <el-select v-model="tempAll.pickUpType" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in pickUpType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="采购合同号" prop="poContractNo">
                                            <el-input v-model="tempAll.poContractNo" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="供应商" prop="supplierName">
                                            <el-input v-model="tempAll.supplierName" size="mini" :disabled="true"></el-input>
                                           <!-- <supplier  @childevent="getChildevent" @getData="getData" :selectName="tempAll.supplierName" ref="supplierPage"></supplier> -->
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="合同状态" prop="poStatus">
                                            <el-select v-model="tempAll.poStatus" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in poStatus" :key="key" :label="value" :value="key" :disabled="true"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="币别" prop="currencyName">
                                            <el-input v-model="tempAll.currencyName" size="mini" :disabled="true"></el-input>
                                            <!-- <currency-select @childevent="childEventHandlerCurrency" :querySelect="tempAll.currencyName"></currency-select> -->
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="计重标准" prop="weightStandType">
                                            <el-select v-model="tempAll.weightStandType" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in weightStandType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="签署日期" prop="signDate">
                                            <el-date-picker
                                              v-model="tempAll.signDate"
                                              type="date"
                                              placeholder="选择日期"
                                              style="width: 100%;" :disabled="true"
                                              size="mini">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="贸易国别" prop="tradeZoneName">
                                            <el-input v-model="tempAll.tradeZoneName" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="溢短装数量" prop="lessQty">
                                            <el-input v-model="tempAll.lessQty" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="对人民币汇率" prop="rateCurrency" class="contract-auitTitle">
                                            <el-input v-model="tempAll.rateCurrency" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                     <el-col :span="6">
                                        <el-form-item label="交货期限" prop="deliveryDateStart">
                                            <el-date-picker v-model="deliveryDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini"  :disabled="true">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="关税" prop="tariff">
                                            <el-input v-model="tempAll.tariff" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="增值税" prop="texRate">
                                            <el-input v-model="tempAll.texRate" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="目的港" prop="portName">
                                            <el-input v-model="tempAll.portName" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="OA审核标题" prop="auitTitle">
                                            <el-input v-model="tempAll.auitTitle" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                     <el-col :span="6">
                                        <el-form-item label="" prop="deliveryDateStart">
                                            <el-form-item label="" prop="isConfirm">
                                                <el-checkbox v-model="isBack" :disabled="true">原件收回确认</el-checkbox></el-form-item>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="备注" prop="remark" class="contract-remark">
                                            <el-input v-model="tempAll.remark" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="付款方式" name="second">
                            <!-- <div class="planbtn">
                                <el-button type="warning" size="small" @click="paymentMethodAddRow">创建</el-button>
                                <el-button type="warning" size="small" icon="el-icon-delete"  @click="PaymentMethodDeleteRow" plain>删除</el-button>
                            </div> -->
                            <div class="table">
                               <common-table
                                :data="paymentMethodList"
                                :maxHeight="130"
                                :fit="true"
                                :headers="paymentMethodHeaders"
                                @row-click="PayHandleCellClick"
                                @selection-change="PayHandleSelectionChange"
                                >
                                    <template slot="filter" slot-scope="scope">
                                        <div v-if="scope.text == 'selectPayType'">
                                          <span>{{paymentMethodList[scope.index]['payType'] | payTypeFilter}}</span>
                                        </div>
                                        <div v-if="scope.text == 'selectTimeType'">
                                          <span>{{paymentMethodList[scope.index]['timeType'] | timeTypeFilter}}</span>
                                        </div>
                                        <div v-if="scope.text == 'selectPayMode'">
                                          <span>{{paymentMethodList[scope.index]['payMode'] | payModeFilter}}</span>
                                        </div>
                                    </template>
                                </common-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="相关文件" name="third">
                            <div style="margin-top:12px;margin-bottom:12px">
                                <span>&nbsp;&nbsp;文件：</span>
                                <el-upload ref="upload" action="" style="display: inline-block" :on-change="handleUploadChange" :auto-upload="false" :show-file-list="false" :file-list="fileList">
                                    <el-input slot="trigger" size="mini" type="primary" :value="fileList && fileList.length > 0?fileList[0].name:''">
                                    </el-input>
                                    <el-button class="orange-btn" type="warning" size="mini" style="margin-left:0px" @click="submitUpload">上传
                                    </el-button>
                                  </el-upload>
                                  <span>文件上传上限20M</span>

                            </div>
                            <div>
                                <el-table
                                  :data="tableData"  border highlight-current-row stripe fit header-align="center" @selection-change="handleSelectionChange"
                                  style="width: 100%" min-width="108">
                                    <el-table-column
                                      prop="index"
                                      label="文件操作"  align="center"
                                      min-width="100">
                                        <template slot-scope="scope">
                                          <el-button @click.native.prevent="downLoad(scope.row, tableData)" type="text" size="small">下载</el-button>
                                          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
                                        </template>

                                    </el-table-column>
                                    <el-table-column
                                      prop="name"
                                      label="文件名称"  align="center"
                                      min-width="250">
                                    </el-table-column>
                                    <el-table-column
                                      prop="address" min-width="100"  align="center"
                                      label="创建人">
                                    </el-table-column>
                                    <el-table-column
                                      prop="address" width="180"  align="center"
                                      label="创建时间">
                                    </el-table-column>
                                  </el-table>
                                </div>
                                <div>
                                  <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="listQuery.currentPage"
                                    :page-sizes="[10, 20, 30, 50]"
                                    :page-size="listQuery.pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="total">
                                  </el-pagination>
                                </div>
                        </el-tab-pane>
                        <el-tab-pane label="系统信息" name="fourth">
                           <el-form ref="form" label-width="110px" :model="tempAll" style="margin-top:16px;margin-bottom:10px">
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        <el-form-item label="创建人" prop="createdBy">
                                            <el-col :span="24">
                                                <el-input v-model="tempAll.createdBy" size="mini" :disabled="true"></el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="修改人" prop="updatedBy">
                                            <el-col :span="24">
                                                <el-input v-model="tempAll.updatedBy" size="mini" :disabled="true"></el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审核人" prop="postPersonName">
                                            <el-col :span="24">
                                                <el-input v-model="tempAll.postPersonName" size="mini" :disabled="true"></el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        <el-form-item label="创建时间" prop="createdTime">
                                            <el-col :span="24">
                                               <el-date-picker
                                                  v-model="tempAll.createdTime"
                                                  type="datetime"
                                                  placeholder="选择日期"
                                                  style="width: 100%;"
                                                  size="mini"
                                                  :disabled="true">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="修改时间" prop="updatedTime">
                                            <el-col :span="24">
                                                <el-date-picker
                                                  v-model="tempAll.updatedTime"
                                                  type="datetime"
                                                  placeholder="选择日期"
                                                  style="width: 100%;"
                                                  size="mini"
                                                  :disabled="true">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审核时间" prop="postDate">
                                            <el-col :span="24">
                                                <el-date-picker
                                                  v-model="tempAll.postDate"
                                                  type="datetime"
                                                  placeholder="选择日期"
                                                  style="width: 100%;"
                                                  size="mini"
                                                  :disabled="true">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-collapse-transition>
            <div class="under-table">
                <div class="tab-right-btn">
                    <el-dropdown @command="doCheckOrUnCheck" trigger="click" menu-align="start">
                        <el-button type="warning" size="small" calss="right-btn" :disabled="btnStatus">
                            到货关闭<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="0" :disabled="this.deliveryMark
                                !='0'">关闭</el-dropdown-item>
                            <el-dropdown-item command="1" :disabled="this.deliveryMark
                                !='1'">取消关闭</el-dropdown-item>
                        </el-dropdown-menu>
                        <!-- <el-button type="warning" size="small" icon="el-icon-delete" plain calss="right-btn">到货关闭</el-button> -->
                    </el-dropdown>
                </div>
                <el-tabs v-model="activeName1"  @tab-click="handleClick1">
                    <el-tab-pane label="商品明细" name="first">
                        <!-- <div class="planbtn">
                            <el-button type="warning" size="small" @click="detailedAddRow">创建</el-button>
                            <el-button type="warning" size="small" icon="el-icon-delete" @click="detailedDeleteRow" plain>删除</el-button>
                        </div> -->

                        <div class="table">
                           <common-table
                            :data="commodityDetailedList"
                            :maxHeight="300"
                            :fit="true"
                            :headers="commodityDetailedHeaders"
                            @row-click="detailedHandleCellClick"
                            @selection-change="detailedHandleSelectionChange"
                            >
                            <template slot="filter" slot-scope="scope">
                                <div v-if="scope.text == 'selectPackType'">
                                    <span>{{commodityDetailedList[scope.index]['packType'] | packTypeFilter}}</span>
                                </div>
                                <div v-if="scope.text == 'deliveryMark'">
                                    <el-checkbox :disabled="true" :checked="commodityDetailedList[scope.index]['deliveryMark']"></el-checkbox>
                                </div>
                            </template>
                            <template slot-scope="scope">
                                <div v-if="scope.text == 'radio'" class="tab-radio">
                                    <el-radio-group v-model="radio">
                                        <el-radio :label="commodityDetailedList[scope.index]['poRowNo']"></el-radio>
                                    </el-radio-group>
                                    <!-- <el-radio v-model="radio"></el-radio> -->
                                </div>
                            </template>
                            </common-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="到货计划" name="second">
                        <!-- <div class="planbtn">
                            <el-button type="warning" size="small" @click="planAddRow">创建</el-button>
                            <el-button type="warning" size="small" @click="planDeleteRow" plain>删除</el-button>
                        </div> -->

                        <div class="table">
                           <common-table
                            :data="arrivalPlanList"
                            :maxHeight="300"
                            :fit="true"
                            :headers="arrivalPlanHeaders"
                            @row-click="planHandleCellClick"
                            @selection-change="planHandleSelectionChange"
                            >
                                <template slot="filter" slot-scope="scope">
                                    <!-- 交货期限 -->
                                    <div v-if="scope.text == 'deliveryDate'">
                                      <span>{{arrivalPlanList[scope.index]['deliveryDate'] | parseTime('{y}-{m}-{d}')}}</span>
                                    </div>
                                </template>
                                <template slot-scope="scope">
                                    <!-- <div v-if="scope.text == 'date'">
                                        <el-date-picker size="mini" v-model="arrivalPlanList[scope.index]['deliveryDate']" type="date" placeholder="选择日期" @change="handleChange" ref="datePicker">
                                        </el-date-picker>
                                    </div>
                                    <div v-if="scope.text == 'input10'">
                                        <el-input size="mini" v-model="arrivalPlanList[scope.index]['deliveryQty']"></el-input>
                                    </div> -->
                                </template>
                            </common-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import {
        doQueryCodPoWithDtl,//获取数据
        doDeliveryClose,//关闭发货
        doCancelDeliveryClose,//取消关闭
    } from '@/api/purchase/purchase-contract-imported/purchase-contract-imported-look'

import {pickerOptions} from '@/util';
// import
import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
import supplier from '@/components/common-select/supplier.vue'//供应商

    // 付款方式
    const paymentMethodHeaders = [
        {type:'selection', width:'50px',fixed:'left'},
        { prop: 'pmRowNo', label:'序号', width: '55px',align:'center'},
        { prop: 'payType', label: '付款类型',align:'center',filter: 'selectPayType'},
        { prop: 'timeType', label: '时间节点',align:'center' ,filter: 'selectTimeType' },
        { prop: 'payMode', label: '支付方式',align:'center' ,filter: 'selectPayMode'},
        { prop: 'forwardDays', label: '远期天数',align:'center' },
        { prop: 'account', label: '票期',align:'center' },//新
        // { prop: 'currencyName', label: '币种',align:'center'},
        { prop: 'orginAmtTex', label: '原币金额',align:'center',digit:'2'},
        // { prop: 'proportion', label: '比列%',align:'center' },
        { prop: 'remark', label: '备注',align:'center'}
    ];
    // 商品明细
    const commodityDetailedHeaders = [
        { prop: 'radio', label: '#', width: '55px',template: 'radio',fixed:'left',align:'center'},
        { prop: 'poRowNo', label:'行号', width: '55px',align:'center'},
        { prop: 'goodsCode', label: '物料编号', width: '200px',align:'center'},
        { prop: 'goodsName', label: '物料名称', width: '120px',align:'center'},
        { prop: 'itemQty', label: '数量', width: '120px',align:'center',digit:'2'},
        { prop: 'unitName', label: '单位', width: '120px',align:'center'},
        { prop: 'selectPackType', label: '包装方式', width: '120px',align:'center', filter: 'selectPackType',},//无
        { prop: 'orginPriceTex', label: '原币单价', width: '120px',align:'center',digit:'6'},
        { prop: 'basePriceTex', label: '本币单价', width: '120px',align:'center',digit:'6'},
        { prop: 'orginAmtTex', label: '原币金额', width: '120px',align:'center',digit:'2'},
        { prop: 'baseAmtTex', label: '本币金额', width: '120px',align:'center',digit:'2'},
        { prop: 'tariffRate', label: '关税税率', width: '120px',align:'center',digit:'2'},
        { prop: 'tariffAmt', label: '关税金额', width: '120px',align:'center',digit:'2'},
        { prop: 'addTexRate', label: '增值税税率', width: '120px',align:'center',digit:'2'},
        { prop: 'addTexAmt', label: '增值税金额', width: '120px',align:'center',digit:'2'},
        { prop: 'deliveryMark', label: '到货关闭', width: '120px',align:'center',filter:'deliveryMark'},
        { prop: 'remark', label: '备注', width: '120px',align:'center'}
    ];


    // 到货计划
    const arrivalPlanHeaders = [
        {type:'selection', width:'50px'},
        { prop: 'index', type:'index', label:'序号', width: '200px',align:'center', template: '<span>{{ index+1 }}</span>'},
        { prop: 'deliveryDate', label: '交货日期', width: '483px',align:'center',filter:'deliveryDate' },
        { prop: 'deliveryQty', label: '订单数量',align:'center'},
        { prop: 'remark', label: '备注', width: '120px',align:'center'},

    ];

    export default {
        components:{
            ManagementSubject,//经营主体
            DepartmentSelect,//部门
            supplier,//供应商
        },
        props:{
            updateId:'',
        },
        data(){
            return {
                activeName:'first',
                searchBarFlg:true,
                activeName1:'first',
                // 抬头数据
                tempAll:{
                    poNo:'',//系统单据号
                    poType:'73500010',//合同类型73500010
                    buyerName:'',//采购员
                    transType:'',//运输方式
                    manageSubId:'',//经营主体id
                    manageSubCode:'',//经营主体code
                    manageSubName:'',//经营主体name
                    bizOrgId:'',//部门id
                    bizOrgCode:'',//部门code
                    bizOrgName:'',//部门name
                    pickUpType:'',//提货方式
                    poContractNo:'',//采购合同号
                    supplierId:'',//供应商id
                    supplierCode:'',//供应商code
                    supplierName:'',//供应商name
                    poStatus:'70200010',//合同状态
                    currencyName:'',//币别name
                    currencyId:'',//币别id
                    currencyCode:'',//币别code
                    weightStandType:'',//计重标准
                    signDate:'',//签署日期
                    tradeZoneName:'',//贸易国别
                    lessQty:'',//溢短装数量
                    rateCurrency:'',//对人民币汇率
                    deliveryDateStart:'',//交货期限始
                    deliveryDateEnd:'',//交货日期止
                    tariff:'',//关税
                    orginTexAmt:'',//增值税
                    portName:'',//目的港
                    auitTitle:'',//OA审核标题
                    isBack:'',//收回原件确认
                    remark:'',//备注
                },
                activeName:'first',
                searchBarFlg:true,
                deliveryDate:[],//交货期限
                //枚举
                poType:ENUMS['7350'],//合同类型
                poStatus:ENUMS['7020'],//合同状态
                transType:ENUMS['7120'],//运输方式
                weightStandType:ENUMS['7125'],//计重标准
                pickUpType:ENUMS['7130'],//提货方式

                // 付款方式
                paymentMethodHeaders:paymentMethodHeaders,//付款方式表格数据
                paymentMethodList:[],
                payDeleteList:[],//删行数据
                payType:ENUMS['7140'],//付款类型
                timeType:ENUMS['7145'],//时间节点
                payMode:ENUMS['7210'],//支付方式

                // 相关文件
                multipleSelection:[],
                fileList: [],
                listQuery:{
                  currentPage:1,
                  pageSize:10
                },
                total:400,
                tableData: [],

                // 商品明细
                commodityDetailedHeaders:commodityDetailedHeaders,//商品明细表格数据
                commodityDetailedList:[],//列表数据
                commodityDeleteList:[],//删行数据
                radio:null,
                index:null,//存放当前点击的值
                planData:{},//到货计划外层的数组
                poDtlId:null,
                version:null,//版本号
                deliveryMark:null,//到货关闭状态
                btnStatus:true,//到货关闭按钮状态
                isDeliveryMark:false,
                selectId:[],//选中id
                packType:ENUMS['7135'],//包装方式

                // 到货计划
                arrivalPlanHeaders:arrivalPlanHeaders,//到货计划表格数据
                arrivalPlanList:[],
                planDeleteList:[],//删行数据
                codPoDpIdDels:[],//到货计划删除的id

                codPoForm:null,
                codPoDtlCreateForms:[],
                codPoDtlForm:{},
                codPoDpForms:[],

                poId:null,//获取数据id
                pickerOptions: {
                    shortcuts: pickerOptions
                },

                codPoDpVOs:[],
                deliveryMark:false,//发货关闭状态
                isBack:false,//原件收回确认
            }
        },
        created(){
            this.getList();
        },
        methods:{
            getList(){
                this.commodityDetailedList = [];
                this.deliveryDate = [];
                this.codPoDpVOs = [];
                this.planData = {};
                this.radio = null;
                this.btnStatus = true;
                this.activeName = 'first';
                if(this.$route.query){
                    this.poId = this.$store.getters.params.PurchaseContractImported.updateId;
                    doQueryCodPoWithDtl(this.poId).then(response => {
                        if(response.data.status == 1){
                            var headerForm = response.data.data.codPoVO;
                            this.tempAll = {
                                poNo:headerForm.poNo,//系统单据号
                                poId:headerForm.poId,//主数据
                                poContractNo:headerForm.poContractNo,//采购合同号
                                buyerName:headerForm.buyerName,//采购员name
                                buyerCode:headerForm.buyerCode,//采购员code
                                buyerId:headerForm.buyerId,//采购员id
                                poType:headerForm.poType,//合同类型
                                manageSubId:headerForm.manageSubId,//经营主体id
                                manageSubCode:headerForm.manageSubCode,//经营主体code
                                manageSubName:headerForm.manageSubName,//经营主体name
                                bizOrgId:headerForm.bizOrgId,//部门id
                                bizOrgCode:headerForm.bizOrgCode,//部门code
                                bizOrgName:headerForm.bizOrgName,//部门name
                                supplierId:headerForm.supplierId,//供应商id
                                supplierCode:headerForm.supplierCode,//供应商code
                                supplierName:headerForm.supplierName,//供应商name
                                poStatus:headerForm.poStatus,//合同状态
                                lessQty:headerForm.lessQty,//溢短装数量
                                rateCurrency:headerForm.rateCurrency,//对人民币税率
                                signDate:headerForm.signDate,//签署日期
                                tradeZoneName:headerForm.tradeZoneName,//贸易国别
                                transType:headerForm.transType,//运输方式
                                weightStandType:headerForm.weightStandType,//计重标准
                                deliveryDateStart:headerForm.deliveryDateStart,//交货期限始
                                deliveryDateEnd:headerForm.deliveryDateEnd,//交货日期止
                                currencyName:headerForm.currencyName,//币别name
                                currencyId:headerForm.currencyId,//币别id
                                currencyCode:headerForm.currencyId,//币别code
                                tariff:headerForm.tariff,//关税
                                texRate:headerForm.texRate,//增值税
                                portName:headerForm.portName,//目的港
                                pickUpType:headerForm.pickUpType,//提货方式
                                auitTitle:headerForm.auitTitle,//OA审核标题
                                remark:headerForm.remark,//备注
                                isBack:headerForm.isBack,//原件收回确认
                                version:headerForm.version,//版本号
                                createdBy:headerForm.createdBy,//创建人
                                updatedBy:headerForm.updatedBy,//修改人
                                postPersonName:headerForm.postPersonName,//过账人
                                createdTime:headerForm.createdTime,//创建时间
                                updatedTime:headerForm.updatedTime,//修改时间
                                postDate:headerForm.postDate,//过账时间
                            };
                            this.deliveryDate = [];
                            if(this.tempAll.deliveryDateStart != null && this.tempAll.deliveryDateEnd != null){
                                this.deliveryDate.push(this.tempAll.deliveryDateStart);
                                this.deliveryDate.push(this.tempAll.deliveryDateEnd);
                            };
                            if(this.tempAll.isBack == '1'){
                                this.isBack = false;
                            } else if(this.tempAll.isBack == '0'){
                                this.isBack = true;
                            }
                            this.tempAll.poStatus = String(this.tempAll.poStatus);
                            this.tempAll.transType = String(this.tempAll.transType);
                            this.tempAll.weightStandType = String(this.tempAll.weightStandType);
                            this.tempAll.pickUpType = String(this.tempAll.pickUpType);
                            // this.commodityDetailedList = response.data.data.codPoDtlVOs;

                            //商品明细
                            let Inventory = response.data.data.codPoDtlVOs;
                            this.commodityDetailedList = [];
                            if(Inventory.length > 0 && Inventory != null){
                                Inventory.forEach((o,i) => {
                                    this.commodityDetailedList.push({
                                        "poId":o.poId,
                                        "poDtlId":o.poDtlId,
                                        "poRowNo":o.poRowNo,
                                        "goodsId":o.goodsId,
                                        "goodsCode":o.goodsCode,
                                        "goodsName":o.goodsName,
                                        "itemQty":o.itemQty,
                                        "unitName":o.unitName,
                                        "packType":o.packType.toString(),
                                        "orginPriceTex":o.orginPriceTex,
                                        "orginPrice":o.orginPrice,
                                        "basePriceTex":o.basePriceTex,
                                        "basePrice":o.basePrice,
                                        "orginAmtTex":o.orginAmtTex,
                                        "orginAmt":o.orginAmt,
                                        "baseAmtTex":o.baseAmtTex,
                                        "baseAmt":o.baseAmt,
                                        "tariffRate":o.tariffRate,
                                        "tariffAmt":o.tariffAmt,
                                        "addTexRate":o.addTexRate,
                                        "addTexAmt":o.addTexAmt,
                                        "deliveryMark":o.deliveryMark,
                                        "remark":o.remark,
                                        "version":o.version
                                    })
                                })
                            };

                            this.codPoDpVOs = response.data.data.codPoDpVOs;
                            if(response.data.data.codPmVOs != null){
                                this.paymentMethodList = response.data.data.codPmVOs;
                            };
                            // this.paymentMethodList = response.data.data.codPmVOs;

                            for(var codDtl of this.commodityDetailedList) {
                                this.planData[codDtl.poRowNo] = [];
                                for(var codDp of this.codPoDpVOs) {
                                    if (codDp.poDtlId == codDtl.poDtlId) {
                                        this.planData[codDtl.poRowNo].push(codDp);
                                    };

                                }
                            };
                            console.log(this.planData,"this.planData");
                            this.commodityDetailedList.forEach((o,i) => {
                                if(o.deliveryMark == 0){
                                    o.deliveryMark = true;
                                }else if(o.deliveryMark == 1){
                                    o.deliveryMark = false;
                                };
                                // debugger;
                                if(o.packType != null){
                                    console.log(o.packType);
                                    o.packType = o.packType.toString();
                                }
                            })
                            // this.arrivalPlanList = response.data.data.codPoDpVOs;
                            // this.planList.push(response.data.data.codPoDpVOs);
                        }
                    })
                }
            },
            handleClick(){//头部tab切换

            },


            // var o = {}
            // o[key] = val;

            handleClick1(tab,event){//底部tab切换
            },
            toCancel(){//取消
                this.$store.dispatch('toggleCurrentView',{
                    PurchaseContractImported: {
                        view: 'index'
                        // params: 跳转过去的子组件的属性对象
                    }
                })
            },

            // 付款方式
            PayHandleCellClick(){//单击列表

            },
            PayHandleSelectionChange(val){//复选框
                this.payDeleteList = val;
            },

            handleCellClick(){//单击列表

            },
            handleSelectionChange(val){//复选框
                this.deleteList = val;
                console.log(this.deleteList,'shanchu');
            },

            //*************相关文件********************
            submitUpload(){//上传
                // console.log(this.fileList,'dkjsfoauo');
                if(this.fileList.length == 0){
                  this.$notify({
                    title: '警告',
                    message: '请选择要进行上传的文件',
                    type: 'warning'
                  });
                }else {
                  this.tableData.push(this.fileList[0]);
                  let createTime = new Date();

                  this.fileList = [];
                }

            },
            handleSizeChange(val){//分页

            },
            handleCurrentChange(val){

            },
            handleUploadChange(file, fileList){//
                if (file.hasOwnProperty('size')) {
                    if (file.size > 20 * 1024 * 1024) {
                        this.$alert(file.name + '文件上传上限20M');
                        fileList.del(file);
                    }
                }
                if (fileList.length > 1) {
                    fileList.splice(0, 1);
                }
                this.fileList = fileList;
            },
            downLoad(row){//下载
                console.log(row)
                if(row.url){

                    const a = document.createElement('a');
                    a.setAttribute('href', row.url);
                    a.setAttribute('download', row.name);
                    a.click();
                }
            },
            deleteRow(index, rows){//移除
                rows.splice(index, 1);
            },

            //****************商品明细*****************
            detailedHandleCellClick(val){//单击列表
                console.log('单击列表',val);
                this.radio = val.poRowNo;
                this.index = val.$index;
                this.poDtlId = val.poDtlId;//商品明细id
                this.version = val.version;//版本号
                if(this.tempAll.poStatus == '70200060'){
                    this.btnStatus = false;
                }else {
                    this.btnStatus = true;
                };
                this.selectId = [];
                this.selectId.push({
                    "poDtlId":val.poDtlId,
                    "version":val.version
                })
                this.deliveryMark = val.deliveryMark;//到货计划状态
                console.log(this.planData,'this.planData');
                for(var i in this.planData){
                    if(val.poRowNo == i){
                        this.arrivalPlanList = this.planData[i];
                    }
                }
            },
            detailedHandleSelectionChange(val){//复选框
                // debugger;
                let vm=this;
                this.commodityDeleteList = val;
            },
            detailedHandleSizeChange(){//分页

            },
            detailedDandleCurrentChange(){

            },
            //****************到货计划*****************
            planHandleCellClick(){

            },
            planHandleSelectionChange(val){//复选框
                var vm = this;
                this.planDeleteList = val;

                console.log(val,'到货计划');
            },
            handleChange(){

            },
            doCheckOrUnCheck(command){
               if(command == '0'){
                    this.$confirm('您确认要关闭吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        doDeliveryClose(this.selectId).then( response => {
                            if(response.data.status == 1){
                                this.$notify({
                                  title: '成功',
                                  message: '关闭成功！',
                                  type: 'success'
                                });
                                this.getList();
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                } else if(command == '1'){
                    this.$confirm('您确认要取消关闭吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        doCancelDeliveryClose(this.selectId).then(response => {
                            if(response.data.status == 1){
                                this.$notify({
                                  title: '成功',
                                  message: '取消关闭成功！',
                                  type: 'success'
                                });
                                this.getList();
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
        },
        filters: {
            packTypeFilter(val) {//包装方式
                return ENUMS['7135'][val];
            },
            payTypeFilter(val) {//付款类型
                return ENUMS['7140'][val];
            },
            timeTypeFilter(val){//时间节点
                return ENUMS['7145'][val];
            },
            payModeFilter(val){//支付方式
                return ENUMS['7210'][val];
            },
            poType(val){
                return ENUMS["7350"][val];
            }
        },

    }
</script>
<style>
    .purchaseContract .top-from{
        /* border-bottom:1px solid #ccc; */
        margin-bottom:10px;
        height:205px;
    }
    .purchaseContract .top-from .header-from{
        margin-bottom:2px;
    }
    .purchaseContract .planbtn{
        margin-bottom:6px;
    }
    .purchaseContract .el-popper[x-placement^=top] .popper__arrow::after{
        margin-left: 0px;
    }
    .purchaseContract .contract-title .el-input--mini .el-input__inner{
        width:463px;
    }
    .purchaseContract .contract-remark .el-input--mini .el-input__inner{
        width:463px;
    }
    .purchaseContract .under-table{
       position:relative;
    }
    .purchaseContract .tab-right-btn{
        display:inline-block;
        position:absolute;
        right:15px;
        top:5px;
        z-index:9999;
        /* float:right; */
    }
    .purchaseContract .tab-radio .el-radio__label{
        /* padding-left: 32px; */
        display:none;
    }
</style>