<template>
    <div>
        <div v-if="mobileDetect && !mobileDetect.mobile()" class="live-stream-box uk-visible@m">
            <div id="live-video">
            </div>
            <div class="uk-overlay uk-position-top">
                <div v-if="pageProfile && pageProfile.channel.status === 'live'" class="live-now">
                    <span class="fa fa-circle"></span> Live
                </div>
                <div v-if="pageProfile && pageProfile.channel.status === 'offline'" class="offline">
                    <span class="fa fa-circle"></span> Offline
                </div>
            </div>
        </div>
        <div v-if="mobileDetect && mobileDetect.mobile()" class="live-stream-box-small uk-hidden@m">
            <div id="live-video">
            </div>
            <div class="uk-overlay uk-position-top">
                <div v-if="pageProfile && pageProfile.channel.status === 'live'" class="live-now">
                    <span class="fa fa-circle"></span> Live
                </div>
                <div v-if="pageProfile && pageProfile.channel.status === 'offline'" class="offline">
                    <span class="fa fa-circle"></span> Offline
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MobileDetect from 'mobile-detect'
export default {
  data () {
    return {
      mobileDetect: null
    }
  },
  props: ['pageProfile'],
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
  }
}
</script>

<style>
    
</style>
