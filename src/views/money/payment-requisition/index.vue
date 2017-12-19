<template>
	<component :is="currentView" v-bind="currentProperties">
	</component>
</template>
<script>
import PaymentRequisition from './payment-requisition.vue';
import PaymentRequisitionAdd from './payment-requisition-add.vue';
import PaymentRequisitionEdit from './payment-requisition-edit.vue';
import PaymentRequisitionLook from './payment-requisition-look.vue';

export default {
	name: 'PaymentRequisition',
	components: {
		index: PaymentRequisition,
		add: PaymentRequisitionAdd,
		edit: PaymentRequisitionEdit,
		look: PaymentRequisitionLook
	},
	data() {
		return {
		}
	},
	mounted() {
		this.$store.dispatch('toggleCurrentView', {
			PaymentRequisition: {
				view: 'index'
				// params: 跳转过去的子组件的属性对象
			}
		});
		console.log('store => ', this.$store);
	},
	computed: {
		currentView() {
			return this.$store.getters.currentView.PaymentRequisition;
		},
		currentProperties() {
			console.log('params => ', this.$store.getters.params.PaymentRequisition);
			return this.$store.getters.params.PaymentRequisition;
		}
	}
}

</script>
