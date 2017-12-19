<template>
  <div class>
    <el-select v-model="searchForm.name" filterable remote size="mini" class="common-search-select" reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer" placeholder="请输入关键词" :remote-method="remoteMethod" @focus="chooseItem" :loading="loading" :disabled="disabled" collapse-tags>
      <el-option v-for="item in options" :key="item.companyId" :label="item.companyName" :value="item.companyId">
        <el-row :gutter="20" style=" margin: 0;">
          <el-col :span="6" class="cell" style="margin: 0;">{{ item.companyName }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <!--  <i slot="suffix" class="el-input__icon  el-icon-search" @click="showMainInfoDialog"></i> -->
    <div class="searchDialogOpen"  @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <managementSubjectDialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></managementSubjectDialog>
  </div>
</template>
<script>
import managementSubjectDialog from 'components/common-dialog/management-subject.vue';
import { doQueryWithPage } from '@/api/common-select/management-subject'
export default {
  props: {
    querySelect: {type:String,default: undefined},
    disabled: {type:Boolean,default: false},
  },
  components: {
    managementSubjectDialog
  },
  data() {
    return {
      searchForm: {
        name: ''
      },
      searchTexts: {
        companyName: '', //公司名称
      },
      listQuery: {
        pageSize: 20,
        currentPage: 1,
      },
      selectItem: null,
      list: [],
      loading: false,
      options: new Array,
      mainInfoDialogFormVisible: false, //经营主体
    }
  },
  created(){
    this.searchForm.name = this.querySelect;
  },
  // activated(){
  //   this.searchForm.name = this.querySelect;
  //   console.log(this.searchForm.name);
  // },
  // mounted(){
  //   console.log(1121);
  //   this.searchForm.name = this.querySelect;
  //   console.log(this.searchForm.name);
  //  },
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
          return item.companyName.toLowerCase().indexOf(this.searchTexts.companyName.toLowerCase()) !== -1
        });
      } else {
        this.options = new Array();
      }
    },
    chooseItemChange() {
      if (this.options.length > 0) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].companyId == this.searchForm.name) {
            this.selectItem = this.options[i];
          }
        }
      } else {
        this.selectItem = "";
      }
      this.searchTexts.companyName = '';
      this.$emit('childevent', this.selectItem);
    },
    chooseItem() {
      // doQueryWithPage(this.searchTexts,this.listQuery).then(response=> {
      //     if(response.data.status == 1){
      //         this.list = response.data.data.datalist;
      //         this.setOptions(this.list);
      //     }
      // })
    },
    remoteMethod(query) {
      if (query) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.searchTexts.companyName = query;
          doQueryWithPage(this.searchTexts, this.listQuery).then(response => {
            if (response.data.status == 1) {
              this.list = response.data.data.datalist;
              this.setOptions(this.list);
              if (this.options && this.options.length == 1 && this.options[0].companyName == query) {
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
      this.searchForm.name = item.companyName;
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
    watch:{
        querySelect:function(val){
            this.searchForm.name = val;
        }
    }

}

</script>
<style>

</style>





