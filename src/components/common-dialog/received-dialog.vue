<template>
<el-dialog title="采购收货单" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
          <el-col :span="8">
            <el-form-item label="收货单号：" prop="poGrNo">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.poGrNo" @keyup.enter.native="getList"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="6">-->
            <!--<el-form-item label="采购合同系统单据号：" prop="poNo" labelWidth="130px">-->
              <!--<el-input size="mini"  placeholder="请输入" v-model="tempAll.poNo"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
            <!--<el-form-item label="采购合同号：" prop="poContractNo">-->
              <!--<el-input size="mini"  placeholder="请输入" v-model="tempAll.poContractNo"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
            <el-col :span="8">
                <el-form-item label="供应商：" prop="supplierName">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.supplierName" @keyup.enter.native="getList"></el-input>
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
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick" v-loading="listLoading"  @row-dblclick="handleRowDblclick" style="width: 100%">
        <el-table-column prop="poGrNo" label="收货单号" header-align="center" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="poNo" label="采购合同系统单据号" width="230px" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="poContractNo" label="采购合同号" header-align="center" show-overflow-tooltip></el-table-column>-->
        <el-table-column prop="supplierName" label="供应商" header-align="center" show-overflow-tooltip></el-table-column>
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
import { doQueryWithReceived } from '@/api/purchase/purchase-return/purchase-return.js'//
export default {
    props: {
        mainInfoDialogFormVisible: Boolean,
        queryId:String,
      poGrStatus:String
//      manageSubId:{type:Number}

      },
    data() {
      return {
        tempAll:{
          poContractNo:'',
          poGrNo: '',
          poNo: '',
          supplierName: ''
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
            this.$emit('setItem', this.selectRow);
//          var obj={
//            poGrNo: "poGrNo",
//            poGrId: 'poGrId',
//            manageSubCode: 'manageSubCode',
//            manageSubName: 'manageSubName',
//            manageSubId: 'manageSubId',
//            warehouseName:'cangku',
//            warehouseId:'cangku',
//            warehouseCode:'cangku',
//            roPoType: '72300010',
//            bizOrgId: 'bizOrgId',
//            bizOrgCode: 'bizOrgCode',
//            bizOrgName: 'bizOrgName',
//            currencyCode: 'currencyCode',//币别
//            currencyId: 'currencyId',//币别
//            currencyName: 'currencyName',//币别
//            supplierCode: 'supplierCode',
//            supplierName: 'supplierName',
//            supplierId: 'supplierId',
//          }
//            this.$emit('setItem', obj);

        },
        getList(){
            this.listLoading = true;
//            console.log('received-dialog',this.queryId)
            console.log('received-dialog,poGrStatus',this.poGrStatus)
          doQueryWithReceived(this.tempAll,this.queryId,this.poGrStatus,this.listQuery).then(response=> {
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
            this.tempAll.poContractNo = '' ;
            this.tempAll.poGrNo = '' ;
            this.tempAll.poNo = '' ;
            this.tempAll.supplierName = '' ;
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
