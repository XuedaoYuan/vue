<template>
    <keep-alive :include="'index'">
        <component :is="currentView" v-bind="currentProperties">
        </component>
    </keep-alive>
</template>
<script>
import PurchaseContract from './purchase-contract.vue';
import PurchaseContractAdd from './purchase-contract-add.vue';
import PurchaseContractEdit from './purchase-contract-edit.vue';
import PurchaseContractLook from './purchase-contract-look.vue';

export default {
    name: 'PurchaseContract',
    components: {
        index: PurchaseContract,
        add: PurchaseContractAdd,
        edit: PurchaseContractEdit,
        look: PurchaseContractLook
    },
    data() {
        return {}
    },
    mounted() {
        this.$store.dispatch('toggleCurrentView', {
            PurchaseContract: {
                view: 'index'
                // params: 跳转过去的子组件的属性对象
            }
        });
    },
    computed: {
        currentView() {
            return this.$store.getters.currentView.PurchaseContract;
        },
        currentProperties() {
            return this.$store.getters.params.PurchaseContract;
        }
    }
}

</script>
