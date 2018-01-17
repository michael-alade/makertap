<template>
    <div class="">
        <section class="uk-background-cover uk-text-center social-networks" uk-parallax="bgy: -100">
          <h4 class="text-white">Follow MakerTap</h4>
          <div class="networks">
            <a href="" class="uk-icon-button twitter-btn uk-margin-small-right" uk-icon="icon: twitter"></a>
            <a href="" class="uk-icon-button facebook-btn uk-margin-small-right" uk-icon="icon: facebook"></a>
            <a href="" class="uk-icon-button instagram-btn" uk-icon="icon: instagram"></a>
          </div>
        </section>
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
  mounted () {
    this.mobileDetect = new MobileDetect(window.navigator.userAgent)
  }
}
</script>

<style>

</style>
