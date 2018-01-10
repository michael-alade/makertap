var mongoose = require('./connect.js')
var Schema = mongoose.Schema
var textSearch = require('mongoose-text-search')

var embed = new Schema({
  platform: {
    type: String
  },
  liveUrl: {
    type: String
  }
})

var user = new Schema({
  fullName: {
    type: String,
    index: true
  },
  username: {
    type: String,
    index: true,
    unique: true
  },
  email: {
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

user.index({
  fullName: 'text',
  username: 'text'
})

var channel = new Schema({
  channelPicture: {
    type: String
  },
  status: {
    type: String,
    default: 'offline'
  },
  objectID: {
    type: String,
    default: ''
  },
  userId: {
    type: String
  },
  specialty: {
    type: String
  },
  embed: {
    type: embed
  },
  user: {
    type: user
  }
})

channel.plugin(textSearch)

channel.index({
  status: 'text',
  specialty: 'text'
  // 'user.fullName': 'text',
  // 'user.username': 'text'
})

module.exports = mongoose.model('Channel', channel)
