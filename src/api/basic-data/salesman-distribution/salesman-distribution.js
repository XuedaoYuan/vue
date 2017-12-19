import fetch from '@/util/fetch'
//查询接口
export function doQueryWithPage(params,page) {
  // TODO
  const data = {
    "context": {
      "clientType": "WEB",
      "clientMac": "00-01-6C-06-A6-29",
      "token": "2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp": "1511427429392"
    },
    "data": {
      "customerId":params.customerId,
      "userName":params.userName,
      "needCount":true,
      "pageSize":page.pageSize,
      "currentPage":page.currentPage
    }
  }

  return fetch({
    url: 'codBbCustUserRef/doQueryWithPage.json',
    method: 'post',
    data
  });
}
//新增
export function doSave() {
  const data = {
    "context": {
      "clientType": "WEB",
      "clientMac": "00-01-6C-06-A6-29",
      "token": "2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp": "1511427429392"
    },
    "data":{
      "refId":"refId",
      "customerCode":"customerCode",
      "customerId":"customerId",
      "customerName":"customerName",
      "userId":"userId",
      "userCode":"userCode",
      "userName":"userName",
      "remark":"remark",
      "isDel":0,
      "createdBy":"CreatedBy",
      "updatedBy":"updatedBy",
      "version":0,
      "isInactive":0,
      "isolationCode":111111,
      "needCount":false,
      "pageSize":20,
      "currentPage":1
    },
    "sign":"71223A242C2C831CED580D98B4B61FDD"
  }
  return fetch({
    url: 'codBbCustUserRef/doSave.json',
    method: 'post',
    data
  });
}
//分配
export function doUpdate(params,page) {
  const data = {
    "context": {
      "clientType": "WEB",
      "clientMac": "00-01-6C-06-A6-29",
      "token": "2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp": "1511427429392"
    },
    "data":{
      "refId":params.refId,
      "customerCode":params.customerCode,
      "customerId":params.customerId,
      "customerName":params.customerName,
      "userId":params.buyerId,
      "userCode":params.buyerCode,
      "userName":params.buyerName,
      "remark":params.remark,
      "version":params.version,
      "needCount":false,
      "pageSize":page.pageSize,
      "currentPage":page.currentPage
    },
    "sign":"71223A242C2C831CED580D98B4B61FDD"
  }
  return fetch({
    url: 'codBbCustUserRef/doUpdate.json',
    method: 'post',
    data
  });
}
//释放
export function doDelete(params,page) {
  const data = {
    "context": {
      "clientType": "WEB",
      "clientMac": "00-01-6C-06-A6-29",
      "token": "2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp": "1511427429392"
    },
    "data":[{
      "refId": params.refId,
    }],
    "sign":"71223A242C2C831CED580D98B4B61FDD"
  }
  return fetch({
    url: 'codBbCustUserRef/doDelete.json',
    method: 'post',
    data
  });
}
