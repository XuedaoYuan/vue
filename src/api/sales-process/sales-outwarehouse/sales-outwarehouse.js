/**
 * Created by wengsiqi on 2017/12/6.
 */
import fetch from "util/fetch";


//查询列表
export function doQuerySoOsWithPage(param,page) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      'manageSubCode': param.manageSubCode,
      'manageSubId': param.manageSubId,
      'manageSubName': param.manageSubName,
      'bizOrgCode': param.bizOrgCode,
      'bizOrgName': param.bizOrgName,
      'bizOrgId': param.bizOrgId,
      'soOsNo': param.soOsNo,
      'soType': param.soType,
      'customerName': param.customerName,
      'customerCode': param.customerCode,
      'warehouseName': param.warehouseName,
      'warehouseCode': param.warehouseCode,
      'osStatus': param.osStatus,
      'buyerName': param.buyerName,
      'soContractNo': param.soContractNoDtl,//销售合同号
      'isOutstock': param.isOutstock,
      'currencyCode': param.currencyCode,
      'currencyName': param.currencyName,
      'outstockDateStart': param.outstockDateStart,
      'outstockDateEnd': param.outstockDateEnd,
      'signDateStart': param.signDateStart,
      'signDateEnd': param.signDateEnd,
      'auitTitle': param.auitTitle,

      'createdTimeStart': param.createdTimeStart,
      'createdTimeEnd': param.createdTimeEnd,
      'createdBy': param.createdBy,
      'updatedTimeStart': param.updatedTimeStart,
      'updatedTimeEnd': param.updatedTimeEnd,
      'updatedBy': param.updatedBy,
      'postPersonName': param.postPersonName, //过账人
      'postDateStart': param.postDateStart,
      'postDateEnd': param.postDateEnd,
      'pageSize': page.limit,
      'currentPage': page.page,
      "needCount": true,
    },
  };

  return fetch({
    url: '/codSoOs/doQuerySoOsWithPage.json',
    method: 'post',
    data
  });
}

// 修改查询
export function doQuerySoOsWithDtl(soOsId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      soOsId:soOsId
    },
    "sign":"111"

  };

  return fetch({
    url: '/codSoOs/doQuerySoOsWithDtl.json',
    method: 'post',
    data
  });
}

// 修改保存
export function doUpdateSoOs(form,formList,deleteIdList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      'codSoOsForm':form,
      'codSoOsDtlForms':formList,
      'codSoOsDtlDelIds':deleteIdList,
    },
    "sign":"111"
  };

  return fetch({
    url: '/codSoOs/doUpdateSoOs.json',
    method: 'post',
    data
  });
}

// 删除
export function doDeleteSoOs(idList) {
  //查询品牌list
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
    url: '/codSoOs/doDeleteSoOs.json',
    method: 'post',
    data
  });
}

// 过账
export function doCusPost(postList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": postList,
    "sign":"111"

  };

  return fetch({
    url: '/codSoOs/doCusPost.json',
    method: 'post',
    data
  });
}

// 取消过账
export function doCusModifyPost(postList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": postList,
    "sign":"111"

  };

  return fetch({
    url: '/codSoOs/doCusModifyPost.json',
    method: 'post',
    data
  });
}
// 出库确认
export function doCusSure(postList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": postList,
    "sign":"111"

  };

  return fetch({
    url: '/codSoOs/doCusSure.json',
    method: 'post',
    data
  });
}
