<template>
    <div>
    <section class="profile-section">
                <div class="uk-container">

                    <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                        <div class="uk-width-3-4@m">
                            <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                                <div class="uk-width-1-2@m">
                                    <ul uk-tab class="" uk-switcher>
                                        <li class="uk-active"><a href="#">Live</a></li>
                                        <li class=""><a href="#">Videos</a></li>
                                        <li class=""><a href="#">SCHEDULE</a></li>
                                    </ul>
                                </div>
                                <div class="uk-width-1-2@m uk-visible@m" style="display: flex; margin-top: -10px;">
                                    <div class="actions">
                                        <button v-if="currentUser && pageProfile && currentUser._id !== pageProfile.channel.userId" class="uk-button go-live-btn mentorship-btn" type="button">
                                          1-1 Mentorship
                                        </button>
                                        <button style="background: #a5a5a5;" @click.prevent="unSubscribe" v-if="currentUser && pageProfile && currentUser._id !== pageProfile.channel.userId && pageProfile.channel.analytics.subscribers.includes(currentUser._id)" class="uk-button go-live-btn" type="button">
                                          <span v-if="streamState === 'unsubscribe'" class="fa fa-spin fa-spinner"></span>
                                          SUBSCRIBED {{ analytics.subscribers }}
                                        </button>
                                        <button @click.prevent="subscribe" v-if="currentUser && pageProfile && currentUser._id !== pageProfile.channel.userId && !pageProfile.channel.analytics.subscribers.includes(currentUser._id)" class="uk-button go-live-btn" type="button">
                                          <span v-if="streamState === 'subscribe'" class="fa fa-spin fa-spinner"></span>
                                          SUBSCRIBE {{ analytics.subscribers }}
                                        </button>
                                        <button :disabled="streamState === 'loading'" @click.prevent="goLive" v-if="currentUser && pageProfile && currentUser._id === pageProfile.channel.userId && pageProfile.channel.status === 'offline'" class="uk-button go-live-btn" type="button">
                                          <span v-if="streamState === 'loading'" class="fa fa-spin fa-spinner"></span>
                                          GO LIVE
                                        </button>
                                        <button :disabled="streamState === 'loading'" @click.prevent="stopLive" v-if="currentUser && pageProfile && currentUser._id === pageProfile.channel.userId && pageProfile.channel.status === 'live'" class="uk-button stop-live-btn" type="button">
                                          <span v-if="streamState === 'loading'" class="fa fa-spin fa-spinner"></span>
                                          STOP LIVE
                                        </button>
                                        <div class="channel-analytics" style="cursor: pointer">
                                          <div>
                                            <span class="fa fa-eye" title="Total views" uk-tooltip="delay: 500"></span> {{ analytics ? analytics.views : null }}
                                          </div>
                                          <div>
                                            <span class="fa fa-users" title="Total subscribers" uk-tooltip="delay: 500"></span> {{ analytics ? analytics.subscribers : null }}
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="uk-switcher uk-margin">
                                <li class="uk-active">
                                    <stream-box :pageProfile="pageProfile" />
                                    <!-- <hr class="uk-divider-icon"> -->
                                    <!-- <div class="extensions">
                                        <h4>Extensions</h4>
                                        <div class="uk-flex-row uk-grid-small uk-child-width-expand@s">
                                            <div class="uk-width-1-5@m uk-width-1-2@s">
                                                <div class="add-extension">
                                                    <span class="fa fa-3x fa-plus"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->
                                </li>
                                <li class="">
                                    <div class="uk-flex-row uk-grid-small uk-child-width-expand@s" uk-grid>
                                        <div class="uk-width-1-4@m uk-width-1-2@s">
                                            <video-thumb v-if="videos.length" :video="videos[0]" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </section>
        <chat />
        <!-- <welcome-modal /> -->
        <welcome-modal v-if="pageProfile" :pageProfile="pageProfile" />
    </div>
</template>

<script>
import numberAbbreviate from 'number-abbreviate'
import VideoThumb from '../views/video-thumb'
import WelcomeModal from '../views/welcome-modal'
import StreamBox from '../views/stream-box'
import GoLiveModal from '../views/go-live-modal'
import Chat from '../views/chat'

export default {
  data () {
    return {
      streamState: ''
    }
  },
  metaInfo () {
    const user = this.pageProfile
    if (user) {
      return {
        title: `${user.fullName}(@${user.username})`,
        titleTemplate: '%s — MakerTap',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { name: 'description', content: 'Watch amazing live streams of ' + user.fullName + ' turning ideas into business, scaling for large users etc.' },
          { name: 'keywords', content: 'Makers, creators, ' + user.fullName + ', @' + user.username + ', ' + 'motivation, entrepreneurship' }
        ],
        link: [
          { rel: 'favicon', href: '/static/favicon.ico' }
        ]
      }
    }
    return {}
  },
  preFetch ({ store, route }) {
    return store.dispatch('getUser', route.params.username)
  },
  components: {
    VideoThumb,
    Chat,
    StreamBox,
    WelcomeModal,
    GoLiveModal
  },
  mounted () {
    const currentUser = this.$store.state.currentUser
    const pageProfile = this.$store.state.pageProfile

    if (currentUser && pageProfile && currentUser._id === pageProfile._id && !pageProfile.welcome) {
      window.UIkit.modal('#welcome-modal', {
        'sel-close': ''
      }).show()
    }
    // window.UIkit.modal('#welcome-modal', {
    //   'sel-close': ''
    // }).show()
    if (currentUser && pageProfile.channel.userId !== currentUser._id) {
      this.$store.dispatch('channelView', this.pageProfile.channel._id)
    }
  },
  beforeDestroy () {
  },
  methods: {
    goLive () {
      const self = this
      this.streamState = 'loading'
      this.$store.dispatch('goLive', this.pageProfile.channel._id).then(res => {
        self.$store.dispatch('getUser', self.pageProfile.username).then((res) => {
          window.onbeforeunload = (e) => {
            return 'Please stop the live video before you close the page.'
          }
          self.streamState = ''
        })
      })
    },
    unSubscribe () {
      const self = this
      this.streamState = 'unsubscribe'
      const payload = {
        userId: this.currentUser._id,
        channelId: this.pageProfile.channel._id
      }
      this.$store.dispatch('unsubscribe', payload).then(res => {
        self.$store.dispatch('getUser', self.pageProfile.username).then(res => {
          self.streamState = ''
        })
      })
    },
    subscribe () {
      const self = this
      this.streamState = 'subscribe'
      const payload = {
        userId: this.currentUser._id,
        channelId: this.pageProfile.channel._id
      }
      this.$store.dispatch('subscribe', payload).then(res => {
        self.$store.dispatch('getUser', self.pageProfile.username).then(res => {
          self.streamState = ''
        })
      })
    },
    stopLive () {
      const self = this
      this.streamState = 'loading'
      this.$store.dispatch('stopLive', this.pageProfile.channel._id).then(res => {
        self.$store.dispatch('getUser', self.pageProfile.username).then(res => {
          self.streamState = ''
          window.onbeforeunload = null
        })
      })
    }
  },
  computed: {
    analytics () {
      if (this.$store.state.pageProfile &&
        this.$store.state.pageProfile.channel.analytics) {
        return {
          subscribers: numberAbbreviate(this.$store.state.pageProfile.channel.analytics.subscribers.length, 2),
          views: numberAbbreviate(this.$store.state.pageProfile.channel.analytics.totalViews.length, 2)
        }
      }
      return null
    },
    currentUser () {
      if (this.$store.state.currentUser) {
        return this.$store.state.currentUser
      }
      return null
    },
    videos () {
      if (this.$store.state.videos && this.$store.state.videos.data) {
        return this.$store.state.videos.data
      }
      return []
    },
    pageProfile () {
      if (this.$store.state.pageProfile && this.$store.state.pageProfile._id) {
        return this.$store.state.pageProfile
      }
      return null
    }
  }
}
</script>

<style>

</style>
