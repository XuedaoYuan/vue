<template>
  <keep-alive :include="'index'">
    <component :is="currentView" v-bind="currentProperties">
    </component>
  </keep-alive>
</template>
<script>
  import ProjectArchives from './project-archives.vue';
  export default {
    name: 'SalesmanDistribution',
    components: {
      index: ProjectArchives,
    },
    data() {
      return {
      }
    },
    mounted() {
      this.$store.dispatch('toggleCurrentView', {
        ProjectArchives: {
          view: 'index'
          // params: 跳转过去的子组件的属性对象
        }
      });
    },
    computed: {
      currentView() {
        return this.$store.getters.currentView.ProjectArchives;
      },
      currentProperties() {
        return this.$store.getters.params.ProjectArchives;
      }
    }
  }

</script>
