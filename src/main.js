import { app, store } from './app.js'
// import Vue from 'vue'
// import mobileDetect from './customPlugin/mobileDetect.js'

// get the initialstate from server-rendering.
store.replaceState(window.__INITIAL_STATE__)

// Vue.use(mobileDetect)
window.__INITIAL_STATE__ = {}

app.$mount('#app')

// import App from './App'
// import router from './router'
// import './store'

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   ...App
// })
