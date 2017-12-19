<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="primary" size="small" @click="handleSave">保 存</el-button>
      <el-button type="info" size="small" @click="handleCancel">取 消</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="mini" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg">
        <el-tabs v-model="activeTabs"  @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="first" class="tabpane">
            <el-form ref="saveForm" :rules="rules" label-width="100px" :model="formData">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="系统单据号" prop="poRoNo">
                    <el-input v-model="formData.poRoNo" size="mini" disabled="disabled"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="过账状态" prop="postStatus">
                    <el-select v-model="formData.postStatus" placeholder="请选择" clearable size="mini" disabled="disabled">
                      <el-option v-for="(value,key) in postStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="采购收货单" prop="poGrNo">
                    <return-received :disabled="poGrIdBtnStatus" @childevent="childEventHandlerReceived" :querySelect="formData.poGrNo"></return-received>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="退货类型" prop="roType">
                    <el-select disabled v-model="formData.roType" clearable placeholder="请选择" size="mini">
                      <el-option  v-for="(value,key) in roType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <management-subject disabled @childevent = "childEventHandlerMainInfo" :querySelect="formData.manageSubName"></management-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="供应商" prop="supplierName">
                    <supplier disabled @childevent="getChildEventSupplier" :selectName="formData.supplierName"></supplier>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="仓库" prop="warehouseName">
                    <warehouse-select  @childevent="childEventHandlerWarehouse" :querySelect="formData.warehouseName"></warehouse-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="人民币汇率" prop="rateCurrency">
                    <el-input v-number-only:10.abs="8" @blur="rmbBlur" v-model="formData.rateCurrency" size="mini" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="采购类型" prop="roPoType">
                    <!--<el-input v-model="formData.roPoType" size="mini" ></el-input>-->
                    <el-select v-model="formData.roPoType" disabled clearable placeholder="请选择" size="mini">
                      <el-option  v-for="(value,key) in roPoType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="币别" prop="currencyName">
                    <currency-select disabled @childevent="getChildEventCurrency" :querySelect="formData.currencyName"
                              ref="supplierPage"></currency-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="单据日期" prop="billDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="billDate"
                                     size="mini"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="部门" prop="bizOrgName">
                    <department-select disabled  @childevent = "childEventHandlerDepartment" :querySelect="formData.bizOrgName"></department-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="冲销原因" prop="writeOffReason">
                    <el-input width="100%"  v-model="formData.writeOffReason" size="mini" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="凭证信息" name="second" class="tabpane">
            <el-form ref="form" label-width="150px" :model="formData">
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="冲销/退货凭证标识" prop="credenIden">
                    <el-col :span="22">
                      <el-select style="width: 180px;"  v-model="formData.credenIden" placeholder="请选择" size="mini" disabled="disabled">
                        <el-option label="凭证未操作" value="12"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="冲销/退货凭证编号" prop="credenNo">
                    <el-col :span="22">
                      <el-input disabled v-model="formData.credenNo" size="mini" ></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-form-item label="推送失败的原因" prop="failReason">
                    <el-col :span="22">
                      <el-input disabled type="textarea" v-model="formData.failReason" size="mini" ></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="third" class="tabpane">
            <el-form ref="form" label-width="100px" :model="formData">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-col :span="22">
                      <el-input v-model="formData.createdBy" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改人" prop="updatedBy">
                    <el-col :span="22">
                      <el-input v-model="formData.updatedBy" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="postPersonName">
                    <el-col :span="22">
                      <el-input v-model="formData.postPersonName" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-col :span="22">
                      <el-input v-model="formData.createdTime" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-col :span="22">
                      <el-input v-model="formData.updatedTime" size="mini" disabled="disabled"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="postDate">
                    <el-col :span="22">
                      <el-input v-model="formData.postDate" size="mini" disabled="disabled"></el-input>
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
      <el-button type="warning" size="mini" @click="handleAddNewCell">创 建</el-button>
      <el-button type="warning" size="mini" plain @click="handleDeleteClick" icon="el-icon-delete">删 除</el-button>
    </div>
    <purchase-return-dialog :receiveDialogStatus="receiveDialogStatus" :poGrId="poGrId" @fillRow="fillRow" @closeItem="closeReceiveDialog"></purchase-return-dialog>
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @cell-click="handleCellClick"
      @selection-change="handleSelectionChange"

    >
      <template slot="filter" slot-scope="scope">
        <div v-if="scope.text == 'selectPackType'">
          <span>{{tableData[scope.index]['packType'] | packTypeTypeFilter}}</span>
        </div>
        <div v-if="scope.text == 'productDateFilter'">
          <span>{{tableData[scope.index]['productDate'] | productDateFilter}}</span>
        </div>
      </template>
      <template slot-scope="scope">
        <div v-if="scope.text == 'select'">
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'date'">
          <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="scope.text == 'inputPoContractNo'">
          <el-input v-model="tableData[scope.index]['poContractNo']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputPoNo'">
          <el-input v-model="tableData[scope.index]['poNo']" size='mini'></el-input>
        </div>
        <!-- 采购收货单行号 -->
        <div v-if="scope.text == 'inputPoGrDtlRowNo'" class="table-from">
          <return-received-line @childevent="childEventHandlerGoods" :querySelect="tableData[scope.index]['poGrDtlRowNo']"></return-received-line>
        </div>
        <div v-if="scope.text == 'inputGoodsCode'">
          <el-input v-model="tableData[scope.index]['goodsCode']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputGoodsName'">
          <el-input v-model="tableData[scope.index]['goodsName']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputUnitName'">
          <el-input v-model="tableData[scope.index]['unitName']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputQty'">
          <el-input v-model="tableData[scope.index]['qty']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputRetireQty'">
          <el-input v-number-only:10.abs="2" @blur="retireQtyBlur(tableData[scope.index])" v-model="tableData[scope.index]['retireQty']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputSettleQty'">
          <el-input v-number-only:10.abs="2" @blur="SettleQtyBlur(tableData[scope.index])" v-model="tableData[scope.index]['settleQty']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputLessQty'">
          <el-input v-model="tableData[scope.index]['lessQty']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputCabinetNo'">
          <el-input v-model="tableData[scope.index]['cabinetNo']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputSeriesNo'">
          <el-input v-model="tableData[scope.index]['seriesNo']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputSupplierBatchNo'">
          <el-input v-model="tableData[scope.index]['supplierBatchNo']" size='mini'></el-input>
        </div>

        <div v-if="scope.text == 'inputProductDate'">
          <el-date-picker v-model="tableData[scope.index]['productDate']" type="date" placeholder="选择日期" size='mini'></el-date-picker>
        </div>
        <div v-if="scope.text == 'inputContractQty'">
          <el-input v-model="tableData[scope.index]['contractQty']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputTexRate'">
          <el-input v-model="tableData[scope.index]['texRate']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputOrginPriceTex'">
          <el-input v-model="tableData[scope.index]['orginPriceTex']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputOrginPrice'">
          <el-input v-model="tableData[scope.index]['orginPrice']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputOrginAmt'">
          <el-input v-model="tableData[scope.index]['orginAmt']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputOrginAmtTex'">
          <el-input v-model="tableData[scope.index]['orginAmtTex']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputorginTexAmt'">
          <el-input v-model="tableData[scope.index]['orginTexAmt']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBasePriceTex'">
          <el-input v-model="tableData[scope.index]['basePriceTex']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBasePrice'">
          <el-input v-model="tableData[scope.index]['basePrice']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBaseAmt'">
          <el-input v-model="tableData[scope.index]['baseAmt']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBaseAmtTex'">
          <el-input v-model="tableData[scope.index]['baseAmtTex']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBaseTexAmt'">
          <el-input v-model="tableData[scope.index]['baseTexAmt']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBizOrgCode'">
          <el-input v-model="tableData[scope.index]['bizOrgCode']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputBizOrgName'">
          <el-input v-model="tableData[scope.index]['bizOrgName']" size='mini'></el-input>
        </div>
        <div v-if="scope.text == 'inputRemark'">
          <el-input v-model="tableData[scope.index]['remark']" size='mini'></el-input>
        </div>
      </template>
    </common-table>
    <!--分页-->
    <!--<div class="pagination">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="pageInfo.currentPage"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="pageInfo.pageSize"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="pageInfo.total">-->
      <!--</el-pagination>-->
    <!--</div>-->

  </div>
</template>
<script type="text/javascript">
  import { doCusUpdate ,doQueryCusAll } from '@/api/purchase/purchase-return/purchase-return.js'
  import router from '@/router'
  import { parseTime } from '@/filters/index.js'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
  import supplier from '@/components/common-select/supplier.vue'//供应商
  import WarehouseSelect from '@/components/common-select/warehouse-select.vue' //仓库
  import CurrencySelect from '@/components/common-select/currency-select.vue'//币别
  import contractOfPurchase from 'components/common-dialog/contract-of-purchase-dialog.vue' //采购合同单据号
  import returnReceived from '@/components/common-select/return-received.vue' //采购收货单弹框
  import returnReceivedLine from '@/components/common-select/return-received-line.vue' //采购收货单行号弹框
  import purchaseReturnDialog from './receivingnote-dialog.vue'//收货单

  import {pickerOptions} from '@/util'
  const ENUMS = {
    "roType": { //退货类型
      "73050005": "冲销",
      "73050010": "退货",
      "73050015": "换货"
    },
    "postStatus": { //过账状态
      "70400010": "保存",
      "70400020": "已过账",
      "70400030": "已冲销"
    },
    "roPoType": { //采购类型
      "72300010": "国内采购",
      "72300020": "自营进口",
      "72300030": "代理进口"
    },
    "packType": {//包装方式
      "71350010": "编织袋",
      "71350020": "中性编织袋",
      "71350030": "纸箱",
      "71350040": "托盘",
      "71350050": "其他",
    },
    "credenIden": { //凭证标识
      "72400010": "凭证未操作",
      "72400020": "凭证未过账",
      "72400030": "凭证已过账"
    }
  }
  const headers = [
    {  type: 'selection', label: '序号',width:'55px',fixed:'left'},
    { type: 'index', label: '行号',width:'60px',align:'center'},
    { prop: 'poNo', label: '采购合同单据号', width:'150px',align:'center'},
    { prop: 'poContractNo', label: '采购合同号',width:'150px',align:'center'},
    { prop: 'poGrDtlRowNo', label: '采购收货单行号',width:'200px',align:'center'},
    { prop: 'goodsCode', label: '物料编号',align:'center'},
    { prop: 'goodsName', label: '物料名称',align:'center'},
    { prop: 'unitName', label: '单位',align:'center'},
    { prop: 'packType', label: '包装方式', width: '120px',align:'center',template: 'selectPackType' , filter: true},
    { prop: 'retireQty', label: '实退数量',width: '120px',template: 'inputRetireQty' ,align:'center',required:true},
    { prop: 'qty', label: '件数',align:'center',required:true},
    { prop: 'settleQty', label: '结算数量' ,width: '120px',template: 'inputSettleQty',align:'center',required:true},
    { prop: 'lessQty', label: '可溢短数量',width:'100px',align:'center'},
    { prop: 'cabinetNo', label: '柜号',align:'center' },
    { prop: 'seriesNo', label: '批次',align:'center' ,required:true},
    { prop: 'supplierBatchNo', label: '供应商批号',width:'150px',align:'center' },
    { prop: 'productDate', label: '供方生产日期',dataType: 'Date',width:'180px',filter:'productDateFilter',align:'center' },
    { prop: 'contractQty', label: '合同数量',align:'center' },
    { prop: 'texRate', label: '税率',digit: '8',align:'center' },
    { prop: 'orginPriceTex', label: '原币单价(含税)',digit: '6',width:'150px' ,align:'center'},
    { prop: 'orginPrice', label: '原币单价(不含税)',digit: '6',width:'150px' ,align:'center'},
    { prop: 'orginAmtTex', label: '原币金额',digit: '2',align:'center' },
    { prop: 'orginAmt', label: '原币税前金额' ,digit: '2',width:'120px',align:'center'},
    { prop: 'orginTexAmt', label: '原币税额' ,width:'120px',align:'center'},
    { prop: 'basePriceTex', label: '本币单价(含税)',digit: '6',width:'150px',align:'center' },
    { prop: 'basePrice', label: '本币单价(不含税)',digit: '6',width:'150px',align:'center' },
    { prop: 'baseAmtTex', label: '本币金额',digit: '2',align:'center' },
    { prop: 'baseAmt', label: '本币税前金额' ,digit: '2',width:'120px',align:'center'},
    { prop: 'baseTexAmt', label: '本币税额' ,digit: '8',width:'120px',align:'center'},
    { prop: 'bizOrgCode', label: '采购部门编号',width:'120px',align:'center' },
    { prop: 'bizOrgName', label: '采购部门名称',width:'120px',align:'center' },
    { prop: 'remark', label: '备注',align:'center',editable: true },
  ];

  const baseList = [];
  export default {
    components: {
      ManagementSubject,WarehouseSelect,supplier,CurrencySelect,contractOfPurchase,returnReceived,returnReceivedLine,purchaseReturnDialog,DepartmentSelect
    },
    data(){
      return {
        noManageSubId:'',//不用传ManageSubId
        multipleSelection:[],
        poGrId:'',
        billDate:'',
        receiveDialogStatus:false,
        dialogShow: false,//采购合同单据号
        addSign:false,
        departmentFormVisible:false,
        rules: {
          manageSubName: [
            { required: true, message: ' ', trigger: 'change' },
          ],
          warehouseName: [
            { required: true, message: ' ', trigger: 'change' },
          ],
          poGrNo: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          roType: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          rateCurrency: [
            {  required: true, message: ' ', trigger: 'blur' }
          ],
        },
        searchBarFlg:true,
        activeTabs: 'first',
        formData: {
          poRoNo: "",
          postStatus: '',//过账状态:默认保存
          poGrNo: '',//采购收货单号
          roType: '',//退货类型
          manageSubCode: '',
          manageSubName: '',//经营主体
          manageSubId: '',
          supplierCode: '',
          supplierName: '',//供应商
          supplierId: '',
          warehouseName:'',
          warehouseId:'',//仓库
          warehouseCode:'',
          rateCurrency: '',//对人民币汇率
          roPoType: '',//采购类型
          currencyCode: '',//币别
          currencyId: '',//币别
          currencyName: '',//币别
          billDate: '',//凭证日期
          writeOffReason: '',//冲销原因
          credenIden: '',//冲销/退货凭证标识
          credenNo: '',//冲销/退货凭证编号
          failReason: '',//推送失败的原因
          createdBy: '',//创建人
          updatedBy: '',//修改人
          postPersonName: '',//过账人
          createdTime: '',
          updatedTime: '',
          postDate: '',
        },
        pickerOptions: {
          shortcuts: pickerOptions
        },
        postStatus:ENUMS.postStatus,
        operationType:ENUMS.operationType,
        roType:ENUMS.roType,
        roPoType:ENUMS.roPoType,
        credenIden:ENUMS.credenIden,
        packType:ENUMS.packType,
        value4: '',
        value1: '',
        delList:[],//删除list
        headers: headers,
        tableData: [],
        total:null,
        pageInfo: {
          total: 0, //总数
          pageSize: 10, //每页几条数据
          currentPage: 1, //第几页
          pageCount: 0 //总页数
        },
      }
    },
    computed: {
      poGrIdBtnStatus(){
        if(this.poGrId&&this.tableData.length>0){
          return true
        }
        return false;
      }
    },
    methods: {
      rmbBlur(){
        if (this.formData.rateCurrency) {
          this.formData.rateCurrency = parseFloat(this.formData.rateCurrency).toFixed(8)
        } else {
          this.formData.rateCurrency = '';
        }
      },
      SettleQtyBlur(val){//结算数量//实退数量不能大于结算数量。
        console.log('结算数量',val.settleQty)
        console.log('实退数量',val.settleQty)
        if (val.settleQty) {
          if(val.settleQty < parseInt(val.retireQty)){
            this.$message({
              type:'warning',
              message:"实退数量不能大于结算数量"
            })
            val.settleQty = ''
          }else{
            val.settleQty = parseFloat(val.settleQty).toFixed(2)
          }
        } else {
          val.settleQty = '';
        }
      },
      retireQtyBlur(val){//实退数量
        if (val.retireQty) {
          if(val.retireQty > parseInt(val.settleQty)){
            this.$message({
              type:'warning',
              message:"实退数量不能大于结算数量"
            })
            val.retireQty = ''
          }else{
            val.retireQty = parseFloat(val.retireQty).toFixed(2)
          }

        } else {
          val.retireQty = '';
        }
      },
      clearData(){
        this.multipleSelection=[];
        this.activeTabs = 'first';
        this.$refs['saveForm'].clearValidate();//移除整个表单验证
        this.tableData=[];
        this.billDate='';
        this.formData={
          poRoNo: "",
          poNo: '',
          poGrNo: '',
          postStatus: '70400010',
          manageSubCode: '',
          manageSubName: '',
          manageSubId: '',
          warehouseName:'',
          warehouseId:'',//仓库
          warehouseCode:'',
          roType: '73050005',
          roPoType: '',
          currencyCode: '',//币别
          currencyId: '',//币别
          currencyName: '',//币别
          billDate: '',
          supplierCode: '',
          supplierName: '',
          supplierId: '',
          rateCurrency: '',
          writeOffReason: '',
          credenIden: '',
          credenNo: '',
          failReason: '',
          createdBy: '',
          updatedBy: '',
          postPersonName: '',
          createdTime: '',
          updatedTime: '',
          postDate: '',
        }
        this.getList()
      },
      choosePurse(val){
        console.log('choosePurse',val);
      },
      closeReceiveDialog(val){
        this.receiveDialogStatus = false;
      },
      getList() {
        let vm=this;
//        console.log('poRoId',vm.$route.query.poRoId)
//        doQueryCusAll(vm.poRoId).then(res => {
        let id = this.$store.getters.params.PurchaseReturn.poRoId;
        doQueryCusAll(id).then(res => {
          if(res.data.status === 1) {
            vm.poGrId=res.data.data.codPoRoVo.poGrId,
            vm.formData.manageSubName=res.data.data.codPoRoVo.manageSubName,
              vm.formData.warehouseName=res.data.data.codPoRoVo.warehouseName,
              vm.formData.supplierName=res.data.data.codPoRoVo.supplierName,
              vm.formData.currencyName=res.data.data.codPoRoVo.currencyName,
              vm.formData=res.data.data.codPoRoVo;
            vm.formData.roType = String(vm.formData.roType);
            vm.formData.postStatus = String(vm.formData.postStatus);
            vm.formData.rateCurrency = String(parseFloat(vm.formData.rateCurrency).toFixed(8))
            vm.formData.roPoType = String(vm.formData.roPoType);
//            vm.formData.billDate = parseTime(this.formData.billDate);
            console.log('res.data.data.codPoRoVo.billDate',res.data.data.codPoRoVo.billDate)
            vm.billDate = res.data.data.codPoRoVo.billDate;
//            vm.formData.poRoId=vm.poRoId
//            vm.formData.poRoId=vm.$route.query.poRoId
            vm.formData.poRoId=id
            vm.formData.createdTime ?vm.formData.createdTime = vm.formData.createdTime.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.formData.updatedTime ?vm.formData.updatedTime = vm.formData.updatedTime.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.formData.postDate ? vm.formData.postDate = vm.formData.postDate.parseTime('YYYY-MM-DD HH:MM:SS'):'';
            vm.tableData=res.data.data.codPoRoDtlVo;
            vm.pageInfo.total = res.data.data.items;
            vm.loading = false
          }
        })
      },
      handleDeleteClick(){
        if(this.multipleSelection.length<1){
          this.$message({
            message: '请选择一行或多行进行删除',
            type: 'warning'
          });
        }else {
          if( this.multipleSelection.length<1){
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
              this.multipleSelection.forEach((x,i) => {
                let idx = this.tableData.findIndex((val) => val == x);
                if(idx>-1){
                  this.delList.push(this.tableData[idx].poRoDtlId)
                  console.log('idx',idx)
                  this.tableData.splice(idx, 1);
                }
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
          }
        }
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      fillRow(val){

        for(let obj of val) {
          let index = this.tableData.findIndex((x) => obj.poGrDtlId == x.poGrDtlId );
          console.log(index)
          if(index==-1){
            let poInvoiceRowNo = 1;
            if(this.tableData.length>=1){
              poInvoiceRowNo = this.tableData[this.tableData.length-1].poInvoiceRowNo +1
            }
            this.tableData.push({
//              poInvoiceRowNo:poInvoiceRowNo,
              poNo:obj.poNo,//采购合同单据号
              poGrDtlId:obj.poGrDtlId,
              poContractNo:obj.poContractNo,//采购合同号
              poGrDtlRowNo:obj.poGrRowNo, //采购收货单行号
              goodsCode:obj.goodsCode,
              goodsName:obj.goodsName,
              goodsId:obj.goodsId,
              unitName:obj.unitName,
              unitId:obj.unitId,
              unitCode:obj.unitCode,
              packType:obj.packType,
              qty:obj.qty,
              lessQty:obj.lessQty,
              cabinetNo:obj.cabinetNo,
              seriesNo:obj.seriesNo,
              seriesId:obj.seriesId,
              supplierBatchNo:obj.supplierBatchNo,
              productDate:obj.productDate,
              contractQty:obj.itemQty,
              texRate:obj.texRate,
              orginPriceTex:obj.orginPriceTex,
              orginPrice:obj.orginPrice,
              orginAmtTex:obj.orginAmtTex,
              orginAmt:obj.orginAmt,
              orginTexAmt:obj.orginTexAmt,
              basePriceTex:obj.basePriceTex,
              basePrice:obj.basePrice,
              baseAmtTex:obj.baseAmtTex,
              baseAmt:obj.baseAmt,
              baseTexAmt:obj.baseTexAmt,
              bizOrgCode:obj.bizOrgCode,
              bizOrgName:obj.bizOrgName,
              remark:obj.remark
            });
          }
        }
        this.receiveDialogStatus = false;
      },
      handleAddNewCell(){
        if (!this.formData.manageSubId) {
          this.$message({
            message: '请选择经营主体',
            type: 'warning'
          });
          return;
        }
        if (!this.formData.poGrNo) {
          this.$message({
            message: '请选择采购收货单',
            type: 'warning'
          });
          return;
        }
        this.receiveDialogStatus = true;
      },    //分页
      handleSizeChange(val){
        this.pageInfo.pageSize = val;
        this.getList()
        console.log(val, "handleSizeChange=>val")
      },
      handleCurrentChange(val){
        this.pageInfo.currentPage = val;
        this.getList()
        console.log('val=>handleCurrentChange', val)
      },
      handleCancel(){
//        router.push( {path: '/purchase/purchase-return/:type'});
        this.clearData()
        this.$store.dispatch('toggleCurrentView', {
          PurchaseReturn: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
//        this.$router.push({ params: { type: 'list' } });
      },
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleClick() {
        console.log(this.list);
      },
      handleSave() {
        let vm = this
        vm.tableData.map((x)=>{
          delete x.$index;
        });
        console.log('vm.formData',vm.formData)
        vm.$refs['saveForm'].validate((valid) => {
          if (valid) {
            eventBus.$emit('validateTable', {
              data: vm.tableData,    //表示表格数据
              headers: vm.headers,   //表示表头数据
              success: (valid)=>{   //成功回掉
                if (valid) {
                  //校验通过后，代码书写处
                  if(vm.formData && vm.tableData){
                    for(let i=0; i<vm.tableData.length ; i++){
                      vm.tableData[i].productDate?vm.tableData[i].productDate=vm.tableData[i].productDate.parseTime('YYYY-MM-DD'):'';
                    }
                    doCusUpdate(vm.formData,vm.tableData,vm.delList).then(response => {
                      if (response.data.status == 1) {
                        vm.$notify({
                          title: '成功',
                          message: '保存成功!',
                          type: 'success',
                          duration: 2000
                        })
                        vm.clearData()
                        vm.$store.dispatch('toggleCurrentView', {
                          PurchaseReturn: {
                            view: 'index'
                            // params: 跳转过去的子组件的属性对象
                          }
                        });
//                        vm.$router.push({ params: { type: 'list' } });
                      }
                    })

                  }else{
                    this.$message({
                      type:'warning',
                      message:"请创建明细"
                    })
                  }
                }
              }
            })

          }else{
            this.$message({
              type:'warning',
              message:"请完善必填字段"
            })
          }
        });
      },
      childEventHandlerWarehouse(val) {
        console.log('childEventHandlerWarehouse',val)
        if (val) {
          this.formData.warehouseName= val.warehouseName;
          this.formData.warehouseId= val.warehouseId;
          this.formData.warehouseCode= val.warehouseCode;
        } else {
          this.formData.warehouseName = '';
          this.formData.warehouseId = '';
          this.formData.warehouseCode = '';
        }
      },
      childEventHandlerMainInfo(val) {
        console.log('childEventHandlerMainInfo',val)
        if(val){
          this.formData.manageSubCode = val.companyCode;
          this.formData.manageSubId = val.companyId;
          this.formData.manageSubName = val.companyName;
          //每次修改连同采购收货弹框一起清除数据
          this.poGrId='';
          this.formData.poGrId = '';
          this.formData.poGrNo = '';
          this.formData.supplierName = '';
          this.formData.supplierCode = '';
          this.formData.supplierId = '';
          this.formData.roPoType = '';//采购类型
          this.formData.operationType = '';//移动类型
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';//部门
          this.formData.bizOrgName = '';
          this.formData.warehouseName = '';
          this.formData.warehouseId = '';
          this.formData.warehouseCode = '';
          this.formData.currencyName = '';
          this.formData.currencyCode = '';
          this.formData.currencyId = '';
          this.formData.rateCurrency = '';
          this.$refs['saveForm'].validateField('manageSubName');
        }else {
          this.formData.manageSubCode = '';
          this.formData.manageSubId = '';
          this.formData.manageSubName = '';
          //连同采购收货弹框一起清除数据
          this.poGrId='';
          this.formData.poGrId = '';
          this.formData.poGrNo = '';
          this.formData.supplierName = '';
          this.formData.supplierCode = '';
          this.formData.supplierId = '';
          this.formData.roPoType = '';//采购类型
          this.formData.operationType = '';//移动类型
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';//部门
          this.formData.bizOrgName = '';
          this.formData.warehouseName = '';
          this.formData.warehouseId = '';
          this.formData.warehouseCode = '';
          this.formData.currencyName = '';
          this.formData.currencyCode = '';
          this.formData.currencyId = '';
          this.formData.rateCurrency = '';
        }
      },
      childEventHandlerDepartment(val){//部门
        console.log(val);
        if(val){
          this.formData.bizOrgId = val.orgId;
          this.formData.bizOrgCode = val.orgCode;
          this.formData.bizOrgName = val.orgName;
          this.$refs['saveForm'].validateField('bizOrgName');
        } else {
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';
          this.formData.bizOrgName = '';
        }
      },
      childEventHandlerReceived(val) {//采购收货单
        console.log('childEventHandlerReceived',val)
        console.log(val.poGrNo)
        if (val) {
          this.poGrId=val.poGrId;
          this.formData.poGrNo = val.poGrNo;
//          this.formData.poGrId = val.poGrId;//采购收货单id创建弹框必传
          this.formData.supplierName = val.supplierName;
          this.formData.supplierCode = val.supplierCode;
          this.formData.supplierId = val.supplierId;
          this.formData.roPoType = String(val.poGrType);//采购类型
          this.formData.operationType = String(val.operationType);//移动类型
          this.formData.bizOrgId = val.bizOrgId;
          this.formData.bizOrgCode = val.bizOrgCode;//部门
          this.formData.bizOrgName = val.bizOrgName;
//          this.formData.manageSubName = val.manageSubName;
//          this.formData.manageSubId = val.manageSubId;
//          this.formData.manageSubCode = val.manageSubCode;
          this.formData.warehouseName = val.warehouseName;
          this.formData.warehouseId = val.warehouseId;
          this.formData.warehouseCode = val.warehouseCode;
          this.formData.currencyName = val.currencyName;
          this.formData.currencyCode = val.currencyCode;
          this.formData.currencyId = val.currencyId;
//          this.formData.rateCurrency = String(val.rateCurrency);
          if (val.rateCurrency) {
            this.formData.rateCurrency =String(parseFloat(val.rateCurrency).toFixed(8))
          } else {
            this.formData.rateCurrency = '';
          }
          this.$refs['saveForm'].validateField('poGrNo');
          this.$refs['saveForm'].validateField('rateCurrency');
        } else {
          this.poGrId='';
          this.formData.poGrNo = '';
          this.formData.supplierName = '';
          this.formData.supplierCode = '';
          this.formData.supplierId = '';
          this.formData.roPoType = '';//采购类型
          this.formData.operationType = '';//移动类型
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';//部门
          this.formData.bizOrgName = '';
//          this.formData.manageSubName = '';
//          this.formData.manageSubId = '';
//          this.formData.manageSubCode = '';
          this.formData.warehouseName = '';
          this.formData.warehouseId = '';
          this.formData.warehouseCode = '';
          this.formData.currencyName = '';
          this.formData.currencyCode = '';
          this.formData.currencyId = '';
          this.formData.rateCurrency = '';
        }
        console.log(this.formData)
      },
      childEventHandlerGoods(val){//采购收货单行号
        console.log(val,"val000000000");
        if(val){
          this.tableData.push(val)
        }else {

        }
        console.log('tableData=>',this.tableData)
      },
      getChildEventSupplier(val){
        console.log('getChildEventSupplier',val)
        if (val) {
          this.formData.supplierName = val.supplyName;
          this.formData.supplierCode = val.supplyCode;
          this.formData.supplierId = val.id;
        } else {
          this.formData.supplierName = ''
          this.formData.supplierCode = ''
          this.formData.supplierId = ''
        }
      },
      getChildEventCurrency(val){
        console.log('getCurrencyData',val)
        if (val) {
          this.formData.currencyId = val.currencyId;
          this.formData.currencyCode = val.currencyCode;
          this.formData.currencyName = val.currencyName;
        } else {
          this.formData.currencyId = '';
          this.formData.currencyCode = '';
          this.formData.currencyName = '';
        }
      }
    },
    created(){
      console.log('this.sotre',this.$store)
      console.log('this.sotre.poRoId',this.$store.getters.params.PurchaseReturn.poRoId)
      this.getList()
    },
    watch:{
      billDate:function (val) {
        if(val){
          this.formData.billDate = val.parseTime ('YYYY-MM-DD');
        }else {
          this.formData.billDate = "";
        }
      }
    },
    filters: {
      operationTypeFilter(val) {
        return ENUMS.operationType[val];
      },
      roTypeTypeFilter(val) {
        return ENUMS.roType[val];
      },
      postStatusTypeFilter(val) {
        return ENUMS.postStatus[val];
      },
      roPoTypeTypeFilter(val) {
        return ENUMS.roPoType[val];
      },
      credenIdenTypeFilter(val) {
        return ENUMS.credenIden[val];
      },
      packTypeTypeFilter(val) {
        return ENUMS.packType[val];
      },
      productDateFilter(val){
        if (val && val != '') {
          return val.parseTime('YYYY-MM-DD')
        }else {
          return '';
        }
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .btn{
    margin-bottom: 20px;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .tabpane{
    height: 110px;
  }
</style>
