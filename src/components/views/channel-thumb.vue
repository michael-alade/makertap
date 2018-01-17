<template>
  <div class="featured">
      <div class="featured-avatar uk-cover-container">
          <img style="width: inherit; height: inherit" class="uk-cover" :src="result && result.channelPicture ? result.channelPicture :
          `https://avatar.tobi.sh/211.svg?text=${result.user.fullName.split(' ')[0][0]}${result.user.fullName.split(' ')[1][0]}`">
          <div class="uk-overlay uk-position-top">
          </div>
      </div>
      <div class="featured-details">
          <div class="name">
              <div class="fullname">{{ result && result.user.fullName ? result.user.fullName : null }}</div>
              <div class="username">@{{ result && result.user.username ? result.user.username : null }}</div>
              <div class="description">
                  <div><span class="fa fa-eye"></span> {{ result ? result.analytics.totalViews.length : null }}</div>
                  <div><span class="fa fa-users"></span> {{ result ? result.analytics.subscribers.length: null }}</div>
              </div>
          </div>
          <div class="action">
              <!-- <button class="">Subscribe</button> -->
              <button class="view" @click.prevent="goTo(result, 'channel')">View</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['result'],
  methods: {
    goTo (result, type) {
      if (result && result.user.username) {
        if (type === 'channel') {
          window.location.href = `/user/${result.user.username}`
        }
      }
    }
  }
}
</script>

<style>

</style>
