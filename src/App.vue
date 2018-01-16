<template>
  <main>
    <div class="uk-offcanvas-content" id="app">
      <navbar v-if="!hideNavbar" />
      <router-view></router-view>
      <mobile-menu />
      <snackbar v-if="!route.path.match(/user/) && mobileDetect && !mobileDetect.mobile()" />
    </div>
    <!-- <mobile-menu /> -->
  </main>
</template>
<script>
import Navbar from './components/views/navbar'
import MobileDetect from 'mobile-detect'
import MobileMenu from './components/views/mobile-menu'
import Snackbar from './components/views/snackbar.vue'

export default {
  components: {
    Navbar,
    MobileMenu,
    Snackbar
  },
  data () {
    return {
      mobileDetect: null
    }
  },
  preFetch () {
  },
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
  },
  computed: {
    hideNavbar () {
      return this.$store.state.hideNavbar
    },
    route () {
      return this.$route
    }
  },
  name: 'App',
  metaInfo: {
    title: 'MakerTap',
    titleTemplate: '%s - Watch and learn from makers and founders',
    link: [
      { rel: 'icon', href: '/static/images/favicon.png?', type: 'image/x-icon' }
    ]
  }
}
</script>

