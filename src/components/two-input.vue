<template>
  <div>
    <el-input v-model="tempAll.name" size="mini">
      <i @click="hanldeEmpty" slot="suffix" class="el-input__icon el-icon-circle-close-outline"></i>
      <i @click="hanldeSearch" slot="suffix" class="el-input__icon  el-icon-search"></i>
    </el-input>
    <el-dialog v-drag width="1000px" title="选择列表" :visible.sync="dialogTableVisible">
      <div class="searchForm">
        <el-row>
          <el-col :span="6">
            <div class="companyName companyNameLabel">公司代码:</div>
            <div class="companyName companyNameInput">
              <el-input size="mini" v-model="company.code" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="companyName companyNameLabel">公司名称:</div>
            <div class="companyName companyNameInput">
              <el-input size="mini" v-model="company.name" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="companyName companyNameLabel">公司简称:</div>
            <div class="companyName companyNameInput">
              <el-input size="mini" v-model="company.shortname" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button size="mini" type="primary" icon="el-icon-close" @click="onEmpty">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table max-height="300" border @row-dblclick="handleRowDblclick" :data="gridData">
        <el-table-column property="date" label="公司代码" width="333px"></el-table-column>
        <el-table-column property="name" label="公司名称" width="333px"></el-table-column>
        <el-table-column property="address" label="公司简介"></el-table-column>
      </el-table>
      <div class="pagination">
      	<el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="4000">
      </el-pagination>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import { doQueryWithPage } from '@/api/common-select/management-subject'
export default {
  props: {
    inputLabel: String,
    url: String, //根据URL获取数据来选择
  },
  data() {
    return {
      name: '',
      code: '',
      tempAll: {
        code: '',
        name: ''
      },
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄1'
      }, {
        date: '2016-05-04',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄2'
      }, {
        date: '2016-05-01',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄3'
      }, {
        date: '2016-05-03',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄4'
      }],
      company: {
        code: '',
        name: '',
        shortname: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      currentPage: 1
    }
  },
  methods: {
    hanldeSearch() {
      this.dialogTableVisible = true;
      // this.$emit('hanldeSearch');
    },
    handleRowDblclick(row, e) {
      console.log(row, e);
      this.tempAll.name = row.name;
      this.dialogTableVisible = false;
      this.$emit('childEvent', row);
    },
    hanldeEmpty() {
      this.tempAll.name = ''
    },
    onSubmit() {
      console.log(11);
    },
    onEmpty() {
      this.company = {
        code: '',
        name: '',
        shortname: ''
      }
    },
    handleCurrentChange(val){
    	console.log(val + 'page');
    	// ajax 拿取页面内容
    }
  },
  created() {

  },
  mounted() {
    // ajax
    // this.gridData = result
  }
}

</script>
<style scoped>
span {
  float: left;
}
.el-dialog__body {
  padding-top: 36px 20px;
}
.companyName {
  float: left;
}

.companyNameLabel {
  width: 30%;
}

.companyNameInput {
  width: 65%;
}

.searchForm {
  padding-bottom: 20px
}
.pagination {
	margin-top: 10px;
}

</style>
