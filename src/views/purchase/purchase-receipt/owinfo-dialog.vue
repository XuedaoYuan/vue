<template>
  <el-dialog title="在途单选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small">
    <el-form ref="form" label-width="110px" :model="tempAll" class="formStyle hundred-percent-input">
      <el-row>
        <el-col :span="8">
          <el-form-item label="在途单号：" prop="owNo">
            <el-input disabled size="mini" placeholder="请输入" v-model="tempAll.owNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- 在途单号、采购合同号、采购合同单据号、物料名称、                  -->
          <el-form-item label="采购合同号：" prop="poContractNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poContractNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购合同单据号：" prop="poNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poNo"></el-input>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="物料名称：" prop="goodsName">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.goodsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="柜号：" prop="cabinetNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.cabinetNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick" @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
      <!-- 、、、、、、、、毛重、净重、、、、、       -->
      <el-table-column show-overflow-tooltip align="center" prop="owNo" label="在途单号" width="120px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="goodsCode" label="物料编号" width="120px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="goodsName" label="物料名称" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="unitName" label="单位" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="packType" label="包装方式" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="cabinetNo" label="柜号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="seriesNo" label="批号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="supplierBatchNo" label="供应商批号" header-align="center" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column width="120px" show-overflow-tooltip align="center" prop="supplierBatchNo" label="毛重" header-align="center" show-overflow-tooltip></el-table-column> -->
      <el-table-column width="140px" show-overflow-tooltip align="center" prop="productDate" label="供方生产日期" header-align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.productDate | parseTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="poContractNo" label="采购合同号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="140px" show-overflow-tooltip align="center" prop="poNo" label="采购合同单据号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column width="120px" show-overflow-tooltip align="center" prop="billNo" label="提单号" header-align="center" show-overflow-tooltip></el-table-column>
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
import { doCusQueryDtlOw } from '@/api/purchase/purchas-receipt/index'
export default {
  props: {
    owInfoDialogFormVisible: Boolean,
    detailIndex: { type: Number, default: 0 },
    owNo: String
  },
  data() {
    return {
      tempAll: {
        owNo: '',
        poContractNo: '',
        poNo: '',
        goodsName: '',
        cabinetNo: '',
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

        this.resetBtn();
      }
    }
  },
  methods: {
    closeDialog() {
      this.listLoading = false;
      this.$emit('closeItem');
    },
    setItem() {
      this.$emit('setItem', this.selectRow, this.detailIndex);
      this.closeDialog();
    },
    getList() {
      this.listLoading = true;
      doCusQueryDtlOw(this.tempAll, this.listQuery).then(response => {
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
      this.tempAll = {
        owNo: '',
        poContractNo: '',
        poNo: '',
        goodsName: '',
        cabinetNo: ''
      };
      this.listQuery = {
        pageSize: 10,
        currentPage: 1
      }

      this.tempAll.owNo = this.owNo;

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
