import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    mine: null
  },
  actions: {
    getCurrentUser ({ commit }) {
      return axios.get('http://localhost:3000/me')
        .then((res) => {
          commit('setCurrentUser', res.data)
          return res
        })
    }
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.currentUser = payload
      // Vue.set(state, 'currentUser', payload)
    },
    setMine: (state, payload) => {
      state.mine = payload
      // Vue.set(state, 'currentUser', payload)
    }
  },
  getters: {
    getCurrentUser (state) { return state.currentUser },
    getMine (state) { return state.mine }
  }
})

// import Vue from 'vue'
// import axios from 'axios'

// const store = {
//   currentUser: null
// }

// const API = {
//   fetchCurrentUser () {
//     if (store.currentUser) return
//     axios.get('http://localhost:3000/me')
//       .then((res) => {
//         store.currentUser = res.data
//       })
//   }
// }

// Vue.mixin({
//   data () {
//     return {
//       store
//     }
//   },
//   computed: {
//     API () {
//       return API
//     }
//   }
// })

// export default store
