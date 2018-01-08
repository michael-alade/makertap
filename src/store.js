import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    currentUser: null,
    mine: null,
    videos: null,
    hideNavbar: false,
    videoSearchLoading: false
  },
  actions,
  mutations,
  getters: {
    getCurrentUser (state) { return state.currentUser },
    videoSearchLoading (state) { return state.videoSearchLoading },
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
