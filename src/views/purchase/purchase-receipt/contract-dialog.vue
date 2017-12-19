<template>
  <el-dialog title="采购合同选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small">
    <el-form ref="form" label-width="100px" :model="tempAll" class="formStyle hundred-percent-input">
      <el-row>
        <el-col :span="8">
          <el-form-item label="采购合同单据号：" prop="poNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购合同号：" prop="poContractNo">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.poContractNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物料名称：" prop="goodsName">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.goodsName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <!-- signDateStart signDateEnd -->
          <el-form-item label="合同日期：" prop="signDate">
            <el-date-picker size="mini" v-model="tempAll.signDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- deliveryDateStart   deliveryDateEnd -->
          <el-form-item label="交货日期：" prop="deliveryDate">
            <el-date-picker size="mini" v-model="tempAll.deliveryDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <!-- <el-input size="mini" placeholder="请输入" v-model="tempAll.deliveryDate"></el-input> -->
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
                <el-form-item label="申请人：" prop="applyBy">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.applyBy"></el-input>
                </el-form-item>
            </el-col> -->
        <el-col :span="8" style="margin-left:-32px">
          <el-form-item label="">
            <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick" @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
      <!-- ==========,（合同数量减去暂收数减去本合同未审核暂收数量）==========      -->
      <el-table-column show-overflow-tooltip align="center" prop="poNo" label="采购合同单据号" width="220px" header-align="center"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="poContractNo" label="采购合同号" width="150px" header-align="center"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="goodsCode" label="物料编号" width="140px" header-align="center"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="goodsName" label="物料名称" width="140px" header-align="center"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="itemQty" label="合同数量" width="140px" header-align="center"></el-table-column>
      <!-- <el-table-column show-overflow-tooltip align="center" prop="unOwQty" label="未到货数量" width="120px" header-align="center"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip align="center" prop="orginPrice" label="原币单价" width="120px" header-align="center"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip align="center" prop="orginAmt" label="原币金额" width="120px" header-align="center"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip align="center" prop="basePrice" label="本币单价" width="120px" header-align="center"></el-table-column> -->
      <!-- <el-table-column show-overflow-tooltip align="center" prop="baseAmt" label="本币金额" width="120px" header-align="center"></el-table-column> -->
      <el-table-column show-overflow-tooltip align="center" prop="packType" label="包装方式" width="140px" header-align="center">
        <template slot-scope="scope">
          <span>{{scope.row.packType | parsePackType}}</span>
        </template>
      </el-table-column>
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
import { doQueryCodPoNo } from '@/api/purchase/purchas-receipt/index'
export default {
  props: {
    owInfoDialogFormVisible: Boolean,
    detailIndex: { type: Number, default: 0 },
    supplierId: String,
    currencyName: String,
    manageSubName: String,
    poDtlIdList:{type:Array}
  },
  data() {
    return {
      tempAll: {
        poNo: '',
        poContractNo: '',
        goodsName: '',
        signDate: [],
        deliveryDate: [],
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

        this.tempAll.supplierId = this.supplierId;
        this.tempAll.currencyName = this.currencyName;
        this.tempAll.manageSubName = this.manageSubName;

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
      this.closeDialog();
      this.$emit('setItem', this.selectRow, this.detailIndex);
    },
    getList() {
      this.listLoading = true;

      var tempAll = JSON.parse(JSON.stringify(this.tempAll));

      if (this.tempAll.signDate) {
        if (this.tempAll.signDate[0] && (typeof this.tempAll.signDate[0]) != 'string') {
          tempAll.signDateStart = this.tempAll.signDate[0].parseTime('YYYY-MM-DD');
          tempAll.signDateEnd = this.tempAll.signDate[1].parseTime('YYYY-MM-DD');
        }
      }
      if (this.tempAll.deliveryDate) {
        if (this.tempAll.deliveryDate[0] && (typeof this.tempAll.deliveryDate[0]) != 'string') {
          tempAll.deliveryDateStart = this.tempAll.deliveryDate[0].parseTime('YYYY-MM-DD');
          tempAll.deliveryDateEnd = this.tempAll.deliveryDate[1].parseTime('YYYY-MM-DD');
        }
      }

      tempAll.poNo = this.tempAll.poNo;
      tempAll.poContractNo = this.tempAll.poContractNo;
      tempAll.goodsName = this.tempAll.goodsName;

      console.log(tempAll);

      doQueryCodPoNo(tempAll, this.listQuery, this.poDtlIdList).then(response => {
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

      this.tempAll.poNo = '';
      this.tempAll.poContractNo = '';
      this.tempAll.goodsName = '';
      this.tempAll.signDate = [];
      this.tempAll.deliveryDate = [];


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
