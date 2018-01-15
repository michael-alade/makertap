import MobileDetect from 'mobile-detect'

const mobileDetect = {
  install (Vue, options) {
    Vue.mixin({
      mounted () {
        const userAgent = window && window.navigator.userAgent ? window.navigator.userAgent : null
        Vue.prototype.$mobileDetect = new MobileDetect(userAgent)
      }
    })
  }
}

export default mobileDetect
