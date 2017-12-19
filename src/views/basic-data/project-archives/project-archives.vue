<template>
  <div class="allTemplate">
    <div class="btn">
      <el-button type="primary" size="mini">查 询</el-button>
      <el-button type="primary" size="mini">重 置</el-button>
    </div>
    <div class="form" style="margin: 10px">
      <el-form ref="form" label-width="80px" :model="tempAll">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="检验项目编号" prop="manageSubCode">
                <el-input size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="检验项目名称" prop="manageSubCode">
                <el-input size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人" prop="manageSubCode">
              <staff-select @childevent="childEventHandlerStaff" :querySelect="tempAll.createdBy"></staff-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn" style="margin-bottom: 10px">
      <el-button type="warning" size="mini" @click="addNewRow">创 建</el-button>
      <el-button type="warning" size="mini">保 存</el-button>
      <el-button type="warning" size="mini" @click="deleteCell">删 除</el-button>
    </div>
    <common-table
      :data="list"
      :maxHeight="300"
      :fit="true"
      :show="true"
      :headers="headers"
      @selection-change="handleSelectionChange"
    >
    </common-table>
    <div class="pagination" style="margin: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="listQuery.pageSize"
        :current-page.sync="listQuery.currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import StaffSelect from '@/components/common-select/staff-select.vue' //人员

  const headers = [
    {type: 'selection', width: '55px', fixed: "left"},
    {prop: 'a', label: '检验项目编号', align: 'center'},
    {prop: 'b', label: '检验项目名称',  align: 'center'},
    {prop: 'remark', label: '备注',  align: 'center'},
    {prop: 'createdBy', label: '创建人',  align: 'center'},
    {prop: 'createdTime', label: '创建时间',  dataType: 'Time', align: 'center'},
    {prop: 'updatedBy', label: '修改人',  align: 'center'},
    {prop: 'updatedTime', label: '修改时间',  dataType: 'Time', align: 'center'},
  ];
  export default {
    components:{StaffSelect},
      data(){
          return{
            headers:headers,
            list:[
              {a:"检验项目编号1",b:"检验项目名称",remark:'备注',createdBy:"创建人",createdTime:'2',updatedBy:'竹开',updatedTime:"1"},
              {a:"检验项目编号2",b:"检验项目名称",remark:'备注',createdBy:"创建人",createdTime:'2',updatedBy:'竹开',updatedTime:"1"},
              {a:"检验项目编号3",b:"检验项目名称",remark:'备注',createdBy:"创建人",createdTime:'2',updatedBy:'竹开',updatedTime:"1"},
              {a:"检验项目编号4",b:"检验项目名称",remark:'备注',createdBy:"创建人",createdTime:'2',updatedBy:'竹开',updatedTime:"1"},
              {a:"检验项目编号5",b:"检验项目名称",remark:'备注',createdBy:"创建人",createdTime:'2',updatedBy:'竹开',updatedTime:"1"},
            ],
            listQuery:{
              pageSize:10,
              currentPage:1
            },
            total:20,
            tempAll:{},
            deleteCellDataId:[], //删除数据
            deleteCellData:[], //删除数据比对数据
          }
      },
      methods:{
        handleSizeChange(val){
          console.log(val,'handleSizeChange');
        },
        handleCurrentChange(val){
          console.log(val,'handleCurrentChange');
        },
        childEventHandlerStaff(val) {
          if (val) {
            this.tempAll.createdBy = val.userName;
          } else {
            this.tempAll.createdBy = '';
          }
        },
        handleSelectionChange(row){
            this.deleteCellData=row;
        },
        deleteCell(){
          let data = [];
          let vm = this;
          vm.deleteCellDataId = [];
          for (var i = 0; i < this.list.length; i++) {
            for (var j = 0; j < this.deleteCellData.length; j++) {
              if (this.deleteCellData[j] == this.list[i]) {
                data[j] = this.deleteCellData[j];
                this.list.splice(i, 1);
                i--;
              }
            }
          }
        },
        addNewRow(){
            let data={
              remark:"remark",
              createdBy:"createdBy",
              createdTime:'1565236525565',
              updatedBy:'updatedBy',
              updatedTime:'1565236525565',
            };
            this.list.push(data);
        },
      },
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
