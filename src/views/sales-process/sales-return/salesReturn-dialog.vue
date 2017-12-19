<template>
  <el-dialog title="销售出库单" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small">
    <el-form ref="form" label-width="90px" :model="tempAll" class="formStyle hundred-percent-input">
      <el-row>
        <el-col :span="6">
          <el-form-item label="销售合同号：" prop="soContractNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.soContractNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售合同单据号：" prop="soNo" label-width="100px">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.soNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售出库单号：" prop="soOsNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.soOsNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物料编号：" prop="goodsName">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.goodsName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="物料名称：" prop="goodsCode">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.goodsCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批次：" prop="seriesNo" label-width="100px">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.seriesNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="receiveTable" :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick" @selection-change="handleSelectionChange" @row-dblclick="handleRowDblclick" style="width: 100%">
      <!--  -->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="soOsNo" label="销售出库单号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="soContractNo" label="销售合同号" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsCode" label="物料编码" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="物料名称" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outstockQty" label="出库数量" digit="2" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="retiredNumber" label="已退数量" digit="2" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="refundableNumber" label="可退数量" digit="2" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unitName" label="单位" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="seriesNo" label="批次" header-align="center" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 20, 30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="fillRow" size="mini">确 定</el-button>
      <el-button @click="closeDialog" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doQuerySoOsWithPage } from '@/api/sales-process/sales-return/sales-return.js'
export default {
  props: {
    receiveDialogStatus: Boolean,
    soOsNo: String,
  },
  data() {
    return {
      tempAll: {
        soContractNo: '',
        soOsNo: '',
        soNo: '',
        goodsName: '',
        goodsCode: '',
        seriesNo: '',
      },
      listLoading: false,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      multipleSelection: [],
      //        total:null,
      total: 10,
      gridData: [],
      showFlag: false,
      selectedPage: []
    };
  },
  watch: {
    receiveDialogStatus: function(val, oldVal) {
      this.showFlag = val;
      this.multipleSelection = [];
      //        this.$refs.receiveTable.clearSelection();
      if (this.showFlag) {
        this.resetBtn();
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    closeDialog() {
      this.listLoading = false;
      this.$emit('closeItem');
    },
    fillRow() {
      this.$emit('fillRow', this.multipleSelection);
    },
    getList() {
      this.listLoading = true;
      console.log('poGrId-dialog', this.soOsNo)
      doQuerySoOsWithPage(this.tempAll, this.soOsNo, this.listQuery).then(response => {
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
      this.tempAll.goodsCode = '';
      this.tempAll.goodsName = '';
      this.tempAll.goodsName = '';
      this.tempAll.goodsCode = '';
      this.tempAll.soContractNo = '';
      this.tempAll.seriesNo = '';
      this.tempAll.soNo = '';
      this.tempAll.soOsNo = '';
      this.listQuery = {
        pageSize: 10,
        currentPage: 1
      };
      console.log('555' + this.listQuery.pageSize);
      this.getList();
    },
    handleRowClick(row) {
      this.$refs.receiveTable.toggleRowSelection(row);
    },

    handleRowDblclick(row) {
      this.multipleSelection = [row];
      this.fillRow();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

  },
};

</script>
<style scoped>
.formStyle {
  margin-bottom: 12px;
}

</style>
