// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  triggerLock: false,
  isTriggerBlur: false,
  tableId: 1
}

// getters
const getters = {
  triggerLock: state => {
    return state.triggerLock;
  },
  triggerBlur: state => {
      return !state.triggerLock;
  },
  selectedTableId: state => {
    return state.tableId;
  }
}

// actions
const actions = {
  [types.TOGGLE_LOCK] ({ commit, state }, val) {
    commit(types.TOGGLE_LOCK, val);
  },
  [types.SET_TABLE_ID] ({ commit, state }, val) {
    commit(types.SET_TABLE_ID, val);
  }
}

// mutations
const mutations = {
  [types.TOGGLE_LOCK] (state, val) {
    state.triggerLock = val;
  },
  [types.SET_TABLE_ID] (state, val) {
    state.tableId = val;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
