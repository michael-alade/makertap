import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueInstantSearch from 'vue-instantsearch'
import VueYouTubeEmbed from 'vue-youtube-embed'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

Vue.config.devtools = true
Vue.use(VueYouTubeEmbed)
Vue.use(VueInstantSearch)
sync(store, router)

const app = new Vue({
  router,
  store,
  render (x) { return x(App) }
})

export { app, store, router }
