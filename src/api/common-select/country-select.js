import fetch from '@/util/fetch'
//经营主体查询
export function doQueryWithPage(queryObj, pageInfo) {
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
      "countryName": queryObj.countryName,
      "countryCode": queryObj.countryCode
    }
  }

  return fetch({
    url: 'bbCountry/doQueryWithPage.json',
    method: 'post',
    data
  });
}
