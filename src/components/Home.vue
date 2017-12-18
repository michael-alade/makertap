<template>
  <div class="ui segment">
    <h2 class="ui header">Home Component</h2>
    <span v-if="username">Hello, {{ username }}</span>
    <img alt="Cat Sleeping" src="https://images.pexels.com/photos/709483/pexels-photo-709483.jpeg?h=350&auto=compress&cs=tinysrgb 1x, https://images.pexels.com/photos/709483/pexels-photo-709483.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb 2x" />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Home',
    titleTemplate:'%s | MakerTap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Watch and learn from live streams made by successfully makers, creators and founders who have built business that serves a lot of users' },
      { name: 'keywords', content: 'Makers, creators, motivation, entrepreneurship' }
    ],
    link: [
      { rel: 'favicon', href: '/static/favicon.ico' }
    ]
  },
  preFetch ({ store, route }) {
    return store.dispatch('getCurrentUser')
    // .then(res => {
    //   console.log(res, 'action res')
    // })
    // .catch(err => {
    //   console.log(err, 'action err')
    // })
  },
  computed: {
    username () {
      // console.log(this.$store.state, 'store state')
      // return 'kola'
      return this.$store.state.currentUser && this.$store.state.currentUser.username || ''
    }
  }
}
</script>
