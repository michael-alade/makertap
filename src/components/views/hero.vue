<template>
    <section class="uk-dark cs-hero-section" style="height: 100%">
        <div class="" style="height: inherit; width: 100%">
            <div class="uk-container" style="padding-top: 30px;padding-bottom: 20px">
                <div class="uk-child-width-expand@s" uk-grid>
                    <div class="hero-text">
                        <h1 :class="{ 'mobile': mobileDetect && mobileDetect.mobile() }">Be Motivated</h1>
                        <p :class="{ 'mobile': mobileDetect && mobileDetect.mobile() }">Watch and learn from live streams of makers and creators building amazing products.</p>
                        <div :class="{ 'mobile': mobileDetect && mobileDetect.mobile() }">
                            <a href="#" style="margin-top: 20px" class="uk-button theme-btn uk-button-round">How it works</a>
                        </div>
                    </div>
                    <div class="hero-video-box uk-visible@m">
                        <youtube id="hero-video" video-id="tVg_EtR__O4" player-width="100%" :player-vars="heroPlayer" player-height="315"></youtube>
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
