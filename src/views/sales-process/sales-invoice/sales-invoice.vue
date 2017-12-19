<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <sales-invoice-form :dataForPage="dataForPage" :pageState="pageState"
       @doClearPage="doClearPage"  @getTableData="getTableData" ref="formPage" :listQuery="listQuery"></sales-invoice-form>
    </div>
    <div class="btn" style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click.native="establish('add')">创建</el-button>
      <el-button type="warning" size="mini" @click="establish('edit')" :disabled="!toChangeOne.res">修改</el-button>
      <el-button type="warning" size="mini" :disabled="!toPostOne.res" @click="postingDialogVisible = true">过账</el-button>
      <el-button type="warning" size="mini" :disabled="!toChangeOne.res" @click="toSubmitData">提交</el-button>
      <el-button type="warning" size="mini" :disabled="!detelStatus.res" @click="doDeleteData">删除</el-button>
      <el-button type="warning" size="mini" @click="toWriteData" :disabled="!toWriteOff.res">冲销</el-button>
    </div>
    <div class="commonTable">
      <common-table
        :data="list"
        :maxHeight="270"
        :fit="true"
        :headers="headers"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @row-db-click="wentToDetailPage"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'companyFilter'">
            <span>{{list[scope.index]['soInvoiceType'] | companyFilter}}</span>
          </div>
          <div v-if="scope.text == 'salesInvoiceStatusFilter'">
            <span>{{list[scope.index]['salesInvoiceStatus'] | salesInvoiceStatusFilter}}</span>
          </div>
          <div v-if="scope.text == 'isCancel'">
            <!--checked 用了显示是否取消-->
            <el-checkbox disabled v-model="list[scope.index]['checked']"></el-checkbox>
          </div>
        </template>
      </common-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div class="management dailog" id="checkDialog">
      <el-dialog
        title="确认过账？"
        :visible.sync="postingDialogVisible"
        top="20%"
        width="33%">
        <el-radio-group v-model="radio">
          <el-radio label="71150030">通 过</el-radio>
          <el-radio label="71150040">驳 回</el-radio>
        </el-radio-group>
        <div style="text-align: right;margin-top: 19px;margin-bottom: -7px;">
          <span slot="footer" class="dialog-footer">
           <el-button @click="postingDialogVisible = false" size="mini">取 消</el-button>
           <el-button type="primary" @click="doPostingClick" size="mini">确 定</el-button>
          </span>
        </div>
      </el-dialog>

    </div>

  </div>
</template>
<script type="text/javascript">
  import salesInvoiceForm from '@/views/sales-process/sales-invoice/sales-invoice-form.vue'

  //接口引用
  import {
    doQueryWithPage,
    doSubmitCodSoInvoice,
    doPosting,
    doReversal,
    doDelSoInvoices
  } from '@/api/sales-process/sales-invoice/sales-invoice'

  const headers = [
    {type: 'selection', width: '55px',fixed:'left'},
    {prop: 'soInvoiceNo', label: '发票单据号', width: '140px',align:'center'},
    {prop: 'soInvoiceType', label: '发票类型', width: '120px', filter: 'companyFilter',align:'center'},
    {prop: 'salesInvoiceStatus', label: '发票状态', width: '120px', filter: 'salesInvoiceStatusFilter',align:'center'},
    {prop: 'isCancel',label: '被取消',filter:'isCancel', width: '80px',align:'center'},
    {prop: 'manageSubName', label: '经营主体', width: '160px',align:'center'},
    {prop: 'bizOrgName', label: '部门', width: '140px',align:'center'},//没有找到
    {prop: 'customerName', label: '客户', width: '140px',align:'center'},
    {prop: 'extInvoiceNo', label: '发票外部编号', width: '160px',align:'center'},
    {prop: 'invoiceDate', label: '开票日期', width: '120px', dataType: 'Date',align:'center'},
    {prop: 'buyerName', label: '业务员', width: '100px',align:'center'},
    {prop: 'invoiceQty', label: '开票数量', width: '120px',align:'center'},
    {prop: 'createdBy', label: '创建人', width: '120px',align:'center'},
    {prop: 'createdTime', label: '创建时间', width: '140px', dataType: 'Time',align:'center'},
    {prop: 'updatedBy', label: '修改人', width: '100px',align:'center'},
    {prop: 'updatedTime', label: '修改时间', width: '140px', dataType: 'Time',align:'center'},
    {prop: 'postPersonName', label: '过账人', width: '120px',align:'center'},
    {prop: 'postDate', label: '过账时间', width: '140px', dataType: 'Time',align:'center'},
  ];

  export default {
    components: {salesInvoiceForm},
    props: {
      soInvoiceId: ''
    },
    data(){
      return {
        headers: headers,
        list: [],
        dataForPage: [],
        pageState: true,
        dataForChange: [],
        listQuery: {
          currentPage: 1,
          pageSize: 10,//一页的条数
          needCount: true
        },
        dataForPageId: "",
        total: null,
        postingDialogVisible: false,//过账弹框
//        postingDialogVisibleValue: '',
        radio: '71150030',
        doDeleteDataFor: [],//删除数据
        doDeleteDataWrite: [],//冲销数据
        doDeleteDataSubmit: [],//冲销数据
        doPostingData: [],//冲销数据
      }
    },
    filters: {
      companyFilter(val) {
        if (val) {
          val.toString()
        }
        return ENUMS['7310'][val];
      },
      salesInvoiceStatusFilter(val) {
        if (val) {
          val.toString()
        }
        return ENUMS['7115'][val];
      }
    },
    computed: {
      //修改
      toChangeOne(){
        let [vm,data]=[this,[]];
        data.res=false;//保存驳回状态修改
        if (this.dataForChange.length == '1') {
          if (this.dataForChange[0].salesInvoiceStatus == '71150010'||this.dataForChange[0].salesInvoiceStatus == '71150040') {
            data.push({
              soInvoiceId: vm.dataForChange[0].soInvoiceId,
              version: vm.dataForChange[0].version,
            });
            data.res = true;
          }
        } else {
          data.res = false;
        }
        vm.doDeleteDataSubmit=data;
        return data;
      },
      //过账
      toPostOne(){
        let [vm,data]=[this,[]];
        data.res = false;
        if (this.dataForChange.length == '1') {
          if (this.dataForChange[0].salesInvoiceStatus == '71150020') {//已提交
            data.push({
              soInvoiceId: vm.dataForChange[0].soInvoiceId,
              version: vm.dataForChange[0].version,
            });
            data.res = true;
          }
        } else {
          data.res = false;
        }
        vm.doPostingData=data;
        return data;
      },
      //删除
      detelStatus(){
        let [vm,data]=[this,[]];
        data.res = false;
        if (this.dataForChange.length > '0') {
          for (var key in vm.dataForChange) {
            if (vm.dataForChange[key].salesInvoiceStatus == '71150010'||this.dataForChange[0].salesInvoiceStatus == '71150040') {//保存驳回
              data.push({
                soInvoiceId: vm.dataForChange[key].soInvoiceId,
                version: vm.dataForChange[key].version,
              });
              data.res = true;
            } else {
              data.res = false;
            }
          }
          vm.dataForChange.forEach((o, i) => {
            if (o.salesInvoiceStatus != '71150010') {
              data.res = false
            }
          });
        } else {
          data.res = false;
        }
        this.doDeleteDataFor = data;
        return data;
      },
      //冲销--带完善
      toWriteOff(){
        let [vm, data] = [this, []];
        data.res = false;
        if (this.dataForChange.length == '1') {
          for (var key in vm.dataForChange) {
            //发票状态为标准，退货发票
            if(vm.dataForChange[key].soInvoiceType=='73100005'||vm.dataForChange[key].soInvoiceType=='73100015'){
          //已过账，未冲销--isCancel这个数值为0标识已冲销
                if(this.dataForChange[key].salesInvoiceStatus == '71150030'&& this.dataForChange[key].isCancel!='0'){
                  data.push({
                    soInvoiceId: vm.dataForChange[key].soInvoiceId,
                    version: vm.dataForChange[key].version,
                  });
                  data.res = true;
                }
            } else {
              data.res = false;
            }
          }
        } else {
          data.res = false;
        }
        this.doDeleteDataWrite = data;
        return data;
      },
    },
    activated(){
        let vm=this;
      this.listQuery = {
        currentPage: 1,
        pageSize: 10,//一页的条数
        needCount: true
      };
      console.log('creatd');
      this.$refs.formPage.doQuery();
    },
    created(){
      this.listQuery = {
        currentPage: 1,
        pageSize: 10,//一页的条数
        needCount: true
      };
      console.log('activated');
      this.getTableData(this.listQuery);
    },
    methods: {
        doClearPage(){
            this.listQuery={
              currentPage:1,
              pageSize:10
            }
        },
      doDeleteData(){
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doDelSoInvoices(this.doDeleteDataFor).then(response=>{
            this.$refs.formPage.doQuery();
            if(response.data.status=='1'){
              this.$notify({
                type: 'success',
                message: '删除成功!'
              });
              this.doDeleteDataFor=[];
            }
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      toSubmitData(){
        this.$confirm('此操作将提交该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doSubmitCodSoInvoice(this.doDeleteDataSubmit).then(response=>{
            this.$refs.formPage.doQuery();
            if(response.data.status=='1'){
              this.$notify({
                  type: 'success',
                  message: '提交成功!'
                });
                this.doDeleteDataSubmit=[];
              }
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消提交'
          });
        });
        },
      //冲销
      toWriteData(){
        this.$confirm('此操作将冲销该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doReversal(this.doDeleteDataWrite).then(response=>{
            this.$refs.formPage.doQuery();
            if(response.data.status=='1'){
                this.$notify({
                  type: 'success',
                  message: '冲销成功!'
                });
                this.doDeleteDataWrite=[];
              }
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消冲销'
          });
        });
        },
    //过账
    doPostingClick(){
          let [vm,type]=[this,false];
          vm.doPostingData.forEach((o,i)=>{
              o.salesInvoiceStatus=vm.radio
          });
          if(this.radio=='71150030'){
            type=true;
          }else{type=false}
      doPosting(this.doPostingData).then(response=>{
        this.$refs.formPage.doQuery();
        if(response.data.status=='1'){
          if(type){
            this.$notify({
              type: 'success',
              message: '过账成功!'
            });
          }else{
            this.$notify({
              type: 'success',
              message: '驳回成功!'
            });
          }
          this.doPostingData=[];
        }
        this.postingDialogVisible=false;
      })
    },
    handleRowClick(row) {
      this.dataForPageId = row.soInvoiceId;
    },
    handleSelectionChange(row){
      this.dataForChange = row;
    },
    //分页
    handleSizeChange(val){
      this.listQuery.pageSize = val;
      this.$refs.formPage.doQuery();
    },
    handleCurrentChange(val){
      this.listQuery.currentPage = val;
      this.$refs.formPage.doQuery();
    },
    wentToDetailPage(){
      this.establish('detail');
    },
    //创建
    establish(text, data){
      if (text == 'add') {
        this.$store.dispatch('toggleCurrentView', {
          SalesInvoice: {
            view: 'add'
          }
        });
      } else if (text == 'edit') {
        let noData = '';
        if (this.dataForChange.length) {
          noData = this.dataForChange[0].soInvoiceId
        } else {
          noData = this.dataForChange.soInvoiceId
        }
        this.$store.dispatch('toggleCurrentView', {
          SalesInvoice: {
            view: 'edit',
            params: {soInvoiceId: noData}
          }
        });
      } else if (text == 'detail') {
        this.$store.dispatch('toggleCurrentView', {
          SalesInvoice: {
            view: 'look',
            params: {soInvoiceId: this.dataForPageId}
          }
        });
      }
    },
    //查询
//    test(data){
//      console.log(data, "=>获取表格数据要的参数")
//    },
    getTableData(data){
      let vm = this;
        data.needCount = true;
      doQueryWithPage(data).then(response => {
        if (response.data.status == '1') {
          var allData = response.data.data.datalist;
          vm.list = [];
          if (allData.length > 0) {
            allData.forEach((o, i) => {
              vm.list.push({
                'soInvoiceNo': o.soInvoiceNo,
                'salesInvoiceStatus': o.salesInvoiceStatus,
                'soNo': o.soNo,
                'soInvoiceId': o.soInvoiceId,
                'invoiceId': o.invoiceId,
                'soOsNo': o.soOsNo,
                'soInvoiceType': o.soInvoiceType,
                'manageSubName': o.manageSubName,
                'bizOrgName': o.bizOrgName,
                'customerName': o.customerName,
                'extInvoiceNo': o.extInvoiceNo,
                'invoiceDate': o.invoiceDate,
                'buyerName': o.buyerName,
                'invoiceQty': o.invoiceQty,
                'createdBy': o.createdBy,
                'createdTime': o.createdTime,
                'updatedBy': o.updatedBy,
                'updatedTime': o.updatedTime,
                'postPersonName': o.postPersonName,
                'postDate': o.postDate,
                'isCancel': o.isCancel,
                'version': o.version
              });
            });
            vm.list.forEach((o,i)=>{
                if(o.isCancel==0){
                  o.checked=true
                }else{
                  o.checked=false
                }
            })
          } else {
            vm.list = [];
          }
          this.total = response.data.data.items;
        }
      })
    },
  }
  ,
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
