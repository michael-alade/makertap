const user = require('../actions/user.action')

module.exports = (router) => {
  router
    .route('/user/signup')
    .post(user.signup)

  router
    .route('/user/login')
    .post(user.login)

  router
    .route('/user/:username')
    .get(user.getUser)
}
