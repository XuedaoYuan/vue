<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import PurchaseReceipt from './purchase-receipt.vue' //采购收货单
import PurchaseReceiptAdd  from './purchase-receipt-add.vue' //采购收货单--创建
import PurchaseReceiptEdit from './purchase-receipt-edit.vue' //采购收货单--编辑修改
import PurchaseReceiptLook from './purchase-receipt-look.vue' //采购收货单--查看

export default {
	name: 'PurchaseReceipt',
	components: {
		index: PurchaseReceipt,
		add: PurchaseReceiptAdd,
		edit: PurchaseReceiptEdit,
		look: PurchaseReceiptLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			PurchaseReceipt: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.PurchaseReceipt;
		},
		currentProperties() {
			return this.$store.getters.params.PurchaseReceipt;
		}
	}
}

</script>
