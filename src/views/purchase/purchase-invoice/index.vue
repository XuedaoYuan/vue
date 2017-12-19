<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import PurchaseInvoice from './purchase-invoice.vue';
import PurchaseInvoiceAdd from './purchase-invoice-add.vue';
import PurchaseInvoiceEdit from './purchase-invoice-edit.vue';
import PurchaseInvoiceLook from './purchase-invoice-look.vue';

export default {
	name: 'PurchaseInvoice',
	components: {
		index: PurchaseInvoice,
		add: PurchaseInvoiceAdd,
		edit: PurchaseInvoiceEdit,
		look: PurchaseInvoiceLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			PurchaseInvoice: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.PurchaseInvoice;
		},
		currentProperties() {
			return this.$store.getters.params.PurchaseInvoice;
		}
	}
}

</script>
