<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import SalesInventory from './inventory-adjustment.vue';
import SalesInventoryAdd from './inventory-adjustment-add.vue';
import SalesInventoryEdit from './inventory-adjustment-edit.vue';
import SalesInventoryLook from './inventory-adjustment-look.vue';

export default {
	name: 'SalesInventory',
	components: {
		index: SalesInventory,
		add: SalesInventoryAdd,
		edit: SalesInventoryEdit,
		look: SalesInventoryLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
      SalesInventory: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.SalesInventory;
		},
		currentProperties() {
			return this.$store.getters.params.SalesInventory;
		}
	}
}

</script>
