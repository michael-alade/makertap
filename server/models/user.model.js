var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var user = new Schema({
  fullName: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
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

module.exports = mongoose.model('User', user)
