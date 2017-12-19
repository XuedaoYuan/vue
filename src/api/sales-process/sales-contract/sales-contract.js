import fetch from '@/util/fetch'

//查询
export function doQueryWithPage(tempAll) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  tempAll,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doQueryWithPage.json',
    method: 'post',
    data
  });
}

// 单条查看
export function doQueryCodSo(id) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
      "soId":id
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doQueryCodSo.json',
    method: 'post',
    data
  });
}

// 删除
export function doDeleteCodSo(arr) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  arr,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doDeleteCodSo.json',
    method: 'post',
    data
  });
}

// 审核
export function doAuditingCodSo(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
      "soId":info.soId,
      "version":info.version,
      "soStatus":info.soStatus
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doAuditingCodSo.json',
    method: 'post',
    data
  });
}

// 取消审核
export function doCancelAuditingCodSo(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
      "soId":info.soId,
      "version":info.version
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doCancelAuditingCodSo.json',
    method: 'post',
    data
  });
}

// 合同关闭
export function doCloseCodSo(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  info,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doCloseCodSo.json',
    method: 'post',
    data
  });
}

// 收回原件确认
export function doBackorginal(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  info,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doBackOrgin.json',
    method: 'post',
    data
  });
}

// 提交ERP接口
export function doSubmitERP(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  info,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doSubmitERP.json',
    method: 'post',
    data
  });
}

// 发货关闭(关闭)
export function doDeliveGoodsClose(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  info,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doDeliveGoodsClose.json',
    method: 'post',
    data
  });
}

// 发货关闭(打开)
export function doDeliveGoodsOpen(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  info,
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doDeliveGoodsOpen.json',
    method: 'post',
    data
  });
}