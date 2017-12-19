<template>
<div class="allTemplate">
    <div style="margin-bottom:12px">
      <el-button type="warning" icon="el-icon-edit" size="mini" @click="addrow">增 加</el-button>
      <el-button type="warning" icon="el-icon-delete" size="mini" plain @click="deleterow">删 除</el-button>
    </div>
    <div class="table">
      <common-table
        :data="tableData"
        :maxHeight="300"
        :fit="true" ref="multipleTable"
        :headers="headers"
        @selection-change="handleSelectionChange"
        >
          <template slot-scope="scope">
            <div v-if="scope.text == 'select'">
              <el-select v-model="tableData[scope.index]['payType']" clearable placeholder="请选择" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-if="scope.text == 'select1'">
              <el-select v-model="tableData[scope.index]['timeType']" clearable placeholder="请选择" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div v-if="scope.text == 'select2'">
              <el-select v-model="tableData[scope.index]['payMode']" clearable placeholder="请选择" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- <div v-if="scope.text == 'date'">
              <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
            <div v-if="scope.text == 'input'">
              <el-input v-model="list[scope.index]['name']"></el-input>
            </div> -->
          </template>
        </common-table>
    </div>
</div>
</template>


<script>
const headers = [
    { type: 'selection', width: '55px'},
    { prop: 'index', label: '序号', width: '100px',align:'center' },
    { prop: 'payType', label: '付款类型', width: '120px',align:'center', template: 'select'},
    { prop: 'timeType', label: '时间节点', width: '120px',align:'center', template: 'select1'},
    { prop: 'payMode', label: '支付方式', width: '120px',align:'center',template: 'select2'},
    { prop: 'date', label: '远期天数', width: '120px',align:'center' },
    { prop: 'date', label: '币种', width: '80px',align:'center' },
    { prop: 'date', label: '原币金额', width: '120px',align:'center' },
    { prop: 'date', label: '比例%', width: '120px',align:'center' },
    { prop: 'date', label: '备注',align:'center' },
  ]



export default {

    data(){
        return {
            tempAll:{},
            tableData:[],
            multipleSelection:[],
            headers: headers,
            options: [{
              value: '选项1',
              label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value:'',
        }
    },
    methods: {
      addrow(){
          let index = 0;
          for (var i = 0; i < this.tableData.length; i++) {
            if (i == this.tableData.length - 1 && this.tableData[i].index) {
              index = this.tableData[i].index;
            }
          }
          var addList = {
            index:index+10,
            date:'',
            payType:'',
            timeType:'',
            payMode:'',
            address:'',
          }
          this.tableData.push(addList);
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
          for (var i = 0; i < this.tableData.length; i++) {
            let v = this.tableData[i];
            for (var j = 0; j < this.multipleSelection.length; j++) {
              if (this.multipleSelection[j].index == v.index) {
                this.tableData.splice(i, 1);
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
