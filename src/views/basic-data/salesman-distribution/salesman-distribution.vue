<template>
  <div id="moneyCredit" class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search"  @click="handleSearch" size="small">查询</el-button>
        <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
        <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-search" size="small" @click="rest">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="100px" :model="formData">
            <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="客户" prop="customerId">
                    <customer-select @childevent="childEventHandlerCustomer" :querySelect="formData.customerId"></customer-select>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="业务员" prop="userName">
                  <staff-select @childevent="childEventHandlerStaff" :querySelect="formData.userName"></staff-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom: 15px">
      <el-button type="warning" size="mini" @click.native="onClickAdd">创建</el-button>
      <el-button type="warning" size="mini" @click.native="onClickSave">保存</el-button>
      <el-button type="warning" size="mini" @click="onClickDel">删除</el-button>
    </div>
    <div class="commonTable">
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      style="margin-bottom: 15px;"
    >
      <template slot-scope="scope" slot="default">
        <!--<div v-if="scope.text == 'data'">-->
          <!--<el-date-picker v-model="tableData[scope.index]['lastPostDate']" size="mini" type="date" placeholder="选择日期">-->
          <!--</el-date-picker>-->
        <!--</div>-->
        <div v-if="scope.text == 'salesman'">
          <staff-select @childevent="childEventHandlerStaff1" :querySelect="tableData[scope.index]['buyerName']"></staff-select>
        </div>
      </template>
      <template slot-scope="scope" slot="filter" >
        <div v-if="scope.text == 'btn'">
          <el-button @click="release(tableData[scope.index])" size="mini" type="warning">释放</el-button>
          <el-button @click="allot(tableData[scope.index])" size="mini" type="warning">分配</el-button>
        </div>
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
<script>
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员
  import CustomerSelect from '@/components/common-select/customer-select.vue' //客户
  import {doQueryWithPage, doSave, doUpdate, doDelete }from '@/api/basic-data/salesman-distribution/salesman-distribution.js'
  //  import {pickerOptions} from '@/util'
  const headers = [
    { type: 'selection', width: '55px'},
    { prop: 'customerName', label: '客户名称' ,align:'center'},
    { prop: 'lastPostDate', label: '最后一次发货日期' ,align:'center',dataType: 'Date', },
    { prop: 'userName', label: '当前业务员' ,align:'center'},
    { prop: 'buyerName', label: '分配业务员' ,align:'center',template: 'salesman'},
    { label: '操作' ,align:'center',filter: 'btn'},
  ];
  export default {
    components: {
      StaffSelect,CustomerSelect
    },
    data(){
      return {
        searchBarFlg: true,
        selectList:[],
        formData:{
          customerId:'',//
          userName:'',//
        },
        customer:null,
        total:null,
        listQuery:{
          pageSize:10,
          currentPage:1
        },
        headers: headers,
        tableData: [],
        rowIndex:null,
      }
    },
    created(){
      this.getList()
    },
    methods:{
      //重置
      addList(){
        let vm = this;
        doSave().then(res => {
          if(res.data.status === 1) {
           vm.getList()
          }
        })
      },
      getList(){
        let vm = this;
        doQueryWithPage(vm.formData,vm.listQuery).then(res => {
          if(res.data.status === 1) {
            console.log('tableData',res.data.data.datalist)
            vm.tableData=res.data.data.datalist;
            vm.total = res.data.data.items;
            vm.loading = false
          }
        })
      },
      handleSearch(){
        this.getList()
      },
      rest(){
        this.formData.customerId = '';
        this.formData.userName = '';
      },
      //创建
      onClickAdd() {
        this.addList()
      },
      //保存
      onClickSave() {
        if(this.tableData.length < 1){
          this.$notify({
            title: '警告',
            message: '请添加数据!',
            type: 'warning'
          });
        } else{
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        }
      },
      //删除
      onClickDel() {
        if(this.selectList.length<1){
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
            this.selectList.forEach((x,i) => {
              let idx = this.tableData.findIndex((val) => val == x);
              idx>-1 && this.tableData.splice(idx, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          })
        }
      },
      //释放
      release(row){
        console.log('release.row=>',row)
        let vm = this;
        doDelete(row,vm.listQuery).then(res => {
          if(res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: '释放成功！',
              type: 'success'
            });
            console.log('tableData',res.data.data.datalist)
            vm.total = res.data.data.items;
            vm.loading = false;
            vm.getList();
          }
        })
      },
      //分配
      allot(row){
        console.log('row.allot',row)
        let vm = this;
        doUpdate(row,vm.listQuery).then(res => {
          if(res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: '分配成功！',
              type: 'success'
            });
            console.log('tableData',res.data.data.datalist)
            vm.total = res.data.data.items;
            vm.loading = false
            vm.getList();
          }
        })
      },
      childEventHandlerCustomer(val){//客户
        if(val){
          this.formData.customerId = val.custId;
        }else {
          this.formData.customerId = '';
        }
      },
      childEventHandlerStaff(val){//业务员
        if(val){
          this.formData.userName = val.userName;
//          this.formData.buyerId = val.userId;
//          this.formData.buyerCode = val.userCode;
        }else {
          this.formData.userName = '';
//          this.formData.buyerId = '';
//          this.formData.buyerCode = '';
        }
      },
      childEventHandlerStaff1(val) {
        if(val){
          this.tableData[this.rowIndex].buyerName = val.userName;
          this.tableData[this.rowIndex].buyerId = val.userId;
          this.tableData[this.rowIndex].buyerCode = val.userCode;
        }else {
          this.tableData[this.rowIndex].buyerName = '';
          this.tableData[this.rowIndex].buyerId = '';
          this.tableData[this.rowIndex].buyerCode = '';
        }
      },
      handleRowClick(row){
        this.rowIndex = row.$index;
      },
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
        this.selectList=row;
      },
      //分页
      handleSizeChange(val){
        console.log('size',val)
        this.listQuery.pageSize=val;
        this.getList()
      },
      handleCurrentChange(val){
        console.log('current',val)
        this.listQuery.currentPage=val;
        this.getList()
      },
    },
    filters: {
      productDateFilter(val){
        if (val && val != '') {
          return val.parseTime('YYYY-MM-DD')
        }else {
          return '';
        }
      }
    },
    watch: {}
  }

</script>
