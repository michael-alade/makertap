var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var analytics = new Schema({
  views: {
    type: Number,
    default: 0
  }
})

var embed = new Schema({
  thumbnail: {
    type: String
  },
  videoUrl: {
    type: String
  }
})

var video = new Schema({
  title: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  tags: {
    type: Array,
    required: true
  },
  embed: {
    type: embed
  },
  description: {
    type: String
  },
  creator: {
    type: Object
  },
  status: {
    type: String
  },
  analytics: {
    type: analytics,
    default: {
      views: 0
    }
  }
})

video.index({ title: 'text', description: 'text', tags: 'text' })

module.exports = mongoose.model('Video', video)
