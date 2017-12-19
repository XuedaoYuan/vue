<template>
  <div>
    <el-select
      v-model="tempAll.supplyName"
      class="common-search-select"
      filterable
      remote size="mini"
      reserve-keyword clearable  @clear="clearCustomer"
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      @change="chooseItemChange"
      @focus="chooseItem"
      :loading="loading"
      :disabled="disabled"
      collapse-tags>
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.supplyName"
        :value="item.id">
        <el-row :gutter="20" style=" margin: 0;border-bottom: 1px solid #dfe6ec;">
          <el-col :span="6" class="cell" style=" margin: 0;">{{ item.supplyName }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <div class="searchDialogOpen" @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <supplier :supplierShow="supplierShow" :querySelect="transferSearch" @rowDblclick="rowDblclic" @closeSupplier="closeSupplier"></supplier>
  </div>
</template>
<script>

  import supplier from 'components/common-dialog/supplier.vue';
  import {doQueryWithPage} from '@/api/common-select/supplier.js'
  export default {
    props: {
      querySelect: Object,
      selectName:String,
      disabled: {type:Boolean,default: false},
      transferSearch:{
          type:Object,default:undefined
      }
    },
    components: {
      supplier
    },
    data(){
      return {
        supplierShow: false,
        tempAll: {
          supplierId: '',
          supplierName:'',
          supplierCode:'',
          supplyName:'',
        },
        searchTexts: {
          supplierName: '',//供应商
        },
        listQuery: {
          pageSize: 20,
          currentPage: 1,
        },
        selectItem: null,
        list: [],
        loading: false,
        options: new Array,
      }
    },
    created(){
      console.log(this.transferSearch,"transferSearch");
//      if(this.selectName){
        this.tempAll.supplyName=this.selectName;
//      }
//      console.log(this.selectName,"selectName")
    },
    methods: {
      //测试
      rowDblclic(val){
//          console.log(val,'==============')
        this.tempAll.supplyCode = val.supplierCode;
        this.tempAll.supplyName = val.supplierName;
        this.tempAll.id = val.supplierId;
        //主页获取选中数据
        this.$emit('getData',this.tempAll)
      },
      closeSupplier(){
        this.supplierShow = false;
      },
      // 弹框部分
      showMainInfoDialog(){
        if(!this.disabled) {
          this.supplierShow = true;
        }
      },
      closeMainInfoDialog(){
        this.supplierShow = false;
      },
      setMainInfoDialog(val){
//        console.log(val);
        if (val) {
          this.handleSelect(val);
        } else {
          this.clearCustomer();
        }
        this.supplierShow = false;
      },
      // 放大镜部分
      setOptions(list){
          let vm=this;
        if (list) {
          this.options = list.filter(item => {
            return item.supplyName.toLowerCase().indexOf(this.searchTexts.supplierName.toLowerCase()) !== -1
          });
        } else {
          this.options = new Array();
        }
//        console.log('options',this.options)
      },
      chooseItemChange(){
        if (this.options.length > 0) {
//            console.log(this.options,"this.options")
//            console.log(this.tempAll,"this.tempAll")
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].id == this.tempAll.supplyName) {
              this.selectItem = this.options[i];
            }
          }
        } else {
          this.selectItem = "";
        }
        this.searchTexts.supplierName = '';
        this.$emit('childevent', this.selectItem);
        this.$emit('getData', this.selectItem);
//        console.log(this.selectItem,"selectItem")
      },
      chooseItem(){
        if(this.transferSearch){
            this.searchTexts.companyId = this.transferSearch.companyId;
        }else {
            this.searchTexts.companyId = '';
        }
        /*doQueryWithPage(this.listQuery,this.searchTexts).then(response=> {
          if(response.data.status == 1){
            this.list = response.data.data.datalist;
            this.setOptions(this.list);
          }
        })*/
      },
      remoteMethod(query) {
        if (query) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.searchTexts.supplierName = query;
//            获取下拉数据
            doQueryWithPage(this.listQuery,this.searchTexts).then(response => {
              if (response.data.status == 1) {
                this.list = response.data.data.datalist;
//                console.log(this.list,"list===>")
                this.setOptions(this.list);
                if (this.options && this.options.length == 1 && this.options[0].supplyName == query) {
                  this.$nextTick(() => {
                    this.selectItem = this.options[0];
                  });
                }
              }
            })
          }, 200);
        } else {
          this.options = new Array;
        }
      },

      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
//          console.log(item,"item=====")
        this.tempAll.supplyName = item.supplyName;
        // 选中传出的值
        // console.log(item);
        this.$emit('childevent', item);
        this.$emit('getData', item);
      },
      clearCustomer(){
        this.tempAll.supplyName = '';
        this.options = new Array;
        this.chooseItemChange();
      },
      loadAll() {
//          this.remoteMethod();
//          console.log(this.list,'this.list')
//        return [
//          {"supplierId": "1", "supplierName": "浙江竹开"},
//          {"supplierId": "2", "supplierName": "物产元通"},
//          {"supplierId": "3", "supplierName": "物产中大"},
//        ];
      },
      focusInfo(){
        this.restaurants = this.loadAll();
      },
    },
    watch:{
        selectName:function(val){
           this.tempAll.supplyName=this.selectName;
        }
    }

  }


</script>
<style>

  .el-form-item__content {
    line-height: normal !important;
    /*position: relative;*/
    /*font-size: 14px*/
    margin-top: 3px;
  }

</style>
