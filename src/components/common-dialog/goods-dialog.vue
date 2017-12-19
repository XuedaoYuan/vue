<template>
<el-dialog style="text-align: left;" title="物料选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
        <el-row>
          <el-col :span="8">
            <el-form-item label="物料代码：" prop="goodsCode">
              <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsCode" @keyup.enter.native="getList"></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="8">
                <el-form-item label="物料名称：" prop="goodsName">
                    <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsName" @keyup.enter.native="getList"></el-input>
                </el-form-item>
            </el-col>

            <!--<el-col :span="6">-->
                <!--<el-form-item label="物料id：" prop="goodsId">-->
                    <!--<el-input size="mini"  placeholder="请输入" v-model="tempAll.warehouseId"></el-input>-->
                <!--</el-form-item>-->
            <!--</el-col>-->
            <!-- <el-col :span="6">
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
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick"  @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
      <el-table-column prop="goodsCode" label="物料代码" min-width="110px" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="goodsName" label="物料名称" min-width="230px" header-align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unitName" label="基本计量单位" min-width="70px" header-align="center" show-overflow-tooltip></el-table-column>
        <!--<el-table-column prop="goodsId" label="物料Id" header-align="center" show-overflow-tooltip></el-table-column>-->
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
import { doQueryWithPage } from '@/api/common-select/goods-select'
export default {
    props: {
        mainInfoDialogFormVisible: Boolean,
        detailIndex: Number
    },
    data() {
      return {
        tempAll:{
            goodsName:'',
            goodsCode: '',

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
    .el-dialog__header {
        text-align: left;
    }
</style>
