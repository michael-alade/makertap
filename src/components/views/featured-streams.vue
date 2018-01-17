<template>
    <section class="featured-streams">
        <div class="uk-container">
            <h3 style="font-family: 'Montserrat', sans-serif;">Featured Channels</h3>
            <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                <div v-for="channel in channels" :key="channel._id" class="uk-width-1-3@m uk-width-1-2@s">
                    <channel-thumb :result="channel" />
                </div>
            </div>
            <div class="view-more">
                <a href="/explore" style="margin-top: 30px" class="uk-button theme-btn uk-button-round">View more</a>
            </div>
        </div>
    </section>
</template>

<script>
import VideoThumb from './video-thumb.vue'
import ChannelThumb from './channel-thumb'
export default {
  props: ['channels'],
  components: {
    VideoThumb,
    ChannelThumb
  }
}
</script>

<style>

</style>
