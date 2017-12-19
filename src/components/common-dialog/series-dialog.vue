<template>
<el-dialog style="text-align: left;" title="批次选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
            <el-col :span="8">
                <el-form-item label="物料名称：" prop="goodsName">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="批次号：" prop="seriesNo">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.seriesNo"></el-input>
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
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick"  @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
        <el-table-column prop="seriesNo" label="批次" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsCode" label="物料编码" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="goodsName" label="物料名称" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="基本单位" header-align="center" show-overflow-tooltip></el-table-column>
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
import { doQueryWindow } from '@/api/inventory/inventory-allot/inventory-allot.js'
export default {
    props: {
        mainInfoDialogFormVisible: Boolean,
        queryObj: {type:Object,default: {}},
        detailIndex: Number
    },
    data() {
      return {
        tempAll:{
          goodsName:'',
          seriesNo: '',
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
  created(){
    console.log('this.queryObj',this.queryObj)
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
          console.log('this.queryObj',this.queryObj)
            this.listLoading = true;
          doQueryWindow(this.tempAll,this.queryObj,this.listQuery).then(response=> {
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
            this.tempAll.goodsName = '' ;
            this.tempAll.seriesNo = '' ;

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
    .el-dialog__header {
        text-align: left;
    }
</style>
