import fetch from '@/util/fetch'
//查询接口
export function doQueryWithPage(query,form) {
    // TODO
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "customerName":form.customerName,
            "customerCode":form.customerCode,
            "customerId":form.customerId,
            "pageSize": query.pageSize,
            "currentPage": query.currentPage,
            "needCount": true,
        },
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codBbRgAddress/doQueryWithPage.json',
        method: 'post',
        data
    });
}
//新增接口
export function doAddBbRgAdress(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list
    }
    return fetch({
        // url: 'pvOrganizations/doQueryWithPage.json',
        url: 'codBbRgAddress/doAddBbRgAdress.json',
        method: 'post',
        data
    });
}