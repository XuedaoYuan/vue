<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import PurchaseContractImported from './purchase-contract-imported.vue';
import PurchaseContractImportedAdd from './purchase-contract-imported-add.vue';
import PurchaseContractImportedEdit from './purchase-contract-imported-edit.vue';
import PurchaseContractImportedLook from './purchase-contract-imported-look.vue';

export default {
    name: 'PurchaseContractImported',
    components: {
        index: PurchaseContractImported,
        add: PurchaseContractImportedAdd,
        edit: PurchaseContractImportedEdit,
        look: PurchaseContractImportedLook
    },
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('toggleCurrentView', {
            PurchaseContractImported: {
                view: 'index'
                // params: 跳转过去的子组件的属性对象
            }
        });
    },
    computed: {
        currentView() {
            return this.$store.getters.currentView.PurchaseContractImported;
        },
        currentProperties() {
            return this.$store.getters.params.PurchaseContractImported;
        }
    }
}

</script>
