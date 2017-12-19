<template>
  <div>
    <el-select style="float:left;" v-model="searchForm.name" filterable remote size="mini" class="common-search-select" reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer" placeholder="请输入关键词" :remote-method="remoteMethod" @focus="chooseItem" :loading="loading" :disabled="disabled" collapse-tags>
      <el-option v-for="item in options" :key="item.goodsCode" :label="item.goodsName" :value="item.goodsCode">
        <el-row :gutter="20" style=" margin: 0;">
          <el-col :span="6" class="cell" style="margin: 0;">{{ item.goodsName }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <!--  <i slot="suffix" class="el-input__icon  el-icon-search" @click="showMainInfoDialog"></i> -->
    <div class="searchDialogOpen"  @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <!--<goods-dialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></goods-dialog>-->
    <received-line-dialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></received-line-dialog>
    <!-- <managementSubjectDialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></managementSubjectDialog> -->
  </div>
</template>
<script>
  import receivedLineDialog from '../../components/common-dialog/received-line-dialog.vue';
  import { doQueryWithPage } from '@/api/common-select/goods-select.js'
  export default {
    props: {
      querySelect: {type:String,default: undefined},
      disabled: {type:Boolean,default: false},
    },
    components: {
      receivedLineDialog
    },
    data() {
      return {
        searchForm: {
          name: ''
        },
        searchTexts: {
          goodsName: '', //c仓库名称
        },
        listQuery: {
          pageSize: 20,
          currentPage: 1,
        },
        selectItem: null,
        list: [],
        loading: false,
        options: new Array,
        mainInfoDialogFormVisible: false, //
      }
    },
    created(){
      this.searchForm.name = this.querySelect;
    },
    watch:{
      querySelect:function(val){
        this.searchForm.name = val;
      }
    },
    /*  activated(){
        this.searchForm.name = this.querySelect;
      },
      mounted(){
        console.log(1121);
        this.searchForm.name = this.querySelect;
      },*/
    methods: {
      // 弹框部分
      showMainInfoDialog() {
        if (!this.disabled) {
          this.mainInfoDialogFormVisible = true;
        }
      },
      closeMainInfoDialog() {
        this.mainInfoDialogFormVisible = false;
      },
      setMainInfoDialog(val) {
        if (val) {
          console.log('table组件的值',val)
          this.handleSelect(val);
        } else {
          this.clearCustomer();
        }
        this.mainInfoDialogFormVisible = false;
      },
      // 放大镜部分
      setOptions(list) {
        if (list) {
          this.options = list.filter(item => {
            return item.goodsName.toLowerCase().indexOf(this.searchTexts.goodsName.toLowerCase()) !== -1
          });
        } else {
          this.options = new Array();
        }
      },
      chooseItemChange() {
        if (this.options.length > 0) {
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].goodsCode == this.searchForm.name) {
              this.selectItem = this.options[i];
            }
          }
        } else {
          this.selectItem = "";
        }
        this.searchTexts.goodsName = '';
        this.$emit('childevent', this.selectItem);
      },
      chooseItem() {
        /*doQueryWithPage(this.searchTexts,this.listQuery).then(response=> {
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
            this.searchTexts.goodsName = query;
            doQueryWithPage(this.searchTexts, this.listQuery).then(response => {
              if (response.data.status == 1) {
                this.list = response.data.data.datalist;
                this.setOptions(this.list);
                if (this.options && this.options.length == 1 && this.options[0].goodsName == query) {
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

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      handleSelect(item) {
//        this.searchForm.name = item.goodsName;
        // 选中传出的值
        this.$emit('childevent', item);
      },
      clearCustomer() {
        this.searchForm.name = '';
        this.options = new Array;
        this.chooseItemChange();
      },
      loadAll() {
        return [
          { "companyId": "1", "companyName": "长宁区新渔路144号" },
          { "companyId": "2", "companyName": "上海市长宁区淞虹路661号" },
          { "companyId": "3", "companyName": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "companyId": "4", "companyName": "天山西路438号" },
          { "companyId": "5", "companyName": "长宁区新渔路144号" },
          { "companyId": "6", "companyName": "上海市长宁区淞虹路661号" },
          { "companyId": "7", "companyName": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "companyId": "8", "companyName": "天山西路438号" },
          { "companyId": "9", "companyName": "长宁区新渔路144号" },
          { "companyId": "10", "companyName": "上海市长宁区淞虹路661号" },
          { "companyId": "11", "companyName": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "companyId": "12", "companyName": "天山西路438号" },
        ];
      },
    },

  }

</script>
<style>

  .el-form-item__content {
    line-height: normal !important;
    margin-top: 3px;
  }


</style>





