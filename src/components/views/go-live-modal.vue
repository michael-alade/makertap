<template>
  <div style="width: 100%">
      <button uk-toggle="target: #modal-close-outside" style="flex: 1" class="uk-button go-live-btn" type="button">GO LIVE</button>
      <div id="modal-close-outside" uk-modal>
            <div class="uk-modal-dialog" style="width: 568px;">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header">
                    <h5 class="uk-modal-title" style="font-size: 1.5rem">Go live</h5>
                </div>
                <div class="uk-modal-body">
                    <form class="uk-grid-small" uk-grid>
                        <div class="uk-width-1-2@s">
                            <label class="uk-form-label">Write a captivating title.</label>
                            <input required v-model="form.title" class="uk-input" type="text" placeholder="Live stream title">
                        </div>
                        <div class="uk-width-1-2@s">
                            <label class="uk-form-label">What platform are you streaming from?</label>
                            <select required v-model="form.platform" class="uk-select" type="text" placeholder="Input">
                                <option value="youtube">Youtube</option>
                                <option value="twitch">Twitch</option>
                            </select>
                        </div>
                        <div style="margin-top: 10px" v-if="form.platform === 'youtube'" class="uk-width-1-1@s">
                            <label class="uk-form-label">What's your Youtube channel Id? Can't find it, click <a target="_blank" href="https://www.youtube.com/account_advanced">here</a></label>
                            <input required v-model="form.youtubeChannelId" class="uk-input" type="text" placeholder="Youtube channel ID">
                        </div>
                        <div style="margin-top: 10px" v-if="form.platform === 'twitch'" class="uk-width-1-1@s">
                            <label class="uk-form-label">What's your Twitch username?</label>
                            <input required v-model="form.twitchUsername" class="uk-input" type="text" placeholder="Twitch username">
                        </div>
                        <div v-if="!this.form.thumbnail" style="margin-top: 10px" class="uk-width-1-1@s">
                            <div uk-form-custom>
                                <label class="uk-form-label">Upload a cool thumbnail.</label>
                                <input required type="file" @change="setTemp" ref="thumbnailUpload">
                                <button class="uk-width-1-1 uk-button uk-button-default" type="button" tabindex="-1">Select</button>
                            </div>
                        </div>
                        <div v-if="this.form.thumbnail" class="uk-width-1-2@s">
                            <img :src="tempImgUrl"/>
                        </div>
                        <div v-if="this.form.thumbnail" class="uk-width-1-2@s">
                            <button @click.prevent="removeThumbnail" class="uk-button uk-button-danger uk-width-1-1" type="button">Remove</button>
                        </div>
                    </form>
                </div>
                <div class="uk-modal-footer uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary" type="button">Save</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  props: ['pageProfile'],
  data () {
    return {
      show: false,
      tempImgUrl: null,
      form: {
        platform: 'youtube',
        thumbnail: null,
        title: '',
        tags: ['fintech'], // change soon :just testing
        youtubeChannelId: null,
        twitchUsername: null,
        embed: {}
      }
    }
  },
  methods: {
    goLive () {
      if (this.form.platform === 'youtube') {
        this.form.embed = {
          thumbnail: this.form.thumbnail,
          videoUrl: `https://www.youtube.com/embed/live_stream?channel=${this.form.youtubeChannelId}`
        }
      } else if (this.form.platform === 'twitch') {
        this.form.embed = {
          thumbnail: this.form.thumbnail,
          videoUrl: `http://player.twitch.tv/?channel=${this.form.twitchUsername}`
        }
      }
      this.$store.dispatch('goLive', this.form)
    },
    setTemp () {
      const self = this
      const reader = new window.FileReader()
      const blob = this.$refs.thumbnailUpload.files[0]
      this.form.thumbnail = blob
      reader.onload = (e) => {
        self.tempImgUrl = reader.result
        self.form.thumbnail = reader.result
      }
      reader.readAsDataURL(blob)
    },
    removeThumbnail () {
      this.tempImgUrl = null
      this.form.thumbnail = null
    }
  }
}
</script>

<style>

</style>
