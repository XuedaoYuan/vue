import fetch from '@/util/fetch'
// 暂收
export function doQueryWithPage(query, pageInfo, typeObj) {
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": pageInfo.pageSize,
      "currentPage": pageInfo.currentPage,
      "needCount": true,
      "poGrNo": query.poGrNo,
      "bizOrgName": query.bizOrgName,
      "supplierName": query.supplierName,
      "manageSubName": query.manageSubName,
      "operationType": 74050020,
      "poGrType": 72300010,
      "poGrStatus": 70300020

    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }


  return fetch({
    url: '/codPoGr/doQueryWithPage.json',
    method: 'POST',
    data
  })
}

// 在途单选择
export function doQueryCodOwWithPage(queryObj, pageInfo) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": pageInfo.pageSize,
      "currentPage": pageInfo.currentPage,
      "needCount": true,
      "owNo": queryObj.owNo,
      "bizOrgName": queryObj.bizOrgName,
      "supplierName": queryObj.supplierName,
      "manageSubName": queryObj.manageSubName,

    }
  }

  return fetch({

    url: 'codOwDtl/doCusQuery.json',
    method: 'post',
    data
  });
}
