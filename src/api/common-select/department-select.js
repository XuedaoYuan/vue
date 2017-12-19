
import fetch from '@/util/fetch'
//部门查询
export function doQueryWithPage(val,page) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "companyCode": val.companyCode,//公司代码
            "companyName": val.companyName,//公司名称
            "companyId": val.companyId,//公司id
            "orgCode": val.orgCode,//部门代码
            "orgName": val.orgName,//部门名称
            "oaOrgCode": val.oaOrgCode,//oa部门编码
            "oaOrgName": val.oaOrgName,//oa部门名称
            "pageSize": page.pageSize,
            "currentPage": page.currentPage,
            "needCount": true
        }
    }

    return fetch({
        // url: 'pvOrganizations/doQueryWithPage.json',
        url: 'pvOrganizations/doQueryPage.json',
        method: 'post',
        data
    });
}