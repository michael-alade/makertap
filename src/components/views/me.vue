<template>
  <a v-if="mobileDetect && !mobileDetect.mobile()" href="https://twitter.com/alademk" target="_blank" class="me text-white">
    <span class="uk-icon uk-icon-image" style="border-radius: 50%;background-image: url('https://pbs.twimg.com/profile_images/830419625787666432/6d9I2PuH_400x400.jpg');"></span> alademk
    </a>
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
