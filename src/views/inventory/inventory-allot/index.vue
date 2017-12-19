<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import InventoryAllot from './inventory-allot.vue';
import InventoryAllotAdd from './inventory-allot-add.vue';
import InventoryAllotEdit from './inventory-allot-edit.vue';
import InventoryAllotLook from './inventory-allot-detail.vue';
export default {
	name: 'InventoryAllot',
	components: {
		index: InventoryAllot,
		add: InventoryAllotAdd,
		edit: InventoryAllotEdit,
		detail: InventoryAllotLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
      InventoryAllot: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.InventoryAllot;
		},
		currentProperties() {
			return this.$store.getters.params.InventoryAllot;
		}
	}
}

</script>
