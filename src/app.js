import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

Vue.config.devtools = true
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, store, router }
