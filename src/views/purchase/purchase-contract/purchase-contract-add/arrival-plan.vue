<template>
    <div class="allTemplate arrivalPlan">
        <div class="info" style="margin-bottom: 15px">
            <div class="btn">
                <el-button type="warning" size="small" @click="addRow">创建</el-button>
                <el-button type="warning" size="small" @click="deleteRow" plain>删除</el-button>
            </div>

            <div class="table">
               <common-table
                :data="list"
                :maxHeight="300"
                :fit="true"
                :headers="headers"
                @cell-click="handleCellClick"
                @selection-change="handleSelectionChange"
                >
                    <template slot-scope="scope"></template>
                </common-table>
            </div>
        </div>
    </div>
</template>
<script>
    const headers = [
        {type:'selection', width:'50px'},
        { prop: 'index', type:'index', label:'序号', width: '200px',align:'center', template: '<span>{{ index+1 }}</span>'},
        { prop: 'deliveryDate', label: '交货日期', width: '500px',align:'center' },
        { prop: 'deliveryQty', label: '订单数量', width: '355px',align:'center' },

    ];
    const list = [
        {
          index:'1',
          date: '2016-05-03',
          name: '王小虎'
          }
    ];

    export default {
        data(){
            return {
                activeName:'first',
                searchBarFlg:true,
                list:list,
                headers:headers,
                deleteList:[]
            }
        },
        methods:{
            handleCellClick(){

            },
            handleSelectionChange(val){
                this.deleteList = val;
            },
            addRow(){
                let rowList = {
                  lineNumber:'10',
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                };
                this.list.push(rowList)
            },
            deleteRow(){
                for (var i = 0; i < this.list.length; i++) {
                    for (var j = 0; j < this.deleteList.length; j++) {
                        if (this.deleteList[j] == this.list[i]) {
                          this.list.splice(i, 1);
                          i--;
                        }
                    }
                }
            }
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .arrivalPlan .btn{
        padding:10px;
    }
</style>