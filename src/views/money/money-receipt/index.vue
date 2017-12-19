<template>
	<component :is="currentView" v-bind="currentProperties">
	</component>
</template>
<script>
import MoneyReceipt from './money-receipt.vue';
import MoneyReceiptAdd from './money-receipt-add.vue';
import MoneyReceiptEdit from './money-receipt-edit.vue';

export default {
	name: 'MoneyReceipt',
	components: {
		index: MoneyReceipt,
		add: MoneyReceiptAdd,
		edit: MoneyReceiptEdit,
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			MoneyReceipt: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
		console.log('store => ', this.$store);
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.MoneyReceipt;
		},
		currentProperties() {
			console.log('params => ', this.$store.getters.params.MoneyReceipt);
			return this.$store.getters.params.MoneyReceipt;
		}
	}
}

</script>
