<template>
<el-dialog title="收货单选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
          <el-col :span="6">
            <el-form-item label="采购合同号：" prop="poContractNo">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.poContractNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="采购合同系统单据号：" prop="poNo" labelWidth="130px">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.poNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货单号：" prop="poGrNo">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.poGrNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:-32px">
            <el-form-item label="">
              <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
    <el-table ref="receiveTable" :data="gridData" border stripe fit highlight-current-row height="300"
              @row-click="handleRowClick"
              @selection-change="handleSelectionChange"
              style="width: 100%" v-loading.body="listLoading">
      <el-table-column type="selection" align="center" fixed="left" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="poContractNo" label="采购合同号" width="150px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="poRowNo" label="采购合同行号" width="150px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="poGrNo" label="收货单号" width="150px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="poGrRowNo" label="收货单行号" width="150px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsCode" label="物料代码" width="150px" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="物料名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unreceivedInvoice" label="收货数量" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="hasSettleQty" label="已结算数量" align="center" width="120px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="currentInvoiceQty" label="未结算数量" align="center" width="120px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unitName" label="单位" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="texRate" label="税率" align="center" show-overflow-tooltip></el-table-column>
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
        <el-button type="primary" @click="fillRow" size="mini">确 定</el-button>
        <el-button @click="closeDialog" size="mini">取 消</el-button>
    </div>
</el-dialog>

</template>

<script>
import { doQueryWithDetail } from '@/api/purchase/purchase-invoice/purchase-invoice.js'
export default {
    props: {
      receiveDialogStatus: Boolean,
      manageSubId: String, //经营主体
      poInvoiceType: String, //发票类别
      bizOrgId: String, //部门
      currencyId: String, //币别
      supplierId: String, //供应商
      choosedData:Array
    },
    data() {
      return {
        tempAll:{
          poGrNo:'',
          poNo: '',
          poContractNo: '',
          manageSubId: '',
          poInvoiceType: '',
          bizOrgId: '',
          currencyId: '',
          supplierId: '',
        },
        listLoading:false,
        listQuery:{
            pageSize:10,
            currentPage:1
        },
        multipleSelection:[],
        total:null,
        gridData: [],
        showFlag: false,
        selectedPage:[],
        choosedId:[]
      };
    },
    watch: {
      receiveDialogStatus: function (val, oldVal) {
        this.showFlag = val;
        this.tempAll.manageSubId = this.manageSubId;
        this.tempAll.poInvoiceType = this.poInvoiceType;
        this.tempAll.bizOrgId = this.bizOrgId;
        this.tempAll.currencyId = this.currencyId;
        this.tempAll.supplierId = this.supplierId;
        this.choosedId=[];
        console.log(this.choosedData);
        for(var item of this.choosedData ){
          this.choosedId.push(item.poGrDtlId)
        }
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
        fillRow(){
            this.$emit('fillRow', this.multipleSelection);
        },
        getList(){
          this.listLoading = true;

          doQueryWithDetail(this.tempAll,this.listQuery,this.choosedId).then(response=> {
                if(response.data.status == 1){
                    this.gridData = response.data.data.datalist;
                    this.total = response.data.data.items;
                    this.listLoading = false;
                }else {
                    this.listLoading = false;
                }
            })
        },
        resetBtn(){
            this.tempAll.poGrNo = '' ;
            this.tempAll.poNo = '' ;
            this.tempAll.poContractNo = '' ;
            this.listQuery = {
                pageSize:10,
                currentPage:1
            };
            this.getList();
        },
        handleRowClick(row){
          this.$refs.receiveTable.toggleRowSelection(row);
        },
        handleSizeChange(val){
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val){
            this.listQuery.currentPage = val;
            this.getList();
        },
        handleSelectionChange(val){
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
