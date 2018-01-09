<template>
    <div class="">
        <filters />
        <no-result v-if="!videos.length" />
        <filter-result v-if="videos.length" />
        <footer-view />
    </div>
</template>

<script>
import Filters from '../views/filters'
import FilterResult from '../views/filter-result'
import FooterView from '../views/footer'
import NoResult from '../views/no-result'

export default {
  preFetch ({ store }) {
    console.log('got here')
    return store.dispatch('search')
  },
  metaInfo: {
    title: 'Find Insipiration and motivation video from startup founders and makers',
    titleTemplate: '%s — MakerTap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Watch and learn from live streams made by successfully makers, creators and founders who have built business that serves a lot of users' },
      { name: 'keywords', content: 'Inspiration, motivational, motivation, startups, makers, founders, videos, Find' }
    ],
    link: [
      { rel: 'favicon', href: '/static/favicon.ico' }
    ]
  },
  components: {
    Filters,
    NoResult,
    FooterView,
    FilterResult
  },
  computed: {
    videos () {
      if (this.$store.state.videos && this.$store.state.videos.data) {
        return this.$store.state.videos.data
      }
      return [4, 5, 6]
    }
  }
}
</script>

<style>

</style>
