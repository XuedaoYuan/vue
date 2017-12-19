<template>
  <div class="viewStage">
    <router-view class="view" v-if="listShow"></router-view>
    <router-view class="view add" name="add" v-if="addShow"></router-view>
    <router-view class="view eidt" name="edit" v-if="editShow"></router-view>
    <router-view class="view" name="detail" v-if="detailShow"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    listShow() {
      return (this.$route.params.type == 'list' || this.$route.params.type == ':type' || !this.$route.params.type);
    },
    addShow() {
      return this.$route.params.type == 'add';
    },
    editShow() {
      return this.$route.params.type == 'edit';
    },
    detailShow() {
      return this.$route.params.type == 'detail';
    },
  }
}

</script>
<style scoped lang="scss">


</style>
