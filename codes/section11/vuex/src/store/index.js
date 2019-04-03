import Vue from 'vue'
import Vuex from 'vuex'
import { rejects } from 'assert';

// load the plugin
Vue.use(Vuex)

// state (record the data)

var state = {
  count: 0,
  list: [1, 43, 9, 5, 8, 32, 1, -1, 2, 13]
}

var mutations = {
  increment (state, n = 1) {
    state.count += n
  },
  decrement (state, params) {
    state.count -= params.num
  }
}

var actions = {
  increment (context) {
    context.commit('increment')
  },
  asnycIncrement (context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        context.commit('increment')
        resolve()
      }, 1000)
    })
  }
}

var getters = {
  filteredList: state => {
    return state.list.filter(value => value < 10)
  },
  sortedAndFilteredList: (state, getters) => {
    return getters.filteredList.sort((a, b) => {
      if (a > b) {
        return 1
      } else if (a < b) {
        return -1
      } else {
        return 0
      }
    })
  }
}

var store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
