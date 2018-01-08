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
                                    <button style="flex: 1; margin-right: 10px;" class="uk-button uk-button-default" disabled type="button">ADD VIDEO</button>
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
                                        <div class="overlay">
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
                                        <div class="overlay">
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
                                            <video-thumb :video="videos[0]" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </section>
        <chat />
    </div>
</template>

<script>
import VideoThumb from '../views/video-thumb'
import GoLiveModal from '../views/go-live-modal'
import Chat from '../views/chat'

export default {
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | MakerTap',
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
  preFetch ({ store }) {
    return store.dispatch('search')
  },
  components: {
    VideoThumb,
    Chat,
    GoLiveModal
  },
  computed: {
    videos () {
      if (this.$store.state.videos && this.$store.state.videos.data) {
        return this.$store.state.videos.data
      }
      return []
    }
  }
}
</script>

<style>

</style>
