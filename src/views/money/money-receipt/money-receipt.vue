<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px" class="btn">
        <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small">重置</el-button>
      </div>
      <el-form ref="form" label-width="80px" :model="formData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="经营主体" >
              <management-subject  @childevent = "manageSubNameFill"></management-subject>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!--少字段-->
            <el-form-item label="销售合同号" prop="creditClass">
              <el-input v-model="formData.creditClass" size="mini" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="认领部门" >
              <department-subject  @childevent = "bizOrgNameFill"></department-subject>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款方式" prop="payeeType">
              <el-select v-model="formData.payeeType" placeholder="请选择" size="mini" clearable>
                <!--<el-option v-for="(value,key) in ENUMS['7401']" :key="key" :label="value" :value="key"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="收款日期">
              <el-date-picker v-model="formData.payeeDate" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="款项内容" prop="amtDesc">
              <el-select v-model="formData.amtDesc" placeholder="请选择" size="mini" clearable>
                <el-option v-for="(value,key) in amtDesc" :key="key" :label="value" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="payeeStatus">
              <el-select v-model="formData.payeeStatus" placeholder="请选择" size="mini" clearable>
                <!--<el-option v-for="(value,key) in payeeStatus" :key="key" :label="value" :value="key"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款单位" prop="payCompanyName">
              <el-input v-model="formData.payCompanyName" size="mini" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="采购合同号" prop="poContractNo">
              <el-input v-model="formData.poContractNo" size="mini" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="财务审核状态" prop="auditStatus">
              <el-select v-model="formData.auditStatus" placeholder="请选择" size="mini" clearable>
                <!--<el-option v-for="(value,key) in auditStatus" :key="key" :label="value" :value="key"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款类别" prop="payeeCategory">
              <el-select v-model="formData.payeeCategory" placeholder="请选择" size="mini" clearable>
                <!--<el-option v-for="(value,key) in payeeCategory" :key="key" :label="value" :value="key"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发送SAP状态" prop="isSendSap">
              <el-select v-model="formData.isSendSap" placeholder="请选择" size="mini" clearable>
                <el-option  key="1" label="已发送" value="1"></el-option>
                <el-option  key="0" label="未发送" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="创建人" prop="createdBy">
              <el-input v-model="formData.extInvoiceNo" size="mini" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会计年度" prop="accountingYear">
              <el-input v-model="formData.accountingYear" size="mini" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款单号" prop="rbNo">
              <el-input v-model="formData.rbNo" size="mini" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" size="mini" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn" style="margin-bottom: 10px">
        <el-button type="warning" size="mini" @click.native="onClickAdd">创建</el-button>
        <el-button type="warning" size="mini" @click.native="onClickEdit">修改</el-button>
        <el-button type="warning" size="mini">过账</el-button>
        <el-button type="warning" size="mini" @click="onClickDel">删除</el-button>
        <el-button type="warning" size="mini" @click.native="onClickDetail">查看</el-button>
        <el-button type="warning" size="mini">一般认领</el-button>
        <el-button type="warning" size="mini">特殊认领</el-button>
        <!--<el-button type="warning" size="mini">二次发送SAP</el-button>-->
        <!--<el-button type="warning" size="mini">审核</el-button>-->
        <!--<el-button type="warning" size="mini">SPA操作</el-button>-->
        <!--<el-button type="warning" size="mini" plain>导出/导出</el-button>-->
        <!--<el-button type="warning" size="mini" plain>模板下载</el-button>-->
    </div>
    <div class="commonTable">
        <common-table
          :data="tableData"
          :maxHeight="300"
          :fit="true"
          :headers="headers"
          @cell-click="handleCellClick"
          @selection-change="handleSelectionChange"
        >
            <template slot-scope="scope">
        <!-- <div v-if="scope.text == 'select'">
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'date'">
          <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="scope.text == 'input'">
          <el-input v-model="list[scope.index]['name']"></el-input>
        </div> -->
            </template>
        </common-table>
    </div>
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
</template>
<script type="text/javascript">
  import router from '@/router';
  import {pickerOptions} from '@/util';
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from 'components/common-select/department-select.vue'//部门
  const headers = [
    { prop: 'checkbox', width: 100, type: 'selection'},
    // { prop: 'name', label: '申请单号', template: 'input' },
    { prop: 'manageSubName', label: '经营主体',width:'120px',align:'center'},
    { prop: 'accountingYear', label: '会计年度',width: '120px',align:'center' },
    { prop: 'rbNo', label: '收款单号' ,width:'120px',align:'center'},
    { prop: 'payeeDate', label: '收款日期' ,width:'120px',align:'center'},
    { prop: 'payeeStatus', label: '状态' ,width:'120px',align:'center'},
    { prop: 'isSendSap', label: '发送SAP' ,width:'120px',align:'center'},
    { prop: 'auditStatus', label: '财务审核状态' ,width:'120px',align:'center'},
    { prop: 'name', label: 'SAP单据编号' ,width:'120px',align:'center'},
    { prop: 'payCompanyName', label: '付款单位' ,width:'120px',align:'center'},
    { prop: 'name', label: '付款单位描述' ,width:'120px',align:'center'},
    { prop: 'currencyCode', label: '货币' ,width:'120px',align:'center'},
    { prop: 'payeeAmt', label: '收款金额' ,width:'120px',align:'center'},
    { prop: 'payeeAmtBase', label: '收款金额本位币' ,width:'120px',align:'center'},
    { prop: 'payeeCategory', label: '收款类别' ,width:'120px',align:'center'},
    { prop: 'payeeType', label: '收款方式' ,width:'120px',align:'center'},
    { prop: 'remark', label: '备注' ,width:'120px',align:'center'},
    { prop: 'createdBy', label: '创建人' ,width:'120px',align:'center'},
    { prop: 'createdTime', label: '创建日期' ,width:'120px',align:'center'}
  ];
  const baseList = [{
    date: '2016-05-07',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }];
  export default {
    components:{
      ManagementSubject,
      DepartmentSubject
    },
    data(){
      return {
        pickerOptions: {
            shortcuts: pickerOptions
        },
        formData:{
            manageSubName:'',//经营主体name
            orgName:'',//认领部门
            payeeDate:'',//收款日期
            payeeStatus:'',//状态
            payeeType:'',//收款方式
            poContractNo:'',//采购合同号
            //销售合同号
            payeeCategory:'',//收款类别
            payCompanyName:'',//付款单位
            createdBy:'',//创建人
            amtDesc:'',//款项内容
            remark:'',//备注
            isSendSap:'',//发送SAP状态
            accountingYear:'',//年度会计
            rbNo:'',// 收款单号
            auditStatus:'',//财务审核状态
        },
        listQuery:{
          pageSize:1,
          currentPage:2
        },
        multipleSelection: [],
        total:100,
        headers: headers,
        tableData: baseList,
        amtDesc:ENUMS['7401'],
      }
    },
    methods:{
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
        this.multipleSelection = row;
      },
      //分页
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      onClickAdd() {
//        router.push({ params: { type: 'add' } });
        this.$store.dispatch('toggleCurrentView', {
          MoneyReceipt: {
            view: 'add',
          }
        });
        console.log(this.$route);
        console.log(router);
      },
      onClickEdit() {
        if(this.multipleSelection.length == 1){
//          router.push({ params: { type: 'edit'}, query:{poInvoiceId: this.multipleSelection[0].poInvoiceId}});
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'edit',
              params: {
                "poInvoiceId":this.multipleSelection[0].poInvoiceId
              }
            }
          });
        } else{
          this.$notify({
            title: '警告',
            message: '请选择一行进行修改',
            type: 'warning'
          });
        }
      },
      onClickDetail() {
        if(this.multipleSelection.length == 1){
//          router.push({ params: { type: 'detail'}, query:{poInvoiceId: this.multipleSelection[0].poInvoiceId}});
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'look',
              params: {
                "poInvoiceId":this.multipleSelection[0].poInvoiceId
              }
            }
          });
        } else{
          this.$notify({
            title: '警告',
            message: '请选择一行进行修改',
            type: 'warning'
          });
        }
      },
      manageSubNameFill(val){ // 经营主体
        if(val){
          this.formData.manageSubName = val.companyName;
        }else {
          this.formData.manageSubName = '';
        }
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.formData.OrgName = val.orgName;
        }else {
          this.formData.OrgName = '';
        }
      },
      onClickDel() {
        if(this.multipleSelection.length<1){
          this.$notify({
            title: '警告',
            message: '请选择一行或多行进行删除',
            type: 'warning'
          });
        }
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
