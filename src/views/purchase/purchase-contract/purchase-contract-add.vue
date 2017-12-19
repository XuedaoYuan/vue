<template>
    <div class="allTemplate purchaseContract">
        <div class="info" style="margin-bottom: 15px">
            <div class="btn">
                <el-button type="primary" size="small" @click="toSave">保 存</el-button>
                <el-button type="info" size="small" @click="toCancel">取 消</el-button>
                <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true">展 开</el-button>
                <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false">收 起</el-button>
            </div>

            <el-collapse-transition>
                <div v-show="searchBarFlg" class="top-from">
                    <el-tabs v-model="activeName"  @tab-click="handleClick">
                        <el-tab-pane label="抬头数据" name="first">
                            <el-form ref="tempAll" label-width="80px" :model="tempAll"style="padding:10px 0"  :rules="rules">
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="系统单据号" prop="poNo">
                                            <el-input v-model="tempAll.poNo" size="mini" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="采购合同号" prop="poContractNo">
                                            <el-input v-model="tempAll.poContractNo" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="合同类型" prop="poType">
                                            <el-select v-model="tempAll.poType" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in poType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="采购员" prop="buyerName">
                                            <!-- <el-input v-model="tempAll.buyerName" size="mini"></el-input> -->
                                            <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.buyerName"></staff-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="经营主体" prop="manageSubName">
                                            <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="部门" prop="bizOrgName">
                                            <department-select  @childevent = "childEventHandlerDepartment" :querySelect="tempAll.bizOrgName" :disabled="isDepartment" :transferSearch="transferSearchDepartment"></department-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="合同状态" prop="poStatus">
                                            <el-select v-model="tempAll.poStatus" clearable placeholder="请选择" size="mini" :disabled="true">
                                                <el-option v-for="(value,key) in poStatus" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="运输方式" prop="transType">
                                            <el-select v-model="tempAll.transType" clearable placeholder="请选择" size="mini">
                                                <el-option v-for="(value,key) in transType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="供应商" prop="supplierName">
                                            <supplier  @childevent="getChildevent" @getData="getData" :selectName="tempAll.supplierName" ref="supplierPage" :disabled="isDepartment" :transferSearch="transferSearchDepartment"></supplier>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="贸易地区" prop="tradeZoneName">
                                            <el-input v-model="tempAll.tradeZoneName" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="提货方式" prop="pickUpType">
                                            <el-select v-model="tempAll.pickUpType" clearable placeholder="请选择" size="mini">
                                                <el-option v-for="(value,key) in pickUpType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="计重标准" prop="weightStandType">
                                            <el-select v-model="tempAll.weightStandType" clearable placeholder="请选择" size="mini">
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
                                              :editable="false"
                                              size="mini">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="溢短装数量" prop="lessQty">
                                            <el-input v-number-only:10.abs="0" v-model="tempAll.lessQty" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="OA审核标题" prop="auitTitle" class="elColWidth12">
                                            <el-input v-model="tempAll.auitTitle" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                     <el-col :span="6">
                                        <el-form-item label="交货期限" prop="deliveryDateStart">
                                            <el-date-picker v-model="deliveryDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" :editable="false" size="mini" >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                     <el-col :span="6">
                                            <el-form-item label="" prop="isConfirm">
                                                <el-checkbox v-model="isBack" :disabled="true">原件收回确认</el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="备注" prop="remark" class="elColWidth12">
                                            <el-input v-model="tempAll.remark" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="付款方式" name="second">
                            <div class="planbtn">
                                <el-button type="warning" size="small" @click="paymentMethodAddRow('thirdTable')">创 建</el-button>
                                <el-button type="warning" size="small" icon="el-icon-delete"  @click="PaymentMethodDeleteRow" plain>删 除</el-button>
                            </div>
                            <div class="table">
                               <common-table
                                :ref="'thirdTable'"
                                :data="paymentMethodList"
                                :maxHeight="131"
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
                                    <template slot-scope="scope">
                                    <!-- 付款类型 -->
                                        <div v-if="scope.text == 'selectPayType'">
                                            <el-select v-model="paymentMethodList[scope.index]['payType']" clearable  size="mini" placeholder="请选择" @change="payTypeChange">
                                                <el-option v-for="(value,key) in payType" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </div>
                                        <!-- 支付方式 -->
                                        <div v-if="scope.text == 'selectPayMode'">
                                            <el-select v-model="paymentMethodList[scope.index]['payMode']" clearable placeholder="请选择" size="mini" @change="payModeChange">
                                                <el-option v-for="(value,key) in payMode" :key="key" :label="value" :value="key"></el-option>
                                            </el-select>
                                        </div>
                                        <!-- 票期 -->
                                        <div v-if="scope.text == 'account'">
                                            <el-input v-if="accountDisabled== false" v-number-only:10.abs="0" v-model.number="paymentMethodList[scope.index]['account']" size='mini'></el-input>
                                            <span v-else>{{paymentMethodList[scope.index]['account']}}</span>
                                          </div>
                                    </template>
                                </common-table>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="相关文件" name="third">
                            <div style="margin-top:12px;margin-bottom:12px">
                                <span>&nbsp;&nbsp;文件：</span>
                                <el-upload ref="upload" action="" style="display: inline-block" :on-change="handleUploadChange" :auto-upload="false" :show-file-list="false" :file-list="fileList" min-width="108">
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
                                  style="width: 100%">
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
                                            <el-col :span="18">
                                                <el-input v-model="tempAll.createdBy" size="mini" :disabled="true"></el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="修改人" prop="updatedBy">
                                            <el-col :span="18">
                                                <el-input v-model="tempAll.updatedBy" size="mini" :disabled="true"></el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审核人" prop="postPersonName">
                                            <el-col :span="18">
                                                <el-input v-model="tempAll.postPersonName" size="mini" :disabled="true"></el-input>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="20">
                                    <el-col :span="8">
                                        <el-form-item label="创建时间" prop="createdTime">
                                            <el-col :span="18">
                                                <el-date-picker v-model="tempAll.createdTime" type="datetime" size="mini" :disabled="true"></el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="修改时间" prop="updatedTime">
                                            <el-col :span="18">
                                                <el-date-picker v-model="tempAll.updatedTime" type="datetime" size="mini" :disabled="true"></el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审核时间" prop="postDate">
                                            <el-col :span="18">
                                                <el-date-picker v-model="tempAll.postDate" type="datetime" size="mini" :disabled="true"></el-date-picker>
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
                <el-tabs v-model="activeName1"  @tab-click="handleClick1">
                    <el-tab-pane label="商品明细" name="first">
                        <div class="planbtn">
                            <el-button type="warning" size="small" @click="detailedAddRow('firstTable')">创 建</el-button>
                            <el-button type="warning" size="small" icon="el-icon-delete" @click="detailedDeleteRow" plain>删 除</el-button>
                        </div>

                        <div class="table">
                           <common-table
                            :ref="'firstTable'"
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
                                    <el-checkbox :disabled="true"></el-checkbox>
                                </div>
                            </template>
                            <template slot-scope="scope" slot="default">
                                <div v-if="scope.text == 'radio'" class="tab-radio">
                                    <el-radio-group v-model="radio">
                                        <el-radio :label="commodityDetailedList[scope.index]['poRowNo']"></el-radio>
                                    </el-radio-group>
                                </div>
                                <!-- 物料编号 -->
                                <div v-if="scope.text == 'input'" class="table-from">
                                    <goods-select @childevent="childEventHandlerGoods" :querySelect="commodityDetailedList[scope.index]['goodsCode']"></goods-select>
                                </div>
                                <!-- 包装方式 -->
                                <div v-if="scope.text == 'selectPackType'" class="table-from">
                                    <el-select v-model="commodityDetailedList[scope.index]['packType']" clearable placeholder="请选择">
                                        <el-option v-for="(value,key) in packType" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </div>
                                <!-- 数量 -->
                                <div v-if="scope.text == 'itemQty'">
                                    <el-input v-number-only:10.abs="2" v-model.number="commodityDetailedList[scope.index]['itemQty']" size='mini'  @input="itemQtyBlur(commodityDetailedList[scope.index])" @blur="itemToFixed(commodityDetailedList[scope.index])"></el-input>
                                </div>
                                <!-- 含税单价 -->
                                <div v-if="scope.text == 'orginPriceTex'">
                                    <el-input v-number-only:10.abs="6" v-model.number="commodityDetailedList[scope.index]['orginPriceTex']" size='mini'  @input="priceTexBlur(commodityDetailedList[scope.index])" @blur="priceTexToFixed(commodityDetailedList[scope.index])"></el-input>
                                </div>

                                <!-- 含税金额 -->
                                <div v-if="scope.text == 'orginAmtTex'">
                                    <el-input v-number-only:10.abs="2" v-model.number="commodityDetailedList[scope.index]['orginAmtTex']" size='mini'  @input="basePriceBlur(commodityDetailedList[scope.index])" @blur="basePriceToFixed(commodityDetailedList[scope.index])"></el-input>
                                </div>

                                <!-- 税率 -->
                                <div v-if="scope.text == 'texRate'">
                                    <el-input v-number-only:10.abs="2" v-model.number="commodityDetailedList[scope.index]['texRate']" size='mini'  @input="texRateBlur(commodityDetailedList[scope.index])" @blur="texRateToFixed(commodityDetailedList[scope.index])"></el-input>
                                </div>
                            </template>
                            </common-table>
                        </div>
                        <!-- <div>
                    {{radio}}
                        </div> -->
                    </el-tab-pane>
                    <el-tab-pane label="到货计划" name="second">
                        <div class="planbtn">
                            <el-button type="warning" size="small" @click="planAddRow('secondTable')" :disabled="addStatus">创 建</el-button>
                            <el-button type="warning" size="small" icon="el-icon-delete" @click="planDeleteRow" plain>删 除</el-button>
                        </div>
                        <div class="table">
                           <common-table
                            :ref="'secondTable'"
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
                                      <span>{{arrivalPlanList[scope.index]['deliveryDate']
                                      | parseTime('{y}-{m}-{d}')}}</span>
                                    </div>
                                </template>
                                <template slot-scope="scope">
                                    <div v-if="scope.text == 'deliveryDate'">
                                        <el-date-picker size="mini" v-model="arrivalPlanList[scope.index]['deliveryDate']" type="date" placeholder="选择日期"  :picker-options="pickerOptions1" @change="handleChange" ref="datePicker">
                                        </el-date-picker>
                                    </div>
                                    <div v-if="scope.text == 'deliveryQty'">
                                        <el-input size="mini" v-model="arrivalPlanList[scope.index]['deliveryQty']" @blur="deliveryQtyBlur(arrivalPlanList[scope.index]['deliveryQty'])"></el-input>
                                    </div>
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
        doCreateCodPo
    } from '@/api/purchase/purchase-contract/purchase-contract-add'
// import {parseTime} from '@/filters/index.js';
//
import moment from "moment";
import NP from 'number-precision';
import {pickerOptions,calculateOrderDatail,amtTexBlur} from '@/util';
import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
import supplier from '@/components/common-select/supplier.vue'//供应商
import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
import StaffSelect from '@/components/common-select/staff-select.vue' //人员
import CurrencySelect from '@/components/common-select/currency-select.vue' //币别

// 付款方式
const paymentMethodHeaders = [
    {type:'selection', width:'50px'},
    { prop: 'pmRowNo', label:'序号', width: '55px',align:'center'},
    { prop: 'payType', label: '付款类型',align:'center', template: 'selectPayType',filter: true ,required: true, width: '160px' },
    { prop: 'timeType', label: '时间节点',align:'center' ,filter: 'selectTimeType', required: true , width: '160px'},
    { prop: 'payMode', label: '支付方式',align:'center' , template: 'selectPayMode',filter: true, required: true, width: '160px' },
    { prop: 'forwardDays', label: '远期天数',align:'center' ,editable: true, required: true , width: '130px'},
    // { prop: 'account', label: '票期',align:'center' ,editable: true },//新
    { prop: 'account', label: '票期',align:'center' ,template: 'account' , width: '120px'},//新
    // { prop: 'currencyName', label: '币种',align:'center'},
    { prop: 'orginAmtTex', label: '原币金额',align:'center',editable: true, required: true, width: '120px',digit:'2'},
    // { prop: 'proportion', label: '比列%',align:'center' },
    { prop: 'remark', label: '备注',align:'center' ,editable: true }
];

// 商品明细
const commodityDetailedHeaders = [
    { prop: 'radio', label: '#', width: '55px',template: 'radio',fixed:'left',align:'center'},
    { prop: 'poRowNo', label:'行号', width: '55px',align:'center'},
    { prop: 'goodsCode', label: '物料编号', width: '200px',align:'center' ,template: 'input' , required: true},
    { prop: 'goodsName', label: '物料名称', width: '120px',align:'center',required: true  },
    { prop: 'itemQty', label: '数量', width: '120px',align:'center',template: 'itemQty', required: true ,digit:'2'},
    { prop: 'unitName', label: '单位', width: '120px',align:'center'},
    { prop: 'packType', label: '包装方式', width: '120px',align:'center',template: 'selectPackType' , filter: true, required: true},//无
    { prop: 'orginPriceTex', label: '含税单价', width: '120px',align:'center',template: 'orginPriceTex', required: true,digit:'6'}, //无
    { prop: 'texRate', label: '税率', width: '120px',align:'center' ,template:'texRate', required: true,digit: '2'},
    { prop: 'orginPrice', label: '无税单价', width: '120px',align:'center',digit: '6'},
    { prop: 'orginAmtTex', label: '含税金额', width: '120px',align:'center',template:'orginAmtTex',digit: '2', required: true }, //无
    { prop: 'orginAmt', label: '税前金额', width: '120px',align:'center',digit: '2'}, //无
    { prop: 'orginTexAmt', label: '税额', width: '120px',align:'center',digit: '2'},
    { prop: 'deliveryMark', label: '到货关闭', width: '120px',align:'center',filter:'deliveryMark'},
    { prop: 'remark', label: '备注', width: '120px',align:'center',editable: true }
];

// 到货计划
const arrivalPlanHeaders = [
    // {type:'selection', width:'50px'},
    { prop: 'poDpRowNo', type:'poDpRowNo', label:'序号', width: '200px',align:'center', template: 'span'},
    { prop: 'deliveryDate', label: '交货日期', width: '483px',align:'center', template: 'deliveryDate', required: true,filter:'deliveryDate',dataType:'Date'},
    { prop: 'deliveryQty', label: '订单数量', width: '283px',align:'center' ,editable: true,required: true},
    { prop: 'remark', label: '备注',align:'center' ,editable: true},

];

export default {
    components:{
        ManagementSubject,//经营主体
        DepartmentSelect,//部门
        supplier,//供应商
        GoodsSelect,//物料编号
        StaffSelect,//人员
        CurrencySelect,//币种
    },
    data(){
        return {
            activeName:'first',
            searchBarFlg:true,
            activeName1:'first',
            // 抬头数据
            tempAll:{
                poNo:'',//系统单据号
                poContractNo:'',//采购合同号
                buyerName:'',//采购员
                poType:'73500005',//合同类型
                manageSubId:'',//经营主体id
                manageSubCode:'',//经营主体code
                manageSubName:'',//经营主体name
                bizOrgId:'',//部门id
                bizOrgCode:'',//部门code
                bizOrgName:'',//部门name
                supplierId:'',//供应商id
                supplierCode:'',//供应商code
                supplierName:'',//供应商name
                poStatus:'70200010',//合同状态
                lessQty:'',//溢短装数量
                signDate:'',//签署日期
                tradeZoneName:'',//贸易地区
                transType:'',//运输方式
                weightStandType:'',//计重标准
                deliveryDateStart:'',//交货期限始
                deliveryDateEnd:'',//交货日期止
                pickUpType:'',//提货方式
                //委托协议号
                auitTitle:'',//OA审核标题
                remark:'',//备注
                isBack:'1'
            },
            deliveryDate:[],//交货期限
            signDate:'',//签署日期
            //枚举
            poStatus:ENUMS['7020'],//合同状态
            transType:ENUMS['7120'],//运输方式
            weightStandType:ENUMS['7125'],//计重标准
            pickUpType:ENUMS['7130'],//提货方式
            poType:ENUMS['7350'],//合同类型
            rules:{
                poContractNo:[{required: true, message: ' ', trigger: 'blur' }],//采购合同号
                buyerName:[{required: true, message: ' ', trigger: 'blur'}],//采购员
                manageSubName:[{required: true, message: ' ', trigger: 'change'}],//经营主体
                bizOrgName:[{required: true, message: ' ', trigger: 'change'}],//部门
                supplierName:[{required: true, message: ' ', trigger: 'change'}],//供应商
                transType:[{required: true, message: ' ', trigger: 'change'}],//运输方式
                weightStandType:[{required: true, message: ' ', trigger: 'change'}],//计重标准
                pickUpType:[{required: true, message: '', trigger: 'change'}],//提货方式
                signDate:[{required: true, message: '', trigger: 'change',type:'date'}],//签署日期
                deliveryDateStart:[{required: true, message: ' ', trigger: 'change'}],//交货期限
            },
            isDepartment:true,//是否有公司
            transferSearchDepartment:{
                companyName:"",
                companyId:"",
                companyCode:"",
                boolToBtn:true,
            },
            isBack:false,//原价收回确认

            // 付款方式
            paymentMethodHeaders:paymentMethodHeaders,//付款方式表格数据
            paymentMethodList:[],
            payDeleteList:[],//删行数据
            payType:ENUMS['7140'],//付款类型
            timeType:ENUMS['7145'],//时间节点
            payMode:ENUMS['7210'],//支付方式
            payIndex:null,//选中当前行

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
            planList:[],//到货计划外层的数组
            packType:ENUMS['7135'],//包装方式
            addItemTable: '',   //增行所在表格
            addItemFlg: false,   //是否增行标志

            // 到货计划
            arrivalPlanHeaders:arrivalPlanHeaders,//到货计划表格数据
            arrivalPlanList:[],
            planDeleteList:[],//删行数据
            planCell:null,
            addStatus:true,
            codPoForm:null,
            codPoDtlCreateForms:[],
            codPoDtlForm:{},
            codPoDpForms:[],

            pickerOptions: {
                shortcuts: pickerOptions
            },
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 3600 * 1000 * 24;
                },
            },
            accountDisabled:true,//控制票期

        }
    },
    activated(){

    },
    created(){
        this.refresh();
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
    methods:{
        handleClick(){//头部tab切换

        },
        refresh(){
            this.tempAll = {
                poNo:'',//系统单据号
                poContractNo:'',//采购合同号
                buyerName:'',//采购员
                poType:'73500005',//合同类型
                manageSubId:'',//经营主体id
                manageSubCode:'',//经营主体code
                manageSubName:'',//经营主体name
                bizOrgId:'',//部门id
                bizOrgCode:'',//部门code
                bizOrgName:'',//部门name
                supplierId:'',//供应商id
                supplierCode:'',//供应商code
                supplierName:'',//供应商name
                poStatus:'70200010',//合同状态
                lessQty:'',//溢短装数量
                signDate:'',//签署日期
                tradeZoneName:'',//贸易地区
                transType:'',//运输方式
                weightStandType:'',//计重标准
                deliveryDateStart:'',//交货期限始
                deliveryDateEnd:'',//交货日期止
                pickUpType:'',//提货方式
                // rateCurrency:'',//对人民币汇率
                //委托协议号
                auitTitle:'',//OA审核标题
                remark:'',//备注
                isBack:'1'
            };
            this.arrivalPlanList = [];
            this.commodityDetailedList = [];
            // commodityDetailedHeaders = [];
            this.planList = [];
            this.deliveryDate = [];
            this.codPoDtlCreateForms = [];
            this.transferSearchDepartment.companyName = '';
            this.transferSearchDepartment.companyId = '';
            this.transferSearchDepartment.companyCode = '';
            this.isBack = false;
            this.isDepartment = true;
            this.accountDisabled = true;
            this.activeName = 'first';
        },


        // var o = {}
        // o[key] = val;

        handleClick1(tab,event){//底部tab切换
        },
        toSave(){//保存
            var vm = this;

            this.$refs['tempAll'].validate((valid) => {
                if (valid) {
                    if(this.commodityDetailedList.length == 0) {
                        this.$message({
                            message: '请至少添加一条商品明细再进行操作',
                            type: 'warning'
                        });
                        return;
                    };
                    if(this.paymentMethodList.length == 0) {
                        this.$message({
                            message: '请至少添加一条付款方式再进行操作',
                            type: 'warning'
                        });
                        return;
                    };
                    //商品明细
                    eventBus.$emit('validateTable', {
                        data: this.commodityDetailedList,    //表示表格数据
                        headers: this.commodityDetailedHeaders,   //表示表头数据
                        success: (valid)=>{   //成功回掉
                          if (valid) {
                            //校验通过后，代码书写处 到货计划
                            eventBus.$emit('validateTable', {
                                data: this.arrivalPlanList,    //表示表格数据
                                headers: this.arrivalPlanHeaders,   //表示表头数据
                                success: (valid)=>{   //成功回掉
                                    if (valid) {
                                    //付款方式
                                    eventBus.$emit('validateTable', {
                                        data: this.paymentMethodList, //表示表格数据
                                        headers: this.paymentMethodHeaders, //表示表头数据
                                        success: (valid) => { //成功回掉
                                            if (valid) {
                                                //校验通过后，代码书写处
                                                this.$confirm('您确认要新增吗?', '提示', {
                                                  confirmButtonText: '确定',
                                                  cancelButtonText: '取消',
                                                  type: 'warning',
                                                }).then(() => {
                                                    if(this.isBack == false){
                                                        this.tempAll.isBack = '1';
                                                    }else {
                                                        this.tempAll.isBack = '0';
                                                    };
                                                    // if(this.deliveryDate != '' && this.deliveryDate != null){
                                                    //     this.tempAll.deliveryDateStart = this.deliveryDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                                                    //     this.tempAll.deliveryDateEnd = this.deliveryDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
                                                    // };
                                                    let orginTex = 0;
                                                    this.paymentMethodList.map((x) => {
                                                        delete x.$index;
                                                        orginTex += Number(x.orginAmtTex);
                                                    });
                                                    this.sumAmt();
                                                    if(orginTex != Number(this.tempAll.orginTex)){
                                                        this.$message({
                                                            message: '付款方式原币金额汇总应等于商品明细含税金额汇总',
                                                            type: 'warning'
                                                        });
                                                        return;
                                                    }
                                                    if(this.tempAll.signDate != '' && this.tempAll.signDate != null){
                                                        this.tempAll.signDate = this.tempAll.signDate.parseTime ('YYYY-MM-DD HH:MM:SS');
                                                    };
                                                    this.planList.forEach((o,i) => {
                                                        o.forEach((obj,idx) => {
                                                            delete obj.$index;
                                                            obj.deliveryDate = obj.deliveryDate.parseTime ('YYYY-MM-DD HH:MM:SS');
                                                        });
                                                    });
                                                    console.log(this.planList,"this.planList");
                                                    this.codPoDtlCreateForms = [];
                                                    for(var i=0; i < this.commodityDetailedList.length; i++){
                                                        delete this.commodityDetailedList[i].$index;
                                                        this.codPoDtlCreateForms.push({
                                                            "codPoDtlForm": this.commodityDetailedList[i],
                                                            "codPoDpForms": vm.planList[i]
                                                        });
                                                    };
                                                    if(this.tempAll && this.codPoDtlCreateForms){
                                                        doCreateCodPo(this.tempAll,this.codPoDtlCreateForms,this.paymentMethodList).then(response =>{
                                                            if(response.data.status == 1) {
                                                                this.$notify({
                                                                  title: '成功',
                                                                  message: '新增成功！',
                                                                  type: 'success'
                                                                })
                                                                this.$store.dispatch('toggleCurrentView',{
                                                                    PurchaseContract: {
                                                                        view: 'index'
                                                                        // params: 跳转过去的子组件的属性对象
                                                                    }
                                                                })
                                                            }else{
                                                                this.dialogCancel();
                                                            }
                                                        })
                                                    }
                                                }).catch(() => {
                                                    this.dialogCancel();
                                                    this.$message({
                                                        type: 'info',
                                                        message: '已取消操作'
                                                    });
                                                });
                                            } else {
                                                //检验不通过的提示已统一加，这里可以不写代码
                                            }
                                        }
                                    })

                                     }else {
                                    //检验不通过的提示已统一加，这里可以不写代码
                                  }
                                }
                            })
                          }else {
                            //检验不通过的提示已统一加，这里可以不写代码
                          }
                        }
                    })
                } else {
                    this.$message({
                      message: '请完善必输字段',
                      type: 'warning'
                    });
                    return false;
                }
            });
        },
        toCancel(){//取消
            this.$refs['tempAll'].resetFields();
            this.refresh();
            // this.$router.push({path: '/purchase/PurchasContract/:type'});
            this.$store.dispatch('toggleCurrentView',{
                PurchaseContract: {
                    view: 'index'
                    // params: 跳转过去的子组件的属性对象
                }
            })
        },
        dialogCancel(){
            let vm = this;
            this.planList.forEach((o,i) => {
                o.forEach((obj,idx) => {
                    if (typeof (obj.deliveryDate) == 'string') {
                        obj.deliveryDate = new Date(obj.deliveryDate);
                    }
                });
            })
            if(typeof (this.tempAll.signDate) == 'string'){
                this.tempAll.signDate = new Date(this.tempAll.signDate);
            }
        },
        //***************抬头数据**************
        childEventHandlerMainInfo(val){//经营主体
            console.log(val);
            if(val){
                this.tempAll.manageSubId = val.companyId;
                this.tempAll.manageSubCode = val.companyCode;
                this.tempAll.manageSubName = val.companyName;
                this.$refs['tempAll'].validateField('manageSubName');

                this.isDepartment = false;
                this.transferSearchDepartment.companyName = val.companyName;
                this.transferSearchDepartment.companyId = val.companyId;
                this.transferSearchDepartment.companyCode = val.companyCode;

                this.tempAll.currencyName = val.currencyName;
                this.tempAll.currencyCode = val.currencyCode;
                this.tempAll.currencyId = val.currencyId;
                this.tempAll.rateCurrency = 1;
            } else {
                this.tempAll.manageSubId = '';
                this.tempAll.manageSubCode = '';
                this.tempAll.manageSubName = '';
                this.isDepartment = true;
                this.transferSearchDepartment.companyName = '';
                this.transferSearchDepartment.companyId = '';
                this.transferSearchDepartment.companyCode = '';

                this.tempAll.currencyName = '';
                this.tempAll.currencyCode = '';
                this.tempAll.currencyId = '';
            }
            this.tempAll.bizOrgId = '';
            this.tempAll.bizOrgCode = '';
            this.tempAll.bizOrgName = '';
            this.tempAll.supplierName = '';
            this.tempAll.supplierCode = '';
            this.tempAll.supplierId = '';

        },
        childEventHandlerStaff(val){
            if(val){
                this.tempAll.buyerName = val.userName;
                this.tempAll.buyerCode = val.userCode;
                this.tempAll.buyerId = val.userId;
                this.$refs['tempAll'].validateField('buyerName');
            } else {
                this.tempAll.buyerName = '';
                this.tempAll.buyerCode = '';
                this.tempAll.buyerId = '';
            }
        },
        childEventHandlerDepartment(val){//部门
            console.log(val);
            if(val){
                this.tempAll.bizOrgId = val.orgId;
                this.tempAll.bizOrgCode = val.orgCode;
                this.tempAll.bizOrgName = val.orgName;
                this.$refs['tempAll'].validateField('bizOrgName');
            } else {
                this.tempAll.bizOrgId = '';
                this.tempAll.bizOrgCode = '';
                this.tempAll.bizOrgName = '';
            }
        },
        getChildevent(val){//供应商
            console.log(val,"gongyings")
            if(val){
                this.tempAll.supplierName = val.supplyName;
                this.tempAll.supplierCode = val.supplyCode;
                this.tempAll.supplierId = val.supplyId;
                this.$refs['tempAll'].validateField('supplierName');
            }else {
                this.tempAll.supplierName = '';
                this.tempAll.supplierCode = '';
                this.tempAll.supplierId = '';
            }
        },
        getData(data){//供应商默认数据
            console.log(data,"gongyuh000000")
            this.tempAll.supplierCode = data.supplyCode;
            this.tempAll.supplierId = data.id;
            this.tempAll.supplierName = data.supplyName;
            this.$refs['tempAll'].validateField('supplierName');
        },

        // *************付款方式*************
        payTypeChange(){
            console.log(this.payIndex);
            var payType = this.paymentMethodList[this.payIndex].payType;
            if(payType == '71400010'){
                this.paymentMethodList[this.payIndex].timeType = '71450010';
            } else if(payType == '71400020'){
                this.paymentMethodList[this.payIndex].timeType = '71450020';
            } else if(payType == '71400030'){
                this.paymentMethodList[this.payIndex].timeType = '71450030';
            } else if(payType == '71400040'){
                this.paymentMethodList[this.payIndex].timeType = '71450040';
            };
            for(var i = 0; i < this.paymentMethodList.length; i++){
                if(this.payIndex != i){
                    if(payType == this.paymentMethodList[i].payType){
                        this.$message({
                            message: '付款方式不能选择相同的',
                            type: 'warning'
                        });
                        this.paymentMethodList[this.payIndex].payType = '';
                        this.paymentMethodList[this.payIndex].timeType = '';
                    }
                }
            }
        },
        payModeChange(){
            let payMode = this.paymentMethodList[this.payIndex].payMode;
            if(payMode == '72100020' || payMode == '72100030'){
                this.accountDisabled = false;
            } else {
                this.accountDisabled = true;
                this.paymentMethodList[this.payIndex].account = '';
            }
        },
        PayHandleCellClick(row){//单击列表
            this.payIndex = row.$index;
            this.payModeChange();
        },
        PayHandleSelectionChange(val){//复选框
            this.payDeleteList = val;
        },
        paymentMethodAddRow(tableName){//增行
            if(this.paymentMethodList.length > 3){
                this.$message({
                    message: '最多只能增加四条',
                    type: 'warning'
                });
                return;
            }
            let pmRowNo = 1;
            if(this.paymentMethodList.length >= 1){
                 pmRowNo = this.paymentMethodList[this.paymentMethodList.length-1].pmRowNo + 1;
            }
            let rowList = {
                pmRowNo:pmRowNo,
                pmType:'2',
                payType:'',
                timeType:'',
                payMode:'',
                forwardDays:'',
                account:'',
                orginAmtTex:'',
                remark:''
            };
            this.paymentMethodList.push(rowList);
            this.addItemFlg = true;
            this.addItemTable = tableName;
        },
        PaymentMethodDeleteRow(){//删行
            if(this.payDeleteList.length > 0){
                this.$confirm('您确认要删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    for (var i = 0; i < this.paymentMethodList.length; i++) {
                        for (var j = 0; j < this.payDeleteList.length; j++) {
                            if (this.payDeleteList[j] == this.paymentMethodList[i]) {
                              this.paymentMethodList.splice(i, 1);
                              i--;
                            }
                        }
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            } else {
                this.$message({
                    message: '请选择一行或多行进行删除',
                    type: 'warning'
                });
            }

        },
        // childEventHandlerCurrency(val){
        //     if(val){
        //         this.paymentMethodList[this.payIndex].currencyId = val.currencyId;//币别id
        //         this.paymentMethodList[this.payIndex].currencyCode = val.currencyCode;//币别code
        //         this.paymentMethodList[this.payIndex].currencyName = val.currencyName;//币别name
        //     }else {
        //         this.paymentMethodList[this.payIndex].currencyId = '';
        //         this.paymentMethodList[this.payIndex].currencyCode = '';
        //         this.paymentMethodList[this.payIndex].currencyName = '';
        //     }
        // },
        handleCellClick(){//单击列表

        },
        handleSelectionChange(val){//复选框
            this.deleteList = val;
            console.log(this.deleteList,'shanchu');
        },
        addRow(){//增行
            let rowList = {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            this.list.push(rowList);
        },
        deleteRow(){//删行
            if(this.deleteList.length > 0){
                for (var i = 0; i < this.list.length; i++) {
                    for (var j = 0; j < this.deleteList.length; j++) {
                        if (this.deleteList[j] == this.list[i]) {
                          this.list.splice(i, 1);
                          i--;
                        }
                    }
                }
            } else {
                this.$message({
                    message: '请选择一行或多行进行删除',
                    type: 'warning'
                });
            }

        },

        //*************相关文件********************
        submitUpload(){//上传
            // console.log(this.fileList,'dkjsfoauo');
            if(this.fileList.length == 0){
              this.$message({
                message: '请选择要进行上传的文件',
                type: 'warning'
              });
            }else {
              this.tableData.push(this.fileList[0]);
              let createTime = new Date();

              // console.log(this.fileList[0].raw.lastModifiedDate);
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

        //****************商品明细**************
        detailedAddRow(tableName){//增行
            let poRowNo = 1;
            if(this.commodityDetailedList.length >= 1){
                 poRowNo = this.commodityDetailedList[this.commodityDetailedList.length-1].poRowNo + 1;
            }
            let rowList = {
                poRowNo:poRowNo,
                goodsCode:'',
                goodsName:'',
                itemQty:'',
                unitName:'',
                orginPriceTex:'',
                orginPrice:'',
                orginAmtTex:'',
                baseAmtTex:'',
                basePriceTex:'0.000000',
                basePrice:'0.000000',
                orginAmt:'',
                baseAmt:'',
                texRate: 0.17,
                orginTexAmt:'',
                remark:''
            };
            this.commodityDetailedList.push(rowList);
            this.addItemFlg = true;
            this.addItemTable = tableName;
            this.planList.push([]);

        },
        detailedDeleteRow(){//删行
            if(this.radio){
                this.$confirm('您确认要删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    this.planList.splice(this.index,1);
                    this.commodityDetailedList.splice(this.index,1);
                    this.radio = null;
                    this.sumAmt();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });

            } else {
                this.$message({
                    message: '请选择一行进行删除',
                    type: 'warning'
                });
            }
        },
        detailedHandleCellClick(val){//单击列表
            this.radio = val.poRowNo;
            this.index = val.$index;
            this.addStatus = false;
            if(this.planList.length >= 0){
                this.arrivalPlanList = this.planList[this.index];
            }
        },
        detailedHandleSelectionChange(val){//复选框
            let vm=this;
            this.commodityDeleteList = val;
        },
        childEventHandlerGoods(val){//物料编号
            console.log(val,"val000000000");
            if(val){
                this.commodityDetailedList[this.index].goodsName = val.goodsName;
                this.commodityDetailedList[this.index].goodsCode = val.goodsCode;
                this.commodityDetailedList[this.index].goodsId = val.goodsId;
                this.commodityDetailedList[this.index].unitName = val.unitName;
                this.commodityDetailedList[this.index].unitCode = val.unitCode;
                this.commodityDetailedList[this.index].unitId = val.unitId;
                // goodsCode   goodsId
            }else {
                this.commodityDetailedList[this.index].goodsName = '';
                this.commodityDetailedList[this.index].goodsCode = '';
                this.commodityDetailedList[this.index].goodsId = '';
                this.commodityDetailedList[this.index].unitName = '';
                this.commodityDetailedList[this.index].unitCode = '';
                this.commodityDetailedList[this.index].unitId = '';
            }
        },
        priceTexToFixed(row){//含税单价
            if(row.orginPriceTex){
              row.orginPriceTex = Number(row.orginPriceTex).toFixed(6);//含税单价
            }
        },
        basePriceToFixed(row){//含税金额
            if(row.orginAmtTex){
                row.orginAmtTex = Number(row.orginAmtTex).toFixed(2);//含税金额
            }
        },
        texRateToFixed(row){//税率
            if(row.texRate){
                row.texRate = Number(row.texRate).toFixed(2);//税率
            }
            if(row.texRate > 1){
                this.$message({
                    message: '税率大于0小于1',
                    type: 'warning'
                });
                row.texRate = '';
            }
        },
        itemToFixed(row){
            if(row.itemQty){
                row.itemQty = Number(row.itemQty).toFixed(2);//数量
            }
        },
        //含税单价
        priceTexBlur(row){
          console.log(row);
            setTimeout(() => {
                var obj = calculateOrderDatail({"priceTex":row.orginPriceTex, 'num': row.itemQty, 'texRate': row.texRate});
                row.orginPrice = obj.price;//无税单价 price
                row.basePriceTex = row.orginPriceTex;
                row.basePrice = obj.price;
                row.orginTexAmt = obj.texAmt;//税额 texAmt
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.orginAmt = obj.amt;//税前金额 amt
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginAmtTex = obj.amtTex;//含税金额 amtTex
                this.sumAmt();
            }, 10);
        },
        texRateBlur(row){//税率

            setTimeout(() => {
                var obj = calculateOrderDatail({"priceTex":row.orginPriceTex, 'num': row.itemQty, 'texRate': row.texRate});
                row.basePrice = obj.price;
                row.basePriceTex = row.basePrice;
                row.orginPrice = obj.price;//无税单价 price
                row.orginTexAmt = obj.texAmt;//税额 texAmt
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.orginAmt = obj.amt;//税前金额 amt
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginAmtTex = obj.amtTex;//含税金额 amtTex
                this.sumAmt();
            }, 10);
        },
        basePriceBlur(row){//含税金额  amtTex: '',texRate: '',num: ''
            setTimeout(() => {
                var obj = amtTexBlur({'amtTex':row.orginAmtTex, 'texRate': row.texRate, 'num': row.itemQty});
                row.orginPrice = obj.price;//无税单价 price
                row.basePrice = obj.price;
                row.orginTexAmt = obj.texAmt;//税额 texAmt
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.orginAmt = obj.amt;//税前金额 amt
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginPriceTex = obj.priceTex;//含税单价 priceTex
                row.basePriceTex = obj.priceTex;
                this.sumAmt();
            },10)


        },
        itemQtyBlur(row){//数量

            setTimeout(() => {
                var obj = calculateOrderDatail({"priceTex":row.orginPriceTex, 'num': row.itemQty, 'texRate': row.texRate});
                row.basePrice = obj.price;
                row.orginPrice = obj.price;//无税单价
                row.orginTexAmt = obj.texAmt;//税额
                row.orginAmt = obj.amt;//税前金额
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginAmtTex = obj.amtTex;//含税金额
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.basePriceTex = obj.priceTex;
                this.sumAmt();
            }, 10);

        },
        //*************到货计划***************
        planAddRow(tableName){//增行
            let num = this.commodityDetailedList[this.index].itemQty;
            // if(num == null || num == ''){
            //     this.$message({
            //         message: '请先填写商品明细数量',
            //         type: 'warning'
            //     });
            //     return;
            // }
            // if(this.arrivalPlanList.length > num - 1){
            //     this.$message({
            //         message: '最多不能大于' + Number(num),
            //         type: 'warning'
            //     });
            //     return;
            // }
            let poDpRowNo = 0;
            for (var i = 0; i < this.arrivalPlanList.length; i++) {
                if (i == this.arrivalPlanList.length - 1 && this.arrivalPlanList[i].poDpRowNo) {
                    poDpRowNo = this.arrivalPlanList[i].poDpRowNo;
                }
            }
             let rowList = {
                poDpRowNo:poDpRowNo + 1,
                deliveryDate:'',
                deliveryQty: '',
                remark:''
            };
            this.arrivalPlanList.push(rowList);
            console.log(this.arrivalPlanList);
            this.addItemFlg = true;
            this.addItemTable = tableName;
        },
        planDeleteRow(){//删行
            // debugger;
            if(this.planCell != null){
                this.$confirm('您确认要删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    this.arrivalPlanList.splice(this.planCell, 1);
                    this.planCell = null;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            } else {
                this.$message({
                    message: '请选择一行或多行进行删除',
                    type: 'warning'
                });
            }

        },
        sumAmt(){//合计金额
            if(this.commodityDetailedList.length > 0){
                let orginAmt = 0;//税前金额
                let orginTex = 0;//含税金额
                let baseTexAmt = 0;//本币税额
                let orginTexAmt = 0;//原币税额
             // debugger;
                this.commodityDetailedList.forEach((o,i) => {
                    orginAmt += Number(o.orginAmt);
                    orginTex += Number(o.orginAmtTex);
                    baseTexAmt += Number(NP.minus(orginTex,orginAmt));
                    orginTexAmt += Number(NP.minus(orginTex,orginAmt));
                });
                this.tempAll.orginAmt = orginAmt.toFixed(2); //原币合计金额(不含税) amt
                this.tempAll.orginTex = orginTex.toFixed(2); //原币合计金额(含税)
                this.tempAll.baseAmtTex = orginAmt.toFixed(2); //本币合计金额(不含税)
                this.tempAll.baseAmt = orginTex.toFixed(2); //本币合计金额(含税)
                this.tempAll.baseTexAmt = baseTexAmt.toFixed(2);
                this.tempAll.orginTexAmt = orginTexAmt.toFixed(2);
            }
        },
        planHandleCellClick(val){
            this.planCell = val.$index;
        },
        planHandleSelectionChange(val){//复选框
            var vm = this;
            this.planDeleteList = val;
        },
        //选择时间
        handleChange(){
            // let deliveryDate = this.arrivalPlanList[this.planCell].deliveryDate = this.arrivalPlanList[this.planCell].deliveryDate.parseTime('YYYY-MM-DD');
            // let deliveryDate = this.arrivalPlanList[this.planCell].deliveryDate;
            // console.log('deliveryDate',this.arrivalPlanList[this.planCell].deliveryDate);
            // for(var i = 0; i < this.arrivalPlanList.length; i++){
            //     if(this.planCell != i){
            //         if(deliveryDate == this.arrivalPlanList[i].deliveryDate){
            //             this.$message({
            //                 message: '时间不能选择相同的',
            //                 type: 'warning'
            //             });
            //             this.arrivalPlanList[this.planCell].deliveryDate = '';
            //         }
            //     }
            // }
        },
        deliveryQtyBlur(){//订单数量
            let num = this.commodityDetailedList[this.index].itemQty;
            this.arrivalPlanList.map((x) => {
                let sum = 0;
                sum += Number(x.deliveryQty);
            })
            console.log('sum',sum);
            if(sum > num){
                this.$message({
                    message: '到货计划总数不能大于' + Number(num) + '请重新填写',
                    type: 'warning'
                });
            }
        },
    },
    watch:{
        deliveryDate:function(val){
            if(val != '' && val != null){
                this.tempAll.deliveryDateStart = this.deliveryDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.deliveryDateEnd = this.deliveryDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            }else{
                this.tempAll.deliveryDateStart = '';
                this.tempAll.deliveryDateEnd = '';
                console.log(this.tempAll.deliveryDateStart);
            }
        },
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
        }
    },

}
</script>
<style>
    .purchaseContract .top-from{
        margin-bottom:10px;
        height:197px;
    }
    .purchaseContract .planbtn{
        margin-bottom:6px;
    }
    .purchaseContract .el-popper[x-placement^=top] .popper__arrow::after{
        margin-left: 0px;
    }
    .purchaseContract .table-from .el-input__inner{
        height:24px;
        border-radius:0;
    }
    .purchaseContract .right-btn{
        float:right;
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
