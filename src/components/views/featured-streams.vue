<template>
    <section class="featured-streams">
        <div class="uk-container">
            <h3 style="font-family: 'Montserrat', sans-serif;">Live Now</h3>
            <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                <div v-for="i in 4" :key="i" class="uk-width-1-5@m uk-width-1-2@s">
                    <VideoThumb />
                </div>
            </div>
            <div class="view-more">
                <a href="#" style="margin-top: 30px" class="uk-button gradient-green-btn uk-button-round">View more</a>
            </div>
        </div>
    </section>
</template>

<script>
import VideoThumb from './video-thumb.vue'
export default {
  components: {
    VideoThumb
  }
}
</script>

<style>

</style>
