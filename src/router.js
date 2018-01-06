import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import Home from './components/containers/Home'
import Browse from './components/containers/Browse'
import Profile from './components/containers/Profile'
import About from './components/containers/About'

Vue.use(VueRouter)
Vue.use(Meta, {
  keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/browse', component: Browse },
    { path: '/about', component: About },
    { path: '/user/:username', component: Profile },
    { path: '*', redirect: '/' }
  ]
})

export default router
