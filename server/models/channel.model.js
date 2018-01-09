var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var embed = new Schema({
  platform: {
    type: String
  },
  liveUrl: {
    type: String
  }
})

var channel = new Schema({
  channelPicture: {
    type: String
  },
  status: {
    type: String,
    default: 'offline'
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
    type: Object
  }
})

module.exports = mongoose.model('Channel', channel)
