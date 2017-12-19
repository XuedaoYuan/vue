/*
* @Author: Marte
* @Date:   2017-11-23 16:23:24
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-12 10:56:37
*/

import fetch from '@/util/fetch';
//新增
export function doCreateCodPo(form,list,pmForms) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            "codPoForm": form,
            "codPoDtlCreateForms": list,
            "pmForms": pmForms
        },
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doCreateCodPo.json',
        method: 'post',
        data
    });
}