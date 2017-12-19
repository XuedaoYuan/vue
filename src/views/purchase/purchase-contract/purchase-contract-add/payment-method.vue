<template>
    <div class="allTemplate paymentMethod">
        <div class="info" style="margin-bottom: 15px">
            <div class="btn">
                <el-button type="warning" size="small" @click="addRow">创建</el-button>
                <el-button type="warning" size="small" icon="el-icon-delete"  @click="deleteRow" plain>删除</el-button>
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
                    <template slot-scope="scope">
                      <div v-if="scope.text == 'select'">
                        <el-select v-model="list[scope.index]['paymentType']" clearable  size="mini" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                      </div>
                      <div v-if="scope.text == 'select1'">
                        <el-select v-model="list[scope.index]['name']" clearable placeholder="请选择" size="mini">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                      </div>
                    </template>
                </common-table>
            </div>
        </div>
    </div>
</template>
<script>
    const headers = [
        {type:'selection', width:'50px'},
        { prop: 'lineNumber', label:'序号', width: '55px',align:'center'},
        { prop: 'paymentType', label: '付款类型',align:'center' ,template: 'input', template: 'select'},
        { prop: 'name', label: '时间结点',align:'center' ,template: 'input', template: 'select1'},
        { prop: 'payType', label: '支付方式',align:'center' },
        { prop: 'date', label: '远期天数',align:'center' },
        { prop: 'date', label: '币种',align:'center' },
        { prop: 'orginalTex', label: '原币金额',align:'center' },
        { prop: 'proportion', label: '比列%',align:'center' },
        { prop: 'remark', label: '备注',align:'center' }
    ];
    const list = [
        { date: '2016-05-03',
          name: '王小虎',
          paymentType: '上海市普陀区金沙江路 1518 弄'
        },
        { date: '2016-05-03',
          name: '王小虎',
          paymentType: '上海市普陀区金沙江路 1518 弄'
        },
    ];
    export default {
        data(){
            return {
                activeName:'first',
                searchBarFlg:true,
                headers:headers,
                list:list,
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
                value4:'',
                value2:'',
                deleteList:[],
            }
        },
        methods:{
            handleCellClick(){//单击列表

            },
            handleSelectionChange(val){//复选框
                this.deleteList = val;
                console.log(this.deleteList,'shanchu');
            },
            addRow(){//增行
                let rowList = {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                };
                this.list.push(rowList);
            },
            deleteRow(){//删行
                for (var i = 0; i < this.list.length; i++) {
                    for (var j = 0; j < this.deleteList.length; j++) {
                        if (this.deleteList[j] == this.list[i]) {
                          this.list.splice(i, 1);
                          i--;
                        }
                    }
                }
            },
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .paymentMethod .btn{
        padding:10px;
    }
</style>