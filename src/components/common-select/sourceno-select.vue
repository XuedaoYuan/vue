<template>
  <div class>
    <el-select style="float:left;" v-model="searchForm.poGrNo" filterable remote size="mini" class="common-search-select" reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer" placeholder="请输入关键词" :remote-method="remoteMethod" @focus="chooseItem" :loading="loading" :disabled="disabled" collapse-tags>
      <el-option v-for="item in options" :key="item.poGrNo" :label="item.poGrNo" :value="item.poGrNo">
        <el-row :gutter="20" style=" margin: 0;">
          <el-col :span="6" class="cell" style="margin: 0;">{{ item.poGrNo }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <!--  <i slot="suffix" class="el-input__icon  el-icon-search" @click="showMainInfoDialog"></i> -->
    <div class="searchDialogOpen" @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <sourceno-dialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></sourceno-dialog>
    <!-- <managementSubjectDialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></managementSubjectDialog> -->
  </div>
</template>
<script>
import sourcenoDialog from '../../components/common-dialog/sourceno-dialog.vue';
import { doQueryWithPage } from '@/api/common-select/sourceno-select'
export default {
  props: {
    querySelect: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  components: {
    sourcenoDialog
  },
  data() {
    return {
      searchForm: {
        poGrNo: ''
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
  created() {
    this.searchForm.name = this.querySelect;
  },
  // activated(){
  //   this.searchForm.name = this.querySelect;
  // },
  /*
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
          if (this.options[i].poGrNo == this.searchForm.poGrNo) {
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
      var vm = this;
      if (query) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.searchTexts.poGrNo = query;
          doQueryWithPage(this.searchTexts, this.listQuery).then(response => {
            if (response.data.status == 1) {
              this.list = response.data.data.datalist;
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
      this.searchForm.poGrNo = item.poGrNo;
      // 选中传出的值
      this.$emit('childevent', item);
    },
    clearCustomer() {
      this.searchForm.poGrNo = '';
      this.options = new Array;
      this.chooseItemChange();
    }
  },
  watch: {
    querySelect(val) {
      this.searchForm.poGrNo = val;
    }
  }

}

</script>
<style>
.el-form-item__content {
  line-height: normal !important;
  margin-top: 3px;
}

</style>
