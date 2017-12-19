<template>
  <!-- 暂收单 -->
  <el-dialog title="暂收单号选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small">
    <el-form ref="form" label-width="100px" :model="tempAll" class="formStyle hundred-percent-input">
      <el-row>
        <!-- 、、、-->
        <el-col :span="6">
          <el-form-item label="物料名称：" prop="goodsName">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.goodsName"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="暂收单号：" prop="poGrNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poGrNo"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="采购合同号：" prop="poContractNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poContractNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="采购合同单据号：" prop="poNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left:-32px">
          <el-form-item label="">
            <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick" @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
      <!-- <el-table-column align="center" prop="poGrRowNo" label="暂收单号" width="50px" header-align="center" show-overflow-tooltip></el-table-column> -->
      <el-table-column show-overflow-tooltip align="center" prop="poGrNo" label="暂收单号" width="120px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="goodsCode" label="物料编号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="goodsName" label="物料名称" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="suspendQty" label="暂收数量" header-align="center" show-overflow-tooltip></el-table-column>
      <!-- 实收数量 - 结算数量  suspendQty unenteredQty-->
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="unenteredQty" label="待入库数量" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="unitName" label="单位" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="packType" label="包装方式" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.packType | parsePackType}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column  width="120px" show-overflow-tooltip align="center" prop="supplierBatchNo" label="批次号" header-align="center" show-overflow-tooltip></el-table-column> -->
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="supplierBatchNo" label="供方批次号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="140px" show-overflow-tooltip align="center" prop="poGrId" label="供方生产日期" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.productDate | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="poContractNo" label="采购合同号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="140px" show-overflow-tooltip align="center" prop="poNo" label="采购合同单据号" header-align="center" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 20, 30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="setItem" size="mini">确 定</el-button>
      <el-button @click="closeDialog" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doQueryWithReceived } from '@/api/purchase/purchas-receipt/index'
export default {
  props: {
    owInfoDialogFormVisible: Boolean,
    detailIndex: { type: Number, default: 0 },
    poGrId: String,
    supplierId: String,
    manageSubId: String,
    currencyId: String,
  },
  data() {
    return {
      tempAll: {
        poGrNo: '',
        supplierId: '',
        manageSubId: '',
        currencyId: ''
      },
      listLoading: false,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      selectRow: null,
      total: null,
      gridData: [],
      showFlag: false,
    };
  },
  watch: {
    owInfoDialogFormVisible: function(val, oldVal) {
      this.showFlag = val;
      if (this.showFlag) {

        this.tempAll.poGrId = this.poGrId;
        this.tempAll.supplierId = this.supplierId;
        this.tempAll.manageSubId = this.manageSubId;
        this.tempAll.currencyId = this.currencyId;
        // this.resetBtn();
        this.getList();

      }
    },
    /* poGrNo: function(val){
       if(val){
         this.tempAll.poGrNo = val;
       }else {
         this.tempAll.poGrNo = '';
       }

       console.log(val, 'POGRNO');
       this.getList();
       
     }*/
  },
  methods: {
    closeDialog() {
      this.listLoading = false;

      // this.tempAll.goodsName = '';
      this.tempAll.poGrNo = '';
      this.tempAll.poGrId = '';
      this.tempAll.supplierId = '';
      this.tempAll.manageSubId = '';
      this.tempAll.currencyId = '';

      this.$emit('closeItem');
    },
    setItem() {
      this.$emit('setItem', this.selectRow, this.detailIndex);
      this.closeDialog();
    },
    getList() {
      this.listLoading = true;
      doQueryWithReceived(this.tempAll, this.listQuery).then(response => {
        if (response.data.status == 1) {
          this.gridData = response.data.data.datalist;
          this.total = response.data.data.items;
          this.listLoading = false;
        } else {
          this.listLoading = false;
        }
      })
    },
    resetBtn() {
      // this.tempAll.goodsName = '';
      this.tempAll.poGrNo = '';
      // this.tempAll.poContractNo = '';
      // this.tempAll.poNo = '';

      this.tempAll.poGrId = '';
      this.tempAll.supplierId = '';
      this.tempAll.manageSubId = '';
      this.tempAll.currencyId = '';

      this.listQuery = {
        pageSize: 10,
        currentPage: 1
      }
      this.getList();
    },
    handleRowClick(row) {
      this.selectRow = row;
    },
    handleRowDblclick(row) {
      this.selectRow = row;
      this.setItem();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val;
      this.getList();
    },
  },
};

</script>
<style scoped>
.formStyle {
  margin-bottom: 12px;
}

</style>
