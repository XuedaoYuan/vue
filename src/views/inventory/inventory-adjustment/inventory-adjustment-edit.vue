<template>
  <div class="allTemplate">
    <div class="info">
      <el-button type="primary" size="small" @click="SaveClick">保 存</el-button>
      <el-button type="info" size="small" @click.native="onClick">取 消</el-button>
      <el-button v-if="!searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-down"
                 @click="searchBarFlg = true">展 开
      </el-button>
      <el-button v-if="searchBarFlg" class="search-btn" size="small" type="primary" icon="el-icon-arrow-up"
                 @click="searchBarFlg = false">收 起
      </el-button>
    </div>
    <el-collapse-transition>
      <div v-show="searchBarFlg" class="top-from">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="抬头数据" name="first">
            <el-form ref="formData" :rules="rules" label-width="80px" :model="formData"
                     style="padding-bottom: 10px;"
            >
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="调整单编号" prop="nsNo">
                    <el-input v-model="formData.nsNo" disabled size="mini"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="状态" prop="nsStatus">
                    <el-select clearable v-model="formData.nsStatus" disabled placeholder="请选择" size="mini">
                      <el-option v-for="(value,key) in nsStatus" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="经营主体" prop="manageSubName">
                    <management-subject @childevent="childEventHandlerMainInfo"
                                        :querySelect="formData.manageSubName"></management-subject>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="部门" prop="bizOrgName">
                    <department-subject @childevent="bizOrgNameFill" :querySelect="formData.bizOrgName"
                                        :disabled="isDepartment"
                                        :transferSearch="transferSearchDepartment"></department-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="仓库" prop="warehouseName">
                    <warehouse-subject @childevent="warehouseNameFill"
                                       :querySelect="formData.warehouseName"></warehouse-subject>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="调整类型" prop="nsType">
                    <el-select clearable v-model="formData.nsType" placeholder="请选择" size="mini">
                      <el-option v-for="(value,key) in nsType" :key="key" :label="value" :value="key"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col>
                  <el-form-item label="备注" prop="remark">
                    <el-input v-model="formData.remark" size="mini"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="five">
            <el-form ref="form" label-width="100px" :model="formData"
                     style="padding-bottom: 10px;"
            >
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建人" prop="createdBy">
                    <el-col :span="22">
                      <el-input v-model="formData.createdBy" disabled size="mini"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="修改人" prop="updatedBy">
                    <el-col :span="22">
                      <el-input v-model="formData.updatedBy" disabled size="mini"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账人" prop="postPersonName">
                    <el-col :span="22">
                      <el-input v-model="formData.postPersonName" disabled size="mini"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="创建时间" prop="createdTime">
                    <el-col :span="22">
                      <el-date-picker disabled v-model="formData.createdTime" :editable="false" type="datetime"
                                      size='mini' placeholder="选择日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="修改时间" prop="updatedTime">
                    <el-col :span="22">
                      <el-date-picker disabled v-model="formData.updatedTime" :editable="false" type="datetime"
                                      size='mini' placeholder="选择日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="过账时间" prop="postDate">
                    <el-col :span="22">
                      <el-date-picker disabled v-model="formData.postDate" :editable="false" type="datetime" size='mini'
                                      placeholder="选择日期"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-collapse-transition>
    <div class="table" style="margin-top:12px;margin-bottom:6px">
      <el-button type="warning" size="mini" @click="Establish">创 建</el-button>
      <el-button type="warning" icon="el-icon-delete" size="mini" @click="DeleteClick" plain>删 除</el-button>
    </div>
    <common-table
      :data="tableData"
      :maxHeight="300"
      :fit="true"
      :headers="header"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <template slot-scope="scope" slot="default">
        <div v-if="scope.text == 'select'">
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option v-for="item in options" size="mini" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div v-if="scope.text == 'date'">
          <el-date-picker v-model="tableData[scope.index]['date']" size="mini" type="date" placeholder="选择日期">
          </el-date-picker>
        </div>
        <!--   <div v-if="scope.text == 'goodsCode'">
             &lt;!&ndash; <el-input v-model="list[scope.index]['goodsCode']" size='mini'></el-input> &ndash;&gt;
             <goods-select @childevent="childEventHandlerGoods" :querySelect="tableData[scope.index]['goodsCode']"></goods-select>
           </div>-->
        <div v-if="scope.text == 'seriesNo'">
          <series-select @childevent="childEventHandlerSeries" :queryObj="seriesObj"
                         :querySelect="tableData.seriesNo"></series-select>
        </div>
      </template>
    </common-table>
  </div>
</template>

<script>
  import router from '@/router'
  import ManagementSubject from '@/components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from '@/components/common-select/department-select.vue'//部门
  import WarehouseSubject from '@/components/common-select/warehouse-select.vue'//仓库
  //  import GoodsSelect from 'components/common-select/goods-select.vue' //物料编号
  import SeriesSelect from 'components/common-select/series-select.vue' //批次号弹框

  import {pickerOptions} from '@/util'
  import {
    doQueryCusAll,
    doCusUpdate,
    createPrompt
  } from '../../../api/inventory/inventory-adjustment/inventory-adjustment'

  const header = [
    {type: 'selection', width: '55px', fixed: 'left'},
    {prop: 'nsDtlRowNo', width: '80px', align: 'center', label: '行号'},
    {prop: 'seriesNo', label: '批次号', align: 'center', template: 'seriesNo', required: true},
    {prop: 'goodsCode', label: '物料编号', align: 'center'},
    {prop: 'goodsName', label: '物料名称', align: 'center'},
    {prop: 'nsStockQty', label: '库存调整数量', align: 'center', digit: '2', editable: true, required: true},
    {prop: 'unitName', label: '单位', align: 'center'},
    {prop: 'qty', label: '库存调整件数', align: 'center', digit: '2', editable: true, required: true},
    {prop: 'costPrice', label: '单位成本', align: 'center', digit: '2'},
    {prop: 'nsStockAmt', label: '成本金额', align: 'center', digit: '2'},
    {prop: 'remark', label: '备注', align: 'center', editable: true}
  ];
  export default {
    components: {
      ManagementSubject, DepartmentSubject, WarehouseSubject, SeriesSelect

    },
    props: {
      nsId: String
    },
    data () {
      return {
        //枚举
        nsStatus: ENUMS["7150"],//状态
        nsType: ENUMS["7355"],//调整类型

        searchBarFlg: true,
        isDepartment: true,//是否有公司
        transferSearchDepartment: {
          companyName: "",
          companyId: "",
          companyCode: "",
          boolToBtn: true
        },
        seriesObj: {
          bizOrgId: '',
          manageSubId: '',
          warehouseId: ''
        },//批次对应参数对象
        pickerOptions: {
          shortcuts: pickerOptions
        },
        activeName: 'first',
        formData: {
          //经营主体
          manageSubName: '',
          manageSubCode: '',
          manageSubId: '',
          //部门
          bizOrgName: '',
          bizOrgId: '',
          bizOrgCode: '',
          //仓库
          warehouseName: '',
          warehouseCode: '',
          warehouseId: '',

          nsStatus: '',//状态
          nsNo: '',//调整单编号
          nsType: '',//调整类型
          remark: '',//备注
          createdBy: '',
          createdTime: '',
          updatedBy: '',
          updatedTime: '',
          postPersonName: '',
          postDate: ''
        },
        rules: {
          manageSubName: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          bizOrgName: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          warehouseName: [
            {required: true, message: ' ', trigger: 'blur'}
          ]
        },
        header: header,
        tableData: [],
        rowIndex: null,
        nsDtlId: [],
        selectchange: ''
      }
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        this.listLoading = true;
        doQueryCusAll(this.nsId).then(res => {
          if (res.data.status === 1) {
            this.formData.nsId = res.data.data.codNsVO.nsId;
            this.formData.version = res.data.data.codNsVO.version;
            this.formData.manageSubName = res.data.data.codNsVO.manageSubName;
            this.formData.manageSubCode = res.data.data.codNsVO.manageSubCode;
            this.formData.manageSubId = res.data.data.codNsVO.manageSubId;
            this.formData.bizOrgName = res.data.data.codNsVO.bizOrgName;
            this.formData.bizOrgId = res.data.data.codNsVO.bizOrgId;
            this.formData.bizOrgCode = res.data.data.codNsVO.bizOrgCode;
            this.formData.warehouseName = res.data.data.codNsVO.warehouseName;
            this.formData.warehouseCode = res.data.data.codNsVO.warehouseCode;
            this.formData.warehouseId = res.data.data.codNsVO.warehouseId;
            this.formData.nsStatus = res.data.data.codNsVO.nsStatus.toString();
            this.formData.nsType = res.data.data.codNsVO.nsType.toString();
            this.formData.nsNo = res.data.data.codNsVO.nsNo;
            this.formData.remark = res.data.data.codNsVO.remark;

            this.formData.createdBy = res.data.data.codNsVO.createdBy;
            this.formData.createdTime = res.data.data.codNsVO.createdTime;
            this.formData.updatedBy = res.data.data.codNsVO.updatedBy;
            this.formData.updatedTime = res.data.data.codNsVO.updatedTime;
            this.formData.postPersonName = res.data.data.codNsVO.postPersonName;
            this.formData.postDate = res.data.data.codNsVO.postDate;

            if (res.data.data.codNsDtlVO.length > 0) {
              //              this.tableData =  res.data.data.codNsDtlVO;
              res.data.data.codNsDtlVO.forEach((o, i) => {
                this.tableData.push({
                  'nsDtlRowNo': o.nsDtlRowNo,
                  'seriesId': o.seriesId,
                  'seriesNo': o.seriesNo,
                  'goodsId': o.goodsId,
                  'goodsCode': o.goodsCode,
                  'goodsName': o.goodsName,
                  'unitName': o.unitName,
                  'unitId': o.unitId,
                  'unitCode': o.unitCode,
                  'nsStockAmt': o.nsStockAmt,
                  'nsStockQty': o.nsStockQty,
                  'nsId': o.nsId,
                  'nsDtlId': o.nsDtlId,
                  'remark': o.remark
                });
              });
            } else {
              this.tableData = [];
            }
            this.listLoading = false;
          }
        })
      },
      //取消
      onClick () {
        //        router.push({ params: { type: 'list' } });
        this.$store.dispatch('toggleCurrentView', {
          SalesInventory: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      //保存
      SaveClick () {
        this.validateForm('formData')
      },
      validateForm (formName) { //表单校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.validateTable();//通过调用tale验证
          } else {
            this.$message({
              type: 'warning',
              message: "请完善必输字段！"
            })
            return false;
          }
        });
      },
      validateTable () { //表格校验
        console.log(this.tableData)
        console.log(this.header)
        eventBus.$emit('validateTable', {
          data: this.tableData,    //表示表格数据
          headers: this.header,   //表示表头数据
          success: (valid) => {   //成功回掉
            if (valid) {
              //校验通过后，代码书写处
              console.log(this.tableData.length)
              if (this.tableData.length > 0) {
                this.doCusUpdate();
              } else {
                this.$message({
                  type: 'warning',
                  message: "请创建明细"
                })
              }
            }
          }
        })
      },
      doCusUpdate () {
        this.tableData.map((x) => {
          delete x.$index;
        });
        console.log(this.tableData)
        doCusUpdate(this.formData, this.tableData, this.nsDtlId).then(res => {
          if (res.data.status === 1) {
            this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success'
            })
            this.$store.dispatch('toggleCurrentView', {
              SalesInventory: {
                view: 'index'
              }
            });
          }
        })
      },
      //创建
      Establish () {
        if (createPrompt(this.formData)) {
          let nsDtlRowNo = 1;
          if (this.tableData.length >= 1) {
            nsDtlRowNo = this.tableData[this.tableData.length - 1].nsDtlRowNo + 1
          }
          var addList = {
            nsDtlRowNo: nsDtlRowNo,
            seriesId: '',//批次号
            seriesNo: '',
            goodsCode: '',//物料编号
            goodsName: '',//物料描述
            unitName: '',//单位
            unitId: '',//
            unitCode: '',//
            nsStockQty: '',//库存调整数量
            qty: '',//库存调整件数
            costPrice: '',//单位成本
            nsStockAmt: '',//成本金额
            remark: ''//备注
          }
          this.tableData.push(addList);
        }
      },
      //删除
      DeleteClick () {
        if (this.selectchange.length < 1) {
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
            this.selectchange.forEach((x, i) => {
              let idx = this.tableData.findIndex((val) => val.$index == x.$index);
              this.tableData[idx].nsDtlId && this.nsDtlId.push(this.tableData[idx].nsDtlId);
              idx > -1 && this.tableData.splice(idx, 1);
            });
            this.$notify({
              title: '成功',
              message: '删除成功！',
              type: 'success'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
        }
      },
      // 经营主体
      childEventHandlerMainInfo (val) {
        if (val) {
          console.log(val)
          this.formData.manageSubName = val.companyName;
          this.formData.manageSubId = val.companyId;
          this.formData.manageSubCode = val.companyCode;
          this.isDepartment = false;

          this.seriesObj.manageSubId = val.companyId;
          this.transferSearchDepartment.companyName = val.companyName;
          this.transferSearchDepartment.companyId = val.companyId;
          this.transferSearchDepartment.companyCode = val.companyCode;
          this.$refs['formData'].validateField('manageSubName');
        } else {
          this.formData.manageSubName = '';
          this.formData.manageSubId = '';
          this.formData.manageSubCode = '';
          this.isDepartment = true;
          this.transferSearchDepartment.companyName = '';
          this.transferSearchDepartment.companyId = '';
          this.transferSearchDepartment.companyCode = '';

          this.seriesObj.manageSubId = '';
          this.formData.bizOrgName = '';
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';
        }
      },
      //部门
      bizOrgNameFill (val) { // 部门
        if (val) {
          this.formData.bizOrgName = val.orgName;
          this.formData.bizOrgId = val.orgId;
          this.formData.bizOrgCode = val.orgCode;

          this.seriesObj.bizOrgId = val.orgId;
          this.$refs['formData'].validateField('bizOrgName');
        } else {
          this.formData.bizOrgName = '';
          this.formData.bizOrgId = '';
          this.formData.bizOrgCode = '';

          this.seriesObj.bizOrgId = '';
        }
      },
      //仓库
      warehouseNameFill (val) {
        if (val) {
          console.log(val)
          this.formData.warehouseName = val.warehouseName;
          this.formData.warehouseId = val.warehouseId;
          this.formData.warehouseCode = val.warehouseCode;

          this.seriesObj.warehouseId = val.warehouseId;
          this.$refs['formData'].validateField('warehouseName');
        } else {
          this.formData.warehouseName = '';
          this.formData.warehouseId = '';
          this.formData.warehouseCode = '';

          this.seriesObj.warehouseId = '';
        }
      },
      //批次号
      childEventHandlerSeries (val) {
        if (val) {
          this.tableData[this.rowIndex].seriesId = val.seriesId;
          this.tableData[this.rowIndex].seriesNo = val.seriesNo;
          this.tableData[this.rowIndex].goodsName = val.goodsName;
          this.tableData[this.rowIndex].goodsId = val.goodsId;
          this.tableData[this.rowIndex].goodsCode = val.goodsCode;
          this.tableData[this.rowIndex].unitCode = val.unitCode;
          this.tableData[this.rowIndex].unitId = val.unitId;
          this.tableData[this.rowIndex].unitName = val.unitName;
        } else {
          this.tableData[this.rowIndex].seriesId = val.seriesId;
          this.tableData[this.rowIndex].seriesNo = val.seriesNo;
          this.tableData[this.rowIndex].goodsName = '';
          this.tableData[this.rowIndex].goodsId = '';
          this.tableData[this.rowIndex].goodsCode = '';
          this.tableData[this.rowIndex].unitCode = '';
          this.tableData[this.rowIndex].unitId = '';
          this.tableData[this.rowIndex].unitName = '';
        }
      },
      handleClick (tab, event) {
        console.log(tab, event);
      },
      handleRowClick (row) {
        this.rowIndex = row.$index;
      },
      handleSelectionChange (val) {
        var vm = this;
        vm.selectchange = val;
        console.log(vm.selectchange.length)
      }
    }
  }
</script>
<style>

</style>

