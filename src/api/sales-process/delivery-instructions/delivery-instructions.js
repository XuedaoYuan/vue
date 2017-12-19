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
  }
  return fetch({
    url: 'codDin/doQueryWithPage.json',
    method: 'post',
    data
  });
}

// 新增的查询接口
export function doQueryWithPageforDin(tempAll) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  tempAll,
  }
  return fetch({
    url: 'codSo/doQueryWithPageforDin.json',
    method: 'post',
    data
  });
}

// 新增保存接口codDin/doCusSave.json
export function doCusSave(codDinform,codDinDtlFrom) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
      "codDinform":codDinform,
      "codDinDtlFrom":codDinDtlFrom,
    },
  }
  return fetch({
    url: 'codDin/doCusSave.json',
    method: 'post',
    data
  });
}
// 发货指令查询单条 codDin/doQueryCusAll.json
export function doQueryCusAll(id) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "dinId":id
    },
  }
  return fetch({
    url: 'codDin/doQueryCusAll.json',
    method: 'post',
    data
  });
}
// 发货指令匹配 codDin/doGetForSoOs.json
export function doGetForSoOs(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  info,
  }
  return fetch({
    url: 'codDin/doGetForSoOs.json',
    method: 'post',
    data
  });
}
// 发货指令修改 codDin/doCusUpdate.json
export function doCusUpdate(codDinform,codDinDtlFrom,codDinDtlDel) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
      "codDinform":codDinform,
      "codDinDtlFrom":codDinDtlFrom,
      "codDinDtlDel":codDinDtlDel,
    },
  }
  return fetch({
    url: 'codDin/doCusUpdate.json',
    method: 'post',
    data
  });
}

// 审批  codDin/doAuditCodDin.json
export function doAuditCodDin(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": info,
  }
  return fetch({
    url: 'codDin/doAuditCodDin.json',
    method: 'post',
    data
  });
}
// 取消审批codDin/abolishCodDin.json
export function abolishAuditCodDin(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": info,
  }
  return fetch({
    url: 'codDin/abolishCodDin.json',
    method: 'post',
    data
  });
}

// 删除
export function doDeleteDin(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": info,
  }
  return fetch({
    url: 'codDin/doDeleteDin.json',
    method: 'post',
    data
  });
}

// 生成出库单  doCusSaveSoOs
export function doCusSaveSoOs(info) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": info,
  }
  return fetch({
    url: 'codDin/doCusSaveSoOs.json',
    method: 'post',
    data
  });
}