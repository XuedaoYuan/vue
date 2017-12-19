import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'views/layout/layout';
import AppMain from 'views/layout/app-main.vue'
import ViewStage from 'views/layout/view-stage'
import HomeIndex from 'views/home/index.vue'

//共通组件
import CommonComponent from 'views/common/common-component'

import moneyReceiptIndex from 'views/money/money-receipt/index.vue' //收款单

// import Purchas from 'views/home/purchas.vue'
import TrackingManageIndex from 'views/purchase/tracking-manage/index.vue' //在途跟管理
import PurchaseReturnIndex from 'views/purchase/purchase-return/index.vue'
import PurchaseInvoiceIndex from 'views/purchase/purchase-invoice/index.vue' //采购发票

import PurchasContractIndex from 'views/purchase/purchase-contract/index.vue' //代理内贸采购
import PurchasContractImportedIndex from 'views/purchase/purchase-contract-imported/index.vue' //自营进口采购--主页
import PurchaseReceiptIndex from 'views/purchase/purchase-receipt/index.vue' //采购收货单

// import PurchaseReceiptAdd from 'views/purchase/purchase-receipt/purchase-receipt-add.vue' //采购收货单--创建
// import PurchaseReceiptEdit from 'views/purchase/purchase-receipt/purchas-receipt-edit.vue' //采购收货单--编辑修改
// import PurchaseReceiptLook from 'views/purchase/purchase-receipt/purchas-receipt-look.vue' //采购收货单--查看

//付款申请单
import PaymentRequisitionIndex from 'views/money/payment-requisition/index.vue'

import Test from 'mock/views/test.vue'

// 销售流程部分
import SalesContractIndex from 'views/sales-process/sales-contract/index.vue' //销售合同index


import SalesReturnIndex from 'views/sales-process/sales-return/index.vue' //销售退货index

import SalesOutWarehouseIndex from 'views/sales-process/sales-outwarehouse/index.vue' //销售出库

import SalesInvoiceIndex from 'views/sales-process/sales-invoice/index.vue' //销售发票
import DeliveryInstructionsIndex from 'views/sales-process/delivery-instructions/index.vue' //发货指令

/*库存模块*/
import SalesInventoryIndex from 'views/inventory/inventory-adjustment/index.vue' //库存调整单

import InventoryAllotIndex from 'views/inventory/inventory-allot/index.vue' //库存调拨单

/*基础数据*/
import PortIndex from 'views/basic-data/port/index.vue' //港口主数据
import ProductPriceIndex from 'views/basic-data/product-price/index.vue' //产品价格表
import SalesmanDistributionIndex from 'views/basic-data/salesman-distribution/index.vue' //产品价格表
import ProjectArchives from 'views/basic-data/project-archives/index.vue' //检验项目档案
import ReceiptInformation from 'views/basic-data/receipt-information/index.vue' //收货信息
import ProductMainIndex from 'views/basic-data/product-main/index.vue' //收款信息


Vue.use(Router)


export const routesMap = [{
    path: '/basicData',
    name: '基础数据',
    label: '基础数据',
    icon: 'MS-001',
    component: AppMain,
    children: [{
      path: 'Port',
      name: '港口主数据',
      label: '港口主数据',
      meta: { level: 2 },
      component: PortIndex
    }, {
      path: 'ProductPrice',
      name: '产品价格表',
      label: '产品价格表',
      meta: { level: 2 },
      component: ProductPriceIndex
    }, {
      path: 'SalesmanDistribution',
      name: '客户业务员分配',
      label: '客户业务员分配',
      meta: { level: 2 },
      component: SalesmanDistributionIndex
    }, {
      path: 'ProjectArchives',
      name: '检验项目档案',
      label: '检验项目档案',
      meta: { level: 2 },
      component: ProjectArchives
    }, {
      path: 'ReceiptInformation',
      name: '收货信息',
      label: '收货信息',
      meta: { level: 2 },
      component: ReceiptInformation
    }, {
      path: 'ProductMain',
      name: '产品主档',
      label: '产品主档',
      meta: { level: 2 },
      component: ProductMainIndex
    }]
  },
  {
    path: '/salesProcess',
    name: '销售管理',
    label: '销售管理',
    icon: 'MS-002',
    component: AppMain,
    children: [{
        path: 'salesContract',
        name: '销售合同',
        label: '销售合同',
        component: SalesContractIndex,
        meta: { code: 'SalesContract' },
      }, {
        path: 'DeliveryInstructions',
        name: '发货指令',
        label: '发货指令',
        component: DeliveryInstructionsIndex,
        meta: { code: 'DeliveryInstructions' },
      }, {
        path: 'salesOutWarehouse',
        name: '销售出库',
        label: '销售出库',
        component: SalesOutWarehouseIndex,
        meta: { code: 'SalesOutwarehouse' },
      },
      {
        path: 'salesReturn',
        name: '销售退货',
        label: '销售退货',
        component: SalesReturnIndex,
        meta: { code: 'SalesReturn' },
      },
      {
        path: 'SalesInvoice',
        name: '销售发票',
        label: '销售发票',
        component: SalesInvoiceIndex,
        meta: { code: 'SalesInvoice' },
      },
    ]
  },
  {
    path: '/purchase',
    name: 'purchase',
    label: '采购管理',
    icon: 'MS-003',
    component: AppMain,
    children: [{
        path: 'PurchasContract',
        name: '采购合同(内贸)',
        label: '采购合同(内贸)',
        component: PurchasContractIndex,
        meta: { code: 'PurchaseContract' },
      }, {
        path: 'PurchasContractImported',
        name: '采购合同(进口)',
        label: '采购合同(进口)',
        component: PurchasContractImportedIndex,
        meta: { code: 'PurchaseContractImported' },
      },
      {
        path: 'TrackingManage',
        name: '在途管理',
        label: '在途管理',
        component: TrackingManageIndex,
        meta: { code: 'TrackingManage' },
      }, {
        path: 'PurchaseReceipt',
        name: '采购收货',
        label: '采购收货',
        component: PurchaseReceiptIndex,
        meta: { code: 'PurchaseReceipt' }
      }, {
        path: 'purchase-return',
        name: '采购冲销/退货',
        label: '采购冲销/退货',
        component: PurchaseReturnIndex,
        meta: { code: 'PurchaseReturn' },

      }, {
        path: 'purchase-invoice',
        name: '采购发票',
        label: '采购发票',
        component: PurchaseInvoiceIndex,
        meta: { code: 'PurchaseInvoice' },
      }
    ]
  },
  {
    path: '/inventory',
    name: 'inventory',
    label: '库存管理',
    icon: 'MS-004',
    component: AppMain,
    children: [{
        path: 'InventoryAdjustment',
        name: '库存调整',
        label: '库存调整',
        component: SalesInventoryIndex,
        meta: { code: 'SalesInventory' },
      },
      {
        path: 'inventory-allot',
        name: '库存调拨',
        label: '库存调拨',
        component: InventoryAllotIndex,
        meta: { code: 'InventoryAllot' },
      }
    ]
  },
  {
    path: '/money',
    name: 'money',
    label: '资金管理',
    icon: 'MS-005',
    component: AppMain,
    children: [{
      path: 'PaymentRequisition',
      name: '付款申请单',
      label: '付款申请单',
      component: PaymentRequisitionIndex,
      meta: { code: 'PaymentRequisition' },
    }, {
      path: 'money-receipt',
      name: '收款单',
      label: '收款单',
      meta: { code: 'MoneyReceipt' },
      component: moneyReceiptIndex
    }]
  },
  {
    path: '/test',
    name: '测试',
    label: '测试',
    icon: 'MS-001',
    component: AppMain,
    children: [{
        path: 'commonTable',
        name: '公共组件测试',
        label: '公共组件测试',
        icon: 'MS-001',
        component: Test
      },
      {
        path: 'commonComponent',
        name: '共通组件',
        label: '共通组件',
        icon: 'MS-001',
        component: CommonComponent
      }
    ]
  }

]

const routes = [{
    path: '/',
    name: '首页',
    component: Layout,
    children: [{
      path: '/',
      name: '首页',
      component: AppMain,
      children: [{
        path: '/',
        name: '首页',
        component: HomeIndex,
      }]
    }]
  },
  {
    path: '/',
    component: Layout,
    children: routesMap
  }
]

export default new Router({
  routes
})
