<template>
    <section class="auth-section">
        <div class="uk-card uk-card-default uk-card-body" :style="{ 'height': error.showError ? '477px' : '400px' }">
            <div class="logo-header">
                <img src="/static/images/logo-makertap.png"/>
            </div>
            <div v-if="error.showError" class="uk-alert-danger" uk-alert>
                <a @click="error.showError = false" class="uk-alert-close" uk-close></a>
                <p style="font-size: 13px;">{{ error.message }}</p>
            </div>
            <form @submit.prevent="login" class="uk-grid-small" uk-grid>
                <div class="uk-width-1-1@s">
                    <label class="uk-form-label">Username</label>
                    <input required v-model="form.username" required class="uk-input" type="text">
                </div>
                <div class="uk-width-1-1@s">
                    <label class="uk-form-label">Password</label>
                    <input required v-model="form.password" required class="uk-input" type="password">
                </div>
                <div class="uk-width-1-1@s captcha">
                    <vue-recaptcha @expired="onExpired" @verify="onVerify" sitekey="6Lettj8UAAAAAA0ybPFIBheYu4jO8tLBJqM97Mvt"/>
                </div>
                <div class="uk-width-1-1@s submit">
                    <button type="submit" class="uk-button uk-button-primary">Log in</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        verified: false
      },
      notVerified: false,
      error: {
        showError: false,
        message: ''
      }
    }
  },
  preFetch ({ store }) {
    return store.dispatch('hideNavbar', true)
  },
  components: {
    VueRecaptcha
  },
  metaInfo: {
    title: 'Login',
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
  beforeDestroy () {
    this.$store.dispatch('hideNavbar', false)
  },
  methods: {
    onVerify (response) {
      console.log('payload', response)
      if (response) {
        this.form.verified = true
      }
    },
    onExpired () {
      this.form.verified = false
    },
    login () {
      const self = this
      if (!this.form.verified) {
        this.error = {
          showError: true,
          message: 'Not yet verified! Please click the captcha below.'
        }
        return this.error
      }
      return this.$store.dispatch('login', this.form).then((res) => {
        if (res.data.token) {
          window.location.href = '/'
        }
      }).catch((err) => {
        self.error = {
          showError: true,
          message: 'Login failed: Username or password is incorrect'
        }
        return err
      })
    }
  }
}
</script>

<style>

</style>
