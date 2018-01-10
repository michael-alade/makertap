var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var user = new Schema({
  fullName: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  welcome: {
    type: Boolean,
    default: false
  },
  channel: {
    type: Object
  }
})

user.index({ fullName: 'text', username: 'text' })

module.exports = mongoose.model('User', user)
