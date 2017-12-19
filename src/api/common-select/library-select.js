import fetch from '@/util/fetch'
//销售出库单号查询
export function doQuerySoOs(queryObj, pageInfo) {
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
      "soOsNo":queryObj.soOsNo,
      "soContractNo": queryObj.soContractNo,
    }
  }

  return fetch({
    url: 'codSoOs/doQuerySoOs.json',
    method: 'post',
    data
  });
}
