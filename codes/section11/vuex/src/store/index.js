import Vue from 'vue'
import Vuex from 'vuex'

// load the plugin
Vue.use(Vuex)

// state (record the data)

var state = {
  count: 0
}

var mutations = {
  increment (state, n = 1) {
    state.count += n
  },
  decrement (state, params) {
    state.count -= params.num
  }
}

var store = new Vuex.Store({
  state,
  mutations
})

export default store
