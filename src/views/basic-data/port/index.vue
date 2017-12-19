<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import PortDetail from './port.vue';
import PortDetailAdd from './port-add.vue';
import PortDetailEdit from './port-edit.vue';
import PortDetailLook from './port-detail.vue';

export default {
	name: 'PortDetail',
	components: {
		index: PortDetail,
		add: PortDetailAdd,
    edit: PortDetailEdit,
    look: PortDetailLook,
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			PortDetail: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.PortDetail;
		},
		currentProperties() {
			return this.$store.getters.params.PortDetail;
		}
	}
}

</script>
