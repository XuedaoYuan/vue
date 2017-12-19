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
          <el-form ref="form" label-width="100px" :model="tempAll">
            <el-row :gutter="20">
              <el-col :span="8">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <el-input v-model="tempAll.manageSubName" size="mini"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请单号" prop="payApplyId">
                  <el-input v-model="tempAll.payApplyId" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="起运港" prop="portName">
                  <el-input v-model="tempAll.portName" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="目的港" prop="name">
                  <el-select v-model="tempAll.arrivePortName" size="mini" clearable placeholder="请选择">
                    <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="币别" prop="name">
                  <el-select v-model="tempAll.currencyCode" size="mini" clearable placeholder="请选择">
                    <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请日期" prop="name">
                  <el-date-picker v-model="tempAll.value3" type="daterange" start-placeholder="开始日期" :picker-options="pickerOptions" end-placeholder="结束日期" size="mini" >
                    </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="信用证性质" prop="name">
                  <el-select v-model="tempAll.formCredit" size="mini" clearable placeholder="请选择">
                    <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="信用证类别" prop="name">
                  <el-select v-model="tempAll.creditClass" size="mini" clearable placeholder="请选择">
                    <el-option v-for="item in port" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请人" prop="name">
                  <el-input v-model="tempAll.proposer" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>

    </div>
    <div class="btn" style="margin-bottom: 15px">
      <el-button type="warning" size="mini" @click.native="onClickAdd">创建</el-button>
      <el-button type="warning" size="mini" @click.native="onClickEdit">修改</el-button>
      <el-button type="warning" size="mini">过账</el-button>
      <el-button type="warning" size="mini" @click="onClickDel">删除</el-button>
      <!-- <el-button type="warning" size="mini" @click.native="onClickDetail">查询1</el-button> -->
      <el-button type="warning" size="mini">提交ERP</el-button>
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
            <el-option v-for="item in options" :key="item.value" size="mini" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'date'">
          <el-date-picker v-model="list[scope.index]['date']" size="mini" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <div v-if="scope.text == 'input'">
          <el-input v-model="list[scope.index]['input']" size="mini"></el-input>
        </div>
      </template>
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
  import {pickerOptions} from '@/util'
  const headers = [
    { prop: 'checkbox', width: 100, type: 'selection'},
    { type: 'index', label: '行号',width:'60px',align:'center'},
    { prop: 'name', label: '申请单号' ,align:'center'},
    { prop: 'name', label: '经营主体' ,editable: true},
    { prop: 'date', transform:{date: true}, label: '申请日期', template: 'date'},
    { prop: 'name', label: '申请人' },
    { prop: 'name', label: '开证金额' },
    { prop: 'name', label: '信用证类别' },
    { prop: 'name', label: '币别' },
    { prop: 'name', label: '起运港' },
    { prop: 'name', label: '目的港' },
    { prop: 'name', label: '信用证性质' },
  ];
  const baseList = [{
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
  }];
  export default {
    data(){
      return {
        searchBarFlg: true,
        value4:'',
        selectList:[],
        listQuery:{
          pageSize:1,
          currentPage:2
        },
        tempAll:{

        },
        pickerOptions: {
            shortcuts: pickerOptions
        },
        total:100,
        manageSubCode:'',//经营主体code
        manageSubId:'',//经营主体id
        manageSubName:'',//经营主体name
        payApplyId:'330681',//申请单号
        portId:'哦哦',//起运港id
        portName:'哦哦',//起运港name
        portCode:'哦哦',//起运港code
        arrivePortId:'哦哦',//目的港id
        arrivePortName:'哦哦',//目的港name
        arrivePortCode:'哦哦',//目的港code
        currencyCode:'币别',//币别code
        currencyName:'币别',//币别name
        currencyId:'币别',//币别id
        date1:'1',
        date2:'2',
        formCredit:'信用证性质',//信用证性质
        creditClass:'信用证类别',//信用证类别
        proposer:'申请人',//申请人
        port:[{
          value:'0',
          label:'杭州'
        },{
          value:'1',
          label:'诸暨'
        }],
        form: {
          name: "",
          date1: '',
          date2: '',
          region: '',
        },
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
        headers: headers,
        list: baseList
      }
    },
    methods:{
      rest(){
        this.manageSubName=''
        this.payApplyId=''
        this.portName=''
        this.arrivePortName=''
        this.arrivePortName=''
        this.currencyName=''
        this.currencyCode=''
        this.formCredit=''
        this.creditClass=''
        this.proposer=''
      },
      handleCellClick(row, column, cell) {
//        this.show = true;
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
        this.selectList=row;
      },
      //分页
      handleSizeChange(val){
        console.log('size',val)
      },
      handleCurrentChange(val){
        console.log('current',val)
      },
      onClickAdd() {
        this.$router.push({ params: { type: 'add' } });
//        console.log(this.$route);
//        console.log(router);
      },
      onClickEdit() {
        if(this.selectList.length == 1){
        this.$router.push({ params: { type: 'edit' } ,query:{selectList:this.selectList}});
        } else{
          this.$notify({
            title: '警告',
            message: '请选择一行进行修改',
            type: 'error'
          });
        }
      },
      onClickDetail() {
        if(this.selectList.length == 1){
          this.$router.push({ params: { type: 'detail' } ,query:{selectList:this.selectList}});
        } else{
          this.$notify({
            title: '警告',
            message: '请选择一行进行查看',
            type: 'error'
          });
        }
//        this.$router.push({ params: { type: 'detail' } });
      },
      onClickDel() {
        if(this.selectList.length<1){
          this.$notify({
            title: '警告',
            message: '请选择一行或多行进行删除',
            type: 'error'
          });
        }else {
          this.selectList.forEach((x,i) => {
            let idx = this.list.findIndex((val) => val == x);
            idx>-1 && this.list.splice(idx, 1);
          });
        }
//        for (var i = 0; i < this.list.length; i++) {
//          for (var j = 0; j < this.selectList.length; j++) {
//            if (this.selectList[j] == this.list[i]) {
//              this.list.splice(i, 1);
//              i--;
//            }
//          }
//        }
      }
    },
    watch: {
//      show(val) {
//        if (val) {
//          this.$nextTick(() => {
//            $('.test input').blur(() => {
//              this.show = false;
//            })
//          })
//
//        }
//      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*.label{*/
    /*text-align: right;*/
    /*vertical-align: middle;*/
    /*font-size: 14px;*/
    /*color: #5a5e66;*/
    /*line-height: 40px;*/
    /*padding-left: 10px;*/
    /*-webkit-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
  /*}*/
  /*.el-form-item {*/
    /*margin-bottom: 0;*/
  /*}*/
  /*#moneyCredit .el-col{*/
    /*height: inherit !important;*/
  /*}*/
</style>
