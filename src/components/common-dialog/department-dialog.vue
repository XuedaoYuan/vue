<template>
  <el-dialog title="部门选择" :visible.sync="showFlag" @close="closeDialog" :close-on-click-modal="false" v-drag class="drag-small">
    <el-form ref="form" label-width="120px" :model="tempAll" class="formStyle hundred-percent-input">
      <el-row>
        <el-col :span="6">
          <el-form-item label="所属公司代码：" prop="companyCode">
            <el-input size="mini" :disabled="showFlagBtn" placeholder="请输入" v-model="tempAll.companyCode" @keyup.enter.native="getList"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属公司：" prop="companyName">
            <el-input size="mini" :disabled="showFlagBtn

" placeholder="请输入" v-model="tempAll.companyName" @keyup.enter.native="getList"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门代码：" prop="orgCode">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.orgCode" @keyup.enter.native="getList"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门名称：" prop="orgName">
            <el-input size="mini" placeholder="请输入" v-model="tempAll.orgName" @keyup.enter.native="getList"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">-->
          <!--<el-form-item label="对应OA部门编码：" prop="oaOrgCode">-->
            <!--<el-input size="mini" placeholder="请输入" v-model="tempAll.oaOrgCode"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="6">-->
          <!--<el-form-item label="对应OA部门：" prop="oaOrgName">-->
            <!--<el-input size="mini" placeholder="请输入" v-model="tempAll.oaOrgName"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="6">
          <el-form-item label="">
            <el-col :span="12">
              <el-button style='margin-left:-30px' type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
            </el-col>
            <el-col :span="12">
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetBtn">重置</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="gridData" border stripe fit highlight-current-row height="300" @row-click="handleRowClick" @row-dblclick="handleRowDblclick" style="width: 100%" v-loading.body="listLoading">
      <el-table-column prop="orgCode" label="部门代码" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="orgName" label="部门名称" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyCode" label="所属公司代码" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="companyName" label="所属公司" header-align="center" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="oaOrgCode" label="对应OA部门编码" header-align="center" show-overflow-tooltip></el-table-column>-->
      <!--<el-table-column prop="oaOrgName" label="对应OA部门" header-align="center" show-overflow-tooltip></el-table-column>-->
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10, 20, 30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="setItem" size="mini">确 定</el-button>
      <el-button @click="closeDialog" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { doQueryWithPage } from '@/api/common-select/department-select'
export default {
  props: {
    departmentFormVisible: Boolean,
    detailIndex: Number,
    querySelect: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      tempAll: {
        companyName: '',
        companyCode: '',
        companyShortName: '',
      },
      listLoading: false,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      selectRow: null,
      total: 10,
      gridData: [],
      showFlag: false,
      showFlagBtn: false,
    };
  },
  watch: {
    departmentFormVisible: function(val, oldVal) {
      this.showFlag = val;
      if (this.querySelect) {
        // 判断是不是先选经营主体再选公司，
        if (this.querySelect.boolToBtn) {
          this.showFlagBtn = this.querySelect.boolToBtn
        } else {
          this.showFlagBtn = false
        }
      }
      if (this.showFlag) {
        if (this.querySelect) {
          this.tempAll.companyName = this.querySelect.companyName;
          this.tempAll.companyCode = this.querySelect.companyCode;
          this.tempAll.companyId = this.querySelect.companyId;
        } else {
          this.tempAll.companyName = '';
          this.tempAll.companyCode = '';
          this.tempAll.companyId = '';
        }
        this.listQuery = {
          pageSize: 10,
          currentPage: 1
        }
        this.getList();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeItem');
    },
    setItem() {
      this.$emit('setItem', this.selectRow);
    },
    getList() {
      this.listLoading = true;

      doQueryWithPage(this.tempAll, this.listQuery).then(response => {
        if (response.data.status == 1) {
          this.gridData = response.data.data.datalist;
          this.total = response.data.data.items;
          this.listLoading = false;
        } else {
          this.listLoading = false;
        }
      })
    },
    resetBtn() {
      if (this.showFlagBtn) {
        this.tempAll = {};
        this.tempAll.companyId = this.querySelect.companyId;
        this.tempAll.companyName = this.querySelect.companyName;
        this.tempAll.companyCode = this.querySelect.companyCode;
      } else {
        this.tempAll = {
          companyName: '',
          companyCode: '',
          companyId: '',
          companyShortName: '',
        }
      }

      //            if(this.querySelect){
      //                this.tempAll.companyId = this.querySelect.companyId;
      //            }
      this.listQuery = {
        pageSize: 10,
        currentPage: 1
      }

      this.getList();
    },
    handleRowClick(row) {
      this.selectRow = row;
    },
    handleRowDblclick(row) {
      this.selectRow = row;
      this.setItem();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
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
