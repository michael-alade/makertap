<template>
    <section class="uk-dark cs-hero-section" style="height: 100%">
        <div class="" style="height: inherit; width: 100%">
            <div class="uk-container" style="padding-top: 30px;padding-bottom: 20px">
                <div class="uk-child-width-expand@s" uk-grid>
                    <div class="hero-text">
                        <h1 :class="{ 'mobile': mobileDetect && mobileDetect.mobile() }">Be Motivated</h1>
                        <p :class="{ 'mobile': mobileDetect && mobileDetect.mobile() }">Watch and learn from live streams of makers and creators building amazing products.</p>
                        <div :class="{ 'mobile': mobileDetect && mobileDetect.mobile() }">
                            <a href="/explore" style="margin-top: 20px" class="uk-button theme-btn uk-button-round"><span class="fa fa-search fa-shake"></span> Explore</a>
                        </div>
                    </div>
                    <div class="hero-video-box uk-visible@m">
                        <iframe id="hero-video" width="100%" height="315" src="https://www.youtube.com/embed/tVg_EtR__O4?autoplay=0&loop=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        <!-- <iframe id="hero-video" video-id="" player-width="100%" :player-vars="heroPlayer" player-height="315"></youtube> -->
                        <!-- <div class="hero-video-overlay">
                            <div class="overlay-top">
                                <span class="fa fa-4x fa-pause"></span>
                            </div>
                            <div class="overlay-bottom">
                                <span class="fa fa-2x fa-volume-up"></span>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MobileDetect from 'mobile-detect'
export default {
  data () {
    return {
      mobileDetect: null,
      heroPlayer: {
        autoplay: 0,
        loop: 1
      }
    }
  },
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
  }
}
</script>

<style>

</style>
