<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
      <el-button type="primary" icon="el-icon-search" size="small">重置</el-button>
      <el-form ref="form" label-width="100px" :model="tempAll">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="公司" prop="name">
              <el-col :span="10">
                <el-form-item prop="date1">
                  <el-input v-model="tempAll.name" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-form-item prop="date2">
                  <el-input v-model="tempAll.name" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="部门" prop="name">
              <el-col :span="10">
                <el-form-item prop="date1">
                  <el-input v-model="tempAll.name" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-form-item prop="date2">
                  <el-input v-model="tempAll.name" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供应商" prop="name">
              <el-col :span="10">
                <el-form-item prop="date1">
                  <el-input v-model="tempAll.name" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="10">
                <el-form-item prop="date2">
                  <el-input v-model="tempAll.name" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购合同号" prop="name">
              <el-col :span="22">
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="品名" prop="name">
              <el-col :span="22">
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发货时间" prop="name">
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
              <!--<el-col :span="22">-->
                <!--<el-date-picker-->
                  <!--v-model="dataPickValue"-->
                  <!--type="daterange"-->
                  <!--range-separator="至"-->
                  <!--size="mini"-->
                  <!--start-placeholder="开始日期"-->
                  <!--end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
              <!--</el-col>-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="原目的地" prop="name">
              <el-col :span="22">
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变更目的地" prop="name">
              <el-col :span="22">
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="预计到达日" prop="name">
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
            <el-form-item label="物流公司" prop="name">
              <el-col :span="22">
                <el-select style="width: 100%;" v-model="tempAll.region" placeholder="请选择活动区域" size="mini">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号" prop="name">
              <el-col :span="22">
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="驾驶员" prop="name">
              <el-col :span="22">
                <el-input v-model="tempAll.name" size="mini"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="货物状态" prop="name">
              <el-col :span="22">
                <el-select style="width: 100%;" v-model="tempAll.region" placeholder="请选择活动区域" size="mini">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="commonTable">
      <common-table
        :data="list"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @cell-click="handleCellClick"
        @selection-change="handleSelectionChange"
      >
        <template slot-scope="scope">
          <div v-if="scope.text == 'select'">
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </common-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
  const headers = [
    { type: 'selection', width: '55px'},
    {prop: 'index', type: 'index', label: '序号', fixed: "left"},
    {prop: 'date', label: '公司', template: 'date', editable: false},
    {prop: 'name', label: '部门', template: 'input', template: 'select'},
    {prop: 'address', label: '供应商'},
    {prop: 'address', label: '采购部门'},
    {prop: 'address', label: '名称'},
    {prop: 'address', label: '批号'},
    {prop: 'address', label: '净重kg'},
    {prop: 'address', label: '公重kg'},
    {prop: 'address', label: '件数'},
    {prop: 'address', label: '包重'},
    {prop: 'address', label: '运输方式'},
    {prop: 'address', label: '发货日'},
    {prop: 'address', label: '预计到达日'},
    {prop: 'address', label: '原目的地'},
    {prop: 'address', label: '变更目的地'},
    {prop: 'address', label: '物流公司'},
    {prop: 'address', label: '车牌号'},
    {prop: 'address', label: '驾驶员'},
    {prop: 'address', label: '联系电话'},
    {prop: 'address', label: '货物状态'},
    {prop: 'address', label: '直发数量kg'},
    {prop: 'address', label: '入库数量kg'},
  ];
  const baseList = [{
    date: '2016-05-03',
    name: '王小虎',
    index: '0',
    address: '王府井'
  }, {
    date: '2016-05-02',
    name: '王小虎',
    index: '1',
    address: '唐人街'
  }];

  export default {
    data(){
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        tempAll: {
          name: "",
          date1: '',
          date2: '',
          region: '',
        },
        dataPickValue:'',
        currentPage:2,
        headers: headers,
        list: baseList,
        value4: ''
      }
    },
    methods: {
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
          console.log("表格点击",row)
      },
      //分页
      handleSizeChange(val){
        console.log(val,"handleSizeChange=>val")
      },
      handleCurrentChange(val){
        console.log('val=>handleCurrentChange',val)
      },
    },
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .pagination{
    margin-top: 15px;
  }
</style>
