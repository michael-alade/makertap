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
                                        <li class=""><a href="#">Todos</a></li>
                                        <li class=""><a href="#">SCHEDULE</a></li>
                                    </ul>
                                </div>
                                <div class="uk-width-1-2@m uk-visible@m" style="display: flex; margin-top: -10px;">
                                    <!-- <button style="flex: 1; margin-right: 10px;" class="uk-button uk-button-default" disabled type="button">ADD VIDEO</button> -->
                                    <go-live-modal />
                                </div>
                            </div>
                            <ul class="uk-switcher uk-margin">
                                <li class="uk-active">
                                    <div class="live-stream-box uk-visible@m">
                                        <div id="live-video">
                                        </div>
                                        <div class="uk-overlay uk-position-top">
                                            <div class="live-now">
                                                <span class="fa fa-circle"></span> Live
                                            </div>
                                            <div class="offline" style="display: none;">
                                                <span class="fa fa-circle"></span> Offline
                                            </div>
                                        </div>
                                    </div>
                                    <div class="live-stream-box-small uk-hidden@m">
                                        <div id="live-video">
                                        </div>
                                        <div class="uk-overlay uk-position-top">
                                            <div class="live-now">
                                                <span class="fa fa-circle"></span> Live
                                            </div>
                                            <div class="offline" style="display: none;">
                                                <span class="fa fa-circle"></span> Offline
                                            </div>
                                        </div>
                                    </div>
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
        <welcome-modal :pageProfile="pageProfile" />
    </div>
</template>

<script>
import VideoThumb from '../views/video-thumb'
import WelcomeModal from '../views/welcome-modal'
import GoLiveModal from '../views/go-live-modal'
import Chat from '../views/chat'

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s — MakerTap',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Watch and learn from live streams made by successfully makers, creators and founders who have built business that serves a lot of users' },
      { name: 'keywords', content: 'Makers, creators, motivation, entrepreneurship' }
    ],
    link: [
      { rel: 'favicon', href: '/static/favicon.ico' }
    ]
  },
  preFetch ({ store, route }) {
    return store.dispatch('getUser', route.params.username)
  },
  components: {
    VideoThumb,
    Chat,
    WelcomeModal,
    GoLiveModal
  },
  mounted () {
    console.log(this.$store.state.pageProfile, 'pageProfile')
    const currentUser = this.$store.state.currentUser
    const pageProfile = this.$store.state.pageProfile

    if (currentUser._id === pageProfile._id && !pageProfile.welcome) {
      window.UIkit.modal('#welcome-modal', {
        'sel-close': ''
      }).show()
    }
  },
  computed: {
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
