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
                            <el-form ref="tempAll" label-width="80px" :model="tempAll" class="header-from"  :rules="rules">
                                <el-row :gutter="20">
                                    <el-col :span="6">
                                        <el-form-item label="系统单据号" prop="poNo">
                                            <el-input v-model="tempAll.poNo" size="mini" disabled></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="采购合同号" prop="poContractNo">
                                            <el-input v-model="tempAll.poContractNo" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="合同类型" prop="poType">
                                            <!-- <el-input v-model="tempAll.poType" size="mini"></el-input> -->
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
                                           <department-select  @childevent = "childEventHandlerDepartment" :disabled="isDepartment" :transferSearch="transferSearchDepartment" :querySelect="tempAll.bizOrgName" ></department-select>
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
                                        <el-form-item label="供应商" prop="supplierCode">
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
                                              placeholder=""
                                              :editable="false"
                                              size="mini">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="溢短装数量" prop="lessQty">
                                            <el-input v-number-only:10.abs="0"  v-model="tempAll.lessQty" size="mini"></el-input>
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
                                            <el-date-picker v-model="deliveryDate" type="daterange" :editable="false" start-placeholder="" :picker-options="pickerOptions" end-placeholder="" size="mini" >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                     <el-col :span="6">
                                        <el-form-item label="" prop="isBack">
                                            <el-form-item label="" prop="isConfirm">
                                                <el-checkbox v-model="isBack" :disabled="true">原件收回确认</el-checkbox></el-form-item>
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
                                      <!-- 时间节点 -->
                                     <!--  <div v-if="scope.text == 'selectTimeType'">
                                        <el-select v-model="paymentMethodList[scope.index]['timeType']" clearable placeholder="请选择" size="mini">
                                            <el-option v-for="(value,key) in timeType" :key="key" :label="value" :value="key"></el-option>
                                        </el-select>
                                      </div> -->
                                      <!-- 支付方式 -->
                                      <div v-if="scope.text == 'selectPayMode'">
                                        <el-select v-model="paymentMethodList[scope.index]['payMode']" clearable placeholder="请选择" size="mini"  @change="payModeChange">
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
                            <el-form ref="form" label-width="110px" :model="tempAll" style="margin-top:16px" class="header-from">
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
                                               <el-date-picker
                                                  v-model="tempAll.createdTime"
                                                  type="datetime"
                                                  placeholder=""
                                                  style="width: 100%;"
                                                  size="mini"
                                                  format="yyyy-MM-dd HH:mm:ss"
                                                  :disabled="true">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="修改时间" prop="updatedTime">
                                            <el-col :span="18">
                                                <el-date-picker
                                                  v-model="tempAll.updatedTime"
                                                  type="datetime"
                                                  placeholder=""
                                                  style="width: 100%;"
                                                  size="mini"
                                                  format="yyyy-MM-dd HH:mm:ss"
                                                  :disabled="true">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="审核时间" prop="postDate">
                                            <el-col :span="18">
                                                <el-date-picker
                                                  v-model="tempAll.postDate"
                                                  type="datetime"
                                                  placeholder=""
                                                  style="width: 100%;"
                                                  size="mini"
                                                  format="yyyy-MM-dd HH:mm:ss"
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
                                    <el-checkbox :disabled="true" :checked="deliveryMark"></el-checkbox>
                                </div>
                            </template>
                            <template slot-scope="scope" slot="default">
                                <div v-if="scope.text == 'radio'" class="tab-radio">
                                    <el-radio-group v-model="radio">
                                        <el-radio :label="commodityDetailedList[scope.index]['poRowNo']"></el-radio>
                                    </el-radio-group>

                                    <!-- <el-radio v-model="radio"></el-radio> -->
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
                                    <el-input v-number-only:10.abs="2" v-model.number="commodityDetailedList[scope.index]['itemQty']" size='mini'  @input="itemQtyBlur(commodityDetailedList[scope.index])"></el-input>
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
               <!--          <div style="margin-top:10px">
                            <el-pagination
                              @size-change="detailedHandleSizeChange"
                              @current-change="detailedDandleCurrentChange"
                              :current-page="listQuery.currentPage"
                              :page-sizes="[10, 20, 30,50]"
                              :page-size="listQuery.pageSize"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="total">
                            </el-pagination>
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
                                      <span>{{arrivalPlanList[scope.index]['deliveryDate'] | parseTime('{y}-{m}-{d}')}}</span>
                                    </div>
                                </template>
                                <template slot-scope="scope">
                                    <div v-if="scope.text == 'deliveryDate'">
                                        <el-date-picker size="mini" v-model="arrivalPlanList[scope.index]['deliveryDate']" type="date" placeholder="" @change="handleChange" ref="datePicker">
                                        </el-date-picker>
                                    </div>
                                    <div v-if="scope.text == 'input10'">
                                        <el-input size="mini" v-model="arrivalPlanList[scope.index]['deliveryQty']"></el-input>
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
        doQueryCodPoWithDtl,//获取数据
        doUpdateCodPo,//修改接口
        doQueryDpByDtlId,//查询到货计划
    } from '@/api/purchase/purchase-contract/purchase-contract-edit';
import {pickerOptions,calculateOrderDatail,amtTexBlur} from '@/util';
import NP from 'number-precision';
import { parseTime } from '@/filters/index.js'
// import
import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
import supplier from '@/components/common-select/supplier.vue'//供应商
import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
import StaffSelect from '@/components/common-select/staff-select.vue' //人员
import CurrencySelect from '@/components/common-select/currency-select.vue' //币别

// 付款方式
const paymentMethodHeaders = [
    {type:'selection', width:'50px',fixed:'left'},
    { prop: 'pmRowNo', label:'序号', width: '55px',align:'center'},
    { prop: 'payType', label: '付款类型',align:'center', template: 'selectPayType',filter: true ,required: true },
   { prop: 'timeType', label: '时间节点',align:'center' ,filter: 'selectTimeType', required: true },
    { prop: 'payMode', label: '支付方式',align:'center', template: 'selectPayMode',filter: true, required: true },
    { prop: 'forwardDays', label: '远期天数',align:'center' ,editable: true, required: true },
    { prop: 'account', label: '票期',align:'center' ,template: 'account' },//新
    // { prop: 'currencyName', label: '币种',align:'center' ,template: 'currencyName' ,},
    { prop: 'orginAmtTex', label: '原币金额',align:'center',editable: true, required: true,digit:'2'},
    // { prop: 'proportion', label: '比列%',align:'center' },
    { prop: 'remark', label: '备注',align:'center' ,editable: true }
];

// 商品明细
const commodityDetailedHeaders = [
    { prop: 'radio', label: '#', width: '55px',template: 'radio',fixed:'left',align:'center'},
    { prop: 'poRowNo', label:'行号', width: '55px',align:'center'},
    { prop: 'goodsCode', label: '物料编号', width: '200px',align:'center' ,template: 'input' , required: true},
    { prop: 'goodsName', label: '物料名称', width: '120px',align:'center',required: true  },
    { prop: 'itemQty', label: '数量', width: '120px',align:'center',template: 'itemQty', required: true,digit:'2'  },
    { prop: 'unitName', label: '单位', width: '120px',align:'center'},
    { prop: 'packType', label: '包装方式', width: '120px',align:'center',template: 'selectPackType' , filter: true, required: true},//无
    { prop: 'orginPriceTex', label: '含税单价', width: '120px',align:'center',template: 'orginPriceTex', required: true,digit:'6'}, //无
    { prop: 'texRate', label: '税率', width: '120px',align:'center' ,template:'texRate', required: true,digit:'2'},
    { prop: 'orginPrice', label: '无税单价', width: '120px',align:'center',digit:'6'},
    { prop: 'orginAmtTex', label: '含税金额', width: '120px',align:'center',template:'orginAmtTex',required: true,digit:'2'}, //无
    { prop: 'orginAmt', label: '税前金额', width: '120px',align:'center',digit:'2'}, //无
    { prop: 'orginTexAmt', label: '税额', width: '120px',align:'center',digit:'2'},
    { prop: 'deliveryMark', label: '发货关闭', width: '120px',align:'center',filter:'deliveryMark'},
    { prop: 'remark', label: '备注', width: '120px',align:'center',editable: true }
];

// 到货计划
const arrivalPlanHeaders = [
    {type:'selection', width:'50px',fixed:'left'},
     { prop: 'poDpRowNo', type:'poDpRowNo', label:'序号', width: '200px',align:'center', template: 'span'},
    { prop: 'deliveryDate', label: '交货日期', width: '483px',align:'center',filter:true, template: 'deliveryDate',required: true },
    // { prop: 'orginTexAmt', label: '交货日期', width: '532px',align:'center',dataType:'Date', template: 'orginTexAmt',required: true },
    { prop: 'deliveryQty', label: '订单数量', width: '283px',align:'center' ,editable: true,required: true},
    { prop: 'remark', label: '备注',align:'center' ,editable: true},

];

export default {
    components:{
        ManagementSubject,//经营主体
        DepartmentSelect,//部门
        supplier,//供应商
        GoodsSelect,//物料编号
        StaffSelect,//采购员
        CurrencySelect,//币种
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
                poContractNo:'',//采购合同号
                buyerName:'',//采购员name
                buyerCode:'',//采购员code
                buyerId:'',//采购员id
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
                isBack:'',//收回原件确认
                remark:'',//备注
            },
            activeName:'first',
            searchBarFlg:true,
            deliveryDate:[],//交货期限
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
                pickUpType:[{required: true, message: ' ', trigger: 'change'}],//提货方式
                signDate:[{required: true, message: ' ', trigger: 'change',type:'date'}],//签署日期
                deliveryDateStart:[{required: true, message: ' ', trigger: 'change'}],//交货期限
            },

            // 付款方式
            paymentMethodHeaders:paymentMethodHeaders,//付款方式表格数据
            paymentMethodList:[],
            payDeleteList:[],//删行数据
            payType:ENUMS['7140'],//付款类型
            timeType:ENUMS['7145'],//时间节点
            payMode:ENUMS['7210'],//支付方式
            payIndex:null,

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
            planList:[],//到货计划外层的数组
            codPoDtlIdDels:[],//商品明细删除的id
            daleteId:null,//选中当前行的id
            poDtlId:null,
            packType:ENUMS['7135'],//包装方式
            addItemTable: '',   //增行所在表格
            addItemFlg: false,   //是否增行标志
            isDepartment:false,

            // 到货计划
            arrivalPlanHeaders:arrivalPlanHeaders,//到货计划表格数据
            arrivalPlanList:[],
            planDeleteList:[],//删行数据
            codPoDpIdDels:[],//到货计划删除的id
            addStatus:true,//创建按钮状态
            codPoForm:null,
            codPoDtlCreateForms:[],
            codPoDtlForm:{},
            codPoDpForms:[],
            pmDels:[],//删除付款方式id

            poId:null,//获取数据id
            pickerOptions: {
                shortcuts: pickerOptions
            },
            planCell:null,

            codPoDpVOs:[],
            deliveryMark:false,
            isBack:false,//原件收回确认
            transferSearchDepartment:{
                companyName:"",
                companyId:"",
                companyCode:"",
                boolToBtn:true,
            },
            accountDisabled:false,//控制票期
        }
    },
    created(){
        this.getList();
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
        getList(){
          if(this.$route.query){
            // this.poId = this.$route.query.updateId;
            this.poId = this.$store.getters.params.PurchaseContract.updateId;
            this.activeName = 'first';
            this.deliveryDate = [];//清空数组
            this.addStatus = true;
            doQueryCodPoWithDtl(this.poId).then(response => {
              if(response.data.status == 1){
                var headerForm = response.data.data.codPoVO;
                if(headerForm != null){
                  //抬头数据
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
                    currencyName:headerForm.currencyName,//币别name
                    currencyCode:headerForm.currencyCode,//币别name
                    currencyId:headerForm.currencyId,//币别name
                    rateCurrency:headerForm.rateCurrency,//汇率
                    poStatus:headerForm.poStatus,//合同状态
                    lessQty:headerForm.lessQty,//溢短装数量
                    signDate:headerForm.signDate,//签署日期
                    tradeZoneName:headerForm.tradeZoneName,//贸易地区
                    transType:headerForm.transType,//运输方式
                    weightStandType:headerForm.weightStandType,//计重标准
                    deliveryDateStart:headerForm.deliveryDateStart,//交货期限始
                    deliveryDateEnd:headerForm.deliveryDateEnd,//交货日期止
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
                    orginAmt:headerForm.orginAmt,
                    orginTex:headerForm.orginTex,
                    baseAmtTex:headerForm.baseAmtTex,
                    baseAmt:headerForm.baseAmt,
                    baseTexAmt:headerForm.baseTexAmt,
                    orginTexAmt:headerForm.orginTexAmt,
                  };
                  if(this.tempAll.deliveryDateStart != null && this.tempAll.deliveryDateEnd != null){
                    this.deliveryDate.push(this.tempAll.deliveryDateStart);
                    this.deliveryDate.push(this.tempAll.deliveryDateEnd);
                  }
                  this.tempAll.poStatus = String(this.tempAll.poStatus);
                  this.tempAll.transType = String(this.tempAll.transType);
                  this.tempAll.poType = String(this.tempAll.poType);
                  this.tempAll.weightStandType = String(this.tempAll.weightStandType);
                  if(this.tempAll.pickUpType != null){
                    this.tempAll.pickUpType = String(this.tempAll.pickUpType);
                  }else {
                    this.tempAll.pickUpType = '';
                  }
                };
                if(this.tempAll.isBack == '1'){
                  this.isBack = false;
                } else if(this.tempAll.isBack == '0'){
                  this.isBack = true;
                }

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
                    "texRate":o.texRate,
                    "orginPrice":o.orginPrice,
                    "orginAmt":o.orginAmt,
                    "baseAmt":o.baseAmt,
                    "orginAmtTex":o.orginAmtTex,
                    "baseAmtTex":o.baseAmtTex,
                    "basePriceTex":o.basePriceTex,
                    "basePrice":o.basePrice,
                    "orginTexAmt":o.orginTexAmt,
                    "deliveryMark":o.deliveryMark,
                    "remark":o.remark,
                    "version":o.version
                    })
                  })
                };
                //到货计划
                let list = response.data.data.codPoDpVOs;
                this.codPoDpVOs = [];
                if(list != null && list.length > 0 ){
                  list.forEach((o,i) => {
                    this.codPoDpVOs.push({
                     "poDpId":o.poDpId,
                     "poDtlId":o.poDtlId,
                     "poDpRowNo":o.poDpRowNo,
                     "deliveryDate":o.deliveryDate,
                     "deliveryQty":o.deliveryQty,
                     "version":o.version,
                     "remark":o.remark
                    })
                  })
                };
                //付款方式
                let codPmVOs = response.data.data.codPmVOs;
                console.log(codPmVOs,"codPmVOs")
                this.paymentMethodList = [];
                if(codPmVOs != null && codPmVOs.length > 0 ){
                    codPmVOs.forEach((o,i) => {
                        this.paymentMethodList.push({
                          'pmId':o.pmId,//表id
                          'relateId':o.relateId,//关联id
                          'pmRowNo':o.pmRowNo,
                          'pmType':o.pmType,
                          'payType':o.payType.toString(),
                          'timeType':o.timeType,
                          'payMode':o.payMode.toString(),
                          'forwardDays':o.forwardDays,
                          'account':o.account,
                          // 'currencyCode':o.currencyCode,
                          // 'currencyId':o.currencyId,
                          // 'currencyName':o.currencyName,
                          'orginAmtTex':o.orginAmtTex,
                          'remark':o.remark,
                          'version':o.version
                        })
                    });
                }

                console.log(this.paymentMethodList[0].pmType,"11111111");
                console.log(typeof this.paymentMethodList[0].pmType);

                if(this.commodityDetailedList.length > 0 && this.commodityDetailedList != null){
                  for(var codDtl of this.commodityDetailedList) {
                    this.planData[codDtl.poRowNo] = [];
                    for(var codDp of this.codPoDpVOs) {
                      if (codDp.poDtlId == codDtl.poDtlId) {
                        this.planData[codDtl.poRowNo].push(codDp);
                      };
                    }
                  }
                  this.commodityDetailedList.forEach((o,i) => {
                    if(o.deliveryMark == 0){
                      this.deliveryMark = true;
                    }else if(o.deliveryMark == 1){
                      this.deliveryMark = false;
                    }
                  })
                };
              }
            })
          }
        },
        handleClick(){//头部tab切换

        },
        handleClick1(tab,event){//底部tab切换
        },
        toSave(){//保存
            // this.$router.push({path: '/purchase/PurchasContract/:type'});
          var vm = this;
          this.$refs['tempAll'].validate((valid) => {
            if (valid) {
              eventBus.$emit('validateTable', {
                data: this.commodityDetailedList, //表示表格数据
                headers: this.commodityDetailedHeaders, //表示表头数据
                success: (valid) => { //成功回掉
                  if (valid) {
                  //校验通过后，代码书写处
                    eventBus.$emit('validateTable', {
                      data: this.arrivalPlanList, //表示表格数据
                      headers: this.arrivalPlanHeaders, //表示表头数据
                      success: (valid) => { //成功回掉
                        if (valid) {
                        //校验通过后，代码书写处
                          eventBus.$emit('validateTable', {
                            data: this.paymentMethodList, //表示表格数据
                            headers: this.paymentMethodHeaders, //表示表头数据
                            success: (valid) => { //成功回掉
                              if (valid) {
                                //校验通过后，代码书写处
                                this.$confirm('您确认要修改吗?', '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning',
                                }).then(() => {
                                  if(this.isBack == false){
                                      this.tempAll.isBack = '1';
                                  }else {
                                      this.tempAll.isBack = '0';
                                  }
                                   if(this.deliveryDate != '' && this.deliveryDate != null){
                                      this.tempAll.deliveryDateStart = this.deliveryDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                                      this.tempAll.deliveryDateEnd = this.deliveryDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
                                  };
                                  if(this.tempAll.signDate != '' && this.tempAll.signDate != null){
                                    this.tempAll.signDate = this.tempAll.signDate.parseTime ('YYYY-MM-DD HH:MM:SS');
                                  };
                                  for(var i in this.planData){
                                    console.log(this.planData[i],"this.planData[i]");
                                    this.planData[i].forEach((o,i) => {
                                      console.log(o,"this.planData[i]");
                                      delete o.$index;
                                      o.deliveryDate = o.deliveryDate.parseTime ('YYYY-MM-DD HH:MM:SS');
                                    })
                                  }
                                  console.log(this.planData,"this.planData");
                                  this.codPoDtlCreateForms = [];
                                  if(this.commodityDetailedList.length > 0){
                                    for(var i=0; i < this.commodityDetailedList.length; i++){
                                      delete this.commodityDetailedList[i].$index;
                                      var index = this.commodityDetailedList[i].poRowNo;
                                      this.codPoDtlCreateForms.push({
                                        "codPoDtlForm": this.commodityDetailedList[i],
                                        "codPoDpForms": vm.planData[index]
                                      });
                                    };
                                  };
                                  //付款方式
                                    let orginTex = 0;
                                    this.paymentMethodList.map((x) => {
                                        delete x.$index;
                                        orginTex += Number(x.orginAmtTex);
                                    })
                                    this.sumAmt();
                                     if(orginTex != Number(this.tempAll.orginTex)){
                                        this.$message({
                                            message: '付款方式原币金额汇总应等于商品明细含税金额汇总'+this.tempAll.orginTex,
                                            type: 'warning'
                                        });
                                        return;
                                    }
                                  if(this.tempAll && this.codPoDtlCreateForms && this.codPoDtlIdDels && this.codPoDpIdDels){
                                    doUpdateCodPo(this.tempAll,this.codPoDtlCreateForms,this.codPoDtlIdDels,this.codPoDpIdDels,this.pmDels,this.paymentMethodList).then(response =>{
                                        if(response.data.status == 1) {
                                          this.$notify({
                                            title: '成功',
                                            message: '修改成功！',
                                            type: 'success'
                                          });
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
                                    this.$message({
                                        type: 'info',
                                        message: '已取消操作'
                                    });
                                    this.dialogCancel();
                                });
                              } else {
                                //检验不通过的提示已统一加，这里可以不写代码
                              }
                            }
                          })
                        } else {
                            //检验不通过的提示已统一加，这里可以不写代码
                        }
                      }
                    })
                  } else {
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
          })
        },
        toCancel(){//取消
            // this.$router.push({path: '/purchase/PurchasContract/:type'});
          this.$store.dispatch('toggleCurrentView', {
            PurchaseContract: {
              view: 'index'
            // params: 跳转过去的子组件的属性对象
            }
          });
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
        //****************抬头数据*********************
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
            }else {
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
            this.tempAll.bizOrgName = '';
            this.tempAll.bizOrgId = '';
            this.tempAll.bizOrgCode = '';
            this.tempAll.supplierName = '';
            this.tempAll.supplierCode = '';
            this.tempAll.supplierId = '';
        },
        childEventHandlerDepartment(val){//部门
            console.log(val);
            if(val){
                this.tempAll.bizOrgId = val.orgId;
                this.tempAll.bizOrgCode = val.orgCode;
                this.tempAll.bizOrgName = val.orgName;
                this.$refs['tempAll'].validateField('bizOrgName');
            }else {
                this.tempAll.bizOrgId = '';
                this.tempAll.bizOrgCode = '';
                this.tempAll.bizOrgName = '';
            }
        },
        getChildevent(val){//供应商
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
        getData(data){//供应商
              this.tempAll.supplierCode = data.supplyCode;
              this.tempAll.supplierId = data.id;
              this.tempAll.supplierName = data.supplyName;
              this.$refs['tempAll'].validateField('supplierName');
        },
        childEventHandlerStaff(val){//采购员
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

        // **********付款方式*****************
        payTypeChange(){
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
        PayHandleSelectionChange(val){//复选框
            this.payDeleteList = val;
        },
        paymentMethodAddRow(tableName){
            let pmRowNo = 1;
            if(this.paymentMethodList.length >= 1){
                pmRowNo = this.paymentMethodList[this.paymentMethodList.length-1].pmRowNo + 1;
            }
            let rowList = {
                pmRowNo:pmRowNo,
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
        PaymentMethodDeleteRow(){
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
                    this.pmDels = [];
                    this.payDeleteList.map((x) => {
                        if(x.pmId){
                            this.pmDels.push(x.pmId);
                        }
                    })
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
        handleSelectionChange(val){//复选框
            this.deleteList = val;
            console.log(this.deleteList,'shanchu');
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

        //*******************商品明细******************
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
                basePriceTex:'',
                basePrice:'',
                orginAmt:'',
                baseAmt:'',
                texRate: '0.17',
                orginTexAmt:'',
                baseAmtTex:'',
                remark:''
            };
            this.commodityDetailedList.push(rowList);
            this.planData[rowList.poRowNo] = [];
            this.addItemFlg = true;
            this.addItemTable = tableName;
            console.log(this.planData,'rowList.poRowNo');
          // console.log(this.planList,"this.planList");
        },
        detailedDeleteRow(){//删行
            if(this.radio){
                this.$confirm('您确认要删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    // this.planList.splice(this.index,1);
                    delete this.planData[this.index];
                    this.commodityDetailedList.splice(this.index,1);
                    this.codPoDtlIdDels = [];
                    if(this.poDtlId){
                        this.codPoDtlIdDels.push(this.poDtlId);
                    };
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
            console.log('单击列表',val);
            this.radio = val.poRowNo;
            this.addStatus = false;
            this.index = val.$index;
            this.daleteId = val.poId;
            this.poDtlId = val.poDtlId;

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
            if(row.orginAmt){
                row.orginAmt = Number(row.orginAmt).toFixed(2);//含税金额
            }
        },
        texRateToFixed(row){
            if(row.texRate){
                row.texRate = Number(row.texRate).toFixed(2);//含税单价
            }
            if(row.texRate > 1){
                this.$message({
                    message: '税率大于0小于1',
                    type: 'warning'
                });
                rwo.texRate = '';
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
            },10)
        },
        texRateBlur(row){//税率
            setTimeout(() => {
                var obj = calculateOrderDatail({"priceTex":row.orginPriceTex, 'num': row.itemQty, 'texRate': row.texRate});
                row.basePrice = obj.price;
                row.basePriceTex = row.orginPriceTex;
                row.orginPrice = obj.price;//无税单价 price
                row.orginTexAmt = obj.texAmt;//税额 texAmt
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.orginAmt = obj.amt;//税前金额 amt
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginAmtTex = obj.amtTex;//含税金额 amtTex
                this.sumAmt();
            },10)

        },
        basePriceBlur(row){//含税金额  amtTex: '',texRate: '',num: ''
            setTimeout(() => {
                var obj = amtTexBlur({'amtTex':row.orginAmt, 'texRate': row.texRate, 'num': row.itemQty});
                row.orginPrice = obj.price;//无税单价 price
                row.basePrice = obj.price;
                row.orginTexAmt = obj.texAmt;//税额 texAmt
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.orginAmt = obj.amt;//税前金额 amt
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginPriceTex = obj.priceTex;//含税单价 priceTex
                row.basePriceTex = obj.priceTex;
                this.sumAmt();
            },10);

        },
        itemQtyBlur(row){//数量
            setTimeout(() => {
                var obj = calculateOrderDatail({"priceTex":row.orginPriceTex, 'num': row.itemQty, 'texRate': row.texRate});
                row.basePrice = obj.price;
                row.orginPrice = obj.price;//无税单价
                row.orginTexAmt = obj.texAmt;//税额
                row.baseAmtTex = row.orginAmtTex;//含税金额(本币)
                row.orginAmt = obj.amt;//税前金额
                row.baseAmt = row.orginAmt;//税前金额(本币)
                row.orginAmtTex = obj.amtTex;//含税金额
                row.basePriceTex = obj.priceTex;
                this.sumAmt();
            },10);

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
            this.tempAll.baseAmtTex = orginAmt.toFixed(2); //原币合计金额(不含税)
            this.tempAll.baseAmt = orginTex.toFixed(2); //原币合计金额(含税)
            this.tempAll.baseTexAmt = baseTexAmt.toFixed(2);
            this.tempAll.orginTexAmt = orginTexAmt.toFixed(2);
          }
        },
        //****************到货计划*******************
        planAddRow(tableName){//增行
            if(this.radio){
                let poDpRowNo = 1;
                if(this.arrivalPlanList.length >= 1){
                    poDpRowNo = this.arrivalPlanList[this.arrivalPlanList.length-1].poDpRowNo + 1;
                }
                let rowList = {
                    poDpRowNo:poDpRowNo,
                    deliveryDate: '',
                    deliveryQty: '',
                    remark:''
                };
                this.arrivalPlanList.push(rowList);
                // debugger;
                console.log(this.arrivalPlanList);
                this.addItemFlg = true;
                this.addItemTable = tableName;
            }
        },
        planDeleteRow(){//删行
            if(this.planDeleteList.length > 0){
                if(this.planCell != null){
                    this.$confirm('您确认要删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                        this.arrivalPlanList.splice(this.planCell, 1);
                        this.planCell = null;
                        this.codPoDpIdDels = [];
                        this.planDeleteList.forEach((o,i) => {
                            if(o.poDpId){
                                this.codPoDpIdDels.push(o.poDpId);
                            }
                        })
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
            } else {
                this.$message({
                  message: '请选择一行或多行进行删除',
                  type: 'warning'
                });
            }
        },
        planHandleCellClick(){

        },
        planHandleSelectionChange(val){//复选框
            var vm = this;
            this.planDeleteList = val;

            console.log(val,'到货计划');
        },
        handleChange(){

        }


    },
    watch:{
        deliveryDate:function(val){
            console.log(val,"val");
            if(val != '' && val != null){
                this.tempAll.deliveryDateStart = this.deliveryDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.deliveryDateEnd = this.deliveryDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            }else{
                this.tempAll.deliveryDateStart = '';
                this.tempAll.deliveryDateEnd = '';
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
        /* border-bottom:1px solid #ccc; */
        margin-bottom:10px;
        height:197px;
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
    .purchaseContract .table-from .el-input__inner{
        height:24px;
        border-radius:0;
    }
    .purchaseContract .tab-radio .el-radio__label{
        /* padding-left: 32px; */
        display:none;
    }
</style>
