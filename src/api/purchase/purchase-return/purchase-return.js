/*
* @Author: Marte
* @Date:   2017-11-23 09:22:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-23 11:02:41
*/

import fetch from '@/util/fetch'
// export function getCatalog() {
//     return fetch({
//         url: '/mock/catalog.json',
//         method: 'get'
//     });
// }

//分页接口
export function doQueryWithPage(param,page) {
    // TODO
    const data = {
      "context":{"clientMac":"00-01-6C-06-A6-29",
        "clientType":"WEB",
        "token":"2c31fabbe9fb68b009efa547609c0ccb"},
      "data":{
        'manageSubCode': param.manageSubCode,
        'manageSubId': param.manageSubId,
        'manageSubName': param.manageSubName,//经营主体name
        'bizOrgCode': param.bizOrgCode,
        'bizOrgName': param.bizOrgName,
        'bizOrgId': param.bizOrgId,//部门id
        'roPoType': param.roPoType,//采购类型
        'currencyName': param.currencyName,//币别name
        'currencyId': param.currencyId,//币别
        'currencyCode': param.currencyCode,//币别
        'supplierId': param.supplierId,
        'supplierCode': param.supplierCode,
        'supplierName': param.supplierName,//供应商name
        'credenNo': param.credenNo,//冲销凭证号
        'roType': param.roType,//退货类型
        'createdBy': param.createdBy,//创建人
        'updateTimeStart': param.updateTimeStart?(param.updateTimeStart).parseTime('YYYY-MM-DD HH:MM:SS'):'',//修改时间
        'updateTimeEnd': param.updateTimeEnd?(param.updateTimeEnd).parseTime('YYYY-MM-DD HH:MM:SS'):'',//修改时间
        // 'updatedTime': param.updatedTime,//修改时间
        'poGrNo': param.poGrNo,//采购收货单号
        'postStatus': param.postStatus,//过账状态
        'billDateStart': param.billDateStart?(param.billDateStart).parseTime('YYYY-MM-DD'):'',//过账时间
        'billDateEnd': param.billDateEnd?(param.billDateEnd).parseTime('YYYY-MM-DD'):'',//过账时间
        'updatedBy': param.updatedBy,//修改人
        'postPersonName': param.postPersonName,//过账人
        'postDateStart': param.postDateStart?(param.postDateStart).parseTime('YYYY-MM-DD HH:MM:SS'):'',//过账时间
        'postDateEnd': param.postDateEnd?(param.postDateEnd).parseTime('YYYY-MM-DD HH:MM:SS'):'',//过账时间
        // 'postDate': param.postDate,//过账时间
        'createdTimeStart': param.createdTimeStart?(param.createdTimeStart).parseTime('YYYY-MM-DD HH:MM:SS'):'',//创建时间
        'createdTimeEnd': param.createdTimeEnd?(param.createdTimeEnd).parseTime('YYYY-MM-DD HH:MM:SS'):'',//创建时间
        // 'createdTime': param.createdTime,//创建时间
        'pageSize': page.pageSize,
        'currentPage': page.currentPage,
        "needCount": true,
    },
      "sign":"111"}

  return fetch({
        url: 'codPoRo/doQueryWithPage.json',
        method: 'post',
        data
    });
}
//查询接口
export function doQueryCusAll(id) {
  // TODO
  const data = {
    "data": {
      "poRoId":id
    }
  }

  return fetch({
    url: 'codPoRo/doQueryCusAll.json',
    method: 'post',
    data
  });
}
//新增
export function doCusSave(formData,tableData) {
  // TODO
  const data = {
    "context": {
      "clientType": "WEB",
      "clientMac": "00-01-6C-06-A6-29",
      "token": "2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp": "1511427429392"
    },
    "data": {
      "poGrId": formData.poGrId,
      "poRoNo": formData.poRoNo,
      "postStatus": formData.postStatus,
      "poGrNo": formData.poGrNo,
      "manageSubCode": formData.manageSubCode,
      "manageSubId": formData.manageSubId,
      "manageSubName": formData.manageSubName,
      //待处理
      "operationType": formData.operationType,
      "bizOrgId": formData.bizOrgId,
      "bizOrgCode": formData.bizOrgCode,
      "bizOrgName": formData.bizOrgName,
      "supplierId": formData.supplierId,
      "supplierCode": formData.supplierCode,
      "supplierName": formData.supplierName,
      "warehouseName": formData.warehouseName,
      "warehouseId": formData.warehouseId,
      "warehouseCode": formData.warehouseCode,
      "rateCurrency": formData.rateCurrency,
      "roType": formData.roType,
      "roPoType": formData.roPoType,
      "currencyCode": formData.currencyCode,
      "currencyId": formData.currencyId,
      "currencyName": formData.currencyName,
      // "certificatesDate": formData.certificatesDate,
      "billDate": formData.billDate,
      "writeOffReason": formData.writeOffReason,
      "credenIden": formData.credenIden,
      "credenNo": formData.credenNo,
      "failReason": formData.failReason,
      "createdBy": formData.createdBy,
      "updatedBy": formData.updatedBy,
      "postPersonName": formData.postPersonName,
      "createdTime": formData.createdTime,
      "updatedTime": formData.updatedTime,
      "postDate": formData.postDate,
      "codPoRoDtlForm":tableData,
        // [{
          // "poRoNo": "11",
          // "poRoRowNo": 1,
          // "poContractNo": "D1",
          // "poNo": "3D1",
          // "poDtlRowNo": "HD1",
          // "poGrNo": "DJIJ1",
          // "poGrDtlNo": "DJI1J",
          // "goodsId": "D1HF1",
          // "goodsCode": "DHUH1",
          // "goodsName": "物料名SHI",
          // "contractQty": 1,
          // "basePrice": 1,
          // "basePriceTex": 1,
          // "orginPrice": 1,
          // "orginPriceTex": 1,
          // "baseAmt": 1,
          // "baseAmtTex": 1,
          // "orginAmtTex": 1,
          // "orginAmt": 1,
          // "texRate": 1,
          // "texAmt": 1,
          // "bizOrgId": "djdj1i",
          // "bizOrgCode": "di1h",
          // "bizOrgName": "nishdh1",
          // "cabinetNo": "hudke1o",
          // "isGift": 1313,
          // "supBatchNo": "dhd1",
          // "batchNo": "dji1",
          // "retireQty": 1,
          // "operableQty": "sdji1",
          // "lessQty": 1,
          // "settleQty": 1,
          // "unitId": "hfh1",
          // "unitName": "nihao",
          // "unitCode": "yiyang",
          // "settleUnitId": "1d1",
          // "settleUnitName": "ahsd",
          // "settleUnitCode": "di1",
          // "remark": "beizhu",
          // "isDel": 0,
          // "createdBy": "TEST1",
          // "createdTime": "2017-11-23 16:57:09",
          // "updatedTime": "2017-11-23 16:57:09",
          // "updatedBy": "TEST1",
          // "version": 4,
          // "isInactive": 0,
          // "isolationCode": 12,
          // "needCount": false,
          // "pageSize": 20,
          // "currentPage": 1
        // }
      // ],
    },
    "sign": "FFA6649C9A160479B88BF187386B1F37"
  }

  return fetch({
    url: 'codPoRo/doCusSave.json',
    method: 'post',
    data
  });
}
//修改
export function doCusUpdate(formData,tableData,delList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      "poRoId": formData.poRoId,
      "poRoNo": formData.poRoNo,
      "postStatus": formData.postStatus,
      "poGrNo": formData.poGrNo,
      "manageSubCode": formData.manageSubCode,
      "manageSubId": formData.manageSubId,
      "manageSubName": formData.manageSubName,
      "operationType": formData.operationType,
      //待处理
      "bizOrgId": formData.bizOrgId,
      "bizOrgCode": formData.bizOrgCode,
      "bizOrgName": formData.bizOrgName,
      "supplierId": formData.supplierId,
      "supplierCode": formData.supplierCode,
      "supplierName": formData.supplierName,
      "warehouseName": formData.warehouseName,
      "warehouseId": formData.warehouseId,
      "warehouseCode": formData.warehouseCode,
      "rateCurrency": formData.rateCurrency,
      "roType": formData.roType,
      "roPoType": formData.roPoType,
      "currencyCode": formData.currencyCode,
      "currencyId": formData.currencyId,
      "currencyName": formData.currencyName,
      // "certificatesDate": formData.certificatesDate,
      "billDate": formData.billDate,
      "writeOffReason": formData.writeOffReason,
      "credenIden": formData.credenIden,
      "credenNo": formData.credenNo,
      "failReason": formData.failReason,
      "createdBy": formData.createdBy,
      "updatedBy": formData.updatedBy,
      "postPersonName": formData.postPersonName,
      "createdTime": formData.createdTime,
      "updatedTime": formData.updatedTime,
      "postDate": formData.postDate,
      "version": formData.version,
      "codPoRoDtlForm":tableData,
      "codPoRoDtldel":delList,
      "needCount": true,
      "pageSize": 20,
      "currentPage": 1
    },
    "sign":"111"

  };

  return fetch({
    url: 'codPoRo/doCusUpdate.json',
    method: 'post',
    data
  });
}
// 收货创建单弹窗接口 todo
export function doQueryWithReturn(query,poGrId,page) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      // 'poGrId':'c8b3c217524246508474524d8eecc14c',
      'poGrId':poGrId,
      'goodsName':query.goodsName,
      'goodsCode':query.goodsCode,
      'pageSize': page.pageSize,
      'currentPage': page.currentPage,
      "needCount": true,
    },
    "sign":"111"

  };

  return fetch({
    url: '/codPoGrDtl/doQueryWithReturn.json',
    method: 'post',
    data
  });
}
// 收货单弹窗接口 todo
export function doQueryWithReceived(query,manageSubId,poGrStatus,page) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      'poGrNo':query.poGrNo,//收货单号
      'poNo':query.poNo,//采购合同系统单据号
      'poContractNo':query.poContractNo,//采购合同号
      'supplierName':query.supplierName,
      // 'poGrStatus':poGrStatus,
      'operationType':74050010,//过滤掉暂收类型的
      'poGrStatus':70300020,
      'manageSubId':manageSubId,//营运主体
      'pageSize': page.pageSize,
      'currentPage': page.currentPage,
      "needCount": true,
    },
    "sign":"111"

  };

  return fetch({
    url: '/codPoGr/doQueryWithPage.json',
    method: 'post',
    data
  });
}
// 过账
export function doPost(poRoId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": poRoId,
    "sign":"111"

  };

  return fetch({
    url: '/codPoRo/doCusPost.json',
    method: 'post',
    data
  });
}
// 取消过账
export function doCusModifyPost(poRoId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": poRoId,
    "sign":"111"

  };

  return fetch({
    url: '/codPoRo/doCusModifyPost.json',
    method: 'post',
    data
  });
}
// 删除
export function doQueryDelete(idList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": idList
  };

  return fetch({
    url: '/codPoRo/doDeleteCus.json',
    method: 'post',
    data
  });
}
