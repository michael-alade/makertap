<template>
  <main>
    <div class="uk-offcanvas-content" id="app">
      <navbar v-if="!hideNavbar" />
      <router-view></router-view>
    </div>
    <mobile-menu />
  </main>
</template>
<script>
import Navbar from './components/views/navbar'
import MobileMenu from './components/views/mobile-menu'

export default {
  components: {
    Navbar,
    MobileMenu
  },
  preFetch () {
  },
  mounted () {
  },
  computed: {
    hideNavbar () {
      return this.$store.state.hideNavbar
    }
  },
  name: 'App',
  metaInfo: {
    title: 'MakerTap',
    titleTemplate: '%s - Watch and learn from makers and founders'
  }
}
</script>

