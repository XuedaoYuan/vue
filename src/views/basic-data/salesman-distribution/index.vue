<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import SalesmanDistribution from './salesman-distribution.vue';
export default {
	name: 'SalesmanDistribution',
	components: {
		index: SalesmanDistribution,
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			SalesmanDistribution: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.SalesmanDistribution;
		},
		currentProperties() {
			return this.$store.getters.params.SalesmanDistribution;
		}
	}
}

</script>
