<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import ProductMain from './product-main.vue' //产品主档
import ProductMainAdd from './product-main-add.vue' //产品主档--创建
import ProductMainEdit from './product-main-edit.vue' //产品主档--编辑修改
import ProductMainLook from './product-main-look.vue' //产品主档--查看

export default {
	name: 'ProductMain',
	components: {
		index: ProductMain,
		add: ProductMainAdd,
		edit: ProductMainEdit,
		look: ProductMainLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			ProductMain: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.ProductMain;
		},
		currentProperties() {
			return this.$store.getters.params.ProductMain;
		}
	}
}

</script>
