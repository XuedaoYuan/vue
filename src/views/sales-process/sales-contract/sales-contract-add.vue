<template>
  <div class="allTemplate">
    <div>
      <el-button type="primary" size="small" @click="save">保 存</el-button>
      <el-button type="info" size="small" @click="toCancel">取 消</el-button>
      <el-button type="primary" size="small" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="small" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
        <div v-show="searchBarFlg" class="heightOfHeader">
          <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="抬头数据" name="first">
                <el-form ref="headerDataForm" label-width="80px" :model="headerData" :rules="rules">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="系统单据号" prop="soNo">
                          <el-input v-model="headerData.soNo" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="销售合同号" prop="soContractNo">
                          <el-input v-model="headerData.soContractNo" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="业务员" prop="buyerName">
                          <!-- <el-input v-model="headerData.buyerName" size="mini" ></el-input> -->
                          <staff-select @childevent="childEventHandlerStaff" :querySelect="headerData.buyerName"></staff-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="溢短装数量" prop="lessQty">
                          <el-input v-model="headerData.lessQty" size="mini" v-number-only:10.abs="2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                        <el-form-item label="经营主体" prop="manageSubName">
                            <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="headerData.manageSubName"></management-subject>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="合同质量要求" prop="contractQuality">
                          <el-input v-model="headerData.contractQuality" size="mini"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门" prop="bizOrgName">
                            <department-select @childevent="childEventHandlerDepartment" :disabled='ifEditDepartment' :transferSearch="transferSearchDepartment" :querySelect="headerData.bizOrgName"></department-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="签署日期" prop="signDate">
                          <el-date-picker v-model="signDate" :editable="false" type="date" size='mini' placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                          <el-form-item label="客户" prop="customerName">
                              <!-- <el-input v-model="headerData.customerName" size="mini" ></el-input> -->
                              <customer-select @childevent="childEventHandlerCustomerHeader" :querySelect="headerData.customerName" :disabled='ifEditDepartment' :transferSearch="transferSearchDepartment"></customer-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="合同来源" prop="sourceType">
                              <!-- <el-input v-model="headerData.sourceType" size="mini" ></el-input> -->
                              <el-select v-model="headerData.sourceType" placeholder="请选择" disabled size="mini">
                              <el-option v-for="(val, key) in sourceType" :key="key" :label="val" :value="key">
                              </el-option>
                            </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="交货日期" prop="deliveryDate">
                              <el-date-picker v-model="deliveryDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" :editable="false">
                              </el-date-picker>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="运输方式" prop="transType">
                              <el-select v-model="headerData.transType" placeholder="请选择" size="mini" clearable>
                                <el-option v-for="(val, key) in transType" :key="key" :label="val" :value="key">
                              </el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                          <el-form-item label="币别" prop="currencyName">
                              <currency-select @childevent="childEventHandlerCurrency" :querySelect="headerData.currencyName"></currency-select>
                              <!-- <el-input v-model="headerData.currencyName" size="mini"></el-input> -->
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="合同数量" prop="contractQty">
                            <el-input v-model="headerData.contractQty" size="mini" disabled></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="计重标准" prop="weightStandType">
                            <el-select v-model="headerData.weightStandType" placeholder="请选择" size="mini" clearable>
                              <el-option v-for="(val, key) in weightStandType" :key="key" :label="val" :value="key">
                              </el-option>
                            </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="" prop="isConfirm">
                            <el-checkbox v-model="isConfirm" disabled>客户确认</el-checkbox></el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                          <el-form-item label="汇率" prop="rateCurrency">
                            <el-input v-model="headerData.rateCurrency" size="mini" disabled></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="OA审核标题" prop="auitTitle">
                            <el-input v-model="headerData.auitTitle" size="mini"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="合同状态" prop="soStatus">
                            <el-input value="开立" size="mini" disabled></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="" prop="isBack">
                            <el-checkbox v-model="isBack" disabled>原件收回确认</el-checkbox></el-form-item>
                      </el-col>
                  </el-row>
                  <el-row style="margin-bottom:12px">
                      <el-col :span="24">
                          <el-form-item label="备注" prop="remark" class="elColWidth24">
                            <el-input v-model="headerData.remark" size="mini" ></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="开票信息" name="second">
              <el-form ref="invoiceInfo" label-width="90px" :model="headerData" :rules="rules">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开票方" prop="invoiceName">
                        <customer-select @childevent="childEventHandlerCustomer" :querySelect="headerData.invoiceName" :disabled='ifEditDepartment' :transferSearch="transferSearchDepartment"></customer-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开票方地址" prop="invoiceAddress">
                        <el-input v-model="headerData.invoiceAddress" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开票方银行账号" prop="invoiceAccount">
                        <el-input v-model="headerData.invoiceAccount" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开票方开户行" prop="invoiceBank">
                        <el-col>
                        <el-input v-model="headerData.invoiceBank" size="mini"></el-input></el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:12px">
                    <el-col :span="6">
                      <el-form-item label="开票方电话" prop="invoicePhone">
                        <el-input v-model="headerData.invoicePhone" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="交货方信息" name="third">
              <el-form ref="deliveryParty" label-width="90px" :model="headerData" :rules="rules">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="收货人" prop="contacts">
                        <el-input v-model="headerData.contacts" size="mini"></el-input>
                        <!-- <staff-select @childevent="childEventHandlercontacts" :querySelect="headerData.contacts"></staff-select> -->
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="联系电话" prop="contactsPhone">
                        <el-input v-model="headerData.contactsPhone" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:12px">
                    <el-col :span="12">
                      <el-form-item label="收货地址" prop="contactsAddress" class="elColWidth12">
                        <el-input v-model="headerData.contactsAddress" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="收款计划" name="fourth">
              <div style="margin-bottom:12px">
                <el-button type="warning" size="mini" @click="collectionPlanAddRow">增 加</el-button>
                <el-button type="warning" icon="el-icon-delete" size="mini" plain @click="collectionPlanDeleteRow">删 除</el-button>
              </div>
              <div class="table">
                <common-table
                  :data="collectionPlanData"
                  :maxHeight="130" :rowSelection="false"
                  :fit="true" ref="multipleTable"
                  :headers="headersOfCollection"
                  @row-click="handleRowClickPlan"
                  @selection-change="handleCollectionPlanSel"
                  >
                    <template slot="filter" slot-scope="scope">
                      <div v-if="scope.text == 'payType'">
                        <span>{{collectionPlanData[scope.index]['payType'] | payType}}</span>
                      </div>
                      <div v-if="scope.text == 'timeType'">
                        <span>{{collectionPlanData[scope.index]['timeType'] | timeType}}</span>
                      </div>
                      <div v-if="scope.text == 'payMode'">
                        <span>{{collectionPlanData[scope.index]['payMode'] | payMode}}</span>
                      </div>
                    </template>
                    <template slot-scope="scope" slot="default">
                      <div v-if="scope.text == 'payType'">
                        <el-select v-model="collectionPlanData[scope.index]['payType']" clearable placeholder="请选择" size="mini" @change = "payTypeChange">
                          <el-option v-for="(val, key) in payType" :key="key" :label="val" :value="key">
                          </el-option>
                        </el-select>
                      </div>
                      <div v-if="scope.text == 'timeType'">
                        <el-select v-model="collectionPlanData[scope.index]['timeType']" clearable placeholder="请选择" size="mini">
                          <el-option v-for="(val, key) in timeType" :key="key" :label="val" :value="key">
                          </el-option>
                        </el-select>
                      </div>
                      <div v-if="scope.text == 'payMode'">
                        <el-select @change="payModeChange" v-model="collectionPlanData[scope.index]['payMode']" placeholder="请选择" size="mini">
                          <el-option v-for="(val, key) in payMode" :key="key" :label="val" :value="key">
                          </el-option>
                        </el-select>
                      </div>
                      <div v-if="scope.text == 'account'">
                        <el-input v-if="accountDisabled== false" v-number-only:10.abs="0" v-model.number="collectionPlanData[scope.index]['account']" size='mini'></el-input>
                        <span v-else>{{collectionPlanData[scope.index]['account']}}</span>
                      </div>
                      <div v-if="scope.text == 'currencyName'">
                        <CurrencySelect @childevent="childEventHandlerCurrencyPlan" :querySelect="collectionPlanData[scope.index]['currencyName']"></CurrencySelect>
                      </div>
                    </template>
                  </common-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="相关文件" name="fifth">
              <div style="margin-bottom:12px;font-size:12px">
                <span>&nbsp;&nbsp;文件：</span>
                <el-upload ref="upload" action="" style="display: inline-block" :on-change="handleUploadChange"
                           :auto-upload="false" :show-file-list="false" :file-list="fileList">
                    <el-input slot="trigger" size="mini" type="primary" :value="fileList && fileList.length > 0?fileList[0].name:''">
                    </el-input>
                    <el-button class="orange-btn" type="warning" size="mini" style="margin-left:0px"
                               @click="submitUpload">上传
                    </el-button>
                </el-upload>
                <span>文件上传上限20M</span>
              </div>
              <div>
                <el-table
                :data="relatedDocsData"  border highlight-current-row stripe fit header-align="center" @selection-change="handleSelectionChange" maxHeight="96"
                style="width: 100%">
                  <el-table-column
                    prop="index"
                    label="文件操作"  align="center"
                    min-width="100">
                      <template slot-scope="scope">
                        <el-button @click.native.prevent="downLoad(scope.row, relatedDocsData)" type="text" size="small">下载</el-button>
                        <el-button @click.native.prevent="deleteRelatedDocsRow(scope.$index, relatedDocsData)" type="text" size="small">移除</el-button>
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
                    prop="time" width="180"  align="center"
                    label="创建时间">
                  </el-table-column>
                </el-table>
              </div>
              <div>
                <el-pagination
                  @size-change="handleSizeRelatedDocs"
                  @current-change="handleCurrentRelatedDocs"
                  :current-page="relatedDocsListQuery.currentPage"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="relatedDocsListQuery.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="relatedDocsTotal">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="系统信息" name="sixth">
              <el-form ref="form" label-width="80px" :model="tempAll" style="margin-top:16px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="创建人" prop="createdBy">
                      <el-col :span="18">
                      <el-input v-model="tempAll.createdBy" size="mini" :disabled="true"></el-input></el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="修改人" prop="name">
                      <el-col :span="18">
                      <el-input v-model="tempAll.code" size="mini" :disabled="true"></el-input></el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核人" prop="code">
                      <el-col :span="18">
                      <el-input v-model="tempAll.code" size="mini" :disabled="true"></el-input></el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom:12px">
                  <el-col :span="8">
                    <el-form-item label="创建时间" prop="createdTime">
                      <el-col :span="18">
                      <el-date-picker v-model="tempAll.createdTime" type="datetime" size="mini" :disabled="true">
                                </el-date-picker>
                      <!-- <el-input v-model="tempAll.createdTime" size="mini" :disabled="true"></el-input> -->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="修改时间" prop="name">
                      <el-col :span="18">
                      <el-date-picker v-model="tempAll.updatedTime" type="datetime" size="mini" :disabled="true">
                                </el-date-picker>
                      <!-- <el-input v-model="tempAll.name" size="mini" :disabled="true"></el-input> -->
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核时间" prop="name">
                      <el-col :span="18">
                      <el-date-picker v-model="tempAll.postDate" type="datetime" size="mini" :disabled="true">
                                </el-date-picker>
                      <!-- <el-input v-model="tempAll.name" size="mini" :disabled="true"></el-input> -->
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
    </el-collapse-transition>

    <div style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="mini" @click="addrow('firstTable')">创 建</el-button>
      <el-button type="warning" size="mini" icon="el-icon-delete" @click="deleterow" plain>删 除</el-button>
    </div>
    <div class="table">
      <common-table
        :ref="'firstTable'"
        :data="list"
        :maxHeight="300"
        :fit="true" :rowSelection="false"
        :headers="headers"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
        >
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text == 'packType'">
              <span>{{list[scope.index]['packType'] | packTypeFilter}}</span>
            </div>
            <div v-if="scope.text == 'deliveryMark'">
              <el-checkbox :checked="false" disabled></el-checkbox>
              <!-- <span>{{list[scope.index]['deliveryMark'] | deliveryMark}}</span> -->
            </div>
          </template>
          <template slot-scope="scope" slot="default">
            <div v-if="scope.text == 'goodsCode'">
              <!-- <el-input v-model="list[scope.index]['goodsCode']" size='mini'></el-input> -->
              <goods-select @childevent="childEventHandlerGoods" :querySelect="list[scope.index]['goodsCode']"></goods-select>
            </div>
            <!-- 数量 -->
            <div v-if="scope.text == 'dtlQty'">
              <el-input v-number-only:10.abs="2" v-model.number="list[scope.index]['dtlQty']" size='mini' @input="dtlQtyBlurIpt(list[scope.index])" @blur="dtlQtyBlur(list[scope.index])"></el-input>
            </div>
            <div v-if="scope.text == 'unitName'">
              <el-input v-model="list[scope.index]['unitName']" size='mini'></el-input>
            </div>
            <!-- 包装方式 -->
            <div v-if="scope.text == 'packType'">
              <el-select v-model="list[scope.index]['packType']" placeholder="请选择" size="mini">
                <el-option v-for="(val, key) in packageType" :key="key" :label="val" :value="key">
                </el-option>
              </el-select>
            </div>
            <!-- 含税单价 -->
            <div v-if="scope.text == 'priceTex'">
              <el-input v-number-only:10.abs="6" v-model.number="list[scope.index]['priceTex']" size='mini' @blur="priceTexBlur(list[scope.index])"  @input="priceTexBlurIpt(list[scope.index])"></el-input>
            </div>
            <!-- 税率 -->
            <div v-if="scope.text == 'texRate'">
              <el-input v-number-only:10.abs="2" v-model.number="list[scope.index]['texRate']" size='mini' @input="texRateBlurIpt(list[scope.index])"></el-input>
            </div>
            <!-- 无税单价 -->
            <div v-if="scope.text == 'price'">
              <el-input v-model="list[scope.index]['price']" size='mini'></el-input>
            </div>
            <!-- 含税金额 -->
            <div v-if="scope.text == 'amtTex'">
              <el-input v-number-only:10.abs="2" v-model.number="list[scope.index]['amtTex']" size='mini' @blur="amtTexBlur(list[scope.index])" @input="amtTexBlurIpt(list[scope.index])"></el-input>
            </div>
            <div v-if="scope.text == 'amt'">
              <el-input v-model="list[scope.index]['amt']" size='mini'></el-input>
            </div>
            <div v-if="scope.text == 'texAmt'">
              <el-input v-model="list[scope.index]['texAmt']" size='mini'></el-input>
            </div>
            <!-- <div v-if="scope.text == 'deliveryMark'">
              <span>{{list[scope.index]['deliveryMark'] | deliveryMark}}</span>
              <el-input v-model="list[scope.index]['deliveryMark']" size='mini'></el-input>
            </div> -->
            <div v-if="scope.text == 'remark'">
              <el-input v-model="list[scope.index]['remark']" size='mini'></el-input>
            </div>
          </template>
        </common-table>
    </div>
  </div>
</template>
<script>
  import {pickerOptions,calculateOrderDatail , amtTexBlur, } from '@/util'
  import { parseTime } from '@/filters/index.js'
  import { ENUMS } from '../../../assets/enums.js'
  import NP from 'number-precision'
  import {
    doAddCosSo
  } from 'api/sales-process/sales-contract/sales-contract-add.js'
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //开票方、客户
  import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
  import CurrencySelect from '@/components/common-select/currency-select.vue' //币别
  import StaffSelect from '@/components/common-select/staff-select.vue' //业务员

  const headersOfCollection = [//收款计划
    { type: 'selection', width: '55px'},
    { prop: 'pmRowNo', label: '序号', width: '100px',align:'center' },
    { prop: 'payType', label: '付款类型', width: '120px',align:'center', template: 'payType',filter:'payType', required: true},
    { prop: 'timeType', label: '时间节点', width: '120px',align:'center',filter:'timeType', required: true},// template: 'timeType',
    { prop: 'payMode', label: '支付方式', width: '120px',align:'center',template: 'payMode',filter:'payMode', required: true},
    { prop: 'forwardDays', label: '远期天数', width: '80px',align:'center',editable: true,digit:'0'},
    { prop: 'account', label: '票期', width: '80px',align:'center' ,template:"account"},
    { prop: 'currencyName', label: '币种', width: '200px',align:'center'},//,template:'currencyName'
    { prop: 'orginAmtTex', label: '原币金额', width: '100px',align:'center' ,editable: true,digit:'2'},
    // { prop: 'proportion', label: '比例%', width: '80px',align:'center',editable: true,digit:'2'},
    { prop: 'remark', label: '备注',align:'center',editable: true},
  ]
  const headers = [//下方数据
    { type: 'selection', width: '55px',fixed:'left'},
    { prop: 'soDtlRowNo', label: '行号', width: '60px',align:'center' },
    { prop: 'goodsCode', label: '物料编号', width: '200px',align:'center',template: 'goodsCode' , required: true},
    { prop: 'goodsName', label: '物料名称', width: '120px',align:'center'},
    { prop: 'dtlQty', label: '数量', width: '120px',align:'center',template: 'dtlQty', required: true, digit: '2'},
    { prop: 'unitName', label: '单位' , width: '120px',align:'center'},//,template: 'unitName'
    { prop: 'packType', label: '包装方式' , width: '120px',align:'center',template: 'packType', filter: "packType", required: true},
    { prop: 'priceTex', label: '含税单价' , width: '120px',align:'center',template: 'priceTex', required: true,digit: '6'},
    { prop: 'texRate', label: '税率' , width: '120px',align:'center',template: 'texRate', required: true, digit: '2'},
    { prop: 'price', label: '无税单价' , width: '120px',align:'center', required: true},//,template: 'price'
    { prop: 'amtTex', label: '含税金额' , width: '120px',align:'center',template: 'amtTex', required: true, digit: '2'},
    { prop: 'amt', label: '税前金额' , width: '120px',align:'center', required: true},//,template: 'amt'
    { prop: 'texAmt', label: '税额' , width: '120px',align:'center', required: true,},//,template: 'texAmt'
    { prop: 'deliveryMark', label: '发货关闭' , width: '120px',align:'center',filter:"deliveryMark"},
    { prop: 'remark', label: '备注' , width: '120px',align:'center',template: 'remark'},
  ];

  export default {
    components:{
      ManagementSubject,CustomerSelect,DepartmentSelect,GoodsSelect,CurrencySelect,StaffSelect
    },
    data(){
      return {
        addItemTable: '',   //增行所在表格
        addItemFlg: false,   //是否增行标志
        rowIndex:null,
        rowPlanIndex:null,
        tempAll:{

        },
        headerData:{//抬头信息
        },
        isConfirm:false,
        isBack:false,//原件收回确认
        billingInfo:{//开票信息

        },
        collectionPlanData:[],//收款计划信息
        handleCollectionPlan:[],//收款计划多选
        relatedDocsData:[],//相关文件信息
        handleRelatedDocs:[],//相关文件多选
        fileList: [],
        relatedDocsListQuery:{
          currentPage:1,
          pageSize:10
        },
        relatedDocsTotal:0,
        headersOfCollection:headersOfCollection,
        searchBarFlg: true,
        total:400,
        activeName:'first',
        listQuery:{
          currentPage:1,
          pageSize:10,
        },
        deliveryDate:null,//交货日期
        signDate:null,//签署日期
        sourceType:ENUMS["7280"],//合同来源
        weightStandType: ENUMS["7125"],//计重标准
        transType: ENUMS["7120"],//运输方式
        packageType: ENUMS["7135"],//包装方式
        payType: ENUMS["7140"],//付款类型
        timeType: ENUMS["7145"],//时间节点
        payMode: ENUMS["7210"],//支付方式
        rules:{
          soContractNo:[//销售合同号上
              {required: true, message: '', trigger: 'change'}
          ],
          buyerName:[//业务员
              {required: true, message: '', trigger: 'change'}
          ],
          manageSubName:[//经营主体
              {required: true, message: '', trigger: 'change'}
          ],
          bizOrgName:[//部门
              {required: true, message: '', trigger: 'change'}
          ],
          signDate:[//签署日期
              {required: true, message: ' ', trigger: 'change'}
          ],
          customerName:[//客户
              {required: true, message: '', trigger: 'change'}
          ],
          currencyName:[//币别
              {required: true, message: '', trigger: 'change'}
          ],
          weightStandType:[//计重标准
              {required: true, message: ' ', trigger: 'change'}
          ],
          transType:[//运输方式
              {required: true, message: ' ', trigger: 'change'}
          ],
          invoiceName:[//开票方
              {required: true, message: ' ', trigger: 'change'}
          ],
          lessQty:[//溢短装数量
              {required: true, message: ' ', trigger: 'change'}
          ],

        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        list:[],
        headers: headers,
        multipleSelection:[],
        pickerOptions: {
            shortcuts: pickerOptions
        },
        ifEditDepartment:true,
        accountDisabled:true,//远期天数控制
        transferSearchDepartment:{
          companyName:"",
          companyId:"",
          companyCode:"",
          boolToBtn:true,
        },
      }
    },
    created(){
      this.headerData = {
        soContractNo:'',
        invoiceAddress:'',
        isConfirm:'1',
        isBack:'1',
        rateCurrency:'',
        bizOrgName:'',
        sourceType:"72800010",//合同来源
        weightStandType:'',//计重标准71250010
        transType:'',//运输方式71200010
        currencyName:'',
        buyerName:'',
        lessQty:'',
        manageSubName:'',
        contractQuality:'',
        signDate:'',
        customerName:'',
        contractQty:'',
        auitTitle:'',
        remark:'',
        invoiceName:'',
        invoiceAccount:'',
        invoiceBank:'',
        invoicePhone:'',
        contacts:'',
        contactsPhone:'',
        contactsAddress:'',
      };
      this.list = [];
      this.collectionPlanData=[];
      this.deliveryDate = null;//交货日期
      this.signDate = null;//签署日期
      this.isConfirm = false;
      this.isBack = false;
      this.accountDisabled = true;//远期天数控制
      this.activeName = 'first';
      this.ifEditDepartment = true;//部门状态
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
    filters: {
      packTypeFilter(val) {
        return ENUMS["7135"][val];
      },
      payType(val) {
        return ENUMS["7140"][val];
      },
      timeType(val) {
        return ENUMS["7145"][val];
      },
      payMode(val) {
        return ENUMS["7210"][val];
      },
      deliveryMark(val){
        if(val == "1"){
          return false;
        }else {
          return true;
        }
      }
    },
    methods:{
      toCancel(){//取消
        this.$refs['headerDataForm'].resetFields();
        this.$refs['invoiceInfo'].resetFields();
        this.list = [];
        this.collectionPlanData=[];
        this.deliveryDate = null;//交货日期
        this.signDate = null;//签署日期
        this.isConfirm = false;
        this.isBack = false;
        this.headerData = {
          soContractNo:'',
          invoiceAddress:'',
          isConfirm:'1',
          isBack:'1',
          rateCurrency:'',
          bizOrgName:'',
          sourceType:"72800010",//合同来源
          weightStandType:'',//计重标准71250010
          transType:'',//运输方式71200010
          currencyName:'',
          buyerName:'',
          lessQty:'',
          manageSubName:'',
          contractQuality:'',
          signDate:'',
          customerName:'',
          contractQty:'',
          auitTitle:'',
          remark:'',
          invoiceName:'',
          invoiceAccount:'',
          invoiceBank:'',
          invoicePhone:'',
          contacts:'',
          contactsPhone:'',
          contactsAddress:'',
        };
        this.activeName = 'first';
        this.ifEditDepartment = true;//部门状态
        this.$store.dispatch('toggleCurrentView', {
          SalesContract: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      handleCellClick(){

      },
      handleRowClick(row){
        this.rowIndex = row.$index;
      },
      handleRowClickPlan(row){
        this.rowPlanIndex = row.$index;
        this.payModeChange();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      handleClick(){

      },
      addrow(tableName){
        let soDtlRowNo = 1;
        if(this.list.length>=1){
          soDtlRowNo = this.list[this.list.length-1].soDtlRowNo +1
        }
        var addList = {
          soDtlRowNo:soDtlRowNo,
          goodsCode:'',
          goodsName:'',
          dtlQty:'',
          unitName:'',
          packType:'',
          priceTex:'',
          texRate:'0.17',
          price:'',
          amtTex:'',
          amt:'',
          texAmt:'',
          deliveryMark:'1',
          remark:'',
        }
        this.list.push(addList);
        this.addItemFlg = true;
        this.addItemTable = tableName;
      },
      deleterow(){
        if(this.multipleSelection.length<1){
          this.$message({
              message: '请选择一行或多行进行删除',
              type: 'warning'
          });
        }else {
          this.$confirm('您确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            for (var i = 0; i < this.list.length; i++) {
              let v = this.list[i];
              for (var j = 0; j < this.multipleSelection.length; j++) {
                if (this.multipleSelection[j].$index == v.$index) {
                  this.list.splice(i, 1);
                  i--;
                }
              }
            }
          })
        }
      },
      save(){
        // if(this.isConfirm == false){
        //   this.headerData.isConfirm = '0';
        // }else {
          this.headerData.isConfirm = '1';
        // }
        // if(this.isBack == false){
        //   this.headerData.isBack = '0';
        // }else {
          this.headerData.isBack = '1';
        // }
        this.list.map((x)=>{
            delete x.$index;
        });
        this.collectionPlanData.map((x)=>{
            delete x.$index;
        });
        if(this.list.length==0) {
           this.$message({
            message: '请至少添加一条明细再进行操作',
            type: 'warning'
          });
          return;
        }
        // console.log(this.headerData,'头');
        // console.log(this.list,'表');
        // console.log(this.collectionPlanData,'收款计划')
        this.$refs['headerDataForm'].validate((valid) => {
          if(valid){
            this.$refs['invoiceInfo'].validate((valid) => {
              if(valid){
                  if(this.collectionPlanData.length==0) {
                    this.$message({
                      message: '请至少添加一条收款计划明细再进行操作',
                      type: 'warning'
                    });
                    return;
                  }
                  let orginTex = 0;
                  let amtTex = 0;
                  this.collectionPlanData.map((x) => {
                      orginTex += Number(x.orginAmtTex);
                  });
                  this.list.map((x) => {
                      amtTex += Number(x.amtTex);
                  });
                  if(orginTex != amtTex){
                      this.$message({
                          message: '收款计划原币金额汇总应等于商品明细含税金额汇总',
                          type: 'warning'
                      });
                      return;
                  }
                  eventBus.$emit('validateTable', {
                  data: this.list,    //表示表格数据
                  headers: this.headers,   //表示表头数据
                  success: (valid)=>{   //成功回掉
                    if (valid) {
                        eventBus.$emit('validateTable', {
                          data: this.collectionPlanData,    //表示表格数据
                          headers: this.headersOfCollection,   //表示表头数据
                          success: (valid)=>{   //成功回掉
                            if (valid) {
                                this.$confirm('您确认要新增吗?', '提示', {
                                  confirmButtonText: '确定',
                                  cancelButtonText: '取消',
                                  type: 'warning',
                                }).then(() => {
                                    doAddCosSo(this.headerData,this.list,this.collectionPlanData).then(response=> {
                                      if(response.data.status == 1){
                                        this.$notify({
                                          title: '成功',
                                          message: '新增成功！',
                                          type: 'success'
                                        });
                                        this.toCancel();
                                      }
                                  })
                                }).catch(() => {
                                  this.$message({
                                    type: 'info',
                                    message: '已取消操作'
                                  });
                                });
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
              }else {
                this.$message({
                  message: '请完善必输字段',
                  type: 'warning'
                });
                return false;
              }
            })

          }else {
            this.$message({
              message: '请完善必输字段',
              type: 'warning'
            });
            return false;
          }

        });

      },
      // =================收款计划======================
      collectionPlanAddRow(){
          let pmRowNo = 1;
          if(this.collectionPlanData.length>=1){
            pmRowNo = this.collectionPlanData[this.collectionPlanData.length-1].pmRowNo +1
          }
          var addList = {
            pmRowNo:pmRowNo,
            payType:'',
            timeType:'',
            payMode:'',
            forwardDays:'',
            account:'',
            currencyName:'中国人民币（国际）',
            currencyId:'3833D6D58235DF20E050A8C043FA215F',
            currencyCode:'CNY',
            orginAmtTex:'',
            proportion:'',
            remark:'',
          }
          this.collectionPlanData.push(addList);

      },
      handleCollectionPlanSel(val){
        this.handleCollectionPlan = val;
      },
      collectionPlanDeleteRow(){
        if(this.handleCollectionPlan.length<1){
          this.$message({
              message: '请选择一行或多行进行删除',
              type: 'warning'
          });
        }else {
          this.$confirm('您确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
              for (var i = 0; i < this.collectionPlanData.length; i++) {
                let v = this.collectionPlanData[i];
                for (var j = 0; j < this.handleCollectionPlan.length; j++) {
                  if (this.handleCollectionPlan[j].$index == v.$index) {
                    this.collectionPlanData.splice(i, 1);
                    i--;
                  }
                }
              }
          })
        }
      },
      payTypeChange(){
        var payType = this.collectionPlanData[this.rowPlanIndex].payType;
        // "71400010": "保证金  ",
        // "71400020": "款到发货",
        // "71400030": "货到付款",
        // "71400040": "票到付款"
        if(payType == "71400010"){
          this.collectionPlanData[this.rowPlanIndex].timeType = '71450010';
        }else if(payType == "71400020"){
          this.collectionPlanData[this.rowPlanIndex].timeType = '71450020';
        }else if(payType == "71400030"){
          this.collectionPlanData[this.rowPlanIndex].timeType = '71450030';
        }else if(payType == "71400040"){
          this.collectionPlanData[this.rowPlanIndex].timeType = '71450040';
        }else {
          this.collectionPlanData[this.rowPlanIndex].timeType = '';
        }
      },
      payModeChange(){
        var payMode = this.collectionPlanData[this.rowPlanIndex].payMode;
        if(payMode == '72100020' || payMode == '72100030') {
          this.accountDisabled = false;
        }else {
          this.accountDisabled = true;
          this.collectionPlanData[this.rowPlanIndex].account = '';
        }
      },
      // =============相关文件===============
      handleRelatedDocsSel(val){
        this.handleRelatedDocs = val;
      },
      submitUpload(){
        if(this.fileList.length == 0){
          this.$notify({
            title: '警告',
            message: '请选择要进行上传的文件',
            type: 'warning'
          });
        }else {
          this.relatedDocsTotal++;
          this.relatedDocsData.push(this.fileList[0]);
          this.fileList = [];
        }
      },
      handleUploadChange(file, fileList){
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
      handleSizeRelatedDocs(val){

      },
      handleCurrentRelatedDocs(val){

      },
      deleteRelatedDocsRow(index, rows){
        rows.splice(index, 1);
        this.relatedDocsTotal--;
      },
      downLoad(row){
        if(row.url){
          const a = document.createElement('a');
          a.setAttribute('href', row.url);
          a.setAttribute('download', row.name);
          a.click();
        }
      },
      dtlQtyBlur(row){//数量鼠标移除
        row.dtlQty = Number(row.dtlQty);
        if(row.dtlQty){
          row.dtlQty = row.dtlQty.toFixed(2);
        }else {
          row.dtlQty = '';
        }
      },
      dtlQtyBlurIpt(row){//数量
        // console.log(row.dtlQty);
        setTimeout(() => {
            this.calculateOrderDatail(row);
        }, 10);
        this.headerData.contractQty = 0;
        for(var i=0;i<this.list.length;i++){
          if(!isNaN(Number(this.list[i].dtlQty))){
            this.headerData.contractQty += Number(this.list[i].dtlQty);
          }
        }
        this.headerData.contractQty = this.headerData.contractQty.toFixed(2);
      },
      priceTexBlur(row){//含税单价鼠标移除
        row.priceTex = Number(row.priceTex);
        if(row.priceTex){
          row.priceTex = row.priceTex.toFixed(6);
        }else {
          row.priceTex = '';
        }
      },
      priceTexBlurIpt(row){//含税单价
        setTimeout(() => {
            this.calculateOrderDatail(row);
        }, 10);
      },
      texRateBlur(row){//税率鼠标移除
        row.texRate = Number(row.texRate);
        if(row.texRate){
          row.texRate = row.texRate.toFixed(2);
        }else {
          row.texRate = '';
        }
      },
      texRateBlurIpt(row){//税率
        setTimeout(() => {
            this.calculateOrderDatail(row);
        }, 10);
      },
      amtTexBlurIpt(row){//含税金额
        if(row.dtlQty && row.amtTex){
          setTimeout(() => {
            var getInfo = amtTexBlur({"amtTex":row.amtTex,"texRate":row.texRate,'num':row.dtlQty});
            row.texAmt = getInfo.texAmt;//税额
            row.amt = getInfo.amt;//税前金额
            row.priceTex = getInfo.priceTex;//含税单价
            row.price = getInfo.price;//无税单价
          }, 10);
        }
      },
      amtTexBlur(row){//含税金额鼠标移除
        if(!row.dtlQty){
          this.$message({
            message: '请先输入数量',
            type: 'warning'
          });
          row.amtTex = '';
          return;
        }
        row.amtTex = Number(row.amtTex);
        if(row.amtTex && row.dtlQty){
          row.amtTex = row.amtTex.toFixed(2);
        }else {
          row.amtTex = '';
        }
      },
      // 金额计算
      calculateOrderDatail(row){
        if(row.dtlQty && row.priceTex && row.texRate){
          var caculer = calculateOrderDatail({"priceTex":row.priceTex, 'num': row.dtlQty, "texRate": row.texRate});
          row.texAmt = caculer.texAmt;//税额
          row.amt = caculer.amt;//税前金额
          row.price = caculer.price;//无税单价
          row.amtTex = caculer.amtTex;//含税金额
          // console.log(caculer,"caculer");
        }
      },

      childEventHandlerStaff(val){//业务员
        if(val){
          this.headerData.buyerName = val.userName;
          this.headerData.buyerId = val.userId;
          this.headerData.buyerCode = val.userCode;
        }else {
          this.headerData.buyerName = '';
          this.headerData.buyerId = '';
          this.headerData.buyerCode = '';
        }
        this.$refs['headerDataForm'].validateField('buyerName');
      },
      childEventHandlercontacts(val){//收货人
        if(val){
          this.headerData.contacts = val.userName;
        }else {
          this.headerData.contacts = '';
        }
      },
      childEventHandlerMainInfo(val){//经营主体
          console.log(val);
          if(val){
            this.headerData.manageSubId = val.companyId;
            this.headerData.manageSubCode = val.companyCode;
            this.headerData.manageSubName = val.companyName;
            this.ifEditDepartment = false;
            this.transferSearchDepartment.companyName = val.companyName;
            this.transferSearchDepartment.companyId = val.companyId;
            this.transferSearchDepartment.companyCode = val.companyCode;
            this.headerData.currencyId = val.currencyId;
            this.headerData.currencyCode = val.currencyCode;
            this.headerData.currencyName = val.currencyName;
            if(val.exchangeRate){
              this.headerData.rateCurrency = val.exchangeRate.toFixed(8);
            }
          }else {
            this.headerData.manageSubId = '';
            this.headerData.manageSubCode = '';
            this.headerData.manageSubName = '';
            this.ifEditDepartment = true;
            this.transferSearchDepartment.companyName = '';
            this.transferSearchDepartment.companyId = '';
            this.transferSearchDepartment.companyCode = '';
            this.headerData.currencyId = '';
            this.headerData.currencyCode = '';
            this.headerData.currencyName = '';
            this.headerData.rateCurrency = '';
          }
            this.headerData.bizOrgName = '';
            this.headerData.bizOrgId = '';
            this.headerData.bizOrgCode = '';
            this.headerData.customerId = '';
            this.headerData.customerCode = '';
            this.headerData.customerName = '';
            this.headerData.invoiceId = '';
            this.headerData.invoiceCode = '';
            this.headerData.invoiceName = '';
            this.headerData.invoiceAddress = '';
          this.$refs['headerDataForm'].validateField('manageSubName');
          this.$refs['headerDataForm'].validateField('currencyName');
      },
      childEventHandlerDepartment(val) { //部门
        if (val) {
          this.headerData.bizOrgName = val.orgName;
          this.headerData.bizOrgId = val.orgId;
          this.headerData.bizOrgCode = val.orgCode;
        } else {
          this.headerData.bizOrgName = '';
          this.headerData.bizOrgId = '';
          this.headerData.bizOrgCode = '';
        }
        this.$refs['headerDataForm'].validateField('bizOrgName');
      },
      childEventHandlerCustomerHeader(val){//客户
        if(val){
          this.headerData.customerName = val.custName;
          this.headerData.customerCode = val.custCode;
          this.headerData.customerId = val.id;
          this.headerData.invoiceName = val.custName;
          this.headerData.invoiceCode = val.custCode;
          this.headerData.invoiceId = val.id;
          this.headerData.invoiceAddress = val.custAddress;
        }else {
          this.headerData.customerId = '';
          this.headerData.customerCode = '';
          this.headerData.customerName = '';
          this.headerData.invoiceId = '';
          this.headerData.invoiceCode = '';
          this.headerData.invoiceName = '';
          this.headerData.invoiceAddress = '';
        }
        this.$refs['headerDataForm'].validateField('customerName');
      },
      childEventHandlerCustomer(val){//开票方
        if(val){
          this.headerData.invoiceName = val.custName;
          this.headerData.invoiceCode = val.custCode;
          this.headerData.invoiceId = val.id;
          this.headerData.invoiceAddress = val.custAddress;
        }else {
          this.headerData.invoiceId = '';
          this.headerData.invoiceCode = '';
          this.headerData.invoiceName = '';
          this.headerData.invoiceAddress = '';
        }
        this.$refs['invoiceInfo'].validateField('invoiceName');
      },
      childEventHandlerGoods(val) {//物料编号
        // console.log(val);
        if(val){
          this.list[this.rowIndex].goodsName = val.goodsName;
          this.list[this.rowIndex].goodsId = val.goodsId;
          this.list[this.rowIndex].goodsCode = val.goodsCode;
          this.list[this.rowIndex].unitCode = val.unitCode;
          this.list[this.rowIndex].unitId = val.unitId;
          this.list[this.rowIndex].unitName = val.unitName;
        }else {
          this.list[this.rowIndex].goodsName = '';
          this.list[this.rowIndex].goodsId = '';
          this.list[this.rowIndex].goodsCode = '';
          this.list[this.rowIndex].unitCode = '';
          this.list[this.rowIndex].unitId = '';
          this.list[this.rowIndex].unitName = '';
        }
      },
      childEventHandlerCurrency(val){//币别
        if(val){
          this.headerData.currencyId = val.currencyId;//币别id
          this.headerData.currencyCode = val.currencyCode;//币别code
          this.headerData.currencyName = val.currencyName;//币别name
          this.headerData.rateCurrency = val.exchangeRate.toFixed(8);//汇率
        }else {
          this.headerData.currencyId = '';
          this.headerData.currencyCode = '';
          this.headerData.currencyName = '';
          this.headerData.rateCurrency = '';
        }
        this.$refs['headerDataForm'].validateField('currencyName');
      },
      childEventHandlerCurrencyPlan(val){//收款计划币别
        console.log(val,'rowPlanIndex');
        if(val){
          this.collectionPlanData[this.rowPlanIndex].currencyId = val.currencyId;
          this.collectionPlanData[this.rowPlanIndex].currencyCode = val.currencyCode;
          this.collectionPlanData[this.rowPlanIndex].currencyName = val.currencyName;
        }else {
          this.collectionPlanData[this.rowPlanIndex].currencyId = '';
          this.collectionPlanData[this.rowPlanIndex].currencyCode = '';
          this.collectionPlanData[this.rowPlanIndex].currencyName = '';
        }
        // this.$refs[''].validateField('currencyName');
      },

    },
    watch: {
      deliveryDate:function(val){
          if (val && val[0] && val[1]) {
              this.headerData.deliveryDateStart = parseTime(val[0],'{y}-{m}-{d}');
              this.headerData.deliveryDateEnd = parseTime(val[1],'{y}-{m}-{d}');
          } else {
              this.headerData.deliveryDateStart = '';
              this.headerData.deliveryDateEnd = '';
          }
      },
      signDate: function(val){
          if(val){
            this.headerData.signDate = parseTime(val,'{y}-{m}-{d}');
          }else {
            this.headerData.signDate = "";
          }
      },
    }
  }

</script>

<style scoped>
  .heightOfHeader {
    height: 210px;
  }
</style>
