<template>
  <div class="management dailog" v-if="showFlag">
    <el-dialog
      title="选择列表"
      :visible.sync="showFlag"
      class="drag-small"
      @close="closeDialog"
      v-drag
      >
      <el-form ref="form" label-width="100px" :model="supplierCheck" style="margin:0 0 15px 0">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="供应商名称" prop="supplierName">
              <el-input v-model="supplierCheck.supplierName" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商代码" prop="supplierCode">
              <el-input v-model="supplierCheck.supplierCode" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="doQuery">搜 索</el-button>
            <el-button size="mini" icon="el-icon-refresh" @click="doClear">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        highlight-current-row
        height="300"
        @row-dblclick="rowDblclick"
        @row-click="rowclick"
        v-loading.body="loading"
        border
        style="width: 100%">
        <!--<el-table-column-->
          <!--prop="supplierId"-->
          <!--label="供应商Id"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <el-table-column
          prop="supplierName"
          label="供应商名称"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="supplierCode"
          show-overflow-tooltip
          label="供应商代码">
        </el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名称"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"  style="text-align: center">
        <el-button type="primary" @click="closeDialogtoSure" size="mini">确 定</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
      </span>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="listQuery.limit"
          :current-page.sync="listQuery.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {doQueryWithPage} from 'api/common-select/supplier.js';
  export default {
    data(){
      return {
        showFlag: false,
        supplierCheck: {
          supplierName:'',
          supplierCode:'',
          companyId:'',
        },
        tableData:[],
        choseSupplierData: '',
        listQuery: {
          page: 1,
          limit: 10,//一页的条数
        },
        total: null,
        loading:true,
      }
    },
    props: {
      supplierShow: Boolean,
      querySelect: {
        type: Object,
        default: undefined
      },
    },
    watch: {
      supplierShow(){
        this.showFlag = this.supplierShow;
        if (this.supplierShow) {
            this.doClear();
        }
      }
    },
    methods: {
      doQuery(){
        this.getSupplier(this.listQuery,this.supplierCheck);
      },
      doClear(){
        this.supplierCheck = {
          supplierName:'',
          supplierCode:'',
        }
        if(this.querySelect){
            this.supplierCheck.companyId = this.querySelect.companyId;
        }else {
            this.supplierCheck.companyId = '';
        }
        this.listQuery = {
              limit:10,
              page:1
          }
        this.getSupplier();
      },
      //分页
      handleSizeChange(val){
        this.listQuery.limit = val;
        this.getSupplier();
      },
      handleCurrentChange(val){
        this.listQuery.page = val;
        this.getSupplier();
      },
      getSupplier(data,query){
        let vm = this;

        doQueryWithPage(vm.listQuery,this.supplierCheck).then(response => {
          this.loading=false;
          if (response.data.status == '1') {
            let datalist = response.data.data.datalist;
            this.tableData = [];
            datalist.forEach((o, i) => {
              this.tableData.push({
                'supplierId': o.id,
                'supplierCode': o.supplyCode,
                'supplierName': o.supplyName,
                'supplyAddress': o.supplyAddress,
                'companyName': o.companyName,
                'companyId': o.companyId,
                'companyCode': o.companyCode,
              })
            });
            this.total = response.data.data.items;
          }
        })
      },
      rowDblclick(row){
        this.$emit('rowDblclick', row);
        this.closeDialog();
      },
      rowclick(row){
        this.choseSupplierData = row;
      },
      closeDialog(){
        this.$emit('closeSupplier');
        this.loading=false;
      },
      closeDialogtoSure(){
        this.$emit('rowDblclick', this.choseSupplierData);
        this.closeDialog();
      },
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
