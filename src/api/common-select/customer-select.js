
import fetch from '@/util/fetch'
//客户查询
export function doQueryWithPage(val,page) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "custName":val.custName,
            "custCode":val.custCode,
            "applyBy":val.applyBy,
            "companyId":val.companyId,
            "pageSize": page.pageSize,
            "currentPage": page.currentPage,
            "needCount": true
        }
    }

    return fetch({
        url: 'cmCompaniesCust/doQueryWithPage.json',
        method: 'post',
        data
    });
}