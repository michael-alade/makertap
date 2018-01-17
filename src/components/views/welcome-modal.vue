<template>
    <!-- This is the modal with the outside close button -->
    <div id="welcome-modal" uk-modal="esc-close:false; bg-close: false;">
        <div class="uk-modal-dialog uk-modal-body">
            <div class="welcome">
                <h4 class="welcome-text">Welcome, {{ pageProfile ? pageProfile.fullName : null }}</h4>
                <span>Please take a minute to fill the below form</span>
            </div>
            <div v-if="error.showError" class="uk-alert-danger" uk-alert>
                <a @click="error.showError = false" class="uk-alert-close" uk-close></a>
                <p style="font-size: 13px;">{{ error.message }}</p>
            </div>
            <div class="channel-picture-box">
                <input type="file" hidden @change="setTemp" ref="uploadPicture">
                <div @click="getPicture" class="channel-picture uk-cover-container">
                    <img uk-cover :src="tempImgUrl"/>
                    <div class="overlay">
                        <span>Upload channel picture</span>
                    </div>
                </div>
            </div>
            <form @submit.prevent="submit" class="uk-grid-small" uk-grid>
                <div class="uk-width-1-1@s">
                    <label class="uk-form-label">Choose streaming platform</label>
                    <select required v-model="form.platform" class="uk-select" type="text" placeholder="Input">
                        <option value="youtube">Youtube</option>
                        <option value="twitch">Twitch</option>
                    </select>
                </div>
                <div style="margin-top: 10px" v-if="form.platform === 'youtube'" class="uk-width-1-1@s">
                    <label class="uk-form-label">Youtube Channel ID. Can't find it, click <a target="_blank" href="https://www.youtube.com/account_advanced">here</a></label>
                    <input required v-model="form.youtubeChannelId" class="uk-input" type="text" placeholder="Youtube channel ID">
                </div>
                <div style="margin-top: 10px" v-if="form.platform === 'twitch'" class="uk-width-1-1@s">
                    <label class="uk-form-label">What's your Twitch username?</label>
                    <input required v-model="form.twitchUsername" class="uk-input" type="text" placeholder="Twitch username">
                </div>
                <div class="uk-width-1-1@s">
                    <label class="uk-form-label">What's your specialty?</label>
                    <select required v-model="form.specialty" class="uk-select" type="text" placeholder="Input">
                        <option value="internet-software">Internet software</option>
                        <option value="programming">Programming</option>
                        <option value="artificial-intelligence">Artificial Intelligence</option>
                        <option value="ecommerce">Ecommerce</option>
                        <option value="fintech">Fintech</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="craftmanship">Craftmanship</option>
                    </select>
                </div>
                <div class="uk-width-1-1@s" style="padding-top: 15px;display: flex; align-items: center; justify-content:center">
                    <button class="uk-button uk-button-round theme-btn" :disabled="loading"><span v-if="loading" class="fa fa-spin fa-spinner"></span> Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  props: ['pageProfile'],
  data () {
    return {
      loading: false,
      show: true,
      tempImgUrl: '/static/images/profile-placeholder.png',
      form: {
        platform: 'youtube',
        specialty: 'internet-software',
        channelPicture: null,
        embed: {},
        youtubeChannelId: '',
        twitchUsername: ''
      },
      error: {
        showError: false,
        message: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    getPicture () {
      this.$refs.uploadPicture.click()
    },
    submit () {
      const self = this
      if (this.form.platform === 'youtube') {
        this.form.embed = {
          platform: this.form.platform,
          liveUrl: `https://www.youtube.com/embed/live_stream?channel=${this.form.youtubeChannelId}&autoplay=1`
        }
      } else if (this.form.platform === 'twitch') {
        this.form.embed = {
          platform: this.form.platform,
          liveUrl: `https://player.twitch.tv/?channel=${this.form.twitchUsername}`
        }
      }
      this.loading = true
      this.form.channelId = this.pageProfile.channel._id
      return this.$store.dispatch('updateChannel', this.form).then(result => {
        self.$store.dispatch('getUser', self.$route.params.username).then(() => {
          self.loading = false
          window.UIkit.modal('#welcome-modal', {
            'sel-close': ''
          }).hide()
        })
      }).catch(err => {
        if (err.response && err.response.data.message) {
          self.error = {
            showError: true,
            message: err.response.data.message
          }
        } else {
          self.error = {
            showError: true,
            message: 'Something went wrong. Try reloading the page.'
          }
        }
      })
    },
    setTemp () {
      const self = this
      const reader = new window.FileReader()
      const blob = this.$refs.uploadPicture.files[0]
      this.form.channelPicture = blob
      if (blob) {
        reader.onload = (e) => {
          self.tempImgUrl = reader.result
          self.form.channelPicture = reader.result
        }
        reader.readAsDataURL(blob)
      }
    }
  }
}
</script>

<style>

</style>
