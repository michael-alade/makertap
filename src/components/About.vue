<template>
  <div class="ui segment">
    <h2 class="ui header">About Component</h2>
    <span>About Page</span>
    <span v-if="username">Hello, {{ username }}</span>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: 'About Us',
    titleTemplate:'%s | MakerTap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  preFetch ({ store }) {
    store.dispatch('getCurrentUser')
  },
  mounted () {
    console.log(this)
  },
  computed: {
    username () {
      return this.$store.state.currentUser && this.$store.state.currentUser.username || ''
    }
  }
}
</script>
