<template>
<div class="allTemplate">
    <div class="moneyReceiptAddHeader">
        <el-form ref="form" label-width="120px" :model="tempAll">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="经营主体" prop="manageSubCode">
                        <el-col :span="12">
                            <el-input v-model="tempAll.manageSubCode" size="mini"></el-input>
                        </el-col>
                        <el-col :span="12">
                          <el-input v-model="tempAll.manageSubName" size="mini" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="认领部门" prop="bizOrgCode">
                        <el-col :span="12">
                            <el-input v-model="tempAll.bizOrgCode" size="mini"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="tempAll.bizOrgName" size="mini" :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="收款单号" prop="currencyName">
                        <el-col :span="24">
                            <el-input v-model="tempAll.currencyName" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款类别" prop="payeeCategory">
                        <el-col :span="24">
                            <el-select v-model="tempAll.payeeCategory" placeholder="请选择" clearable size="mini">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款方式" prop="payeeType">
                        <el-col :span="24">
                            <el-select v-model="tempAll.payeeType" placeholder="请选择" clearable size="mini">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="会计年度" prop="accountingYear">
                        <el-col :span="24">
                            <el-input v-model="tempAll.accountingYear" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="付款单位" prop="payCompanyName">
                        <el-col :span="24">
                            <el-input v-model="tempAll.payCompanyName" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="付款银行" prop="currencyName">
                        <el-col :span="24">
                            <el-input v-model="tempAll.currencyName" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="付款银行账号" prop="payBankAccount">
                        <el-col :span="24">
                            <el-input v-model="tempAll.payBankAccount" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建人" prop="createdBy">
                        <el-col :span="24">
                            <el-input v-model="tempAll.createdBy" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="收款日期" prop="payeeDate">
                        <el-col :span="24">
                            <el-date-picker size="mini" v-model="tempAll.payeeDate" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建日期" prop="createdTime">
                        <el-col :span="24">
                            <el-date-picker size="mini" v-model="tempAll.createdTime" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款金额" prop="payeeAmt">
                        <el-col :span="24">
                            <el-input v-model="tempAll.payeeAmt" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="货币" prop="currencyCode">
                        <el-col :span="24">
                            <el-input v-model="tempAll.currencyCode" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="收款汇率" prop="payeeRate">
                        <el-col :span="24">
                            <el-input v-model="tempAll.payeeRate" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款金额本位币" prop="payeeAmtBase">
                        <el-col :span="24">
                            <el-input v-model="tempAll.payeeAmtBase" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人民币汇率" prop="rmbCurrencyRate">
                        <el-col :span="24">
                            <el-input v-model="tempAll.rmbCurrencyRate" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="人民币总额" prop="name">
                        <el-col :span="24">
                            <el-input v-model="tempAll.currencyName" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="收款标志" prop="name">
                        <el-col :span="24">
                            <el-select v-model="tempAll.type" placeholder="请选择" clearable size="mini">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款银行" prop="currencyName">
                        <el-col :span="24">
                            <el-input v-model="tempAll.currencyName" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="外币扣费(外行)" prop="fcFeeOutbank">
                        <el-col :span="24">
                            <el-input v-model="tempAll.fcFeeOutbank" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6" class="labelWidth">
                    <el-form-item label="外币扣费本位币(外行)" style="margin-left:-28px" label-width="148px" prop="fcFeeOutbankBase">
                        <el-col :span="24">
                            <el-input v-model="tempAll.fcFeeOutbankBase" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="账户标识" prop="peyeeAccountLabel">
                        <el-col :span="24">
                            <el-input v-model="tempAll.peyeeAccountLabel" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款状态" prop="currencyName">
                        <el-col :span="24">
                            <el-select v-model="tempAll.type" placeholder="请选择" clearable size="mini">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="外币扣费(收款行)" prop="fcFeeInbank">
                        <el-col :span="24">
                            <el-input v-model="tempAll.fcFeeInbank" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6" class="labelWidth">
                    <el-form-item label="外币扣费本位币(收款行)"  style="margin-left:-21px" label-width="148px" prop="fcFeeInbankBase">
                        <el-col :span="24">
                            <el-input v-model="tempAll.fcFeeInbankBase" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>

</div>
</template>


<script>
export default {
    data(){
        return {
            tempAll:{
                manageSubName:'',//经营主体name
                manageSubCode:'',//经营主体code
                //认领部门
                //收款单号
                payeeCategory:'',//收款类型
                payeeType:'',//收款方式
                accountingYear:'',//会计年度
                payCompanyName:'',//付款单位
                // 付款银行
                payBankAccount:'',//付款银行账号
                createdBy:'',//创建人
                payeeDate:'',//收款日期
                createdTime:'',//创建日期
                payeeAmt:'',//收款金额
                currencyCode:'',//货币
                payeeRate:'',//收款汇率
                payeeAmtBase:'',//收款金额本位币
                rmbCurrencyRate:'',//人民币汇率
                // 人民币总额
                // 收款标志
                // 收款银行
                fcFeeOutbank:'',//外币扣费(行外)
                fcFeeOutbankBase:'',//外币扣费本位币(外行)
                peyeeAccountLabel:'',//账户标识
                // 收款状态
                fcFeeInbank:'',//外币扣费(收款行)
                fcFeeInbankBase:'',//外币扣费本位币(收款行)
            },
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

        }
    }
}
</script>
<style scoped>
.el-form-item {
    margin-bottom:0;
}
.moneyReceiptAddHeader .el-col.labelWidth .el-form-item__label{
    width:150px !important;
    padding:0 !important;
    margin-left:-50px !important;
}
</style>