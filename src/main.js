import { app, store } from './app.js'

// get the initialstate from server-rendering.
store.replaceState(window.__INITIAL_STATE__)

window.__INITIAL_STATE__ = {}

app.$mount('#app')

// import Vue from 'vue'

// import App from './App'
// import router from './router'
// import './store'

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   ...App
// })
