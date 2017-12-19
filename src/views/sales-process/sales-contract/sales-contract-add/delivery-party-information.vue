<template>
<div class="allTemplate">
    <div style="margin-bottom:12px">
      <el-button type="warning" icon="el-icon-edit" size="mini" @click="addrow">增 加</el-button>
      <el-button type="warning" icon="el-icon-delete" size="mini" @click="deleterow" plain>删 除</el-button>
    </div>
    <div class="table">
        <common-table
        :data="list"
        :maxHeight="300"
        :fit="true" ref="multipleTable"
        :headers="headers"
        @selection-change="handleSelectionChange"
        >
          <template slot-scope="scope">
            <div v-if="scope.text== 'index'">
                <span>{{scope.index + 1}}</span>
            </div>
            <div v-if="scope.text == 'name'">
              <el-input v-model="list[scope.index]['name']" size='mini'></el-input>
            </div>
            <div v-if="scope.text == 'address'">
              <el-input v-model="list[scope.index]['address']" size='mini'></el-input>
            </div>
            <div v-if="scope.text == 'phone'">
              <el-input v-model="list[scope.index]['phone']" size='mini'></el-input>
            </div>
          </template>
        </common-table>
    </div>
</div>
</template>


<script>
const headers = [
    { type: 'selection', width: '55px'},
    { prop: 'index', label: '序号', width: '60px',align:'center',template:'index'},
    { prop: 'name', label: '收货人',align:'center' ,template:'name'},
    { prop: 'address', label: '收货地址',align:'center',template:'address' },
    { prop: 'phone', label: '联系电话', width: '160px',align:'center',template:'phone' },
  ];
export default {
    data(){
        return {
            tempAll:{},
            list:[],
            multipleSelection:[],
            headers:headers,
        }
    },
    methods: {
      addrow(){
          let index = 0;
          for (var i = 0; i < this.list.length; i++) {
            if (i == this.list.length - 1 && this.list[i].index) {
              index = this.list[i].index;
            }
          }
          var addList = {
            index:index+1,
            name:'',
            address:'',
          }
          this.list.push(addList);
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      deleterow(){
        if(this.multipleSelection.length<1){
          this.$notify({
              title: '警告',
              message: '请选择一行或多行进行删除',
              type: 'warning'
          });
        }else {
          for (var i = 0; i < this.list.length; i++) {
            let v = this.list[i];
            for (var j = 0; j < this.multipleSelection.length; j++) {
              if (this.multipleSelection[j].index == v.index) {
                this.list.splice(i, 1);
                i--;
              }
            }
          }
        }
      },
    }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom:0;
}
</style>
