<template>
  <div id="moneyCredit" class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
        <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true"></el-button>
        <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-search" size="small" @click="rest">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="100px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="6">
                  <el-form-item label="港口编号" prop="bsPtCode">
                    <el-input v-model="formData.bsPtCode" size="mini"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="港口名称" prop="bsPtName">
                  <el-input v-model="formData.bsPtName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="港口状态" prop="bsPtStatus">
                  <el-select v-model="formData.bsPtStatus" size="mini" clearable placeholder="请选择">
                    <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="港口性质" prop="bsPtNature">
                  <el-select v-model="formData.bsPtNature" size="mini" clearable placeholder="请选择">
                    <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom: 15px">
      <el-button type="warning" size="mini" @click.native="onClickAdd">创建</el-button>
      <el-button type="warning" size="mini" @click.native="onClickEdit" :disabled="editBtnStatus">修改</el-button>
      <el-button type="warning" size="mini" @click="onClickDel" :disabled="deleBtnStatus">删除</el-button>
    </div>
    <div class="commonTable">
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="headers"
      @row-db-click = "handleDblclick"
      @selection-change="handleSelectionChange"
      v-loading="listLoading"
      style="margin-bottom: 15px;"
    >
    </common-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.currentPage"
      :page-sizes="[10, 20, 30,50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {doQueryWithPage} from 'api/basic-data/port/port.js';
  const headers = [
    { type: 'selection', width: '55px'},
    { type: 'bsPtCode', label: '港口编号',align:'center'},
    { prop: 'bsPtName', label: '港口名称' ,align:'center'},
    { prop: 'bsPtStatus', label: '港口类型' ,align:'center'},
    { prop: 'bsPtNature', label: '港口性质' ,align:'center'},
    { prop: 'createdBy', label: '创建人',align:'center' },
    { prop: 'createdTime', label: '创建时间' ,align:'center',dataType: 'Time'},
    { prop: 'updatedBy', label: '修改人',align:'center' },
    { prop: 'updatedTime', label: '修改时间' ,align:'center',dataType: 'Time'},
  ];
  export default {
    data(){
      return {
        searchBarFlg: true,
        multipleSelection:[],
        listLoading: 'false',
        formData:{
          bsPtCode:'',//港口编号
          bsPtName:'',//港口名称
          bsPtStatus:'',//港口类型
          bsPtNature:'',//港口性质
        },
        total:1,
        listQuery:{
          pageSize:1,
          currentPage:1
        },
        headers: headers,
        tableData: [
          {
            bsPtCode:'',//港口编号
            bsPtName:'',//港口名称
            bsPtStatus:'',//港口类型
            bsPtNature:'',//港口性质
            createdBy:'',//创建人
            createdTime:'',//创建时间
            updatedBy:'',//修改人
            updatedTime:'',//修改时间
          }
        ],
        port:[
          {
            value:'0',
            label:'杭州'
          },
          {
            value:'1',
            label:'诸暨'
          }
        ]
      }
    },
    created(){
      this.getData();
    },
    activated(){
      this.getData();
    },
    computed: {
      editBtnStatus(){
        if(this.multipleSelection.length!=1){
          return  true;
        }
        return false;
      },
      deleBtnStatus(){
        if(this.multipleSelection.length<1){
          return  true;
        }
        return false;
      }
    },
    methods:{
      getData() {
        this.listLoading = true;
        doQueryWithPage(this.formData,this.listQuery).then(response => {
          this.tableData = response.data.data.datalist;
          this.total = response.data.data.items;
          this.listLoading = false;
        });
      },
      //重置
      rest(){
        this.formData.bsPtCode = '';
        this.formData.bsPtName = '';
        this.formData.bsPtStatus = '';
        this.formData.bsPtNature = '';
      },
      //创建
      onClickAdd() {
        this.$store.dispatch('toggleCurrentView', {
          PortDetail: {
            view: 'add'
          }
        });
      },
      //修改
      onClickEdit() {
        this.$store.dispatch('toggleCurrentView', {
          PortDetail: {
            view: 'edit',
            params: {
              bsPtId: this.multipleSelection[0].bsPtId
            }
          }
        });
      },
      //查看
      handleDblclick(row, column, cell){ //查询
        this.$store.dispatch('toggleCurrentView', {
          PortDetail: {
            view: 'look',
            params: {
              params: {
                bsPtId: row.bsPtId
              }
            }
          }
        });
      },
      //删除
      onClickDel() {
        this.$confirm('确定删除?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.selectList.forEach((x,i) => {
            let idx = this.tableData.findIndex((val) => val == x);
            idx>-1 && this.tableData.splice(idx, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      handleSelectionChange(row){
        this.multipleSelection=row;
      },
      //分页
      handleSizeChange(val){
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val){
        this.listQuery.currentPage = val;
        this.getList();
      },
    },
    watch: {}
  }

</script>
