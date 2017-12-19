<template>
    <div class="allTemplate">
        <div class="info" style="margin-bottom: 15px">
            <el-form ref="form" label-width="110px" :model="tempAll">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="系统单据号" prop="poNo">
                            <el-col :span="24">
                                <el-input v-model="tempAll.poNo" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="采购合同号" prop="poContractNo">
                            <el-col :span="24">
                                <el-input v-model="tempAll.poContractNo" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="采购员" prop="buyerName">
                            <el-col :span="24">
                                <el-input v-model="tempAll.buyerName" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同类型" prop="poType">
                            <el-col :span="24">
                                <el-input v-model="tempAll.poType" size="mini" :disabled="true"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="经营主体" prop="manageSubCode">
                            <el-col :span="12">
                              <el-input v-model="tempAll.manageSubCode" size="mini"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="manageSubName">
                                    <el-input v-model="tempAll.manageSubName" size="mini" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门" prop="bizOrgCode">
                            <el-col :span="12">
                              <el-input v-model="tempAll.bizOrgCode" size="mini"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="bizOrgName">
                                    <el-input v-model="tempAll.bizOrgName" size="mini" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="供应商" prop="supplierCode">
                            <el-col :span="12">
                              <el-input v-model="tempAll.supplierCode" size="mini"></el-input>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="supplierName">
                                    <el-input v-model="tempAll.supplierName" size="mini" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同状态" prop="poStatus">
                            <el-col :span="24">
                                <el-select style="width: 100%;"  v-model="tempAll.poStatus" placeholder="请选择活动区域" size="mini" :disabled="true">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="溢短装数量" prop="lessQty">
                            <el-col :span="24">
                                <el-input v-model="tempAll.lessQty" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="签署日期" prop="signDate">
                            <el-col :span="24">
                                <el-date-picker
                                  v-model="tempAll.signDate"
                                  type="date"
                                  placeholder="选择日期"
                                  style="width: 100%;"
                                  size="mini">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="贸易地区" prop="tradeZoneName">
                            <el-col :span="24">
                                <el-input v-model="tempAll.tradeZoneName" size="mini" :disabled="true"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="运输方式" prop="transType">
                            <el-col :span="24">
                                <el-select style="width: 100%;"  v-model="tempAll.transType" placeholder="请选择活动区域" size="mini">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="计重标准" prop="weightStandType">
                            <el-col :span="24">
                               <el-select style="width: 100%;"  v-model="tempAll.weightStandType" placeholder="请选择活动区域" size="mini" :disabled="true">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="交货期限" prop="deliveryDateStart">
                            <el-col :span="12">
                               <el-date-picker type="date" placeholder="选择时间区间" v-model="tempAll.deliveryDateStart" style="width: 100%;" size="mini"></el-date-picker>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item prop="deliveryDateEnd">
                                    <el-date-picker type="date" placeholder="选择时间区间" v-model="tempAll.deliveryDateEnd" style="width: 100%;" size="mini"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="提货方式" prop="pickUpTypr">
                            <el-col :span="24">
                                <el-select style="width: 100%;"  v-model="tempAll.pickUpTypr" placeholder="请选择活动区域" size="mini">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="OA审核标题" prop="auitTitle">
                            <el-col :span="24">
                                <el-input v-model="tempAll.auitTitle" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="包装方式" prop="rateCurrency">
                            <el-col :span="24">
                                <el-input v-model="tempAll.rateCurrency" size="mini" :disabled="true"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-form-item label="备注" prop="remark">
                            <el-col :span="24">
                                <el-input v-model="tempAll.remark" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                   <!--  <el-col :span="6">
                        <el-form-item label="关税" prop="tariff">
                            <el-col :span="24">
                                <el-input v-model="tempAll.tariff" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="委托方" prop="entrustPartyName">
                            <el-col :span="24">
                               <el-input v-model="tempAll.entrustPartyName" size="mini"></el-input>
                           </el-col>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <!-- <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="委托协议号" prop="date1">
                            <el-col :span="24">
                                <el-input v-model="tempAll.name" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-col :span="24">
                                <el-input v-model="tempAll.remark" size="mini"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tempAll:{
                    poNo:'',//系统单据号
                    poContractNo:'',//采购合同号
                    buyerName:'',//采购员
                    poType:'',//合同类型
                    manageSubCode:'',//经营主体code
                    manageSubName:'',//经营主体name
                    bizOrgCode:'',//部门code
                    bizOrgName:'',//部门name
                    supplierCode:'',//供应商code
                    supplierName:'',//供应商name
                    poStatus:'',//合同状态
                    lessQty:'',//溢短装数量
                    signDate:'',//签署日期
                    tradeCountry:'',//贸易国别
                    transType:'',//运输方式
                    weightStandType:'',//计重标准
                    deliveryDateStart:'',//交货期限始
                    deliveryDateEnd:'',//交货日期止
                    pickUpTypr:'',//提货方式
                    currencyName:'',//币别
                    rateCurrency:'',//对人民币汇率
                    portName:'',//目的港
                    tariff:'',//关税
                    entrustPartyName:'',//委托方
                    //委托协议号
                    auitTitle:'',//OA审核标题
                    remark:'',//备注
                }
            }
        },
        methods:{
            getFrom(){
                console.log(this.tempAll);
            }
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
