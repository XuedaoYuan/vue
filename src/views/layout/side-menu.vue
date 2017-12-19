<template>
  <el-menu ref="elMenuSideBar" :default-openeds="isCollapse" :default-active="defaultActive" :active="defaultActive" id="el-menu-vertical-demo" @select="handleSelect" background-color="#25394c" text-color="#fff" active-text-color="#ffd04b">
    <el-row class="search" type="flex" align="middle" justify="center" id="search">
      <el-col :span="18">
        <el-select size="small" v-model="selectedItem" filterable placeholder="搜索" @change="handleChange">
          <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <side-menu-item v-if="listLoading" :menuList="menuList" :lastPath="lastPath"></side-menu-item>
    <!--<el-button type="primary" @click="hanldeClick">主要按钮</el-button>-->
    <!--<span>{{getHeight}}</span>-->
  </el-menu>
</template>
<script>
import SideMenuItem from './side-menu-item';
import { getCatalog } from 'api/login/login';
import { getSubMenuIndex } from '../../util/utils.js';
import { routesMap } from '@/router'
export default {
  props:{
    isCollapse:Array
  },
  components: {
    SideMenuItem
  },
  data() {
    return {
      menuList: [],
      lastPath: '',
      defaultActive: this.$route.path,
      selectedItem: '', //被选中的值
      list: [], //被搜索的选项
      listLoading: false,
    }
  },
  created() {
    // 动态获取菜单
    // this.getMenu();
    this.menuList = routesMap;
    this.listLoading = true;
    this.$nextTick(() => {
      var height = document.documentElement.clientHeight;
      var div = document.getElementById("el-menu-vertical-demo");
      div.style.height = (height - 100) + 'px';
    })
    this.setSelectedMenu();
  },
  mounted() {
    var vm = this;
    // evt.addHandler('open-submenu', function(obj) {
    //   var path = getSubMenuIndex(obj);
    //   console.log(this.$refs);
    //   vm.$refs.elMenuSideBar.open(obj);
    // });

    eventBus.$on('tabClick', (menuIndex) => {
      // console.log('menuIndex', menuIndex);
      vm.$nextTick(() => {
        this.defaultActive = menuIndex;
      });

    });
    window.onresize = function temp() {
      var height = document.documentElement.clientHeight;
      var div = document.getElementById("el-menu-vertical-demo");
      div.style.height = (height - 100) + 'px';
      // console.log(height,"height");
    };

    //获取搜索库
    this.menuList.map(item => {
      var listItem = {};
      this.getFullPath(item, item.path, function(fullPath, label) {
        listItem = { value: fullPath, label: label };
        vm.list.push(listItem);
      });
    });

  },
  computed: {
    getHeight: function() {
      //      var height=document.documentElement.clientHeight;
      //      return height;
      //      var div=document.getElementById("el-menu-vertical-demo");
      //      div.style.height=height+'px';
    }
  },
  methods: {
//      sss(){
//          this.isCollapse=[];
////          this.defaultActive='';
//      },
    // 获取菜单
    getMenu() {
      getCatalog().then(response => {
        let data = response.data
        this.listLoading = true;
        if (data.status == 1) {
          let user = data.data.user;
          localStorage.setItem('USER', JSON.stringify(user));
          let listModules = data.data.listModules;
          var menuList = [];
          this.getCustomMenu(listModules, menuList);
          this.menuList = menuList;
        }
      });
    },
    // 递归遍历菜单模块
    getCustomMenu(listModules, menuList) {
      listModules.forEach((module, index) => {
        var obj = {};
        obj.path = module.action_url;
        obj.icon = module.icon_url;
        obj.module_id = module.module_id;
        obj.label = module.module_name;
        obj.name = module.module_name;
        obj.mapRes = module.mapRes;
        if (module.module_level == 1) {
          obj.icon = module.module_code;
        }
        obj.children = [];
        menuList.push(obj);
        if (module.moduleChildren && module.moduleChildren.length > 0) {
          this.getCustomMenu(module.moduleChildren, menuList[index].children);
        } else {
          delete menuList[index].children;
          return;
        }
      });
    },
    // 递归遍历菜单目录
    getFullPath(obj, path, success, lastPath) {
      if (!obj.hidden) {
        var fullPath = lastPath || path;
        if (path.indexOf('/') != 0) {
          fullPath += '/' + path;
        }
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((child, index) => {
            this.getFullPath(child, child.path, success, fullPath);
          });
        } else {
          success(fullPath, obj.label);
          return;
        }
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log('handleSelect', key, keyPath);
    },
    hanldeClick() {
      console.log(this.$refs.elMenuSideBar.submenus);
    },
    handleChange(value) {
      this.$router.push(value);
      this.setSelectedMenu();
    },
    //根据路由设置被选目录
    setSelectedMenu() {
      if (this.$route.params && this.$route.params.type) {
        var params = this.$route.params;
        var paramsArr = Object.keys(params);
        console.log(params);
        var regStr = '(.*)';
        for (var i = 0; i < paramsArr.length; i++) {
          regStr += '\/{1}.*';
        }
        var reg = new RegExp(regStr);
        this.defaultActive = this.$route.path.replace(reg, '$1');
      }
    }
  }
}

</script>
<style>
/*.el-menu-vertical-demo{*/


/*height: 820px;*/


/*}*/

.search {
  height: 60px;
}

.search .el-input__inner {
  border-radius: 15px !important;
  text-align: center;
  background-color: #203243;
  color: #6c8094;
  border: 0;
}

.search .el-input__inner::selection {
  background-color: #203243;
  color: #fff;
}

.search .el-input__icon:before {
  content: '';
}

.search .el-input__icon:after {
  content: '';
}

.search .el-input--suffix .el-input__inner {
  padding-right: 15px;
}






/*.el-select-dropdown__item {
  color: #6c8094;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #6c8094;
  color: #fff;
}

.el-popper[x-placement^=bottom] .popper__arrow::after {
  border-bottom-color: #203243;
}

.el-select-dropdown {
  background-color: #203243;
  border: 1px solid #203243;
}

.el-popper[x-placement^=bottom] .popper__arrow {
  border-bottom-color: #203243;
}

.el-select-dropdown__item.selected {
  color: #fff;
}*/

</style>
