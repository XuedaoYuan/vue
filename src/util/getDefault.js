/**
 * ============================
 * @Author: Xuedao Yuan
 * @DateTime: 2017-11-27 15:25:20
 * @des: 新建页面的取消需要重置页面已经填充的数据， 字段表太多导致麻烦，此JS用于获取默认数据
 * @函数命名规则： get + 你的模块名字 + DataDefault
 * @更多建议欢迎提出
 * ============================
 */

/*采购暂收单的*/
export function getPurchasReceiptDataDefault() {
  return {
    sourceNo: '',
    sourceId: 'sourceId',
    poGrStatus: '70300010',
    operationType: '74050020', //移动类型
    manageSubCode: '',
    manageSubName: '',
    manageSubId: '',
    poGrType: '72300010', //采购了信息给
    supplierId: '',
    supplierCode: '',
    supplierName: '',
    bizOrgId: '',
    bizOrgCode: '',
    bizOrgName: '',
    billNo: '', //提单号
    certificatesDate: new Date(),
    warehouseId: '',
    warehouseCode: '',
    warehouseName: '',
    auitTitle: '',
    actReceiveAmt: 0,
    poorginalAmt: 0,
    poorginalAmtTex: 0,
    poBaseAmt: 0,
    poBaseAmtTex: 0,
    currencyId: '',
    currencyCode: '',
    currencyName: '',
    rateCurrency: '',
    credenIden: '',
    credenNo: '',
    failReason: 'f',
    isReturn: 1,
    setttleWeight: 111,
    postPersonName: 'postPersonName',
    postPersonCode: 'postPersonCode',
    postPersonId: 'postPersonId',
    postDate: '2017-03-03',
    remark: '',
    isDel: 1,
    createdBy: '',
    createdTime: '2017-09-09',
    updatedTime: '2017-09-09',
    updatedBy: '',
    isInactive: 1,
    isolationCode: 1,
    codPoGrDtlCusList: []
  }
}

// 采购收货新增
export function getPurchasReceiptTempAllDataDefault() {
  return {
    manageSubCode: '',
    manageSubName: '',
    manageSubId: '',

    bizOrgId: '',
    bizOrgCode: '',
    bizOrgName: '',

    supplierId: '',
    supplierCode: '',
    supplierName: '',


    poGrType: '',

    operationType: '', //移动类型

    // 采购合同号
    poContractNo: '',

    // 采购收货单号no
    poGrNo: '',

    warehouseId: '',
    warehouseCode: '',
    warehouseName: '',


    certificatesDate: '',

    // 提交号和id
    lbNo: '',
    lbId: '',

    // 币别
    currencyId: '',
    currencyCode: '',
    currencyName: '',

    postStatus: '',

    // OA审核标题
    auitTitle: '',

    createdTime: '',

    updatedTime: '',


    createdBy: '',

    updatedBy: '',

    postDate: '',

    // 过账人
    postPersonName: '',
    postPersonCode: '',
    postPersonId: ''

  }
}

// 采购收货编辑
export function getPurchasReceiptEditDataDefault() {
  return {


    poGrId: '0e4b44c879074f4f83dbd460a86344e7',
    poGrNo: 'SH201712000016',

    sourceNo: 'sourceNo',
    sourceId: 'sourceId',
    poGrStatus: 1,
    operationType: 1,
    manageSubCode: 'manageSubCode',
    manageSubName: 'manageSubName',
    manageSubId: 'manageSubId',
    poGrType: 1,
    supplierId: 'supplierId',
    supplierCode: 'supplierCode',
    supplierName: 'supplierName',
    bizOrgId: 'bizOrgId',
    bizOrgCode: 'bizOrgCode',
    bizOrgName: 'bizOrgName',
    certificatesDate: '2017-08-08',
    warehouseId: 'warehouseId',
    warehouseCode: 'warehouseCode',
    warehouseName: 'warehouseName',
    auitTitle: 'auitTitle',
    actReceiveAmt: 11,
    poorginalAmt: 11,
    poorginalAmtTex: 11,
    poBaseAmt: 11,
    poBaseAmtTex: 11,
    currencyId: 'currencyId',
    currencyCode: 'currencyCode',
    currencyName: 'currencyName',
    rateCurrency: 11,
    credenIden: 11,
    credenNo: 'credenNo',
    failReason: 'failReason',
    isReturn: 1,
    setttleWeight: 111,
    postPersonName: 'postPersonName',
    postPersonCode: 'postPersonCode',
    postPersonId: 'postPersonId',
    postDate: '2017-03-03',
    remark: 'remark',
    isDel: 1,
    createdBy: 'createdBy',
    createdTime: '2017-09-09',
    updatedTime: '2017-09-09',
    updatedBy: 'updatedBy',
    isInactive: 1,
    isolationCode: 1,
    codPoGrDtlCusList: [{
      poRowNo: '1',
      poGrDtlId: '11',
      poDtlId: '111',
      poGrRowNo: 1,
      poGrId: '12312',
      poContractNo: '',
      poNo: '23123',
      sourceDtlId: '12312',
      goodsId: '1231',
      goodsCode: '1231',
      goodsName: '水果',
      isGift: 1,
      bizOrgId: '221321',
      bizOrgCode: '123123',
      qty: 111,
      bizOrgName: '21312',
      rejectsProductQty: 0,
      goodsProductQty: 0,
      settleReturnQty: 0,
      settleChangeQty: 0,
      settleWriteOffQty: 0,
      actChangeQty: 0,
      actWriteOffQty: 0,
      actReturnQty: 0,
      hasSettleQty: 0,
      settleQty: 0,
      lessQty: 0,
      actReceiveQty: 0,
      unitId: '2312',
      unitName: '123 ',
      unitCode: '个',
      settleUnitId: '1231223',
      settleUnitName: '54535',
      settleUnitCode: '34534',
      cabinetNo: '435',
      basePrice: 0,
      basePriceTex: 0,
      orginPrice: 0,
      orginPriceTex: 0,
      baseAmt: 0,
      baseAmtTex: 0,
      orginAmt: 0,
      orginAmtTex: 0,
      seriesNo: '987',
      supplierBatchNo: '876',
      productDate: '2017-09-09',
      packType: '71350010',
      remark: '阿斯达',
      isDel: 0,
      createdBy: '袁学道',
      createdTime: '2017-09-09',
      updatedTime: '2016-26-12',
      updatedBy: '相当于',
      version: 0,
      isInactive: 1,
      isolationCode: 1,
      baseTexAmt: 11,
      texRate: 1.01,
      orginTexAmt: 111,
    }],
    deleteIdList: []
  }
}
