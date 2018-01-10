const live = require('../actions/live.action')
const search = require('../actions/search.action')
const auth = require('../middlewares/auth.middleware')

module.exports = (router) => {
  router
    .route('/live')
    .post(auth, live.goLive)

  router
    .route('/live/stop')
    .post(auth, live.stopLive)

  router
    .route('/live/search')
    .get(search.search)
}
