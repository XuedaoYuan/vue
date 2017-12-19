<template>
<el-dialog title="采购收货单" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small" >
    <el-form ref="form" label-width="80px" :model="tempAll" class="formStyle hundred-percent-input">
      <el-row>
        <el-col :span="8">
          <el-form-item label="物料名称：" prop="goodsName">
            <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物料代码：" prop="goodsCode" labelWidth="130px">
            <el-input size="mini"  placeholder="请输入" v-model="tempAll.goodsCode"></el-input>
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
    <el-table ref="receiveTable" :data="gridData" @row-dblclick = "handleDblclick" border stripe fit highlight-current-row height="300" @cell-click="handleCellClick" @row-click="handleRowClick" @select-all="handleSelectionAllChange"  @selection-change="handleSelectionChange" v-loading="listLoading">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
    <el-table-column prop="poGrNo" label="收货单号" header-align="center" show-overflow-tooltip></el-table-column>
    <el-table-column prop="poGrRowNo" label="行号"  header-align="center" show-overflow-tooltip></el-table-column>
    <el-table-column prop="goodsCode" label="物料编码" header-align="center" show-overflow-tooltip></el-table-column>
    <el-table-column prop="goodsName" label="物料名称" header-align="center" show-overflow-tooltip></el-table-column>
    <el-table-column prop="settleQty" label="入库数量" header-align="center" show-overflow-tooltip></el-table-column>
    <el-table-column prop="unitName" label="单位" header-align="center" show-overflow-tooltip></el-table-column>
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
  import {doQueryWithReturn } from '@/api/purchase/purchase-return/purchase-return.js'
export default {
    props: {
      receiveDialogStatus: Boolean,
      poGrId: String,
    },
    data() {
      return {
        tempAll:{
          goodsCode: '',
          goodsName: '',
        },
        listLoading:false,
        listQuery:{
            pageSize:10,
            currentPage:1
        },
        selectList:{},//记录选中数据的唯一标识
        multipleSelection:{},//记录全部数据
        multipleSelectionCurrent:{},//记录当前选中数据
        total:null,
        gridData: [],
        showFlag: false,
        selectedPage:[]
      };
    },
    watch: {
      receiveDialogStatus: function (val, oldVal) {
        this.showFlag = val;
//        this.multipleSelection=[];
        this.multipleSelection={};
//        this.$refs.receiveTable.clearSelection();
        this.tempAll.goodsName = this.goodsName;
        this.tempAll.goodsCode = this.goodsCode;
        if (this.showFlag) {
          this.resetBtn();
        }
      }
    },
    methods:{
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleDblclick(row, column, cell){
        console.log('双击')
        var arr=[]
        arr.push(row)
        this.$emit('fillRow', arr);
      },
      closeDialog(){
            this.listLoading = false;
            this.$emit('closeItem');
        },
        fillRow(){
          var arr=[];
//          console.log('multipleSelectionCurrent')
//          console.log('fillRow',this.multipleSelectionCurrent)
          for(var index in this.multipleSelectionCurrent){//把选中的数据重新整合到一个数组中
            for(var i in this.multipleSelectionCurrent[index]){
              arr.push(this.multipleSelectionCurrent[index][i])
            }
          }
            this.$emit('fillRow', arr);
//            this.$emit('fillRow', this.multipleSelection);
        },
        getList(){
          let vm = this;
          vm.listLoading = true;
//          console.log('poGrId-dialog',vm.poGrId)
          doQueryWithReturn(vm.tempAll,vm.poGrId,vm.listQuery).then(response=> {
                if(response.data.status == 1){
                  vm.gridData = response.data.data.datalist;
                  vm.total = response.data.data.items;
                  vm.$nextTick(function () {
                    let currentPage = vm.listQuery.currentPage;
                    vm.multipleSelection[currentPage] = response.data.data.datalist;
                  });
                  vm.listLoading = false;
                }else {
                  vm.listLoading = false;
                }
            })
        },
        resetBtn(){
            this.tempAll.goodsCode = '' ;
            this.tempAll.goodsName = '' ;
            this.listQuery = {
                pageSize:10,
                currentPage:1
            };
            this.getList();
        },
        handleRowClick(row){

        },
        handleRowDblclick(row){//双击事件
//        this.multipleSelection = row;
//        this.fillRow();
      },
        handleSizeChange(val){
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val){
          let vm = this;
          vm.listQuery.currentPage = val;
          if(vm.multipleSelection[vm.listQuery.currentPage]){
            vm.gridData=vm.multipleSelection[vm.listQuery.currentPage];
            vm.$nextTick(function(){
              if(vm.selectList[vm.listQuery.currentPage]){
                let array = Object.assign(vm.selectList[vm.listQuery.currentPage], []);
                for (let row of vm.gridData) {
                  if (array.indexOf(row.poGrDtlId) != -1) {
                    vm.$refs.receiveTable.toggleRowSelection(row, true)
                  }
                }
              }
            })
          }else{
            vm.getList()
          }
        },
        handleSelectionChange(val){
          let vm = this;
          vm.$nextTick(function() {//不加就报错了shit
            vm.selectList[vm.listQuery.currentPage] = []
            for (let i = 0; i < val.length; i++) {
              vm.selectList[vm.listQuery.currentPage].push(val[i].poGrDtlId);
            }
            vm.multipleSelectionCurrent[vm.listQuery.currentPage] = val;
          })
            },
        handleSelectionAllChange:function(val){
          let vm = this;
          vm.$nextTick(function(){
            vm.selectList[vm.listQuery.currentPage] = [];
            for (let i = 0;i<val.length;i++){
              vm.selectList[vm.listQuery.currentPage].push(val[i].poGrDtlId);
            }
            vm.multipleSelectionCurrent[vm.listQuery.currentPage] = val;
          })
      },
    },
};

</script>
<style scoped>
    .formStyle {
        margin-bottom: 12px;
    }
</style>
