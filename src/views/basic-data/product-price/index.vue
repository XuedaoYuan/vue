<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import ProductPrice from './product-price.vue';
export default {
	name: 'ProductPrice',
	components: {
		index: ProductPrice,
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			ProductPrice: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.ProductPrice;
		},
		currentProperties() {
			return this.$store.getters.params.ProductPrice;
		}
	}
}

</script>
