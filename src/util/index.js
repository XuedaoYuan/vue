import moment from 'moment';
import NP from 'number-precision';
/**
 * 对象深拷贝
 */
export function deepCopy(flowNodeModal) {
  //创建属性窗口深拷贝
  if (flowNodeModal instanceof Array) {
    var newFlowNodeModal = [];
    for (var i = 0; i < flowNodeModal.length; ++i) {
      newFlowNodeModal[i] = deepCopy(flowNodeModal[i]);
    }
    return newFlowNodeModal;

  } else if (flowNodeModal instanceof Object) {
    var renewFlowNodeModal = {};
    for (var obj in flowNodeModal) {
      renewFlowNodeModal[obj] = deepCopy(flowNodeModal[obj]);
    }
    return renewFlowNodeModal;
  } else {
    return flowNodeModal;
  }
}

/*
 *@des: 选中删除的row
 *@params: 第一个参数是全部的row，第二个参数是选中的row， 都是数组
 *           第三个参数是唯一的key，根据什么key删除，可以是行号或者唯一的id
 *@return:返回删除后的结果，需要在外面重新复制
 */
export function deleteSelectedRows(rows, selectedRows, uniqueKey) {

  var len1 = rows.length;
  var len2 = selectedRows.length;
  var results = []; //保存不相等的值
  // poGrRowNo
  for (var i = 0; i < len1; i++) { //全部的
    var obj = rows[i];
    var flag = true;
    for (var j = 0; j < len2; j++) {
      if (obj[uniqueKey] == selectedRows[j][uniqueKey]) {
        flag = false; //是相等的， 不需要了 直接退出
        break;
      }
    }
    // 走完for还是true， 说明没有一个相等,是需要的
    if (flag) {
      results.push(obj);
    }

  }
  // 最好在外面重置一下选中的rows数组，置为[]
  return results;
}



/**
 * 日期格式化
 */
export function parseTime(val, formatter) {
  return moment(val).format(formatter);
}

/**
 * 便捷显示时间
 */
export const pickerOptions = [{
  text: '今天',
  onClick(picker) {
    const end = new Date();
    const start = new Date(new Date().toDateString());
    end.setTime(start.getTime());
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一周',
  onClick(picker) {
    const end = new Date(new Date().toDateString());
    const start = new Date();
    start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString());
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date(new Date().toDateString());
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '今天(可选) - 99991231',
  onClick(picker) {
    const end = new Date("9999-12-31");
    let start = picker.minDate;
    if (start) {
      // Nothing
    } else {
      start = new Date();
    }
    picker.$emit('pick', [start, end]);
  }
}]


/**
 * 金额价格等计算
 */
//含稅单价：priceTex
//不含稅单价：price
//含稅金额：amtTex
//不含稅金额：amt
//税率：texRate
//税额：texAmt
//数量：num

/**
 * [输入含稅单价、数量、税率时]
 * @param  {priceTex: '',num: '',texRate: ''}
 * @return {}
 */
export function calculateOrderDatail(row) {
  var priceTex = Number(row.priceTex) || 0;  //含稅单价
  var num = Number(row.num) || 0;  //数量
  var texRate = Number(row.texRate) || 0;  //税率
  var newRow = {};
  if (priceTex && num && texRate) {
    //含税金额 = 数量 * 含稅单价
    newRow.amtTex = NP.times(num, priceTex).toFixed(2);
    // 税额 = （数量 * 含税单价）/（1 + 税率） * 税率
    newRow.texAmt = NP.times(NP.divide(NP.times(num, priceTex), NP.plus(1, texRate)), texRate).toFixed(2);
    // 税前金额 = 数量 * 含稅单价 - (数量 * 含稅单价) / (1 + 税率) * 税率
    newRow.amt = NP.minus(NP.times(num, priceTex), NP.times(NP.divide(NP.times(num, priceTex), NP.plus(1, texRate)), texRate)).toFixed(2);
    // 无税单价 = (数量 * 含稅单价 - (数量 * 含稅单价) / (1 + 税率) * 税率) / 数量
    newRow.price = NP.divide(NP.minus(NP.times(num, priceTex), NP.times(NP.divide(NP.times(num, priceTex), NP.plus(1, texRate)), texRate)), num).toFixed(6);
  }
  return newRow;
}

/**
 * [输入含税金额时]
 * @param  {amtTex: '',texRate: '',num: ''}
 * @return {}
 */
export function amtTexBlur(row) {
  var amtTex = Number(row.amtTex) || 0;  //含税金额
  var texRate = Number(row.texRate) || 0;  //税率
  var num = Number(row.num) || 0;  //数量
  var newRow = {};
  if (num) {
    // var priceTex = Number(row.priceTex); //含税单价
    // 税额 = 含税金额/(1 + 税率) * 税率
    // debugger
    newRow.texAmt = NP.times(NP.divide(amtTex, NP.plus(1, texRate)), texRate).toFixed(2);
    // 税前金额 = 含税金额 - 含税金额/(1 + 税率) * 税率
    let b = NP.divide(amtTex, NP.plus(1, texRate));
    newRow.amt = NP.minus(amtTex , NP.times(b, texRate)).toFixed(2);
    // 含税单价 = 含税金额/数量
    newRow.priceTex = NP.divide(amtTex, num).toFixed(6);
    // 无税单价 = (含税金额 - 含税金额/(1+税率)*税率) / 数量
    // newRow.price = NP.divide(NP.minus(amtTex , NP.times(NP.plus(1 , texRate), texRate)), num).toFixed(6);
      newRow.price = NP.divide(NP.minus(amtTex , NP.times(NP.divide(amtTex,NP.plus(1 , texRate)),texRate)),num).toFixed(6);
  }
  return newRow;
}

/**
 * [输入人民币税税率、数量、时]
 * @param  {amtTex: '',texRate: '',num: ''}
 * @return {}
 */
export function imtAmtTexBur(row){
  var orginPriceTex = Number(row.orginPriceTex) || 0;  //原币单价
  var rmbCurrencyRate = Number(row.rmbCurrencyRate) || 0;//对人民币汇率
  var tariffRate = Number(row.tariffRate) || 0;  //关税税率
   // var texRate = Number(row.texRate) || 0;  //税率
  var addTexRate = Number(row.addTexRate) || 0;//增值税税率
  var num = Number(row.num) || 0;  //数量
  var newRow = {};
  if(num && orginPriceTex){
    //原币金额 = 原币单价 * 数量
    newRow.orginAmtTex = NP.times(orginPriceTex,num).toFixed(2);
    //本币单价 = 原币单价 * 人民币汇率
    newRow.basePriceTex = NP.times(orginPriceTex,rmbCurrencyRate).toFixed(6);
    //本币金额 = 原币单价 * 数量 * 人民币汇率
    newRow.baseAmtTex = NP.times(NP.times(orginPriceTex,num),rmbCurrencyRate).toFixed(2);
     //关税金额 = 原币单价 * 数量 * 关税税率 * 人民币汇率
    newRow.tariffAmt = NP.times(NP.times(NP.times(orginPriceTex,num),tariffRate),rmbCurrencyRate).toFixed(2);
    // console.log(newRow.tariffAmt,"newRow.tariffAmt");
    //增值税金额 = 原币单价*数量*（1+关税税率） * 人民币汇率
    newRow.texAmt = NP.times(NP.times(NP.times(NP.times(orginPriceTex,num),(1+tariffRate)),addTexRate),rmbCurrencyRate).toFixed(2);
  }
  return newRow;
}

/**
 * [输入原币金额是时]
 * @param  {amtTex: '',texRate: '',num: ''}
 * @return {}
 */
export function imtTaxTexBur(row){
  var orginAmtTex = Number(row.orginAmtTex) || 0;  //原币金额
  // var texRate = Number(row.texRate) || 0;  //税率
  var num = Number(row.num) || 0;  //数量
  var rmbCurrencyRate = Number(row.rmbCurrencyRate) || 0;//对人民币汇率
  var tariffRate = Number(row.tariffRate) || 0;  //关税税率
  var addTexRate = Number(row.addTexRate) || 0;//增值税税率
  var newRow = {};
  if (num) {
    //原币单价 = 原币金额/数量
    newRow.priceTex = NP.divide(orginAmtTex, num).toFixed(6);
     //本币单价 = 原币单价 * 人民币汇率
    newRow.basePriceTex = NP.times(NP.divide(orginAmtTex, num),rmbCurrencyRate).toFixed(6);
    //本币金额 = 原币单价 * 数量 * 人民币汇率
    newRow.baseAmtTex = NP.times(NP.times(NP.divide(orginAmtTex, num),num),rmbCurrencyRate).toFixed(2);
     //关税金额 = 原币单价 * 数量 * 关税税率 * 人民币汇率
    newRow.tariffAmt = NP.times(NP.times(NP.times(NP.divide(orginAmtTex, num),num),tariffRate),rmbCurrencyRate).toFixed(2);
    // console.log(newRow.tariffAmt,"newRow.tariffAmt");
    //增值税金额 = 原币单价*数量*（1+关税税率）* 增值税税率 * 人民币汇率
    newRow.texAmt = NP.times(NP.times(NP.times(NP.times(NP.divide(orginAmtTex, num),num),(1+tariffRate)),addTexRate),rmbCurrencyRate).toFixed(2);
    }
  return newRow;
  }
// }


/**
 *  [单价、数量、税率、汇率]
 *priceTex\applyDeliveryQty\texRate\rateCurrency
 *  luojinye（发货指令必备）
 */
export function deliveryPrice(row){
  var priceTex = Number(row.priceTex) || 0;//单价
  var applyDeliveryQty = Number(row.applyDeliveryQty) || 0;//数量
  var texRate = Number(row.texRate) || 0;//税率
  var rateCurrency = Number(row.rateCurrency) || 0;//汇率
  var iIndex = {};
  if(priceTex && applyDeliveryQty){
    // 原币金额（含税） = 申请发货数量 * 含税单价
    iIndex.orginAmtTex = NP.times(applyDeliveryQty, priceTex);
    // 原币单价（含税）    含税单价 = 含税金额/数量
    // iIndex.orginPriceTex = NP.divide(iIndex.orginAmtTex,applyDeliveryQty);
    //原币单价（不含税）  无税单价 = ( 含税金额 - 含税金额/(1 + 税率)*税率)/数量
    iIndex.orginPrice = NP.divide(NP.minus(iIndex.orginAmtTex,NP.times(NP.divide(iIndex.orginAmtTex,NP.plus(1,texRate)),texRate)),applyDeliveryQty);
    // 原币金额（不含税）
    iIndex.orginAmt = NP.times(iIndex.orginPrice,applyDeliveryQty);
    // 原币税额 = （数量 * 含税单价）/（1 + 税率） * 税率
    iIndex.orginTexAmt = NP.times(NP.divide(iIndex.orginAmtTex,NP.plus(1,texRate)),texRate);
    /** 本币单价（含税）本币含税单价 = 原币含税单价 * 对人民币汇率  */
    iIndex.basePriceTex = NP.times(priceTex,rateCurrency);
    /** 本币单价（不含税） 本币无税单价 = 原币无税单价 * 对人民币汇率 */
    iIndex.basePrice = NP.times(iIndex.orginPrice,rateCurrency);
    /** 本币金额（不含税）本币税前金额 = 原币税前金额 * 对人民币汇率   */
    iIndex.baseAmt = NP.times(iIndex.orginAmt,rateCurrency);
    /** 本币金额（含税）本币含税金额 = 本币税前金额 + 本币税额   */
    iIndex.baseTexAmt = NP.times(iIndex.orginTexAmt,rateCurrency);//本币税前金额
    iIndex.baseAmtTex = NP.plus(iIndex.baseAmt,iIndex.baseTexAmt);//本币含税金额
  }
  return iIndex;
}
