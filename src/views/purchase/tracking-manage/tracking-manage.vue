<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <Tracking-Manage-Form :dataForPage="dataForPage" :pageState="pageState"
         @doCleanPage="doCleanPage"  @tableDataToDetail="getTableData" ref="formPage" :listQuery="listQuery"></Tracking-Manage-Form>
    </div>
    <div class="btn">
      <el-button type="warning" size="mini" @click.native="establish('add')">创建</el-button>
      <el-button type="warning" size="mini" @click="establish('edit')" :disabled="!toQuryOneChange.res">修改</el-button>
      <!--<el-button type="warning" size="mini" @click="doPosting" :disabled="!toQuryOneChangeMore.res">过账-->
      <!--</el-button>-->
      <el-button type="warning" size="mini" @click="doPosting" :disabled="!toQuryOneChange.res">过账
      </el-button>
      <el-button type="warning" size="mini" @click="doDetel" :disabled="!detelStatus.res">删除</el-button>
      <el-button type="warning" size="mini" :disabled="!toWriteOff.res" @click="writeOff">冲销</el-button>
      <!--<el-button type="warning" size="mini" :disabled="!toQuryOne">费用预提</el-button> 文档没有，原型有-->
      <el-dropdown @command="handleCommand" trigger="click">
        <el-button type="warning" size="mini" :disabled="!toPort.res&&!toQing.res">生成<i
          class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="daogang" :disabled="!toPort.res">生成-到港</el-dropdown-item>
          <el-dropdown-item command="qingguan" :disabled="!toQing.res">生成-清关</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="commonTable">
      <!--v-loading.sync="loading"-->
      <common-table
        :data="list"
        :maxHeight="300"
        :fit="true"
        :show="true"
        :headers="headers"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        @row-db-click="wentToDetailPage"
      >
        <template slot-scope="scope" slot="filter">
          <div v-if="scope.text == 'changeOwType'">
            <span>{{list[scope.index]['owType'] | changeOwType}}</span>
          </div>
          <div v-if="scope.text == 'changeFreightForwarder'">
            <span>{{list[scope.index]['freightForwarder'] | changeFreightForwarder}}</span>
          </div>
          <div v-if="scope.text == 'changeowStatus'">
            <span>{{list[scope.index]['owStatus'] | changeowStatus}}</span>
          </div>
        </template>
      </common-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="listQuery.pageSize"
        :current-page.sync="listQuery.currentPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--<div id="checkDialog">-->
      <!--<el-dialog-->
        <!--title="确认过账？"-->
        <!--:visible.sync="postingDialogVisible"-->
        <!--top="20%">-->
        <!--<el-radio-group v-model="radio">-->
          <!--<el-radio label="1">通 过</el-radio>-->
          <!--<el-radio label="2">驳 回</el-radio>-->
        <!--</el-radio-group>-->
        <!--<span slot="footer" class="dialog-footer">-->
           <!--<el-button @click="postingDialogVisible = false">取 消</el-button>-->
           <!--<el-button type="primary" @click="doPosting">确 定</el-button>-->
        <!--</span>-->
      <!--</el-dialog>-->
    <!--</div>-->
  </div>
</template>
<script type="text/javascript">
  import moment from "moment"
  import TrackingManageForm from '@/views/purchase/tracking-manage/tracking-manage-form.vue'
  //接口引用
  import {
    doQueryWithPage,
    doCusSave,
    doQueryAll,
    doPosting,
    doReversal,
    doDeleteOw
  } from '@/api/purchase/tracking-manage/tracking-manage'

  const headers = [
    {type: 'selection', width: '55px', fixed: "left"},
    {prop: 'owNo', label: '系统单据号', editable: false, width: '160px', align: 'center'},
    {prop: 'billNo', label: '提单号', width: '140px', align: 'center'},
    {prop: 'owType', label: '单据类型', width: '100px', filter: 'changeOwType', align: 'center'},
    {prop: 'owStatus', label: '单据状态', width: '100px',filter:"changeowStatus", align: 'center'},
    {prop: 'invoiceNo', label: '发票号', width: '140px', align: 'center'},
    {prop: 'manageSubName', label: '经营主体', width: '180px', align: 'center'},
    {prop: 'bizOrgName', label: '部门', width: '160px', align: 'center'},//没有找到
    {prop: 'supplierName', label: '供应商', width: '150px', align: 'center'},
    {prop: 'arrivePortName', label: '到达港口', width: '140px', align: 'center'},
    {prop: 'expectPayRateDate', label: '预计付税日', width: '120px', dataType: 'Date', align: 'center'},
    {prop: 'freeDay', label: '免箱期限', width: '100px', align: 'center'},
    {prop: 'arriveSendDate', label: '到单寄出日', width: '120px', dataType: 'Date', align: 'center'},
    {prop: 'freightForwarder', label: '负责货代', width: '120px', filter: 'changeFreightForwarder', align: 'center'},
    {prop: 'createdBy', label: '创建人', width: '120px', align: 'center'},
    {prop: 'createdTime', label: '创建时间', width: '140px', dataType: 'Time', align: 'center'},
    {prop: 'updatedBy', label: '修改人', width: '100px', align: 'center'},
    {prop: 'updatedTime', label: '修改时间', width: '140px', dataType: 'Time', align: 'center'},
    {prop: 'postPersonName', label: '过账人', width: '100px', align: 'center'},
    {prop: 'postDate', label: '过账时间', width: '140px', dataType: 'Time', align: 'center'}
  ];

  export default {
    components: {TrackingManageForm},
    props: {
      owId: ''
    },
    data(){
      return {
        headers: headers,
        list: [],
        dataForPage: [],
        pageState: true,
        dataForChange: [],
        getEditAfterDataForPage: '',//审核后修改数据
//        postingDialogVisible: false,//过账弹框
        postingDialogVisibleValue: '',
        getRowData: '',
        total: null,
        listQuery: {
          currentPage: 1,
          pageSize: 10//一页的条数
        },
        loading: true,
        toPortData: [],//到港数据
        toQingData: [],//到港数据
        doDeleteDataFor: [],//删除数据id
        dowriteOffFor: [],//冲销数据id
        doPostOffFor: [],//过账数据id
        radio: '1',
      }
    },
    computed: {
      //查询
      toQuryOne(){
        let res = false;
        if (this.dataForChange.length == '1') {
          res = true;
        } else {
          res = false;
        }
        return res;
      },
      //删除
      detelStatus(){
        let vm = this;
        let data = [];
        data.res = false;
        if (this.dataForChange.length > '0') {
          for (var key in vm.dataForChange) {
            if (vm.dataForChange[key].owStatus == '70100010') {//保存
              data.push({
                owId: vm.dataForChange[key].owId,
                version: vm.dataForChange[key].version,
              });
              data.res = true;
            } else {
              data.res = false;
            }
          }
          vm.dataForChange.forEach((o, i) => {
            if (o.owStatus != '70100010') {
              data.res = false
            }
          });
        } else {
          data.res = false;
        }
        this.doDeleteDataFor = data;
        return data;
      },
      //过账
      canPosting(){
        var vm = this;
        let data = [];
        data.res = false;
        for (var key in vm.dataForChange) {
          if (vm.dataForChange[key].owType == '72000010') {
            data.push(vm.dataForChange[key].owNo);
            data.res = true;
          } else {
            data.res = false;
          }
        }
        vm.dataForChange.forEach((o, i) => {
          if (o.owType != '72000010') {
            data.res = false
          }
        });
        //过账数据
        return data;
      },
      //生成到港
      toPort(){
//          提单，已过账
        var vm = this;
        let data = [];
        data.res = false;
        for (var key in vm.dataForChange) {
//      后面的freeday需要改为已过账的控制
          if (this.dataForChange.length == '1') {
            if (vm.dataForChange[key].owType == '72000010' && vm.dataForChange[key].owStatus == '70100020') {
              data.push({
                owId: vm.dataForChange[key].owId,
                owType: 'arrivePort',
              });
              data.res = true;
            } else {
              data.res = false;
            }
          }

        }
//        vm.dataForChange.forEach((o, i) => {
//          if (o.owType != '72000010' || vm.dataForChange[key].owStatus == '70100020') {
//            data.res = false
//          }
//        });
        vm.toPortData = data[0];
        //过账数据
        return data;
      },
      //生成清关
      toQing(){
//          到港，已过账--
        var vm = this;
        let data = [];
        data.res = false;
        for (var key in vm.dataForChange) {
//            后面的freeday需要改为已过账的控制
          if (vm.dataForChange.length == '1') {
            if (vm.dataForChange[key].owType == '72000020' && vm.dataForChange[key].owStatus == '70100020') {
              data.push({
                owId: vm.dataForChange[key].owId,
                owType: 'qingGuan',
              });
              data.res = true;
            } else {
              data.res = false;
            }
          }
        }
//        vm.dataForChange.forEach((o, i) => {
//          if (o.owType != '72000020' || vm.dataForChange[key].owStatus == '70100020') {
//            data.res = false
//          }
//        });
        vm.toQingData = data[0];
        //过账数据
        return data;
      },
      //修改--过账-删除为单是可以用
      toQuryOneChange(){
        //保存状态可以
        let data = [];
        data.res = false;
        if (this.dataForChange.length == '1') {
          if (this.dataForChange[0].owStatus == '70100010') {
            data.push({
              'owId': this.dataForChange[0].owId,
              'version': this.dataForChange[0].version
            });
            data.res = true;
          }
        } else {
          data.res = false;
        }
        this.doPostOffFor = data;
        return data;
      },
      //冲销
      toWriteOff(){
        var vm = this;
        let data = [];
        data.res = false;
        if (vm.dataForChange.length == '1') {//已过账
          if (vm.dataForChange[0].owStatus == '70100020') {
            data.push({
              owId: vm.dataForChange[0].owId,
              version: vm.dataForChange[0].version,
            });
            data.res = true;
          } else {
            data.res = false;
          }
        }
        //审核后修改数据
        this.dowriteOffFor = data;
        return data;
      },
      //多条过账状态判断
      toQuryOneChangeMore(){
        var vm = this;
        let data = [];
        data.res = false;
        for (var key in vm.dataForChange) {
          if (vm.dataForChange[key].owStatus == '70100010') {
            data.push({
              'owId': vm.dataForChange[key].owId,
              'version': vm.dataForChange[key].version
            });
            data.res = true;
          } else {
            data.res = false;
          }
        }
        vm.dataForChange.forEach((o, i) => {
          if (o.owStatus != '70100010') {
            data.res = false
          }
        });
        //审核后修改数据
        vm.doPostOffFor = data;
        return data;
      },
    },
    activated(){
      console.log("activated")
      this.listQuery = {
        currentPage: 1,
        pageSize: 10//一页的条数
      };
//      this.getTableData(this.listQuery);
      this.$refs.formPage.doQuery();

    },
    created(){
      console.log("created")
      this.listQuery = {
        currentPage: 1,
        pageSize: 10//一页的条数
      };
      this.getTableData(this.listQuery);
    },
    filters: {
//      7200
      changeOwType: function (val) {
        if (val) {
          val.toString();
        }
        return ENUMS['7200'][val];
      },
      changeowStatus: function (val) {
        if (val) {
          val.toString();
        }
        return ENUMS['7010'][val];
      },
//      7220
      changeFreightForwarder(val){
        if (val) {
          val.toString();
        }
        return ENUMS['7220'][val];
      },
      ow:function (val) {
        if (val) {
          val.toString();
        }
        return ENUMS['7200'][val];
      },
    },
    methods: {
      handleCommand(command){
        if (command == 'qingguan') {
          let data = this.toQingData;
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'edit',
              params: {data}
            }
          });
        } else if (command == 'daogang') {
          let data = this.toPortData;
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'edit',
              params: {data}
            }
          });
        }
      },
      handleSelectionChange(row)
      {
        let vm = this;
        vm.dataForChange = row;
        vm.getRowData = row;
      }
      ,
      handleRowClick(row)
      {
        this.getRowData = row;
//        console.log("表格点击 handleRowClick", row)
      }
      ,
      //分页
      handleSizeChange(val)
      {
//        this.$refs.formPage.doClean();
        this.listQuery.pageSize = val;
        if (this.list.length >= 10) {
//          this.getTableData(this.listQuery);
          this.$refs.formPage.doQuery();
        }
//        console.log(val, "handleSizeChange=>val")
      }
      ,
      handleCurrentChange(val)
      {
        this.listQuery.currentPage = val;
//        this.getTableData(this.listQuery);
        this.$refs.formPage.doQuery();
//        console.log('val=>handleCurrentChange', this.listQuery);
      }
      ,
      //创建--修改--查询
      establish(text, data)
      {
        if (text == 'add') {
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'add'
            }
          });
        } else if (text == 'edit') {
          let noData = '';
          if (this.getRowData.length) {
            noData = this.getRowData[0].owId
          } else {
            noData = this.getRowData.owId
          }
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'edit',
              params: {owId: noData}
            }
          });
        } else if (text == 'detail') {
          this.$store.dispatch('toggleCurrentView', {
            TrackingManage: {
              view: 'look',
              params: {owId: data.owId}
            }
          });
        }
      }
      ,
      //双击查看
      wentToDetailPage(row)
      {
        this.establish('detail', row);
      }
      ,
      //查询
      getTableData(data,type)
      {
        var [vm,page] = [this,1];
        console.log(Object.getOwnPropertyNames(data).length,"对象值个数");
        delete data.supplyName;
//        data.pageSize = vm.listQuery.pageSize;
        data.needCount = true;
//        data.currentPage = vm.listQuery.currentPage;
        vm.loading = true;
        doQueryWithPage(data).then(response => {
          vm.loading = false;
          if (response.data.status == '1') {
            var allData = response.data.data.datalist;
            vm.list = [];
            if (allData.length > 0) {
              allData.forEach((o, i) => {
                vm.list.push({
                  'owNo': o.owNo,
                  'billNo': o.billNo,
                  'owType': o.owType,
                  'invoiceNo': o.invoiceNo,
                  'manageSubName': o.manageSubName,
                  'supplierName': o.supplierName,
                  'arrivePortName': o.arrivePortName,
                  'expectPayRateDate': o.expectPayRateDate,
                  'freeDay': o.freeDay,
                  'arriveSendDate': o.arriveSendDate,
                  'freightForwarder': o.freightForwarder,
                  'createdBy': o.createdBy,
                  'createdTime': o.createdTime,
                  'updatedBy': o.updatedBy,
                  'updatedTime': o.updatedTime,
                  'postPersonName': o.postPersonName,
                  'postDate': o.postDate,
                  'owId': o.owId,
                  'bizOrgName': o.bizOrgName,
                  'owStatus': o.owStatus,
                  'version': o.version,
                });
              });
            } else {
              vm.list = [];
            }
            this.total = response.data.data.items;
          }
        })
      },
      doCleanPage(){
        this.listQuery.pageSize=10;
        this.listQuery.currentPage=1;
      },
      doDetel()
      {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doDeleteOw(this.doDeleteDataFor).then(response => {
//            this.getTableData(this.listQuery);
            this.$refs.formPage.doQuery();
            if (response.data.status == '1') {
              this.$notify({
                type: 'success',
                message: '删除成功'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      ,
      //过账
      doPosting()
      {
        this.$confirm('确定要过账?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doPosting(this.doPostOffFor).then(response => {
//            this.getTableData(this.listQuery);
            this.$refs.formPage.doQuery();
            if (response.data.status == '1') {
              this.$notify({
                type: 'success',
                message: '过账成功'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消过账'
          });
        });
      },
      //冲销
      writeOff(){
        this.$confirm('您确定要冲销么', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doReversal(this.dowriteOffFor).then(response => {
//            this.getTableData(this.listQuery);
            this.$refs.formPage.doQuery();
            if (response.data.status == '1') {
              this.$notify({
                type: 'success',
                message: '冲销成功'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冲销'
          });
        });
      },
    },
  }
  //TODO 包装方式
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .pagination {
    margin-top: 15px;
  }
  .btn {
    margin: 15px auto;
  }
</style>

