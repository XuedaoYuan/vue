<template>
  <div>
    <el-select style="float:left;" v-model="searchForm.name" filterable remote size="mini" class="common-search-select" reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer" placeholder="请输入关键词" :remote-method="remoteMethod" @focus="chooseItem" :loading="loading" :disabled="disabled" collapse-tags>
      <el-option v-for="item in options" :key="item.poGrNo" :label="item.poGrNo" :value="item.poGrNo">
        <el-row :gutter="20" style=" margin: 0;">
          <el-col :span="6" class="cell" style="margin: 0;">{{ item.poGrNo }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <div class="searchDialogOpen"  @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <!--<goods-dialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></goods-dialog>-->
    <received-dialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" :queryId="queryId" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></received-dialog>
    <!-- <managementSubjectDialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></managementSubjectDialog> -->
  </div>
</template>
<script>
  import receivedDialog from '../../components/common-dialog/received-dialog.vue';
  import { doQueryWithPage } from '@/api/common-select/goods-select.js'
  import { doQueryWithReceived } from '@/api/purchase/purchase-return/purchase-return.js'//

  export default {
    props: {
      querySelect: {type:String,default: undefined},
      disabled: {type:Boolean,default: false},
      queryId:String
//      manageSubId:{type:Number}
    },
    components: {
      receivedDialog
    },
    data() {
      return {
        tempAll:{
          poContractNo:'',
          poGrNo: '',
          poNo: '',
          supplierName: ''
        },
        searchForm: {
          name: ''
        },
        searchTexts: {
          poGrNo: '', //c仓库名称
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
          console.log('子组件的值',val)
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
            return item.poGrNo.toLowerCase().indexOf(this.searchTexts.poGrNo.toLowerCase()) !== -1
          });
        } else {
          this.options = new Array();
        }
      },
      chooseItemChange() {
        if (this.options.length > 0) {
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].poGrNo == this.searchForm.name) {
              this.selectItem = this.options[i];
            }
          }
        } else {
          this.selectItem = "";
        }
        this.searchTexts.poGrNo = '';
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
            this.searchTexts.poGrNo = query;
            doQueryWithReceived(this.tempAll,this.queryId,this.poGrStatus,this.listQuery).then(response => {
              if (response.data.status == 1) {
                this.list = response.data.data.datalist;
                console.log('this.list',this.list)
                this.setOptions(this.list);
                if (this.options && this.options.length == 1 && this.options[0].poGrNo == query) {
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
//        this.searchForm.name = item.poGrNo;
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





