<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
//import SalesContract from './sales-contract.vue';
//import SalesContractAdd from './sales-contract-add.vue';
//import SalesContractEdit from './sales-contract-edit.vue';
//import SalesContractLook from './sales-contract-look.vue';
import PurchaseReturn from './purchase-return.vue';
import PurchaseReturnAdd from './purchase-return-add.vue';
import PurchaseReturnEdit from './purchase-return-edit.vue';
import PurchaseReturnLook from './purchase-return-look.vue';
export default {
	name: 'PurchaseReturn',
	components: {
		index: PurchaseReturn,
		add: PurchaseReturnAdd,
		edit: PurchaseReturnEdit,
		detail: PurchaseReturnLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
      PurchaseReturn: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.PurchaseReturn;
		},
		currentProperties() {
			return this.$store.getters.params.PurchaseReturn;
		}
	}
}

</script>
