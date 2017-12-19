<template>
  <div class="management dailog" v-if="dialogVisible">
    <el-dialog
      title="销售合同号"
      :visible.sync="dialogVisible"
      class="drag-small"
      v-drag
      @close="closeDialog">
      <!--销售合同号、销售合同单据号、出库单号、退货单号、物料代码-->
      <el-form ref="form" label-width="90px" :model="purchaseData" style="margin:0 0 15px 0">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="销售合同号" prop="soContractNo">
              <el-input v-model="purchaseData.soContractNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售合同单据号" prop="soNo">
              <el-input v-model="purchaseData.soNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出库单号" prop="soOsNo">
              <el-input v-model="purchaseData.soOsNo" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="物料代码" prop="goodsCode">
              <el-input v-model="purchaseData.goodsCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <!----退货状态-->
          <el-col :span="8" v-if="returnGoods">
            <el-form-item label="退货单号" prop="soRoNo">
              <el-input v-model="purchaseData.soRoNo" size="mini"></el-input>
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
          prop="soOsNo"
          min-width="160px"
          show-overflow-tooltip
          align="center"
          label="交货单号">
        </el-table-column>
        <el-table-column
          prop="soContractNo"
          show-overflow-tooltip
          label="销售合同号"
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
        <!--=_=-->
        <el-table-column
          prop="settleQty"
          label="出货数量"
          align="center"
          show-overflow-tooltip
          min-width="120px"
          v-if="!returnGoods"
        >
        </el-table-column>
        <el-table-column
          prop="retireQty"
          label="退货数量"
          align="center"
          show-overflow-tooltip
          min-width="120px"
          v-else
        >
        </el-table-column>
        <el-table-column
          prop="soRoNo"
          label="退货单号"
          align="center"
          show-overflow-tooltip
          min-width="120px"
          v-if="returnGoods"
        >
        </el-table-column>
        <!--=_=-->
        <el-table-column
        prop="hasSettleQty"
        show-overflow-tooltip
        label="已结算数量"
        min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="unSettleQty"
          show-overflow-tooltip
          label="未结算数量"
          align="center"
          min-width="120px"
        >
        </el-table-column>
        <el-table-column
          prop="unitName"
          show-overflow-tooltip
          label="单位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orginPriceTex"
          label="单价（含税）"
          align="center"
          show-overflow-tooltip
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.costPrice | setPointVal(6)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="texRate"
          show-overflow-tooltip
          label="税率"
          align="center"
          min-width="120px"
        >
          <template slot-scope="scope">
            <span>{{scope.row.texRate | setPointVal(2)}}</span>
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
        <!--<el-table-column-->
          <!--prop="unSettleQty"-->
          <!--label="未结算数量"-->
          <!--align="center"-->
          <!--show-overflow-tooltip-->
          <!--min-width="120px"-->
        <!--&gt;-->
          <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;<span>{{scope.row.weightStandType | weightStandTypeFilter}}</span>&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<span>{{Number(scope.row.settleQty) - Number(scope.row.hasSettleQty)}}</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--</el-table-column>-->
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

  import {
    doQueryDtlInvoiceWithPage,//非退货
    doQueryDtlInvoiceWithPageReturn,//退货
  } from '@/api/sales-process/sales-invoice/sales-invoice'
  export default {
    data(){
      return {
        selectAllDataList:{},//全部数据
        selectList:{},//全部数据
        dialogVisible: false,
        tableData: [],
//出货数量、
//退货单号、退货数量、
//出货数量、
        chooseData: [],
        loading: true,
        purchaseData: {
          pageSize: 10,
          currentPage: 1,
          needCount: true
        },
        total: null,
        returnGoods:false,
      }
    },
    props: {
      dialogShow: Boolean,
      queryDialog: Object,
    },
    watch: {
      dialogShow(){
        this.dialogVisible = this.dialogShow;
        if(this.queryDialog.soInvoiceType=='73100015'||this.queryDialog.soInvoiceType=='73100020'){
          this.returnGoods=true;
        }
        if (this.dialogVisible) {
            this.loading=true;
          this.purchaseData={};//清空上次数据
          this.purchaseData.pageSize=10;
          this.purchaseData.currentPage=1;
          this.purchaseData.needCount=true;
          this.purchaseData.soInvoiceType= this.queryDialog.soInvoiceType;
          this.purchaseData.manageSubName= this.queryDialog.manageSubName;
          this.purchaseData.manageSubCode= this.queryDialog.manageSubCode;
          this.purchaseData.manageSubId= this.queryDialog.manageSubId;
          this.purchaseData.currencyName= this.queryDialog.currencyName;
          this.purchaseData.currencyId= this.queryDialog.currencyId;
          this.purchaseData.currencyCode= this.queryDialog.currencyCode;
          this.purchaseData.bizOrgName= this.queryDialog.bizOrgName;
          this.purchaseData.bizOrgCode= this.queryDialog.bizOrgCode;
          this.purchaseData.bizOrgId= this.queryDialog.bizOrgId;
          this.getData();
        }else{
          this.selectAllDataList={};
          this.selectList={};
          this.returnGoods=false;
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
//      weightStandTypeFilter(val) {//合同计重标准
//        if (val) {
//          val.toString()
//        }
//        return ENUMS['7125'][val];
//      },
      setPointVal(val,Y){//小数控制
        if(val||val==0){
          val=Number(val).toFixed(Y)
        }
        return val;
      },
    },
    methods: {
      handleRowClick(row){
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      selectClick(row){
        var vm = this;
        vm.selectList[this.purchaseData.currentPage] = [];
        for (let i = 0; i < row.length; i++) {
          vm.selectList[this.purchaseData.currentPage].push(row[i].poId);
          this.selectAllDataList[this.purchaseData.currentPage] = row;
        }
        this.chooseData = row;
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
        this.getData();
      },
      doClear(){
        //重置
        this.purchaseData={};//清空
        this.purchaseData.currentPage = 1;
        this.purchaseData.pageSize = 10;
        this.purchaseData.needCount = true;
        this.purchaseData.soInvoiceType= this.queryDialog.soInvoiceType;
        this.purchaseData.manageSubName= this.queryDialog.manageSubName;
        this.purchaseData.manageSubCode= this.queryDialog.manageSubCode;
        this.purchaseData.manageSubId= this.queryDialog.manageSubId;
        this.purchaseData.currencyName= this.queryDialog.currencyName;
        this.purchaseData.currencyId= this.queryDialog.currencyId;
        this.purchaseData.currencyCode= this.queryDialog.currencyCode;
        this.purchaseData.bizOrgName= this.queryDialog.bizOrgName;
        this.purchaseData.bizOrgCode= this.queryDialog.bizOrgCode;
        this.purchaseData.bizOrgId= this.queryDialog.bizOrgId;
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
      rowclick(row){
        this.chooseData = row;//单击选中的值
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
//        let vm=this;
        let [vm,pathWay]=[this,''];
        if(vm.returnGoods){
          pathWay=doQueryDtlInvoiceWithPageReturn
        }else{
          pathWay=doQueryDtlInvoiceWithPage
        }
        pathWay(this.purchaseData).then(response => {
            this.loading=false;
          if (response.data.status == '1') {
            this.tableData = response.data.data.datalist;
            this.total = response.data.data.items;
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
