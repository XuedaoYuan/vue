<template>
  <div class="appMain">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="home">
        <router-view :key="$route.meta.count" class="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  }, 
  methods: {
  },
  computed: {
  }
}

</script>
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.appMain {
  padding: 10px;
  padding-top: 0px;
}

</style>
