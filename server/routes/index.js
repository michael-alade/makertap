const live = require('./live.route')
const user = require('./user.route')

module.exports = (router) => {
  live(router)
  user(router)
}
