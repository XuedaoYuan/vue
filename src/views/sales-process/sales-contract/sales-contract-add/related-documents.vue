<template>
<div class="allTemplate">
    <div style="margin-bottom:12px">
      <span>&nbsp;&nbsp;文件：</span>
      <el-upload ref="upload" action="" style="display: inline-block" :on-change="handleUploadChange"
                 :auto-upload="false" :show-file-list="false" :file-list="fileList">
          <el-input slot="trigger" size="mini" type="primary" :value="fileList && fileList.length > 0?fileList[0].name:''">
          </el-input>
          <el-button class="orange-btn" type="warning" size="mini" style="margin-left:0px"
                     @click="submitUpload">上传
          </el-button>
      </el-upload>
      <span>文件上传上限20M</span>

    </div>
    <div>
      <el-table
      :data="tableData"  border highlight-current-row stripe fit header-align="center" @selection-change="handleSelectionChange"
      style="width: 100%">
        <el-table-column
          prop="index"
          label="文件操作"  align="center"
          min-width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="downLoad(scope.row, tableData)" type="text" size="small">下载</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
            </template>

        </el-table-column>
        <el-table-column
          prop="name"
          label="文件名称"  align="center"
          min-width="250">
        </el-table-column>
        <el-table-column
          prop="address" min-width="100"  align="center"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="time" width="180"  align="center"
          label="创建时间">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</div>
</template>


<script>
export default {
    data(){
        return {
            tempAll:{},
            multipleSelection:[],
            fileList: [],
            listQuery:{
              currentPage:1,
              pageSize:10
            },
            total:0,
            tableData: []
        }
    },
    methods: {
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      submitUpload(){
        // console.log(this.fileList,'dkjsfoauo');
        if(this.fileList.length == 0){
          this.$notify({
            title: '警告',
            message: '请选择要进行上传的文件',
            type: 'warning'
          });
        }else {
          this.total++;
          this.tableData.push(this.fileList[0]);
          this.fileList = [];
        }

      },
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      handleUploadChange(file, fileList){
        if (file.hasOwnProperty('size')) {
            if (file.size > 20 * 1024 * 1024) {
                this.$alert(file.name + '文件上传上限20M');
                fileList.del(file);
            }
        }
        if (fileList.length > 1) {
            fileList.splice(0, 1);
        }
        this.fileList = fileList;
      },
      deleteRow(index, rows){
        rows.splice(index, 1);
        this.total--;
      },
      downLoad(row){
        console.log(row)
        if(row.url){
          const a = document.createElement('a');
          a.setAttribute('href', row.url);
          a.setAttribute('download', row.name);
          a.click();
        }
      },
    }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom:0;
}
</style>
