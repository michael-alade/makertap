<template>
    <div class="">
        <hero />
        <featured />
        <footer-view />
    </div>
</template>

<script>
import Hero from '../views/hero'
import Featured from '../views/featured-streams'
import FooterView from '../views/footer'

export default {
  components: {
    Hero,
    Featured,
    FooterView
  },
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | MakerTap',
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
  mounted () {
    console.log(window.navigator.userAgent, 'user Agent')
  },
  computed: {
    username () {
      return this.$store.state.currentUser && this.$store.state.currentUser.username || ''
    }
  }
}
</script>
