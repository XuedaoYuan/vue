/**
 * Created by 98263 on 2017/11/25.
 */
import fetch from '@/util/fetch'
//供应商选择
export function doQueryWithPage(page,query) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": page.limit,
      "currentPage": page.page,
      "needCount": true,
      "supplyCode": query.supplierCode,
      "supplyName": query.supplierName,
      "supplyId": query.supplierId,
      "companyId": query.companyId,
    }
  }

  return fetch({
    url: '/cmCompaniesSpply/doQueryWithPage.json',
    method: 'post',
    data
  });
}

//币种选择
export function doQueryWithPageforCurrency(query, page) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": page.pageSize,
      "currentPage": page.currentPage,
      "needCount": true,
      "currencyCode": query.currencyCode,
      "currencyName": query.currencyName,
      "supplyId": query.supplierId,
    }
  }

  return fetch({
    url: '/bbCurrency/doQueryWithPage.json',
    method: 'post',
    data
  });
}

//单位选择
export function doQueryWithPageforUnit(page,query) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data": {
      "pageSize": page.limit,
      "currentPage": page.page,
      "needCount": true,
      "unitCode": query.unitCode,
      "unitName": query.unitName,
      "unitId": query.unitId,
    }
  }

  return fetch({
    url: '/bbUnit/doQueryWithPage.json',
    method: 'post',
    data
  });
}
