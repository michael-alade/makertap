<template>
    <div class="live-stream-card uk-cover-container">
        <img uk-cover :alt="video.title || 'Drew Picture'" :src="video.embed.thumbnail || 'https://img.youtube.com/vi/mwxRlLZl7YE/0.jpg'" />
        <div class="uk-overlay uk-position-top">
            <div class="watching-now"><span class="fa fa-eye fa-1x"></span>{{ video.analytics.views || '10k' }}</div>
                <div class="live-now"><span class="fa fa-circle"></span> Live</div>
        </div>
        <div class="uk-overlay uk-position-bottom">
            <span class="text-white">{{ video.title || 'Default Lorem ipsum dolor sit amet.' }}</span>
        </div>
        <div class="uk-overlay overlay-view-more uk-position-cover">
            <span class="text-white">{{ video.description || 'Majestic sessions is all about urban music with a touch of artistic and cinematic views...' }}</span>
            <a style="margin-top: 10px" href="#" class="uk-width-1-1 uk-button theme-btn">Watch now</a>
        </div>
    </div>
</template>

<script>
export default {
  props: ['video']
}
</script>

<style>

</style>
