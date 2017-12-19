<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="small" @click="Search">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down"
                     @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up"
                     @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="Reset">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="80px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="经营主体" prop="manageSubName">
                  <management-subject @childevent="childEventHandlerMainInfo"
                                      :querySelect="formData.manageSubName"></management-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="部门" prop="bizOrgName">
                  <department-subject @childevent="bizOrgNameFill"
                                      :querySelect="formData.bizOrgName"></department-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" prop="nsStatus">
                  <el-select clearable v-model="formData.nsStatus" placeholder="请选择" size="mini">
                    <el-option v-for="(value,key) in nsStatus" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调整单编号" prop="nsNo">
                  <el-input v-model="formData.nsNo" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="仓库" prop="warehouseName">
                  <warehouse-subject @childevent="warehouseNameFill"
                                     :querySelect="formData.warehouseName"></warehouse-subject>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建日期" prop="createdTime">
                  <el-date-picker v-model="createdTime" type="daterange" start-placeholder="开始日期"
                                  :picker-options="pickerOptions" end-placeholder="结束日期" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="createdBy">
                  <el-input v-model="formData.createdBy" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改日期" prop="updatedTime">
                  <el-date-picker v-model="updatedTime" type="daterange" start-placeholder="开始日期"
                                  :picker-options="pickerOptions" end-placeholder="结束日期" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="修改人" prop="updatedBy">
                  <el-input v-model="formData.updatedBy" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账日期" prop="postDate">
                  <el-date-picker v-model="postDate" type="daterange" start-placeholder="开始日期"
                                  :picker-options="pickerOptions" end-placeholder="结束日期" size="mini">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="过账人" prop="postPersonName">
                  <el-input v-model="formData.postPersonName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调整类型" prop="nsType">
                  <el-select clearable v-model="formData.nsType" placeholder="请选择" size="mini">
                    <el-option v-for="(value,key) in nsType" :key="key" :label="value" :value="key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom:10px">
      <el-button type="warning" size="mini" @click.native="AddClick">创建</el-button>
      <el-button type="warning" size="mini" @click.native="EditClick" :disabled="editStatus">修改</el-button>
      <el-button type="warning" size="mini" @click="Posting" :disabled="postBtnStatus">过账</el-button>
      <el-button type="warning" size="mini" @click.native="DeleteClick" :disabled="postBtnStatus">删除</el-button>
      <!--<el-button type="warning" size="mini" @click.native="LookClick" :disabled="showOrHide">查询</el-button>-->
      <el-button type="warning" size="mini" @click="WriteOff" :disabled="writeOffBtnStatus">取消过账</el-button>
    </div>
    <div class="table">
      <div class="commonTable">
        <common-table
          :data="list"
          :maxHeight="300"
          :fit="true"
          :headers="header1"
          v-loading.body="listLoading"
          @cell-click="handleCellClick"
          @row-db-click="handleDblclick"
          @selection-change="handleSelectionChange"
        >
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text == 'nsStatusFilter'">
              <span>{{list[scope.index]['nsStatus'] | nsStatusFilter}}</span>
            </div>
            <div v-if="scope.text == 'nsTypeFilter'">
              <span>{{list[scope.index]['nsType'] | nsTypeFilter}}</span>
            </div>
          </template>
        </common-table>
      </div>
      <div class="pagination">
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
    </div>
  </div>
</template>
<script type="text/javascript">
  import router from '@/router'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import WarehouseSubject from '@/components/common-select/warehouse-select.vue'//仓库
  import {pickerOptions} from '@/util'
  import {
    doQueryWithPage,
    doCancelPost,
    doPost,
    doDeleteList
  } from '../../../api/inventory/inventory-adjustment/inventory-adjustment'

  const header1 = [
    {type: 'selection', width: '55px'},
    {prop: 'nsNo', label: '调整单编号', align: 'center'},
    {prop: 'warehouseName', label: '仓库', align: 'center'},
    {prop: 'manageSubName', label: '经营主体', align: 'center'},
    {prop: 'bizOrgName', label: '部门', align: 'center'},
    {prop: 'nsStatus', label: '状态', align: 'center', filter: 'nsStatusFilter'},
    {prop: 'nsType', label: '调整类型', align: 'center', filter: 'nsTypeFilter'},
    {prop: 'createdBy', label: '创建人', align: 'center'},
    {prop: 'createdTime', label: '创建日期', align: 'center', dataType: 'Date'},
    {prop: 'updatedBy', label: '修改人', align: 'center'},
    {prop: 'updatedTime', label: '修改日期', align: 'center', dataType: 'Date'},
    {prop: 'postPersonName', label: '过账人', align: 'center'},
    {prop: 'postDate', label: '过账日期', align: 'center', dataType: 'Date'}
  ];
  export default {
    components: {
      ManagementSubject, DepartmentSubject, WarehouseSubject
    },
    data () {
      return {
        //枚举
        nsStatus: ENUMS["7150"],//状态
        nsType: ENUMS["7355"],//调整类型

        formData: {
          manageSubName: '',//经营主体name
          bizOrgName: '',//部门name
          nsStatus: '',//状态
          nsNo: '',//调整单编号
          warehouseName: '',//仓库
          nsType: '',//调整类型
          postPersonName: '',//过账人
          createdBy: '',//创建人
          updatedBy: '',//修改人
          updatedTimeStart: '',//修改开始时间
          updatedTimeEnd: '',//修改结束时间
          createdTimeStart: '',//创建开始时间
          createdTimeEnd: '',//创建结束时间
          postDateStart: '',//过账开始时间
          postDateEnd: ''//过账结束时间
        },
        updatedTime: '',
        createdTime: '',
        postDate: '',
        pickerOptions: {
          shortcuts: pickerOptions
        },
        header1: header1,
        list: [],
        searchBarFlg: true,
        total: null,
        listQuery: {
          currentPage: 1,
          pageSize: 10
        },
        selectchange: '',
        showOrHide: true//按钮状态
      }
    },
    created () {
      this.getList();
    },
    activated () {
      this.getList();
    },
    filters: {
      nsStatusFilter (val) {
        return ENUMS["7150"][val];
      },
      nsTypeFilter (val) {
        return ENUMS["7355"][val];
      }
    },
    methods: {
      getList () {
        if (this.updatedTime) {
          this.formData.updatedTimeStart = this.updatedTime[0].parseTime('YYYY-MM-DD');
          this.formData.updatedTimeEnd = this.updatedTime[1].parseTime('YYYY-MM-DD');
        }
        if (this.createdTime) {
          this.formData.createdTimeStart = this.createdTime[0].parseTime('YYYY-MM-DD');
          this.formData.createdTimeEnd = this.createdTime[1].parseTime('YYYY-MM-DD');
        }
        if (this.postDate) {
          this.formData.postDateStart = this.postDate[0].parseTime('YYYY-MM-DD');
          this.formData.postDateEnd = this.postDate[1].parseTime('YYYY-MM-DD');
        }
        this.listLoading = true;
        let vm = this;
        doQueryWithPage(vm.listQuery, vm.formData).then(res => {
          if (res.data.status === 1) {
            this.list = res.data.data.datalist;
            this.total = res.data.data.items;
            this.listLoading = false;
          }
        })
      },
      //查询
      Search () {
        this.getList()
      },
      //Reset
      Reset () {
        this.formData = {
          manageSubName: "",
          bizOrgName: '',
          warehouseName: '',
          createdBy: '',
          updatedBy: '',
          postPersonName: '',
          nsType: ''
        }
        this.createdTime = '';
        this.updatedTime = '';
        this.postDate = '';
        this.getList();
      },
      //创建
      AddClick () {
        this.$store.dispatch('toggleCurrentView', {
          SalesInventory: {
            view: 'add'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      //修改
      EditClick () {
        if (this.selectchange.length == 1) {
          this.$store.dispatch('toggleCurrentView', {
            SalesInventory: {
              view: 'edit',
              params: {
                "nsId": this.selectchange[0].nsId
              }
            }
          });
        } else {
          this.$notify({
            title: '警告',
            message: '请选择一行进行修改',
            type: 'warning'
          });
        }
      },
      //查看
      LookClick () {
        if (this.selectchange.length == 1) {
          this.$store.dispatch('toggleCurrentView', {
            SalesInventory: {
              view: 'look',
              params: {
                "nsId": this.selectchange[0].nsId
              }
            }
          });
        } else {
          this.$notify({
            title: '警告',
            message: '请选择一行进行查看',
            type: 'warning'
          });
        }
      },
      //双击查看
      handleDblclick (row) {
        this.nsId = row.nsId;
        this.$store.dispatch('toggleCurrentView', {
          SalesInventory: {
            view: 'look',
            params: {
              "nsId": this.nsId
            }
          }
        });
      },
      //删除
      DeleteClick () {
        if (this.selectchange.length < 1) {
          this.$notify({
            title: '警告',
            message: '请选择一行或多行进行删除',
            type: 'warning'
          });
        } else {
          this.$confirm('确定删除?', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var rows = this.selectchange;
            var result = [];
            for (var i = 0, len = rows.length; i < len; i++) {
              var o = {};
              o.nsId = rows[i].nsId;
              o.version = rows[i].version;
              result.push(o);
            }
            console.log(result)
            doDeleteList(result).then(response => {
              if (response.data.status == 1) {
                this.$notify({
                  title: '成功',
                  message: '删除成功！',
                  type: 'success'
                });
                this.getList();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }
      },
      //过账
      Posting () {
        this.$confirm('您确认要过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var rows = this.selectchange;
          var result = [];
          for (var i = 0, len = rows.length; i < len; i++) {
            var o = {};
            o.nsId = rows[i].nsId;
            o.version = rows[i].version;
            result.push(o);
          }
          console.log(result)
          doPost(result).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '过账成功！',
                type: 'success'
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //取消过账
      WriteOff () {
        this.$confirm('您确认要取消过账吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var rows = this.selectchange;
          var result = [];
          for (var i = 0, len = rows.length; i < len; i++) {
            var o = {};
            o.nsId = rows[i].nsId;
            o.version = rows[i].version;
            result.push(o);
          }
          console.log(result)
          doCancelPost(result).then(response => {
            if (response.data.status == 1) {
              this.$notify({
                title: '成功',
                message: '取消成功！',
                type: 'success'
              });
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 经营主体
      childEventHandlerMainInfo (val) {
        if (val) {
          this.formData.manageSubName = val.companyName;
        } else {
          this.formData.manageSubName = '';
        }
      },
      //部门
      bizOrgNameFill (val) { // 部门
        if (val) {
          this.formData.bizOrgName = val.orgName;
        } else {
          this.formData.bizOrgName = '';
        }
      },
      //仓库
      warehouseNameFill (val) {
        if (val) {
          console.log(val)
          this.formData.warehouseName = val.warehouseName;
        } else {
          this.formData.warehouseName = '';
        }
      },
      //分页
      handleCellClick () {

      },
      handleSelectionChange (val) {
        this.selectchange = val;
        if (val.length == 1) {
          this.showOrHide = false;
        } else {
          this.showOrHide = true;
        }
      },
      handleSizeChange (val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange (val) {
        this.listQuery.currentPage = val;
        this.getList();
      }

    },
    computed: {
      editStatus () { //修改按钮状态
        let status = false;
        if (this.selectchange.length == 1) {
          this.selectchange.forEach((val, idx) => {
            if (val.nsStatus != '71500005') {
              status = true;
            }
          });
          return status;
        }
        return true;
      },
      postBtnStatus () { //过账按钮状态
        let status = false;
        if (this.selectchange.length > 0) {
          this.selectchange.forEach((val, idx) => {
            if (val.nsStatus != '71500005') {
              status = true;
            }
          });
          return status;
        }
        return true;
      },
      writeOffBtnStatus () { //冲销按钮状态
        let status = false;
        if (this.selectchange.length > 0) {
          this.selectchange.forEach((val, idx) => {
            if (val.nsStatus != '71500010') {
              status = true;
            }
          });
          return status;
        }
        return true;
      }
    }
  }
</script>
