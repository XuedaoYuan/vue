<template>
  <div class="management dailog" v-if="showFlag">
    <el-dialog
      title="选择列表"
      :visible.sync="showFlag"
      class="drag-small"
      @close="closeDialog"
      v-drag
    >
      <el-form ref="form" label-width="80px" :model="supplierCheck" style="margin:0 0 15px 0">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="币种名称" prop="unitName">
              <el-input v-model="supplierCheck.unitName" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="币种代码" prop="unitCode">
              <el-input v-model="supplierCheck.unitCode" size="mini" @keyup.enter.native="doQuery"></el-input>
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
        v-loading="listLoading"
        border
        style="width: 100%">
        <el-table-column
          prop="unitCode"
          label="币种代码"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="unitName"
          show-overflow-tooltip
          label="币种名称">
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
  import {doQueryWithPageforUnit} from 'api/common-select/supplier.js';//币种接口在supplier里面
  export default {
    data(){
      return {
        showFlag: false,
        supplierCheck: {},
        tableData: [],
        choseSupplierData: '',
        listQuery: {
          page: 1,
          limit: 10,//一页的条数
        },
        total: null,
        listLoading:true,
      }
    },
    filters: {
      changeTop(percent){
        if (percent == null) {
          return;
        }
        var str = Number(percent * 100).toFixed(0);
        str += "%";
        return str;
      }
    },
    props: {
      supplierShow: Boolean,
    },
    watch: {
      supplierShow(){
        this.showFlag = this.supplierShow
//        console.log(this.supplierShow, "supplierShow");
        if (this.supplierShow) {
          this.getSupplier();
        }
        this.doClear();
      }
    },
    methods: {
      doQuery(){
        this.getSupplier(this.listQuery, this.supplierCheck);
      },
      doClear(){
        this.supplierCheck = {}
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
      getSupplier(data, query){
        let vm = this;
        doQueryWithPageforUnit(vm.listQuery, this.supplierCheck).then(response => {
//          console.log(vm.listQuery,"listQuery");
          console.log("response=>供应商", response);
          if (response.data.status == '1') {
            this.listLoading=false;
            let datalist = response.data.data.datalist;
            this.tableData = [];
            datalist.forEach((o, i) => {
              this.tableData.push({
                    'unitId':o.unitId,
                    'unitName':o.unitName,
                    'unitCode':o.unitCode,
                    'unitNameEn':o.unitNameEn,
                    'id':o.id,
                    'isolationCode':o.isolationCode,
                    'techDisplayName':o.techDisplayName,
                    'sortCode':o.sortCode,
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
        this.listLoading=false;
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
