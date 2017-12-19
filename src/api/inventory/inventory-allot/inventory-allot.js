/*
* @Author: Marte
* @Date:   2017-11-23 09:22:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-11-23 11:02:41
*/

import fetch from '@/util/fetch'
//分页接口
export function doQueryWithPage(param,page) {
    // TODO
    const data = {
      "context":{"clientMac":"00-01-6C-06-A6-29",
        "clientType":"WEB",
        "token":"2c31fabbe9fb68b009efa547609c0ccb"},
      "data":{
        'alSheetNo': param.alSheetNo,
        // 'alDate': param.alDate,
        'alDateStart': param.alDateStart?(param.alDateStart).parseTime('YYYY-MM-DD'):'',
        'alDateEnd': param.alDateEnd?(param.alDateEnd).parseTime('YYYY-MM-DD'):'',
        'alStatus': param.alStatus,
        'manageSubCode': param.manageSubCode,
        'manageSubId': param.manageSubId,
        'manageSubName': param.manageSubName,//经营主体name
        'bizOrgCode': param.bizOrgCode,
        'bizOrgName': param.bizOrgName,
        'bizOrgId': param.bizOrgId,//部门id
        'outWarehouseId': param.outWarehouseId,
        'outWarehouseName': param.outWarehouseName,
        'inWarehouseId': param.inWarehouseId,
        'inWarehouseName': param.inWarehouseName,
        'inWarehouseCode': param.inWarehouseCode,
        'createdBy': param.createdBy,//创建人
        'updateTimeStart': param.updatedTimeStart?(param.updatedTimeStart).parseTime('YYYY-MM-DD HH:MM:SS'):'',//修改时间
        'updateTimeEnd': param.updatedTimeEnd?(param.updatedTimeEnd).parseTime('YYYY-MM-DD HH:MM:SS'):'',//修改时间
        // 'updatedTime': param.updatedTime,//修改时间
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
        url: 'codAl/doQueryWithPage.json',
        method: 'post',
        data
    });
}
//查询接口
export function doQueryModified(id) {
  // TODO
  const data = {
    "data": id
  }

  return fetch({
    url: 'codAl/doQueryModified.json',
    method: 'post',
    data
  });
}
//新增
export function doSave(formData,tableData,page) {
  // TODO
  const data = {
    "context": {
      "clientType": "WEB",
      "clientMac": "00-01-6C-06-A6-29",
      "token": "2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp": "1511427429392"
    },
    "data": {
      "alSheetNo": formData.alSheetNo,
      "alDate": formData.alDate,
      "alStatus": formData.alStatus,
      "manageSubCode": formData.manageSubCode,
      "manageSubId": formData.manageSubId,
      "manageSubName": formData.manageSubName,
      "bizOrgId": formData.bizOrgId,
      "bizOrgCode": formData.bizOrgCode,
      "bizOrgName": formData.bizOrgName,
      "outWarehouseId": formData.outWarehouseId,
      "outWarehouseCode": formData.outWarehouseCode,
      "outWarehouseName": formData.outWarehouseName,
      "inWarehouseId": formData.inWarehouseId,
      "inWarehouseCode": formData.inWarehouseCode,
      "inWarehouseName": formData.inWarehouseName,
      "postPersonName": formData.postPersonName,
      "postPersonCode": formData.postPersonCode,
      "postPersonId": formData.postPersonId,
      "postDate": formData.postDate,
      "codAlDtlCusList":tableData,
    },
    "sign": "FFA6649C9A160479B88BF187386B1F37"
  }

  return fetch({
    url: 'codAl/doSave.json',
    method: 'post',
    data
  });
}
//修改
export function doModify(formData,tableData,delList,page) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      "alId": formData.alId,
      "alNo": formData.alNo,
      "alSheetNo": formData.alSheetNo,
      "alDate": formData.alDate,
      "alStatus": formData.alStatus,
      "manageSubCode": formData.manageSubCode,
      "manageSubId": formData.manageSubId,
      "manageSubName": formData.manageSubName,
      "bizOrgId": formData.bizOrgId,
      "bizOrgCode": formData.bizOrgCode,
      "bizOrgName": formData.bizOrgName,
      "outWarehouseId": formData.outWarehouseId,
      "outWarehouseCode": formData.outWarehouseCode,
      "outWarehouseName": formData.outWarehouseName,
      "inWarehouseId": formData.inWarehouseId,
      "inWarehouseCode": formData.inWarehouseCode,
      "inWarehouseName": formData.inWarehouseName,
      "remark": formData.remark,
      "postPersonName": formData.postPersonName,
      "postDate": formData.postDate,
      "updatedTime": formData.updatedTime,
      "updatedBy": formData.updatedBy,
      "createdBy": formData.createdBy,
      "createdTime": formData.createdTime,
      "version":formData.version,
      "codAlDtlCusList":tableData,
      "deleteIdList":delList,
      "needCount": true,
      "pageSize": page.pageSize,
      "currentPage": page.currentPage
    },
    "sign":"111"

  };

  return fetch({
    url: 'codAl/doModify.json',
    method: 'post',
    data
  });
}
// 过账
export function doPost(alId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": alId,
    "sign":"111"

  };

  return fetch({
    url: '/codAl/doPost.json',
    method: 'post',
    data
  });
}
// 取消过账
export function doCancelPost(alId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": alId ,
    "sign":"111"

  };

  return fetch({
    url: '/codAl/doCancelPost.json',
    method: 'post',
    data
  });
}
//批次弹框
export function doQueryWindow(query,seriesObj) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      "goodsName": query.goodsName,
      "seriesNo": query.seriesNo,
      "bizOrgId": seriesObj.bizOrgId,
      "manageSubId": seriesObj.manageSubId,
      "warehouseId": seriesObj.warehouseId,

    } ,
    "sign":"111"

  };

  return fetch({
    url: '/codStock/doQueryWindow.json',
    method: 'post',
    data
  });
}
// 删除
export function doDeleteList(alId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": alId,
    "sign":"111"

  };

  return fetch({
    url: '/codAl/doDeleteList.json',
    method: 'post',
    data
  });
}
