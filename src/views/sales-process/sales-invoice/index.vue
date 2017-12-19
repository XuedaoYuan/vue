<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
  import SalesInvoice from './sales-invoice.vue';
  import SalesInvoicetAdd from './sales-invoice-add.vue';
  import SalesInvoiceEdit from './sales-invoice-edit.vue';
  import SalesInvoiceDetail from './sales-invoice-detail.vue';

  export default {
    name: 'SalesInvoice',
    components: {
      index: SalesInvoice,
      add: SalesInvoicetAdd,
      edit: SalesInvoiceEdit,
      look: SalesInvoiceDetail
    },
    data() {
      return {
      }
    },
    mounted() {
      this.$store.dispatch('toggleCurrentView', {
        SalesInvoice: {
          view: 'index'
          // params: 跳转过去的子组件的属性对象
        }
      });
    },
    computed: {
      currentView() {
        return this.$store.getters.currentView.SalesInvoice;
      },
      currentProperties() {
        return this.$store.getters.params.SalesInvoice;
      }
    }
  }

</script>
