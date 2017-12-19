<template>
  <div>
    <el-select style="float:left;" v-model="searchForm.name" filterable remote size="mini" class="common-search-select" reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer" placeholder="请输入关键词" :remote-method="remoteMethod" @focus="chooseItem" :loading="loading" :disabled="disabled" collapse-tags>
      <el-option v-for="item in options" :key="item.unitCode" :label="item.unitName" :value="item.unitCode">
        <el-row :gutter="20" style=" margin: 0;">
          <el-col :span="6" class="cell" style="margin: 0;">{{ item.unitName }}</el-col>
        </el-row>
      </el-option>
    </el-select>
    <!--  <i slot="suffix" class="el-input__icon  el-icon-search" @click="showMainInfoDialog"></i> -->
    <div class="searchDialogOpen" @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
      <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
    </div>
    <unit-dialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></unit-dialog>
    <!-- <managementSubjectDialog :mainInfoDialogFormVisible="mainInfoDialogFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog"></managementSubjectDialog> -->
  </div>
</template>
<script>
import UnitDialog from '@/components/common-dialog/unit-dialog.vue';
import { doQueryWithPage } from '@/api/common-select/unit-select'
export default {
  props: {
    querySelect: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    rowIndex: {type: Number, default: 0}
  },
  components: {
    UnitDialog
  },
  data() {
    return {
      searchForm: {
        name: ''
      },
      searchTexts: {
        unitName: '', //c仓库名称
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
          if (item.unitName) {
            return item.unitName.toLowerCase().indexOf(this.searchTexts.unitName.toLowerCase()) !== -1
          }
        });
      } else {
        this.options = new Array();
      }
    },
    chooseItemChange() {
      if (this.options.length > 0) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].unitCode == this.searchForm.name) {
            this.selectItem = this.options[i];
          }
        }
      } else {
        this.selectItem = "";
      }
      this.searchTexts.unitName = '';
      this.$emit('childevent', this.selectItem, this.rowIndex);
    },
    chooseItem() {
      /*doQueryWithPage(this.searchTexts, this.listQuery).then(response => {
        if (response.data.status == 1) {
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
          this.searchTexts.unitName = query;
          doQueryWithPage(this.searchTexts, this.listQuery).then(response => {
            if (response.data.status == 1) {
              this.list = response.data.data.datalist;
              this.setOptions(this.list);
              if (this.options && this.options.length == 1 && this.options[0].unitName == query) {
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
      this.searchForm.name = item.unitName;
      // 选中传出的值
      this.$emit('childevent', item, this.rowIndex);
    },
    clearCustomer() {
      this.searchForm.name = '';
      this.options = new Array;
      this.chooseItemChange();
    }
  },
  watch: {
    querySelect(val) {
      this.searchForm.name = val;
    }
  }

}

</script>
