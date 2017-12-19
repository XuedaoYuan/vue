// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  currentView: 'index',
  viewName: 'index',
  params: {},
  currentViewValue: {},
  paramsValue: {},
}

// getters
const getters = {
  // 确定作业名 确定该显示哪个视图
  currentView: state => {
    let currentViewValue = state.currentViewValue;
    currentViewValue[state.viewName] = state.currentView;
    return currentViewValue;
  },

  // 传参
  params: state => {
    let paramsValue = state.paramsValue;
    paramsValue[state.viewName] = state.params;
    return paramsValue;
  }
  
}

// actions
const actions = {
  // 切换当前视图
  toggleCurrentView ({ commit, state }, viewObj) {
    commit(types.TOGGLE_CURRENT_VIEW, viewObj);
  }
}

// mutations
const mutations = {
  // 切换视图
  [types.TOGGLE_CURRENT_VIEW] (state, viewObj) {
    let keys = Object.keys(viewObj);
    let viewName = keys[0];
    let obj = viewObj[viewName];
    let {params, view} = obj;
    state.viewName = viewName;
    state.currentView = view;
    state.params = params;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
