<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
  import TrackingManage from './tracking-manage.vue';
  import TrackingManageAdd from './tracking-manage-add.vue';
  import TrackingManageEdit from './tracking-manage-edit.vue';
  import TrackingManageLook from './tracking-manage-look.vue';

  export default {
    name: 'TrackingManage',
    components: {
      index: TrackingManage,
      add: TrackingManageAdd,
      edit: TrackingManageEdit,
      look: TrackingManageLook
    },
    data() {
      return {
      }
    },
    mounted() {
      this.$store.dispatch('toggleCurrentView', {
        TrackingManage: {
          view: 'index'
          // params: 跳转过去的子组件的属性对象
        }
      });
    },
    computed: {
      currentView() {
        return this.$store.getters.currentView.TrackingManage;
      },
      currentProperties() {
        return this.$store.getters.params.TrackingManage;
      }
    }
  }

</script>
