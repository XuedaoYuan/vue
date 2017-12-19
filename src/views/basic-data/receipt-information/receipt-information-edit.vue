<template>
    <div class="allTemplate purchaseContract" id="receiptDialog">
        <div class="info" style="margin-bottom: 15px">
            <div class="btn">
                <el-button type="primary" size="small" @click="toSave">保 存</el-button>
                <el-button type="info" size="small" @click="toCancel">取 消</el-button>
            </div>
            <div class="under-table">
                <el-tabs v-model="activeName1"  @tab-click="handleClick1">
                    <el-tab-pane label="客户" name="first">
                        <div class="planbtn">
                            <el-button type="warning" size="small" @click="detailedAddRow">创 建</el-button>
                            <!-- <el-button type="warning" size="small" icon="el-icon-delete" @click="detailedDeleteRow" plain>删 除</el-button> -->
                        </div>

                        <div class="table">
                            <common-table
                              :data="tableData"
                              :maxHeight="300"
                              :fit="true"
                              :headers="headers"
                              @cell-click="handleCellClick"
                              style="margin-bottom: 15px;">
                                <template slot="filter" slot-scope="scope">
                                </template>
                                <template slot-scope="scope" slot="default">
                                    <div v-if="scope.text == 'isDefalut'">
                                    </div>
                                    <div v-if="scope.text == 'customerName'" class="table-from">
                                        <customer-select  @childevent = "childEventHandlerCustomer" :querySelect="tableData[scope.index]['customerName']"></customer-select>
                                    </div>
                                    <div v-if="scope.text == 'radio'" class="tab-radio">
                                        <el-radio-group v-model="radio">
                                            <el-radio :label="tableData[scope.index]['$index']"></el-radio>
                                        </el-radio-group>
                                    <!-- <el-radio v-model="radio"></el-radio> -->
                                    </div>
                                </template>
                            </common-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="收货信息" name="second">
                        <div class="planbtn">
                            <el-button type="warning" size="small" @click="planAddRow" :disabled="addStatus">创 建</el-button>
                            <el-button type="warning" size="small" icon="el-icon-delete" @click="planDeleteRow" plain>删 除</el-button>
                        </div>
                        <div>
                            <common-table
                              :data="defaultAddressData"
                              :maxHeight="300"
                              :fit="true"
                              :headers="defaultAddressHeader"
                              @cell-click="addressCellClick"
                              @selection-change="addressSelectionChange"
                              style="margin-bottom: 15px;">
                                <template slot="filter" slot-scope="scope">
                                    <div v-if="scope.text == 'isDefalut'" class="receipt-checkbox">
                                        <el-checkbox-group size="small" v-model="checked">
                                            <el-checkbox :disabled="false" :label="defaultAddressData[scope.index]['$index']" @change="checkedChange(scope.index)"></el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </template>
                                <template slot-scope="scope" slot="default">
                                </template>
                            </common-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        doQueryWithPage,//查询接口
    } from '@/api/basic-data/receipt-information/receipt-information';
    import CustomerSelect from 'components/common-select/customer-select.vue' //客户
    const headers = [
        { prop: 'radio', label: '#', width: '55px',template: 'radio',fixed:'left',align:'center'},
        // { type: 'selection', width: '55px'},
        // { prop: 'manageSubName', label: '经营主体' ,align:'center', width: '150px',template: 'manageSubName'},
        { prop: 'customerName', label: '客户' ,align:'center',template: 'customerName'},
        { prop: 'customerCode', label: '客户code' ,align:'center'},
        // { prop: 'provinceId', label: '省份' ,align:'center',editable: true, width: '120px'},
        // { prop: 'cityId', label: '城市' ,align:'center',editable: true,digit: '2', width: '120px'},
        // { prop: 'countyId', label: '县区' ,align:'center',editable: true, width: '120px'},
    ];
    const defaultAddressHeader = [
        { type: 'selection', width: '55px'},
        { prop: 'contacts', label: '收货人' ,align:'center',editable: true, width: '230px'},
        { prop: 'contactsPhone', label: '联系电话' ,align:'center',editable: true, width: '230px'},
        { prop: 'contactsAddress', label: '收货地址' ,align:'center',editable: true},
        { prop: 'isDefalut', label: '是否为默认地址' ,align:'center', width: '180px',filter:'isDefalut'},
    ];
    export default {
        props: {
            updateId: null,
        },
        components: {
            CustomerSelect,//客户
        },
        data() {
            return {
                dialogVisible: false,
                activeName1:'first',
                tableData:[],
                headers:headers,
                defaultAddressHeader:defaultAddressHeader,
                defaultAddressData:[],
                addStatus:true,
                radio:null,
                index:null,
                addressList:[],
                checked:[],
                receiptAddList:[],//新增参数
                adressList:[],
                addressList:[],
                listQuery:{
                    pageSize:10,
                    currentPage:1
                },
                formData:{
                    customerId:''
                }
            };
        },
        watch: {
        },
        created(){
            this.getList();
        },
        methods: {
            toCancel() {
                this.refresh();
                this.$store.dispatch('toggleCurrentView',{
                    ReceiptInformation: {
                        view: 'index'
                        // params: 跳转过去的子组件的属性对象
                    }
                });
            },
            refresh(){
                this.tableData = [];//客户表
                this.defaultAddressData = [];//地址表
                this.checked = [];//默认地址
                this.addressList = [];
            },
            toSave() {
                // console.log("this.addressList",this.addressList);
                this.addressList.forEach((o,i) => {
                    o.forEach((obj,idx) => {
                        delete obj.$index;
                    })
                })
                this.receiptAddList = [];
                let obj = {};

                for(var i = 0; i < this.tableData.length; i++){
                    obj['customerId'] = this.tableData[i].customerId;
                    obj['customerCode'] = this.tableData[i].customerCode;
                    obj['customerName'] = this.tableData[i].customerName;
                    obj['adressList'] = this.addressList[i];
                    this.receiptAddList.push(obj);
                }
                console.log("this.receiptAddList",this.receiptAddList);
                console.log("this.tableData",this.tableData);
                if(this.receiptAddList != null){
                    doAddBbRgAdress(this.receiptAddList).then(response => {
                        if(response.data.status == 1){
                            this.$store.dispatch('toggleCurrentView',{
                                ReceiptInformation: {
                                    view: 'index'
                                    // params: 跳转过去的子组件的属性对象
                                }
                            })
                            this.refresh();
                        }
                    })
                }
            },
            getList() {
                if(this.updateId){
                    this.formData.customerId = this.updateId;
                    doQueryWithPage(this.listQuery,this.formData).then(response => {
                        console.log(response.data.status);
                        if(response.data.status == '1'){

                            this.tableData = [response.data.data.datalist[0]];
                            console.log("this.tableData",this.tableData);
                            this.defaultAddressData = response.data.datalist;
                        }
                    }).catch(() => {

                    })
                }
            },
            handleClick1(){

            },
            //客户新增
            detailedAddRow(){
                let addList = {
                    customerName : '',//客户新增
                    customerCode : '',//客户新增
                    customerId : '',//客户新增
                };
                this.tableData.push(addList);
                this.addressList.push([]);
            },
            //客户单击列表
            handleCellClick(val){
                this.index = val.$index;
                this.radio = val.$index;
                this.addStatus = false;
                if(this.addressList.length >= 0){
                    this.defaultAddressData = this.addressList[this.index];
                }
            },
            //客户弹框
            childEventHandlerCustomer(val){
                console.log(val,"val");
                if (val) {
                    this.tableData[this.index].customerName = val.custName;
                    this.tableData[this.index].customerCode = val.custCode;
                    this.tableData[this.index].customerId = val.id;
                    console.log(this.tableData);
                } else {
                    this.tableData[this.index].customerName = '';
                    this.tableData[this.index].customerCode = '';
                    this.tableData[this.index].customerId = '';
                }
            },
            //***************地址新增****************
            planAddRow(){
                this.checked = [];
                let addList = {
                        contacts:'',//收货人
                        contactsPhone:'',//联系电话
                        contactsAddress:'',//收货地址
                        isDefalut:'1',//是否为默认地址
                    }
                this.defaultAddressData.push(addList);
            },
            //地址删除
            planDeleteRow(){
                if(this.defaultSelectList.length < 1){
                    this.$message({
                        message: '请选择一行或多行进行删除',
                        type: 'warning'
                    });
                }else {
                    this.$confirm('确定删除?', '删除', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.defaultSelectList.forEach((x,i) => {
                            let idx = this.defaultSelectList.findIndex((val) => val == x);
                            idx>-1 && this.defaultSelectList.splice(idx, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                    })
                }
            },
            //地址单击列表
            addressCellClick(){

            },
            //地址复选框
            addressSelectionChange(val){
                this.addressList = val;
            },
            //是否为默认地址
            checkedChange(index){
                this.defaultAddressData[index].isDefalut = '1';
                this.checked = [];
                this.checked.push(index);
                this.defaultAddressData[index].isDefalut = '0';
            }
        },
    };
</script>
<style rel="stylesheet/scss">
#receiptDialog .planbtn{
    margin-bottom:8px;
}
#receiptDialog .v-model{
    z-index:2000;
}
#receiptDialog .tab-radio .el-radio__label{
    display:none;
}
#receiptDialog .receipt-checkbox .el-checkbox__label{
    display:none;
}
</style>
