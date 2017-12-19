<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import SalesReturn from './sales-return.vue';
import SalesReturnAdd from './sales-return-add.vue';
import SalesReturnEdit from './sales-return-edit.vue';

export default {
	name: 'SalesReturn',
	components: {
		index: SalesReturn,
		add: SalesReturnAdd,
		edit: SalesReturnEdit,
//		look: SalesContractLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			SalesReturn: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.SalesReturn;
		},
		currentProperties() {
			return this.$store.getters.params.SalesReturn;
		}
	}
}

</script>
