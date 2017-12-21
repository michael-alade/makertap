import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    mine: null,
    videos: null
  },
  actions,
  mutations,
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
