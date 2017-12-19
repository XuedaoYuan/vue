/**
 * Created by 98263 on 2017/11/23.
 */

import fetch from '@/util/fetch'

//分页查询--也不知道查的是什么
export function doQueryWithPage(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    // "data": {
    //   'pageSize': queryData.limit,
    //   'currentPage': queryData.page,
    //   "needCount": true
    // },
    'data':queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codOw/doQueryWithPage.json',
    method: 'post',
    data
  });
}
//增加
export function doCusSave(addData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": addData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codOw/doCusSave.json',
    method: 'post',
    data
  });
}
//单条数据查看
export function doQueryCodOw(dataId) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": dataId,
  }
  return fetch({
    url: '/codOw/doQueryCodOw.json',
    method: 'post',
    data
  });
}
//主页查看
export function doQueryAll(dataId) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": dataId,
  }
  return fetch({
    url: '/codOw/doQueryAll.json ',
    method: 'post',
    data
  });
}
//修改
export function doUpdateCodOw(addData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": addData,
  }
  return fetch({
    url: '/codOw/doUpdateCodOw.json',
    method: 'post',
    data
  });
}
//过账
export function doPosting(addData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": addData,
  }
  return fetch({
    url: '/codOw/doPosting.json',
    method: 'post',
    data
  });
}
//冲销
export function doReversal(addData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": addData,
  }
  return fetch({
    url: '/codOw/doReversal.json',
    method: 'post',
    data
  });
}
//创建-弹框
export function doQueryCodPoNoForOw(addData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": addData,
  }
  return fetch({
    url: '/codPo/doQueryCodPoNoForOw.json',
    method: 'post',
    data
  });
}
//删除
export function doDeleteOw(addData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": addData,
  }
  return fetch({
    url: '/codOw/doDeleteOw.json',
    method: 'post',
    data
  });
}
