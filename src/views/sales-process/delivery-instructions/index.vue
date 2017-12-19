<template>
  <keep-alive :include="['index', 'add']">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
import DeliveryInstructions from './delivery-instructions.vue';
import DeliveryInstructionsAdd from './delivery-instructions-add.vue';
import DeliveryInstructionsAddAgain from './delivery-instructions-addinstructions.vue';
import DeliveryInstructionsEdit from './delivery-instructions-edit.vue';
import DeliveryInstructionsLook from './delivery-instructions-look.vue';
import DeliveryInstructionsMatching from './delivery-instructions-matching.vue';

export default {
    name: 'DeliveryInstructions',
    components: {
        index: DeliveryInstructions,
        add: DeliveryInstructionsAdd,
        addAgain: DeliveryInstructionsAddAgain,
        edit: DeliveryInstructionsEdit,
        match: DeliveryInstructionsMatching,
        look: DeliveryInstructionsLook,
    },
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('toggleCurrentView', {
            DeliveryInstructions: {
                view: 'index'
                // params: 跳转过去的子组件的属性对象
            }
        });
    },
    computed: {
        currentView() {
            return this.$store.getters.currentView.DeliveryInstructions;
        },
        currentProperties() {
            return this.$store.getters.params.DeliveryInstructions;
        }
    }
}

</script>
