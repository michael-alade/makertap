<template>
    <section class="featured-streams">
        <div class="uk-container">
            <h3 style="font-family: 'Montserrat', sans-serif;">Featured Channels</h3>
            <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                <div v-for="i in 4" :key="i" class="uk-width-1-3@m uk-width-1-2@s">
                    <channel-thumb />
                    <!-- <VideoThumb video= /> -->
                </div>
            </div>
            <div class="view-more">
                <a href="#" style="margin-top: 30px" class="uk-button theme-btn uk-button-round">View more</a>
            </div>
        </div>
    </section>
</template>

<script>
import VideoThumb from './video-thumb.vue'
import ChannelThumb from './channel-thumb'
export default {
  components: {
    VideoThumb,
    ChannelThumb
  }
}
</script>

<style>

</style>
