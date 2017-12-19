<template>
<el-dialog title="客户选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" append-to-body>
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
            <el-col :span="6">
                <el-form-item label="客户名称：" prop="custName">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.custName" @keyup.enter.native="getList"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="客户编码：" prop="custCode">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.custCode" @keyup.enter.native="getList"></el-input>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="5">
                <el-form-item label="公司：" prop="orgCode">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.orgCode"></el-input>
                </el-form-item>
            </el-col> -->
            <!--<el-col :span="6">-->
                <!--<el-form-item label="申请人：" prop="applyBy">-->
                    <!--<el-input size="mini"  placeholder="请输入" v-model="tempAll.applyBy" @keyup.enter.native="getList"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="6" style="margin-left:-32px">
                <el-form-item label="">
                    <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
                    <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick"  @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
        <el-table-column prop="custName" label="客户名称" width="230px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="custCode" label="客户代码" width="230px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyName" label="公司名称" header-align="center" show-overflow-tooltip></el-table-column>
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
import { doQueryWithPage } from '@/api/common-select/customer-select'
export default {
    props: {
        customerFormVisible: Boolean,
        detailIndex: Number,
        querySelect: {
          type: Object,
          default: undefined
        }
    },
    data() {
      return {
        tempAll:{
            custName:'',
            custCode:'',
//            applyBy:'',
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
        customerFormVisible: function (val, oldVal) {
            this.showFlag = val;
            if (this.showFlag) {
                this.resetBtn();
            }
        }
    },
    methods:{
        closeDialog(){
            this.$emit('closeItem');
        },
        setItem(){
            this.$emit('setItem', this.selectRow);
        },
        getList(){
            if(this.querySelect){
                this.tempAll.companyId = this.querySelect.companyId;
            }else {
                this.tempAll.companyId = '';
            }
            this.listLoading = true;
            doQueryWithPage(this.tempAll,this.listQuery).then(response=> {
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
            this.tempAll = {
                custName:'',
                custCode:'',
//                applyBy:'',
            }
            if(this.querySelect){
                this.tempAll.companyId = this.querySelect.companyId;
            }else {
                this.tempAll.companyId = '';
            }
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
    #customer-dialog {
        z-index:9999;
    }
</style>
