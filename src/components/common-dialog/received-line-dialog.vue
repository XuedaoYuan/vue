<template>
<el-dialog title="采购收货单" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
          <el-col :span="8">
            <el-form-item label="物料名称：" prop="goodsName">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsName" @keyup.enter.native="getList"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物料代码：" prop="goodsCode" labelWidth="130px">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsCode" @keyup.enter.native="getList"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8" style="margin-left:-32px">
                <el-form-item label="">
                    <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
                    <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick"  @row-dblclick="handleRowDblclick" style="width: 100%">
        <!--<el-table-column prop="poGrNo" label="收货单号" width="230px" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="poGrDtlRowNo" label="行号" width="230px" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="goodsCode" label="物料编码" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="goodsName" label="物料名称" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="" label="入库数量" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="unitName" label="单位" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--返回值-->
        <el-table-column prop="poGrDtlId" label="采购收货明细id" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="poGrDtlRowNo" label="采购收货单行号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="poNo" label="采购单号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="poDtlRowNo" label="采购单行号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="poGrNo" label="采购收货单号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsId" label="物料id" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contractQty" label="合同数量" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bizOrgId" label="部门id" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bizOrgCode" label="部门编码" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bizOrgName" label="部门名称" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cabinetNo" label="柜号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="supplierBatchNo" label="供应商批号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="seriesNo" label="批次号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitId" label="单位id" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="单位name" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitCode" label="单位code" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="settleUnitId" label="结算单位id" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="settleUnitName" label="结算单位name" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="settleUnitCode" label="结算单位code" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="packType" label="包装方式" width="100px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orginPrice" label="原币单价" width="100px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orginPriceTex" label="原币单价" width="100px" header-align="center" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.currentPage"
      :page-sizes="[10, 20, 30,50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setItem" size="mini">确 定</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
    </div>
</el-dialog>

</template>

<script>
//import { doQueryWithPage } from '@/api/common-select/goods-select'
import { doQueryWithDetail } from '@/api/purchase/purchase-return/purchase-return.js'//
export default {
    props: {
        mainInfoDialogFormVisible: Boolean,
        detailIndex: Number
    },
    data() {
      return {
        tempAll:{
          goodsCode:'',
          goodsName: '',
        },
        listLoading:false,
        listQuery:{
            pageSize:10,
            currentPage:1
        },
        selectRow:null,
        total:null,
        gridData: [],
        showFlag: false,
      };
    },
    watch: {
        mainInfoDialogFormVisible: function (val, oldVal) {
            this.showFlag = val;
            if (this.showFlag) {
                this.resetBtn();
            }
        }
    },
    methods:{
        closeDialog(){
            this.listLoading = false;
            this.$emit('closeItem');
        },
        setItem(){
//            this.$emit('setItem', this.selectRow);
          var obj={
            poGrDtlId: "poGrDtlId",
            poGrDtlRowNo: 'poGrDtlRowNo',
            poNo: 'poNo',
            poDtlRowNo: 'poDtlRowNo',
            poGrNo: 'poGrNo',
            goodsId: 'goodsId',
            goodsName: 'goodsName',
            goodsCode: 'goodsCode',
            contractQty: 'contractQty',
            bizOrgId: 'bizOrgId',//币别
            bizOrgCode: 'currencyId',//币别
            bizOrgName: 'bizOrgName',//币别
            cabinetNo: 'cabinetNo',
            supplierBatchNo: 'supplierBatchNo',
            seriesNo: 'seriesNo',
            unitId: 'unitId',
            unitName: 'unitName',
            unitCode: 'unitCode',
            settleUnitId: 'settleUnitId',
            settleUnitName: 'settleUnitName',
            settleUnitCode: 'settleUnitCode',
            packType: 'packType',
            orginPrice: 'orginPrice',
            orginPriceTex: 'orginPriceTex',
          }
            this.$emit('setItem', obj);

        },
        getList(){
            this.listLoading = true;
          doQueryWithDetail(this.tempAll,this.listQuery).then(response=> {
                if(response.data.status == 1){
                    this.gridData = response.data.data.datalist;
                    console.log("gridData=>",this.gridData);
                    this.total = response.data.data.items;
                    this.listLoading = false;
                }else {
                    this.listLoading = false;
                }
            })
        },
        resetBtn(){
            this.tempAll.goodsName = '' ;
            this.tempAll.goodsCode = '' ;
            this.listQuery = {
                pageSize:10,
                currentPage:1
            }
            this.getList();
        },
        handleRowClick(row){
            this.selectRow = row;
        },
        handleRowDblclick(row){
            this.selectRow = row;
            this.setItem();
        },
        handleSizeChange(val){
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val){
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
