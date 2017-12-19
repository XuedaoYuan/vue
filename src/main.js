// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'

import Evt from './util/event-target.js'


//全局组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CommonTable from 'components/common-table';
import Icon from 'vue-svg-icon/Icon.vue';

import { ENUMS } from '@/assets/enums.js';

//全局样式
import 'styles/index.scss';

//全局工具类
import 'util/extend.js';

// 过滤器
import { parsePackType, parseTime2, parseDate,parsepoGrType,parsePoGrStatus,
parseOperationType, parseSoRoStatus, parsePinBackType } from './filters/index.js'
import { vueNumberOnly } from "@/directives/number-only.js"; // 数字 位数


Vue.filter('parsePackType', parsePackType); //包装方式
Vue.filter('parseTime', parseTime2);
Vue.filter('parsepoGrType', parsepoGrType);
Vue.filter('parseDate', parseDate);
Vue.filter('parsePoGrStatus', parsePoGrStatus);
Vue.filter('parseOperationType', parseOperationType);
Vue.filter('parseSoRoStatus', parseSoRoStatus);
Vue.filter('parsePinBackType', parsePinBackType);


Vue.config.productionTip = false

import vueDrag from './directives/drag.js'

Vue.use(ElementUI);
Vue.use(CommonTable);
Vue.use(vueDrag);
Vue.use(vueNumberOnly);


Vue.component('icon', Icon);

//定义全局eventBus，用于任意组件间通信
window.eventBus = new Vue();

window.evt = Evt;

window.ENUMS = ENUMS;




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
