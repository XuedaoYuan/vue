/**
 * Created by wengsiqi on 2017/11/23.
 */
import fetch from "util/fetch";
import {Message} from 'element-ui';

export function doQueryWithPage(param,page) {
  //查询品牌list
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
      'supplierId': param.supplierId,
      'supplierCode': param.supplierCode,
      'supplierName': param.supplierName,
      'poInvoiceNo': param.poInvoiceNo,
      'poNo': param.poNo,
      'extInvoiceNo': param.extInvoiceNo,
      'poInvoiceType': param.poInvoiceType,
      'certificatesDateStart': param.certificatesDateStart,
      'certificatesDateEnd': param.certificatesDateEnd,
      'invoiceStatus': param.invoiceStatus,
      'createdBy': param.createdBy,
      'updatedTimeStart': param.updatedTimeStart,
      'updatedTimeEnd': param.updatedTimeEnd,
      'updatedBy': param.updatedBy,
      'postPersonName': param.postPersonName,
      'postDateStart': param.postDateStart,
      'postDateEnd': param.postDateEnd,
      'createdTimeStart': param.createdTimeStart,
      'createdTimeEnd': param.createdTimeEnd,
      'pageSize': page.limit,
      'currentPage': page.page,
      "needCount": true,
    },
  };

  return fetch({
    url: '/codPoInvoice/doQueryWithPage.json',
    method: 'post',
    data
  });
}

export function doAddCodPoInvoice(form,formList) {
  //查询品牌list
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      'codPoInvoiceForm':form,
      'codPoInvoiceDtlFormList':formList
    },
  };

  return fetch({
    url: '/codPoInvoice/doAddCodPoInvoice.json',
    method: 'post',
    data
  });
}

// 删除
export function doQueryDelete(idList) {
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
    url: '/codPoInvoice/doDeleteCodPoInvoice.json',
    method: 'post',
    data
  });
}

// 修改查询
export function doQueryPoInvoiceInfo(poInvoiceId) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      poInvoiceId:poInvoiceId
    },
    "sign":"111"

  };

  return fetch({
    url: '/codPoInvoice/doQueryPoInvoiceInfo.json',
    method: 'post',
    data
  });
}

// 修改保存
export function doUpdatePoInvoice(form,formList,deleteIdList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      'codPoInvoiceForm':form,
      'codPoInvoiceDtlFormList':formList,
      'deletePoIDtlIdList':deleteIdList,
    },
    "sign":"111"

  };

  return fetch({
    url: '/codPoInvoice/doUpdatePoInvoice.json',
    method: 'post',
    data
  });
}

// 过账
export function doPost(postList) {
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
    url: '/codPoInvoice/doPost.json',
    method: 'post',
    data
  });
}
// 冲销
export function doWriteOff(doWriteOffList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": doWriteOffList,
    "sign":"111"

  };

  return fetch({
    url: '/codPoInvoice/doWriteOff.json',
    method: 'post',
    data
  });
}
// 提交
export function doSubmit(doSubmitList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": doSubmitList,
    "sign":"111"

  };

  return fetch({
    url: '/codPoInvoice/doSubmit.json',
    method: 'post',
    data
  });
}

// 收货单弹窗接口
export function doQueryWithDetail(query,page,choosedIdList) {
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
    },
    "data": {
      'poContractNo':query.poContractNo,
      'poNo':query.poNo,
      'poGrNo':query.poGrNo,

      'manageSubId':query.manageSubId,
      'poInvoiceType':query.poInvoiceType,
      'bizOrgId':query.bizOrgId,
      'currencyId':query.currencyId,
      'supplierId':query.supplierId,
      'choosedId':choosedIdList,
      // 'manageSubId':'',
      // 'poInvoiceType':'',
      // 'supplierId':'',
      // 'currencyId':'',
      // 'bizOrgId':'',

      "needCount": true,
      'pageSize': page.pageSize,
      'currentPage': page.currentPage,
    },
    "sign":"111"

  };

  return fetch({
    url: '/codPoGrDtl/doQueryWithWIndows.json',
    method: 'post',
    data
  });
}

//创建提示
export function createPrompt(dataCreate) {
  let [data] = [Object.entries(dataCreate)];
  let [a, b, c, d, e] = [false, false, false, false];
  for (var key in data) {
    if (data[key][0] == 'manageSubId') {//主体
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "经营主体必选",
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
    } else if (data[key][0] == 'currencyId') {//币别
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "币别必选",
          duration: 3 * 1000
        })
      } else {
        c = true
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
    }else if (data[key][0] == 'poInvoiceType') {//发票类型
      if (!data[key][1]) {
        Message({
          type: 'warning',
          message: "发票类型必选",
          duration: 3 * 1000
        })
      } else {
        d = true
      }
    }
  }
  if (a && b && c && d && e) {
    return true
  }else{
    return false;
  }
}

