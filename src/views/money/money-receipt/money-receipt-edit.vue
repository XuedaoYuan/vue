<template>
  <div class="allTemplate moneyReceiptAdd">
    <div class="info" style="margin-bottom: 15px">
        <el-button type="primary" size="small" @click="toSave">保存</el-button>
        <el-button type="primary" size="small" @click="toCancel">取消</el-button>
        <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = true">展开</el-button>
        <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = false">收起</el-button>
        <el-collapse-transition>
            <div v-show="searchBarFlg">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="收款单抬头" name="first">
                        <HeaderData></HeaderData>
                    </el-tab-pane>
                    <el-tab-pane label="应收票据信息" name="second">
                        <ReceivableBill></ReceivableBill>
                    </el-tab-pane>
                    <el-tab-pane label="系统信息" name="third">
                        <SystemInformation></SystemInformation>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-collapse-transition>
    </div>
    <div class="btn">
        <el-button type="warning" size="small">创建</el-button>
        <el-button type="warning" size="small" icon="el-icon-delete" plain>删除</el-button>
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
                <div v-if="scope.text == 'date'">
                    <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div v-if="scope.text == 'input'">
                    <el-input v-model="list[scope.index]['name']"></el-input>
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
<script type="text/javascript">
  import router from '@/router'
  import HeaderData from './money-receipt-add/header-data.vue'//抬头数据
  import ReceivableBill from './money-receipt-add/receivable-bill.vue'//应收票据信息
   import SystemInformation from './money-receipt-add/system-information.vue'//系统信息
  const headers = [
    { prop: 'checkbox', width: 80, type: 'selection'},
    { prop: 'lineNumber', width: 80, label: '行号'},
    { prop: 'name', label: '申请单号' ,width: 120},
    { prop: 'name', label: '收款单行号' ,width: 120},
    { prop: 'date', label: '部门',width: 120 },
    { prop: 'name', label: '部门描述',width: 120 },
    { prop: 'name', label: '收款类别',width: 120 },
    { prop: 'name', label: '收款金额',width: 120 },
    { prop: 'name', label: '收款金额本位币',width: 120 },
    { prop: 'name', label: '人民币金额',width: 120 },
    { prop: 'name', label: '外向交货单',width: 120 },
    { prop: 'name', label: '销售订单',width: 120 },
    { prop: 'name', label: '采购订单',width: 120 },
    { prop: 'name', label: '外销发票号',width: 120 },
    { prop: 'name', label: '外币扣费外行',width: 120 },
    { prop: 'name', label: '外币扣费收款行',width: 120 },
    { prop: 'name', label: '成本中心',width: 120 },
    { prop: 'name', label: '本币扣费',width: 120 },
    { prop: 'name', label: '款项内容',width: 120 },
    { prop: 'name', label: '备注',width: 120 },
    { prop: 'name', label: '认领标志',width: 120 },
    { prop: 'name', label: '认领日期',width: 120 },
    { prop: 'name', label: '发送SAP',width: 120 },
    { prop: 'name', label: '发送日期',width: 120 },
    { prop: 'name', label: '订单收款节点',width: 120 },
    { prop: 'name', label: '付账期节点',width: 120 },
    { prop: 'name', label: '账期名称' ,width: 120},
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
    components:{
        HeaderData,
        ReceivableBill,
        SystemInformation
    },
    props:{
      poInvoiceId:String
    },
    data(){
      return {
        activeName: 'first',
        listQuery:{
          pageSize:1,
          currentPage:2
        },
        total:100,
        searchBarFlg:true,
        manageSubCode:'',//经营主体code
        manageSubId:'',//经营主体id
        manageSubName:'',//经营主体name
        payApplyId:'330681',//申请单号
        portId:'',//起运港id
        portName:'',//起运港name
        portCode:'',//起运港code
        arrivePortId:'',//目的港id
        arrivePortName:'',//目的港name
        arrivePortCode:'',//目的港code
        currencyCode:'',//币别code
        currencyName:'',//币别name
        currencyId:'',//币别id
        date1:'1',
        date2:'2',
        formCredit:'',//信用证性质
        creditClass:'',//信用证类别
        proposer:'',//申请人
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
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleCellClick(row, column, cell) {
            console.log(row, column, cell);
        },
        handleSelectionChange(row){
            console.log("表格点击",row)
        },
        //分页
        handleSizeChange(val){

        },
        handleCurrentChange(val){

        },
        onClickAdd() {
         /*   router.push({ params: { type: 'add' } });
            console.log(this.$route);
            console.log(router);*/
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'add'
              // params: 跳转过去的子组件的属性对象
            }
          });
        },
        onClickEdit() {
//            router.push({ params: { type: 'edit' } });
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'edit'
              // params: 跳转过去的子组件的属性对象
            }
          });

        },
        onClickDetail() {
//            router.push({ params: { type: 'detail' } });
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'look'
              // params: 跳转过去的子组件的属性对象
            }
          });
        },
        onClickDel() {

        },
        toSave(){
//            this.$router.push({path: '/money/money-receipt/:type'});
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'index'
              // params: 跳转过去的子组件的属性对象
            }
          });
        },
        toCancel(){
//             this.$router.push({path: '/money/money-receipt/:type'});
          this.$store.dispatch('toggleCurrentView', {
            MoneyReceipt: {
              view: 'index'
              // params: 跳转过去的子组件的属性对象
            }
          });
        }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .moneyReceiptAdd .btn{
        padding:10px;
    }
</style>
