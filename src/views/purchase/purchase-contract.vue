<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
      <el-button type="primary" icon="el-icon-search" size="small">重置</el-button>
      <el-form ref="form" label-width="100px" :model="tempAll">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="经营主体" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务员" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="活动时间" prop="name">
              <el-col :span="10">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="tempAll.date1"
                                  style="width: 100%;" size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-form-item prop="date2">
                  <el-date-picker type="date" placeholder="选择日期" v-model="tempAll.date1"
                                  style="width: 100%;" size="mini"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同状态" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购合同编号" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购合同流水" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="贸易地区" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="交货期限" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运输方式" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
              <!--<el-select v-model="tempAll.region" placeholder="请选择活动区域" size="small">-->
                <!--<el-option label="区域一" value="shanghai"></el-option>-->
                <!--<el-option label="区域二" value="beijing"></el-option>-->
              <!--</el-select>-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款方式" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="提货方式" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计重标准" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="QA采购审批" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="QA审批标题" prop="name">
              <el-input v-model="tempAll.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="warning" size="mini">创建</el-button>
      <el-button type="warning" size="mini">更改</el-button>
      <el-button type="warning" size="mini">查看</el-button>
      <el-button type="warning" size="mini">删除</el-button>
      <el-button type="warning" size="mini">操作</el-button>
      <el-button type="warning" size="mini">审批</el-button>
      <el-button type="warning" size="mini" plain>导入</el-button>
      <el-button type="warning" size="mini" plain>导出</el-button>
      <el-button type="warning" size="mini" plain>审批信息查询</el-button>
      <el-button type="warning" size="mini" plain>模板下载</el-button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return {
        title: 'order2!',
        tempAll: {
          name: "",
          date1: '',
          date2: '',
          region: '',
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      }
    }
  }

</script>
