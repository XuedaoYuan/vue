/**
 * Created by 98263 on 2017/11/27.
 */
/**
 * Created by 98263 on 2017/11/23.
 */

import fetch from '@/util/fetch'
// import ElementUI from 'element-ui'
import {Message} from 'element-ui';


//修改前的查询--也不知道查的是什么-分页
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
    'data': queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doQueryWithPage.json',
    method: 'post',
    data
  });
}
//添加--创建
export function doSave(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doSave.json',
    method: 'post',
    data
  });
}
//修改
export function doModify(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doModify.json',
    method: 'post',
    data
  });
}

//查询-单条
export function doQueryModified(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doQueryModified.json',
    method: 'post',
    data
  });
}
//提交
export function doSubmitCodSoInvoice(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doSubmitCodSoInvoice.json',
    method: 'post',
    data
  });
}
//过账
export function doPosting(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doPosting.json',
    method: 'post',
    data
  });
}
//冲销
export function doReversal(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doReversal.json',
    method: 'post',
    data
  });
}
//创建弹框 --退货
export function doQueryDtlInvoiceWithPageReturn(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoRoDtl/doQueryDtlInvoiceWithPage.json',
    method: 'post',
    data
  });
}
//创建弹框 --非退货
export function doQueryDtlInvoiceWithPage(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoOsDtl/doQueryDtlInvoiceWithPage.json',
    method: 'post',
    data
  });
}
//删除
export function doDelSoInvoices(queryData) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": queryData,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: '/codSoInvoice/doDelSoInvoices.json',
    method: 'post',
    data
  });
}

//创建提示
export function createPrompt(dataCreate, typeOfCreat) {
  let [data] = [Object.entries(dataCreate)];
  let [a, b, c, d, e] = [false, false, false, false];
  for (var key in data) {
    if (data[key][0] == 'bizOrgId') {//主体
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "部门必选",
          duration: 3 * 1000
        })
      } else {
        a = true
      }
    } else if (data[key][0] == 'currencyId') {//币别
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "币别必选",
          duration: 3 * 1000
        })
      } else {
        b = true
      }
    } else if (data[key][0] == 'manageSubId') {//部门
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "经营主体必选",
          duration: 3 * 1000
        })
      } else {
        c = true
      }
    } else if (data[key][0] == 'soInvoiceType') {//发票类型
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "发票类型必选",
          duration: 3 * 1000
        })
      } else {
        d = true
      }
    } else if (data[key][0] == 'supplierId') {//供应商
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "供应商必选",
          duration: 3 * 1000
        })
      } else {
        e = true
      }
    }
  }
  if (typeOfCreat == 'invoice') {
    if (a && b && c && d) {
      return true
    }
  } else if (typeOfCreat == 'tracking') {
    if (a && b && c && e) {
      return true
    }
  }
}




