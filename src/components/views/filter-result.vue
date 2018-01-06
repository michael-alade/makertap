<template>
    <section class="live-streams">
        <div class="uk-container">
            <div class="uk-flex-row uk-grid-small uk-child-width-expand@s uk-result" uk-grid>
                <div class="uk-width-1-5@m uk-width-1-2@s" :class="{ 'uk-grid-margin': mobileDetect && mobileDetect.mobile() ? true : false }" v-for="video in videos" :key="video._id">
                    <video-thumb v-if="video" :video="video" />
                </div>
            </div>
            <div v-if="loading" class="uk-overlay-default uk-position-cover">
                <div class="uk-position-top" style="display: flex; padding-top: 120px; justify-content: center">
                    <div class="sk-folding-cube">
                        <div class="sk-cube1 sk-cube"></div>
                        <div class="sk-cube2 sk-cube"></div>
                        <div class="sk-cube4 sk-cube"></div>
                        <div class="sk-cube3 sk-cube"></div>
                    </div>
                        <!-- <span class="fa-3x fa fa-spin fa-spinner"></span> -->
                </div>
            </div>
        </div>
        <!-- <div class="view-more">
            <a href="#" style="margin-top: 30px" class="uk-button gradient-green-btn uk-button-round">View more</a>
        </div> -->
    </section>
</template>

<script>
import MobileDetect from 'mobile-detect'
import VideoThumb from './video-thumb'

export default {
  components: {
    VideoThumb
  },
  data () {
    return {
      mobileDetect: null
    }
  },
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
  },
  computed: {
    loading () {
      return this.$store.state.videoSearchLoading
    },
    videos () {
      if (this.$store.state.videos && this.$store.state.videos.data) {
        return this.$store.state.videos.data
      }
      return null
    }
  }
}
</script>

<style>

</style>
