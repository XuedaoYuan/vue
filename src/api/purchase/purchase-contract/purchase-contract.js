/*
* @Author: Marte
* @Date:   2017-11-23 09:22:15
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-12 18:33:58
*/

import fetch from '@/util/fetch'
// export function getCatalog() {
//     return fetch({
//         url: '/mock/catalog.json',
//         method: 'get'
//     });
// }

//分页接口
export function doQueryCodPoWithPage(query,form) {
    // TODO
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": {
            'manageSubId':form.manageSubId,//经营主体Id
            'manageSubCode':form.manageSubCode,//经营主体code
            'manageSubName':form.manageSubName,//经营主体name
            'bizOrgId':form.bizOrgId,//部门id
            'bizOrgCode':form.bizOrgCode,//部门code
            'bizOrgName':form.bizOrgName,//部门name
            'poStatus':form.poStatus,//合同状态
            'lessQty':form.lessQty,//溢短装数量
            'supplierId':form.supplierId,//供应商id
            'supplierCode':form.supplierCode,//供应商code
            'supplierName':form.supplierName,//供应商name
            'createdTimeStart':form.createdTimeStart,//创建时间--开始
            'createdTimeEnd':form.createdTimeEnd,//创建时间--结束
            'transType':form.transType,//运输方式
            'weightStandType':form.weightStandType,//计重标准
            'poNo':form.poNo,//系统单据号
            'poContractNo':form.poContractNo,//采购合同号
            'buyerName':form.buyerName,//采购员
            'pickUpType':form.pickUpType,//提货方式
            'signDateStart':form.signDateStart,//签署日期--开始
            'signDateEnd':form.signDateEnd,//签署日期--结束
            'updatedBy':form.updatedBy,//修改人
            'postPersonName':form.postPersonName,//审核人
            'deliveryDateStart':form.deliveryDateStart,//交货期限始
            'deliveryDateEnd':form.deliveryDateEnd,//交货期限止
            'createdBy':form.createdBy,//创建人
            'updatedTimeStart':form.updatedTimeStart,//修改时间--开始
            'updatedTimeEnd':form.updatedTimeEnd,//修改时间--结束
            'postDateStart':form.postDateStart,//审核时间--开始
            'postDateEnd':form.postDateEnd,//审核时间--结束
            'auitTitle':form.auitTitle,//OA审核标题
            "tradeZoneName":form.tradeZoneName,//贸易地区
            "poType":'73500005',
            "pageSize": query.pageSize,
            "currentPage": query.currentPage,
            "needCount": true,
        },
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doQueryCodPoWithPage.json',
        method: 'post',
        data
    });
}
//提交ERP
export function doSubmitCodPo(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list,
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doSubmitCodPo.json',
        method: 'post',
        data
    });
}
//审核
export function doAuditCodPo(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list,
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doAuditCodPo.json',
        method: 'post',
        data
    });
}
//合同关闭
export function doCloseCodPo(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list,
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doCloseCodPo.json',
        method: 'post',
        data
    });
}
//删除
export function doDelCodPo(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list,
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doDelCodPo.json',
        method: 'post',
        data
    });
}
//取消审核
export function doCancelAuditPo(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list,
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doCancelAuditPo.json',
        method: 'post',
        data
    });
}
//收回原件确认
export function doIsBackConfirm(list) {
    let data = {
        "context": {
            "clientMac": "00-01-6C-06-A6-29",
            "clientType": "WEB",
            "token": "001885550d78efd82c0f5cc02ad3369a",
            "timestamp": 1510815285000
        },
        "data": list,
        "sign": "1078EF8F82DE0D1743418C6E255414B0"
    }

    return fetch({
        url: 'codPo/doIsBackConfirm.json',
        method: 'post',
        data
    });
}
