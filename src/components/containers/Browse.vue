<template>
    <div class="">
        <filters />
        <ais-index
          :searchStore="searchStore"
          :query="searchQuery.input"
          :query-parameters="{ facetFilters: [searchQuery.facetFilters], facets: ['specialty'] }"
          :auto-search="true"
        >
  <!-- Add your InstantSearch components here. -->
          <section class="live-streams">
                <div class="uk-container">
                        <ais-results class="uk-flex-row uk-grid-small uk-child-width-expand@s uk-result" uk-grid>
                          <template slot-scope="{ result }">
                              <div class="uk-width-1-3@m uk-width-1-2@s" :class="{ 'uk-grid-margin': mobileDetect && mobileDetect.mobile() ? true : false }">
                                <!-- {{ result.channelId }} -->
                                <channel-thumb :result="result || {}" />
                              </div>
                          </template>
                        </ais-results>
                        <ais-no-results>
                            <template>
                                <div class="no-results">
                                    <div class="no-results-center">
                                        <span class="fa fa-2x fa-frown-o"></span><br/>
                                        No result found
                                    </div>
                                </div>
                            </template>
                        </ais-no-results>
                    <div v-if="loading" class="uk-overlay-default uk-position-cover">
                        <div class="uk-position-top" style="display: flex; padding-top: 120px; justify-content: center">
                            <div class="sk-folding-cube">
                                <div class="sk-cube1 sk-cube"></div>
                                <div class="sk-cube2 sk-cube"></div>
                                <div class="sk-cube4 sk-cube"></div>
                                <div class="sk-cube3 sk-cube"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ais-index>
        <!-- <filters /> -->
        <!-- <no-result v-if="!videos.length" /> -->
        <!-- <filter-result v-if="videos.length" /> -->
    </div>
</template>

<script>
import Filters from '../views/filters'
import ChannelThumb from '../views/channel-thumb'
import MobileDetect from 'mobile-detect'
import FilterResult from '../views/filter-result'
import FooterView from '../views/footer'
import NoResult from '../views/no-result'
import {
  createFromAlgoliaCredentials,
  createFromSerialized
} from 'vue-instantsearch'

let algoliaSearchStore

export default {
  data () {
    return {
      mobileDetect: null,
      loading: false
    }
  },
  preFetch ({ store }) {
    algoliaSearchStore = createFromAlgoliaCredentials(
      'ENDTXRMXJ8',
      '87fcdcb7db64f38e74409da5239fb067'
    )
    algoliaSearchStore.indexName = 'channel_index'
    algoliaSearchStore.query = ''
    algoliaSearchStore.start()
    algoliaSearchStore.refresh()
    return algoliaSearchStore.waitUntilInSync().then(() => {
      store.state.searchStore = algoliaSearchStore.serialize()
    })
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
    ChannelThumb,
    FooterView,
    FilterResult
  },
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
  },
  computed: {
    searchStore () {
      if (this.$store.state.searchStore) {
        return createFromSerialized(this.$store.state.searchStore)
      }
      return null
    },
    videos () {
      if (this.$store.state.videos && this.$store.state.videos.data) {
        return this.$store.state.videos.data
      }
      return [4, 5, 6]
    },
    searchQuery () {
      if (this.$store.state.searchQuery) {
        return this.$store.state.searchQuery
      }
      return {
        input: '',
        facetFilters: []
      }
    }
  }
}
</script>

<style>

</style>
