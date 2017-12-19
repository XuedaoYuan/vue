<template>
    <div class="allTemplate">
        <div class="info" style="margin-bottom: 15px">
            <div style="margin-bottom:10px">
                <el-button-group>
                    <el-button type="primary" icon="el-icon-search" size="small" @click="Search">查询</el-button>
                    <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
                    <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
                </el-button-group>
                <el-button type="primary" icon="el-icon-refresh" size="small" @click="Reset" style="margin-left:10px">重置</el-button>
            </div>
            <el-collapse-transition>
                <div v-show="searchBarFlg">
                    <el-form ref="form" label-width="80px" :model="formData">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="经营主体" prop="companyName">
                                    <management-subject  @childevent = "childEventHandlerMainInfo" :querySelect="formData.companyName"></management-subject>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="部门" prop="orgName">
                                    <department-select  @childevent = "childEventHandlerDepartment" :querySelect="formData.orgName"></department-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款类别" prop="payCategory">
                                    <el-select  v-model="formData.payCategory" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in payCategory" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="收款单位" prop="payeeName">
                                    <!-- <el-input v-model="formData.payeeName" size="mini"></el-input> -->
                                    <supplier  @childevent="getChildevent" @getData="getData" :selectName="formData.payeeName" ref="supplierPage"></supplier>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="会计年度" prop="accountingYear">
                                    <el-input v-model="formData.accountingYear" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款申请号" prop="extApplyCode">
                                    <el-input v-model="formData.extApplyCode" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="银行账号" prop="payBankAccount">
                                    <el-input v-model="formData.payBankAccount" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="款项内容" prop="moneyContent">
                                    <el-select clearable v-model="formData.moneyContent" placeholder="请选择" size="mini">
                                        <el-option v-for="(value,key) in moneyContent" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="开户银行" prop="payBankAddress">
                                    <el-input v-model="formData.payBankAddress" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款方式" prop="payType">
                                    <el-select clearable  v-model="formData.payType" placeholder="请选择" size="mini">
                                        <el-option v-for="(value,key) in payType" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="申请付款日" prop="applyPayTime">
                                    <el-date-picker v-model="applyPayTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="实际付款日" prop="actualPayDate">
                                    <el-date-picker v-model="actualPayDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="币别" prop="currencyCode">
                              <!--<el-input v-model="formData.currencyName" size="mini"></el-input>-->
                                    <currency-Subject @childevent = "currencyNameFill" :querySelect="formData.currencyCode"></currency-Subject>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款类型" prop="paymentType">
                                    <el-select  v-model="formData.paymentType" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in paymentType" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="发送短信" prop="isSms">
                                    <el-select  v-model="formData.isSms" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in isSms" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="是否提交明细" prop="isCommitDtl">
                                    <el-select  v-model="formData.isCommitDtl" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in isCommitDtl" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="状态" prop="applyStatus">
                                    <el-select  v-model="formData.applyStatus" placeholder="请选择" size="mini" clearable>
                                        <el-option v-for="(value,key) in applyStatus" :key="key" :label="value" :value="key"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="OA审核标题" prop="auitTitle">
                                    <el-input v-model="formData.auitTitle" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="过账时间" prop="postDate">
                                    <el-date-picker v-model="formData.postDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="过账人" prop="postPersonName">
                                    <staff-select @childevent = "postPersonNameFill" :querySelect="formData.postPersonName"></staff-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="创建时间" prop="name">
                                    <el-date-picker v-model="createdTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="创建人" prop="createdBy">
                                    <staff-select @childevent = "createdByFill" :querySelect="formData.createdBy"></staff-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="修改时间" prop="updatedTime">
                                    <el-date-picker v-model="updatedTime" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="修改人" prop="updatedBy">
                                    <staff-select @childevent = "updatedByFill" :querySelect="formData.updatedBy"></staff-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-collapse-transition>
        </div>
        <div class="btn" style="margin-bottom:10px">
            <el-button type="warning" size="mini" @click.native="AddClick">创建</el-button>
            <!-- <el-button type="warning" size="mini" @click.native="EditClick" :disabled="showOrHide">修改</el-button> -->
            <el-button type="warning" size="mini" @click.native="EditClick">修改</el-button>
            <el-button type="warning" size="mini" >审核</el-button>
            <el-button type="warning" size="mini" @click.native="DeleteClick" >删除</el-button>
            <el-button type="warning" size="mini" @click.native="LookClick" :disabled="showOrHide">查询</el-button>
         <!--     <el-button type="warning" size="mini">操作</el-button>
              <el-button type="warning" size="mini">SAP操作</el-button>
              <el-button type="warning" size="mini" >导入</el-button>
              <el-button type="warning" size="mini" >导出</el-button>
              <el-button type="warning" size="mini" >审批信息查询</el-button>-->
            <el-button type="warning" size="mini" >提交ERP</el-button>
        </div>
        <div class="table">
            <div class="commonTable">
                <common-table
                :data="tableData"
                :maxHeight="300"
                :fit="true"
                :headers="header1"
                @cell-click="handleCellClick"
                @selection-change="handleSelectionChange"
                v-loading="listLoading"
                >
                </common-table>
            </div>
            <div class="pagination">
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
        </div>
    </div>
</template>
<script type="text/javascript">
import {
    doQueryPayApplyWithPage
} from '@/api/money/purchase-requisition/purchase-requisition';
import router from '@/router';
import ManagementSubject from 'components/common-select/management-subject.vue';//经营主体
import DepartmentSelect from '@/components/common-select/department-select.vue';//部门
import currencySubject from '@/components/common-select/currency-select.vue';//币别
import StaffSelect from '@/components/common-select/staff-select.vue' ;//人员
import supplier from '@/components/common-select/supplier.vue'//收款单位
import {pickerOptions} from '@/util';
const header1 = [
    { type: 'selection', width: '55px'},
    {prop: 'companyName', label: '经营主体',align: 'center', width: '120px'},
    {prop: 'orgName', label: '部门',align: 'center', width: '120px'},
    {prop: 'accountingYear', label: '会计年度',align: 'center', width: '120px'},
    {prop: 'extApplyCode', label: '付款申请号',align: 'center', width: '120px'},
    {prop: 'payCategory', label: '付款类别',align: 'center', width: '120px'},
    {prop: 'payeeName', label: '收款单位',align: 'center', width: '120px'},
    {prop: 'payBankAddress', label: '开户银行',align: 'center', width: '120px'},
    {prop: 'payType', label: '付款方式',align: 'center', width: '120px'},
    {prop: 'payBankAccount', label: '银行账号',align: 'center', width: '120px'},
    {prop: 'moneyContent', label: '款项内容',align: 'center', width: '120px'},
    {prop: 'itemApplyAmt', label: '申请金额',align: 'center', width: '120px'},
    {prop: 'currencyName', label: '币别',align: 'center', width: '120px'},
    {prop: 'paymentType', label: '付款类型',align: 'center', width: '120px'},
    {prop: 'rmbCurrencyRate', label: '人民币汇率',align: 'center', width: '120px'},
    {prop: 'baseCurrencyRate', label: '本位币汇率',align: 'center', width: '120px'},
    {prop: 'procedureProvider', label: '手续承担方',align: 'center', width: '120px'},
    {prop: 'isForeign', label: '是否外汇',align: 'center', width: '120px'},
    {prop: 'swift', label: 'SWIFT',align: 'center', width: '120px'},
    {prop: 'aaa', label: '收款方地址',align: 'center', width: '120px'},
    {prop: 'aaa', label: '收款银行地址',align: 'center', width: '120px'},
    {prop: 'applyStatus', label: '状态',align: 'center', width: '120px'},
    {prop: 'isSendSap', label: '发送SAP',align: 'center', width: '120px'},
    {prop: 'applyPayTime', label: '申请付款日',align: 'center', width: '120px'},
    {prop: 'actualPayDate', label: '实际付款日',align: 'center', width: '120px'},
    {prop: 'aaa', label: '原币已付款金额',align: 'center', width: '120px'},
    {prop: 'aaa', label: '本币已付款金额',align: 'center', width: '120px'},
    {prop: 'aaa', label: '原币未付款金额',align: 'center', width: '120px'},
    {prop: 'auitTitle', label: 'OA审核标题',align: 'center', width: '120px'},
    {prop: 'isSms', label: '发送短信',align: 'center', width: '120px'},
    {prop: 'applyAmt', label: '申请付款金额',align: 'center', width: '120px'},
    {prop: 'creditNo', label: '信用证号',align: 'center', width: '120px'},
    {prop: 'isCommitDtl', label: '是否提交明细',align: 'center', width: '120px'},
    {prop: 'supplierCreditAmt', label: '供应商信用额度',align: 'center', width: '120px'},
    {prop: 'usedCreditAmt', label: '已使用付款额度',align: 'center', width: '120px'},
    {prop: 'leftCreditAmt', label: '剩余付款额度',align: 'center', width: '120px'},
    {prop: 'aaa', label: '申请金额本位币',align: 'center', width: '120px'},
    {prop: 'remark', label: '备注',align: 'center', width: '120px'},
];
export default {
    components: {
        ManagementSubject,
        DepartmentSelect,
        currencySubject,
        StaffSelect,
        supplier
    },
    data(){
        return {
            //枚举
            payCategory:ENUMS["7320"],//付款类别
            paymentType:ENUMS["7315"],//付款类型
            applyStatus:ENUMS["7360"],//状态
            payType:ENUMS["7210"],//付款方式
            moneyContent:ENUMS["7401"],//款项内容
            isSms:ENUMS["7330"],//发送短信
            isCommitDtl:ENUMS["7335"],//是否提交明细

            formData: {
                companyName: '',//经营主体id
                companyId: '',//经营主体code
                companyCode: '',//经营主体name
                orgName: '',//部门name
                orgCode: '',//部门code
                orgId: '',//部门id
                accountingYear: '',//会计年度
                payeeName: '',//收款单位名称
                payBankAddress: '',//付款单位开户银行
                payType: '',//支付类型
                payCategory: '',//付款类别
                isSms: '',//发送短信
                isCommitDtl: '',//是否提交明细

                payBankAccount: '',//付款单位银行账号
                moneyContent: '',//款项内容
                currencyCode: '',//币别
                applyStatus: '',//付款申请状态
                auitTitle: '',//OA审核标题
                createdBy: '',//创建人
                postPersonName: '',//过账人
                updatedBy: '',//修改人
                //创建时间
                createdTimeStart: '',
                createdTimeEnd: '',
                //过账时间
                postDateStart: '',
                postDateEnd: '',
                //修改日期
                updatedTimeStart: '',
                updatedTimeEnd: '',
                //申请付款时间
                applyPayTimeStart: '',
                applyPayTimeEnd: '',
                //实际付款日
                actualPayDateStart: '',
                actualPayDateEnd: '',
            },
            applyPayTime: null,//申请付款时间
            actualPayDate: null,//实际付款日
            createdTime: null,//创建时间
            updatedTime: null,//更新时间
            postDate: null,//过账时间

            listLoading:false,
            searchBarFlg: true,
            header1: header1,
            tableData: [],
            pickerOptions: {
            shortcuts: pickerOptions
            },
            total:null,
            listQuery:{
                currentPage:1,
                pageSize:10,
            },
            deleteCellData:[],
            showOrHide:true,//按钮状态
        }
    },
    activated(){
        this.getList();
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            this.listLoading = true;
            let vm = this;
            doQueryPayApplyWithPage(vm.listQuery,vm.formData).then(res => {
                if (res.data.status === 1) {
                    this.tableData = res.data.data.datalist;
                    this.total = res.data.data.items;
                    this.listLoading = false;
                }else {
                    this.listLoading = false;
                }
            })
        },
        //查询
        Search(){
            this.getList();
        },
      //Reset
        Reset(){
            this.formData = {
                companyCode: '',//经营主体name
                orgCode: '',//部门name
                accountingYear: '',//会计年度
                payeeName: '',//收款单位名称
                payBankAddress: '',//付款单位开户银行
                payType: '',//支付类型
                payCategory: '',//付款类别
                isSms: '',//发送短信
                isCommitDtl: '',//是否提交明细

                payBankAccount: '',//付款单位银行账号
                moneyContent: '',//款项内容
                currencyCode: '',//币别
                applyStatus: '',//付款申请状态
                auitTitle: '',//OA审核标题
                createdBy: '',//创建人
                postPersonName: '',//过账人
                updatedBy: '',//修改人
                //创建时间
                createdTimeStart: '',
                createdTimeEnd: '',
                //过账时间
                postDateStart: '',
                postDateEnd: '',
                //修改日期
                updatedTimeStart: '',
                updatedTimeEnd: '',
                //申请付款时间
                applyPayTimeStart: '',
                applyPayTimeEnd: '',
                //实际付款日
                actualPayDateStart: '',
                actualPayDateEnd: '',
            };
            this.applyPayTime = null;//申请付款时间
            this.actualPayDate = null;//实际付款日
            this.createdTime = null;//创建时间
            this.updatedTime = null;//更新时间
            this.postDate = null;//过账时间
        },
        //创建
        AddClick(){
            this.$store.dispatch('toggleCurrentView', {
                PaymentRequisition: {
                    view: 'add',
                }
            });
        },
        //修改
        EditClick(){
            console.log(this.deleteCellData);
            this.$store.dispatch('toggleCurrentView', {
                PaymentRequisition: {
                    view: 'edit',
                    params: {
                        // "payApplyId":this.deleteCellData[0].payApplyId
                        "payApplyId":'00'
                    }
                }
            });
            // if(this.deleteCellData.length == 1){
            //     this.$store.dispatch('toggleCurrentView', {
            //         PaymentRequisition: {
            //             view: 'edit',
            //             params: {
            //                 "payApplyId":this.deleteCellData[0].payApplyId
            //             }
            //         }
            //     });
            // } else{
            //     this.$notify({
            //         title: '警告',
            //         message: '请选择一行进行修改',
            //         type: 'warning'
            //     });
            // }
        },
      //查看
        LookClick(){
            if(this.deleteCellData.length == 1){
                this.$store.dispatch('toggleCurrentView', {
                    PaymentRequisition: {
                        view: 'look',
                        params: {
                            "payApplyId":this.deleteCellData[0].payApplyId
                        }
                    }
                });
            }else{
              this.$notify({
                title: '警告',
                message: '请选择一行进行查看',
                type: 'warning'
            });
            }
        },
      //删除
        DeleteClick(){
            if(this.deleteCellData.length<1){
                this.$notify({
                    title: '警告',
                    message: '请选择一行或多行进行删除',
                    type: 'warning'
                });
            }else {
                this.$confirm('确定删除?', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i = 0; i < this.tableData.length; i++) {
                        for (var j = 0; j < this.deleteCellData.length; j++) {
                            if (this.deleteCellData[j] == this.tableData[i]) {
                                this.tableData.splice(i, 1);
                                i--;
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                        }
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            }
        },
        // 经营主体
        childEventHandlerMainInfo(val) {
            if(val){
                this.formData.companyId = val.companyId;
                this.formData.companyCode = val.companyCode;
                this.formData.companyName = val.companyName;
            }else {
                this.formData.companyId = '';
                this.formData.companyCode = '';
                this.formData.companyName = '';
            }
        },
        //部门
         childEventHandlerDepartment(val){ //
            if(val){
                this.formData.orgId = val.orgId;
                this.formData.orgCode = val.orgCode;
                this.formData.orgName = val.orgName;
            }else {
                this.formData.orgId = '';
                this.formData.orgCode = '';
                this.formData.orgName = '';
            }
        },
        //币别
        currencyNameFill(val){
            if(val){
                console.log(val)
                this.formData.currencyCode = val.currencyCode;
            }else {
                this.formData.currencyCode = '';
            }
        },
        //创建人
        createdByFill(val){
            if(val){
                console.log(val)
                this.formData.updatedBy = val.updatedBy;
            }else {
                this.formData.updatedBy = '';
            }
        },
        //修改人
        updatedByFill(val){
            if(val){
                console.log(val)
                this.formData.currencyName = val.currencyName;
            }else {
                this.formData.currencyName = '';
            }
        },
        //过账人
        postPersonNameFill(val){
            if(val){
                console.log(val)
                this.formData.postPersonName = val.postPersonName;
            }else {
                this.formData.postPersonName = '';
            }
        },
        getChildevent(val){//收款单位
            if(val){
                this.formData.payeeName = val.supplyName;
            }else {
                this.formData.payeeName = '';
            }
        },
        getData(data){//供应商
            if(data){
                this.formData.payeeCompanyCode = data.supplyCode;
                // this.formData.supplierId = data.id;
                this.formData.payeeName = data.supplyName;
            } else {
                this.formData.payeeCompanyCode = '';
                // this.formData.supplierId = data.id;
                this.formData.payeeName = '';
            }
        },
        handleCellClick(){

        },
        handleSelectionChange(val){
            var vm = this;
            vm.deleteCellData = val;
            if(val.length == 1){
                this.showOrHide = false;
            }else {
                this.showOrHide = true;
            }
        },
        //分页
        handleSizeChange(val){
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val){
            this.listQuery.currentPage = val;
            this.getList();
        },
    },
    watch: {
        createdTime: function(val) {//创建时间
            if (val && val[0] && val[1]) {
                this.formData.createdTimeStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
                this.formData.createdTimeEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
            } else {
                this.formData.createdTimeStart = '';
                this.formData.createdTimeEnd = '';
            }
        },
        postDate: function(val){//过账时间
            if (val && val[0] && val[1]) {
                this.formData.postDateStart = parseTime(val[0],'{y}-{m}-{d}');
                this.formData.postDateEnd = parseTime(val[1],'{y}-{m}-{d}');
            } else {
                this.formData.postDateStart = '';
                this.formData.postDateEnd = '';
            }
        },
        updatedTime: function(val){//修改日期
            if (val && val[0] && val[1]) {
                this.formData.updatedTimeStart = parseTime(val[0],'{y}-{m}-{d}');
                this.formData.updatedTimeEnd = parseTime(val[1],'{y}-{m}-{d}');
            } else {
                this.formData.updatedTimeStart = '';
                this.formData.updatedTimeEnd = '';
            }
        },
        applyPayTime: function(val){//申请付款时间
            if (val && val[0] && val[1]) {
                this.formData.applyPayTimeStart = parseTime(val[0],'{y}-{m}-{d}');
                this.formData.applyPayTimeEnd = parseTime(val[1],'{y}-{m}-{d}');
            } else {
                this.formData.applyPayTimeStart = '';
                this.formData.applyPayTimeEnd = '';
            }
        },
        actualPayDate: function(val){//实际付款日
            if (val && val[0] && val[1]) {
                this.formData.actualPayDateStart = parseTime(val[0],'{y}-{m}-{d} 00:00:00');
                this.formData.actualPayDateEnd = parseTime(val[1],'{y}-{m}-{d} 23:59:59');
            } else {
                this.formData.actualPayDateStart = '';
                this.formData.actualPayDateEnd = '';
            }
        },
    }
}
</script>
