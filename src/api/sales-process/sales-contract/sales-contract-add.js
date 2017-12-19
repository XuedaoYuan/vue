import fetch from '@/util/fetch'

//新增接口
export function doAddCosSo(tempAll,list,expmList) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
        "codSoForm":tempAll,
        "codSoDtlFormList":list,
        "pmList":expmList
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doAddCosSo.json',
    method: 'post',
    data
  });
}

//修改接口
export function doUpdateCodSo(codSoForm,list,deleteIdList,expmList,deleteExpmList) {
  let data = {
    "context": {
      "clientMac": "00-01-6C-06-A6-29",
      "clientType": "WEB",
      "token": "001885550d78efd82c0f5cc02ad3369a",
      "timestamp": 1510815285000
    },
    "data":  {
        "codSoForm":codSoForm,//列表
        "codSoDtlFormList":list,//明细
        "deleteIdList":deleteIdList,//删行id
        "pmList":expmList,//收款计划（预付款计划表）
        "deletePmList":deleteExpmList,//收款计划（删行）
    },
    "sign": "1078EF8F82DE0D1743418C6E255414B0"
  }
  return fetch({
    url: 'codSo/doUpdateCodSo.json',
    method: 'post',
    data
  });
}

