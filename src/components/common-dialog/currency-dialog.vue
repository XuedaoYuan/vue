<template>
<el-dialog title="币别选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
            <el-col :span="6">
                <el-form-item label="货币代码" prop="currencyCode">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.currencyCode" @keyup.enter.native="getList"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="货币名称" prop="currencyName">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.currencyName" @keyup.enter.native="getList"></el-input>
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
        <el-table-column prop="currencyCode" label="货币代码" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="currencyName" label="货币名称" header-align="center" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="currencyShortname" label="币种简称" header-align="center" show-overflow-tooltip></el-table-column>-->
        <!--<el-table-column prop="exchangeRate" label="汇率" header-align="center" show-overflow-tooltip></el-table-column>-->
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
import { doQueryWithPageforCurrency } from 'api/common-select/supplier.js';
export default {
    props: {
        mainInfoDialogFormVisible: Boolean,
        detailIndex: Number
    },
    data() {
      return {
        tempAll:{
            currencyCode:'',
            currencyName: '',
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
            doQueryWithPageforCurrency(this.tempAll,this.listQuery).then(response=> {
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
            this.tempAll.currencyCode = '' ;
            this.tempAll.currencyName = '' ;
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
