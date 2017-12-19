<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import SalesContract from './sales-contract.vue';
import SalesContractAdd from './sales-contract-add.vue';
import SalesContractEdit from './sales-contract-edit.vue';
import SalesContractLook from './sales-contract-look.vue';

export default {
	name: 'SalesContract',
	components: {
		index: SalesContract,
		add: SalesContractAdd,
		edit: SalesContractEdit,
		look: SalesContractLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			SalesContract: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.SalesContract;
		},
		currentProperties() {
			return this.$store.getters.params.SalesContract;
		}
	}
}

</script>
