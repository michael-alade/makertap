<template>
    <div>
        <div v-if="mobileDetect && !mobileDetect.mobile()" class="live-stream-box uk-visible@m">
            <iframe v-if="pageProfile && pageProfile.channel.status === 'live'" id="live-video" :src="pageProfile ? pageProfile.channel.embed.liveUrl : null"></iframe>
            <div class="uk-overlay uk-position-top">
                <div v-if="pageProfile && pageProfile.channel.status === 'offline'" class="offline">
                    <span class="fa fa-circle"></span> Offline
                </div>
            </div>
        </div>
        <div v-if="mobileDetect && mobileDetect.mobile()" class="live-stream-box-small uk-hidden@m">
            <iframe v-if="pageProfile && pageProfile.channel.status === 'live'" id="live-video" :src="pageProfile ? pageProfile.channel.embed.liveUrl : null"></iframe>
            <div class="uk-overlay uk-position-top">
                <div v-if="pageProfile && pageProfile.channel.status === 'offline'" class="offline">
                    <span class="fa fa-circle"></span> Offline
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MobileDetect from 'mobile-detect'
// import VueTwitchPlayer from 'vue-twitch-player'
export default {
  components: {
    // VueTwitchPlayer
  },
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
