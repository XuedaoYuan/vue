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
            <el-form-item label="采购合同单据号" prop="poNo">
              <el-input v-model="purchaseData.poNo" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购合同号" prop="poContractNo">
              <el-input v-model="purchaseData.poContractNo" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物料名称" prop="goodsName">
              <el-input v-model="purchaseData.goodsName" size="mini" @keyup.enter.native="doQuery"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item label="合同日期" prop="signDate">
              <el-date-picker v-model="purchaseData.signDate" type="daterange" :editable="false"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期" size="mini"></el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
          <!--<el-form-item label="交货日期" prop="supplierCode">-->
          <!--<el-date-picker v-model="purchaseData.supplie" type="date" :editable="false" size="mini"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
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
        @row-click="handleRowClick"
        @selection-change="selectClick"
        @select-all="selectClick"
        ref="multipleTable"
        border
        v-loading.sync="loading"
        style="width: 100%">
        <el-table-column
          type="selection"
          fixed
          width="55">
        </el-table-column>
        <el-table-column
          prop="poNo"
          min-width="160px"
          show-overflow-tooltip
          align="center"
          label="采购合同单据号">
        </el-table-column>
        <el-table-column
          prop="poContractNo"
          show-overflow-tooltip
          label="采购合同号"
          align="center"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="goodsCode"
          show-overflow-tooltip
          label="物料编号"
          align="center"
          width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="goodsName"
          show-overflow-tooltip
          label="物料名称"
          align="center"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="itemQty"
          label="合同数量"
          align="center"
          show-overflow-tooltip
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="orginPriceTex"
          show-overflow-tooltip
          label="原币单价"
          align="center"
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.orginPriceTex | setPointVal(6)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orginAmtTex"
          show-overflow-tooltip
          label="原币金额"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{scope.row.orginAmtTex | setPointVal(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="basePriceTex"
          label="本币单价"
          align="center"
          show-overflow-tooltip
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.basePriceTex | setPointVal(6)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="baseAmtTex"
          show-overflow-tooltip
          label="本币金额"
          align="center"
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.baseAmtTex | setPointVal(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="packType"
          label="包装方式"
          align="center"
          show-overflow-tooltip
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.packType | companyFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="weightStandType"
          label="合同计重标准"
          align="center"
          show-overflow-tooltip
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.weightStandType | weightStandTypeFilter}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="margin-top: 15px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="purchaseData.currentPage"
          :page-size="purchaseData.pageSize"
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

  import{doQueryCodPoNoForOw}from'@/api/purchase/tracking-manage/tracking-manage'
  export default {
    data(){
      return {
        selectAllDataList:{},//全部数据
        selectList:{},//全部数据
        selectListRowClick:[],//全部数据
        dialogVisible: false,
        tableData: [],
        loading: true,
        purchaseData: {
          pageSize: 10,
          currentPage: 1,
          needCount: true
        },
        total: null,
      }
    },
    props: {
      dialogShow: Boolean,
      queryDialog: Object,
      queryDialogDtl: Array,
    },
    watch: {
      dialogShow(){
        this.dialogVisible = this.dialogShow;
        if (this.dialogVisible) {
            this.loading=true;
          this.purchaseData = {}
          this.purchaseData.supplierId = this.queryDialog.supplierId;
          this.purchaseData.manageSubId = this.queryDialog.manageSubId;
          this.purchaseData.bizOrgId = this.queryDialog.bizOrgId;
          this.purchaseData.currencyId = this.queryDialog.currencyId;
          this.purchaseData.currentPage = 1;
          this.purchaseData.pageSize =10;
          this.purchaseData.needCount = true;
          this.getData();
        }else{
          this.selectAllDataList={};
          this.selectList={};
        }
      },
    },
    filters: {
      companyFilter(val) {
        if (val) {
          val.toString()
        }
        return ENUMS['7135'][val];
      },
      weightStandTypeFilter(val) {
        if (val) {
          val.toString()
        }
        return ENUMS['7125'][val];
      },
      setPointVal(val,Y){//小数控制
        if(val||val==0){
            val=Number(val).toFixed(Y)
        }
        return val;
      },
    },
    methods: {
      handleRowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row);//单击行选中
      },
      selectClick(row){
        var vm = this;
        vm.selectList[this.purchaseData.currentPage] = [];//selectList:{},selectAllDataList:{}
        for (let i = 0; i < row.length; i++) {
          vm.selectList[this.purchaseData.currentPage].push(row[i].poId);//对比数据
          this.selectAllDataList[this.purchaseData.currentPage] = row;//选中数据
        }
      },
  handleSizeChange(val){
        this.purchaseData.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val){
        this.purchaseData.currentPage = val;
        this.getData();
      },
      doQuery(){
        if (this.purchaseData.signDate) {
          if (this.purchaseData.signDate[0]) {
            this.purchaseData.signDateStart = this.purchaseData.signDate[0].parseTime('YYYY-MM-DD');
            this.purchaseData.signDateEnd = this.purchaseData.signDate[1].parseTime('YYYY-MM-DD');
          }
        } else if (this.purchaseData.signDate === null) {
          this.purchaseData.signDateStart = '';
          this.purchaseData.signDateEnd = '';
        }
        this.getData();
      },
      doClear(){
        this.purchaseData = {};//清空
        this.purchaseData.supplierId = this.queryDialog.supplierId;
        this.purchaseData.manageSubId = this.queryDialog.manageSubId;
        this.purchaseData.bizOrgId = this.queryDialog.bizOrgId;
        this.purchaseData.currencyId = this.queryDialog.currencyId;
        this.purchaseData.currentPage = 1;
        this.purchaseData.pageSize = 10;
        this.purchaseData.needCount = true;
        this.getData();
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

      chooseMethod(){
        let editList = [];
        for (var key in this.selectAllDataList) {
          for (var i in this.selectAllDataList[key]) {
            editList.push(this.selectAllDataList[key][i]);
          }
        }
        this.$emit('choosePurse', editList);
        this.$nextTick(() => {
          this.loading = false;
          this.$emit('closeDialogPurchase');
        })
      },
      //获取数据
      getData(){
        var data = {};
        for (var key in this.purchaseData) {
          var val = this.purchaseData[key];
          if (val) {
            if (val instanceof Array) {
            } else {
              data[key] = this.purchaseData[key];
            }
          }
        }
        data.poDtlIdList=this.queryDialogDtl;
        doQueryCodPoNoForOw(data).then(response => {
            this.loading=false;
          if (response.data.status == '1') {
            this.tableData = response.data.data.datalist;
            this.total = response.data.data.items;
            let vm=this;
            this.$nextTick(function () {
              if (vm.selectList[vm.purchaseData.currentPage]) {
                let array = Object.assign(vm.selectList[vm.purchaseData.currentPage], []);
                for (let row of vm.tableData) {
                  if (array.indexOf(row.poId) != -1) {
                    vm.$refs.multipleTable.toggleRowSelection(row, true);
                    console.log(vm.selectAllDataList,"----");
                  }else{}
                }
              }
            });
          }
        });
      },
    },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
