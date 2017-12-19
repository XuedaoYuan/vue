/*
* @Author: Marte
* @Date:   2017-11-24 14:13:08
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-12 14:04:39
*/

import fetch from '@/util/fetch';
//查询
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
//修改保存
export function doUpdateCodPo(form,list,codPoDtlIdDels,codPoDpIdDels,pmDels,pmForms) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "codPoForm": form,
            "codPoDtlCreateForms":list,
            "codPoDtlIdDels":codPoDtlIdDels,
            "codPoDpIdDels":codPoDpIdDels,
            "pmDels":pmDels,
            "pmForms":pmForms
        },
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doUpdateCodPo.json',
        method: 'post',
        data
    });
}
//查询到货计划
// export function doQueryDpByDtlId(id) {
//     let data = {
//         "context": {
//             "clientMac": "00-01-6C-06-A6-29",
//             "clientType": "WEB",
//             "token": "001885550d78efd82c0f5cc02ad3369a",
//             "timestamp": 1510815285000
//         },
//         "data": {
//             "poDtlId": id,
//         }
//     }

//     return fetch({
//         url: 'codPo/doQueryDpByDtlId.json',
//         method: 'post',
//         data
//     });
// }