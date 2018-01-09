const user = require('../actions/user.action')
const auth = require('../middlewares/auth.middleware')

module.exports = (router) => {
  router
    .route('/user/signup')
    .post(user.signup)

  router
    .route('/user/login')
    .post(user.login)

  router
    .route('/user/channel')
    .post(auth, user.createChannel)

  router
    .route('/user/channel/:channelId')
    .put(auth, user.updateChannel)

  router
    .route('/user/:username')
    .get(user.getUser)
}
