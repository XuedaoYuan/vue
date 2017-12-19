<template>
  <div class>
    <el-select v-model="searchForm.name" filterable remote size="mini" class="common-search-select" reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer" placeholder="请输入关键词" :remote-method="remoteMethod" @focus="chooseItem" :loading="loading" :disabled="disabled" collapse-tags>
      <el-option v-for="item in options" :key="item.bsPtId" :label="item.bsPtName" :value="item.bsPtId">
        <el-row :gutter="20" style=" margin: 0;">
          <el-col :span="6" class="cell" style="margin: 0;">{{ item.bsPtName }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <div class="searchDialogOpen"  @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <portDialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></portDialog>
  </div>
</template>
<script>
import PortDialog from 'components/common-dialog/port-dialog.vue';
import { doQueryWithPage } from '@/api/common-select/management-subject'
export default {
  props: {
    querySelect: {type:String,default: undefined},
    disabled: {type:Boolean,default: false},
  },
  components: {
    PortDialog
  },
  data() {
    return {
      searchForm: {
        name: ''
      },
      searchTexts: {
        bsPtName: '', //港口名称
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
          return item.bsPtName.toLowerCase().indexOf(this.searchTexts.bsPtName.toLowerCase()) !== -1
        });
      } else {
        this.options = new Array();
      }
    },
    chooseItemChange() {
      if (this.options.length > 0) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].bsPtId == this.searchForm.name) {
            this.selectItem = this.options[i];
          }
        }
      } else {
        this.selectItem = "";
      }
      this.searchTexts.bsPtName = '';
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
          this.searchTexts.bsPtName = query;
          doQueryWithPage(this.searchTexts, this.listQuery).then(response => {
            if (response.data.status == 1) {
              this.list = response.data.data.datalist;
              this.setOptions(this.list);
              if (this.options && this.options.length == 1 && this.options[0].bsPtName == query) {
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
      this.searchForm.name = item.bsPtName;
      // 选中传出的值
      this.$emit('childevent', item);
    },
    clearCustomer() {
      this.searchForm.name = '';
      this.options = new Array;
      this.chooseItemChange();
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





