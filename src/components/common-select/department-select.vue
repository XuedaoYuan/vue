<template>
  <div>
  <el-select
        v-model="tempAll.name"
        filterable
        remote size="mini" style="float:left;height:24px;overflow:hidden" class="common-search-select"
        reserve-keyword clearable @change="chooseItemChange" @clear="clearCustomer"
        placeholder="请输入关键词" :disabled="disabled" collapse-tags
        :remote-method="remoteMethod" @focus="chooseItem"
        :loading="loading">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.orgName"
          :value="item.id">
            <el-row :gutter="20" style=" margin: 0;">
                <el-col :span="6" class="cell" style=" margin: 0;">{{ item.orgName }}</el-col>
            </el-row>
         </el-option>
        </el-select>
        <div class="searchDialogOpen"  @click="showMainInfoDialog" :class="{'open-disabled':disabled}">
          <i class="el-icon-search" :class="{'open-disabled':disabled}"></i>
        </div>
        <departmentDialog :departmentFormVisible="departmentFormVisible" @closeItem="closeMainInfoDialog" @setItem="setMainInfoDialog" :querySelect="transferSearch"></departmentDialog>
  </div>
</template>
<script>

    import departmentDialog from 'components/common-dialog/department-dialog.vue';//部门弹框
    import { doQueryWithPage } from '@/api/common-select/department-select'
    export default {
        props: {
            querySelect: {type:String,default: undefined},
            disabled: {type:Boolean,default: false},
            transferSearch:{
                type:Object,default:undefined
            }
        },
        components: {
            departmentDialog
        },
        data(){
            return {
                tempAll:{
                    name:''
                },
                searchTexts:{
                    orgName:'',//部门名称
                    companyCode:'',
                    companyName:'',
                },
                listQuery:{
                    pageSize:20,
                    currentPage:1,
                },
                selectItem:null,
                list:[],
                loading:false,
                options:new Array,
                departmentFormVisible:false,//部门
            }
        },
        created(){
            this.tempAll.name = this.querySelect;
            // this.searchTexts.orgName = this.querySelect;
          },
        methods: {
            // 弹框部分
            showMainInfoDialog(){
                if(!this.disabled){
                    this.departmentFormVisible = true;
                }
            },
            closeMainInfoDialog(){
                this.departmentFormVisible = false;
            },
            setMainInfoDialog(val){
                if(val){
                    this.handleSelect(val);
                }else {
                    this.clearCustomer();
                }
                this.departmentFormVisible = false;
            },
            // 放大镜部分
            setOptions(list){
                if (list) {
                    this.options = list.filter(item => {
                        return item.orgName.toLowerCase().indexOf(this.searchTexts.orgName.toLowerCase()) !== -1
                    });
                } else {
                    this.options = new Array();
                }
            },
            chooseItemChange(){
                if(this.options.length > 0){
                    for (var i = 0; i < this.options.length; i++) {
                        if (this.options[i].id == this.tempAll.name) {
                            this.selectItem = this.options[i];
                        }
                    }
                }else {
                    this.selectItem = "";
                }
                this.searchTexts.orgName = '';
                this.$emit('childevent', this.selectItem);
            },
            chooseItem(){
                // console.log(this.transferSearch,'transferSearch');
                if(this.transferSearch){
                    this.searchTexts.companyName = this.transferSearch.companyName;
                    this.searchTexts.companyCode = this.transferSearch.companyCode;
                    this.searchTexts.companyId = this.transferSearch.companyId;
                }else {
                    this.searchTexts.companyName = '';
                    this.searchTexts.companyCode = '';
                    this.searchTexts.companyId = '';
                }
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
                    this.searchTexts.orgName = query;
                    doQueryWithPage(this.searchTexts,this.listQuery).then(response=> {
                        if(response.data.status == 1){
                            this.list = response.data.data.datalist;
                            this.setOptions(this.list);
                            if (this.options && this.options.length == 1 && this.options[0].orgName == query) {
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
                this.tempAll.name = item.orgName;
                // 选中传出的值
                this.$emit('childevent', item);
            },
            clearCustomer(){
                this.tempAll.name = '';
                this.options = new Array;
                this.chooseItemChange();
            },
        },
        watch:{
            querySelect:function(val){
                this.tempAll.name = val;
            }
        }

    }


</script>

<style scoped>

</style>