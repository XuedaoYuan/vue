<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import ReceiptInformation from './receipt-information.vue';
import ReceiptInformationAdd from './receipt-information-add.vue';
import ReceiptInformationEdit from './receipt-information-edit.vue';
export default {
    name: 'ReceiptInformation',
    components: {
        index: ReceiptInformation,
        add:ReceiptInformationAdd,
        edit:ReceiptInformationEdit
    },
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('toggleCurrentView', {
            ReceiptInformation: {
                view: 'index'
                // params: 跳转过去的子组件的属性对象
            }
        });
    },
    computed: {
        currentView() {
            return this.$store.getters.currentView.ReceiptInformation;
        },
        currentProperties() {
            return this.$store.getters.params.ReceiptInformation;
        }
    }
}

</script>
