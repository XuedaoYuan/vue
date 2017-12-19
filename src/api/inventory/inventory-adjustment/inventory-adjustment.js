/**
 * Created by 98263 on 2017/11/25.
 */
import fetch from '@/util/fetch'
import {Message} from 'element-ui';

//分页查询
export function doQueryWithPage (page, dataList) {
  console.log(dataList)
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": page.pageSize,
      "currentPage": page.currentPage,
      "needCount": true,
      manageSubName: dataList.manageSubName,
      bizOrgName: dataList.bizOrgName,//部门name
      nsStatus: dataList.nsStatus,//状态
      nsType: dataList.nsType,//状态
      nsNo: dataList.nsNo,//调单编号
      warehouseName: dataList.manageSubName,
      updateTimeStart: dataList.updatedTimeStart,
      updateTimeEnd: dataList.updatedTimeEnd,
      createdTimeStart: dataList.createdTimeStart,
      createdTimeEnd: dataList.createdTimeEnd,
      postDateStart: dataList.postDateStart,
      postDateEnd: dataList.postDateEnd,
      createdBy: dataList.createdBy,
      updatedBy: dataList.updatedBy,
      postPersonName: dataList.postPersonName
    }
  }

  return fetch({
    url: 'codNs/doQueryWithPage.json',
    method: 'post',
    data
  });
}

//添加
export function doCusSave (formData, tableData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      codNsCusForm: formData,
      codNsDtlCusForms: tableData
    }
  }

  return fetch({
    url: 'codNs/doCusSave.json',
    method: 'post',
    data
  });
}

//查看
export function doQueryCusAll (nsId) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      codNsCusForm: {
        nsId: nsId
      }
    }
  }
  return fetch({
    url: 'codNs/doQueryCusAll.json',
    method: 'post',
    data
  });
}

//编辑
export function doCusUpdate (formData, tableData, nsDtlId) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      codNsCusForm: formData,
      codNsDtlCusForms: tableData,
      codNsDtldel: nsDtlId
    }
  }
  return fetch({
    url: 'codNs/doCusUpdate.json',
    method: 'post',
    data
  });
}

//过账
export function doPost (result) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": result
  }
  return fetch({
    url: 'codNs/doPost.json',
    method: 'post',
    data
  });
}

//取消过账
export function doCancelPost (result) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": result
  }
  return fetch({
    url: 'codNs/doCancelPost.json',
    method: 'post',
    data
  });
}

//删除
export function doDeleteList (result) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": result
  }
  return fetch({
    url: 'codNs/doDeleteList.json',
    method: 'post',
    data
  });
}

//创建提示
export function createPrompt (dataCreate) {
  let [data] = [Object.entries(dataCreate)];
  let [a, b, c] = [false, false, false];
  for (var key in data) {
    if (data[key][0] == 'warehouseId') {//仓库
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "仓库必选",
          duration: 3 * 1000
        })
      } else {
        a = true
      }
    } else if (data[key][0] == 'bizOrgId') {//部门
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "部门必选",
          duration: 3 * 1000
        })
      } else {
        b = true
      }
    } else if (data[key][0] == 'manageSubId') {//主体
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "经营主体必选",
          duration: 3 * 1000
        })
      } else {
        c = true
      }
    }
  }
  if (a && b && c) {
    return true
  } else {
    return false;
  }
}
