/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-24 10:55:32
 * ============================
 */
import fetch from '@/util/fetch'

export function getList(pageInfo, condition) {
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": pageInfo.pageSize,
      "currentPage": pageInfo.currentPage,
      "needCount": true
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }

  for (var key in condition) {
    var val = condition[key];
    if (val) {
      if (val instanceof Array) {

      } else {
        data.data[key] = condition[key];
      }

    }

  }

  return fetch({
    url: '/codPoGr/doQueryWithPage.json',
    method: 'POST',
    data
  })
}

//修改前的查看
export function getDetailData(query) {
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": query.id,

    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }

  return fetch({
    url: '/codPoGr/doQueryModified.json',
    method: 'POST',
    data
  })
}


// 修改保存
export function doModify(postData) {
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": postData,

    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }

  return fetch({
    url: '/codPoGr/doModify.json',
    method: 'POST',
    data
  })
}
var obj = {
  sourceNo: 'sourceNo',
  sourceId: 'sourceId',
  poGrStatus: 1,
  operationType: 1,
  manageSubCode: 'manageSubCode',
  manageSubName: 'manageSubName',
  manageSubId: 'manageSubId',
  poGrType: 1,
  supplierId: 'supplierId',
  supplierCode: 'supplierCode',
  supplierName: 'supplierName',
  bizOrgId: 'bizOrgId',
  bizOrgCode: 'bizOrgCode',
  bizOrgName: 'bizOrgName',
  certificatesDate: '2017-08-08',
  warehouseId: 'warehouseId',
  warehouseCode: 'warehouseCode',
  warehouseName: 'warehouseName',
  auitTitle: 'auitTitle',
  actReceiveAmt: 11,
  poorginalAmt: 11,
  poorginalAmtTex: 11,
  poBaseAmt: 11,
  poBaseAmtTex: 11,
  currencyId: 'currencyId',
  currencyCode: 'currencyCode',
  currencyName: 'currencyName',
  rateCurrency: 11,
  credenIden: 11,
  credenNo: 'credenNo',
  failReason: 'failReason',
  isReturn: 1,
  setttleWeight: 111,
  postPersonName: 'postPersonName',
  postPersonCode: 'postPersonCode',
  postPersonId: 'postPersonId',
  postDate: '2017-03-03',
  remark: 'remark',
  isDel: 1,
  createdBy: 'createdBy',
  createdTime: '2017-09-09',
  updatedTime: '2017-09-09',
  updatedBy: 'updatedBy',
  isInactive: 1,
  isolationCode: 1,
  codPoGrDtlCusList: [{
    poRowNo: '1',
    poGrDtlId: '11',
    poDtlId: '111',
    poGrRowNo: 1,
    poGrId: '12312',
    poContractNo: '123123',
    poNo: '23123',
    sourceDtlId: '12312',
    goodsId: '1231',
    goodsCode: '1231',
    goodsName: '水果',
    isGift: 1,
    bizOrgId: '221321',
    bizOrgCode: '123123',
    qty: 111,
    bizOrgName: '21312',
    rejectsProductQty: 213,
    goodsProductQty: 312312321,
    settleReturnQty: 312312321,
    settleChangeQty: 2132312,
    settleWriteOffQty: 4567898765,
    actChangeQty: 3123123,
    actWriteOffQty: 21312,
    actReturnQty: 12321,
    hasSettleQty: 1231223,
    settleQty: 123123,
    lessQty: 21312,
    actReceiveQty: 3233,
    unitId: '2312',
    unitName: '123 ',
    unitCode: '个',
    settleUnitId: '1231223',
    settleUnitName: '54535',
    settleUnitCode: '34534',
    cabinetNo: '435',
    basePrice: 34543,
    basePriceTex: 354,
    orginPrice: 3453,
    orginPriceTex: 345,
    baseAmt: 345,
    baseAmtTex: 8799,
    orginAmt: 7897,
    orginAmtTex: 789,
    seriesNo: '987',
    supplierBatchNo: '876',
    productDate: '2017-09-09',
    packType: '71350010',
    remark: '阿斯达',
    isDel: 0,
    createdBy: '袁学道',
    createdTime: '2017-09-09',
    updatedTime: '2016-26-12',
    updatedBy: '相当于',
    version: 1,
    isInactive: 1,
    isolationCode: 1,
    baseTexAmt: 11,
    texRate: 1.01,
    orginTexAmt: 111
  }]
}
// 新建保存
export function doSave(postData) {
  // delete postData.codPoGrDtlCusList;
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": postData,

    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }

  return fetch({
    url: '/codPoGr/doSave.json',
    method: 'POST',
    data
  })
}

// http://localhost:8080/cotton-web/codOwDtl/doCusQueryDtl.json
// 在途单明细查询
export function doCusQueryDtlOw(query, pageInfo) {
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {

      "pageSize": pageInfo.pageSize,
      "currentPage": pageInfo.currentPage,
      "needCount": true,
      "owNo": query.owNo,
      "poContractNo": query.poContractNo,
      "poNo": query.poNo,
      "goodsName": query.goodsName,
      "cabinetNo": query.cabinetNo,
    },

    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }

  return fetch({
    url: '/codOwDtl/doCusQueryDtl.json',
    method: 'POST',
    data
  })
}
// 暂收单明细查询
export function doQueryWithReceived(tempAll, pageInfo) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": pageInfo.pageSize,
      "currentPage": pageInfo.currentPage,
      "needCount": true,
      "goodsName": tempAll.goodsName,
      // "poGrNo": tempAll.poGrNo,
      "poGrId": tempAll.poGrId,
      "supplierId": tempAll.supplierId,
      "manageSubId": tempAll.manageSubId,
      "currencyId": tempAll.currencyId

      
      // "poContractNo": tempAll.poContractNo,
      // "poNo": tempAll.poNo
    }
  }

  return fetch({
    url: 'codPoGrDtl/doQueryWithReceived.json',
    method: 'post',
    data
  });
}

export function doCancelPost(ids) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": ids
  }

  return fetch({
    url: 'codPoGr/doCancelPost.json',
    method: 'post',
    data
  });
}

export function doPost(ids) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": ids
  }

  return fetch({
    url: 'codPoGr/doPost.json',
    method: 'post',
    data
  });
}
export function doDelete(ids) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": ids
  }

  return fetch({
    url: 'codPoGr/doDelete.json',
    method: 'post',
    data
  });
}
export function doQueryCodPoNo(search, pageInfo, poDtlIdList) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {

      "poNo": search.poNo,
      "poContractNo": search.poContractNo,
      "goodsName": search.goodsName,
      "signDateStart": search.signDate[0],
      "signDateEnd": search.signDate[1],
      "deliveryDateStart": search.deliveryDate[0],
      "deliveryDateEnd": search.deliveryDate[1],
      "supplierId": search.supplierId,
      "currencyName": search.currencyName,
      "manageSubName": search.manageSubName,

      "poDtlIdList": poDtlIdList, //已选择的内容

      "pageSize": pageInfo.pageSize,
      "currentPage": pageInfo.currentPage,
      "needCount": true,
    }
  }

  return fetch({
    url: 'codPo/doQueryCodPoNo.json',
    method: 'post',
    data
  });
}
