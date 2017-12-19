/*
* @Author: Marte
* @Date:   2017-11-23 09:22:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-11 17:53:01
*/

import fetch from '@/util/fetch'
//查询
export function doQueryPayApplyWithPage(listQuery,formdata) {
    // TODO
    const data = {
      "context":{
        "clientType":"WEB",
        "clientMac":"00-01-6C-06-A6-29",
        "token":"2c31fabbe9fb68b009efa547609c0ccb",
        "timestamp":"1511426954094"
    },
    "data": {
        "pageSize": listQuery.pageSize,
        "currentPage": listQuery.currentPage,
        "needCount": true,
        "companyCode": '',//经营主体name
        "companyId": '',//经营主体id
        "companyName": '',//经营主体code
        "orgCode": '',//部门code
        "orgName": '',//部门name
        "orgId": '',//部门id
        "accountingYear": formdata.accountingYear,//会计年度
        "payeeName": formdata.payeeName,//收款单位名称
        "payBankAddress": formdata.payBankAddress,//付款单位开户银行
        "payType": formdata.payType,//支付类型
        "payCategory": formdata.payCategory,//付款类别
        "isSms": formdata.isSms,//发送短信
        "isCommitDtl": formdata.isCommitDtl,//是否提交明细
        "payBankAccount": formdata.payBankAccount,//付款单位银行账号
        "moneyContent": formdata.moneyContent,//款项内容
        "currencyCode": formdata.currencyCode,//币别
        "applyStatus": formdata.applyStatus,//付款申请状态
        // auitTitle: formdata.auitTitle,//OA审核标题
        "createdBy": formdata.createdBy,//创建人
        "postPersonName": formdata.postPersonName,//过账人
        "updatedBy": formdata.updatedBy,//修改人
        //创建时间
        "createdTimeStart": formdata.createdTimeStart,
        "createdTimeEnd": formdata.createdTimeEnd,
        //过账时间
        "postDateStart": formdata.postDateStart,
        "postDateEnd": formdata.postDateEnd,
        //修改日期
        "updateTimeStart": formdata.updatedTimeStart,
        "updateTimeEnd": formdata.updatedTimeEnd,
        //申请付款时间
        "applyPayTimeStart": formdata.applyPayTimeStart,
        "applyPayTimeEnd": formdata.applyPayTimeEnd,
        //实际付款日
        "actualPayDateStart": formdata.actualPayDateStart,
        "actualPayDateEnd": formdata.actualPayDateEnd,
      }
  };
  return fetch({
    url: 'codPayApply/doQueryPayApplyWithPage.json',
    method: 'post',
    data
});
}
//新增
export function doCreatePayApply(datalist,table) {
  // TODO
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
  },
  "data": {
      "codPayApplyForm":datalist,
      "codPayApplyDtlForms":table
  }
};
return fetch({
    url: 'codPayApply/doCreatePayApply.json',
    method: 'post',
    data
});
}
//查看
export function doQueryPayApplyWithDtl(payApplyId) {
  // TODO
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
  },
  "data": {
      "payApplyId":payApplyId
  }
};
return fetch({
    url: 'codPayApply/doQueryPayApplyWithDtl.json',
    method: 'post',
    data
});
}
//编辑
export function doUpdatePayApply(datalist,table,codPayApplyDtlIds) {
  // TODO
  const data = {
    "context":{
      "clientType":"WEB",
      "clientMac":"00-01-6C-06-A6-29",
      "token":"2c31fabbe9fb68b009efa547609c0ccb",
      "timestamp":"1511426954094"
  },
  "data": {
      "codPayApplyForm":datalist,
      "codPayApplyDtlForms":table,
      "codPayApplyDtlIds": codPayApplyDtlIds
  }
};
return fetch({
    url: 'codPayApply/doUpdatePayApply.json',
    method: 'post',
    data
});
}
