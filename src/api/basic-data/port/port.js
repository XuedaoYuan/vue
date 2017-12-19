import fetch from '@/util/fetch'

//创建
export function doCusSave (formData) {
  // TODO
  const data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "2c31fabbe9fb68b009efa547609c0ccb"
    },
    "data": formData
  }

  return fetch({
    url: 'codBsPt/doCusSave.json',
    method: 'post',
    data
  });
}

//查询
export function doQueryWithPage (obj, page) {
  // TODO
  const data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "2c31fabbe9fb68b009efa547609c0ccb"
    },
    "data": {
      'pageSize': page.pageSize,
      'currentPage': page.currentPage,
      "needCount": true,
      'bsPtCode': obj.bsPtCode,
      'bsPtName': obj.bsPtName,
      'bsPtStatus': obj.bsPtStatus,
      'bsPtNature': obj.bsPtNature
    }
  }

  return fetch({
    url: 'codBsPt/doQueryWithPage.json',
    method: 'post',
    data
  });
}

//修改查看
export function doGet (bsPtId) {
  // TODO
  const data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "2c31fabbe9fb68b009efa547609c0ccb"
    },
    "data": bsPtId
  }

  return fetch({
    url: 'codBsPt/doGet.json',
    method: 'post',
    data
  });
}

//删除
export function doDeleteBGP (dataList) {
  // TODO
  const data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "2c31fabbe9fb68b009efa547609c0ccb"
    },
    "data": dataList
  }

  return fetch({
    url: 'codBsPt/doDeleteBGP.json',
    method: 'post',
    data
  });
}

//修改
export function doCusUpdate (formData) {
  // TODO
  const data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "2c31fabbe9fb68b009efa547609c0ccb"
    },
    "data": formData
  }

  return fetch({
    url: 'codBsPt/doCusUpdate.json',
    method: 'post',
    data
  });
}
