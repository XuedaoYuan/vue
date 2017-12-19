<template>
  <div class="allTemplate">
    <div>
      <el-button type="info" size="small" @click="toCancel">取 消</el-button>
      <el-button type="primary" size="small" icon="el-icon-arrow-up" v-if="!searchBarFlg" @click="searchBarFlg = true">展 开</el-button>
      <el-button type="primary" size="small" icon="el-icon-arrow-down" v-if="searchBarFlg" @click="searchBarFlg = false">收 起</el-button>
    </div>
    <el-collapse-transition>
        <div v-show="searchBarFlg" class="heightOfHeader">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="抬头数据" name="first">
              <el-form ref="headerDataForm" label-width="80px" :model="headerData">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="系统单据号" prop="soNo">
                          <el-input v-model="headerData.soNo" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="销售合同号" prop="soContractNo">
                          <el-input v-model="headerData.soContractNo" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="业务员" prop="buyerName">
                          <el-input v-model="headerData.buyerName" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="溢短装数量" prop="lessQty">
                          <el-input v-model="headerData.lessQty" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                        <el-form-item label="经营主体" prop="manageSubName">
                            <el-input v-model="headerData.manageSubName" size="mini" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="合同质量要求" prop="contractQuality">
                          <el-input v-model="headerData.contractQuality" size="mini" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门" prop="bizOrgName">
                            <el-input v-model="headerData.bizOrgName" size="mini" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="签署日期" prop="signDate">
                          <el-date-picker v-model="headerData.signDate" :disabled="true" :editable="false" type="date" size='mini' placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                          <el-form-item label="客户" prop="customerName">
                              <el-input v-model="headerData.customerName" size="mini" :disabled="true"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="合同来源" prop="sourceType">
                              <el-select v-model="headerData.sourceType" placeholder="请选择" disabled size="mini">
                                <el-option v-for="(val, key) in sourceType" :key="key" :label="val" :value="key">
                                </el-option>
                            </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="交货日期" prop="deliveryDate">
                              <el-date-picker v-model="deliveryDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" :disabled="true" end-placeholder="结束日期" size="mini" >
                              </el-date-picker>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="运输方式" prop="transType">
                              <el-select :disabled="true" v-model="headerData.transType" placeholder="请选择" clearable size="mini">
                                <el-option v-for="(val, key) in transType" :key="key" :label="val" :value="key">
                              </el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                          <el-form-item label="币别" prop="currencyName">
                              <el-input v-model="headerData.currencyName" :disabled="true" size="mini"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="合同数量" prop="contractQty">
                            <el-input v-model="headerData.contractQty" size="mini" :disabled="true"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="计重标准" prop="weightStandType">
                            <el-select :disabled="true"  v-model="headerData.weightStandType" placeholder="请选择" clearable size="mini">
                              <el-option v-for="(val, key) in weightStandType" :key="key" :label="val" :value="key">
                              </el-option>
                            </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="" prop="isConfirm">
                            <el-checkbox v-model="isConfirm" :disabled="true">客户确认</el-checkbox></el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="6">
                          <el-form-item label="汇率" prop="rateCurrency">
                            <el-input v-model="headerData.rateCurrency" size="mini" :disabled="true"></el-input>
                          </el-form-item>
                      </el-col>

                      <el-col :span="6">
                          <el-form-item label="OA审核标题" prop="auitTitle">
                            <el-input v-model="headerData.auitTitle" size="mini" :disabled="true"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="合同状态" prop="soStatus">
                            <el-input :value="headerData.soStatus | soStatus" size="mini" disabled></el-input>
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
                            <el-input v-model="headerData.remark" size="mini" :disabled="true"></el-input>
                          </el-form-item>
                      </el-col>
                  </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="开票信息" name="second">
              <el-form ref="form" label-width="90px" :model="headerData">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="开票方" prop="invoiceName">
                        <el-input v-model="headerData.invoiceName" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开票方地址" prop="invoiceAddress">
                        <el-input v-model="headerData.invoiceAddress" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开票方银行账号" prop="invoiceAccount">
                        <el-input v-model="headerData.invoiceAccount" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开票方开户行" prop="invoiceBank">
                        <el-col>
                        <el-input v-model="headerData.invoiceBank" size="mini" :disabled="true"></el-input></el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:12px">
                    <el-col :span="6">
                      <el-form-item label="开票方电话" prop="invoicePhone">
                        <el-input v-model="headerData.invoicePhone" size="mini" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="交货方信息" name="third">
              <el-form ref="deliveryParty" label-width="90px" :model="headerData">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="收货人" prop="contacts">
                        <el-input v-model="headerData.contacts" size="mini" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="联系电话" prop="contactsPhone">
                        <el-input v-model="headerData.contactsPhone" size="mini" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom:12px">
                    <el-col :span="12">
                      <el-form-item label="收货地址" prop="contactsAddress" class="elColWidth12">
                        <el-input v-model="headerData.contactsAddress" size="mini" disabled></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="收款计划" name="fourth">
              <div class="table" style="margin-bottom:12px">
                <common-table
                  :data="collectionPlanData"
                  :maxHeight="300"
                  :fit="true" ref="multipleTable"
                  :headers="headersOfCollection"
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
                    <template slot-scope="scope">
                    </template>
                  </common-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="相关文件" name="fifth">
              <!-- <div style="margin-bottom:12px;font-size:12px">
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
              </div> -->
              <div>
                <el-table
                :data="relatedDocsData"  border highlight-current-row stripe fit header-align="center"
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
              <el-form ref="form" label-width="80px" :model="headerData" style="margin-top:16px">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-form-item label="创建人" prop="createdBy">
                      <el-col :span="18">
                      <el-input v-model="headerData.createdBy" size="mini" :disabled="true"></el-input></el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="修改人" prop="updatedBy">
                      <el-col :span="18">
                      <el-input v-model="headerData.updatedBy" size="mini" :disabled="true"></el-input></el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核人" prop="postPersonName">
                      <el-col :span="18">
                      <el-input v-model="headerData.postPersonName" size="mini" :disabled="true"></el-input></el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom:12px">
                  <el-col :span="8">
                    <el-form-item label="创建时间" prop="createdTime">
                      <el-col :span="18">
                      <el-date-picker v-model="headerData.createdTime" type="datetime" size="mini" :disabled="true">
                                </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="修改时间" prop="updatedTime">
                      <el-col :span="18">
                      <el-date-picker v-model="headerData.updatedTime" type="datetime" size="mini" :disabled="true">
                                </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审核时间" prop="postDate">
                      <el-col :span="18">
                        <el-date-picker v-model="headerData.postDate" type="datetime" size="mini" :disabled="true">
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
    <div style="margin-top:12px;margin-bottom:6px" v-show="soStatusShow">
        <el-dropdown  @command="deliveryJudgment">
          <el-button type="warning" size="mini" :disabled="deliveryMarkStatus" >
            发货关闭<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="close" :disabled="deliveryMarkClose">关闭</el-dropdown-item>
            <el-dropdown-item command="cancel" :disabled="!deliveryMarkClose">取消关闭</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    <div class="table" style="margin-top:12px;">
      <common-table
        :data="list"
        :maxHeight="300"
        :fit="true" ref="multipleTable"
        :headers="headers"
        @selection-change="handleSelectionChange"
        >
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text == 'packType'">
              <span>{{list[scope.index]['packType'] | packTypeFilter}}</span>
            </div>
            <div v-if="scope.text == 'deliveryMark'">
              <el-checkbox :checked="list[scope.index]['deliveryMark']" disabled></el-checkbox>
              <!-- <span>{{list[scope.index]['deliveryMark'] | deliveryMark}}</span> -->
            </div>
          </template>
          <template slot-scope="scope" slot="default">
          </template>
        </common-table>
    </div>

  </div>
</template>
<script>
  import {pickerOptions} from '@/util'
  import { parseTime } from '@/filters/index.js'
  import { ENUMS } from '../../../assets/enums.js'
  import NP from 'number-precision'
  import {
    doQueryCodSo,
    doDeliveGoodsClose,
    doDeliveGoodsOpen
  } from 'api/sales-process/sales-contract/sales-contract.js'
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSelect from 'components/common-select/department-select.vue' //部门
  import CustomerSelect from 'components/common-select/customer-select.vue' //开票方
  const headersOfDeliveryParty = [//交货方信息
    // { type: 'selection', width: '55px'},
    { prop: 'index', label: '序号', width: '60px',align:'center',template:'index'},
    { prop: 'name', label: '收货人',align:'center' ,template:'name'},
    { prop: 'address', label: '收货地址',align:'center',template:'address' },
    { prop: 'phone', label: '联系电话', width: '160px',align:'center',template:'phone' },
  ]
  const headersOfCollection = [//收款计划
    { prop: 'pmRowNo', label: '序号',align:'center', width: '100px' },
    { prop: 'payType', label: '付款类型',align:'center',filter:'payType', width: '120px'},
    { prop: 'timeType', label: '时间节点',align:'center',filter:'timeType', width: '120px'},
    { prop: 'payMode', label: '支付方式',align:'center',filter:'payMode', width: '120px'},
    { prop: 'forwardDays', label: '远期天数',align:'center', width: '80px'},
    { prop: 'account', label: '票期',align:'center' , width: '80px'},
    { prop: 'currencyName', label: '币种',align:'center', width: '200px'},
    { prop: 'orginAmtTex', label: '原币金额', width: '80px',align:'center',digit:'2'},
    { prop: 'proportion', label: '比例%', width: '80px',align:'center'},
    { prop: 'remark', label: '备注',align:'center',},
  ]
  const headers = [//下方数据
    { type: 'selection', width: '55px',fixed:'left'},
    { prop: 'soDtlRowNo', label: '行号', width: '60px',align:'center' },
    { prop: 'goodsCode', label: '物料编号', width: '120px',align:'center'},
    { prop: 'goodsName', label: '物料名称', width: '120px',align:'center'},
    { prop: 'dtlQty', label: '数量', width: '120px',align:'center'},
    { prop: 'unitName', label: '单位' , width: '120px',align:'center'},
    { prop: 'packType', label: '包装方式' , width: '120px',align:'center',filter: 'packType'},
    { prop: 'priceTex', label: '含税单价' , width: '120px',align:'center'},
    { prop: 'texRate', label: '税率' , width: '120px',align:'center'},
    { prop: 'price', label: '无税单价' , width: '120px',align:'center'},
    { prop: 'amtTex', label: '含税金额' , width: '120px',align:'center'},
    { prop: 'amt', label: '税前金额' , width: '120px',align:'center'},
    { prop: 'texAmt', label: '税额' , width: '120px',align:'center'},
    { prop: 'deliveryMark', label: '发货关闭' , width: '120px',align:'center', filter: "deliveryMark"},
    { prop: 'remark', label: '备注' , width: '120px',align:'center'},
  ];

  export default {
    components:{
      ManagementSubject,CustomerSelect,DepartmentSelect
    },
    props:{
      updateId:'',
    },
    data(){
      return {
        tempAll:{

        },
        headerData:{//抬头信息
        },
        isConfirm:false,
        isBack:false,
        billingInfo:{//开票信息

        },
        aaa:false,
        deliveryPartyData:[],//交货方信息
        handleDeliveryParty:[],//交货方多选
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
        headersOfDeliveryParty:headersOfDeliveryParty,
        headersOfCollection:headersOfCollection,
        searchBarFlg: true,

        activeName:'first',

        sourceType:ENUMS["7280"],//合同来源
        deliveryDate:[],//交货日期
        signDate:null,//签署日期
        weightStandType: ENUMS["7125"],//计重标准
        transType: ENUMS["7120"],//运输方式
        soStatus: ENUMS["7020"],//合同状态
        packageType: ENUMS["7135"],//包装方式
        payType: ENUMS["7140"],//付款类型
        timeType: ENUMS["7145"],//时间节点
        payMode: ENUMS["7210"],//支付方式

        list:[],
        headers: headers,
        pickerOptions: {
            shortcuts: pickerOptions
        },
        multipleTableId:[],//选中参数
        deliveryMarkStatus:true,//按钮总状态
        deliveryMarkClose:true,//关闭状态
        soStatusShow:true,
      }
    },
    created(){
      this.getList();
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
      soStatus(val){
        return ENUMS["7020"][val];
      },
      deliveryMark(val){
        if(val == "0"){
          return false;
        }else {
          return true;
        }
      }
    },
    methods:{
      toCancel(){//取消
          this.activeName = 'first';
          this.$store.dispatch('toggleCurrentView', {
            SalesContract: {
              view: 'index'
              // params: 跳转过去的子组件的属性对象
            }
          });
      },
      getList(){
        this.deliveryDate = [];
        this.list = [];
        if(this.$route.query){
          var id = this.$store.getters.params.SalesContract.updateId;
          doQueryCodSo(id).then(response=> {
            if(response.data.status == 1){
              this.headerData = response.data.data.codSoVO;
              var list = response.data.data.codSoDtlVOList;
              // 明细数组
              list.forEach((o,i)=> {
                this.list.push({
                  amt:o.amt.toFixed(2),
                  amtTex:o.amtTex.toFixed(2),
                  deliveryMark:o.deliveryMark,
                  dtlQty:o.dtlQty.toFixed(2),
                  goodsCode:o.goodsCode,
                  goodsId:o.goodsId,
                  goodsName:o.goodsName,
                  packType:o.packType,
                  price:o.price.toFixed(6),
                  priceTex:o.priceTex.toFixed(6),
                  remark:o.remark,
                  soDtlRowNo:o.soDtlRowNo,
                  soDtlId:o.soDtlId,
                  soId:o.soId,
                  texAmt:o.texAmt.toFixed(2),
                  texRate:o.texRate.toFixed(2),
                  unitCode:o.unitCode,
                  unitId:o.unitId,
                  unitName:o.unitName,
                  version:o.version,
                  deliveryMark:o.deliveryMark,
                })
              })
              this.collectionPlanData = response.data.data.pmVOList;//收款计划
              this.deliveryDate.push(this.headerData.deliveryDateStart);//交货日期
              this.deliveryDate.push(this.headerData.deliveryDateEnd);
              this.headerData.weightStandType = this.headerData.weightStandType.toString();//计重标准
              this.headerData.transType = this.headerData.transType.toString();//运输方式
              this.headerData.sourceType = this.headerData.sourceType.toString();//合同来源
              this.headerData.rateCurrency = this.headerData.rateCurrency.toFixed(8);
              this.headerData.contractQty = this.headerData.contractQty.toFixed(2);
              this.list.forEach((o,i)=>{
                if(o.deliveryMark == 0){
                  o.deliveryMark = true;
                }else {
                  o.deliveryMark = false;
                }
              })
              if(this.headerData.soStatus == '70200060'){//已生效状态
                this.soStatusShow = true;
              }else {
                this.soStatusShow = false;
              }
              if(this.headerData.isConfirm == '0'){//客户确认
                this.isConfirm = true;
              }else {
                this.isConfirm = false;
              }
              if(this.headerData.isBack == '0'){
                this.isBack = true;
              }else {
                this.isBack = false;
              }
            }
          })
        }
      },
      handleSelectionChange(val){
        this.multipleTableId = val;
        if(val.length>0){
          this.deliveryMarkStatus = false;
          for(var i=0;i<val.length;i++){
            if(val[i].deliveryMark == true){
              this.deliveryMarkClose = true;
            }else {
              this.deliveryMarkClose = false;
            }
          }
        }else {
          this.deliveryMarkStatus = true;
        }
      },
      handleCellClick(){

      },
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      handleClick(){

      },
      deliveryJudgment(val){
        var arr = [];
        console.log(this.multipleTableId);
        this.multipleTableId.forEach((o,i)=>{
          arr.push({
            "soDtlId":o.soDtlId,
            "version":o.version,
          })
        })
        if(val == 'close'){//关闭
            this.$confirm('您确认要关闭吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              doDeliveGoodsOpen(arr).then(response=> {
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
        }else if(val == 'cancel'){//取消关闭
            this.$confirm('您确认要取消关闭吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
                doDeliveGoodsClose(arr).then(response=> {
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
    },
    watch: {
    }
  }

</script>

<style scoped>
  .heightOfHeader {
    height: 210px;
  }
</style>