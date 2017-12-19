/**
 * Created by 98263 on 2017/11/27.
 */
/**
 * Created by 98263 on 2017/11/23.
 */

import fetch from '@/util/fetch'

//查询-分页
export function doQueryWithPage(listQuery,tempAll) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      'pageSize': listQuery.pageSize,
      'currentPage': listQuery.currentPage,
      "needCount": true,
      //经营主体
      manageSubName: tempAll.manageSubName,
      manageSubCode: tempAll.manageSubCode,
      manageSubId: tempAll.manageSubId,
      //部门
      bizOrgName: tempAll.bizOrgName,
      bizOrgId: tempAll.bizOrgId,
      bizOrgCode: tempAll.bizOrgCode,
      //仓库
      warehouseName: tempAll.warehouseName,
      warehouseCode: tempAll.warehouseCode,
      warehouseId: tempAll.warehouseId,
      //客户
      customerName: tempAll.customerName,
      customerCode: tempAll.customerCode,
      customerId: tempAll.customerId,
      //币别
      currencyName: tempAll.currencyName,
      currencyCode: tempAll.currencyCode,
      currencyId: tempAll.currencyId,

      orderType: tempAll.orderType,//订单类型
      soType:tempAll.soType,//销售类型
      soRoNo: tempAll.soRoNo,//销售退货单号
      pinBackType: tempAll.pinBackType,//销退类型

      soRoStatus: tempAll.soRoStatus,//销售退货单状态
      createdBy: tempAll.createdBy,//创建人
      postPersonName: tempAll.postPersonName,//过账人
      updatedBy: tempAll.updatedBy,//修改人

      //创建时间
      createdTimeStart: tempAll.createdTimeStart,
      createdTimeEnd: tempAll.createdTimeEnd,
      //过账时间
      postDateStart: tempAll.postDateStart,
      postDateEnd: tempAll.postDateEnd,
      //修改日期
      updatedTimeStart: tempAll.updatedTimeStart,
      updatedTimeEnd: tempAll.updatedTimeEnd,
      codSoRoDtlCusFormList:[
        {
          soContractNo: tempAll.soContractNo,//销售合同外部编号
        }
      ]
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doQueryWithPage.json',
    method: 'post',
    data
  });
}
//创建查询
export function doQuerySoOsWithPage(tempAll,soOsNo,listQuery) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":{
      'pageSize': listQuery.pageSize,
      'currentPage': listQuery.currentPage,
      "needCount": true,
      soOsNo: soOsNo,
      soContractNo: tempAll.soContractNo,
      soNo: tempAll.soNo,
      goodsName: tempAll.goodsName,
      goodsCode: tempAll.goodsCode,
      seriesNo: tempAll.seriesNo,
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSoOsDtl/doQuerySoOsWithPage.json',
    method: 'post',
    data
  });
}
//单条查询
export function doCusQuery(SoRoId) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":{
      soRoId:SoRoId
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doCusQuery.json',
    method: 'post',
    data
  });
}
//添加--创建--保存
export function doCusSave(riseData,tableData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":{
      //经营主体
      manageSubName: riseData.manageSubName,
      manageSubCode: riseData.manageSubCode,
      manageSubId: riseData.manageSubId,
      //部门
      bizOrgName: riseData.bizOrgName,
      bizOrgId: riseData.bizOrgId,
      bizOrgCode: riseData.bizOrgCode,
      //仓库
      warehouseName: riseData.warehouseName,
      warehouseCode: riseData.warehouseCode,
      warehouseId: riseData.warehouseId,

      soOsNo: riseData.soOsNo,//销售出库单号
      orderType: riseData.orderType,//销售类型
      pinBackType: riseData.pinBackType,//退货类型
      rateCurrency: riseData.rateCurrency,//汇率

      soRoId: riseData.soRoId,
      soRoNo: riseData.soRoNo,//系统单据号
      soRoStatus: riseData.soRoStatus,//销售退货单状态
      returnReason: riseData.returnReason,//退货原因
      texAmt: riseData.texAmt,//税额
      totalAmtTex: riseData.totalAmtTex,//总金额(含税)
      totalAmt: riseData.totalAmt,//总金额(无税)
      remark: riseData.remark,//备注

      codSoRoDtlCusFormList: tableData
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doCusSave.json',
    method: 'post',
    data
  });
}

//修改--保存
export function doCusUpdate(riseData,tableData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":{
      //经营主体
      manageSubName: riseData.manageSubName,
      manageSubCode: riseData.manageSubCode,
      manageSubId: riseData.manageSubId,
      //部门
      bizOrgName: riseData.bizOrgName,
      bizOrgId: riseData.bizOrgId,
      bizOrgCode: riseData.bizOrgCode,
      //仓库
      warehouseName: riseData.warehouseName,
      warehouseCode: riseData.warehouseCode,
      warehouseId: riseData.warehouseId,

      soOsNo: riseData.soOsNo,//销售出库单号
      soType: riseData.soType,//销售类型
      pinBackType: riseData.pinBackType,//退货类型
      rateCurrency: riseData.rateCurrency,//汇率

      soRoNo: riseData.soRoNo,//系统单据号
      soRoStatus: riseData.soRoStatus,//销售退货单状态
      returnReason: riseData.returnReason,//退货原因
      texAmt: riseData.texAmt,//税额
      totalAmtTex: riseData.totalAmtTex,//总金额(含税)
      totalAmt: riseData.totalAmt,//总金额(无税)
      remark: riseData.remark,//备注
      codSoRoDtlCusFormList: tableData
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doCusUpdate.json',
    method: 'post',
    data
  });
}
/*







 销售退货id soRoId   版本号 version
[{"soRoId":"xxx","version":"xx"},{"soRoId":"xxx","version":"xx"}]*/

// 删除 codSoRo/doDeleteSoRo.json
export function doDeleteSoRo(ids){
   let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":ids,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doDeleteSoRo.json',
    method: 'post',
    data
  });
}

// 过账 codSoRo/doPostSoRo.json
export function doPostSoRo(ids){
   let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":ids,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doPostSoRo.json',
    method: 'post',
    data
  });
}

// 冲销 codSoRo/doWriteOffSoRo.json
export function doWriteOffSoRo(ids){
   let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":ids,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRo/doWriteOffSoRo.json',
    method: 'post',
    data
  });
}


