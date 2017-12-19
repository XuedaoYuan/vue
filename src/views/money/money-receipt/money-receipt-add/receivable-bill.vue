<template>
<div class="allTemplate">
    <div class="moneyReceiptAddHeader">
        <el-form ref="form" label-width="120px" :model="tempAll">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="票据台账编号" prop="instrumentBillNo">
                        <el-col :span="24">
                            <el-input v-model="tempAll.instrumentBillNo" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="付款单位" prop="payCompanyName">
                        <el-col :span="24">
                            <el-input v-model="tempAll.payCompanyName" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="开票日期" prop="invoiceDate">
                        <el-col :span="24">
                            <el-date-picker size="mini" v-model="tempAll.invoiceDate" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="票据号" prop="instrumentNo">
                        <el-col :span="24">
                            <el-input v-model="tempAll.instrumentNo" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="收票日期" prop="receiptDate">
                        <el-col :span="24">
                            <el-date-picker size="mini" v-model="tempAll.receiptDate" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="票据类型" prop="invoiceType">
                        <el-col :span="24">
                            <el-select v-model="tempAll.invoiceType" placeholder="请选择" clearable size="mini">
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
                    <el-form-item label="票据类型2" prop="name">
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
                    <el-form-item label="到期日期" prop="timelineDate">
                        <el-col :span="24">
                            <el-date-picker size="mini" v-model="tempAll.timelineDate" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="出票人" prop="invoiceBy">
                        <el-col :span="24">
                            <el-input v-model="tempAll.invoiceBy" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收票人" prop="receiptBy">
                        <el-col :span="24">
                            <el-input v-model="tempAll.receiptBy" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="出票人银行帐号" prop="invoiceBankAccount">
                        <el-col :span="24">
                            <el-input v-model="tempAll.invoiceBankAccount" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收票人银行帐号" prop="receiptBankAccount">
                        <el-col :span="24">
                            <el-input v-model="tempAll.receiptBankAccount" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="出票人银行" prop="invoiceBankCode">
                        <el-col :span="24">
                            <el-input v-model="tempAll.invoiceBankCode" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收票人银行" prop="receiptBankCode">
                        <el-col :span="24">
                            <el-input v-model="tempAll.receiptBankCode" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收票目的" prop="receiptReson">
                        <el-col :span="24">
                            <el-input v-model="tempAll.receiptReson" size="mini"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="大票/小票" prop="isBig">
                        <el-col :span="24">
                            <el-select v-model="tempAll.isBig" placeholder="请选择" clearable size="mini">
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
                instrumentBillNo:'',//票据台账编号
                payCompanyName:'',//付款单位
                invoiceDate:'',//开票日期
                instrumentNo:'',//票据号
                receiptDate:'',//收票日期
                invoiceType:'',//票据类型
                //票据类型2
                timelineDate:'',//到期日期
                invoiceBy:'',//出票人
                receiptBy:'',//收票人
                invoiceBankAccount:'',//出票人银行帐号
                receiptBankAccount:'',//收票人银行帐号
                invoiceBankCode:'',//出票人银行
                receiptBankCode:'',//收票人银行
                receiptReson:'',//收票目的
                isBig:'',//大票/小票
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
.moneyReceiptAddHeader {
    padding-bottom:10px;
    /* border-bottom:1px solid #ccc; */
}
</style>