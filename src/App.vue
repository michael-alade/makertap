<template>
  <div>
    <navbar />
    <router-view></router-view>
  </div>
</template>
<script>
import Navbar from './components/views/navbar'
export default {
  components: {
    Navbar
  },
  name: 'App',
  metaInfo: {
    title: 'MakerTap',
    titleTemplate: '%s - Watch and learn from makers and founders'
  }
}
</script>

