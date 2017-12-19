<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import SalesOutwarehouse from './sales-outwarehouse.vue';
import SalesOutwarehouseAdd from './sales-outwarehouse-add.vue';
import SalesOutwarehouseEdit from './sales-outwarehouse-edit.vue';
import SalesOutwarehouseLook from './sales-outwarehouse-look.vue';

export default {
	name: 'SalesOutwarehouse',
	components: {
		index: SalesOutwarehouse,
		add: SalesOutwarehouseAdd,
		edit: SalesOutwarehouseEdit,
		look: SalesOutwarehouseLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			SalesOutwarehouse: {
				view: 'index'
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.SalesOutwarehouse;
		},
		currentProperties() {
			return this.$store.getters.params.SalesOutwarehouse;
		}
	}
}

</script>
