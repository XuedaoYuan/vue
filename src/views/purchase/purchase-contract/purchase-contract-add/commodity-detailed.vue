<template>
    <div class="allTemplate commodity-detailed">
        <div class="info" style="margin-bottom: 15px">
            <div class="btn">
                <el-button type="warning" size="small" @click="addRow">创建</el-button>
                <el-button type="warning" size="small" icon="el-icon-delete" @click="deleteRow" plain>删除</el-button>
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
            <div style="margin-top:10px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="listQuery.currentPage"
                  :page-sizes="[10, 20, 30,50]"
                  :page-size="listQuery.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    const headers = [
        { type: 'selection', width: '55px'},
        { prop: 'lineNumber', label:'行号', width: '55px',align:'center'},
        { prop: 'goodsCode', label: '物料编号', width: '120px',align:'center' },
        { prop: 'goodsName', label: '物料名称', width: '120px',align:'center' },
        { prop: 'itemQty', label: '数量', width: '120px',align:'center'},
        { prop: 'unitName', label: '单位', width: '120px',align:'center' },
        { prop: 'orginPriceTex', label: '含税单价', width: '120px',align:'center' }, //无
        { prop: 'basePriceTex', label: '含税金额', width: '120px',align:'center' }, //无
        { prop: 'orginAmtTex', label: '税前金额', width: '120px',align:'center' }, //无
        { prop: 'texRate', label: '税率', width: '120px',align:'center' },
        { prop: 'texAmt', label: '税额', width: '120px',align:'center' },
        { prop: 'remark', label: '备注', width: '120px',align:'center' }
    ];

    const list = [
        {
          lineNumber:'10',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
          }
    ];
    export default {
        data(){
            return {
                activeName:'first',
                searchBarFlg:true,
                headers:headers,
                list:list,
                listQuery:{
                    currentPage:1,
                    pageSize:10
                },
                total:10,
                deleteList:[]

            }
        },
        methods:{
            handleCellClick(){//单选

            },
            handleSelectionChange(val){//多选
                this.deleteList = val;
            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            },
            addRow(){//增行
                let rowList = {
                  lineNumber:'10',
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                };
                this.list.push(rowList)
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
            }
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .commodity-detailed .btn{
        padding:10px;
    }
</style>
