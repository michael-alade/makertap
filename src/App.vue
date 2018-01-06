<template>
  <main>
    <div class="uk-offcanvas-content" id="app" data-simplebar="init">
      <navbar />
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
  name: 'App',
  metaInfo: {
    title: 'MakerTap',
    titleTemplate: '%s - Watch and learn from makers and founders'
  }
}
</script>

