<template>
  <div>
    <template v-for="(item, index) in menuList">
      <!-- <el-menu @select="handleMenuSelect"> -->
      <!-- <el-submenu> -->
      <!-- <template> -->
      <router-link v-if="!item.children && !item.hidden" :key="item.path" :to="item.path">
        <el-menu-item @click="addTab($event)" :index="item.path">
          <icon v-if="item.icon" :name="item.icon" scale="1.8"></icon> {{item.label}}
        </el-menu-item>
      </router-link>
      <!-- </template> -->
      <!-- </el-submenu> -->
      <el-submenu v-else :index="lastPath + (lastPath ? '/' : '') + item.path">
        <template slot="title">
          <icon v-if="item.icon" :name="item.icon" scale="1.8"></icon>
          <span>{{item.label}}</span>
        </template>
        <template v-for="child in item.children">
          <side-menu-item v-if="child.children && child.children.length > 0" :menuList="[child]" :lastPath="item.path + lastPath" :key="child.path">
          </side-menu-item>
          <router-link v-if="!child.children && !child.hidden" :to="lastPath + (lastPath ? '/' : '') + item.path  + '/' + child.path">
            <el-menu-item @click="addTab($event)" :index="lastPath + (lastPath ? '/' : '') + item.path + '/' + (child.path.indexOf('/:')==-1 ? child.path : child.path.split('/:')[0])">
              {{child.label}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      <!-- </el-menu> -->
    </template>
  </div>
</template>
<script>
import routerNameObject from '../../util/router-name-object.js'
import $ from 'jquery'
export default {
  name: 'SideMenuItem',
  props: {
    menuList: Array,
    lastPath: String
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    addTab(e) {

      // $('li.el-menu-item').removeClass('is-active').parent().removeClass('router-link-exact-active router-link-active');

      // $(e.$el).addClass('is-active').parent().addClass('router-link-exact-active router-link-active');

      // var path = e.$el.dataset.path;
      // var labelname = e.$el.dataset.labelname;
      // this.$store.commit('addTag', {
      //   key: (+new Date()) + parseInt(Math.random() * Math.pow(10, 13)),
      //   name: labelname,
      //   path: path,
      //   active: true
      // })
    },
    handleMenuSelect(index) {
      console.log(index);
    }
  }
}

</script>

<style>
.el-menu::-webkit-scrollbar {
    width:8px;
    height:0px;
}
.el-menu::-webkit-scrollbar-button    {
    width: 0;
    height: 0px;
}
.el-menu::-webkit-scrollbar-track     {
    background:#203243;
}
.el-menu::-webkit-scrollbar-thumb{
    background:#878d99;
    border-radius:4px;
}
</style>
