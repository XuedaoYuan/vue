
import fetch from '@/util/fetch'
//经营主体查询
export function doQueryWithPage(val,page) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "companyName": val.companyName,//公司名称
            "companyCode": val.companyCode,//公司代码
            "companyShortName": val.companyShortName,//公司简称
            "pageSize": page.pageSize,
            "currentPage": page.currentPage,
            "needCount": true
        }
    }

    return fetch({
        url: 'pvCompanies/doQueryWithPage.json',
        method: 'post',
        data
    });
}