<template>
<el-dialog title="销售出库单选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
            <el-col :span="6">
                <el-form-item label="交货单号" prop="soOsNo">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.soOsNo" @keyup.enter.native="getList"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="销售合同号" prop="soContractNo">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.soContractNo" @keyup.enter.native="getList"></el-input>
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
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick"  @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
      <el-table-column align="center" prop="soOsNo" label="销售出库单号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="customerName" label="客户名称" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="manageSubName" label="经营主体" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="bizOrgName" label="部门"  width="130px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="warehouseName" label="仓库"  width="130px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="createdTime" label="创建日期"  width="130px" header-align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{scope.row.createdTime | parseTime}}</span>
          </template>
      </el-table-column>
      <el-table-column align="center" prop="soNo" label="销售合同单据号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column align="center" prop="soContractNo" label="销售合同号" width="130px" header-align="center" show-overflow-tooltip></el-table-column>
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
  import { doQuerySoOs } from '@/api/common-select/library-select.js'
export default {
    props: {
        mainInfoDialogFormVisible: Boolean,
        detailIndex: Number
    },
    data() {
      return {
        tempAll:{
          soOsNo:'',//交货单号
          soContractNo: '',//销售合同号
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
        },
        getList(){
            this.listLoading = true;
          doQuerySoOs(this.tempAll,this.listQuery).then(response=> {
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
            this.tempAll.soOsNo = '' ;
            this.tempAll.soContractNo = '' ;
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
