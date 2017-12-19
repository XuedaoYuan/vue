import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import toggleView from './modules/toggle-view'
import commonTable from './modules/common-table'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)


export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    toggleView,
    commonTable
    // products
  }
})
