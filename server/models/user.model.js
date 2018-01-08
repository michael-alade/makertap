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
  live: {
    type: Object
  }
})

module.exports = mongoose.model('User', user)
