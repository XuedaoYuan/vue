import fetch from '@/util/fetch'



export function getList() {
  var data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": 10,
      "currentPage": 1,
      "needCount": true
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }

  return fetch({
  	url: '/cotton-web/codPoGr/doQueryWithPage.json',
  	method: 'POST',
  	data
  })
}
