/*
* @Author: Marte
* @Date:   2017-12-01 17:24:56
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-07 15:54:42
*/

import fetch from '@/util/fetch';
//关闭
export function doQueryCodPoWithDtl(id) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "poId": id
        },
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doQueryCodPoWithDtl.json',
        method: 'post',
        data
    });
}
//取消关闭
export function doCancelDeliveryClose(list) {
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
        url: 'codPo/doCancelDeliveryClose.json',
        method: 'post',
        data
    });
}

//查询
export function doDeliveryClose(list) {
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
        url: 'codPo/doDeliveryClose.json',
        method: 'post',
        data
    });
}