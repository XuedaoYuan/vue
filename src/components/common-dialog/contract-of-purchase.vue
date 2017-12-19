<template>
  <div class="management dailog" v-if="dialogVisible">
    <el-dialog
      title="采购合同单据号"
      :visible.sync="dialogVisible"
      class="drag-small"
      v-drag
      @close="closeDialog">
      <el-form ref="form" label-width="90px" :model="purchaseData" style="margin:0 0 15px 0">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="采购合同单据号" prop="manageSubCode">
              <el-input v-model="purchaseData.supplierName" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购合同号" prop="manageSubCode">
              <el-input v-model="purchaseData.supplierCode" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物料名称" prop="manageSubCode">
              <el-input v-model="purchaseData.supplierCode" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="合同日期" prop="supplierCode">
              <el-date-picker v-model="purchaseData.supplie" type="date" :editable="false" size="mini"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="交货日期" prop="supplierCode">
              <el-date-picker v-model="purchaseData.supplie" type="date" :editable="false" size="mini"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="" prop="manageSubCode">
              <el-button type="primary" size="mini" icon="el-icon-search" @click="doQuery">搜 索</el-button>
              <el-button size="mini" icon="el-icon-refresh" @click="doClear">重 置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableData"
        highlight-current-row
        height="300"
        @row-dblclick="rowDblclick"
        @row-click="rowclick"
        border
        v-loading.sync="loading"
        style="width: 100%">
        <el-table-column
          prop="supplierCode"
          min-width="120px"
          show-overflow-tooltip
          label="采购合同单据号">
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="采购合同号"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="物料编号"
          width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="物料名称"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="合同数量"
          show-overflow-tooltip
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="未到单数量"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="原币单价"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="原币金额"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="本币单价"
          show-overflow-tooltip
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          show-overflow-tooltip
          label="本币金额"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="包装方式"
          show-overflow-tooltip
          min-width="120px"
        >
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top: 15px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="listQuery.pageSize"
          :current-page.sync="listQuery.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="chooseMethod" size="mini">确 定</el-button>
         <el-button @click="closeDialog" size="mini">取 消</el-button>
       </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        dialogVisible: false,
        tableData: [],
        chooseData: [],
        loading: false,
        purchaseData: {},
        listQuery:{
          pageSize:10,
          currentPage:1
        },
        total:30,
      }
    },
    props: {
      dialogShow: Boolean,
    },
    watch: {
      dialogShow(){
        this.dialogVisible = this.dialogShow;
      },
    },
    methods: {
      handleSizeChange(val){
        this.listQuery.pageSize = val;
      },
      handleCurrentChange(val){
        this.listQuery.currentPage = val;
      },
      doQuery(){
        console.log('调用获取数据的函数')
      },
      doClear(){
        this.purchaseData = {};//清空
      },
      closeDialog(){
        this.$emit('closeDialogPurchase')
      },
      rowDblclick(row){
        this.$emit('choosePurse', row);
        this.$nextTick(() => {
          this.loading = false;
          this.$emit('closeDialogPurchase');
        })
      },
      rowclick(row){
        this.chooseData = row;//单击选中的值
      },
      chooseMethod(){
        this.$emit('choosePurse', this.chooseData);
        this.$nextTick(() => {
          this.loading = false;
          this.$emit('closeDialogPurchase');
        })
      },
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
