<template>
  <div class="featured">
      <div class="featured-avatar uk-cover-container">
          <img style="width: inherit; height: inherit" class="uk-cover" :src="result && result.channelPicture ? result.channelPicture : 'https://pbs.twimg.com/profile_images/946823287186665472/iNHVNpi4.jpg'">
          <div class="uk-overlay uk-position-top">
          </div>
      </div>
      <div class="featured-details">
          <div class="name">
              <div class="fullname">{{ result && result.user.fullName ? result.user.fullName : 'Pieter Levels' }}</div>
              <div class="username">@{{ result && result.user.username ? result.user.username : 'levelsio' }}</div>
              <div class="description">
                  <div><span class="fa fa-eye"></span> 15k</div>
                  <div><span class="fa fa-users"></span> 15k</div>
              </div>
          </div>
          <div class="action">
              <!-- <button class="">Subscribe</button> -->
              <button class="view">View</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['result']
}
</script>

<style>

</style>
