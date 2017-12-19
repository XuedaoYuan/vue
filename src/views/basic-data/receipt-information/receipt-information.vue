<template>
  <div id="moneyCredit" class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
      <el-button-group>
        <el-button type="primary" icon="el-icon-search" size="small" @click="toQuery">查询</el-button>
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
                  <el-form-item label="客户名称" prop="customerName">
                    <customer-select @childevent="childEventHandlerCustomer" :querySelect="formData.customerName"></customer-select>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom: 15px">
      <el-button type="warning" size="mini" @click.native="onClickAdd">创建</el-button>
      <el-button type="warning" size="mini" @click.native="onClickUpdate">修改</el-button>
      <!-- <el-button type="warning" size="mini" @click="onClickDel">删除</el-button> -->
    </div>
    <div class="commonTable">
      <common-table
        :data="tableData"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        v-loading.body="listLoading"
        @cell-click="handleCellClick"
        @selection-change="addressSelectionChange"
        style="margin-bottom: 15px;"
      >
        <template slot-scope="scope" slot="default">
          <div v-if="scope.text == 'radio'" class="tab-radio">
              <el-radio-group v-model="radio">
                  <el-radio :label="tableData[scope.index]['$index']"></el-radio>
              </el-radio-group>
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
    <div v-show="showDefault" style="margin-top:55px;">
      <common-table
        :data="defaultAddressData"
        :maxHeight="300"
        :fit="true"
        v-loading.body="listLoadingDetailed"
        :headers="defaultAddressHeader"
        @cell-click="addressCellClick"
        @selection-change="addressSelectionChange"
        style="margin-bottom: 15px;"
      >
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'isDefalut'">
            <el-checkbox :disabled="true" :checked="defaultAddressData[scope.index]['isDefalut']"></el-checkbox>
          </div>
        </template>
      </common-table>
    </div>
  </div>
</template>
<script>
import {
  doQueryWithPage,//查询接口
} from '@/api/basic-data/receipt-information/receipt-information';
import CustomerSelect from 'components/common-select/customer-select.vue' //客户
import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  const headers = [
    { prop: 'radio', label: '#', width: '55px',template: 'radio',fixed:'left',align:'center'},
    { prop: 'customerName', label: '客户' ,align:'center'},
    { prop: 'customerCode', label: '客户code' ,align:'center'},
  ];
  const defaultAddressHeader = [
    { prop: 'contacts', label: '收货人' ,align:'center',editable: true, width: '230px'},
    { prop: 'contactsPhone', label: '联系电话' ,align:'center',editable: true, width: '230px'},
    { prop: 'contactsAddress', label: '收货地址' ,align:'center',editable: true},
    { prop: 'isDefalut', label: '是否为默认地址' ,align:'center', width: '180px',filter:'isDefalut'},

  ];
  export default {
    components:{
      CustomerSelect,//客户
    },
    data(){
      return {
        searchBarFlg: true,
        selectList:[],
        formData:{
          customerName:'',//客户名称
          customerCode:'',//客户code
          customerId:'',//客户id
        },
        total:100,
        listQuery:{
          pageSize:10,
          currentPage:1
        },
        headers: headers,
        tableData: [],
        defaultAddressData:[],//默认地址列表
        defaultAddressHeader:defaultAddressHeader,//默认地址headers
        checked:[],
        index:null,
        defaultAddress:false,//是否显示地址
        defaultSelectList:[],//默认地址复选
        defaultData:[],//对应的默认地址
        isDefalut:false,
        showDialog:false,
        listLoading:false,
        listLoadingDetailed:false,
        getRowKeys(row) {
          return row.rgAddrId;
        },
        expands:[],
        showDefault:false,
        radio:null,
        updateId:null,//修改的id
      }
    },
    created(){
      this.getList();
    },
    activated(){
      // this.getList();
    },
    methods:{
      toQuery(){
        this.getList();
      },
      //重置
      rest(){
        this.formData.customerName = '';
        this.formData.customerCode = '';
        this.formData.customerId = '';
      },
      //创建
      onClickAdd() {
        this.$store.dispatch('toggleCurrentView',{
          ReceiptInformation: {
              view: 'add'
              // params: 跳转过去的子组件的属性对象
          }
        })
      },
      onClickUpdate(){
        if(this.updateId != null){
          this.$store.dispatch('toggleCurrentView',{
            ReceiptInformation: {
                view: 'edit',
                // params: 跳转过去的子组件的属性对象
                params:{
                  "updateId":this.updateId,
                }
            }
          })
        }

      },
      getList(){
        this.listLoading = true;
        doQueryWithPage(this.listQuery,this.formData).then( response => {
          if(response.data.status == 1){
            this.tableData = response.data.data.datalist;
            this.total = response.data.data.items;
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        }).catch(() => {
          this.listLoading = false;
        })
      },
      childEventHandlerCustomer(val){//客户
        if (val) {
          this.formData.customerName = val.custName;
          this.formData.customerCode = val.custCode;
          this.formData.customerId = val.custId;
        } else {
          this.formData.customerName = '';
          this.formData.customerCode = '';
          this.formData.customerId = '';
        }
      },
      //单击列表
      handleCellClick(row){
        this.radio = row.$index;
        this.updateId = row.customerId;
        if(this.radio >= 0){
          this.showDefault = true;
          this.formData.customerId = row.customerId;
          this.listLoadingDetailed = true;
          doQueryWithPage(this.listQuery,this.formData).then( response => {
            if(response.data.status == 1){
              this.defaultAddressData = response.data.data.datalist;
              this.defaultAddressData.forEach((o,i) => {
                if(o.isDefalut == 1){
                  console.log('x.isDefalut',o.isDefalut);
                  o.isDefalut = true;
                } else if (o.isDefalut == 0) {
                  console.log('x.isDefalut1',o.isDefalut);
                  o.isDefalut = false;
                }
              })
              this.listLoadingDetailed = false;
            } else {
              this.listLoadingDetailed = false;
            }
          }).catch(() => {
            this.listLoadingDetailed = false;
          })
        } else {
          this.showDefault = false;
        }
      },
      addressCellClick(){

      },
      addressSelectionChange(){

      },

      //分页
      handleSizeChange(val){
        console.log('size',val)
      },
      handleCurrentChange(val){
        console.log('current',val)
      },
    },
    watch: {}
  }

</script>
<style>
  #moneyCredit .tab-radio .el-radio__label{
    display:none;
  }
</style>
