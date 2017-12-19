<template>
  <div id="moneyCredit" class="allTemplate">
    <div class="info" style="margin-bottom: 15px">
      <div style="margin-bottom:10px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" size="small" @click="Search">查询</el-button>
          <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down"
                     @click="searchBarFlg = true"></el-button>
          <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up"
                     @click="searchBarFlg = false"></el-button>
        </el-button-group>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="rest">重置</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="searchBarFlg">
          <el-form ref="form" label-width="100px" :model="formData">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="产品类型" prop="goodsNameType">
                  <el-select clearable v-model="formData.goodsNameType" placeholder="请选择" size="mini">
                    <el-option v-for="(value,key) in goodsNameType" :key="key" :label="value" :value="value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="产品名称" prop="goodsName">
                  <goods-select @childevent="childEventHandlerGoods" :querySelect="formData.goodsName"></goods-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-transition>
    </div>
    <div class="btn" style="margin-bottom: 15px">
      <el-button type="warning" size="mini" @click.native="onClickAdd">创建</el-button>
      <el-button type="warning" size="mini" @click.native="onClickSave" :disabled="SaveState">保存</el-button>
      <el-button type="warning" size="mini" @click="onClickDel" :disabled="delState">删除</el-button>
    </div>
    <div class="commonTable">
      <common-table
        :data="tableData"
        :maxHeight="300"
        :fit="true"
        :headers="headers"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
        style="margin-bottom: 15px;"
      >
        <template slot-scope="scope"  slot="default">
          <div v-if="scope.text == 'goodsName'">
            <goods-select @childevent="childEventHandlerGoodstable"
                          :querySelect="tableData[scope.index]['goodsName']"></goods-select>
          </div>
          <div v-if="scope.text == 'goodsNameType'">
            <el-select clearable v-model="tableData[scope.index]['goodsNameType']" placeholder="请选择" size="mini">
              <el-option v-for="(value,key) in goodsNameType" :key="key" :label="value" :value="key"></el-option>
            </el-select>
          </div>
        </template>
        <template slot="filter" slot-scope="scope">
          <div v-if="scope.text == 'goodsNameType'">
            <span>{{tableData[scope.index]['goodsNameType'] | goodsNameTypeFilter}}</span>
          </div>
        </template>
      </common-table>
    </div>
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
</template>
<script>
  import {
    doBGPSave,
    doBGPQueryWithPage,
    doDeleteBGP,
    doUpdateBGPOw
  } from '../../../api/basic-data/product-price/product-price'
  import GoodsSelect from 'components/common-select/goods-select.vue' //物料
  const headers = [
    {type: 'selection', width: '55px'},
    {prop: 'goodsNameType', label: '产品类型', align: 'center', template: 'goodsNameType', filter: true, required: true},
    {prop: 'goodsName', label: '产品名称', align: 'center', template: 'goodsName', required: true},
    {prop: 'price', label: '价格', align: 'center', editable: true, digit: '2', required: true},
    {prop: 'remark', label: '备注', align: 'center', editable: true}
  ];
  export default {
    components: {
      GoodsSelect
    },
    data () {
      return {
        //枚举
        goodsNameType: ENUMS["7610"],//状态

        searchBarFlg: true,
        selectList: [],
        SaveState: true,
        delState: true,
        rowIndex: null,
        formData: {
          goodsNameType: '',//产品类型
          goodsName: ''//产品名称
        },
        total: null,
        listQuery: {
          pageSize: 10,
          currentPage: 1
        },
        headers: headers,
        tableData: []
      }
    },
    created () {
      console.log(this.goodsNameType)
      this.getList();
      this.rest();
    },
    activated () {
      this.getList();
    },
    methods: {
      getList () {
        this.listLoading = true;
        doBGPQueryWithPage(this.formData, this.listQuery).then(res => {
          if (res.data.status === 1) {
//            this.tableData = res.data.data.datalist;
            this.total = res.data.data.items;
            var tableList = res.data.data.datalist
            tableList.forEach((o,i) => {
                  this.tableData.push({
                    goodsNameType: o.goodsNameType.toString(),//
                    goodsName: o.goodsName,//
                    goodsId: o.goodsId,//
                    goodsCode: o.goodsCode,//
                    price: o.price,//
                    remark: o.remark//
                  })
                })
            this.listLoading = false;
          } else {
            this.listLoading = false;
          }
        })
      },
      //查询
      Search () {
        this.getList();
      },
      //重置
      rest () {
        this.formData.goodsNameType = '';
        this.formData.goodsName = '';
        this.getList();
      },
      //创建
      onClickAdd () {
        var addList = {
          goodsNameType: '',//
          goodsName: '',//
          goodsId: '',//
          goodsCode: '',//
          price: '',//
          remark: ''//
        }
        this.tableData.push(addList);
      },
      //保存
      onClickSave () {
        eventBus.$emit('validateTable', {
          data: this.tableData,    //表示表格数据
          headers: this.headers,   //表示表头数据
          success: (valid) => {   //成功回掉
            if (valid) {
              //校验通过后，代码书写处
              console.log(this.tableData.length)
              if (this.tableData.length > 0) {
                let createLsit = [];
                let updataLsit = [];
                var vm = this
                for (var i = 0, len = this.tableData.length; i < len; i++) {
                  delete vm.tableData[i].$index;
                  if (vm.tableData[i].goodsPriceId) {
                    updataLsit.push(vm.tableData[i])
                  } else {
                    createLsit.push(vm.tableData[i])
                  }
                }
                console.log(createLsit);
                if (createLsit.length > 0) {
                  //创建
                  doBGPSave(createLsit).then(res => {
                    if (res.data.status === 1) {
                      this.$notify({
                        title: '成功',
                        message: '创建保存成功！',
                        type: 'success'
                      });
                    }
                  })
                }
                if (updataLsit.length > 0) {
                  //修改更新
                  doUpdateBGPOw(updataLsit).then(res => {
                    if (res.data.status === 1) {
                      this.$notify({
                        title: '成功',
                        message: '修改更新成功！',
                        type: 'success'
                      });
                    }
                  })
                }
              } else {
                this.$message({
                  type: 'warning',
                  message: "请创建条目！"
                })
              }
            }
          }
        })
      },
      delList (result) {
        doDeleteBGP(result).then(response => {
          if (response.data.status == 1) {
            this.$notify({
              title: '成功',
              message: '删除成功！',
              type: 'success'
            });
            this.selectList.forEach((x, i) => {
              let idx = this.tableData.findIndex((val) => val.$index == x.$index);
              idx > -1 && this.tableData.splice(idx, 1);
            })
          }
        })
      },
      //删除
      onClickDel () {
        if (this.selectList.length < 1) {
          this.$notify({
            title: '警告',
            message: '请选择一行或多行进行删除',
            type: 'warning'
          });
        } else {
          this.$confirm('确定删除?', '删除', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var result = [];
            this.selectList.forEach((x, i) => {
              if (x.goodsPriceId) {
                var o = {};
                o.goodsPriceId = x.goodsPriceId;
                o.version = x.version;
                result.push(o);
                console.log(result)
              } else {
                let idx = this.tableData.findIndex((val) => val.$index == x.$index);
                idx > -1 && this.tableData.splice(idx, 1);
              }
            });
            if (result.length > 0) {
              this.delList(result)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }
      },
      // 物料
      // 经营主体
      childEventHandlerGoods (val) {
        if (val) {
          console.log(val)
          this.formData.goodsName = val.goodsName;
          this.formData.goodsId = val.goodsId;
          this.formData.goodsCode = val.goodsCode;
          //          this.$refs['formData'].validateField('goodsName');
        } else {
          this.formData.goodsName = '';
          this.formData.goodsId = '';
          this.formData.goodsCode = '';
        }
      },
      childEventHandlerGoodstable (val) {
        if (val) {
          console.log(val)
          this.tableData[this.rowIndex].goodsName = val.goodsName;
          this.tableData[this.rowIndex].goodsId = val.goodsId;
          this.tableData[this.rowIndex].goodsCode = val.goodsCode;
        } else {
          this.tableData[this.rowIndex].goodsName = '';
          this.tableData[this.rowIndex].goodsId = '';
          this.tableData[this.rowIndex].goodsCode = '';
        }
      },
      handleCellClick (row, column, cell) {
        console.log(row, column, cell);
      },
      handleRowClick (row) {
        this.rowIndex = row.$index;
      },
      handleSelectionChange (val) {
        this.selectList = val;
        if (this.selectList < 1) {
          this.delState = true;
        } else {
          this.delState = false;
        }
      },
      //分页
      handleSizeChange (val) {
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange (val) {
        this.listQuery.currentPage = val;
        this.getList();
      }
    },
    filters: {
      goodsNameTypeFilter (val) {
        return ENUMS["7610"][val];
      }
    },
    watch: {
      tableData () {
        let vm = this;
        console.log(vm.tableData.length)
        if (vm.tableData.length < 1) {
          this.SaveState = true;
        } else {
          this.SaveState = false;
        }
      }
    }
  }

</script>
