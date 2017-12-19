<template>
  <div class="allTemplate moneyReceiptAdd">
    <div class="info">
      <div>
        <el-button type="primary" size="mini" @click="toSave">保 存</el-button>
        <el-button type="info" size="mini" @click="toCancel">取 消</el-button>
        <el-button v-if="!searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-up" @click="searchBarFlg = true">展 开</el-button>
        <el-button v-if="searchBarFlg" class="search-btn" size="mini" type="primary" icon="el-icon-arrow-down" @click="searchBarFlg = false">收 起</el-button>
      </div>
        <el-collapse-transition>
            <div v-show="searchBarFlg">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="收款单抬头" name="first">
                      <el-form ref="form" label-width="140px" :model="formData">
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="经营主体" prop="poInvoiceNo">
                              <management-subject  @childevent = "manageSubNameFill"></management-subject>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="认领部门" prop="poInvoiceType">
                              <department-subject  @childevent = "bizOrgNameFill"></department-subject>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款方式" prop="payeeType">
                              <el-select  v-model="formData.payeeType" placeholder="请选择" size="mini" clearable >
                                <el-option  :label="0" :value="0"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="会计年度" prop="accountingYear">
                              <el-input v-model="formData.accountingYear" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款单号" prop="rbNo">
                              <el-input v-model="formData.rbNo" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款类别" prop="payeeCategory">
                              <el-select  v-model="formData.payeeCategory" placeholder="请选择" size="mini" clearable >
                                <el-option  :label="0" :value="0"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="付款银行账号" prop="payBankAccount">
                              <el-input v-model="formData.payBankAccount" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="创建人" prop="createdBy">
                              <el-input v-model="formData.createdBy" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="付款单位" prop="payCompanyName">
                              <el-input v-model="formData.payCompanyName" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="付款银行" prop="payeeCategory">
                              <el-input v-model="formData.payCompanyName" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款金额" prop="payeeAmt">
                              <el-input v-model="formData.payeeAmt" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="货币" prop="currencyCode">
                              <el-input v-model="formData.currencyCode" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="收款日期" prop="payeeDate">
                              <el-date-picker type="date" placeholder="日期选择" v-model="formData.payeeDate"
                                              size="mini" ></el-date-picker>                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="创建日期" prop="createdTime">
                              <el-date-picker type="date" placeholder="日期选择" v-model="formData.createdTime"
                                              size="mini" ></el-date-picker>                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="人民币汇率" prop="rmbCurrencyRate">
                              <el-input v-model="formData.rmbCurrencyRate" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="人民币总额" prop="name">
                              <el-input v-model="formData.name" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款汇率" prop="payeeRate">
                              <el-input v-model="formData.payeeRate" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款金额本位币" prop="payeeAmtBase">
                              <el-input v-model="formData.payeeAmtBase" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="外币扣费(外行)" prop="fcFeeOutbank">
                              <el-input v-model="formData.fcFeeOutbank" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="外币扣费本位币(外行)" prop="fcFeeOutbankBase">
                              <el-input v-model="formData.fcFeeOutbankBase" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款标志" prop="payeeIndent">
                              <el-select  v-model="formData.payeeIndent" placeholder="请选择" size="mini" clearable >
                                payeeIndent
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="收款银行" prop="currencyName">
                              <el-input v-model="formData.currencyName" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="外币扣费(收款行)" prop="fcFeeInbank">
                              <el-input v-model="formData.fcFeeInbank" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="外币扣费本位币(收款行)" prop="fcFeeInbankBase">
                              <el-input v-model="formData.fcFeeInbankBase" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="8">
                            <el-form-item label="账户标识" prop="peyeeAccountLabel">
                              <el-input v-model="formData.peyeeAccountLabel" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="收款状态" prop="payeeStatus">
                              <el-select  v-model="formData.payeeStatus" placeholder="请选择" size="mini" clearable >
                                <el-option  :label="0" :value="0"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="本币扣费" prop="bcFeeAmt">
                              <el-input v-model="formData.bcFeeAmt" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6" style="margin-bottom:2px">
                          <el-col :span="8">
                            <el-form-item label="本币扣费开户银行" prop="bcFeeBankAddress">
                              <el-input v-model="formData.bcFeeBankAddress" size="mini" ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="应收票据信息" name="second">
                      <el-form ref="form" label-width="86px" :model="formData">
                        <el-row :gutter="6">
                          <el-col :span="6">
                            <el-form-item label="票据台账编号" prop="instrumentBillNo">
                                <el-input v-model="formData.instrumentBillNo" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="付款单位" prop="payCompanyName">
                                <el-input v-model="formData.payCompanyName" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="开票日期" prop="invoiceDate">
                                <el-date-picker size="mini" v-model="formData.invoiceDate"  type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="票据号" prop="instrumentNo">
                                <el-input v-model="formData.instrumentNo" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="6">
                            <el-form-item label="收票日期" prop="receiptDate">
                                <el-date-picker size="mini" v-model="formData.receiptDate" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="票据类型" prop="invoiceType">
                                <el-select v-model="formData.invoiceType" placeholder="请选择" clearable size="mini">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="票据类型2" prop="name">
                                <el-select v-model="formData.type" placeholder="请选择" clearable size="mini">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="到期日期" prop="timelineDate">
                                <el-date-picker size="mini" v-model="formData.timelineDate" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6">
                          <el-col :span="6">
                            <el-form-item label="出票人" prop="invoiceBy">
                                <el-input v-model="formData.invoiceBy" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="收票人" prop="receiptBy">
                                <el-input v-model="formData.receiptBy" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="出票人银行帐号" prop="invoiceBankAccount">
                                <el-input v-model="formData.invoiceBankAccount" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="收票人银行帐号" prop="receiptBankAccount">
                                <el-input v-model="formData.receiptBankAccount" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="6" style="margin-bottom:2px">
                          <el-col :span="6">
                            <el-form-item label="出票人银行" prop="invoiceBankCode">
                                <el-input v-model="formData.invoiceBankCode" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="收票人银行" prop="receiptBankCode">
                                <el-input v-model="formData.receiptBankCode" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="收票目的" prop="receiptReson">
                                <el-input v-model="formData.receiptReson" size="mini"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="大票/小票" prop="isBig">
                                <el-select v-model="formData.isBig" placeholder="请选择" clearable size="mini">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                                </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="系统信息" name="sixth">
                      <el-form ref="form" label-width="80px" :model="formData" style="margin-top:16px">
                        <el-row :gutter="20">
                          <el-col :span="8">
                            <el-form-item label="创建人" prop="createdBy">
                              <el-col :span="18">
                              <el-input v-model="formData.createdBy" size="mini" :disabled="true"></el-input></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="修改人" prop="updatedBy">
                              <el-col :span="18">
                              <el-input v-model="formData.updatedBy" size="mini" :disabled="true"></el-input></el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="过账人" prop="postPersonName">
                              <el-col :span="18">
                              <el-input v-model="formData.postPersonName" size="mini" :disabled="true"></el-input></el-col>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:12px">
                          <el-col :span="8">
                            <el-form-item label="创建时间" prop="createdTime">
                              <el-col :span="18">
                              <el-date-picker v-model="formData.createdTime" type="datetime" size="mini" :disabled="true">
                                        </el-date-picker>
                              </el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="修改时间" prop="updatedTime">
                              <el-col :span="18">
                              <el-date-picker v-model="formData.updatedTime" type="datetime" size="mini" :disabled="true">
                                        </el-date-picker>
                              </el-col>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item label="过账时间" prop="postDate">
                              <el-col :span="18">
                                <el-date-picker v-model="formData.postDate" type="datetime" size="mini" :disabled="true">
                                        </el-date-picker>
                              </el-col>
                            </el-form-item>
                          </el-col>
                        </el-row>
                    </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-collapse-transition>
    </div>
    <div class="btn">
        <el-button type="warning" size="small">创 建</el-button>
        <el-button type="warning" size="small" icon="el-icon-delete" plain>删 除</el-button>
    </div>
    <div class="commonTable">
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
                    <el-select v-model="value4" clearable placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="scope.text == 'date'">
                    <el-date-picker v-model="list[scope.index]['date']" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div v-if="scope.text == 'input'">
                    <el-input v-model="list[scope.index]['name']"></el-input>
                </div>
            </template>
        </common-table>
    </div>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.currentPage"
      :page-sizes="[10, 20, 30,50]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> -->
  </div>
</template>
<script type="text/javascript">
  import router from '@/router'
  import ManagementSubject from 'components/common-select/management-subject.vue'//经营主体
  import DepartmentSubject from 'components/common-select/department-select.vue'//部门

  const headers = [
    { prop: 'checkbox', width: 80, type: 'selection'},
    { prop: 'rbRowNo', label: '收款单行号' ,width: 120},
    { prop: 'orgName', label: '部门',width: 120,editable: true },
    { prop: 'name', label: '部门描述',width: 120,editable: true },
    { prop: 'payeeCategory', label: '收款类别',width: 120 ,editable: true},
    { prop: 'payeeAmt', label: '收款金额',width: 120 ,editable: true},
    { prop: 'payeeAmtBase', label: '收款金额本位币',width: 120 ,editable: true},
    { prop: 'rmbAmt', label: '人民币金额',width: 120,editable: true },
    { prop: 'doNo', label: '外向交货单',width: 120 ,editable: true},
    { prop: 'soNo', label: '销售合同号',width: 120,editable: true },
    { prop: 'poNo', label: '采购订单',width: 120,editable: true },
    { prop: 'doInvoiceNo', label: '外销发票号',width: 120 ,editable: true},
    { prop: 'fcFeeOutbank', label: '外币扣费外行',width: 120 ,editable: true},
    { prop: 'fcFeeInbank', label: '外币扣费收款行',width: 120,editable: true },
    { prop: 'costCenterCode', label: '成本中心',width: 120 },
    { prop: 'fcFeeBase', label: '本币扣费',width: 120 },
    { prop: 'amtDesc', label: '款项内容',width: 120 },
    { prop: 'remark', label: '备注',width: 120 },
    { prop: 'isFirstShared', label: '认领标志',width: 120 },
    { prop: 'firstShareDate', label: '认领日期',width: 120 },
    { prop: 'isSendSap', label: '发送SAP',width: 120 },
    { prop: 'sendDate', label: '发送日期',width: 120 },
    { prop: 'name', label: '收款节点',width: 120 },
    { prop: 'name', label: '收款名称' ,width: 120},
  ];
  const baseList = [{
    orgName: '2016-05-03',
    payeeCategory: '王小虎',
    payeeAmt: '上海市普陀区金沙江路 1518 弄'
  }];
  export default {
    components:{
      ManagementSubject,
      DepartmentSubject
    },
    data(){
      return {
        activeName: 'first',
        listQuery:{
          pageSize:1,
          currentPage:2
        },
        total:100,
        searchBarFlg:true,
        formData:{
          payeeType:'',
          payeeIndent:'',
          payeeStatus:'',
        },
        payeeCategory:[],
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
        headers: headers,
        list: baseList
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCellClick(row, column, cell) {
        console.log(row, column, cell);
      },
      handleSelectionChange(row){
        console.log("表格点击",row)
      },
      //分页
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      },
      onClickAdd() {
//        router.push({ params: { type: 'add' } });
//        console.log(this.$route);
//        console.log(router);
        this.$store.dispatch('toggleCurrentView', {
          MoneyReceipt: {
            view: 'add'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      onClickEdit() {
//        router.push({ params: { type: 'edit' } });
        this.$store.dispatch('toggleCurrentView', {
          MoneyReceipt: {
            view: 'edit'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      onClickDetail() {
//        router.push({ params: { type: 'detail' } });
        this.$store.dispatch('toggleCurrentView', {
          MoneyReceipt: {
            view: 'look'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      onClickDel() {

      },
      toSave(){
//            this.$router.push({path: '/money/money-receipt/:type'});
        this.$store.dispatch('toggleCurrentView', {
          MoneyReceipt: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      toCancel(){
//            this.$router.push({path: '/money/money-receipt/:type'});
        this.$store.dispatch('toggleCurrentView', {
          MoneyReceipt: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      manageSubNameFill(val){ // 经营主体
        if(val){
          this.formData.manageSubName = val.companyName;
        }else {
          this.formData.manageSubName = '';
        }
      },
      bizOrgNameFill(val){ // 部门
        if(val){
          this.formData.bizOrgName = val.orgName;
        }else {
          this.formData.bizOrgName = '';
        }
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .moneyReceiptAdd .btn{
        padding:10px;
    }
    .el-tabs__content {
      overflow: inherit;
    }
</style>
