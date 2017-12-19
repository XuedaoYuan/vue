import fetch from '@/util/fetch'

//创建
export function doBGPSave (dataList) {
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
    url: 'codBbGdPrice/doBGPSave.json',
    method: 'post',
    data
  });
}

//查询
export function doBGPQueryWithPage (dataList, page) {
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
      goodsNameType: dataList.goodsNameType,//产品类型
      goodsName: dataList.goodsName//产品名称
    }
  }

  return fetch({
    url: 'codBbGdPrice/doBGPQueryWithPage.json',
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
    url: 'codBbGdPrice/doDeleteBGP.json',
    method: 'post',
    data
  });
}

//修改
export function doUpdateBGPOw (dataList) {
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
    url: 'codBbGdPrice/doUpdateBGPOw.json',
    method: 'post',
    data
  });
}
