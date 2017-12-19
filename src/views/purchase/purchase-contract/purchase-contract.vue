<template>
    <div class="allTemplate">
        <div class="info" style="margin-bottom: 15px">
            <div style="margin-bottom:10px">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="toQuery">查询</el-button>
                    <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
                    <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
                </el-button-group>
               <!-- <el-button type="primary" icon="el-icon-search" size="small" @click="toQuery">查询</el-button> -->
                <el-button type="primary" icon="el-icon-refresh" size="small" @click="resetBtn" style="margin-left:10px">重置</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="searchBarFlg">
                    <el-form ref="form" label-width="80px" :model="tempAll">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="经营主体" prop="name">
                                    <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="tempAll.manageSubName"></management-subject>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="部门" prop="name">
                                    <department-select  @childevent = "childEventHandlerDepartment" :querySelect="tempAll.bizOrgName"></department-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="合同状态" prop="poStatus">
                                    <el-select v-model="tempAll.poStatus" clearable placeholder="请选择" size="mini">
                                        <el-option v-for="(value,key) in poStatus" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="溢短装数量" prop="lessQty">
                                    <el-input v-model.number="tempAll.lessQty" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="供应商" prop="supplierName">
                                    <supplier  @childevent="getChildevent" @getData="getData" :selectName="tempAll.supplierName" ref="supplierPage"></supplier>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="创建时间" prop="name">
                                    <el-date-picker v-model="createTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" :editable="false" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="运输方式" prop="transType">
                                    <el-select v-model="tempAll.transType" clearable placeholder="请选择" size="mini">
                                        <el-option v-for="(value,key) in transType" :key="key" :label="value" :value="key"></el-option>
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
                                <el-form-item label="系统单据号" prop="poNo">
                                    <el-input v-model="tempAll.poNo" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="采购合同号" prop="poContractNo">
                                    <el-input v-model="tempAll.poContractNo" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="采购员" prop="buyerName">
                                    <!-- <el-input v-model="tempAll.buyerName" size="mini"></el-input> -->
                                    <staff-select @childevent="showBuyerName" :querySelect="tempAll.buyerName"></staff-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="提货方式" prop="pickUpType">
                                    <el-select v-model="tempAll.pickUpType" clearable placeholder="请选择" size="mini">
                                        <el-option v-for="(value,key) in pickUpType" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="签署时间" prop="signDate">
                                    <el-date-picker v-model="signDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" :editable="false" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="贸易地区" prop="tradeZoneName">
                                    <el-input v-model="tempAll.tradeZoneName" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="修改人" prop="updatedBy">
                                    <!-- <el-input v-model="tempAll.updatedBy" size="mini"></el-input> -->
                                    <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.updatedBy"></staff-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="审核人" prop="postPersonName">
                                    <!-- <el-input v-model="tempAll.postPersonName" size="mini"></el-input> -->
                                    <staff-select @childevent="showPostPersonName" :querySelect="tempAll.postPersonName"></staff-select>
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
                                <el-form-item label="创建人" prop="createdBy">
                                    <!-- <el-input v-model="tempAll.createdBy" size="mini"></el-input> -->
                                    <staff-select @childevent="showCreatedBy" :querySelect="tempAll.createdBy"></staff-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="修改时间" prop="name">
                                    <el-date-picker v-model="updatedTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" :editable="false" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="审核时间" prop="name">
                                    <el-date-picker v-model="postDate" type="daterange" start-placeholder="开始日期" :editable="false" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="OA审核标题" prop="auitTitle">
                                    <el-input v-model="tempAll.auitTitle" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">

                        </el-row>
                    </el-form>
                </div>
            </el-collapse-transition>
        </div>
        <div class="btn" style="margin-bottom:10px">
            <el-button type="warning" size="mini" @click.native="establish('add')">创建</el-button>
            <!-- <el-button type="warning" size="mini" @click.native="establish('edit')">修改</el-button> -->
            <el-button type="warning" size="mini" @click.native="establish('edit')" :disabled = 'this.isPoStatus!="70200010" && this.isPoStatus!="70200050"'>修改</el-button>
            <el-button type="warning" size="mini" @click.native="toExamine" :disabled='this.isDbPoStatus!="70200030"'>审核</el-button>
            <el-button type="warning" size="mini" @click.native="toCancel" :disabled="this.isDbPoStatus!='70200060'">取消审核</el-button>
            <el-button type="warning" size="mini" @click.native="toDelete" :disabled = 'this.isDbPoStatus!="70200010"'>删除</el-button>
            <!-- <el-button type="warning" size="mini" @click.native="toLook" :disabled = 'this.multipleSelection.length!=1'>查看</el-button> -->
            <!-- <el-button type="warning" size="mini">操作</el-button> -->
            <!-- <el-button type="warning" size="mini" plain>复制</el-button> -->
            <!-- <el-button type="warning" size="mini" plain>导出</el-button> -->
            <el-button type="warning" size="mini" @click="toContractClose" :disabled = 'this.isDbPoStatus!="70200060"'>合同关闭</el-button>
            <el-button type="warning" size="mini" @click="toSubmitErp" :disabled = 'this.isDbPoStatus!="70200010" && this.isDbPoStatus!="70200050"'>提交ERP</el-button>
            <el-button type="warning" size="mini" :disabled="this.isBack !=1 || this.isDbPoStatus != '70200060'" @click="toBackConfirm">收回原件确认</el-button>
        </div>
        <div class="table">
           <common-table
            :data="list"
            :maxHeight="300"
            :fit="true"
            :headers="headers"
            v-loading.body="listLoading"
            @cell-click="handleCellClick"
            @row-db-click = "handleDblclick"
            @selection-change="handleSelectionChange"
            >
                <template slot="filter" slot-scope="scope">
                    <!-- 合同类型 -->
                    <div v-if="scope.text == 'poType'">
                      <span>{{list[scope.index]['poType'] | poTypeFilter}}</span>
                    </div>
                    <!-- 合同状态 -->
                    <div v-if="scope.text == 'poStatus'">
                      <span>{{list[scope.index]['poStatus'] | poStatusFilter}}</span>
                    </div>
                    <!-- 运输方式 -->
                    <div v-if="scope.text == 'transType'">
                      <span>{{list[scope.index]['transType'] | transTypeFilter}}</span>
                    </div>
                    <!-- 计重标准 -->
                    <div v-if="scope.text == 'weightStandType'">
                      <span>{{list[scope.index]['weightStandType'] | weightStandTypeFilter}}</span>
                    </div>
                    <!-- 提货方式 -->
                    <div v-if="scope.text == 'pickUpType'">
                      <span>{{list[scope.index]['pickUpType'] | pickUpTyprFilter}}</span>
                    </div>
                    <!-- 包装方式 -->
                    <div v-if="scope.text == 'packType'">
                      <span>{{list[scope.index]['packType'] | packTypeFilter}}</span>
                    </div>
                    <!-- 签署日期 -->
                    <div v-if="scope.text == 'signDate'">
                      <span>{{list[scope.index]['signDate'] | parseTime('{y}-{m}-{d}')}}</span>
                    </div>
                    <!-- 交货期限 -->
                    <div v-if="scope.text == 'deliveryDateEnd'">
                      <span>{{list[scope.index]['deliveryDateStart'] | parseTime('{y}-{m}-{d}')}}</span> -
                      <span>{{list[scope.index]['deliveryDateEnd'] | parseTime('{y}-{m}-{d}')}}</span>
                    </div>
                </template>
                <template slot-scope="scope">

                </template>
            </common-table>
        </div>
        <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.currentPage"
              :page-sizes="[10, 20, 30,50]"
              :page-size="listQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
       <!--  <el-dialog
            title="您确认要审核吗?"
            :visible.sync="checkDialogShow"
            top="15%"
            width="20%">
            <el-radio-group v-model="radio">
              <el-radio label="1">通 过</el-radio>
              <el-radio label="2">驳 回</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
               <el-button @click="checkDialogShow = false">取 消</el-button>
               <el-button type="primary" @click="doPosting">确 定</el-button>
            </span>
          </el-dialog> -->
            <div>
                <check-dialog  :checkDialogShow="checkDialogShow" @childevent="checkStatus" @closeItem="closeCheckDialog"></check-dialog>
            </div>

    </div>
</template>
<script type="text/javascript">
import router from '@/router';
import {pickerOptions} from '@/util';
import { parseTime } from '@/filters/index.js'
// import {}
import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
import DepartmentSelect from '@/components/common-select/department-select.vue'//部门
import supplier from '@/components/common-select/supplier.vue'//供应商
import StaffSelect from '@/components/common-select/staff-select.vue' //人员
import CheckDialog from '@/components/common-dialog/check-dialog.vue' //审核弹框
import {
    doQueryCodPoWithPage,
    doSubmitCodPo,//提交ERP
    doAuditCodPo,//合同审核
    doCloseCodPo,//合同关闭
    doDelCodPo,//删除
    doCancelAuditPo,//取消审核
    doIsBackConfirm,//收回原件确认
} from '@/api/purchase/purchase-contract/purchase-contract';
const headers = [
        { type: 'selection', width: '55px',fixed:'left'},
        { prop: 'poNo', label: '系统单据号', width: '160px',align:'center' },
        { prop: 'poContractNo', label: '采购合同号', width: '120px',align:'center' },
        { prop: 'buyerName', label: '采购员', width: '120px',align:'center' },
        { prop: 'poType', label: '合同类型', width: '120px',align:'center',filter: 'poType'},
        { prop: 'manageSubName', label: '经营主体', width: '120px',align:'center' },
        { prop: 'bizOrgName', label: '部门', width: '120px',align:'center' },
        { prop: 'supplierName', label: '供应商', width: '120px',align:'center' },
        { prop: 'poStatus', label: '合同状态', width: '120px',align:'center',filter: 'poStatus',},
        // { prop: 'packType', label: '包装方式', width: '120px',align:'center',filter: 'packType'},
        { prop: 'lessQty', label: '溢短装数量', width: '120px',align:'center' },
        { prop: 'signDate', label: '签署日期', width: '120px',align:'center',dataType:'Date'},
        { prop: 'tradeZoneName', label: '贸易地区', width: '120px',align:'center' },
        { prop: 'transType', label: '运输方式', width: '120px',align:'center' ,filter: 'transType',},
        { prop: 'weightStandType', label: '计重标准', width: '120px',align:'center',filter: 'weightStandType' },
        { prop: 'deliveryDateEnd',dataType:'Date' ,label: '交货期限', width: '150px',align:'center' ,filter:'deliveryDateEnd'},
        { prop: 'pickUpType', label: '提货方式', width: '120px',align:'center',filter: 'pickUpType'},
        { prop: 'auitTitle', label: 'OA审核标题', width: '120px',align:'center' },
        { prop: 'createdBy', label: '创建人', width: '120px',align:'center' },
        { prop: 'createdTime', label: '创建时间', width: '120px',align:'center',dataType:'Time' },
        { prop: 'updatedBy', label: '修改人', width: '120px',align:'center' },
        { prop: 'updatedTime', label: '修改时间', width: '120px',align:'center',dataType:'Time' },
        { prop: 'postPersonName', label: '审核人', width: '120px',align:'center' },
        { prop: 'postDate', label: '审核时间', width: '120px',align:'center',dataType:'Time' }
    ];

export default {
    components:{
        ManagementSubject,
        DepartmentSelect,
        supplier,
        StaffSelect,
        CheckDialog
    },
    data(){
      return {
        searchBarFlg: true,
        tempAll:{
            manageSubId:'',//经营主体Id
            manageSubCode:'',//经营主体code
            manageSubName:'',//经营主体name
            bizOrgId:'',//部门id
            bizOrgCode:'',//部门code
            bizOrgName:'',//部门name
            poStatus:'',//合同状态
            lessQty:'',//溢短装数量
            supplierId:'',//供应商id
            supplierCode:'',//供应商code
            supplierName:'',//供应商name
            createdTimeStart:'',//创建时间--开始
            createdTimeEnd:'',//创建时间--结束
            transType:'',//运输方式
            weightStandType:'',//计重标准
            poNo:'',//系统单据号
            poContractNo:'',//采购合同号
            buyerName:'',//采购员
            pickUpType:'',//提货方式
            signDateStart:'',//签署日期--开始
            signDateEnd:'',//签署日期--结束
            tradeZoneName:'',//贸易地区
            updatedBy:'',//修改人
            postPersonName:'',//审核人
            deliveryDateStart:'',//交货期限始
            deliveryDateEnd:'',//交货期限止
            createdBy:'',//创建人
            updatedTimeStart:'',//修改时间--开始
            updatedTimeEnd:'',//修改时间--结束
            postDateStart:'',//审核时间--开始
            postDateEnd:'',//审核时间--结束
            auitTitle:'',//OA审核标题

        },
        createTime:[],//创建时间
        signDate:[],//签署日期
        deliveryDate:[],//交货期限
        updatedTime:[],//修改日期
        postDate:[],//审核时间
        list:[],
        headers:headers,
        total:null,
        listQuery:{
          currentPage:1,
          pageSize:10,
        },
        updateId:null,//修改id
        selectIdList:[],//多选id
        multipleSelection:[],//多选

        pickerOptions: {
            shortcuts: pickerOptions
        },
        //枚举
        poStatus:ENUMS['7020'],//合同状态
        poType:ENUMS['7350'],//合同类型
        transType:ENUMS['7120'],//运输方式
        weightStandType:ENUMS['7125'],//计重标准
        pickUpType:ENUMS['7130'],//提货方式
        listLoading:false,//缓冲
        packType:ENUMS['7135'],//包装方式
        version:null,//版本号
        isPoStatus:null,//合同状态
        isDbPoStatus:null,
        isBack:null,//收回原件确认状态
        checkDialogShow:false,
        radio:'1',
        radioStatus:null,//审核状态
      }
    },
    created(){
        this.getList();
    },
    activated(){
        this.getList();
    },
    methods:{
        getList(){
            this.listLoading = true;
            doQueryCodPoWithPage(this.listQuery,this.tempAll).then( response => {
                if(response.data.status === 1){
                    this.list = response.data.data.datalist;
                    this.total = response.data.data.items;
                    this.listLoading = false;
                } else {
                    this.listLoading = false;
                }
            }).catch(()=> {
                this.listLoading = false;
            })
        },
        getList1(){
            doGet().then(response => {

            });
        },
        toQuery(){//搜索
            // console.log(this.tempAll,'shijian');
            // 创建时间
            if(this.createTime != '' && this.createTime != null){
                this.tempAll.createdTimeStart = this.createTime[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.createdTimeEnd = this.createTime[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            } else {
                this.tempAll.createdTimeStart = '';
                this.tempAll.createdTimeEnd = '';
            };
            // 签署日期
            if(this.signDate != '' && this.signDate != null){
                this.tempAll.signDateStart = this.signDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.signDateEnd = this.signDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            } else {
                this.tempAll.signDateStart = '';
                this.tempAll.signDateEnd = '';
            };
            // 交货期限
            if(this.deliveryDate != '' && this.deliveryDate != null){
                this.tempAll.deliveryDateStart = this.deliveryDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.deliveryDateEnd = this.deliveryDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            } else {
                this.tempAll.deliveryDateStart = '';
                this.tempAll.deliveryDateEnd = '';
            };
            // 修改日期
            if(this.updatedTime != '' && this.updatedTime != null){
                this.tempAll.updatedTimeStart = this.updatedTime[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.updatedTimeEnd = this.updatedTime[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            } else {
                this.tempAll.updatedTimeStart = '';
                this.tempAll.updatedTimeEnd = '';
            };
            // 审核日期
            // console.log(this.postDate.length,"this.postDate.length");
            if(this.postDate != '' && this.postDate != null){
                this.tempAll.postDateStart = this.postDate[0].parseTime ('YYYY-MM-DD HH:MM:SS');
                this.tempAll.postDateEnd = this.postDate[1].parseTime ('YYYY-MM-DD HH:MM:SS');
            } else {
                this.tempAll.postDateStart = '';
                this.tempAll.postDateEnd = '';
            };
            this.getList();
        },
        //重置
        resetBtn(){
            this.tempAll = {
                manageSubId:'',//经营主体Id
                manageSubCode:'',//经营主体code
                manageSubName:'',//经营主体name
                bizOrgId:'',//部门id
                bizOrgCode:'',//部门code
                bizOrgName:'',//部门name
                poStatus:'',//合同状态
                lessQty:'',//溢短装数量
                supplierId:'',//供应商id
                supplierCode:'',//供应商code
                supplierName:'',//供应商name
                createdTimeStart:'',//创建时间--开始
                createdTimeEnd:'',//创建时间--结束
                transType:'',//运输方式
                weightStandType:'',//计重标准
                poNo:'',//系统单据号
                poContractNo:'',//采购合同号
                buyerName:'',//采购员
                pickUpType:'',//提货方式
                signDateStart:'',//签署日期--开始
                signDateEnd:'',//签署日期--结束
                tradeCountry:'',//贸易地区
                updatedBy:'',//修改人
                postPersonName:'',//审核人
                deliveryDateStart:'',//交货期限始
                deliveryDateEnd:'',//交货期限止
                createdBy:'',//创建人
                updatedTimeStart:'',//修改时间--开始
                updatedTimeEnd:'',//修改时间--结束
                postDateStart:'',//审核时间--开始
                postDateEnd:'',//审核时间--结束
                auitTitle:'',//OA审核标题
            };
            this.createTime = [];//创建时间
            this.signDate = [];//签署日期
            this.deliveryDate = [];//交货期限
            this.updatedTime = [];//修改日期
            this.postDate = [];//审核时间
        },
        handleCellClick(row){//单击列表
            this.updateId = row.poId;//主数据id
            // this.version = row.version;//版本号
            // this.isPoStatus = row.poStatus;//合同状态
            // console.log(this.isPoStatus,"this.isPoStatus");
            // this.isBack = row.isBack;//收回原件按钮状态
        },
        handleSelectionChange(val){//复选框
            if(val){
                this.multipleSelection = val;
                let vm = this;
                this.selectIdList = [];
                if(val.length == 1){
                    this.isPoStatus = val[0].poStatus;//合同状态
                    // this.isBack = val[0].isBack;
                }else {
                    this.isPoStatus = null;//合同状态
                    // this.isBack = null;
                }
                if(this.multipleSelection.length > 0){
                    // this.updateId = this.multipleSelection[0].poId;
                    this.multipleSelection.forEach((o,i) => {
                        this.selectIdList.push({
                            "poId":o.poId,
                            "version":o.version
                        });
                        vm.isDbPoStatus = o.poStatus;
                        vm.isBack = o.isBack;
                    })
                }else {
                    this.isDbPoStatus = null;
                    this.isBack = null;
                }
            }
        },
        handleSizeChange(val){//分页 一页显示多少条数据
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val){//分页 第几页
            this.listQuery.currentPage = val;
            this.getList();
        },
        establish(text){
            var vm = this;
            if (text == 'add') {
              // router.push({params: {type: 'add'}});
                this.$store.dispatch('toggleCurrentView',{
                    PurchaseContract: {
                        view: 'add'
                        // params: 跳转过去的子组件的属性对象
                    }
                })
            } else if (text == 'edit') {
                if(vm.updateId){
                    // this.$router.push({params: {type: 'edit'},query: {updateId:vm.updateId}});
                    this.$store.dispatch('toggleCurrentView',{
                        PurchaseContract: {
                            view: 'edit',
                            params: {
                                'updateId':vm.updateId
                            }
                        }
                    })
                }
                 // this.$router.push({params: {type: 'edit'}})
            }
        },
        handleDblclick(){//查看按钮
            let vm = this;
            if(vm.updateId){
                // this.$router.push({params: {type: 'detail'},query: {updateId:vm.updateId}});
                this.$store.dispatch('toggleCurrentView',{
                    PurchaseContract: {
                        view: 'look',
                        params: {
                            'updateId':vm.updateId
                        }
                    }
                })
            }
        },
        //删除按钮
        toDelete(){
            this.isDbPoStatus = null;
            var vm = this;
            this.$confirm('您确认要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // if(vm.updateId && vm.version){
                    doDelCodPo(vm.selectIdList).then( response => {
                        if(response.data.status == 1){
                            this.$notify({
                              title: '成功',
                              message: '删除成功！',
                              type: 'success'
                            });
                            this.getList();
                        }
                    })
                // }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        toContractClose(){//合同关闭
            this.isDbPoStatus = null;
            this.$confirm('您确认要合同关闭吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // if(this.updateId && this.version){
                    doCloseCodPo(this.selectIdList).then( response => {
                        if(response.data.status == 1){
                            this.$notify({
                              title: '成功',
                              message: '合同关闭成功！',
                              type: 'success'
                            });
                            this.getList();
                        }
                    })
                // }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        toSubmitErp(){//提交ERP
            this.isDbPoStatus = null;
            this.$confirm('您确认要提交ERP吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // if(this.updateId && this.version){
                    doSubmitCodPo(this.selectIdList).then( response => {
                        if(response.data.status == 1){
                            this.$notify({
                              title: '成功',
                              message: '提交ERP成功！',
                              type: 'success'
                            });
                            this.getList();
                        }
                    })
                // }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        toExamine(){//审核
            this.checkDialogShow = true;
        },
        checkStatus(val){//审核确定
            // console.log(this.radio,"radio");
            this.radio = val;
            if(this.radio == '1'){
                this.radioStatus = '70200060';
                this.selectIdList.forEach((o,i) => {
                    o["poStatus"] = this.radioStatus;
                });
                // this.isDbPoStatus = null;
                doAuditCodPo(this.selectIdList).then( response => {
                    if(response.data.status == 1){
                        this.$notify({
                          title: '成功',
                          message: '审批成功！',
                          type: 'success'
                        });
                        this.getList();
                        // this.checkDialogShow = false;
                    }
                })
            } else if(this.radio == '2'){
                this.radioStatus = "70200050";
                this.selectIdList.forEach((o,i) => {
                    o["poStatus"] = this.radioStatus;
                });
                // this.isDbPoStatus = null;
                doAuditCodPo(this.selectIdList).then( response => {
                    if(response.data.status == 1){
                        this.$notify({
                          title: '成功',
                          message: '驳回成功！',
                          type: 'success'
                        });
                        this.getList();
                    }

                })
            }
            this.checkDialogShow = false;
        },
        closeCheckDialog(){
            this.checkDialogShow =false;
        },
        toCancel(){
            this.isDbPoStatus = null;
            this.$confirm('您确认要取消审核吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // if(this.updateId && this.version){
                    doCancelAuditPo(this.selectIdList).then( response => {
                        if(response.data.status == 1){
                            this.$notify({
                              title: '成功',
                              message: '取消审核成功！',
                              type: 'success'
                            });
                            this.getList();
                        }
                    })
                // }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        toBackConfirm(){//收回原件确认
            this.isDbPoStatus = null;
            this.$confirm('您确认要收回原件确认吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                // if(this.updateId && this.version){
                    doIsBackConfirm(this.selectIdList).then( response => {
                        if(response.data.status == 1){
                            this.$notify({
                              title: '成功',
                              message: '收回原件确认成功！',
                              type: 'success'
                            });
                            this.getList();
                        }
                    })
                // }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        childEventHandlerMainInfo(val){//经营主体
            console.log(val);
            if(val){
                this.tempAll.manageSubId = val.companyId;
                this.tempAll.manageSubCode = val.companyCode;
                this.tempAll.manageSubName = val.companyName;
            } else {
                this.tempAll.manageSubId = '';
                this.tempAll.manageSubCode = '';
                this.tempAll.manageName = '';
            }

        },
        childEventHandlerDepartment(val){//部门
            console.log(val);
            if(val){
                this.tempAll.bizOrgId = val.orgId;//部门id
                this.tempAll.bizOrgCode = val.orgCode;//部门code
                this.tempAll.bizOrgName = val.orgName;//部门name
            } else {
                this.tempAll.bizOrgId = '';//部门id
                this.tempAll.bizOrgCode = '';//部门code
                this.tempAll.bizOrgName = '';//部门name
            }
        },
        getChildevent(val){
            if(val){
                this.tempAll.supplyName = val.supplyName;
            }else {
                this.tempAll.supplyName = '';
            }
        },
        getData(data){//供应商
            this.tempAll.supplierCode = data.supplyCode;
            this.tempAll.supplierId = data.id;
            this.tempAll.supplierName = data.supplyName;
        },
        childEventHandlerStaff(val){//人员
            console.log(val,"修改人");
            if (val) {
                this.tempAll.updatedBy = val.userName;
            } else {
                this.tempAll.updatedBy = '';
            }
        },
        showPostPersonName(val){//审核人
            if (val) {
                this.tempAll.postPersonName = val.userName;
            } else {
                this.tempAll.postPersonName = '';
            }
        },
        showCreatedBy(val){//创建人
            if (val) {
                this.tempAll.createdBy = val.userName;
            } else {
                this.tempAll.createdBy = '';
            }
        },
        showBuyerName(val){//采购员
            console.log(val,'采购员');
            if(val){
                 this.tempAll.buyerName = val.userName;
            } else {
                 this.tempAll.buyerName = '';
            }
        }
    },
    filters:{
        transTypeFilter(val){//运输方式
            return ENUMS['7120'][val];
        },
        weightStandTypeFilter(val){//计重标准
            return ENUMS['7125'][val];
        },
        pickUpTyprFilter(val){//提货方式
            return ENUMS['7130'][val];
        },
        poStatusFilter(val){//合同状态
            return ENUMS['7020'][val];
        },
        poTypeFilter(val){//提货方式
            return ENUMS['7350'][val];
        },
        packTypeFilter(val){//包装方式
            return ENUMS['7135'][val];
        }
    }
}
</script>
<style>
</style>
