<template>
  <div class="allTemplate">
    <div class="info" style="margin-bottom: 10px">
      <el-button type="primary" size="small" @click="AddClick" :disabled="AddStatus">生成出库单</el-button>
      <el-button type="info" size="small" @click="BackClick">返回列表</el-button>
    </div>
    <div class="table ware_looktable" style="margin-bottom:50px;">
      <div class="commonTable">
        <common-table
        :data="tableData1"
        :maxHeight="300" :rowSelection="false"
        :fit="true" ref="listTable"
        :headers="header1"
        @row-click="handleCellClick1"
        @selection-change="handleSelectionChange1"
        >
          <template slot="filter" slot-scope="scope">
            <div v-if="scope.text == 'packType'">
              <span>{{tableData1[scope.index]['packType'] | packType}}</span>
            </div>
            <div v-if="scope.text == 'contractQtyW'">
              <span>{{tableData1[scope.index]['contractQty'] - tableData1[scope.index]['outstockQty']}}</span>
            </div>
          </template>
      </common-table>
    </div>
</div>
<!-- <el-collapse-transition>
  <div v-show="tableData2Show"> -->
      <div class="table">
        <div class="commonTable" >
          <common-table
          :data="tableData2"
          :maxHeight="300" :rowSelection="false"
          :fit="true" ref="tableTwo"
          :headers="header2"
          @cell-click="handleCellClick2"
          @selection-change="handleSelectionChange2"
          >
            <template slot-scope="scope" slot="default">
              <!-- <div v-if="scope.text == 'seriesNo'">
                  <series-select @childevent="childEventHandlerSeries" :querySelect="tableData2[scope.index]['seriesNo']"></series-select>
              </div> -->
              <div v-if="scope.text == 'settleQty'">
                  <el-input v-number-only:10.abs="2"  v-model="tableData2[scope.index]['settleQty']" @input="settleQtyIpt(tableData2[scope.index])" size='mini'></el-input>
              </div>
            </template>
            <template slot="filter" slot-scope="scope">

            </template>
          </common-table>
        </div>
      </div>
<!--   </div>
</el-collapse-transition> -->
  </div>
</template>
<script>
  import {
    doGetForSoOs,
    doCusSaveSoOs,
    doQueryCusAll
  } from 'api/sales-process/delivery-instructions/delivery-instructions.js'
  import { deliveryPrice } from '@/util'
  import SeriesSelect from 'components/common-select/series-select.vue' //批次号弹框
  const header1 = [
  { type: 'selection', width: '55px'},
  {prop: 'index', type: 'index', label: '行号', fixed: "left"},
  {prop: 'soContractNo', label: '销售合同号',align: 'center',width:'160px'},
  {prop: 'goodsCode', label: '物料编码',align: 'center'},
  {prop: 'goodsName', label: '物料名称',align: 'center'},
  {prop: 'applyDeliveryQty', label: '申请发货数量',align: 'center',width:'120px'},
  {prop: 'packType', label: '包装方式',align: 'center',filter:'packType'},
  {prop: 'contractQty', label: '合同数',align: 'center'},
  {prop: 'contractQtyW', label: '未发数量',align: 'center',filter:'contractQtyW'},
  {prop: 'deliveryStartDate', label: '交货开始时间',align: 'center',dataType: 'Date',width:'100px'},
  {prop: 'deliveryEndDate', label: '交货截止时间',align: 'center',dataType: 'Date',width:'100px'},
  {prop: 'supBatchNo', label: '供应商批号',align: 'center',width:'100px'},
  {prop: 'contactsAddress', label: '收货地址',align: 'center'},
  {prop: 'contacts', label: '联系人',align: 'center'},
  {prop: 'contactsPhone', label: '联系电话',align: 'center'},
  {prop: 'orginPriceTex', label: '原币单价（含税）',align: 'center','width':'120px', digit: '6'},
  {prop: 'orginAmtTex', label: '原币金额（含税）',align: 'center','width':'120px', digit: '2'},
  {prop: 'remark', label: '备注',align: 'center'},
  ];
  const header2 = [
  { type: 'selection', width: '55px'},
  {prop: 'index', type: 'index', label: '行号', fixed: "left"},
  {prop: 'goodsName', label: '物料名称',align: 'center'},
  {prop: 'outstockQty', label: '出库数',align: 'center',editable: true ,required: true,digit:'2'},
  {prop: 'settleQty', label: '出库结算数量', width: '120px',align: 'center',required: true,digit:'2',template: 'settleQty'},
  {prop: 'outNums', label: '出库件数',align: 'center',editable: true,required: true ,digit:'2'},//,template: 'outNums'自定义
  {prop: 'seriesNo', label: '批次',align: 'center',required: true,width:'140px'},//,template: 'seriesNo'
  {prop: 'cabinetNo', label: '柜号',align: 'center'},
  {prop: 'supplierBatchNo', label: '供应商批号',align: 'center'},
  {prop: 'productDate', label: '供方生产日期', width: '120px',align: 'center',dataType: 'Date'},
  {prop: 'warehouseName', label: '仓库',align: 'center'},
  {prop: 'stockQty', label: '库存数量',align: 'center'},
  {prop: 'qty', label: '库存件数',align: 'center'},
  ];

  export default {
    props:{
      passInfo:'',
    },
    components:{
      SeriesSelect
    },
    data(){
      return {
        title: '',
        header1: header1,
        header2: header2,
        tableData1: [],
        tableData2: [],
        tempAll:{},
        value4: '',
        packType: ENUMS["7135"],//包装方式
        selectchange1:'',
        selectchange2:'',
        checkStatus: {},
        selectedItem: {},
        checkedAllItem: {},//下面选中
        attrRadio: null,
        AddStatus:true,
        tableData2Show:false,//下表显示？
        rowIndex:null,
      }
    },
    filters:{
      packType(val) {
        return ENUMS["7135"][val];
      },
    },
    created(){
      this.getDetail();
    },
    methods:{
      getDetail(){
        var passInfo = this.$store.getters.params.DeliveryInstructions.passInfo;
        if(passInfo){
          doQueryCusAll(passInfo).then(response=>{
            if(response.data.status==1){
              this.tempAll = response.data.data.codDinVO;
              this.tableData1 = response.data.data.codDinDtlVO;
            }
          })
        }
      },
      //生成出库单
      AddClick(){
        let checkedAllItem = [];
        // console.log(this.checkedAllItem,'this.checkedAllItem');
        for (var key in this.checkedAllItem) {
          if (this.checkedAllItem[key].length > 0) {
            this.checkedAllItem[key].forEach((o, i) => {
              checkedAllItem.push({
                // osDtlRowNo:i+1,
                warehouseName:o.warehouseName,
                warehouseId:o.warehouseId,
                warehouseCode:o.warehouseCode,
                outstockQty:o.outstockQty,
                settleQty:o.settleQty,
                qty:o.outNums,
                seriesNo:o.seriesNo,
                seriesId:o.seriesId,
                soDtlId:o.soDtlId,
                // contactsAddress:o.contactsAddress,
                deliveryAddress:o.contactsAddress,
                contacts:o.contacts,
                contactsPhone:o.contactsPhone,
                orginPriceTex:o.orginPriceTex,
                texRate:o.texRate,
                basePrice:o.basePrice,
                basePriceTex:o.basePriceTex,
                baseAmt:o.baseAmt,
                baseAmtTex:o.baseAmtTex,
                orginAmt:o.orginAmt,
                orginPrice:o.orginPrice,
                amtTex:o.orginPrice,
                texAmt:o.orginTexAmt,//税额
                orginAmtTex:o.orginAmtTex,
                amt:o.orginAmtTex,
                cabinetNo:o.cabinetNo,
                tableType:o.tableType,
                goodsCode:o.goodsCode,
                goodsId:o.goodsId,
                goodsName:o.goodsName,
                packType:o.packType,
                unitId:o.unitId,
                unitCode:o.unitCode,
                unitName:o.unitName,
                dinDtlId:o.dinDtlId,
                soNo:o.soNo,
                soContractNo:o.soContractNo,
                productDate:o.productDate,
                supplierBatchNo:o.supplierBatchNo,
                manageSubCode:this.tempAll.manageSubCode,
                manageSubId:this.tempAll.manageSubId,
                manageSubName:this.tempAll.manageSubName,
                bizOrgCode:this.tempAll.bizOrgCode,
                bizOrgId:this.tempAll.bizOrgId,
                bizOrgName:this.tempAll.bizOrgName,
                buyerCode:this.tempAll.buyerCode,
                buyerId:this.tempAll.buyerId,
                buyerName:this.tempAll.buyerName,
                customerCode:this.tempAll.customerCode,
                customerId:this.tempAll.customerId,
                customerName:this.tempAll.customerName,
                currencyCode:this.tempAll.currencyCode,
                currencyId:this.tempAll.currencyId,
                currencyName:this.tempAll.currencyName,
                // remark:this.tempAll.remark,
                rateCurrency:this.tempAll.rateCurrency,
                dinNo:this.tempAll.dinNo,
              });
            });
          }
        }

        console.log(checkedAllItem,'checkedAllItem');
        // -------------------------------
        var map = {},
            dest = [];
        for(var i = 0; i < checkedAllItem.length; i++){
            var ai = checkedAllItem[i];
            if(!map[ai.warehouseName]){
                dest.push({
                    warehouseName: ai.warehouseName,
                    contacts: ai.contacts,
                    deliveryAddress: ai.deliveryAddress,
                    contactsPhone: ai.contactsPhone,
                    data: [ai]
                });
                map[ai.warehouseName] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj.warehouseName == ai.warehouseName && dj.deliveryAddress == ai.deliveryAddress && dj.contacts == ai.contacts && dj.contactsPhone == ai.contactsPhone){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        var newArrInfo = [];
        for(var i=0;i<dest.length;i++){
          var newIndex = dest[i].data;
          newIndex.forEach((o,i)=>{
            o["osDtlRowNo"] = i+1
          })
          newArrInfo.push(newIndex);
        }
     /*   newArrInfo.forEach((o1,i)=>{
          o1.forEach((o2,i)=>{
            delete o2.contactsAddress;
          })
        })*/
        console.log(newArrInfo,'newArrInfo');
        eventBus.$emit('validateTable', {
              data: this.selectchange2,    //表示表格数据
              headers: this.header2,   //表示表头数据
              success: (valid)=>{   //成功回掉
                if (valid) {
                  this.$confirm('您确认要生成出库单吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  }).then(() => {
                    doCusSaveSoOs(newArrInfo).then(response=>{
                      if(response.data.status ==1){
                        this.$notify({
                          title: '成功',
                          message: '生成出库单成功！',
                          type: 'success'
                        });
                        this.BackClick();
                      }
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消操作'
                    });
                  });

                }
              }
            })

        // --------------------------------------
      },
      //返回列表
      BackClick(){
        this.$store.dispatch('toggleCurrentView', {
          DeliveryInstructions: {
            view: 'index'
            // params: 跳转过去的子组件的属性对象
          }
        });
      },
      //单击1
      handleCellClick1(row){
        this.selectedItem = row;
        this.attrRadio = row.$index;
        this.checkStatus[row.$index] = !this.checkStatus[row.$index];

        this.$refs.listTable.toggleRowSelection(row, this.checkStatus[row.$index]);
        if (!this.checkStatus[row.$index]) {
          this.checkedAllItem[row.$index] = [];
        }
        var info = [];
        info.push({
          "manageSubCode":this.tempAll.manageSubCode,
          "goodsId":row.goodsId,
          "bizOrgCode":this.tempAll.bizOrgCode,
        })
        this.tableData2Show = false;
        doGetForSoOs(info).then(response=>{
          if(response.data.status ==1){
            this.tableData2 = response.data.data.datalist;
            for(var i=0;i<this.tableData2.length;i++){
              this.tableData2[i]["contactsAddress"]=row.contactsAddress;
              this.tableData2[i]["contacts"]=row.contacts;
              this.tableData2[i]["unitName"]=row.unitName;
              this.tableData2[i]["unitId"]=row.unitId;
              this.tableData2[i]["unitCode"]=row.unitCode;
              this.tableData2[i]["packType"]=row.packType;
              this.tableData2[i]["contactsPhone"]=row.contactsPhone;
              this.tableData2[i]["orginPriceTex"]=row.orginPriceTex;//原币单价(含税)
              this.tableData2[i]["texRate"]=row.texRate;//汇率
              this.tableData2[i]["dinDtlId"]=row.dinDtlId;
              this.tableData2[i]["soDtlId"]=row.soDtlId;
              this.tableData2[i]["soNo"]=row.soNo;
              this.tableData2[i]["soContractNo"]=row.soContractNo;

              this.tableData2[i]["basePrice"]='';//本位币单价（不含税）
              this.tableData2[i]["basePriceTex"]='';//本位币单价(含税)
              this.tableData2[i]["baseAmt"]='';//本位币金额(不含税)
              this.tableData2[i]["baseAmtTex"]='';//本位币金额(含税)
              this.tableData2[i]["orginAmt"]='';//原币金额(不含税)
              this.tableData2[i]["orginPrice"]='';//原币单价(不含税)
              this.tableData2[i]["orginAmtTex"]='';//原币金额(含税)

              this.tableData2[i]["outstockQty"]='';//出库数
              this.tableData2[i]["settleQty"]='';//出库结算数
              this.tableData2[i]["outNums"]='';
              this.tableData2[i]["amt"]='';
              this.tableData2[i]["amtTex"]='';
              this.tableData2[i]["texAmt"]='';
            }
            setTimeout(() => {
                this.tableData2Show = true;
            }, 300);
            this.$nextTick(() => {
              for (var value of this.tableData2) {
                this.$refs.tableTwo.toggleRowSelection(value, this.checkStatus[row.$index]);
              }
            });
          }
        })
      },
      settleQtyIpt(row){
        setTimeout(() => {
          this.calculateOrderDatail(row);
        }, 10);
      },
      calculateOrderDatail(row){//明细金额计算
          var caculatePrice = deliveryPrice({
            "priceTex":row.orginPriceTex,
            "applyDeliveryQty":row.settleQty,
            "texRate":row.texRate,
            "rateCurrency":this.tempAll.rateCurrency,
          })
          row.baseAmt = caculatePrice.baseAmt;
          row.baseAmtTex = caculatePrice.baseAmtTex;
          row.basePrice = caculatePrice.basePrice;
          row.basePriceTex = caculatePrice.basePriceTex;
          row.baseTexAmt = caculatePrice.baseTexAmt;
          row.orginAmt = caculatePrice.orginAmt;
          row.orginAmtTex = caculatePrice.orginAmtTex;
          row.orginPrice = caculatePrice.orginPrice;
          row.orginTexAmt = caculatePrice.orginTexAmt;
      },
      // 表格循环
      commonCaculatePrice(iIndex){
          // 原币金额（含税） = 申请发货数量 * 含税单价
          iIndex.orginAmtTex = iIndex.settleQty * iIndex.orginPriceTex;
          // 原币单价（含税）    含税单价 = 含税金额/数量
          //原币单价（不含税）  无税单价 = ( 含税金额 - 含税金额/(1 + 税率)*税率)/数量
          iIndex.orginPrice = (iIndex.orginAmtTex - iIndex.orginAmtTex/(1+iIndex.texRate)*iIndex.texRate)/iIndex.settleQty;
          // 原币金额（不含税）
          iIndex.orginAmt = iIndex.orginPrice * iIndex.settleQty;
          // 原币税额 = （数量 * 含税单价）/（1 + 税率） * 税率
          iIndex.orginTexAmt = (iIndex.settleQty * iIndex.orginPriceTex)/(1+iIndex.texRate)*iIndex.texRate;
          /** 本币单价（含税）本币含税单价 = 原币含税单价 * 对人民币汇率  */
          iIndex.basePriceTex = iIndex.orginPriceTex * this.tempAll.rateCurrency;
          /** 本币单价（不含税） 本币无税单价 = 原币无税单价 * 对人民币汇率 */
          iIndex.basePrice = iIndex.orginPrice * this.tempAll.rateCurrency;
          /** 本币金额（不含税）本币税前金额 = 原币税前金额 * 对人民币汇率   */
          iIndex.baseAmt = iIndex.orginAmt * this.tempAll.rateCurrency;
          /** 本币金额（含税）本币含税金额 = 本币税前金额 + 本币税额   */
          iIndex.baseTexAmt = iIndex.orginTexAmt * this.tempAll.rateCurrency;//本币税额
          iIndex.baseAmtTex = iIndex.baseAmt + iIndex.baseTexAmt;
      },
      // 多选1
      handleSelectionChange1(val){
        this.selectchange1 = val;
      },
      //单击2
      handleCellClick2(val){
        this.rowIndex = val.$index;
      },
      // 多选2
      handleSelectionChange2(val){
        this.selectchange2 = val;
        if (val.length == 0) {
          this.$refs.listTable.toggleRowSelection(this.selectedItem, false);
        } else {
          this.$refs.listTable.toggleRowSelection(this.selectedItem, true);
        }
        this.checkedAllItem[this.selectedItem.$index] = val;
      },
      childEventHandlerSeries(val){//批次号
        if(val){
          this.tableData2[this.rowIndex].seriesNo = val.seriesNo;
          this.tableData2[this.rowIndex].seriesId = val.seriesId;
        }else {
          this.tableData2[this.rowIndex].seriesNo = '';
          this.tableData2[this.rowIndex].seriesId = '';
        }
      },
    },
    watch:{
      selectchange2:function(val){
        if(val.length>0){
          this.AddStatus = false;
        }else {
          this.AddStatus = true;
        }
      }
    }
  }
</script>

<style>
  .ware_looktable table tr th:first-child label {
        display: none;
    }
</style>
